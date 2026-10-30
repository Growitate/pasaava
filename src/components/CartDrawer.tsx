import React, { useState, useEffect } from 'react';
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
import { GuestCheckoutModal } from './GuestCheckoutModal';

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
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      promoCode.trim().toUpperCase() === 'PASAAVA10' ||
      promoCode.trim().toUpperCase() === 'WELCOME10' ||
      promoCode.trim().toUpperCase() === 'GLINTURA10'
    ) {
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

  useEffect(() => {
    if (isCartOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isCartOpen]);

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed inset-y-0 right-0 w-full max-w-[440px] h-full h-[100dvh] max-h-screen bg-white text-[#111111] z-[70] flex flex-col shadow-2xl overflow-hidden border-l border-[#E5E5E5] overscroll-contain"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#E5E5E5] flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#111111]" />
                <h3 className="font-serif text-lg font-normal tracking-wide text-[#111111]">
                  Your Bag
                </h3>
                <span className="text-xs bg-[#111111] text-white px-2 py-0.5 rounded-full font-medium">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full text-[#6B6B6B] hover:text-[#111111] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Meter */}
            <div className="bg-[#F5F5F5] px-5 py-3 border-b border-[#E5E5E5]">
              <div className="flex items-center justify-between text-xs font-medium text-[#111111] mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#111111]" />
                  {freeShippingRemaining === 0 ? (
                    <span className="text-[#22c55e] font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Free Worldwide Shipping Unlocked!
                    </span>
                  ) : (
                    <span>
                      Add <strong className="text-[#111111]">{formatPrice(freeShippingRemaining)}</strong> more for Free Shipping
                    </span>
                  )}
                </span>
                <span className="text-[11px] text-[#6B6B6B]">
                  {Math.round(shippingProgress)}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-[#E5E5E5] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${shippingProgress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className={`h-full rounded-full ${
                    shippingProgress >= 100 ? 'bg-[#22c55e]' : 'bg-[#111111]'
                  }`}
                />
              </div>
            </div>

            {/* Content Area */}
            {checkoutSuccess ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-16 h-16 rounded-full bg-[#22c55e]/10 text-[#22c55e] flex items-center justify-center mb-4 border border-[#22c55e]/20"
                >
                  <CheckCircle className="w-10 h-10" />
                </motion.div>
                <h3 className="font-serif text-2xl font-light text-[#111111] mb-2">
                  Order Confirmed!
                </h3>
                <p className="text-sm text-[#6B6B6B] max-w-xs mb-6 leading-relaxed">
                  Thank you for your order with PASAAVA. A confirmation email and tracking link have been dispatched.
                </p>
                <div className="text-xs text-[#111111] bg-[#F5F5F5] border border-[#E5E5E5] px-4 py-2 rounded-xl font-medium">
                  Order #PAS-{Math.floor(100000 + Math.random() * 900000)}
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
                <div className="w-16 h-16 rounded-full bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center text-[#6B6B6B] mb-4">
                  <ShoppingBag className="w-8 h-8 text-[#111111]" />
                </div>
                <h4 className="text-lg font-medium text-[#111111] mb-2">
                  Your bag is empty
                </h4>
                <p className="text-sm text-[#6B6B6B] max-w-xs mb-6">
                  Discover our engineered men's collections of chains, signet rings, and waterproof cuffs.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigate('/shop');
                  }}
                  className="inline-flex items-center gap-2 bg-[#111111] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#333333] transition-all active:scale-95 shadow-sm cursor-pointer"
                >
                  <span>Explore Men's Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-[#E5E5E5]">
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
                      className="w-20 h-20 rounded-xl overflow-hidden bg-[#F3F3F3] border border-[#E5E5E5] flex-shrink-0 cursor-pointer"
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
                          className="text-sm font-medium text-[#111111] hover:text-[#444444] transition-colors truncate cursor-pointer"
                        >
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#8E8E93] hover:text-[#e04545] p-1 transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-xs text-[#6B6B6B] mt-0.5">
                        {item.selectedColor || item.product.category}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-[#E5E5E5] rounded-full bg-[#F5F5F5] px-2 py-0.5 shadow-xs">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-1 text-[#6B6B6B] hover:text-[#111111] active:scale-90 cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold text-[#111111]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-1 text-[#6B6B6B] hover:text-[#111111] active:scale-90 cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-sm font-semibold text-[#111111]">
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
              <div className="p-5 border-t border-[#E5E5E5] bg-[#F5F5F5] space-y-3.5">
                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (try PASAAVA10)"
                    className="flex-1 bg-white border border-[#E5E5E5] rounded-xl px-3 py-2 text-xs text-[#111111] placeholder-[#6B6B6B] focus:outline-none focus:border-[#111111]"
                  />
                  <button
                    type="submit"
                    className="bg-[#111111] text-white px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-[#333333] transition-colors cursor-pointer"
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
                <div className="space-y-1.5 text-xs text-[#6B6B6B]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#111111] font-medium">
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
                    <span className="text-[#111111] font-medium">
                      {freeShippingRemaining === 0 ? 'Free' : formatPrice(99)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-[#111111] pt-2 border-t border-[#E5E5E5]">
                    <span>Estimated Total</span>
                    <span className="text-[#111111]">
                      {formatPrice(
                        finalTotal + (freeShippingRemaining === 0 ? 0 : 99)
                      )}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => setIsCheckoutModalOpen(true)}
                  disabled={cart.length === 0}
                  className="w-full bg-[#111111] text-white py-3.5 px-4 rounded-full font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#333333] transition-all duration-200 active:scale-[0.98] shadow-sm disabled:opacity-75 cursor-pointer"
                >
                  <span>Secure Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#6B6B6B] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" />
                  <span>256-Bit SSL Encrypted • 30-Day Returns</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>

    {/* Express Guest Checkout Modal */}
    <GuestCheckoutModal
      isOpen={isCheckoutModalOpen}
      onClose={() => setIsCheckoutModalOpen(false)}
      discountAmount={discountAmount}
      promoCode={discountPercent > 0 ? promoCode : undefined}
      onNavigate={onNavigate}
    />
    </>
  );
};
