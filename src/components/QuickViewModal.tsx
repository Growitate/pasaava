import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Plus, Minus, ShoppingBag, Check, ShieldCheck, ArrowRight, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onNavigate
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setSelectedColor(product.colors?.[0]?.name);
      setQuantity(1);
      setIsAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const isFav = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  const handleViewFullDetails = () => {
    onClose();
    onNavigate(`/product/${product.slug}`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#e8e8e8] z-10 grid grid-cols-1 md:grid-cols-2 max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-[#1c1c1a] shadow-md hover:bg-white hover:scale-105 active:scale-95 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Product Images */}
          <div className="p-6 bg-[#fafaf7] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#e8e8e8]">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-[#e8e8e8] mb-4 shadow-sm">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-[#1c1c1a] text-white rounded-full">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImageIndex === i
                      ? 'border-[#1c1c1a] shadow-sm scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#9a948e]">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-xs font-medium text-[#1c1c1a]">
                  <Star className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
                  <span>{product.rating}</span>
                  <span className="text-[#9a948e]">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1c1c1a] leading-tight">
                {product.title}
              </h2>

              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-[#1c1c1a]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#9a948e] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-sm text-[#6d6a67] leading-relaxed">
                {product.description}
              </p>

              {/* Color swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2 pt-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-[#1c1c1a]">Finish:</span>
                    <span className="text-[#9a948e]">{selectedColor}</span>
                  </div>
                  <div className="flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                          selectedColor === c.name
                            ? 'border-[#1c1c1a] bg-[#1c1c1a] text-white shadow-sm'
                            : 'border-[#e0e0e0] bg-white text-[#1c1c1a] hover:border-[#9a948e]'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-black/10"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-6 mt-4 border-t border-[#f0f0f0]">
              <div className="flex gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#e0e0e0] rounded-full px-3 py-1.5 bg-[#fafaf7]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-[#6d6a67] hover:text-[#1c1c1a]"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-[#1c1c1a]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-[#6d6a67] hover:text-[#1c1c1a]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-medium text-sm transition-all duration-200 active:scale-[0.98] shadow-md ${
                    isAdded
                      ? 'bg-[#22c55e] text-white'
                      : 'bg-[#1c1c1a] text-white hover:bg-black'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-[#e0e0e0] bg-white hover:bg-[#fafaf7] transition-all"
                  aria-label="Wishlist"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFav ? 'fill-[#e04545] text-[#e04545]' : 'text-[#1c1c1a]'
                    }`}
                  />
                </button>
              </div>

              {/* View full page button */}
              <button
                onClick={handleViewFullDetails}
                className="w-full text-center text-xs font-medium text-[#6d6a67] hover:text-[#b9836a] flex items-center justify-center gap-1 py-1"
              >
                <span>View Complete Product Details & Specs</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#9a948e] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" />
                <span>Waterproof • Tarnish Free • 2-Year Warranty</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
