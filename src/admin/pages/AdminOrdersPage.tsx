import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  Download,
  ExternalLink,
  MessageCircle,
  Truck,
  CheckCircle,
  Clock,
  Link as LinkIcon,
  Copy,
  ChevronRight,
  User,
  History,
  Send,
  Calendar,
  CreditCard,
  Package,
  AlertCircle,
  Zap
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { deliveryService } from '../../services/deliveryService';
import { whatsappService } from '../../services/whatsappService';
import { Order, OrderStatus } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';

interface AdminOrdersPageProps {
  onNavigate: (path: string) => void;
}

const COURIER_PARTNERS = [
  { name: 'Delhivery', getUrl: (awb: string) => `https://www.delhivery.com/track/package/${awb}` },
  { name: 'Shiprocket', getUrl: (awb: string) => `https://shiprocket.co/tracking/${awb}` },
  { name: 'BlueDart', getUrl: (awb: string) => `https://www.bluedart.com/tracking?trackFor=0&trackNo=${awb}` },
  { name: 'DTDC', getUrl: (awb: string) => `https://www.dtdc.in/tracking/tracking_results.asp?pin=${awb}` },
  { name: 'India Post', getUrl: (awb: string) => `https://www.indiapost.gov.in/_layouts/15/dpt.cpt.tracking/trackconsignment.aspx` },
  { name: 'Other Courier', getUrl: (awb: string) => `https://www.google.com/search?q=track+${awb}` }
];

