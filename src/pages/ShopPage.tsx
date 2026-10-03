import React, { useState, useMemo } from 'react';
import { ProductGrid } from '../components/ProductGrid';
import { FilterBar } from '../components/FilterBar';
import { products } from '../data/products';
import { Product } from '../types';
import { Sparkles, Shield } from 'lucide-react';

interface ShopPageProps {
  onQuickView: (product: Product) => void;
  onNavigate: (path: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onQuickView,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['Chains', 'Bracelets', 'Rings', 'Earrings'];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category Filter
    if (selectedCategory !== 'all') {
      list = list.filter((p) =>
        p.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'featured':
      default:
        // Best sellers & new drops first
        list.sort((a, b) => {
          if (a.badge && !b.badge) return -1;
          if (!a.badge && b.badge) return 1;
          return 0;
        });
        break;
    }

    return list;
  }, [selectedCategory, sortBy]);

  return (
    <div className="py-10 sm:py-16 bg-[#f8f6f3]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#b9836a]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Men's Catalogue</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1c1c1a]">
            Shop All Men's Jewelry
          </h1>
          <p className="text-sm sm:text-base text-[#6d6a67] leading-relaxed">
            Everyday fine hardware engineered from waterproof 316L surgical stainless steel, titanium, and 18K gold PVD.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <FilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          categories={categories}
          totalResults={filteredProducts.length}
        />

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          onQuickView={onQuickView}
          onNavigate={(slug) => onNavigate(`/product/${slug}`)}
          columns={4}
        />
      </div>
    </div>
  );
};
