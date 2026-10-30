import { Product, CategoryItem, Order, OrderStatus, ProductReview, SiteSettings } from '../types';
import { products as initialProducts } from '../data/products';

const STORAGE_KEYS = {
  PRODUCTS: 'pasaava_db_products',
  CATEGORIES: 'pasaava_db_categories',
  ORDERS: 'pasaava_db_orders',
  REVIEWS: 'pasaava_db_reviews',
  SETTINGS: 'pasaava_db_settings',
  INITIALIZED: 'pasaava_db_initialized_v2'
};

const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: 'cat-chains', name: 'Chains', slug: 'chains', image: '/images/cat-chains-prod.jpg', order: 1, itemCount: 12 },
  { id: 'cat-neck-chains', name: 'Neck Chains', slug: 'neck-chains', image: '/images/cat-all-prod.jpg', order: 2, itemCount: 8 },
  { id: 'cat-bracelets', name: 'Bracelets', slug: 'bracelets', image: '/images/cat-bracelets-prod.jpg', order: 3, itemCount: 7 },
  { id: 'cat-rings', name: 'Rings', slug: 'rings', image: '/images/cat-rings-prod.jpg', order: 4, itemCount: 6 },
  { id: 'cat-earrings', name: 'Earrings', slug: 'earrings', image: '/images/cat-earrings-prod.jpg', order: 5, itemCount: 4 },
  { id: 'cat-pendants', name: 'Pendants', slug: 'pendants', image: '/images/cat-pendants-prod.jpg', order: 6, itemCount: 5 }
];

