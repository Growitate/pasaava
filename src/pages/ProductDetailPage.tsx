import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  ShoppingBag,
  Check,
  ShieldCheck,
  Truck,
  Droplets,
  Sparkles,
  Star,
  ArrowRight,
  ChevronRight,
  Share2,
  Plus,
  Minus
} from 'lucide-react';
import { getProductBySlug, products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Accordion } from '../components/Accordion';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';

interface ProductDetailPageProps {
  slug: string;
  onQuickView: (product: Product) => void;
  onNavigate: (path: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  onQuickView,
  onNavigate
}) => {
  const product = getProductBySlug(slug) || products[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors?.[0]?.name
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImageIndex(0);
    setSelectedColor(product.colors?.[0]?.name);
    setQuantity(1);
    setIsAdded(false);
  }, [slug, product]);

  const isFav = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor);
    setIsCartOpen(true);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Matched products
  const matchProducts = (product.matchWithSlugs || [])
    .map((s) => getProductBySlug(s))
    .filter((p): p is Product => p !== undefined)
    .slice(0, 3);

  // Related products
  const relatedProducts = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.gender === product.gender)
    )
    .slice(0, 4);

  const accordionItems = [
    {
      id: 'desc',
      title: 'Description',
      defaultOpen: true,
      content: (
        <div className="space-y-3">
          <p>{product.description}</p>
          <p className="italic text-[#b9836a]">{product.tagline}</p>
        </div>
      )
    },
    {
      id: 'materials',
      title: 'Materials / Composition',
      content: (
        <ul className="list-disc pl-5 space-y-1.5">
          {product.materials.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      )
    },
    {
      id: 'dimensions',
      title: 'Dimensions & Fit',
      content: <p>{product.dimensions}</p>
    },
    {
      id: 'care',
      title: 'Care & Longevity',
      content: (
        <ul className="list-disc pl-5 space-y-1.5">
          {product.care.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      )
    }
  ];

  return (
    <div className="py-8 sm:py-12 bg-[#f8f6f3]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#9a948e] mb-8 font-medium">
          <button
            onClick={() => onNavigate('/')}
            className="hover:text-[#1c1c1a] transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button
            onClick={() => onNavigate('/shop')}
            className="hover:text-[#1c1c1a] transition-colors"
          >
            Men's Collection
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#1c1c1a] truncate">{product.title}</span>
        </nav>

        {/* Product Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Images Showcase */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Image */}
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#fafaf7] border border-[#e8e8e8] shadow-md">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />

              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={`inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full backdrop-blur-md shadow-sm ${
                      product.badge === 'Best Seller'
                        ? 'bg-[#1c1c1a] text-white'
                        : product.badge === 'Sale'
                        ? 'bg-[#b9836a] text-white'
                        : 'bg-white text-[#1c1c1a]'
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(product)}
                aria-label="Wishlist"
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-[#1c1c1a] shadow-md hover:bg-white hover:scale-105 active:scale-95 transition-all"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFav ? 'fill-[#e04545] text-[#e04545]' : 'text-[#1c1c1a]'
                  }`}
                />
              </button>
            </div>

            {/* Thumbnails Row */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-square rounded-2xl overflow-hidden bg-white border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#1c1c1a] shadow-sm scale-102'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Purchase Details & Accordions */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="space-y-3 pb-4 border-b border-[#e8e8e8]">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#b9836a]">
                  {product.category}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-medium text-[#1c1c1a]">
                  <div className="flex text-[#d4af37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span>{product.rating}</span>
                  <span className="text-[#9a948e]">
                    ({product.reviewCount} verified reviews)
                  </span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1c1c1a] leading-tight">
                {product.title}
              </h1>

              {product.subtitle && (
                <p className="text-xs uppercase tracking-wider text-[#6d6a67] font-medium">
                  {product.subtitle}
                </p>
              )}

              <div className="flex items-center gap-3 pt-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#1c1c1a]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-[#9a948e] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-semibold bg-[#b9836a]/15 text-[#b9836a] px-2 py-0.5 rounded-full">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                )}
              </div>
            </div>

            {/* Tagline snippet */}
            <p className="text-sm text-[#6d6a67] leading-relaxed">
              {product.description}
            </p>

            {/* Color/Material Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2.5 pt-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-[#1c1c1a]">Select Finish / Color:</span>
                  <span className="text-[#b9836a] font-semibold">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium transition-all ${
                        selectedColor === c.name
                          ? 'border-[#1c1c1a] bg-[#1c1c1a] text-white shadow-sm'
                          : 'border-[#e0e0e0] bg-white text-[#1c1c1a] hover:border-[#1c1c1a]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3">
                {/* Quantity Control */}
                <div className="flex items-center border border-[#e0e0e0] rounded-full px-3 py-2 bg-white shadow-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-[#6d6a67] hover:text-[#1c1c1a]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-[#1c1c1a]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-[#6d6a67] hover:text-[#1c1c1a]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-full font-medium text-sm transition-all duration-200 active:scale-[0.98] shadow-md ${
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
                      <span>Add to Bag • {formatPrice(product.price * quantity)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Instant Buy Now */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-[#b9836a] text-white py-3.5 px-6 rounded-full font-medium text-sm hover:bg-[#a3725b] transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>Instant Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between pt-1 text-xs text-[#9a948e]">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 hover:text-[#1c1c1a] transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Link Copied!' : 'Share Piece'}</span>
                </button>

                <span className="flex items-center gap-1 text-[#22c55e]">
                  <Check className="w-3.5 h-3.5" />
                  In Stock & Ready to Ship
                </span>
              </div>
            </div>

            {/* Value Highlights */}
            <div className="grid grid-cols-2 gap-3 py-4 border-y border-[#e8e8e8] text-xs text-[#6d6a67]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#b9836a]" />
                <span>Free Worldwide Shipping $75+</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
                <span>2-Year Craftsmanship Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-[#b9836a]" />
                <span>100% Waterproof & Sweatproof</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#b9836a]" />
                <span>Hypoallergenic 925 & Steel</span>
              </div>
            </div>

            {/* Collapsible Accordions for Specs & Care */}
            <Accordion items={accordionItems} allowMultiple={false} />
          </div>
        </div>

        {/* Perfect Match With Section */}
        {matchProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-[#e8e8e8]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#b9836a]">
                  Layering Suggestion
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1c1c1a]">
                  Perfect Match With
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {matchProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={onQuickView}
                  onNavigate={(slug) => onNavigate(`/product/${slug}`)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Review Spotlight Quote */}
        {product.reviewQuote && (
          <div className="mt-20 bg-white rounded-3xl p-8 sm:p-12 border border-[#e8e8e8] shadow-sm text-center max-w-3xl mx-auto space-y-4">
            <div className="flex justify-center text-[#d4af37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="font-serif italic text-lg sm:text-2xl font-light text-[#1c1c1a] leading-snug">
              "{product.reviewQuote.text}"
            </p>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#9a948e]">
              — {product.reviewQuote.author} <span className="text-[#22c55e]">• Verified Buyer</span>
            </div>
          </div>
        )}

        {/* Related Products Grid */}
        <div className="mt-24 pt-16 border-t border-[#e8e8e8]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#b9836a]">
                More Discoveries
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1c1c1a]">
                Continue Your Journey
              </h3>
            </div>
            <button
              onClick={() => onNavigate('/shop')}
              className="text-xs font-semibold uppercase tracking-wider text-[#1c1c1a] hover:text-[#b9836a] flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={onQuickView}
                onNavigate={(slug) => onNavigate(`/product/${slug}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