export const AdminOrdersPage: React.FC<AdminOrdersPageProps> = () => {
  const { formatPrice } = useCurrency();
  const [orders, setOrders] = useState<Order[]>(() => storageService.getOrders());
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDateRange, setSelectedDateRange] = useState<'all' | 'today' | '7d' | '30d'>('all');
  const [selectedPayment, setSelectedPayment] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Fulfillment form in modal
  const [courierName, setCourierName] = useState('Delhivery');
  const [awbNumber, setAwbNumber] = useState('');
  const [trackingUrl, setTrackingUrl] = useState('');
  const [modalTab, setModalTab] = useState<'details' | 'fulfillment' | 'history'>('details');

  useEffect(() => {
    return storageService.subscribe(() => {
      setOrders(storageService.getOrders());
      if (activeOrder) {
        const refreshed = storageService.getOrderById(activeOrder.id);
        if (refreshed) setActiveOrder(refreshed);
      }
    });
  }, [activeOrder]);

  // When active order opens, populate shipping fields
  useEffect(() => {
    if (activeOrder) {
      setCourierName(activeOrder.courier || 'Delhivery');
      setAwbNumber(activeOrder.awb || '');
      setTrackingUrl(activeOrder.trackingUrl || '');
      setModalTab('details');
    }
  }, [activeOrder?.id]);

  // Auto update tracking URL when courier or AWB changes
  const handleAwbChange = (newAwb: string) => {
    setAwbNumber(newAwb);
    const partner = COURIER_PARTNERS.find((c) => c.name === courierName);
    if (partner && newAwb.trim()) {
      setTrackingUrl(partner.getUrl(newAwb.trim()));
    } else {
      setTrackingUrl('');
    }
  };

  const handleCourierChange = (newCourier: string) => {
    setCourierName(newCourier);
    const partner = COURIER_PARTNERS.find((c) => c.name === newCourier);
    if (partner && awbNumber.trim()) {
      setTrackingUrl(partner.getUrl(awbNumber.trim()));
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    storageService.updateOrderStatus(orderId, newStatus);
    showNotification(`Order status updated to ${newStatus}`);
  };

  const handleSaveFulfillment = () => {
    if (!activeOrder) return;
    if (!awbNumber.trim()) {
      showNotification('Please enter an AWB tracking number');
      return;
    }
    const finalTracking =
      trackingUrl.trim() ||
      COURIER_PARTNERS.find((c) => c.name === courierName)?.getUrl(awbNumber.trim()) ||
      '';
    storageService.updateOrderStatus(
      activeOrder.id,
      'Shipped',
      awbNumber.trim(),
      courierName,
      finalTracking
    );
    showNotification('Fulfillment details saved & order marked as Shipped');
  };

  const handleAutoGenerateAwb = () => {
    if (!activeOrder) return;
    const generated = deliveryService.generateAwb(activeOrder, courierName);
    setAwbNumber(generated.awb);
    setTrackingUrl(generated.trackingUrl);
    storageService.updateOrderStatus(
      activeOrder.id,
      'Shipped',
      generated.awb,
      generated.courier,
      generated.trackingUrl
    );
    showNotification(`⚡ Generated AWB ${generated.awb} via ${generated.courier} & marked Shipped!`);
  };

  const handleGenerateReviewLink = (orderId: string) => {
    const token = storageService.generateReviewToken(orderId);
    showNotification('Review link generated successfully');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2500);
  };

  const handleExportCSV = () => {
    const headers = [
      'OrderNo',
      'Date',
      'CustomerName',
      'Phone',
      'Email',
      'Address',
      'City',
      'State',
      'Pincode',
      'Amount',
      'PaymentMethod',
      'PaymentStatus',
      'OrderStatus',
      'Courier',
      'AWB'
    ];
    const rows = orders.map((o) => [
      o.orderNo,
      new Date(o.createdAt).toLocaleDateString(),
      `"${o.customer.name.replace(/"/g, '""')}"`,
      `"${o.customer.phone}"`,
      `"${o.customer.email}"`,
      `"${o.customer.address.replace(/"/g, '""')}"`,
      `"${o.customer.city || ''}"`,
      `"${o.customer.state || ''}"`,
      `"${o.customer.pincode}"`,
      o.amount,
      o.paymentMethod,
      o.paymentStatus,
      o.orderStatus,
      `"${o.courier || ''}"`,
      `"${o.awb || ''}"`
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PASAAVA_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Date Filtering Helper
  const isWithinDateRange = (dateStr: string, range: 'all' | 'today' | '7d' | '30d') => {
    if (range === 'all') return true;
    const orderDate = new Date(dateStr).getTime();
    const now = Date.now();
    if (range === 'today') {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      return orderDate >= todayStart.getTime();
    }
    if (range === '7d') {
      return now - orderDate <= 7 * 24 * 60 * 60 * 1000;
    }
    if (range === '30d') {
      return now - orderDate <= 30 * 24 * 60 * 60 * 1000;
    }
    return true;
  };

  const filteredOrders = orders.filter((o) => {
    const matchesStatus =
      selectedStatus === 'all' || o.orderStatus.toLowerCase() === selectedStatus.toLowerCase();

    const matchesDate = isWithinDateRange(o.createdAt, selectedDateRange);

    const matchesPayment =
      selectedPayment === 'all' ||
      o.paymentStatus.toLowerCase() === selectedPayment.toLowerCase() ||
      o.paymentMethod.toLowerCase() === selectedPayment.toLowerCase();

    const matchesSearch =
      o.orderNo.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.phone.includes(search) ||
      (o.awb && o.awb.toLowerCase().includes(search.toLowerCase()));

    return matchesStatus && matchesDate && matchesPayment && matchesSearch;
  });

  // Calculate customer history for active order
  const customerHistoryOrders: Order[] = activeOrder
    ? storageService.getOrdersByPhone(activeOrder.customer.phone)
    : [];
  const customerLTV = customerHistoryOrders.reduce((sum: number, ord: Order) => sum + ord.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Fulfillment & Sales Operations
          </span>
          <h2 className="text-xl font-bold text-[#111111] mt-0.5">Orders ({orders.length})</h2>
          <p className="text-xs text-gray-500">
            Track customer orders, manage shipping AWB, customer history, and review links
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E5E5E5] text-[#111111] rounded-xl text-xs font-semibold hover:bg-gray-50 transition-all cursor-pointer shadow-xs"
        >
          <Download className="w-4 h-4 text-gray-500" />
          <span>Export to CSV</span>
        </button>
      </div>

      {notification && (
        <div className="p-3.5 bg-black text-white text-xs font-medium rounded-xl shadow-lg flex items-center justify-between">
          <span>{notification}</span>
          <button onClick={() => setNotification(null)} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Filter Bar with Date, Status, Payment and Search */}
      <div className="bg-white p-4 rounded-2xl border border-[#EBEBEB] flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order no, customer, phone, or AWB..."
            className="w-full pl-9 pr-4 py-2 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl text-xs text-[#111111] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Date Filter */}
          <div className="flex items-center bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl px-2 py-1">
            <Calendar className="w-3.5 h-3.5 text-gray-400 mr-1.5" />
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value as any)}
              className="bg-transparent text-xs text-[#111111] focus:outline-none cursor-pointer py-1"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>

          {/* Payment Filter */}
          <div className="flex items-center bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl px-2 py-1">
            <CreditCard className="w-3.5 h-3.5 text-gray-400 mr-1.5" />
            <select
              value={selectedPayment}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className="bg-transparent text-xs text-[#111111] focus:outline-none cursor-pointer py-1"
            >
              <option value="all">All Payments</option>
              <option value="Paid">Status: Paid</option>
              <option value="Pending">Status: Pending</option>
              <option value="COD">Method: COD</option>
              <option value="UPI">Method: UPI</option>
              <option value="Razorpay">Method: Razorpay</option>
            </select>
          </div>

          {/* Order Status Filter */}
          <div className="flex items-center bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl px-2 py-1">
            <Package className="w-3.5 h-3.5 text-gray-400 mr-1.5" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent text-xs text-[#111111] focus:outline-none cursor-pointer py-1"
            >
              <option value="all">All Statuses</option>
              <option value="New">New</option>
              <option value="Packed">Packed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-[#EBEBEB] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#EBEBEB] text-gray-400 uppercase tracking-wider font-semibold text-[10.5px]">
                <th className="py-3 px-4">Order No</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Fulfillment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0F0]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400 text-xs">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#111111]">{order.orderNo}</div>
                      {order.awb && (
                        <div className="text-[10px] text-gray-400 font-mono">AWB: {order.awb}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-gray-900">{order.customer.name}</div>
                      <div className="text-[11px] text-gray-500">{order.customer.phone}</div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-500 text-[11px]">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            order.paymentStatus === 'Paid'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                        <span className="text-[10px] text-gray-400">({order.paymentMethod})</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#111111]">
                      {formatPrice(order.amount)}
                    </td>
                    <td className="py-3.5 px-4">
                      {order.courier ? (
                        <div className="text-[11px]">
                          <span className="font-semibold text-gray-800">{order.courier}</span>
                          {order.trackingUrl && (
                            <a
                              href={order.trackingUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="ml-1.5 inline-flex items-center text-blue-600 hover:underline"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      ) : (
                        <span className="text-[11px] text-gray-400 italic">Unassigned</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={order.orderStatus}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border cursor-pointer ${
                          order.orderStatus === 'Delivered'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                            : order.orderStatus === 'Shipped'
                            ? 'bg-blue-50 border-blue-200 text-blue-800'
                            : order.orderStatus === 'Cancelled'
                            ? 'bg-red-50 border-red-200 text-red-800'
                            : 'bg-gray-50 border-gray-200 text-gray-800'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setActiveOrder(order)}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-black hover:text-white rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comprehensive Order Detail & Fulfillment Modal */}
      {activeOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-[#111111]">Order {activeOrder.orderNo}</h3>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      activeOrder.orderStatus === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : activeOrder.orderStatus === 'Shipped'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {activeOrder.orderStatus}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  Placed on {new Date(activeOrder.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setActiveOrder(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-gray-100 text-xs font-semibold">
              <button
                onClick={() => setModalTab('details')}
                className={`pb-2.5 px-2 border-b-2 transition-all cursor-pointer ${
                  modalTab === 'details'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-400 hover:text-gray-700'
                }`}
              >
                Order & Items
              </button>
              <button
                onClick={() => setModalTab('fulfillment')}
                className={`pb-2.5 px-2 border-b-2 transition-all cursor-pointer ${
                  modalTab === 'fulfillment'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-400 hover:text-gray-700'
                }`}
              >
                Shipping & Fulfillment
              </button>
              <button
                onClick={() => setModalTab('history')}
                className={`pb-2.5 px-2 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  modalTab === 'history'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-400 hover:text-gray-700'
                }`}
              >
                <span>Customer History</span>
                <span className="px-1.5 py-0.2 bg-gray-100 rounded-full text-[10px] font-bold">
                  {customerHistoryOrders.length}
                </span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
              {modalTab === 'details' && (
                <>
                  {/* Customer Information Card */}
                  <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-[#111111] text-sm flex items-center gap-1.5">
                        <User className="w-4 h-4 text-gray-500" />
                        <span>{activeOrder.customer.name}</span>
                      </div>
                      <a
                        href={`https://wa.me/${activeOrder.customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Hello ${activeOrder.customer.name}, this is regarding your PASAAVA order ${activeOrder.orderNo}.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#25D366] text-white rounded-lg font-semibold text-xs hover:bg-[#20ba59] transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600 text-[11px] pt-1">
                      <div>
                        <strong>Phone:</strong> {activeOrder.customer.phone}
                      </div>
                      <div>
                        <strong>Email:</strong> {activeOrder.customer.email}
                      </div>
                      <div className="sm:col-span-2">
                        <strong>Address:</strong> {activeOrder.customer.address},{' '}
                        {activeOrder.customer.city}, {activeOrder.customer.state}{' '}
                        {activeOrder.customer.pincode}
                      </div>
                    </div>
                  </div>

                  {/* Items List */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Purchased Jewellery Pieces</h4>
                    <div className="space-y-2 border border-gray-100 rounded-xl p-3 bg-white">
                      {activeOrder.items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-10 h-10 rounded-lg object-cover bg-gray-100 border border-gray-100"
                            />
                            <div>
                              <div className="font-bold text-gray-900 text-xs">{item.title}</div>
                              <div className="text-[10px] text-gray-500">
                                Qty: {item.quantity} • {formatPrice(item.price)} each
                                {item.selectedColor ? ` • ${item.selectedColor}` : ''}
                              </div>
                            </div>
                          </div>
                          <div className="font-bold text-gray-900 text-xs">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                        </div>
                      ))}

                      {/* Pricing Breakdown */}
                      <div className="pt-3 border-t border-gray-100 space-y-1 text-gray-600 text-[11px]">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>{formatPrice(activeOrder.subtotal || activeOrder.amount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping Fee</span>
                          <span>
                            {activeOrder.shippingFee && activeOrder.shippingFee > 0
                              ? formatPrice(activeOrder.shippingFee)
                              : 'FREE'}
                          </span>
                        </div>
                        <div className="flex justify-between font-bold text-sm text-black pt-1 border-t border-gray-200">
                          <span>Grand Total</span>
                          <span>{formatPrice(activeOrder.amount)}</span>
                        </div>
                        {activeOrder.razorpayPaymentId && (
                          <div className="flex justify-between items-center text-[10.5px] pt-1 text-purple-700 font-medium">
                            <span>Razorpay Payment ID:</span>
                            <span className="font-mono font-bold">{activeOrder.razorpayPaymentId} (Paid ✓)</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Single-Use Review Verification Link */}
                  <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-amber-900 text-xs">Customer Review Verification</h4>
                        <p className="text-[11px] text-amber-700">
                          Generate a secure single-use review link for verified buyer badge
                        </p>
                      </div>
                      {!activeOrder.reviewToken && !activeOrder.reviewSubmitted ? (
                        <button
                          onClick={() => handleGenerateReviewLink(activeOrder.id)}
                          className="px-3 py-1.5 bg-black text-white text-[11px] font-bold rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          Generate Link
                        </button>
                      ) : activeOrder.reviewSubmitted ? (
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg font-bold text-[10px]">
                          Review Submitted ✓
                        </span>
                      ) : null}
                    </div>

                    {activeOrder.reviewToken && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            readOnly
                            value={`${window.location.origin}/#/review/${activeOrder.reviewToken}`}
                            className="flex-1 px-2.5 py-1.5 bg-white border border-amber-300 rounded-lg text-[11px] text-gray-700 font-mono"
                          />
                          <button
                            onClick={() =>
                              copyToClipboard(`${window.location.origin}/#/review/${activeOrder.reviewToken}`)
                            }
                            className="px-3 py-1.5 bg-white border border-amber-300 rounded-lg text-[11px] font-semibold text-gray-800 hover:bg-amber-100 flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            <span>{copiedToken ? 'Copied!' : 'Copy'}</span>
                          </button>
                        </div>
                        <a
                          href={`https://wa.me/${activeOrder.customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hi ${activeOrder.customer.name}! Thank you for your purchase from PASAAVA. Please share your experience with your jewelry here: ${window.location.origin}/#/review/${activeOrder.reviewToken}`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] text-emerald-700 hover:text-emerald-900 font-semibold"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Send Review Link on WhatsApp</span>
                        </a>
                      </div>
                    )}
                  </div>
                </>
              )}

              {modalTab === 'fulfillment' && (
                <div className="space-y-4">
                  <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4">
                    <h4 className="font-bold text-blue-900 text-xs">Dispatch & Courier Assignment</h4>
                    <p className="text-[11px] text-blue-700">
                      Assign courier, enter Airway Bill (AWB), and notify the customer directly.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Courier Partner
                      </label>
                      <select
                        value={courierName}
                        onChange={(e) => handleCourierChange(e.target.value)}
                        className="w-full px-3 py-2 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-1 focus:ring-black"
                      >
                        {COURIER_PARTNERS.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-[11px] font-semibold text-gray-700">
                          Airway Bill (AWB) / Tracking Number
                        </label>
                        <button
                          type="button"
                          onClick={handleAutoGenerateAwb}
                          className="flex items-center gap-1 text-[10.5px] font-bold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-2 py-0.5 rounded cursor-pointer transition-colors"
                        >
                          <Zap className="w-3 h-3" />
                          <span>⚡ Auto-Generate AWB</span>
                        </button>
                      </div>
                      <input
                        type="text"
                        value={awbNumber}
                        onChange={(e) => handleAwbChange(e.target.value)}
                        placeholder="e.g. DELH-847291039 or SR1092837"
                        className="w-full px-3 py-2 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl text-xs text-[#111111] font-mono focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Tracking URL
                      </label>
                      <input
                        type="text"
                        value={trackingUrl}
                        onChange={(e) => setTrackingUrl(e.target.value)}
                        placeholder="https://www.delhivery.com/track/package/..."
                        className="w-full px-3 py-2 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl text-xs text-[#111111] font-mono focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={handleSaveFulfillment}
                        className="flex-1 py-2.5 bg-black text-white text-xs font-bold rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Truck className="w-4 h-4" />
                        <span>Save Fulfillment & Mark Shipped</span>
                      </button>

                      {awbNumber.trim() && (
                        <a
                          href={
                            whatsappService.notifyCustomerDispatch({
                              ...activeOrder,
                              courier: courierName,
                              awb: awbNumber.trim(),
                              trackingUrl: trackingUrl.trim()
                            }).url
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2.5 bg-[#25D366] text-white text-xs font-bold rounded-xl hover:bg-[#20ba59] transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Send className="w-4 h-4" />
                          <span>Send Tracking on WhatsApp</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {modalTab === 'history' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[#111111] text-sm">
                        {activeOrder.customer.name}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        {activeOrder.customer.phone} • {activeOrder.customer.email}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                        Lifetime Value (LTV)
                      </div>
                      <div className="font-black text-sm text-[#111111]">
                        {formatPrice(customerLTV)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      Order History ({customerHistoryOrders.length})
                    </h4>
                    <div className="space-y-2">
                      {customerHistoryOrders.map((ord: Order) => (
                        <div
                          key={ord.id}
                          onClick={() => setActiveOrder(ord)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                            ord.id === activeOrder.id
                              ? 'bg-black text-white border-black'
                              : 'bg-white border-gray-100 hover:border-gray-300'
                          }`}
                        >
                          <div>
                            <div className="font-bold text-xs">{ord.orderNo}</div>
                            <div className={`text-[10px] ${ord.id === activeOrder.id ? 'text-gray-300' : 'text-gray-400'}`}>
                              {new Date(ord.createdAt).toLocaleDateString()} • {ord.items.length} item(s) • {ord.paymentMethod}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-xs">{formatPrice(ord.amount)}</div>
                            <span
                              className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded ${
                                ord.id === activeOrder.id
                                  ? 'bg-white/20 text-white'
                                  : ord.orderStatus === 'Delivered'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {ord.orderStatus}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
