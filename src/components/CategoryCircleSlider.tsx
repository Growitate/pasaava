import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { isCategoryMatch } from '../utils/categoryUtils';

export interface CategoryCircleItem {
  id: string;
  name: string;
  image: string;
  link: string;
}

export const CATEGORY_CIRCLES: CategoryCircleItem[] = [
  {
    id: 'chains',
    name: 'CHAINS',
    image: '/images/cat-chains-prod.jpg',
    link: '/category/chains'
  },
  {
    id: 'neck-chains',
    name: 'NECK CHAINS',
    image: '/images/cat-all-prod.jpg',
    link: '/category/neck-chains'
  },
  {
    id: 'bracelets',
    name: 'BRACELETS',
    image: '/images/cat-bracelets-prod.jpg',
    link: '/category/bracelets'
  },
  {
    id: 'rings',
    name: 'RINGS',
    image: '/images/cat-rings-prod.jpg',
    link: '/category/rings'
  },
  {
    id: 'earrings',
    name: 'EARRINGS',
    image: '/images/cat-earrings-prod.jpg',
    link: '/category/earrings'
  },
  {
    id: 'pendants',
    name: 'PENDANTS',
    image: '/images/cat-pendants-prod.jpg',
    link: '/category/pendants'
  }
];

interface CategoryCircleSliderProps {
  onNavigate?: (path: string) => void;
  activeCategoryId?: string;
  onSelectCategory?: (categoryId: string) => void;
  className?: string;
}

export const CategoryCircleSlider: React.FC<CategoryCircleSliderProps> = ({
  onNavigate,
  activeCategoryId,
  onSelectCategory,
  className = ''
}) => {
  const [items, setItems] = useState<CategoryCircleItem[]>(() => {
    const dynamicCats = storageService.getCategories();
    if (dynamicCats && dynamicCats.length > 0) {
      return dynamicCats.map((c) => ({
        id: c.slug,
        name: c.name.toUpperCase(),
        image: c.image || '/images/cat-chains-prod.jpg',
        link: `/category/${c.slug}`
      }));
    }
    return CATEGORY_CIRCLES;
  });

  useEffect(() => {
    return storageService.subscribe(() => {
      const dynamicCats = storageService.getCategories();
      if (dynamicCats && dynamicCats.length > 0) {
        setItems(
          dynamicCats.map((c) => ({
            id: c.slug,
            name: c.name.toUpperCase(),
            image: c.image || '/images/cat-chains-prod.jpg',
            link: `/category/${c.slug}`
          }))
        );
      }
    });
  }, []);
  const handleClick = (cat: CategoryCircleItem) => {
    if (onSelectCategory) {
      onSelectCategory(cat.id);
    } else if (onNavigate) {
      onNavigate(cat.link);
    } else {
      window.location.hash = `#${cat.link}`;
    }
  };

  const isItemActive = (catId: string) => {
    if (!activeCategoryId) return false;
    return isCategoryMatch(activeCategoryId, catId);
  };

  return (
    <section className={`py-3 sm:py-4 bg-white border-b border-[#E5E5E5] w-full overflow-hidden select-none ${className}`}>
      <div className="w-full max-w-[1440px] mx-auto px-2 sm:px-4">
        <div
          className="flex items-center justify-start sm:justify-center gap-3 sm:gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar scrollbar-none py-1.5 px-1 touch-pan-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((cat) => {
            const active = isItemActive(cat.id);

            return (
              <button
                key={cat.id}
                onClick={() => handleClick(cat)}
                className="group flex flex-col items-center flex-shrink-0 cursor-pointer snap-start select-none outline-none focus:outline-none w-[92px] sm:w-[104px]"
                aria-label={`Browse ${cat.name}`}
              >
                {/* Round White Thumbnail Container matching img 1 */}
                <div
                  className={`w-[88px] h-[88px] sm:w-[98px] sm:h-[98px] rounded-full bg-white p-1.5 sm:p-2 overflow-hidden transition-all duration-200 active:scale-95 flex items-center justify-center ${
                    active
                      ? 'ring-2 ring-[#111111] scale-105 shadow-[0_4px_16px_rgba(0,0,0,0.12)]'
                      : 'border border-black/[0.08] hover:border-[#111111]/30 hover:scale-102 shadow-[0_2px_10px_rgba(0,0,0,0.06)]'
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    width={98}
                    height={98}
                    className="w-full h-full object-contain pointer-events-none mix-blend-multiply scale-[1.1] transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Uppercase Label */}
                <span
                  className={`mt-2 text-[11px] sm:text-xs tracking-[0.06em] transition-colors text-center whitespace-nowrap uppercase ${
                    active ? 'font-black text-[#111111]' : 'font-bold text-[#111111] group-hover:text-black'
                  }`}
                >
                  {cat.name}
                </span>

                {/* Active Indicator Dot */}
                {active && (
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#111111]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
