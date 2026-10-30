import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface CategorySelectionItem {
  id: string;
  name: string;
  label: string;
  image: string;
}

export const CATEGORY_ITEMS: CategorySelectionItem[] = [
  {
    id: 'all',
    name: 'All',
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

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
  categories?: string[];
  totalResults: number;
  selectedGender?: 'all' | 'men' | 'women';
  onSelectGender?: (gender: any) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortByChange,
  totalResults
}) => {
  return (
    <div className="space-y-6 mb-10">
      {/* Circular Category Selection Track */}
      <div className="w-full">
        <div className="flex items-center justify-start sm:justify-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto pb-3 pt-1 no-scrollbar scrollbar-none px-2 snap-x">
          {CATEGORY_ITEMS.map((item) => {
            const isAll = item.id === 'all';
            const isActive =
              isAll
                ? selectedCategory.toLowerCase() === 'all' || selectedCategory === ''
                : selectedCategory.toLowerCase().includes(item.id.toLowerCase()) ||
                item.id.toLowerCase().includes(selectedCategory.toLowerCase());

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectCategory(item.id)}
                className="group flex flex-col items-center flex-shrink-0 cursor-pointer focus:outline-none snap-center select-none"
                aria-label={`Filter by ${item.label}`}
              >
                {/* Compact Circular Thumbnail Container */}
                <div
                  className={`w-[50px] h-[50px] sm:w-[58px] sm:h-[58px] md:w-[66px] md:h-[66px] rounded-full bg-transparent flex items-center justify-center p-1.5 sm:p-2 overflow-hidden transition-all duration-300 relative ${isActive
                      ? 'ring-2 ring-[#111111] scale-105'
                      : 'ring-1 ring-black/15 hover:ring-[#111111] hover:scale-105 opacity-85 hover:opacity-100'
                    }`}
                >
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-contain rounded-full pointer-events-none mix-blend-multiply transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Category Label Underneath */}
                <span
                  className={`mt-2 text-[10px] sm:text-[11px] font-bold tracking-[0.12em] uppercase transition-colors text-center ${isActive
                      ? 'text-[#111111]'
                      : 'text-[#6B6B6B] group-hover:text-[#111111]'
                    }`}
                >
                  {item.label}
                </span>

                {/* Active Indicator Dot */}
                {isActive ? (
                  <span className="mt-0.5 w-1 h-1 rounded-full bg-[#111111]" />
                ) : (
                  <span className="mt-0.5 w-1 h-1 rounded-full bg-transparent" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Info & Sort Row */}
      <div className="flex items-center justify-between gap-4 pt-2 pb-4 border-b border-[#E5E5E5] text-xs">
        {/* Count */}
        <span className="text-[#6B6B6B] font-medium">
          Showing <strong className="text-[#111111]">{totalResults}</strong> signature pieces
        </span>

        {/* Sort */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="appearance-none bg-white border border-[#E5E5E5] rounded-xl px-3.5 py-2 pr-8 text-xs font-medium text-[#111111] focus:outline-none focus:border-[#111111] shadow-xs cursor-pointer"
          >
            <option value="featured" className="bg-white text-[#111111]">Sort: Featured Drops</option>
            <option value="price-asc" className="bg-white text-[#111111]">Price: Low to High</option>
            <option value="price-desc" className="bg-white text-[#111111]">Price: High to Low</option>
            <option value="rating" className="bg-white text-[#111111]">Highest Rated</option>
            <option value="name" className="bg-white text-[#111111]">Alphabetical (A-Z)</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#6B6B6B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
