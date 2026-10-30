import React, { useState, useEffect, useMemo } from 'react';
import { ProductGrid } from '../components/ProductGrid';
import { CategoryCircleSlider } from '../components/CategoryCircleSlider';
import { storageService } from '../services/storageService';
import { seoService } from '../services/seoService';
import { Product, CategoryItem } from '../types';
import {
  filterProductsByCategoryStrict,
  isCategoryMatch,
  normalizeCategorySlug
} from '../utils/categoryUtils';

export { filterProductsByCategoryStrict };

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
  const [allProducts, setAllProducts] = useState<Product[]>(() => storageService.getProducts());
  const [categories, setCategories] = useState<CategoryItem[]>(() => storageService.getCategories());
  const [selectedCategory, setSelectedCategory] = useState<string>(
    subcategory || 'chains'
  );

  useEffect(() => {
    return storageService.subscribe(() => {
      setAllProducts(storageService.getProducts());
      setCategories(storageService.getCategories());
    });
  }, []);

  useEffect(() => {
    if (subcategory) {
      setSelectedCategory(subcategory);
    }
  }, [subcategory]);

  // Dynamic Category SEO Meta & Breadcrumb JSON-LD
  useEffect(() => {
    const cleanCat = normalizeCategorySlug(selectedCategory || 'chains');
    const catItem = categories.find((c) => isCategoryMatch(c.slug, selectedCategory));
    const catName =
      catItem?.name || cleanCat.charAt(0).toUpperCase() + cleanCat.slice(1);

    const seoTitle = catItem?.seoTitle || `${catName} | Men's Jewellery | PASAAVA`;
    const seoDesc =
      catItem?.seoDesc ||
      `Explore luxury men's ${catName.toLowerCase()} handcrafted from waterproof 316L surgical stainless steel at PASAAVA.`;
    const ogImg = catItem?.image?.startsWith('http')
      ? catItem.image
      : `https://pasaava.growithcp.live${catItem?.image || '/images/cat-chains-prod.jpg'}`;

    seoService.applyMeta({
      title: seoTitle,
      description: seoDesc,
      canonical: `https://pasaava.growithcp.live/#/category/${cleanCat}`,
      ogTitle: seoTitle,
      ogDescription: seoDesc,
      ogImage: ogImg,
      ogType: 'website',
      jsonLd: seoService.buildBreadcrumbJsonLd([
        { name: 'Home', url: '/#' },
        { name: catName, url: `/#/category/${cleanCat}` }
      ])
    });
  }, [selectedCategory, categories]);

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    window.history.replaceState(null, '', `#/category/${catId}`);
  };

  const filteredProducts = useMemo(() => {
    return filterProductsByCategoryStrict(allProducts, selectedCategory);
  }, [allProducts, selectedCategory]);

  return (
    <div className="pt-20 sm:pt-24 pb-16 bg-white text-[#111111] min-h-screen">
      {/* Category Circle Slider (NECKPIECES, BRACELETS, EARRINGS, CHAINS, RINGS, PENDANTS) */}
      <CategoryCircleSlider
        activeCategoryId={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      {/* Product Grid directly under category circles (without product description, matching img 1) */}
      <div className="w-full max-w-[1680px] mx-auto px-2 sm:px-4 lg:px-6 pt-4 sm:pt-6">
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
