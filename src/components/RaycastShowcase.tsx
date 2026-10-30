import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  CornerDownLeft,
  ShoppingBag
} from 'lucide-react';
import { Product } from '../types';
import { products } from '../data/products';

export interface CategoryDockItem {
  id: string;
  name: string;
  label: string;
  image: string;
}

export const CATEGORY_ITEMS: CategoryDockItem[] = [
  {
    id: 'all',
    name: 'All Pieces',
    label: 'ALL PIECES',
    image: '/images/cat-all-prod.jpg'
  },
  {
    id: 'earrings',
    name: 'Earrings',
    label: 'EARRINGS',
    image: '/images/cat-earrings-prod.jpg'
  },
  {
    id: 'chains',
    name: 'Chains',
    label: 'CHAINS',
    image: '/images/cat-chains-prod.jpg'
  },
  {
    id: 'pendants',
    name: 'Pendants',
    label: 'PENDANTS',
    image: '/images/cat-pendants-prod.jpg'
  },
  {
    id: 'bracelets',
    name: 'Bracelets',
    label: 'BRACELETS',
    image: '/images/cat-bracelets-prod.jpg'
  },
  {
    id: 'rings',
    name: 'Rings',
    label: 'RINGS',
    image: '/images/cat-rings-prod.jpg'
  }
];

// Helper to filter products by category accurately
export const filterProductsByCategory = (allProducts: Product[], categoryId: string): Product[] => {
  if (categoryId === 'all' || !categoryId) return allProducts;
  const sel = categoryId.toLowerCase();
  return allProducts.filter((p) => {
    const cat = p.category.toLowerCase();
    const title = p.title.toLowerCase();
    const subtitle = (p.subtitle || '').toLowerCase();
    const desc = p.description.toLowerCase();

    if (sel === 'pendants' || sel === 'pendant') {
      return title.includes('pendant') || subtitle.includes('pendant') || desc.includes('pendant') || cat.includes('pendant');
    }
    if (sel === 'chains' || sel === 'chain') {
      return cat.includes('chain') || title.includes('chain');
    }
    return cat.includes(sel) || title.includes(sel);
  });
};

interface RaycastShowcaseProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  sortBy?: string;
  onSortByChange?: (sort: string) => void;
  onQuickView: (product: Product) => void;
  onNavigate: (path: string) => void;
  onScrollToGrid?: () => void;
}

