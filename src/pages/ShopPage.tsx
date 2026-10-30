import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ProductGrid } from '../components/ProductGrid';
import { RaycastShowcase } from '../components/RaycastShowcase';
import { storageService } from '../services/storageService';
import { seoService } from '../services/seoService';
import { Product } from '../types';
import { ChevronDown } from 'lucide-react';

interface ShopPageProps {
  onQuickView: (product: Product) => void;
  onNavigate: (path: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onQuickView,
  onNavigate
}) => {
  const [products, setProducts] = useState<Product[]>(() => storageService.getProducts());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState('featured');
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    seoService.applyMeta({
      title: "All Hardware Collections | Men's Jewellery | PASAAVA",
      description:
        "Explore the complete collection of luxury men's chains, bracelets, rings, and pendants crafted from waterproof 316L surgical stainless steel.",
      canonical: 'https://pasaava.growithcp.live/#/shop',
      ogType: 'website',
      jsonLd: seoService.buildBreadcrumbJsonLd([
        { name: 'Home', url: '/#' },
        { name: 'Shop All Pieces', url: '/#/shop' }
      ])
    });

    return storageService.subscribe(() => {
      setProducts(storageService.getProducts());
    });
  }, []);

  // Sync category with URL search & hash parameters on load / change
  useEffect(() => {
    const parseCategoryFromUrl = () => {
      const hash = window.location.hash || '';
      const search = window.location.search || '';
      let catParam: string | null = null;

      if (hash.includes('category=')) {
        const match = hash.match(/category=([^&]+)/);
        if (match) catParam = decodeURIComponent(match[1]);
      } else if (search.includes('category=')) {
        const params = new URLSearchParams(search);
        catParam = params.get('category');
      }

      if (catParam) {
        setSelectedCategory(catParam.toLowerCase());
      }
    };

    parseCategoryFromUrl();
    window.addEventListener('hashchange', parseCategoryFromUrl);
    window.addEventListener('popstate', parseCategoryFromUrl);
    return () => {
      window.removeEventListener('hashchange', parseCategoryFromUrl);
      window.removeEventListener('popstate', parseCategoryFromUrl);
    };
  }, []);

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);

    // Update URL hash/query without page reload
    const newHash = cat === 'all' ? '#/shop' : `#/shop?category=${encodeURIComponent(cat)}`;
    window.history.replaceState(null, '', newHash);
  };

  const handleScrollToGrid = () => {
    if (gridRef.current) {
      const rect = gridRef.current.getBoundingClientRect();
      const targetY = window.scrollY + rect.top - 80;

      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(targetY, { duration: 0.6, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
      } else {
        window.scrollTo({
          top: Math.max(0, targetY),
          behavior: 'smooth'
        });
      }
    }
  };

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category Filter
    if (selectedCategory !== 'all') {
      const sel = selectedCategory.toLowerCase();
      list = list.filter((p) => {
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
    <div className="pt-20 sm:pt-24 pb-16 bg-white text-[#111111]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Raycast-Style Showcase Window & Category Dock */}
        <RaycastShowcase
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          onQuickView={onQuickView}
          onNavigate={onNavigate}
          onScrollToGrid={handleScrollToGrid}
        />

        {/* Section Divider & Filter Info Bar */}
        <div
          ref={gridRef}
          className="flex items-center justify-between gap-4 pt-6 pb-4 border-b border-[#E5E5E5] mb-8 sm:mb-10 scroll-mt-24 text-xs"
        >
          <span
            aria-live="polite"
            className="text-[#6B6B6B] font-medium"
          >
            Showing <strong className="text-[#111111] font-bold">{filteredProducts.length}</strong> signature pieces
          </span>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort product catalog"
              className="appearance-none bg-white border border-[#E5E5E5] rounded-xl px-3.5 py-2 pr-8 text-xs font-medium text-[#111111] focus:outline-none focus:border-[#111111] shadow-xs cursor-pointer"
            >
              <option value="featured">Sort: Featured Drops</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#6B6B6B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          onQuickView={onQuickView}
          onNavigate={onNavigate}
          columns={4}
        />
      </div>
    </div>
  );
};

