import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';

interface FavouritePageProps {
  onQuickView: (product: Product) => void;
  onNavigate: (path: string) => void;
}

export const FavouritePage: React.FC<FavouritePageProps> = ({
  onQuickView,
  onNavigate
}) => {
  const { wishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddAllToCart = () => {
    wishlist.forEach((p) => addToCart(p, 1));
  };

  return (
    <div className="pt-24 pb-12 sm:py-20 bg-white text-[#111111]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#E5E5E5]">
          <div className="space-y-2">
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#111111]">
              Your Favourites
            </h1>
            <p className="text-sm text-[#6B6B6B]">
              {wishlist.length} item{wishlist.length === 1 ? '' : 's'} saved to your personal wishlist.
            </p>
          </div>

          {wishlist.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={clearWishlist}
                className="flex items-center gap-1.5 text-xs text-[#6B6B6B] hover:text-[#e04545] transition-colors px-3 py-2 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>

              <button
                onClick={handleAddAllToCart}
                className="flex items-center gap-2 bg-[#111111] text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#333333] transition-all shadow-sm cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move All to Bag</span>
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {wishlist.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center mx-auto text-[#6B6B6B] shadow-sm">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-light text-[#111111]">
              No favourites saved yet
            </h3>
            <p className="text-sm text-[#6B6B6B]">
              Click the heart icon on any jewelry piece across our collection to save it for later.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('/shop')}
                className="inline-flex items-center gap-2 bg-[#111111] text-white px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#333333] transition-all shadow-md cursor-pointer"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
