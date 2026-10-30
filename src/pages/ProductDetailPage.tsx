import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  ShoppingBag,
  Check,
  ShieldCheck,
  Truck,
  Droplets,
  Sparkles,
  Star,
  ArrowRight,
  ChevronRight,
  Share2,
  Plus,
  Minus
} from 'lucide-react';
import { getProductBySlug, products } from '../data/products';
import { storageService } from '../services/storageService';
import { seoService } from '../services/seoService';
import { ProductCard } from '../components/ProductCard';
import { Accordion } from '../components/Accordion';
import { ProductReviewsSection } from '../components/ProductReviewsSection';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';

interface ProductDetailPageProps {
  slug: string;
  onQuickView: (product: Product) => void;
  onNavigate: (path: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  onQuickView,
  onNavigate
}) => {
  const [product, setProduct] = useState<Product>(() => {
    return storageService.getProductBySlug(slug) || getProductBySlug(slug) || products[0];
  });

  useEffect(() => {
    const found = storageService.getProductBySlug(slug) || getProductBySlug(slug) || products[0];
    setProduct(found);

    // 301 Redirection Fallback: if accessed via an old slug from slugHistory, redirect immediately to canonical slug
    if (found && found.slug && found.slug.toLowerCase() !== slug.toLowerCase()) {
      if (onNavigate) {
        onNavigate(`/product/${found.slug}`);
      } else {
        window.history.replaceState(null, '', `#/product/${found.slug}`);
      }
    }

    return storageService.subscribe(() => {
      const refreshed = storageService.getProductBySlug(slug) || getProductBySlug(slug) || products[0];
      setProduct(refreshed);
    });
  }, [slug]);

  // Dynamic SEO & Structured Data (Product Schema + BreadcrumbList)
  useEffect(() => {
    if (!product) return;
    const approvedReviews = (product.reviews || []).filter((r) => r.status === 'approved');
    const finalSeoTitle = product.seoTitle || `${product.title} | ${product.category} | PASAAVA`;
    const finalSeoDesc = product.seoDesc || product.tagline || product.description;
    const ogImg = product.images?.[0]?.startsWith('http')
      ? product.images[0]
      : `https://pasaava.growithcp.live${product.images?.[0] || '/images/hero-masculine-bold.jpg'}`;

    seoService.applyMeta({
      title: finalSeoTitle,
      description: finalSeoDesc,
      canonical: `https://pasaava.growithcp.live/#/product/${product.slug}`,
      ogTitle: finalSeoTitle,
      ogDescription: finalSeoDesc,
      ogImage: ogImg,
      ogType: 'product',
      jsonLd: [
        seoService.buildProductJsonLd(product, approvedReviews),
        seoService.buildBreadcrumbJsonLd([
          { name: 'Home', url: '/#' },
          {
            name: product.category,
            url: `/#/category/${product.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
          },
          { name: product.title, url: `/#/product/${product.slug}` }
        ])
      ]
    });
  }, [product]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors?.[0]?.name
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImageIndex(0);
    setSelectedColor(product.colors?.[0]?.name);
    setQuantity(1);
    setIsAdded(false);
    setShowStickyBar(false);

    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 420);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug, product]);

  const isFav = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor);
    setIsCartOpen(true);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const scrollToReviews = () => {
    const el = document.getElementById('customer-reviews');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Matched products
  const storedAllProducts = storageService.getProducts();
  const matchProducts = (product.matchWithSlugs || [])
    .map((s) => storageService.getProductBySlug(s) || getProductBySlug(s))
    .filter((p): p is Product => p !== undefined)
    .slice(0, 3);

  // Related products
  const relatedProducts = storedAllProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.gender === product.gender)
    )
    .slice(0, 4);

  const productFinish = (product.materials && product.materials[0]) || '316L Surgical Steel';
  const mainImageAlt = `${product.title} - ${productFinish} men's jewellery`;

  // Helper functions for PDP Accordions
  const getMaterialInfo = (p: Product) => {
    if (p.slug === 'wave-chain') return 'Stainless Steel';
    if (p.materials && p.materials.length > 0) {
      return p.materials[0].replace(/^(Solid\s+|High-grade\s+)/i, '');
    }
    return 'Stainless Steel';
  };

  const getDimensionInfo = (p: Product) => {
    const isRing = p.category === 'Rings';
    const isChain = p.category === 'Chains' || p.category === 'Neck Chains';
    const isBracelet = p.category === 'Bracelets';

    let label = 'Length';
    if (isRing) {
      label = 'Size';
    } else if (!isChain && !isBracelet) {
      label = 'Dimensions';
    }

    const raw = p.dimensions || '19 Inch + 2 Inch Extension';
    const cleaned = raw.replace(/^(Length:\s*|Chain\s+Length:\s*|Width:\s*)/i, '').trim();

    return { label, value: cleaned || raw };
  };

  const getWhyItHits = (p: Product): string[] => {
    if (p.whyItHits && p.whyItHits.length > 0) {
      return p.whyItHits;
    }
    if (p.slug === 'wave-chain') {
      return [
        'A unique wave-inspired design',
        'Pairs effortlessly with every outfit',
        'The perfect balance—not too minimal, not too bold',
        'Waterproof',
        'Anti-tarnish'
      ];
    }
    if (p.category === 'Chains' || p.category === 'Neck Chains') {
      return [
        `A unique ${p.title.toLowerCase().replace(/ chain/i, '')}-inspired design`,
        'Pairs effortlessly with every outfit',
        'The perfect balance—not too minimal, not too bold',
        'Waterproof',
        'Anti-tarnish'
      ];
    }
    if (p.category === 'Bracelets') {
      return [
        'Sculpted for comfortable everyday wristwear',
        'Pairs effortlessly with any watch or ring',
        'The perfect balance—not too minimal, not too bold',
        'Waterproof & Sweatproof',
        'Anti-tarnish'
      ];
    }
    if (p.category === 'Rings') {
      return [
        'Comfort-fit ergonomic inner band',
        'Pairs effortlessly with every outfit',
        'The perfect balance—not too minimal, not too bold',
        'Waterproof & Sweatproof',
        'Anti-tarnish'
      ];
    }
    return [
      'Modern handcrafted luxury hardware',
      'Pairs effortlessly with every outfit',
      'The perfect balance—not too minimal, not too bold',
      'Waterproof',
      'Anti-tarnish'
    ];
  };

  const getProductDetailsList = (p: Product): string[] => {
    const list: string[] = [];

    if (p.category === 'Chains' || p.category === 'Neck Chains') {
      list.push('High-tensile 316L surgical-grade stainless steel core');
      list.push('Precision interlocking links engineered to lay flat without twisting');
      list.push('Custom PASAAVA heavy-duty reinforced lobster clasp');
      list.push('100% Waterproof, sweatproof & heat-resistant (Shower & Gym safe)');
      list.push('Hypoallergenic & nickel-free (Guaranteed zero green skin)');
      list.push('Delivered in signature PASAAVA presentation box with travel pouch');
    } else if (p.category === 'Bracelets') {
      list.push('Cast in solid 316L surgical steel / rhodium-plated finish');
      list.push('Reinforced heavy-duty security lock mechanism');
      list.push('Ergonomic contour designed for smooth stacking alongside watches');
      list.push('100% Waterproof, sweatproof & tarnish-free');
      list.push('Hypoallergenic & nickel-free (Guaranteed zero green skin)');
      list.push('Delivered in signature PASAAVA presentation box with travel pouch');
    } else if (p.category === 'Rings') {
      list.push('Solid 316L stainless steel with comfort-fit curved inner shank');
      list.push('Beveled scratch-resistant satin & high-mirror finish');
      list.push('Engineered for thumb, index, or pinky finger all-day wear');
      list.push('100% Waterproof, workout-proof & rust-free');
      list.push('Hypoallergenic & nickel-free (Guaranteed zero green skin)');
      list.push('Delivered in signature PASAAVA presentation box with travel pouch');
    } else if (p.category === 'Earrings') {
      list.push('Hypoallergenic 316L surgical steel post & clicker mechanism');
      list.push('Engineered for 24/7 continuous wear, sleep, and workouts');
      list.push('Lightweight architecture with ultra-secure snap closure');
      list.push('100% Waterproof, sweatproof & tarnish-free');
      list.push('Hypoallergenic & nickel-free (Zero irritation for sensitive ears)');
      list.push('Delivered in signature PASAAVA presentation box with travel pouch');
    } else {
      list.push('High-tensile 316L surgical-grade stainless steel core');
      list.push('Anti-tarnish vacuum PVD protective bond');
      list.push('100% Waterproof, sweatproof & ocean-safe');
      list.push('Hypoallergenic & nickel-free (Guaranteed zero green skin)');
      list.push('Delivered in signature PASAAVA presentation box with travel pouch');
    }

    return list;
  };

  const materialVal = getMaterialInfo(product);
  const dimInfo = getDimensionInfo(product);
  const whyItHitsList = getWhyItHits(product);
  const productDetailsList = getProductDetailsList(product);

  const accordionItems = [
    {
      id: 'desc-material',
      title: 'DESCRIPTION/MATERIAL',
      defaultOpen: true,
      content: (
        <div className="space-y-4 text-sm text-[#333333] leading-relaxed">
          <div className="space-y-1">
            <p>
              <span className="font-bold text-[#111111]">Material</span> &ndash;{' '}
              <span>{materialVal}</span>
            </p>
            <p>
              <span className="font-bold text-[#111111]">{dimInfo.label}</span> &ndash;{' '}
              <span>{dimInfo.value}</span>
            </p>
          </div>

          <p className="leading-relaxed text-[#333333]">
            {product.description}
          </p>

          <div className="space-y-1.5 pt-1">
            <p className="font-bold text-[#111111]">Product Details</p>
            <div className="space-y-1 text-[#444444]">
              {productDetailsList.map((detail, idx) => (
                <p key={idx} className="flex items-start gap-2">
                  <span className="text-[#111111] mt-0.5 font-bold">&bull;</span>
                  <span>{detail}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <p className="font-bold text-[#111111]">Why It Hits</p>
            <div className="space-y-1 text-[#333333]">
              {whyItHitsList.map((point, idx) => (
                <p key={idx}>{point}</p>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'care-instructions',
      title: 'CARE INSTRUCTIONS',
      defaultOpen: false,
      content: (
        <div className="space-y-3 text-sm text-[#444444] leading-relaxed">
          <p>
            <strong className="text-[#111111]">100% Waterproof &amp; Sweatproof:</strong> Engineered for continuous 24/7 wear. Safe to wear in the shower, gym, pool, or ocean—it will not fade, rust, or turn your skin green.
          </p>
          <p>
            <strong className="text-[#111111]">Cleaning:</strong> Gently wipe with a soft microfiber cloth after wear to restore high-shine mirror polish. No special chemicals required.
          </p>
          <p>
            <strong className="text-[#111111]">Storage:</strong> Store inside your PASAAVA protective velvet pouch or jewellery case when not in use to avoid scratches.
          </p>
          <p>
            <strong className="text-[#111111]">Chemicals:</strong> Avoid direct contact with strong perfumes, harsh sprays, and bleaching agents to preserve optimum longevity.
          </p>
        </div>
      )
    },
    {
      id: 'shipping',
      title: 'SHIPPING',
      defaultOpen: false,
      content: (
        <div className="space-y-3 text-sm text-[#444444] leading-relaxed">
          <p>
            <strong className="text-[#111111]">Free Express Shipping:</strong> Complimentary express courier delivery on all orders above ₹999 across India.
          </p>
          <p>
            <strong className="text-[#111111]">Dispatch:</strong> Orders placed before 2 PM are dispatched within 24 to 48 business hours from our fulfillment hub.
          </p>
          <div>
            <strong className="text-[#111111] block mb-1">Estimated Delivery:</strong>
            <ul className="list-disc pl-5 space-y-1 text-[#555555]">
              <li>Metro Cities: 2 &ndash; 3 Business Days</li>
              <li>Rest of India: 3 &ndash; 5 Business Days</li>
            </ul>
          </div>
          <p>
            <strong className="text-[#111111]">Live Tracking:</strong> Real-time tracking link sent automatically via WhatsApp &amp; SMS upon dispatch.
          </p>
          <p>
            <strong className="text-[#111111]">Cash on Delivery:</strong> Available across most serviceable pincodes in India.
          </p>
        </div>
      )
    },
    {
      id: 'exchange',
      title: 'EASY 7 DAY EXCHANGE',
      defaultOpen: false,
      content: (
        <div className="space-y-3 text-sm text-[#444444] leading-relaxed">
          <p>
            <strong className="text-[#111111]">7-Day Hassle-Free Exchange:</strong> Need a different size, length, or prefer another piece? Easily exchange within 7 days of receiving your order.
          </p>
          <p>
            <strong className="text-[#111111]">Doorstep Reverse Pickup:</strong> Our partner courier will collect the exchange package right from your door at no extra headache.
          </p>
          <p>
            <strong className="text-[#111111]">Eligibility:</strong> Items must be in unworn, brand-new condition with original tags, velvet pouch, and packaging intact.
          </p>
          <p>
            <strong className="text-[#111111]">Instant Concierge Support:</strong> WhatsApp our dedicated support team at <span className="font-semibold text-[#111111]">+91 98765 43210</span> or email us to initiate an exchange in under 2 minutes.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="pt-24 pb-8 sm:py-12 bg-white text-[#111111]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#6B6B6B] mb-8 font-medium">
          <button
            onClick={() => onNavigate('/')}
            className="hover:text-[#111111] transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button
            onClick={() => onNavigate('/shop')}
            className="hover:text-[#111111] transition-colors cursor-pointer"
          >
            Men's Collection
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#111111] truncate">{product.title}</span>
        </nav>

        {/* Product Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Images Showcase */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Image */}
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#F3F3F3] border border-[#E5E5E5] shadow-xs">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={mainImageAlt}
                className="w-full h-full object-cover"
              />

              {product.badge && product.badge !== 'Sold Out' && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-none shadow-xs bg-[#111111] text-white">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(product)}
                aria-label="Wishlist"
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-[#111111] shadow-xs hover:bg-[#111111] hover:text-white hover:scale-105 active:scale-95 transition-all border border-[#E5E5E5] cursor-pointer"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFav ? 'fill-[#e04545] text-[#e04545]' : 'text-[#111111]'
                  }`}
                />
              </button>
            </div>

            {/* Thumbnails Row */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-square rounded-2xl overflow-hidden bg-[#F3F3F3] border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#111111] shadow-xs scale-102'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} - ${productFinish} angle ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Purchase Details & Accordions */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="space-y-3 pb-4 border-b border-[#E5E5E5]">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#111111]">
                  {product.category}
                </span>

                <button
                  type="button"
                  onClick={scrollToReviews}
                  className="flex items-center gap-1.5 text-xs font-medium text-[#111111] hover:underline cursor-pointer transition-opacity hover:opacity-80"
                  aria-label={`View ${product.reviewCount} verified reviews`}
                >
                  <div className="flex text-[#F5B301]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current text-[#F5B301]" />
                    ))}
                  </div>
                  <span>{product.rating}</span>
                  <span className="text-[#6B6B6B]">
                    ({product.reviewCount} verified reviews)
                  </span>
                </button>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#111111] leading-tight">
                {product.title}
              </h1>

              {product.subtitle && (
                <p className="text-xs uppercase tracking-wider text-[#6B6B6B] font-medium">
                  {product.subtitle}
                </p>
              )}

              <div className="flex items-center gap-3 pt-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#111111]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-[#6B6B6B] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-semibold bg-[#F5F5F5] text-[#111111] px-2.5 py-0.5 rounded-full border border-[#E5E5E5]">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                )}
              </div>
            </div>

            {/* Tagline snippet */}
            {(product.tagline || product.subtitle) && (
              <p className="text-sm font-light text-[#6B6B6B] leading-relaxed">
                {product.tagline || product.subtitle}
              </p>
            )}

            {/* Color/Material Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2.5 pt-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-[#111111]">Select Finish / Color:</span>
                  <span className="text-[#111111] font-semibold">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? 'border-[#111111] bg-[#F5F5F5] text-[#111111] shadow-xs'
                          : 'border-[#E5E5E5] bg-white text-[#6B6B6B] hover:border-[#111111] hover:text-[#111111]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3">
                {/* Quantity Control */}
                <div className="flex items-center border border-[#E5E5E5] rounded-full px-3 py-2 bg-[#F5F5F5] shadow-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-[#6B6B6B] hover:text-[#111111] cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-[#111111]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-[#6B6B6B] hover:text-[#111111] cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Bag Button: Solid CTA #111 bg, white text */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-full font-semibold text-sm transition-all duration-200 active:scale-[0.98] shadow-sm cursor-pointer ${
                    isAdded
                      ? 'bg-[#22c55e] text-white'
                      : 'bg-[#111111] text-white hover:bg-[#333333]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag • {formatPrice(product.price * quantity)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Instant Buy Now: Solid CTA #111 bg, white text */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-[#111111] text-white font-semibold py-3.5 px-6 rounded-full text-sm hover:bg-[#333333] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Instant Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between pt-1 text-xs text-[#6B6B6B]">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 hover:text-[#111111] transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Link Copied!' : 'Share Piece'}</span>
                </button>

                <span className="flex items-center gap-1 text-[#22c55e]">
                  <Check className="w-3.5 h-3.5" />
                  In Stock & Ready to Ship
                </span>
              </div>
            </div>

            {/* Value Highlights */}
            <div className="grid grid-cols-2 gap-3 py-4 border-y border-[#E5E5E5] text-xs text-[#6B6B6B]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#111111]" />
                <span>Free Express Shipping ₹999+</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
                <span>2-Year Craftsmanship Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-[#111111]" />
                <span>100% Waterproof & Sweatproof</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#111111]" />
                <span>Hypoallergenic 925 & Steel</span>
              </div>
            </div>

            {/* Collapsible Accordions for Specs & Care */}
            <Accordion items={accordionItems} allowMultiple={true} variant="pdp" />
          </div>
        </div>

        {/* Perfect Match With Section */}
        {matchProducts.length > 0 && (
          <div className="mt-20 pt-14 border-t border-[#E5E5E5]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#111111]">
                  Layering Suggestion
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#111111]">
                  Perfect Match With
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {matchProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={onQuickView}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        )}

        {/* Review Spotlight Quote */}
        {product.reviewQuote && (
          <div className="mt-20 bg-[#F5F5F5] rounded-3xl p-8 sm:p-12 border border-[#E5E5E5] shadow-xs text-center max-w-3xl mx-auto space-y-4">
            <div className="flex justify-center text-[#F5B301]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current text-[#F5B301]" />
              ))}
            </div>
            <p className="font-serif italic text-lg sm:text-2xl font-light text-[#111111] leading-snug">
              "{product.reviewQuote.text}"
            </p>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
              — {product.reviewQuote.author} <span className="text-[#22c55e]">• Verified Buyer</span>
            </div>
          </div>
        )}

        {/* Customer Reviews & Write Review Section */}
        <ProductReviewsSection
          product={product}
          selectedColor={selectedColor}
        />

        {/* Related Products Grid */}
        <div className="mt-20 pt-14 border-t border-[#E5E5E5]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#111111]">
                More Discoveries
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#111111]">
                Continue Your Journey
              </h3>
            </div>
            <button
              onClick={() => onNavigate('/shop')}
              className="text-xs font-semibold uppercase tracking-wider text-[#111111] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={onQuickView}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Sticky Mobile Buy Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-xl border-t border-[#E5E5E5] p-3.5 px-4 z-40 lg:hidden shadow-lg"
          >
            <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-11 h-11 rounded-xl object-cover border border-[#E5E5E5] flex-shrink-0 bg-[#F3F3F3]"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-semibold text-[#111111] truncate leading-tight">
                    {product.title}
                  </h4>
                  <span className="text-xs font-bold text-[#111111]">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => toggleWishlist(product)}
                  aria-label="Wishlist"
                  className="p-2.5 rounded-full border border-[#E5E5E5] bg-[#F5F5F5] text-[#111111] active:scale-95 cursor-pointer"
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-[#e04545] text-[#e04545]' : ''}`} />
                </button>

                <button
                  onClick={handleAddToCart}
                  className={`py-2.5 px-5 rounded-full text-xs font-bold uppercase tracking-wider transition-all active:scale-95 shadow-sm flex items-center gap-1.5 cursor-pointer ${
                    isAdded ? 'bg-[#22c55e] text-white' : 'bg-[#111111] text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
