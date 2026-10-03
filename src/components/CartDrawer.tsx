import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

interface CartDrawerProps {
  onNavigate: (path: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    subtotal,
    freeShippingThreshold,
    freeShippingRemaining,
    triggerCheckout,
    isCheckingOut,
    checkoutSuccess
  } = useCart();

  const { formatPrice } = useCurrency();
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'PASAAVA10' || promoCode.trim().toUpperCase() === 'WELCOME10' || promoCode.trim().toUpperCase() === 'GLINTURA10') {
      setDiscountPercent(10);
      setPromoMessage('10% VIP Discount Applied!');
    } else if (promoCode.trim().toUpperCase() === 'SPECIAL20') {
      setDiscountPercent(20);
      setPromoMessage('20% Exclusive Discount Applied!');
    } else {
      setPromoMessage('Invalid promo code. Try PASAAVA10');
    }
  };

  const discountAmount = (subtotal * discountPercent) / 100;
  const finalTotal = Math.max(0, subtotal - discountAmount);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed inset-y-0 right-0 w-full max-w-[440px] bg-white z-50 flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#e8e8e8] flex items-center justify-between bg-[#fafaf7]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#1c1c1a]" />
                <h3 className="font-serif text-lg font-normal tracking-wide text-[#1c1c1a]">
                  Your Bag
                </h3>
                <span className="text-xs bg-[#1c1c1a] text-white px-2 py-0.5 rounded-full font-medium">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full text-[#6d6a67] hover:text-[#1c1c1a] hover:bg-black/5 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Meter */}
            <div className="bg-[#f5f4f0] px-5 py-3 border-b border-[#e8e8e8]">
              <div className="flex items-center justify-between text-xs font-medium text-[#1c1c1a] mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#b9836a]" />
                  {freeShippingRemaining === 0 ? (
                    <span className="text-[#22c55e] font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Free Worldwide Shipping Unlocked!
                    </span>
                  ) : (
                    <span>
                      Add{' '}
                      <strong className="text-[#b9836a]">
                        {formatPrice(freeShippingRemaining)}
                      </strong>{' '}
                      more for Free Shipping
                    </span>
                  )}
                </span>
                <span className="text-[11px] text-[#9a948e]">
                  {Math.round(shippingProgress)}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-[#e0ded8] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${shippingProgress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className={`h-full rounded-full ${
                    shippingProgress >= 100 ? 'bg-[#22c55e]' : 'bg-[#b9836a]'
                  }`}
                />
              </div>
            </div>

            {/* Content Area */}
            {checkoutSuccess ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#fafaf7]">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-16 h-16 rounded-full bg-[#22c55e]/10 text-[#22c55e] flex items-center justify-center mb-4"
                >
                  <CheckCircle className="w-10 h-10" />
                </motion.div>
                <h3 className="font-serif text-2xl font-light text-[#1c1c1a] mb-2">
                  Order Confirmed!
                </h3>
                <p className="text-sm text-[#6d6a67] max-w-xs mb-6">
                  Thank you for your order with PASAAVA. A confirmation email and tracking link have been dispatched.
                </p>
                <div className="text-xs text-[#9a948e] bg-white border border-[#e8e8e8] px-4 py-2 rounded-xl">
                  Order #PAS-{Math.floor(100000 + Math.random() * 900000)}
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#fafaf7]">
                <div className="w-16 h-16 rounded-full bg-[#f0ede6] flex items-center justify-center text-[#9a948e] mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-medium text-[#1c1c1a] mb-2">
                  Your bag is empty
                </h4>
                <p className="text-sm text-[#6d6a67] max-w-xs mb-6">
                  Discover our engineered men's collections of chains, signet rings, and waterproof cuffs.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigate('/shop');
                  }}
                  className="inline-flex items-center gap-2 bg-[#1c1c1a] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-black transition-transform active:scale-95 shadow-md"
                >
                  <span>Explore Men's Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-[#f0f0f0]">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor || ''}`}
                    className="pt-4 first:pt-0 flex gap-4 items-start"
                  >
                    <div
                      onClick={() => {
                        setIsCartOpen(false);
                        onNavigate(`/product/${item.product.slug}`);
                      }}
                      className="w-20 h-20 rounded-xl overflow-hidden bg-[#f5f4f0] border border-[#e8e8e8] flex-shrink-0 cursor-pointer"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4
                          onClick={() => {
                            setIsCartOpen(false);
                            onNavigate(`/product/${item.product.slug}`);
                          }}
                          className="text-sm font-medium text-[#1c1c1a] hover:text-[#b9836a] transition-colors truncate cursor-pointer"
                        >
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#9a948e] hover:text-[#e04545] p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-xs text-[#9a948e] mt-0.5">
                        {item.selectedColor || item.product.category}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-[#e0e0e0] rounded-full bg-white px-2 py-0.5 shadow-sm">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-1 text-[#6d6a67] hover:text-[#1c1c1a] active:scale-90"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold text-[#1c1c1a]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-1 text-[#6d6a67] hover:text-[#1c1c1a] active:scale-90"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-sm font-semibold text-[#1c1c1a]">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && !checkoutSuccess && (
              <div className="p-5 border-t border-[#e8e8e8] bg-[#fafaf7] space-y-3.5">
                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (try PASAAVA10)"
                    className="flex-1 bg-white border border-[#e0e0e0] rounded-xl px-3 py-2 text-xs text-[#1c1c1a] placeholder-[#9a948e] focus:outline-none focus:border-[#1c1c1a]"
                  />
                  <button
                    type="submit"
                    className="bg-[#1c1c1a] text-white px-3.5 py-2 rounded-xl text-xs font-medium hover:bg-black transition-colors"
                  >
                    Apply
                  </button>
                </form>
                {promoMessage && (
                  <p
                    className={`text-[11px] ${
                      discountPercent > 0 ? 'text-[#22c55e]' : 'text-[#e04545]'
                    }`}
                  >
                    {promoMessage}
                  </p>
                )}

                {/* Subtotal calculation */}
                <div className="space-y-1.5 text-xs text-[#6d6a67]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#1c1c1a] font-medium">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-[#22c55e]">
                      <span>Discount ({discountPercent}%)</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-[#1c1c1a] font-medium">
                      {freeShippingRemaining === 0 ? 'Free' : formatPrice(15)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-[#1c1c1a] pt-2 border-t border-[#e8e8e8]">
                    <span>Estimated Total</span>
                    <span>
                      {formatPrice(
                        finalTotal + (freeShippingRemaining === 0 ? 0 : 15)
                      )}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={triggerCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-[#1c1c1a] text-white py-3.5 px-4 rounded-full font-medium text-sm flex items-center justify-center gap-2 hover:bg-black transition-all duration-200 active:scale-[0.98] shadow-lg disabled:opacity-75 cursor-pointer"
                >
                  {isCheckingOut ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Processing Order...</span>
                    </div>
                  ) : (
                    <>
                      <span>Secure Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#9a948e] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" />
                  <span>256-Bit SSL Encrypted • 30-Day Returns</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
