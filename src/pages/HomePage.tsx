import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { CategoryCircleSlider } from '../components/CategoryCircleSlider';
import { ProductCard } from '../components/ProductCard';
import { ReelsStoriesCarousel } from '../components/ReelsStoriesCarousel';
import { CustomerReviewsCarousel } from '../components/CustomerReviewsCarousel';
import { storageService } from '../services/storageService';
import { seoService } from '../services/seoService';
import { Product } from '../types';

interface HomePageProps {
  onQuickView: (product: Product) => void;
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onQuickView,
  onNavigate
}) => {
  const [products, setProducts] = useState<Product[]>(() => storageService.getProducts());

  useEffect(() => {
    seoService.applyMeta({
      title: "PASAAVA | Engineered Men's Jewellery | 316L Surgical Steel",
      description:
        'Engineered for the modern icon. Handcrafted luxury men’s jewellery made from 100% waterproof 316L surgical stainless steel. Hypoallergenic, tarnish-proof, lifetime durability.',
      canonical: 'https://pasaava.growithcp.live/#/',
      ogType: 'website',
      jsonLd: seoService.buildOrganizationJsonLd()
    });

    return storageService.subscribe(() => {
      setProducts(storageService.getProducts());
    });
  }, []);

  // Fresh Drops: flagged or top drops
  const freshDrops = products.filter((p) => p.flags?.freshDrop || p.badge === 'New').length > 0
    ? products.filter((p) => p.flags?.freshDrop || p.badge === 'New')
    : products.slice(0, 8);

  // Best Sellers: flagged or rating >= 4.8
  const bestSellers = products.filter((p) => p.flags?.bestSeller || p.badge === 'Best Seller').length > 0
    ? products.filter((p) => p.flags?.bestSeller || p.badge === 'Best Seller')
    : products.filter((p) => p.rating >= 4.8).slice(0, 10);

  const freshDropsRef = useRef<HTMLDivElement>(null);
  const bestSellersRef = useRef<HTMLDivElement>(null);

  const scrollTrack = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (!ref.current) return;
    const container = ref.current;
    const firstCard = (container.querySelector('[data-product-card]') as HTMLElement) || (container.firstElementChild as HTMLElement);
    const gap = window.innerWidth >= 768 ? 10 : 8;
    const cardWidth = firstCard ? firstCard.offsetWidth + gap : container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth'
    });
  };

  return (
    <div className="space-y-0 bg-white text-[#111111]">
      {/* 4. HERO (Full viewport height video, no white gap) */}
      <HeroSection onNavigate={onNavigate} />

      {/* 5a. Category Circle Slider (mobile + desktop round 72px thumbnails with 11px uppercase labels) */}
      <CategoryCircleSlider onNavigate={onNavigate} />

      {/* 5b. FRESH DROPS */}
      <section className="pt-4 sm:pt-6 pb-6 sm:pb-8 bg-white border-b border-[#E5E5E5] w-full overflow-hidden">
        {/* Header Row */}
        <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-3 lg:px-4 flex items-center justify-center md:justify-between gap-4 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-[0.05em] text-[#111111] text-center md:text-left">
            FRESH DROPS
          </h2>

          {/* Desktop Discover More Button */}
          <div className="hidden md:block">
            <button
              onClick={() => onNavigate('/men-category/men-newarrivals')}
              className="border border-[#111111] bg-transparent text-[#111111] hover:bg-[#111111] hover:text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer rounded-none"
            >
              Discover More
            </button>
          </div>
        </div>

        {/* 2 in a single row, 2 below (Total 4 images in a 2x2 grid on mobile / 4-across on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-6 sm:gap-x-4 sm:gap-y-8 px-2 sm:px-3 lg:px-4 w-full">
          {freshDrops.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="bestseller"
              onQuickView={onQuickView}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        {/* Mobile-Only Bottom Center Discover More Button */}
        <div className="flex md:hidden justify-center mt-5 px-4">
          <button
            onClick={() => onNavigate('/men-category/men-newarrivals')}
            className="border border-[#111111] bg-transparent text-[#111111] hover:bg-[#111111] hover:text-white px-7 py-2.5 text-xs font-semibold tracking-wider transition-colors duration-200 cursor-pointer"
          >
            Discover More
          </button>
        </div>
      </section>

      {/* 5c. Reels / Stories Carousel (5 vertical 9:16 cards, autoplay muted, product chips, centered arrows) */}
      <ReelsStoriesCarousel onNavigate={onNavigate} />

      {/* 5d. BEST SELLERS */}
      <section className="pt-4 sm:pt-6 pb-8 sm:pb-12 bg-white border-b border-[#E5E5E5] w-full overflow-hidden">
        {/* Header Row: Centered on mobile, left-aligned on desktop */}
        <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-3 lg:px-4 flex items-center justify-center md:justify-between gap-4 mb-4 sm:mb-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-[0.05em] text-[#111111]">
              BEST SELLERS
            </h2>
          </div>

          {/* Desktop Discover More + Slider Controls */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => onNavigate('/men-category/men-bestsellers')}
              className="border border-[#111111] bg-transparent text-[#111111] hover:bg-[#111111] hover:text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer rounded-none flex-shrink-0"
            >
              Discover More
            </button>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollTrack(bestSellersRef, 'left')}
                className="w-9 h-9 border border-[#E5E5E5] hover:border-[#111111] text-[#111111] flex items-center justify-center transition-colors cursor-pointer bg-white hover:bg-[#111111] hover:text-white shadow-xs"
                aria-label="Previous best sellers"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollTrack(bestSellersRef, 'right')}
                className="w-9 h-9 border border-[#E5E5E5] hover:border-[#111111] text-[#111111] flex items-center justify-center transition-colors cursor-pointer bg-white hover:bg-[#111111] hover:text-white shadow-xs"
                aria-label="Next best sellers"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Full-Bleed Edge-to-Edge Best Sellers Row (Width 100vw, margin/padding 0) */}
        <div
          ref={bestSellersRef}
          className="flex gap-[8px] md:gap-[10px] overflow-x-auto snap-x snap-mandatory no-scrollbar scrollbar-none scroll-smooth w-full px-0"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="bestseller"
              onQuickView={onQuickView}
              onNavigate={onNavigate}
              className="flex-shrink-0 w-[calc((100vw-8px)/2)] md:w-[calc((100vw-20px)/3)] lg:w-[calc((100vw-40px)/5)] snap-start"
            />
          ))}
        </div>

        {/* Mobile-Only Bottom Center Discover More Button */}
        <div className="flex md:hidden justify-center mt-6 px-4">
          <button
            onClick={() => onNavigate('/men-category/men-bestsellers')}
            className="border border-[#111111] bg-transparent text-[#111111] hover:bg-[#111111] hover:text-white px-7 py-2.5 text-xs font-semibold tracking-wider transition-colors duration-200 cursor-pointer"
          >
            Discover More
          </button>
        </div>
      </section>

      {/* Customer Reviews Carousel on Silver/Chrome Gradient (#E8E8E8→#BDBDBD) */}
      <CustomerReviewsCarousel />
    </div>
  );
};
