export type Gender = 'men';
export type ProductCategory = 'Chains' | 'Neck Chains' | 'Bracelets' | 'Rings' | 'Earrings' | 'Pendants' | 'Cuffs';

export interface ProductReview {
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: ProductCategory;
  gender: Gender;
  price: number;
  originalPrice?: number;
  badge?: 'Best Seller' | 'New' | 'Sale' | 'Trending' | 'Popular';
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  tagline: string;
  materials: string[];
  dimensions: string;
  care: string[];
  matchWithSlugs?: string[];
  reviewQuote?: {
    text: string;
    author: string;
  };
  inStock: boolean;
  colors?: { name: string; hex: string; imageIndex?: number }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface JournalArticle {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  excerpt: string;
  content: string[];
  author: string;
}

export interface CustomerSpotlight {
  id: string;
  name: string;
  handle: string;
  productSlug: string;
  productTitle: string;
  image: string;
  quote?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}
