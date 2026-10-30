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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white text-[#111111] rounded-3xl shadow-2xl overflow-hidden border border-[#E5E5E5] z-10 grid grid-cols-1 md:grid-cols-2 max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-[#111111] shadow-sm hover:bg-[#111111] hover:text-white hover:scale-105 active:scale-95 transition-all border border-[#E5E5E5] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Product Images */}
          <div className="p-6 bg-[#F5F5F5] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E5E5E5]">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#F3F3F3] border border-[#E5E5E5] mb-4 shadow-xs">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={`${product.title} - ${(product.materials && product.materials[0]) || '316L Surgical Steel'} men's jewellery`}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-[#111111] text-white rounded-none">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-[#F3F3F3] cursor-pointer ${
                    activeImageIndex === i
                      ? 'border-[#111111] shadow-xs scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} - ${(product.materials && product.materials[0]) || '316L Surgical Steel'} view ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-white">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#111111]">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-xs font-medium text-[#111111]">
                  <Star className="w-3.5 h-3.5 fill-[#F5B301] text-[#F5B301]" />
                  <span>{product.rating}</span>
                  <span className="text-[#6B6B6B]">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#111111] leading-tight">
                {product.title}
              </h2>

              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-[#111111]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#6B6B6B] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-sm font-light text-[#6B6B6B] leading-relaxed">
                {product.description}
              </p>

              {/* Color swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2 pt-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-[#111111]">Finish:</span>
                    <span className="text-[#111111] font-semibold">{selectedColor}</span>
                  </div>
                  <div className="flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${
                          selectedColor === c.name
                            ? 'border-[#111111] bg-[#F5F5F5] text-[#111111] shadow-xs'
                            : 'border-[#E5E5E5] bg-white text-[#6B6B6B] hover:border-[#111111] hover:text-[#111111]'
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
            <div className="space-y-3 pt-6 mt-4 border-t border-[#E5E5E5]">
              <div className="flex gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#E5E5E5] rounded-full px-3 py-1.5 bg-[#F5F5F5]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-[#6B6B6B] hover:text-[#111111] cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-[#111111]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-[#6B6B6B] hover:text-[#111111] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart: Solid CTA #111 bg, white text */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-semibold text-sm transition-all duration-200 active:scale-[0.98] shadow-sm cursor-pointer ${
                    isAdded
                      ? 'bg-[#22c55e] text-white'
                      : 'bg-[#111111] text-white hover:bg-[#333333]'
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
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-[#E5E5E5] bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#111111] transition-all cursor-pointer"
                  aria-label="Wishlist"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFav ? 'fill-[#e04545] text-[#e04545]' : 'text-[#111111]'
                    }`}
                  />
                </button>
              </div>

              {/* View full page button */}
              <button
                onClick={handleViewFullDetails}
                className="w-full text-center text-xs font-semibold uppercase tracking-wider text-[#111111] hover:underline flex items-center justify-center gap-1 py-1 cursor-pointer"
              >
                <span>View Complete Product Details & Specs</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#6B6B6B] pt-1">
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