const INITIAL_SETTINGS: SiteSettings = {
  heroVideoUrl: '/images/IMG_3889.mp4',
  heroPoster: '/images/hero-desktop-poster.jpg',
  heroMobileVideoUrl: '/images/IMG_3418.mp4',
  heroMobilePoster: '/images/hero-mobile-poster.jpg',
  heroTitle: 'ENGINEERED FOR THE MODERN ICON',
  heroSubtitle: '316L Surgical Stainless Steel • Hypoallergenic • 100% Waterproof',
  announcementText: 'Free express shipping across India on orders over ₹999',
  socialLinks: {
    instagram: 'https://instagram.com/pasaava',
    whatsapp: '+919876543210',
    email: 'atelier@pasaava.com'
  },
  lookbookItems: [
    { id: 'look-1', image: '/images/reel-guardian-belt.jpg', name: 'Guardian Belt & Chain', price: 1449, productSlug: 'spikeball-pendant-chain' },
    { id: 'look-2', image: '/images/reel-starlit-chain.jpg', name: 'Starlit Celestial Collar', price: 600, productSlug: 'spikeball-pendant-chain' },
    { id: 'look-3', image: '/images/reel-terrabloom-chain.jpg', name: 'Terrabloom Pearl Strand', price: 750, productSlug: 'spikeball-pearl-chain' },
    { id: 'look-4', image: '/images/reel-helix-earcuff.jpg', name: 'Helix Industrial Ear Cuff', price: 350, productSlug: 'rogue-chain' },
    { id: 'look-5', image: '/images/reel-quantum-chain.jpg', name: 'Quantum Heavy Box Collar', price: 999, productSlug: 'wave-chain' }
  ],
  razorpay: {
    enabled: true,
    isLiveMode: false,
    keyId: 'rzp_test_pasaava_demo',
    keySecret: 'secret_test_pasaava_demo',
    webhookSecret: 'whsec_demo_pasaava'
  },
  whatsappConfig: {
    enabled: true,
    ownerPhone: '+919876543210',
    provider: 'direct_wa',
    notifyOnNewOrder: true,
    notifyOnShipment: true
  },
  deliveryConfig: {
    defaultCourier: 'Delhivery',
    autoAwbOnPacking: true
  }
};

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNo: 'PAS-98210',
    items: [
      {
        productId: 'drop-1',
        productSlug: 'spikeball-pearl-chain',
        title: 'SPIKEBALL PEARL CHAIN',
        image: '/images/drop-spikeball-pearl.jpg',
        price: 750,
        quantity: 1,
        selectedColor: 'Silver / Natural Pearl'
      }
    ],
    customer: {
      name: 'Aditya Sharma',
      phone: '+91 98201 44521',
      email: 'aditya.sharma@example.com',
      address: 'Flat 402, Skyline Residency, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050'
    },
    amount: 750,
    subtotal: 750,
    shippingFee: 99,
    paymentMethod: 'Razorpay',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    razorpayOrderId: 'order_Nxk18A92Lm01',
    razorpayPaymentId: 'pay_Nxk18Z84kld2',
    awb: 'DEL-882947190',
    courier: 'Delhivery',
    trackingUrl: 'https://www.delhivery.com/track/package/DEL-882947190',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    reviewToken: 'rev-token-aditya-1001',
    reviewSubmitted: true
  },
  {
    id: 'ord-1002',
    orderNo: 'PAS-98211',
    items: [
      {
        productId: 'drop-2',
        productSlug: 'spikeball-pendant-chain',
        title: 'SPIKEBALL PENDANT CHAIN',
        image: '/images/drop-spikeball-pendant.jpg',
        price: 600,
        quantity: 1
      },
      {
        productId: 'drop-3',
        productSlug: 'rogue-chain',
        title: 'ROGUE CHAIN',
        image: '/images/drop-rogue-chain.jpg',
        price: 500,
        quantity: 1
      }
    ],
    customer: {
      name: 'Kabir Mehta',
      phone: '+91 97110 33812',
      email: 'kabir.m@gmail.com',
      address: 'House 14, Defence Colony',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110024'
    },
    amount: 1100,
    subtotal: 1100,
    shippingFee: 0,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    awb: 'SR-920194881',
    courier: 'Shiprocket',
    trackingUrl: 'https://shiprocket.co/tracking/SR-920194881',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    reviewToken: 'rev-token-kabir-1002',
    reviewSubmitted: false
  },
  {
    id: 'ord-1003',
    orderNo: 'PAS-98212',
    items: [
      {
        productId: 'drop-4',
        productSlug: 'wave-chain',
        title: 'WAVE CHAIN',
        image: '/images/drop-wave-chain.jpg',
        price: 999,
        quantity: 1
      }
    ],
    customer: {
      name: 'Rohan Varma',
      phone: '+91 98450 19283',
      email: 'rohan.v@outlook.com',
      address: 'Villa 12, Palm Meadows, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560066'
    },
    amount: 999,
    subtotal: 999,
    shippingFee: 0,
    paymentMethod: 'COD',
    paymentStatus: 'Pending',
    orderStatus: 'New',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_REVIEWS: ProductReview[] = [
  {
    id: 'rev-1',
    productSlug: 'spikeball-pearl-chain',
    author: 'Aditya Sharma',
    rating: 5,
    date: '10/05/2026',
    title: 'Unreal craftsmanship and weight',
    comment: 'The star charm has a crisp surgical steel finish and the freshwater pearls have real heft. Got multiple compliments on day one.',
    verified: true,
    status: 'approved',
    recommended: true,
    location: 'Mumbai, MH',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'rev-2',
    productSlug: 'spikeball-pendant-chain',
    author: 'Sameer Sen',
    rating: 5,
    date: '09/28/2026',
    title: 'Everyday staple piece',
    comment: 'Wear it in the shower and gym, zero tarnishing or skin irritation. 316L quality is genuine.',
    verified: true,
    status: 'approved',
    recommended: true,
    location: 'Gurugram, HR',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'rev-3',
    productSlug: 'rogue-chain',
    author: 'Vikram Rajput',
    rating: 4,
    date: '10/01/2026',
    title: 'Solid Cuban collar',
    comment: 'Chunky and bold. Clasp is very sturdy. Packaging was pristine with velvet pouch.',
    verified: true,
    status: 'pending',
    recommended: true,
    location: 'Jaipur, RJ',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

type StorageListener = () => void;

class ReactiveStorageService {
  private listeners: Set<StorageListener> = new Set();

  constructor() {
    this.ensureInitialized();
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (!e.key || e.key === STORAGE_KEYS.REVIEWS || e.key === STORAGE_KEYS.PRODUCTS) {
          this.notify();
        }
      });
    }
  }

  private ensureInitialized() {
    try {
      const initialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
      if (!initialized) {
        // Prepare products with stockQty & flags
        const seededProducts: Product[] = initialProducts.map((p, index) => ({
          ...p,
          inStock: p.inStock ?? true,
          stockQty: p.inStock === false ? 0 : 25 - (index % 12),
          flags: {
            freshDrop: index < 5,
            bestSeller: p.badge === 'Best Seller' || index % 4 === 0,
            lookbook: index < 8
          },
          seoTitle: p.seoTitle || `${p.title} | ${p.category} | PASAAVA Men's Jewellery`,
          seoDesc: p.seoDesc || "Bold masculine jewellery engineered from waterproof surgical steel. Premium men’s jewellery from PASAAVA. Shop now."
        }));

        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(seededProducts));
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
        localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
        localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
      } else {
        // Run migrations for existing localStorage data
        this.migrateCategories();
        this.migrateProductSeo();
      }
    } catch (e) {
      console.error('Failed to initialize local storage DB:', e);
    }
  }

  private migrateCategories() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (!raw) return;
      const storedCategories: CategoryItem[] = JSON.parse(raw);
      const filtered = storedCategories.filter(
        (c) => c.id !== 'cat-cuffs' && c.slug !== 'cuffs' && c.name?.toLowerCase() !== 'cuffs' && !c.image?.includes('earcuff')
      );
      if (filtered.length !== storedCategories.length) {
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(filtered));
        this.notify();
      }
    } catch (e) {
      console.warn('Failed to migrate categories:', e);
    }
  }

  private migrateProductSeo() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (!raw) return;
      const storedProducts: Product[] = JSON.parse(raw);
      let hasChanges = false;

      const updated = storedProducts.map((p) => {
        const canonical = initialProducts.find((ip) => ip.id === p.id || ip.slug === p.slug);
        let item = { ...p };

        // Sync whyItHits if canonical provides it and stored is missing or different
        if (canonical?.whyItHits && (!item.whyItHits || item.whyItHits.length === 0 || canonical.whyItHits.length !== item.whyItHits.length)) {
          item.whyItHits = canonical.whyItHits;
          hasChanges = true;
        }

        // Sync updated descriptions, dimensions, and materials when canonical has richer details
        if (canonical && canonical.description && canonical.description !== item.description) {
          item.description = canonical.description;
          item.tagline = canonical.tagline || item.tagline;
          item.materials = canonical.materials || item.materials;
          item.dimensions = canonical.dimensions || item.dimensions;
          if (canonical.whyItHits) {
            item.whyItHits = canonical.whyItHits;
          }
          hasChanges = true;
        }

        // Sync category if canonical updated
        if (canonical && canonical.category && canonical.category !== item.category) {
          item.category = canonical.category;
          hasChanges = true;
        }

        const currentDesc = (item.seoDesc || '').trim();
        // If SEO description is missing or shorter than 120 characters or longer than 155
        if (!currentDesc || currentDesc.length < 120 || currentDesc.length > 155) {
          if (canonical && canonical.seoDesc) {
            hasChanges = true;
            item.seoTitle = canonical.seoTitle || item.seoTitle || `${item.title} | ${item.category} | PASAAVA Men's Jewellery`;
            item.seoDesc = canonical.seoDesc;
          }
        }
        return item;
      });

      if (hasChanges) {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
      }
    } catch (e) {
      console.warn('Failed to migrate product SEO descriptions:', e);
    }
  }

  public subscribe(listener: StorageListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.error('Listener callback error:', err);
      }
    });
  }

  // --- PRODUCTS ---
  public getProducts(): Product[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return raw ? JSON.parse(raw) : initialProducts;
    } catch {
      return initialProducts;
    }
  }

  public getProductBySlug(slug: string): Product | undefined {
    const products = this.getProducts();
    const cleanSlug = slug.toLowerCase().trim();
    return products.find(
      (p) =>
        p.slug.toLowerCase() === cleanSlug ||
        (p.slugHistory && p.slugHistory.map((s) => s.toLowerCase()).includes(cleanSlug))
    );
  }

  public getProductById(id: string): Product | undefined {
    return this.getProducts().find((p) => p.id === id);
  }

  public generateUniqueSlug(name: string, excludeProductId?: string): string {
    const products = this.getProducts();
    const base = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'piece';

    let candidate = base;
    let suffix = 2;

    const isTaken = (testSlug: string) => {
      return products.some((p) => {
        if (excludeProductId && p.id === excludeProductId) return false;
        if (p.slug.toLowerCase() === testSlug.toLowerCase()) return true;
        if (p.slugHistory && p.slugHistory.map((s) => s.toLowerCase()).includes(testSlug.toLowerCase())) {
          return true;
        }
        return false;
      });
    };

    while (isTaken(candidate)) {
      candidate = `${base}-${suffix}`;
      suffix++;
    }

    return candidate;
  }

  public generateUniqueCategorySlug(name: string, excludeCategoryId?: string): string {
    const categories = this.getCategories();
    const base = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'category';

    let candidate = base;
    let suffix = 2;

    const isTaken = (testSlug: string) => {
      return categories.some((c) => {
        if (excludeCategoryId && c.id === excludeCategoryId) return false;
        return c.slug.toLowerCase() === testSlug.toLowerCase();
      });
    };

    while (isTaken(candidate)) {
      candidate = `${base}-${suffix}`;
      suffix++;
    }

    return candidate;
  }

  public saveProduct(product: Product): Product {
    const products = this.getProducts();
    const index = products.findIndex((p) => p.id === product.id);

    // Auto calculate stockStatus boolean from stockQty
    const inStock = (product.stockQty ?? 0) > 0 && product.inStock !== false;

    // Enforce unique slug: if duplicate or blank, auto-append -2, -3
    let cleanSlug = (product.slug || product.title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'piece';

    const isDuplicate = products.some(
      (p) => p.id !== product.id && p.slug.toLowerCase() === cleanSlug.toLowerCase()
    );
    if (isDuplicate) {
      cleanSlug = this.generateUniqueSlug(cleanSlug, product.id);
    }

    const updatedProduct: Product = {
      ...product,
      slug: cleanSlug,
      inStock
    };

    if (index >= 0) {
      // Check if slug changed to record history
      const oldSlug = products[index].slug;
      if (oldSlug && oldSlug.toLowerCase() !== cleanSlug.toLowerCase()) {
        const history = Array.isArray(products[index].slugHistory)
          ? [...products[index].slugHistory!]
          : [];
        if (!history.includes(oldSlug)) {
          history.push(oldSlug);
        }
        updatedProduct.slugHistory = history;
      } else if (products[index].slugHistory) {
        updatedProduct.slugHistory = products[index].slugHistory;
      }
      products[index] = updatedProduct;
    } else {
      products.unshift(updatedProduct);
    }

    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    this.notify();
    return updatedProduct;
  }

  public deleteProduct(id: string): boolean {
    const products = this.getProducts().filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    this.notify();
    return true;
  }

  public updateProductStock(id: string, newStockQty: number): Product | undefined {
    const products = this.getProducts();
    const product = products.find((p) => p.id === id);
    if (!product) return undefined;

    product.stockQty = Math.max(0, newStockQty);
    product.inStock = product.stockQty > 0;
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    this.notify();
    return product;
  }

  // --- CATEGORIES ---
  public getCategories(): CategoryItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      let list: CategoryItem[] = raw ? JSON.parse(raw) : INITIAL_CATEGORIES;

      // Filter out any legacy ear cuff / cuffs category
      const cleaned = list.filter(
        (c) => c.id !== 'cat-cuffs' && c.slug !== 'cuffs' && c.name?.toLowerCase() !== 'cuffs' && !c.image?.includes('earcuff')
      );
      let hasFixed = cleaned.length !== list.length;
      list = cleaned.map((c) => {
        if (c.slug === 'neckpieces') {
          hasFixed = true;
          return { ...c, slug: 'neck-chains', name: 'Neck Chains' };
        }
        return c;
      });

      const FIX_IMAGE_MAP: Record<string, string> = {
        '/images/cat-chains.jpg': '/images/cat-chains-prod.jpg',
        '/images/cat-neckchains.jpg': '/images/cat-all-prod.jpg',
        '/images/cat-bracelets.jpg': '/images/cat-bracelets-prod.jpg',
        '/images/cat-rings.jpg': '/images/cat-rings-prod.jpg',
        '/images/cat-earrings.jpg': '/images/cat-earrings-prod.jpg',
        '/images/cat-pendants.jpg': '/images/cat-pendants-prod.jpg'
      };

      list = list.map((c) => {
        if (c.image && FIX_IMAGE_MAP[c.image]) {
          hasFixed = true;
          return { ...c, image: FIX_IMAGE_MAP[c.image] };
        }
        return c;
      });

      if (hasFixed) {
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(list));
      }

      return list;
    } catch {
      return INITIAL_CATEGORIES;
    }
  }

  public saveCategory(category: CategoryItem): CategoryItem {
    const categories = this.getCategories();
    const index = categories.findIndex((c) => c.id === category.id);

    let cleanSlug = (category.slug || category.name)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'category';

    const isDuplicate = categories.some(
      (c) => c.id !== category.id && c.slug.toLowerCase() === cleanSlug.toLowerCase()
    );
    if (isDuplicate) {
      cleanSlug = this.generateUniqueCategorySlug(cleanSlug, category.id);
    }

    const updatedCategory: CategoryItem = {
      ...category,
      slug: cleanSlug
    };

    if (index >= 0) {
      categories[index] = updatedCategory;
    } else {
      categories.push(updatedCategory);
    }
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    this.notify();
    return updatedCategory;
  }

  public deleteCategory(id: string): boolean {
    const categories = this.getCategories().filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    this.notify();
    return true;
  }

  public reorderCategories(categories: CategoryItem[]): void {
    const updated = categories.map((cat, idx) => ({ ...cat, order: idx + 1 }));
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updated));
    this.notify();
  }

  public resetCategoriesToDefaults(): CategoryItem[] {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
    this.notify();
    return INITIAL_CATEGORIES;
  }

  // --- ORDERS ---
  public getOrders(): Order[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return raw ? JSON.parse(raw) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  }

  public getOrderById(id: string): Order | undefined {
    return this.getOrders().find((o) => o.id === id);
  }

  public getOrdersByPhone(phone: string): Order[] {
    const clean = phone.replace(/[^0-9]/g, '');
    return this.getOrders().filter((o) => {
      const p = o.customer.phone.replace(/[^0-9]/g, '');
      return p.includes(clean) || clean.includes(p);
    });
  }

  public getOrdersByCustomerPhone(phone: string): Order[] {
    return this.getOrdersByPhone(phone);
  }

  public createOrder(data: Omit<Order, 'id' | 'orderNo' | 'createdAt'>): Order {
    const orders = this.getOrders();
    const orderNo = `PAS-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      ...data,
      id: `ord-${Date.now()}`,
      orderNo,
      createdAt: new Date().toISOString()
    };

    // Decrement stock in storage
    const products = this.getProducts();
    newOrder.items.forEach((item) => {
      const p = products.find((prod) => prod.id === item.productId || prod.slug === item.productSlug);
      if (p && p.stockQty !== undefined) {
        p.stockQty = Math.max(0, p.stockQty - item.quantity);
        if (p.stockQty === 0) p.inStock = false;
      }
    });

    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    orders.unshift(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    this.notify();
    return newOrder;
  }

  public updateOrderStatus(
    id: string,
    status: OrderStatus,
    awb?: string,
    courier?: string,
    trackingUrl?: string
  ): Order | undefined {
    const orders = this.getOrders();
    const order = orders.find((o) => o.id === id);
    if (!order) return undefined;

    order.orderStatus = status;
    if (awb !== undefined) order.awb = awb;
    if (courier !== undefined) order.courier = courier;
    if (trackingUrl !== undefined) order.trackingUrl = trackingUrl;

    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    this.notify();
    return order;
  }

  public generateReviewToken(orderId: string): string {
    const orders = this.getOrders();
    const order = orders.find((o) => o.id === orderId);
    if (!order) return '';

    const token = `rev_${Math.random().toString(36).substring(2, 10)}_${Date.now()}`;
    order.reviewToken = token;
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    this.notify();
    return token;
  }

  public getOrderByReviewToken(token: string): Order | undefined {
    return this.getOrders().find((o) => o.reviewToken === token);
  }

  // --- REVIEWS ---
  public getReviews(): ProductReview[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return raw ? JSON.parse(raw) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  }

  public getApprovedReviewsByProduct(productSlug: string, productId?: string): ProductReview[] {
    return this.getReviews().filter((r) => {
      if (r.status !== 'approved') return false;
      const slugMatch = r.productSlug && (r.productSlug === productSlug || (productId && r.productSlug === productId));
      const idMatch = (r as any).productId && ((productId && (r as any).productId === productId) || (r as any).productId === productSlug);
      return slugMatch || idMatch;
    });
  }

  public submitReview(
    review: Omit<ProductReview, 'id' | 'createdAt' | 'status'> & {
      status?: 'pending' | 'approved' | 'rejected';
      productId?: string;
    }
  ): ProductReview {
    const reviews = this.getReviews();
    const newReview: ProductReview = {
      ...review,
      id: `rev-${Date.now()}`,
      status: review.status || 'pending',
      createdAt: new Date().toISOString()
    };
    reviews.unshift(newReview);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));

    // Invalidate review token on the order if present
    if (review.token) {
      const orders = this.getOrders();
      const matchedOrder = orders.find((o) => o.reviewToken === review.token);
      if (matchedOrder) {
        matchedOrder.reviewSubmitted = true;
        matchedOrder.reviewToken = undefined;
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      }
    }

    this.notify();
    return newReview;
  }

  public updateReviewStatus(id: string, status: 'approved' | 'rejected'): ProductReview | undefined {
    const reviews = this.getReviews();
    const review = reviews.find((r) => r.id === id);
    if (!review) return undefined;

    review.status = status;
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));

    // Update product rating and review count
    const targetSlug = review.productSlug || (review as any).productId;
    if (targetSlug) {
      const products = this.getProducts();
      const product = products.find((p) => p.slug === targetSlug || p.id === targetSlug);
      if (product) {
        const approvedForProduct = reviews.filter(
          (r) =>
            (r.productSlug === product.slug ||
              r.productSlug === product.id ||
              (r as any).productId === product.id) &&
            r.status === 'approved'
        );
        if (approvedForProduct.length > 0) {
          const avg =
            approvedForProduct.reduce((acc, curr) => acc + curr.rating, 0) /
            approvedForProduct.length;
          product.rating = Number(avg.toFixed(1));
          product.reviewCount = approvedForProduct.length;
        }
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      }
    }

    this.notify();
    return review;
  }

  public deleteReview(id: string): boolean {
    const reviews = this.getReviews().filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    this.notify();
    return true;
  }

  // --- SETTINGS ---
  public getSettings(): SiteSettings {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!raw) return INITIAL_SETTINGS;
      const parsed = JSON.parse(raw);
      if (
        !parsed.heroVideoUrl ||
        parsed.heroVideoUrl === '/videos/hero-banner.mp4' ||
        parsed.heroVideoUrl === '/images/IMG_3888.MOV' ||
        parsed.heroVideoUrl === '/images/IMG_3889 (1).mov' ||
        (typeof parsed.heroVideoUrl === 'string' && parsed.heroVideoUrl.toLowerCase().endsWith('.mov'))
      ) {
        parsed.heroVideoUrl = '/images/IMG_3889.mp4';
      }
      if (
        !parsed.heroMobileVideoUrl ||
        parsed.heroMobileVideoUrl === '/images/IMG_3418.MOV' ||
        (typeof parsed.heroMobileVideoUrl === 'string' && parsed.heroMobileVideoUrl.toLowerCase().endsWith('.mov'))
      ) {
        parsed.heroMobileVideoUrl = '/images/IMG_3418.mp4';
      }
      if (parsed.heroPoster === '/images/hero-masculine-bold.jpg') {
        parsed.heroPoster = '/images/hero-desktop-poster.jpg';
      }
      return {
        ...INITIAL_SETTINGS,
        ...parsed,
        socialLinks: {
          ...INITIAL_SETTINGS.socialLinks,
          ...(parsed.socialLinks || {})
        },
        razorpay: {
          ...INITIAL_SETTINGS.razorpay!,
          ...(parsed.razorpay || {})
        },
        whatsappConfig: {
          ...INITIAL_SETTINGS.whatsappConfig!,
          ...(parsed.whatsappConfig || {})
        },
        deliveryConfig: {
          ...INITIAL_SETTINGS.deliveryConfig!,
          ...(parsed.deliveryConfig || {})
        }
      };
    } catch {
      return INITIAL_SETTINGS;
    }
  }

  public updateSettings(updates: Partial<SiteSettings>): SiteSettings {
    const current = this.getSettings();
    const updated: SiteSettings = {
      ...current,
      ...updates,
      socialLinks: {
        ...current.socialLinks,
        ...(updates.socialLinks || {})
      },
      razorpay: {
        ...(current.razorpay || INITIAL_SETTINGS.razorpay!),
        ...(updates.razorpay || {})
      },
      whatsappConfig: {
        ...(current.whatsappConfig || INITIAL_SETTINGS.whatsappConfig!),
        ...(updates.whatsappConfig || {})
      },
      deliveryConfig: {
        ...(current.deliveryConfig || INITIAL_SETTINGS.deliveryConfig!),
        ...(updates.deliveryConfig || {})
      }
    };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    this.notify();
    return updated;
  }

  // --- BACKUP & RESTORE ---
  public exportData(): string {
    const payload = {
      exportedAt: new Date().toISOString(),
      products: this.getProducts(),
      categories: this.getCategories(),
      orders: this.getOrders(),
      reviews: this.getReviews(),
      settings: this.getSettings()
    };
    return JSON.stringify(payload, null, 2);
  }

  public importData(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.products) localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(parsed.products));
      if (parsed.categories) localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(parsed.categories));
      if (parsed.orders) localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(parsed.orders));
      if (parsed.reviews) localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(parsed.reviews));
      if (parsed.settings) localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(parsed.settings));
      this.notify();
      return true;
    } catch (e) {
      console.error('Failed to import backup data:', e);
      return false;
    }
  }

  public resetToDefaults(): void {
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
    this.ensureInitialized();
    this.notify();
  }
}

export const storageService = new ReactiveStorageService();