export const RaycastShowcase: React.FC<RaycastShowcaseProps> = ({
  selectedCategory,
  onSelectCategory,
  onNavigate,
  onScrollToGrid
}) => {
  const prefersReducedMotion = useReducedMotion();

  // Category counts
  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    CATEGORY_ITEMS.forEach((item) => {
      map[item.id] = filterProductsByCategory(products, item.id).length;
    });
    return map;
  }, []);

  // Products belonging to the selected category
  const categoryProducts = useMemo(() => {
    return filterProductsByCategory(products, selectedCategory);
  }, [selectedCategory]);

  // Active product index in the category slideshow
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredDockIndex, setHoveredDockIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const dockItemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Current active product
  const currentProduct = categoryProducts[activeProductIndex] || categoryProducts[0] || products[0];

  // Reset active product to 0 and scroll to start whenever category changes
  useEffect(() => {
    setActiveProductIndex(0);
    if (scrollTrackRef.current) {
      scrollTrackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [selectedCategory]);

  // Desktop detection for macOS dock magnification
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768 && window.matchMedia('(hover: hover)').matches);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Scroll to a specific product index
  const scrollToIndex = (index: number) => {
    if (!scrollTrackRef.current) return;
    const container = scrollTrackRef.current;
    const itemWidth = container.clientWidth;
    container.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth'
    });
    setActiveProductIndex(index);
  };

  const handleNext = () => {
    if (categoryProducts.length <= 1) return;
    const nextIdx = (activeProductIndex + 1) % categoryProducts.length;
    scrollToIndex(nextIdx);
  };

  const handlePrev = () => {
    if (categoryProducts.length <= 1) return;
    const prevIdx = (activeProductIndex - 1 + categoryProducts.length) % categoryProducts.length;
    scrollToIndex(prevIdx);
  };

  // Sync activeProductIndex on user horizontal scroll
  const handleScroll = () => {
    if (!scrollTrackRef.current) return;
    const container = scrollTrackRef.current;
    const itemWidth = container.clientWidth;
    if (itemWidth > 0) {
      const newIndex = Math.round(container.scrollLeft / itemWidth);
      if (newIndex !== activeProductIndex && newIndex >= 0 && newIndex < categoryProducts.length) {
        setActiveProductIndex(newIndex);
      }
    }
  };

  // Auto-advance slideshow every 3.5s (paused on hover / user interaction)
  useEffect(() => {
    if (isPaused || prefersReducedMotion || categoryProducts.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, prefersReducedMotion, categoryProducts.length, activeProductIndex]);

  // Keyboard navigation: Arrow keys Left/Right
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Enter' && currentProduct) {
        e.preventDefault();
        onNavigate(`/product/${currentProduct.slug}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [categoryProducts, currentProduct, activeProductIndex, onNavigate]);

  const currentCategoryObj = CATEGORY_ITEMS.find((c) => c.id === selectedCategory) || CATEGORY_ITEMS[0];

  return (
    <div className="w-full flex flex-col items-center mb-6 md:mb-12 sm:mb-16">
      {/* 1. DOCK ABOVE THE CARD (Holds All Pieces, Earrings, Chains, Pendants, Bracelets, Rings) */}
      <div className="w-full flex flex-col items-center mb-2 md:mb-6 sm:mb-8 z-30">
        {/* Clean Category Icons Row without background rectangular box */}
        <div
          role="tablist"
          aria-label="Jewelry categories dock"
          className="bg-transparent pt-2 pb-3 px-3 sm:px-6 flex items-center justify-start sm:justify-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto w-full max-w-full no-scrollbar select-none touch-pan-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {CATEGORY_ITEMS.map((item, index) => {
            const isAll = item.id === 'all';
            const isActive =
              isAll
                ? selectedCategory.toLowerCase() === 'all' || selectedCategory === ''
                : selectedCategory.toLowerCase().includes(item.id.toLowerCase()) ||
                  item.id.toLowerCase().includes(selectedCategory.toLowerCase());

            // Magnification Scale calculation (desktop only)
            let scale = 1;
            if (isDesktop && hoveredDockIndex !== null) {
              if (hoveredDockIndex === index) {
                scale = 1.18;
              } else if (Math.abs(hoveredDockIndex - index) === 1) {
                scale = 1.08;
              }
            }

            const count = categoryCounts[item.id] || 0;
            const isHovered = hoveredDockIndex === index && isDesktop;

            return (
              <div
                key={item.id}
                className="relative flex flex-col items-center flex-shrink-0"
                onMouseEnter={() => setHoveredDockIndex(index)}
                onMouseLeave={() => setHoveredDockIndex(null)}
              >
                {/* Raycast Tooltip Pill Above Hovered Icon */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.9 }}
                      transition={{ duration: 0.16 }}
                      className="absolute -top-8 sm:-top-9 left-1/2 -translate-x-1/2 z-50 bg-[#111111] text-white text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-lg pointer-events-none whitespace-nowrap flex items-center gap-1.5"
                    >
                      <span>{item.name}</span>
                      <span className="text-white/60 font-normal">·</span>
                      <span className="text-white font-bold">{count}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Tab Button */}
                <button
                  ref={(el) => (dockItemRefs.current[index] = el)}
                  role="tab"
                  id={`dock-tab-${item.id}`}
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => onSelectCategory(item.id)}
                  className="group flex flex-col items-center cursor-pointer focus:outline-none select-none px-1"
                  aria-label={`${item.name} (${count} pieces)`}
                  style={{
                    transform: isActive ? `translateY(-4px) scale(${scale})` : `scale(${scale})`,
                    transition: 'transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  {/* Round Icon */}
                  <div
                    className={`w-[54px] h-[54px] sm:w-[58px] sm:h-[58px] md:w-[64px] md:h-[64px] rounded-full bg-transparent flex items-center justify-center p-1.5 sm:p-2 overflow-hidden transition-all duration-300 relative ${
                      isActive
                        ? 'ring-[1.5px] ring-[#111111]'
                        : 'ring-1 ring-black/15 hover:ring-[#111111] opacity-85 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.label}
                      width="64"
                      height="64"
                      className="w-full h-full object-contain rounded-full pointer-events-none mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Category Label */}
                  <span
                    className={`mt-1.5 text-[9.5px] sm:text-[10.5px] font-bold tracking-[0.12em] uppercase transition-colors text-center whitespace-nowrap ${
                      isActive ? 'text-[#111111]' : 'text-[#6B6B6B] group-hover:text-[#111111]'
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Small Active Dot Below Label */}
                  {isActive ? (
                    <span className="mt-0.5 w-1 h-1 rounded-full bg-[#111111]" />
                  ) : (
                    <span className="mt-0.5 w-1 h-1 rounded-full bg-transparent" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. SCROLLABLE SLIDESHOW SHOWCASE CARD */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="hidden md:block relative w-full max-w-[960px] mx-auto z-20 select-none"
      >
        {/* Soft Ambient Glow */}
        <div className="absolute -inset-4 bg-black/[0.06] blur-[60px] rounded-[32px] -z-10 pointer-events-none" />

        {/* The Card Window Container */}
        <div className="w-full bg-white rounded-[20px] border border-black/[0.08] shadow-[0_24px_70px_rgba(0,0,0,0.10)] overflow-hidden flex flex-col relative group/card">
          {/* SCROLLABLE HORIZONTAL PRODUCT TRACK */}
          <div
            ref={scrollTrackRef}
            onScroll={handleScroll}
            className="w-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar select-none cursor-grab active:cursor-grabbing touch-pan-x"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {categoryProducts.length === 0 ? (
              <div className="p-16 w-full text-center text-sm text-black/40">
                No products found for this category.
              </div>
            ) : (
              categoryProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => onNavigate(`/product/${product.slug}`)}
                  className="snap-center flex-shrink-0 w-full relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10] max-h-[460px] bg-[#F7F7F7] overflow-hidden cursor-pointer group"
                >
                  {/* High-Resolution Product Image */}
                  <img
                    src={product.images[0] || '/images/cat-all-prod.jpg'}
                    alt={product.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />

                  {/* Dark Radial & Gradient Scrim for Clean Text Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  {/* Product Details Bar Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase px-2 py-0.5 rounded bg-white/20 backdrop-blur-md text-white">
                          {product.category}
                        </span>
                        {product.badge && (
                          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase px-2 py-0.5 rounded bg-white text-black">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      {/* Product Name */}
                      <h3 className="text-lg sm:text-2xl md:text-3xl font-normal tracking-tight uppercase text-white font-sans drop-shadow-sm group-hover:underline">
                        {product.title}
                      </h3>

                      {/* Subtitle / Price */}
                      <p className="text-xs sm:text-sm text-white/80 font-light flex items-center gap-2">
                        <span>Rs. {product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="line-through text-white/50 text-xs">
                            Rs. {product.originalPrice.toFixed(2)}
                          </span>
                        )}
                        {product.subtitle && (
                          <>
                            <span className="text-white/40">•</span>
                            <span className="truncate">{product.subtitle}</span>
                          </>
                        )}
                      </p>
                    </div>

                    {/* View Product CTA */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate(`/product/${product.slug}`);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-white text-black hover:bg-white/90 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase transition-all shadow-md cursor-pointer active:scale-95"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>View Piece</span>
                        <CornerDownLeft className="w-2.5 h-2.5 text-black/60 hidden sm:inline" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* C. FOOTER CONTROLS (Slim 34px bar) */}
          <div className="h-[34px] px-4 sm:px-6 bg-white border-t border-black/[0.06] flex items-center justify-end">
            {/* Right: Counter + Next / Prev Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-medium text-black/50 mr-0.5">
                {String(activeProductIndex + 1).padStart(2, '0')} / {String(categoryProducts.length).padStart(2, '0')}
              </span>

              <button
                onClick={handlePrev}
                aria-label="Previous product"
                className="w-5.5 h-5.5 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white text-black transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next product"
                className="w-5.5 h-5.5 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white text-black transition-colors cursor-pointer"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. "Shop all {Category}" Smooth-Scroll Link Underneath */}
      {onScrollToGrid && (
        <button
          onClick={onScrollToGrid}
          className="hidden md:inline-flex mt-6 items-center gap-1.5 text-xs text-black/60 hover:text-black font-semibold uppercase tracking-wider transition-colors cursor-pointer py-1"
        >
          <span>Shop all {currentCategoryObj.name} ({categoryProducts.length} pieces)</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
