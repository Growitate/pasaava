import React from 'react';
import { ChevronDown, SlidersHorizontal, Sparkles } from 'lucide-react';

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
  categories: string[];
  totalResults: number;
  selectedGender?: 'all' | 'men' | 'women';
  onSelectGender?: (gender: any) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortByChange,
  categories,
  totalResults
}) => {
  return (
    <div className="space-y-4 mb-8">
      {/* Top Filter Level: Category count and Sort selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e8e8e8]">
        {/* Brand Tag */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#b9836a]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Engineered Men's Hardware</span>
        </div>

        {/* Sort & Count */}
        <div className="flex items-center justify-between sm:justify-end gap-4 text-xs">
          <span className="text-[#9a948e] font-medium">
            Showing <strong className="text-[#1c1c1a]">{totalResults}</strong> signature pieces
          </span>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="appearance-none bg-white border border-[#e0e0e0] rounded-xl px-3.5 py-2 pr-8 text-xs font-medium text-[#1c1c1a] focus:outline-none focus:border-[#1c1c1a] shadow-xs cursor-pointer"
            >
              <option value="featured">Sort: Featured Drops</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#6d6a67] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide flex-shrink-0 transition-all ${
            selectedCategory === 'all'
              ? 'bg-[#1c1c1a] text-white shadow-sm'
              : 'bg-white border border-[#e8e8e8] text-[#6d6a67] hover:border-[#1c1c1a] hover:text-[#1c1c1a]'
          }`}
        >
          All Pieces ({totalResults})
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide flex-shrink-0 transition-all ${
              selectedCategory.toLowerCase() === cat.toLowerCase()
                ? 'bg-[#1c1c1a] text-white shadow-sm'
                : 'bg-white border border-[#e8e8e8] text-[#6d6a67] hover:border-[#1c1c1a] hover:text-[#1c1c1a]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
