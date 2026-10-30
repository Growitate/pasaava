import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { storageService } from '../services/storageService';

interface ReelItem {
  id: string;
  videoUrl: string;
  poster: string;
  productSlug: string;
  productTitle: string;
  productPrice: string;
  productImage: string;
}

const REEL_ITEMS: ReelItem[] = [
  {
    id: 'reel-1',
    videoUrl: '/videos/reel-1.mp4',
    poster: '/images/reel-guardian-belt.jpg',
    productSlug: 'spikeball-pendant-chain',
    productTitle: 'Guardian Belt',
    productPrice: '₹1,449',
    productImage: '/images/drop-bar-pendant.jpg'
  },
  {
    id: 'reel-2',
    videoUrl: '/videos/reel-2.mp4',
    poster: '/images/reel-starlit-chain.jpg',
    productSlug: 'spikeball-pendant-chain',
    productTitle: 'Starlit Neckchain',
    productPrice: '₹600',
    productImage: '/images/drop-spikeball-pendant.jpg'
  },
  {
    id: 'reel-3',
    videoUrl: '/videos/reel-3.mp4',
    poster: '/images/reel-terrabloom-chain.jpg',
    productSlug: 'spikeball-pearl-chain',
    productTitle: 'The Terrabloom Neckchain',
    productPrice: '₹750',
    productImage: '/images/drop-spikeball-pearl.jpg'
  },
  {
    id: 'reel-4',
    videoUrl: '/videos/reel-4.mp4',
    poster: '/images/reel-helix-earcuff.jpg',
    productSlug: 'rogue-chain',
    productTitle: 'Helix Ear Cuff (1pc)',
    productPrice: '₹350',
    productImage: '/images/reel-helix-earcuff.jpg'
  },
  {
    id: 'reel-5',
    videoUrl: '/videos/reel-5.mp4',
    poster: '/images/reel-quantum-chain.jpg',
    productSlug: 'wave-chain',
    productTitle: 'Quantum Chain',
    productPrice: '₹999',
    productImage: '/images/drop-wave-chain.jpg'
  },
  {
    id: 'reel-6',
    videoUrl: '/videos/hero-banner.mp4',
    poster: '/images/model-men-cuban.jpg',
    productSlug: 'rogue-chain',
    productTitle: 'Rogue Cuban Chain',
    productPrice: '₹500',
    productImage: '/images/drop-rogue-chain.jpg'
  },
  {
    id: 'reel-7',
    videoUrl: '/videos/reel-1.mp4',
    poster: '/images/model-men-pendant.jpg',
    productSlug: 'bar-pendant',
    productTitle: 'Monolith Bar Pendant',
    productPrice: '₹500',
    productImage: '/images/drop-bar-pendant.jpg'
  },
  {
    id: 'reel-8',
    videoUrl: '/videos/reel-2.mp4',
    poster: '/images/model-men-tennis.jpg',
    productSlug: 'stella-tennis-bracelet',
    productTitle: 'Viper Tennis Bracelet',
    productPrice: '₹1,299',
    productImage: '/images/model-men-tennis.jpg'
  }
];

interface ReelsStoriesCarouselProps {
  onNavigate: (path: string) => void;
}

