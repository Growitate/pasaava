import React, { useState, useMemo } from 'react';
import { ProductGrid } from '../components/ProductGrid';
import { FilterBar } from '../components/FilterBar';
import { products } from '../data/products';
import { menCategories } from '../data/categories';
import { Product } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CategoryPageProps {
  gender?: 'women' | 'men';
  subcategory?: string;
  onQuickView: (product: Product) => void;
  onNavigate: (path: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  subcategory,
  onQuickView,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    subcategory || 'all'
  );
  const [sortBy, setSortBy] = useState('featured');

  const categoryCards = menCategories;
  const categories = ['Chains', 'Bracelets', 'Rings', 'Earrings'];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by subcategory / tab
    if (subcategory) {
      if (subcategory.includes('bestseller')) {
        list = list.filter((p) => p.badge === 'Best Seller');
      } else if (subcategory.includes('newarrival')) {
        list = list.filter((p) => p.badge === 'New' || p.badge === 'Trending');
      } else if (subcategory.includes('onsale')) {
        list = list.filter((p) => p.originalPrice !== undefined);
      } else {
        list = list.filter((p) =>
          p.category.toLowerCase().includes(subcategory.toLowerCase())
        );
      }
    } else if (selectedCategory !== 'all') {
      list = list.filter((p) =>
        p.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Sort
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
      default:
        break;
    }

    return list;
  }, [subcategory, selectedCategory, sortBy]);

  const getSubcategoryTitle = (sub?: string) => {
    if (!sub) return "Men's Collection";
    if (sub.includes('chain')) return "Neck Chains & Pendants";
    if (sub.includes('bracelet')) return "Bracelets & Cuffs";
    if (sub.includes('ring')) return "Rings & Signets";
    if (sub.includes('earring')) return "Earrings & Studs";
    if (sub.includes('bestseller')) return "Best Sellers";
    if (sub.includes('newarrival')) return "New Releases";
    if (sub.includes('onsale')) return "Archive & Sale";
    return sub.toUpperCase();
  };

  const pageTitle = getSubcategoryTitle(subcategory);
  const pageSubtitle = 'Architectural Cuban chains, beveled curb bracelets, and brushed signets engineered with surgical steel and 18K gold.';

  return (
    <div className="py-10 sm:py-16 bg-[#f8f6f3]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#b9836a]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PASAAVA MEN'S ATELIER</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1c1c1a]">
            {pageTitle}
          </h1>
          <p className="text-sm sm:text-base text-[#6d6a67] leading-relaxed">
            {pageSubtitle}
          </p>
        </div>

        {/* Subcategory Grid Cards (Only on main collection overview page) */}
        {!subcategory && (
          <div className="mb-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categoryCards.slice(1, 5).map((cat) => (
              <div
                key={cat.id}
                onClick={() => onNavigate(cat.slug)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#1c1c1a] shadow-xs cursor-pointer border border-[#e8e8e8]"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="text-sm font-semibold leading-tight">{cat.name}</h4>
                  <p className="text-[11px] text-white/80">{cat.itemCount} pieces</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Filter Bar */}
        <FilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
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
