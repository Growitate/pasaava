import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShieldCheck,
  Truck,
  IndianRupee,
  CheckCircle2,
  ArrowRight,
  PackageCheck,
  CreditCard,
  Banknote,
  QrCode,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { storageService } from '../services/storageService';
import { razorpayService } from '../services/razorpayService';
import { whatsappService } from '../services/whatsappService';
import { Order, OrderItem } from '../types';

interface GuestCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  discountAmount?: number;
  promoCode?: string;
  onNavigate: (path: string) => void;
}

export const GuestCheckoutModal: React.FC<GuestCheckoutModalProps> = ({
  isOpen,
  onClose,
  discountAmount = 0,
  promoCode,
  onNavigate
}) => {
  const { cart, subtotal, clearCart, setIsCartOpen } = useCart();
  const { formatPrice } = useCurrency();

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI' | 'Razorpay'>('COD');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Delivery Calculations: Free over ₹999, else ₹99
  const shippingFee = subtotal >= 999 ? 0 : 99;
  const finalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    const cleanPincode = pincode.replace(/[^0-9]/g, '');
    if (cleanPincode.length !== 6) {
      setError('Please enter a valid 6-digit postal pincode.');
      return;
    }

    if (!address.trim() || !city.trim()) {
      setError('Please provide your complete delivery address and city.');
      return;
    }

    setIsSubmitting(true);

    // Prepare order items
    const orderItems: OrderItem[] = cart.map((item) => ({
      productId: item.product.id,
      productSlug: item.product.slug,
      title: item.product.title,
      image: item.product.images?.[0] || '/images/drop-wave-chain.jpg',
      price: item.product.price,
      quantity: item.quantity,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize
    }));

    const finalizeOrder = (
      method: 'Razorpay' | 'COD' | 'UPI',
      payStatus: 'Paid' | 'Pending',
      rzpPaymentId?: string,
      rzpOrderId?: string
    ) => {
      try {
        const newOrder = storageService.createOrder({
          items: orderItems,
          customer: {
            name: name.trim(),
            phone: `+91 ${cleanPhone.slice(-10)}`,
            email: email.trim(),
            address: address.trim(),
            city: city.trim(),
            state,
            pincode: cleanPincode
          },
          amount: finalAmount,
          subtotal,
          shippingFee,
          paymentMethod: method,
          paymentStatus: payStatus,
          orderStatus: 'New',
          razorpayPaymentId: rzpPaymentId,
          razorpayOrderId: rzpOrderId
        });

        // Notify store owner via WhatsApp service
        whatsappService.notifyOwnerOnNewOrder(newOrder);

        // Clear cart & show confetti
        clearCart();
        setIsCartOpen(false);
        setCompletedOrder(newOrder);
        setIsSubmitting(false);

        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}
      } catch (err) {
        console.error('Order placement error:', err);
        setError('Failed to process your order. Please try again.');
        setIsSubmitting(false);
      }
    };

    if (paymentMethod === 'Razorpay') {
      const tempOrderNo = `PAS-${Math.floor(10000 + Math.random() * 90000)}`;
      razorpayService.launchCheckout({
        amountInRupees: finalAmount,
        orderNo: tempOrderNo,
        itemCount: cart.length,
        customer: {
          name: name.trim(),
          email: email.trim(),
          phone: `+91 ${cleanPhone.slice(-10)}`,
          address: address.trim(),
          city: city.trim(),
          pincode: cleanPincode
        },
        onSuccess: (paymentData) => {
          finalizeOrder(
            'Razorpay',
            'Paid',
            paymentData.razorpay_payment_id,
            paymentData.razorpay_order_id
          );
        },
        onError: (errMsg) => {
          setError(errMsg);
          setIsSubmitting(false);
        },
        onDismiss: () => {
          setIsSubmitting(false);
        }
      });
      return;
    }

    // COD or UPI instant simulation
    setTimeout(() => {
      finalizeOrder(paymentMethod, paymentMethod === 'COD' ? 'Pending' : 'Paid');
    }, 600);
  };

  const handleClose = () => {
    if (completedOrder) {
      setCompletedOrder(null);
      setName('');
      setPhone('');
      setEmail('');
      setAddress('');
      setCity('');
      setPincode('');
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-[#FAFAFA]">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black tracking-[0.2em] text-[#111111] uppercase">
              PASAAVA
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs font-semibold text-gray-600">Express Guest Checkout</span>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Either Form or Order Success Screen */}
        <div className="flex-1 overflow-y-auto p-6">
          {completedOrder ? (
            /* Order Success View */
            <div className="text-center py-6 px-2 space-y-5">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-200 shadow-sm animate-bounce">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#111111]">
                  Order Placed Successfully!
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Thank you, <strong className="text-black">{completedOrder.customer.name}</strong>. Your luxury pieces are being prepared for dispatch.
                </p>
              </div>

              {/* Order Reference Box */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 max-w-md mx-auto space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-500 font-medium">Order Reference:</span>
                  <span className="font-mono font-bold text-black text-sm">{completedOrder.orderNo}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Total Paid/Due:</span>
                  <span className="font-bold text-black">{formatPrice(completedOrder.amount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Payment Mode:</span>
                  <span className="font-semibold text-emerald-700">{completedOrder.paymentMethod}</span>
                </div>
                {completedOrder.razorpayPaymentId && (
                  <div className="flex justify-between items-center text-[11px] pt-1 border-t border-gray-100">
                    <span className="text-gray-500">Razorpay ID:</span>
                    <span className="font-mono text-purple-700 font-bold">
                      {completedOrder.razorpayPaymentId}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center text-[10.5px] text-emerald-600 font-semibold pt-1">
                  <span>Atelier Dispatch Alert:</span>
                  <span>WhatsApp Notified ✓</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center max-w-md mx-auto">
                <a
                  href={`https://wa.me/${completedOrder.customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello PASAAVA Concierge, I just placed order ${completedOrder.orderNo} for ${formatPrice(
                      completedOrder.amount
                    )}. Looking forward to my pieces!`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat with Concierge</span>
                </a>

                <button
                  onClick={() => {
                    handleClose();
                    onNavigate('/shop');
                  }}
                  className="flex-1 py-3 px-5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-all cursor-pointer shadow-sm"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                  {error}
                </div>
              )}

              {/* Order Items Snapshot */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  Bag Items ({cart.reduce((s, i) => s + i.quantity, 0)})
                </span>
                <div className="max-h-36 overflow-y-auto divide-y divide-gray-200/60 pr-1">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.images?.[0] || '/images/drop-wave-chain.jpg'}
                          alt={item.product.title}
                          className="w-10 h-10 rounded-lg object-cover bg-white border border-gray-200"
                        />
                        <div>
                          <div className="font-bold text-black truncate max-w-[200px] sm:max-w-xs">
                            {item.product.title}
                          </div>
                          <div className="text-[10px] text-gray-500">
                            Qty: {item.quantity} {item.selectedColor ? `• ${item.selectedColor}` : ''}
                          </div>
                        </div>
                      </div>
                      <span className="font-bold text-black">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aryan Sehgal"
                      className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <div className="flex items-center">
                      <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-xs font-semibold text-gray-500">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="98765 43210"
                        className="w-full px-3 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-r-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    Email Address (for order tracking)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aryan.sehgal@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                  2. Shipping Destination (India)
                </h3>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    House / Apartment / Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Flat 301, Tower A, Palm Heights, Main Road"
                    className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Mumbai"
                      className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      State *
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black cursor-pointer"
                    >
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi NCR</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Other">Other States</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      6-Digit Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="400001"
                      className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Mode */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                  3. Payment Method
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <label
                    onClick={() => setPaymentMethod('COD')}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      paymentMethod === 'COD'
                        ? 'border-black bg-black/5 text-black shadow-xs'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-emerald-600" />
                    <span>Cash on Delivery</span>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('UPI')}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      paymentMethod === 'UPI'
                        ? 'border-black bg-black/5 text-black shadow-xs'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-blue-600" />
                    <span>Instant UPI / GPay</span>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('Razorpay')}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      paymentMethod === 'Razorpay'
                        ? 'border-black bg-black/5 text-black shadow-xs'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-purple-600" />
                    <span>Razorpay Card/Net</span>
                  </label>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-black">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount Applied ({promoCode})</span>
                    <span className="font-semibold">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Express Shipping</span>
                  <span className="font-semibold text-black">
                    {shippingFee === 0 ? 'FREE (Over ₹999)' : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between items-center text-sm font-bold text-black">
                  <span>Total Amount</span>
                  <span>{formatPrice(finalAmount)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full bg-[#111111] text-white py-4 px-6 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all duration-200 active:scale-[0.99] shadow-md disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Confirm Order • {formatPrice(finalAmount)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10.5px] text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>PASAAVA Atelier Guarantee • Verified Tracked Dispatch</span>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