export const ReelsStoriesCarousel: React.FC<ReelsStoriesCarouselProps> = ({ onNavigate }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [items, setItems] = useState<ReelItem[]>(() => {
    const lookbooks = storageService.getSettings().lookbookItems;
    if (lookbooks && lookbooks.length > 0) {
      return lookbooks.map((lb, index) => ({
        id: lb.id || `reel-${index}`,
        videoUrl: `/videos/reel-${(index % 2) + 1}.mp4`,
        poster: lb.image || '/images/reel-guardian-belt.jpg',
        productSlug: lb.productSlug,
        productTitle: lb.name,
        productPrice: `₹${lb.price.toLocaleString('en-IN')}`,
        productImage: lb.image || '/images/drop-bar-pendant.jpg'
      }));
    }
    return REEL_ITEMS;
  });

  useEffect(() => {
    return storageService.subscribe(() => {
      const lookbooks = storageService.getSettings().lookbookItems;
      if (lookbooks && lookbooks.length > 0) {
        setItems(
          lookbooks.map((lb, index) => ({
            id: lb.id || `reel-${index}`,
            videoUrl: `/videos/reel-${(index % 2) + 1}.mp4`,
            poster: lb.image || '/images/reel-guardian-belt.jpg',
            productSlug: lb.productSlug,
            productTitle: lb.name,
            productPrice: `₹${lb.price.toLocaleString('en-IN')}`,
            productImage: lb.image || '/images/drop-bar-pendant.jpg'
          }))
        );
      }
    });
  }, []);

  // Update navigation arrow enabled/disabled states
  const updateScrollState = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    updateScrollState();
    container.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      container.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  // Performance: Pause off-screen videos via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Ignore autoplay restriction errors if any
            });
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.2
      }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const firstCard = container.querySelector('[data-reel-card]') as HTMLElement;
    const cardWidth = firstCard ? firstCard.offsetWidth + 12 : 300 + 12;
    container.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth'
    });
  };

  return (
    <section className="py-5 sm:py-7 bg-[#FFFFFF] border-b border-[#E5E5E5] w-full overflow-hidden">
      <div className="w-full">
        {/* Horizontal Full-Bleed Carousel / Slider with Scroll Snap flush to left & right edges */}
        <div
          ref={scrollRef}
          className="flex gap-2 sm:gap-2.5 lg:gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar scrollbar-none scroll-smooth w-full px-0"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              data-reel-card
              onClick={() => onNavigate(`/product/${item.productSlug}`)}
              className="relative flex-shrink-0 w-[74vw] sm:w-[46vw] md:w-[31vw] lg:w-[calc((100vw-36px)/5.12)] aspect-[9/16] rounded-[22px] border-[1.5px] border-[#111111] overflow-hidden bg-[#111111] snap-start shadow-none cursor-pointer select-none group"
            >
              {/* Autoplay Muted Loop Playsinline Video */}
              <video
                ref={(el) => {
                  if (el) videoRefs.current.set(item.id, el);
                  else videoRefs.current.delete(item.id);
                }}
                autoPlay
                muted
                loop
                playsInline
                poster={item.poster}
                className="w-full h-full object-cover object-center"
              >
                <source src={item.videoUrl} type="video/mp4" />
              </video>

              {/* Product Info Bar at bottom of card */}
              <div className="absolute bottom-[10px] left-[10px] right-[10px] h-[64px] bg-[linear-gradient(90deg,#0d0d0d_0%,#1f1f1f_100%)] rounded-[12px] flex items-center overflow-hidden z-10 transition-transform duration-200 group-hover:scale-[1.01]">
                {/* Left flush product thumbnail */}
                <img
                  src={item.productImage}
                  alt={item.productTitle}
                  className="w-[56px] h-[64px] rounded-l-[10px] rounded-r-none object-cover flex-shrink-0"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = item.poster;
                  }}
                />

                {/* Right of thumbnail: Product name and price */}
                <div className="flex-1 min-w-0 pl-3 pr-2.5 flex flex-col justify-center">
                  <h4 className="text-white font-semibold text-[14px] truncate leading-tight">
                    {item.productTitle}
                  </h4>
                  <p className="text-white/95 font-medium text-[13px] leading-tight mt-1">
                    {item.productPrice.startsWith('₹') ? item.productPrice : `₹${item.productPrice}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Centered Prev / Next Circular Dark Arrows Below (hidden on mobile) */}
        <div className="hidden md:flex items-center justify-center gap-[12px] mt-6 sm:mt-8">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous video"
            className="w-[48px] h-[48px] rounded-full bg-[#444444] hover:bg-[#111111] text-white flex items-center justify-center transition-colors duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#444444]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Next video"
            className="w-[48px] h-[48px] rounded-full bg-[#444444] hover:bg-[#111111] text-white flex items-center justify-center transition-colors duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#444444]"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

