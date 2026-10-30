import React, { useState, useEffect, useMemo } from 'react';
import {
  IndianRupee,
  ShoppingBag,
  Package,
  Star,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle,
  Truck,
  Plus,
  Eye,
  AlertTriangle,
  RefreshCw,
  ChevronRight,
  Calendar,
  Layers
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { Order, Product, ProductReview } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';

interface AdminDashboardPageProps {
  onNavigate: (path: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  const { formatPrice } = useCurrency();
  const [products, setProducts] = useState<Product[]>(() => storageService.getProducts());
  const [orders, setOrders] = useState<Order[]>(() => storageService.getOrders());
  const [reviews, setReviews] = useState<ProductReview[]>(() => storageService.getReviews());
  const [timeRange, setTimeRange] = useState<'today' | '7d' | '30d' | 'all'>('30d');
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    return storageService.subscribe(() => {
      setProducts(storageService.getProducts());
      setOrders(storageService.getOrders());
      setReviews(storageService.getReviews());
    });
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Quick Restock Handler
  const handleRestock = (productId: string, addQty: number) => {
    const p = products.find((item) => item.id === productId);
    if (!p) return;
    const currentQty = p.stockQty || 0;
    const newQty = currentQty + addQty;
    storageService.updateProductStock(productId, newQty);
    showNotification(`Restocked ${p.title} (+${addQty} units). Total stock: ${newQty}`);
  };

  // Filter orders by time range
  const filteredOrders = useMemo(() => {
    const now = Date.now();
    return orders.filter((ord) => {
      const ordTime = new Date(ord.createdAt).getTime();
      if (timeRange === 'today') {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        return ordTime >= todayStart.getTime();
      }
      if (timeRange === '7d') {
        return now - ordTime <= 7 * 24 * 60 * 60 * 1000;
      }
      if (timeRange === '30d') {
        return now - ordTime <= 30 * 24 * 60 * 60 * 1000;
      }
      return true;
    });
  }, [orders, timeRange]);

  // Aggregate Metrics
  const totalRevenue = filteredOrders.reduce((sum, ord) => sum + ord.amount, 0);
  const totalOrders = filteredOrders.length;
  const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const inStockCount = products.filter((p) => p.inStock && (p.stockQty ?? 1) > 0).length;
  const lowStockProducts = products.filter(
    (p) => !p.inStock || (p.stockQty !== undefined && p.stockQty <= 5)
  );
  const pendingReviews = reviews.filter((r) => (r.status || 'pending') === 'pending').length;

  // Order Status Pipeline Counts
  const newOrdersCount = orders.filter((o) => o.orderStatus === 'New').length;
  const packedOrdersCount = orders.filter((o) => o.orderStatus === 'Packed').length;
  const shippedOrdersCount = orders.filter((o) => o.orderStatus === 'Shipped').length;
  const deliveredOrdersCount = orders.filter((o) => o.orderStatus === 'Delivered').length;

  // Compute 7-day Sales & Orders Trend
  const chartDays = useMemo(() => {
    const days: { label: string; dateStr: string; revenue: number; orderCount: number }[] = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
      const dateStr = d.toISOString().slice(0, 10);

      // Sum orders on this day
      const dayOrders = orders.filter((o) => {
        const orderDateStr = new Date(o.createdAt).toISOString().slice(0, 10);
        return orderDateStr === dateStr;
      });
      const dayRev = dayOrders.reduce((sum, o) => sum + o.amount, 0);

      days.push({
        label: dayLabel,
        dateStr,
        revenue: dayRev,
        orderCount: dayOrders.length
      });
    }
    return days;
  }, [orders]);

  const maxChartRevenue = Math.max(...chartDays.map((d) => d.revenue), 10000);

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome with Time Horizon Switcher */}
      <div className="bg-white rounded-2xl p-6 border border-[#EBEBEB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Atelier Overview
          </span>
          <h2 className="text-xl font-bold text-[#111111] mt-0.5">Performance & Operations</h2>
          <p className="text-xs text-gray-500 mt-1">
            Real-time INR gross revenue, active orders pipeline, and hardware inventory alerts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Time Filter Pills */}
          <div className="flex items-center bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl p-1 text-xs font-semibold">
            {(['today', '7d', '30d', 'all'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  timeRange === range
                    ? 'bg-black text-white shadow-xs'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {range === 'today'
                  ? 'Today'
                  : range === '7d'
                  ? '7 Days'
                  : range === '30d'
                  ? '30 Days'
                  : 'All Time'}
              </button>
            ))}
          </div>

          <button
            onClick={() => onNavigate('/admin/orders')}
            className="flex items-center gap-1.5 px-4 py-2 bg-black text-white rounded-xl text-xs font-semibold hover:bg-gray-800 transition-all cursor-pointer shadow-xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Manage Orders</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-3.5 bg-black text-white text-xs font-medium rounded-xl shadow-lg flex items-center justify-between">
          <span>{notification}</span>
          <button onClick={() => setNotification(null)} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-[#EBEBEB] shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Gross Sales</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#111111] tracking-tight">
            {formatPrice(totalRevenue)}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>INR Base ({timeRange.toUpperCase()})</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-[#EBEBEB] shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Order Volume</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#111111] tracking-tight">{totalOrders}</div>
          <div className="mt-2 text-xs text-gray-500">
            AOV: <strong className="text-black">{formatPrice(averageOrderValue)}</strong>
          </div>
        </div>

        {/* Active Products */}
        <div className="bg-white p-5 rounded-2xl border border-[#EBEBEB] shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Catalogue Status</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#111111] tracking-tight">{products.length}</div>
          <div className="mt-2 text-xs text-gray-500">
            <strong className="text-emerald-600">{inStockCount}</strong> in stock •{' '}
            <strong className="text-amber-600">{lowStockProducts.length}</strong> low/out
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white p-5 rounded-2xl border border-[#EBEBEB] shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Social Proof</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Star className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#111111] tracking-tight">{reviews.length}</div>
          <div className="mt-2 text-xs text-gray-500">
            {pendingReviews > 0 ? (
              <span className="text-amber-600 font-semibold">{pendingReviews} awaiting moderation</span>
            ) : (
              <span className="text-emerald-600">All reviews moderated ✓</span>
            )}
          </div>
        </div>
      </div>

      {/* Fulfillment Pipeline Strip */}
      <div className="bg-white p-5 rounded-2xl border border-[#EBEBEB] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Fulfillment Pipeline
          </h3>
          <button
            onClick={() => onNavigate('/admin/orders')}
            className="text-xs font-semibold text-gray-500 hover:text-black flex items-center gap-1 cursor-pointer"
          >
            <span>View All Orders</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-gray-500 font-medium">New Orders</div>
              <div className="text-lg font-black text-gray-900">{newOrdersCount}</div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
              <Clock className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-gray-500 font-medium">Packed & Ready</div>
              <div className="text-lg font-black text-gray-900">{packedOrdersCount}</div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
              <Package className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-gray-500 font-medium">In Transit (Shipped)</div>
              <div className="text-lg font-black text-gray-900">{shippedOrdersCount}</div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-xs">
              <Truck className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-gray-500 font-medium">Delivered</div>
              <div className="text-lg font-black text-gray-900">{deliveredOrdersCount}</div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Visual Sales & Order Bar Chart */}
      <div className="bg-white rounded-2xl p-6 border border-[#EBEBEB] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#111111]">Daily Revenue Trend (Last 7 Days)</h3>
              <p className="text-[11px] text-gray-500">Visual performance of daily gross volume</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
              Live Storage DB
            </span>
          </div>

          {/* SVG Bar Chart Visualization */}
          <div className="pt-4 pb-2">
            <div className="h-48 flex items-end justify-between gap-3 pt-6 border-b border-gray-100">
              {chartDays.map((day, idx) => {
                const heightPct = Math.max(12, Math.round((day.revenue / maxChartRevenue) * 100));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                    {/* Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 bg-black text-white text-[10px] py-1 px-2 rounded pointer-events-none whitespace-nowrap z-20 shadow-md">
                      <div>{formatPrice(day.revenue)}</div>
                      <div className="text-gray-300">{day.orderCount} orders</div>
                    </div>

                    {/* Bar */}
                    <div
                      className="w-full max-w-[42px] bg-gradient-to-t from-black to-gray-700 hover:from-black hover:to-black rounded-t-lg transition-all cursor-pointer relative"
                      style={{ height: `${heightPct}%` }}
                    >
                      {day.revenue > 0 && (
                        <div className="text-[9px] font-bold text-white text-center pt-1 hidden sm:block">
                          ₹{Math.round(day.revenue / 1000)}k
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* X-axis labels */}
            <div className="flex justify-between gap-3 pt-2 text-[10.5px] font-semibold text-gray-500">
              {chartDays.map((day, idx) => (
                <div key={idx} className="flex-1 text-center">
                  <div>{day.label}</div>
                  <div className="text-[9.5px] text-gray-400">{day.dateStr.slice(5)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Peak Day: {chartDays.reduce((prev, curr) => curr.revenue > prev.revenue ? curr : prev).label}</span>
            <span>Total 7-Day Revenue: <strong className="text-black">{formatPrice(chartDays.reduce((s, d) => s + d.revenue, 0))}</strong></span>
          </div>
        </div>

      {/* Low Stock Alert Table with Quick Restock Button */}
      {lowStockProducts.length > 0 && (
        <div className="bg-amber-50/60 rounded-2xl p-6 border border-amber-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-amber-950">
                  Critical Inventory Alerts ({lowStockProducts.length})
                </h3>
                <p className="text-[11px] text-amber-800">
                  Products with 5 or fewer units remaining. Restock immediately to prevent lost sales.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('/admin/products')}
              className="text-xs font-bold text-amber-900 hover:underline cursor-pointer"
            >
              Manage in Catalog →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs bg-white rounded-xl overflow-hidden border border-amber-200">
              <thead>
                <tr className="bg-amber-100/50 text-amber-900 text-[10.5px] font-bold uppercase tracking-wider border-b border-amber-200">
                  <th className="py-2.5 px-4">Product</th>
                  <th className="py-2.5 px-4">Category</th>
                  <th className="py-2.5 px-4">Price</th>
                  <th className="py-2.5 px-4">Stock Remaining</th>
                  <th className="py-2.5 px-4 text-right">Quick Restock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {lowStockProducts.slice(0, 6).map((prod) => (
                  <tr key={prod.id} className="hover:bg-amber-50/40">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={prod.images?.[0] || '/images/drop-wave-chain.jpg'}
                          alt={prod.title}
                          className="w-8 h-8 rounded-lg object-cover bg-gray-100 border border-gray-200"
                        />
                        <span className="font-bold text-gray-900">{prod.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{prod.category}</td>
                    <td className="py-3 px-4 font-bold text-gray-900">{formatPrice(prod.price)}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          (prod.stockQty || 0) <= 0
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {(prod.stockQty || 0) <= 0 ? 'Out of Stock (0)' : `${prod.stockQty} remaining`}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleRestock(prod.id, 5)}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-black hover:text-white rounded-lg text-[10.5px] font-bold transition-colors cursor-pointer"
                        >
                          +5
                        </button>
                        <button
                          onClick={() => handleRestock(prod.id, 15)}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-black hover:text-white rounded-lg text-[10.5px] font-bold transition-colors cursor-pointer"
                        >
                          +15
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => onNavigate('/admin/products')}
          className="bg-white p-4 rounded-2xl border border-[#EBEBEB] hover:border-black hover:shadow-xs transition-all text-left cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-900">Products & Inventory</span>
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
          </div>
          <p className="text-[11px] text-gray-500">Edit specs, prices, multi-images and stock</p>
        </button>

        <button
          onClick={() => onNavigate('/admin/categories')}
          className="bg-white p-4 rounded-2xl border border-[#EBEBEB] hover:border-black hover:shadow-xs transition-all text-left cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-900">Category Ordering</span>
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
          </div>
          <p className="text-[11px] text-gray-500">Reorder circles, manage slugs and images</p>
        </button>

        <button
          onClick={() => onNavigate('/admin/homepage')}
          className="bg-white p-4 rounded-2xl border border-[#EBEBEB] hover:border-black hover:shadow-xs transition-all text-left cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-900">Homepage Video & Reels</span>
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
          </div>
          <p className="text-[11px] text-gray-500">Live preview video banner & ticker</p>
        </button>

        <button
          onClick={() => onNavigate('/admin/reviews')}
          className="bg-white p-4 rounded-2xl border border-[#EBEBEB] hover:border-black hover:shadow-xs transition-all text-left cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-900">Review Moderation</span>
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
          </div>
          <p className="text-[11px] text-gray-500">
            {pendingReviews} review{pendingReviews === 1 ? '' : 's'} waiting approval
          </p>
        </button>
      </div>
    </div>
  );
};
