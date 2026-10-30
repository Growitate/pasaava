import React, { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface WidgetReview {
  id: string;
  name: string;
  quote: string;
  product: string;
}

const WIDGET_REVIEWS: WidgetReview[] = [
  {
    id: 'w-1',
    name: 'Anonymous',
    quote: 'Loved it',
    product: 'Atlas Signet Ring'
  },
  {
    id: 'w-2',
    name: 'Parth Tanwar',
    quote: 'Nice quality',
    product: 'Atlas Cuban Chain'
  },
  {
    id: 'w-3',
    name: 'Anonymous',
    quote: 'My boyfriend loved the neckpiece and said that it was great gift! It looked really sexy on...',
    product: 'Ares Cross Pendant'
  },
  {
    id: 'w-4',
    name: 'Zeon caldeira',
    quote: 'The Nova chain is absolutely lovely , it is a part of my everyday collection because it...',
    product: 'Atlas Cuban Chain (Golden)'
  },
  {
    id: 'w-5',
    name: 'Ethan K.',
    quote: 'Superior finish and weight. Looks even better in person than online. Clasp is very solid.',
    product: 'Titan Link Bracelet'
  },
  {
    id: 'w-6',
    name: 'Lucas M.',
    quote: 'Worn it in the gym, sauna, and pool every single day. 100% waterproof as promised!',
    product: 'Viper Tennis Bracelet'
  },
  {
    id: 'w-7',
    name: 'Shreya M.',
    quote: 'Best product decision and the team was super supportive. Quality of piece is top tier.',
    product: 'Vanguard Bar Pendant'
  },
  {
    id: 'w-8',
    name: 'Oliver S.',
    quote: 'The signet ring has a nice heft to it. Fits true to size and arrived in 2 days.',
    product: 'Titan Stud Earring'
  }
];

export const ReviewsWidget: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const scrollAmount = trackRef.current.clientWidth * 0.75;
    trackRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="py-8 sm:py-12 bg-white border-b border-[#E5E5E5] w-full overflow-hidden select-none">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header (Top Left) */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#111111] mb-2 font-sans">
            PASAAVA PEOPLE - PASAAVA REVIEWS!
          </h2>

          {/* 5 Black Square Star Badges */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 sm:w-5 sm:h-5 bg-black flex items-center justify-center rounded-[2px]"
              >
                <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white text-white" strokeWidth={0} />
              </div>
            ))}
          </div>
        </div>

        {/* Slidable Horizontal Review Cards Track (5 cards visible on desktop, compact & dense) */}
        <div
          ref={trackRef}
          className="flex items-stretch gap-2.5 sm:gap-3 lg:gap-3 overflow-x-auto pb-2 no-scrollbar scrollbar-none snap-x snap-mandatory touch-pan-x"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {WIDGET_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="flex-shrink-0 w-[68vw] sm:w-[44vw] md:w-[calc((100%-20px)/3)] lg:w-[calc((100%-40px)/5)] bg-white p-3.5 sm:p-4 rounded-[4px] border border-[#EAEAEA] shadow-[0_1px_6px_rgba(0,0,0,0.03)] flex flex-col justify-between snap-start min-h-[145px] max-h-[170px]"
            >
              {/* Top: 5 Black Square Star Badges */}
              <div>
                <div className="flex items-center gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3.5 h-3.5 bg-black flex items-center justify-center rounded-[2px]"
                    >
                      <Star className="w-2 h-2 fill-white text-white" strokeWidth={0} />
                    </div>
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-[11.5px] sm:text-[12px] text-[#111111] leading-snug font-normal line-clamp-3">
                  {review.quote}
                </p>
              </div>

              {/* Bottom: Author & Product */}
              <div className="pt-2.5 mt-auto">
                <h4 className="text-[11.5px] sm:text-[12px] font-bold text-[#111111] leading-tight">
                  {review.name}
                </h4>
                <p className="text-[10.5px] sm:text-[11px] text-[#666666] mt-0.5 truncate leading-tight">
                  {review.product}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Centered Chevron Slide Controls */}
        <div className="flex items-center justify-center gap-4 mt-5">
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Previous reviews"
            className="p-1 text-[#CCCCCC] hover:text-[#111111] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2]" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Next reviews"
            className="p-1 text-[#CCCCCC] hover:text-[#111111] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 stroke-[2]" />
          </button>
        </div>
      </div>
    </section>
  );
};
