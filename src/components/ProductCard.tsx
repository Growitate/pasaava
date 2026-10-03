import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  onNavigate?: (slug: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onNavigate
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  const isFav = isInWishlist(product.id);
  const primaryImg = product.images[0];
  const hoverImg = product.images[1] || primaryImg;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleToggleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleCardClick = () => {
    if (onNavigate) {
      onNavigate(product.slug);
    } else {
      window.location.hash = `#/product/${product.slug}`;
    }
  };

  return (
    <motion.div
      className="group relative flex flex-col cursor-pointer bg-transparent"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-[16px] bg-[#f2efe9] border border-[#e8e8e8]/70">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`inline-flex items-center px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase rounded-full backdrop-blur-md shadow-sm ${
                product.badge === 'Best Seller'
                  ? 'bg-[#1c1c1a] text-white'
                  : product.badge === 'Sale'
                  ? 'bg-[#b9836a] text-white'
                  : 'bg-white/90 text-[#1c1c1a]'
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleToggleFav}
          aria-label={isFav ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-[#1c1c1a] shadow-sm transition-all duration-200 hover:bg-white hover:scale-110 active:scale-95"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isFav ? 'fill-[#e04545] text-[#e04545]' : 'text-[#1c1c1a]'
            }`}
          />
        </button>

        {/* Primary and Hover Images */}
        <img
          src={primaryImg}
          alt={product.title}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
            isHovered && hoverImg ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {hoverImg && (
          <img
            src={hoverImg}
            alt={`${product.title} alternate view`}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            style={{ transition: 'opacity 0.5s ease-out, transform 0.7s ease-out' }}
          />
        )}

        {/* Quick Actions overlay on hover */}
        <div
          className={`absolute inset-x-3 bottom-3 z-10 flex gap-2 transition-all duration-300 ${
            isHovered
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          {onQuickView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 h-10 rounded-full bg-white/95 backdrop-blur-md text-[#1c1c1a] text-[13px] font-medium shadow-md transition-transform duration-150 hover:bg-white hover:scale-[1.02] active:scale-95"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Quick View</span>
            </button>
          )}

          <button
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-1.5 h-10 px-4 rounded-full text-[13px] font-medium shadow-md transition-all duration-150 ${
              isAdded
                ? 'bg-[#22c55e] text-white scale-[1.02]'
                : 'bg-[#1c1c1a] text-white hover:bg-black hover:scale-[1.02] active:scale-95'
            } ${!onQuickView ? 'w-full' : ''}`}
          >
            {isAdded ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-3.5 flex flex-col space-y-1 px-1">
        <div className="flex items-center justify-between text-xs text-[#9a948e] uppercase tracking-wider font-medium">
          <span>{product.category}</span>
          {product.colors && product.colors.length > 1 && (
            <span className="text-[11px] text-[#6d6a67] lowercase">
              {product.colors.length} finishes
            </span>
          )}
        </div>

        <h3 className="text-[15px] font-medium text-[#1c1c1a] group-hover:text-[#b9836a] transition-colors leading-tight">
          {product.title}
        </h3>

        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-[15px] font-semibold text-[#1c1c1a]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[#9a948e] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
