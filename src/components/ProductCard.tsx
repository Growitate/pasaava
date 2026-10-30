import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Plus, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'bestseller';
  onQuickView?: (product: Product) => void;
  onNavigate?: (slug: string) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = 'default',
  onQuickView,
  onNavigate,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  const isFav = isInWishlist(product.id);
  const primaryImg = product.images[0] || '/images/cat-all-prod.jpg';
  const hoverImg = product.images.find((img) => img !== primaryImg) || primaryImg;
  const isSoldOut = !product.inStock || product.badge === 'Sold Out';
  const hasSale = Boolean(product.originalPrice && product.originalPrice > product.price);
  const finish = (product.materials && product.materials[0]) || '316L Surgical Steel';
  const imageAlt = `${product.title} - ${finish} men's jewellery`;

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
    const targetPath = `/product/${product.slug}`;
    if (onNavigate) {
      onNavigate(targetPath);
    } else {
      window.location.hash = `#${targetPath}`;
    }
  };

  if (variant === 'bestseller') {
    return (
      <div
        data-product-card
        className={`group relative flex flex-col cursor-pointer bg-transparent select-none ${className}`}
        onClick={handleCardClick}
      >
        {/* Card Image: 4/5 aspect ratio */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F5F5F5]">

          {/* Product Image */}
          <img
            src={primaryImg}
            alt={imageAlt}
            loading="lazy"
            className="w-full h-full object-cover object-center block transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />

          {/* Circular "+" Quick-Add Button */}
          {!isSoldOut && (
            <button
              onClick={handleAddToCart}
              aria-label="Quick add to bag"
              className="absolute bottom-2.5 right-2.5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/85 hover:bg-white text-[#111111] shadow-md backdrop-blur-xs border border-black/10 flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
            >
              {isAdded ? (
                <Check className="w-4 h-4 text-[#22c55e]" />
              ) : (
                <Plus className="w-4 h-4 text-[#111111]" />
              )}
            </button>
          )}
        </div>

        {/* Card Text */}
        <div className="mt-2.5 sm:mt-3 text-left px-0 space-y-1">
          <h3 className="text-[13px] sm:text-[14px] font-bold text-[#111111] uppercase tracking-[0.02em] truncate group-hover:underline">
            {product.title}
          </h3>
          <div className="flex items-center gap-2 text-[13px] sm:text-[14px] font-normal text-[#111111] leading-none">
            <span>Rs. {product.price.toFixed(2)}</span>
            {hasSale && product.originalPrice && (
              <span className="line-through text-[11px] sm:text-[12px] text-[#999999]">
                Rs. {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      data-product-card
      className={`group relative flex flex-col cursor-pointer bg-transparent select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Product Image Tile: 4/5 aspect ratio matching reference */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F5F5F5]">

        {/* Product Image */}
        <img
          src={primaryImg}
          alt={imageAlt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />

        {/* Circular "+" Quick-Add Button */}
        {!isSoldOut && (
          <button
            onClick={handleAddToCart}
            aria-label="Quick add to bag"
            className="absolute bottom-2.5 right-2.5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/85 hover:bg-white text-[#111111] shadow-md backdrop-blur-xs border border-black/10 flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
          >
            {isAdded ? (
              <Check className="w-4 h-4 text-[#22c55e]" />
            ) : (
              <Plus className="w-4 h-4 text-[#111111]" />
            )}
          </button>
        )}
      </div>

      {/* Text below the image without product description */}
      <div className="mt-2.5 sm:mt-3 text-left px-0 space-y-1">
        <h3 className="text-[13px] sm:text-[14px] font-bold text-[#111111] uppercase tracking-[0.02em] truncate group-hover:underline">
          {product.title}
        </h3>
        <div className="flex items-center gap-2 text-[13px] sm:text-[14px] text-[#111111] leading-none">
          <span className="font-normal">
            Rs. {product.price.toFixed(2)}
          </span>
          {hasSale && product.originalPrice && (
            <span className="line-through text-[#999999] text-[11px] sm:text-[12px]">
              Rs. {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
