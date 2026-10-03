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
    <div className="py-12 sm:py-20 bg-[#f8f6f3]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#e8e8e8]">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#b9836a]">
              Saved Pieces
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1c1c1a]">
              Your Favourites
            </h1>
            <p className="text-sm text-[#6d6a67]">
              {wishlist.length} item{wishlist.length === 1 ? '' : 's'} saved to your personal wishlist.
            </p>
          </div>

          {wishlist.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={clearWishlist}
                className="flex items-center gap-1.5 text-xs text-[#9a948e] hover:text-[#e04545] transition-colors px-3 py-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>

              <button
                onClick={handleAddAllToCart}
                className="flex items-center gap-2 bg-[#1c1c1a] text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-black transition-all shadow-sm"
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
            <div className="w-16 h-16 rounded-full bg-white border border-[#e8e8e8] flex items-center justify-center mx-auto text-[#9a948e] shadow-sm">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-light text-[#1c1c1a]">
              No favourites saved yet
            </h3>
            <p className="text-sm text-[#6d6a67]">
              Click the heart icon on any jewelry piece across our collection to save it for later.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('/shop')}
                className="inline-flex items-center gap-2 bg-[#1c1c1a] text-white px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-black transition-all shadow-md"
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
                onNavigate={(slug) => onNavigate(`/product/${slug}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
