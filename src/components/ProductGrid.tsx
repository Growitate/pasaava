import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onQuickView?: (product: Product) => void;
  onNavigate?: (slug: string) => void;
  columns?: 2 | 3 | 4;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onQuickView,
  onNavigate,
  columns = 4
}) => {
  const gridColClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
  }[columns];

  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-[#9a948e] text-base">No jewelry pieces found.</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 ${gridColClass}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
};
