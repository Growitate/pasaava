export type Gender = 'men';
export type ProductCategory = 'Chains' | 'Neck Chains' | 'Bracelets' | 'Rings' | 'Earrings' | 'Pendants';

export interface ProductReview {
  id?: string;
  author: string;
  rating: number;
  date: string;
  title?: string;
  comment: string;
  verified: boolean;
  recommended?: boolean;
  helpfulCount?: number;
  location?: string;
  color?: string;
  fit?: 'True to Size' | 'Runs Small' | 'Runs Large';
  images?: string[];
  status?: 'pending' | 'approved' | 'rejected';
  productSlug?: string;
  token?: string;
  createdAt?: string;
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
  badge?: 'Best Seller' | 'New' | 'Sale' | 'Trending' | 'Popular' | 'Sold Out';
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  tagline: string;
  materials: string[];
  dimensions: string;
  care: string[];
  whyItHits?: string[];
  matchWithSlugs?: string[];
  reviewQuote?: {
    text: string;
    author: string;
  };
  inStock: boolean;
  stockQty?: number;
  flags?: {
    freshDrop?: boolean;
    bestSeller?: boolean;
    lookbook?: boolean;
  };
  seoTitle?: string;
  seoDesc?: string;
  slugHistory?: string[];
  colors?: { name: string; hex: string; imageIndex?: number }[];
  reviews?: ProductReview[];
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  order: number;
  itemCount?: number;
  seoTitle?: string;
  seoDesc?: string;
}

export type OrderStatus = 'New' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled';
export type PaymentStatus = 'Paid' | 'Pending' | 'Failed' | 'Refunded';

export interface OrderCustomer {
  name: string;
  phone: string;
  email: string;
  address: string;
  city?: string;
  state?: string;
  pincode: string;
}

export interface OrderItem {
  productId: string;
  productSlug: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  orderNo: string;
  items: OrderItem[];
  customer: OrderCustomer;
  amount: number;
  subtotal: number;
  shippingFee: number;
  paymentMethod: 'Razorpay' | 'COD' | 'UPI' | 'Test';
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  awb?: string;
  courier?: string;
  trackingUrl?: string;
  createdAt: string;
  reviewToken?: string;
  reviewSubmitted?: boolean;
}

export interface RazorpaySettings {
  enabled: boolean;
  isLiveMode: boolean;
  keyId: string;
  keySecret: string;
  webhookSecret?: string;
}

export interface WhatsAppSettings {
  enabled: boolean;
  ownerPhone: string;
  provider: 'direct_wa' | 'twilio' | 'business_api';
  apiKey?: string;
  apiSecret?: string;
  phoneNumberId?: string;
  notifyOnNewOrder: boolean;
  notifyOnShipment: boolean;
}

export interface DeliverySettings {
  defaultCourier: 'Delhivery' | 'Shiprocket' | 'BlueDart' | 'DTDC' | 'India Post';
  delhiveryApiKey?: string;
  delhiveryClientId?: string;
  shiprocketEmail?: string;
  shiprocketPassword?: string;
  shiprocketToken?: string;
  autoAwbOnPacking: boolean;
}

export interface SiteSettings {
  heroVideoUrl: string;
  heroPoster: string;
  heroMobileVideoUrl?: string;
  heroMobilePoster?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  announcementText: string;
  socialLinks: {
    instagram: string;
    whatsapp: string;
    email: string;
  };
  lookbookItems: {
    id: string;
    image: string;
    name: string;
    price: number;
    productSlug: string;
  }[];
  razorpay?: RazorpaySettings;
  whatsappConfig?: WhatsAppSettings;
  deliveryConfig?: DeliverySettings;
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
