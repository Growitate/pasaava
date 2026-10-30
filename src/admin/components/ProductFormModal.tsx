import React, { useState, useEffect } from 'react';
import { X, Save, IndianRupee, Sparkles, Check, AlertCircle, HelpCircle, ExternalLink, AlertTriangle } from 'lucide-react';
import { Product, ProductCategory, CategoryItem } from '../../types';
import { MultiImageUploader, ProductImageItem } from './MultiImageUploader';
import { storageService } from '../../services/storageService';
import {
  generateOptimalProductSeo,
  getSeoTitleStatus,
  getSeoDescStatus,
  SEO_LIMITS
} from '../../utils/seoUtils';

interface ProductFormModalProps {
  product?: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (savedProduct: Product) => void;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  product,
  isOpen,
  onClose,
  onSave
}) => {
  const isEditing = Boolean(product);
  const categories: CategoryItem[] = storageService.getCategories();
  const allProducts: Product[] = storageService.getProducts();

  // Basic Details
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Chains');

  // Pricing
  const [price, setPrice] = useState<number>(750);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(950);

  // Images
  const [images, setImages] = useState<ProductImageItem[]>([]);

  // Hardware Specs & Details
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [materialsText, setMaterialsText] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [careText, setCareText] = useState('');
  const [whyItHitsText, setWhyItHitsText] = useState('');

  // Related Products
  const [matchWithSlugs, setMatchWithSlugs] = useState<string[]>([]);

  // Badges & Flags
  const [badge, setBadge] = useState<Product['badge']>(undefined);
  const [freshDrop, setFreshDrop] = useState(false);
  const [bestSeller, setBestSeller] = useState(false);
  const [lookbook, setLookbook] = useState(false);
  const [inStock, setInStock] = useState(true);
  const [stockQty, setStockQty] = useState(25);

  // SEO Fields
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDesc, setSeoDesc] = useState('');
  const [seoError, setSeoError] = useState<string | null>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'general' | 'media' | 'specs' | 'seo'>('general');

  // Load existing product or reset
  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setSlug(product.slug);
      setSubtitle(product.subtitle || '');
      setCategory(product.category);
      setPrice(product.price);
      setOriginalPrice(product.originalPrice);

      // Convert images string[] to ProductImageItem[]
      const imgList: ProductImageItem[] = (product.images || []).map((url, i) => ({
        url,
        alt: `${product.title} - ${i === 0 ? 'Primary' : i === 1 ? 'Hover' : 'Gallery'}`
      }));
      setImages(imgList);

      setTagline(product.tagline || '');
      setDescription(product.description || '');
      setMaterialsText((product.materials || []).join('\n'));
      setDimensions(product.dimensions || '');
      setCareText((product.care || []).join('\n'));
      setWhyItHitsText((product.whyItHits || []).join('\n'));
      setMatchWithSlugs(product.matchWithSlugs || []);

      setBadge(product.badge);
      setFreshDrop(Boolean(product.flags?.freshDrop));
      setBestSeller(Boolean(product.flags?.bestSeller));
      setLookbook(Boolean(product.flags?.lookbook));
      setInStock(product.inStock);
      setStockQty(product.stockQty ?? (product.inStock ? 25 : 0));

      setSeoTitle(product.seoTitle || `${product.title} | ${product.category} | PASAAVA Men's Jewellery`);

      // If existing product already has a valid 120-155 char description, keep it. Otherwise auto-generate optimal.
      if (product.seoDesc && product.seoDesc.length >= SEO_LIMITS.DESC_MIN && product.seoDesc.length <= SEO_LIMITS.DESC_MAX) {
        setSeoDesc(product.seoDesc);
      } else {
        const generated = generateOptimalProductSeo({
          title: product.title,
          category: product.category,
          materials: product.materials,
          tagline: product.tagline,
          description: product.description
        });
        setSeoDesc(product.seoDesc || generated.seoDesc);
      }
      setSeoError(null);
    } else {
      // Create defaults
      setTitle('');
      setSlug('');
      setSubtitle('');
      setCategory('Chains');
      setPrice(750);
      setOriginalPrice(999);
      setImages([
        {
          url: '/images/drop-wave-chain.jpg',
          alt: 'PASAAVA Men’s Hardware Item'
        }
      ]);
      setTagline('High-grade 316L Surgical Stainless Steel crafted for the modern man.');
      setDescription('Precision diamond-cut links engineered from solid surgical steel. 100% waterproof and hypoallergenic.');
      setMaterialsText('Solid 316L Surgical Stainless Steel\nHypoallergenic & Nickel-Free\nVacuum PVD Coated');
      setDimensions('Length: 50cm | Width: 6mm | Weight: 38g');
      setCareText('Shower, workout and ocean safe.\nWipe clean with soft polishing cloth.');
      setWhyItHitsText('A unique modern design\nPairs effortlessly with every outfit\nThe perfect balance—not too minimal, not too bold\nWaterproof\nAnti-tarnish');
      setMatchWithSlugs([]);
      setBadge('New');
      setFreshDrop(true);
      setBestSeller(false);
      setLookbook(false);
      setInStock(true);
      setStockQty(25);
      const generated = generateOptimalProductSeo({
        title: 'New Hardware Piece',
        category: 'Chains',
        materials: ['Solid 316L Surgical Stainless Steel'],
        tagline: 'High-grade 316L Surgical Stainless Steel crafted for the modern man.',
        description: 'Precision diamond-cut links engineered from solid surgical steel. 100% waterproof and hypoallergenic.'
      });
      setSeoTitle(generated.seoTitle);
      setSeoDesc(generated.seoDesc);
      setSeoError(null);
    }
  }, [product, isOpen]);

  // Handler to auto-generate SEO anytime
  const handleAutoGenerateSeo = () => {
    const cleanMaterials = materialsText
      .split('\n')
      .map((m) => m.trim())
      .filter(Boolean);

    const generated = generateOptimalProductSeo({
      title: title || 'Hardware Piece',
      category,
      materials: cleanMaterials,
      tagline,
      description
    });

    setSeoTitle(generated.seoTitle);
    setSeoDesc(generated.seoDesc);
    setSeoError(null);
  };

  // Auto-generate slug when title changes (if new product)
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditing || !slug) {
      const generatedSlug = storageService.generateUniqueSlug(val, product?.id);
      setSlug(generatedSlug);
      const generatedSeo = generateOptimalProductSeo({
        title: val,
        category,
        materials: materialsText.split('\n'),
        tagline,
        description
      });
      setSeoTitle(generatedSeo.seoTitle);
      if (!seoDesc || seoDesc.length < SEO_LIMITS.DESC_MIN) {
        setSeoDesc(generatedSeo.seoDesc);
      }
    }
  };

  // Discount calculation
  const savingsAmount = originalPrice && originalPrice > price ? originalPrice - price : 0;
  const savingsPercent =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) {
      alert('Please provide a title and unique slug');
      return;
    }

    // SEO Validation: Enforce 120-155 characters for Meta Description
    const cleanSeoTitle = (seoTitle || `${title} | ${category} | PASAAVA Men's Jewellery`).trim();
    const cleanSeoDesc = (seoDesc || '').trim();

    if (!cleanSeoDesc || cleanSeoDesc.length < SEO_LIMITS.DESC_MIN) {
      setSeoError(
        `SEO Meta Description is too short (${cleanSeoDesc.length}/${SEO_LIMITS.DESC_MIN} min characters). Google recommends 120–155 characters so your snippet is not ignored. Please expand or click 'Auto-Generate Optimal SEO'.`
      );
      setActiveTab('seo');
      return;
    }

    if (cleanSeoDesc.length > SEO_LIMITS.DESC_MAX) {
      setSeoError(
        `SEO Meta Description is too long (${cleanSeoDesc.length}/${SEO_LIMITS.DESC_MAX} max characters). Please trim or click 'Auto-Generate Optimal SEO'.`
      );
      setActiveTab('seo');
      return;
    }

    if (cleanSeoTitle.length > SEO_LIMITS.TITLE_MAX) {
      setSeoError(
        `SEO Meta Title exceeds ${SEO_LIMITS.TITLE_MAX} characters (${cleanSeoTitle.length} chars). Recommended range is 45–60 characters.`
      );
      setActiveTab('seo');
      return;
    }

    setSeoError(null);

    const cleanMaterials = materialsText
      .split('\n')
      .map((m) => m.trim())
      .filter(Boolean);

    const cleanCare = careText
      .split('\n')
      .map((c) => c.trim())
      .filter(Boolean);

    const cleanWhyItHits = whyItHitsText
      .split('\n')
      .map((w) => w.trim())
      .filter(Boolean);

    const imageUrls = images.map((img) => img.url);

    const rawSlug = (slug || title).trim().toLowerCase();
    const finalSlug = storageService.generateUniqueSlug(rawSlug, product?.id);

    const updatedProduct: Product = {
      id: product?.id || `drop-${Date.now()}`,
      title: title.trim(),
      slug: finalSlug,
      subtitle: subtitle.trim() || undefined,
      category,
      gender: 'men',
      price: Number(price) || 0,
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      badge: badge || undefined,
      rating: product?.rating || 5.0,
      reviewCount: product?.reviewCount || 12,
      images: imageUrls.length > 0 ? imageUrls : ['/images/drop-wave-chain.jpg'],
      tagline: tagline.trim(),
      description: description.trim(),
      materials: cleanMaterials,
      dimensions: dimensions.trim() || 'One Size',
      care: cleanCare,
      whyItHits: cleanWhyItHits.length > 0 ? cleanWhyItHits : undefined,
      matchWithSlugs,
      inStock: inStock && stockQty > 0,
      stockQty: Number(stockQty) || 0,
      flags: {
        freshDrop,
        bestSeller,
        lookbook
      },
      seoTitle: cleanSeoTitle,
      seoDesc: cleanSeoDesc,
      slugHistory: product?.slugHistory ? [...product.slugHistory] : []
    };

    onSave(updatedProduct);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs select-none">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[92vh] text-[#111111]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-[#FAFAFA]">
          <div>
            <h2 className="text-base font-bold text-[#111111]">
              {isEditing ? `Edit: ${product?.title}` : 'Add New Hardware Piece'}
            </h2>
            <p className="text-xs text-gray-500">
              Configure inventory pricing, multi-image gallery, materials, and SEO
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-black hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center px-6 border-b border-gray-200 bg-white gap-2">
          {[
            { id: 'general', label: '1. General & Pricing' },
            { id: 'media', label: `2. Gallery Images (${images.length})` },
            { id: 'specs', label: '3. Hardware Specs' },
            { id: 'seo', label: '4. SEO & Preview' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === tab.id
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: GENERAL & PRICING */}
          {activeTab === 'general' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. MONOLITH CUBAN COLLAR"
                    required
                    className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    URL Slug *
                  </label>
                  <div className="flex items-center">
                    <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-xs text-gray-500 font-mono">
                      /product/
                    </span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="monolith-cuban-collar"
                      required
                      className="w-full px-3 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-r-xl text-xs text-black font-mono focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Subtitle / Materials Summary
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g. 316L Surgical Stainless Steel • 18K PVD"
                    className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black font-medium focus:outline-none focus:ring-1 focus:ring-black cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pricing Box */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Pricing in Indian Rupees (₹)
                  </span>
                  {savingsAmount > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                      Save ₹{savingsAmount.toLocaleString('en-IN')} ({savingsPercent}% OFF)
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Selling Price (INR ₹) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                        className="w-full pl-8 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-black focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Compare / Strike Price (INR ₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={originalPrice || ''}
                        onChange={(e) =>
                          setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)
                        }
                        placeholder="e.g. 950"
                        className="w-full pl-8 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Stock and Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Storefront Badge
                  </label>
                  <select
                    value={badge || ''}
                    onChange={(e) => setBadge((e.target.value as any) || undefined)}
                    className="w-full px-3 py-2 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black cursor-pointer"
                  >
                    <option value="">No Badge</option>
                    <option value="Best Seller">Best Seller</option>
                    <option value="New">New</option>
                    <option value="Sale">Sale</option>
                    <option value="Trending">Trending</option>
                    <option value="Popular">Popular</option>
                    <option value="Sold Out">Sold Out</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stockQty}
                    onChange={(e) => {
                      const qty = Number(e.target.value);
                      setStockQty(qty);
                      setInStock(qty > 0);
                    }}
                    className="w-full px-3 py-2 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Stock Status
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const next = !inStock;
                      setInStock(next);
                      if (!next) setStockQty(0);
                      else if (stockQty === 0) setStockQty(25);
                    }}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      inStock
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : 'bg-red-50 text-red-800 border border-red-300'
                    }`}
                  >
                    {inStock ? '✓ In Stock' : '✕ Out of Stock'}
                  </button>
                </div>
              </div>

              {/* Flags / Featured Sections */}
              <div className="pt-2 border-t border-gray-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Featured Placement Flags
                </label>
                <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={freshDrop}
                      onChange={(e) => setFreshDrop(e.target.checked)}
                      className="rounded accent-black w-4 h-4 cursor-pointer"
                    />
                    <span>Show in "Fresh Drops" Strip</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bestSeller}
                      onChange={(e) => setBestSeller(e.target.checked)}
                      className="rounded accent-black w-4 h-4 cursor-pointer"
                    />
                    <span>Highlight as "Best Seller"</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={lookbook}
                      onChange={(e) => setLookbook(e.target.checked)}
                      className="rounded accent-black w-4 h-4 cursor-pointer"
                    />
                    <span>Feature in Lookbook Showcase</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MULTI-IMAGE UPLOADER */}
          {activeTab === 'media' && (
            <div className="space-y-4">
              <MultiImageUploader
                images={images}
                onChange={setImages}
                productTitleFallback={title || 'PASAAVA'}
              />
            </div>
          )}

          {/* TAB 3: SPECS & PAIRING */}
          {activeTab === 'specs' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Tagline / Catchphrase
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Modern luxury statement combining organic luster with bold masculine star pendant."
                  className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Detailed Description (Accordion 1)
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter complete product description..."
                  className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Materials & Finishes (1 per line)
                  </label>
                  <textarea
                    rows={3}
                    value={materialsText}
                    onChange={(e) => setMaterialsText(e.target.value)}
                    placeholder="316L Surgical Stainless Steel&#10;Hypoallergenic&#10;Waterproof PVD"
                    className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black font-mono focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Care Instructions (1 per line)
                  </label>
                  <textarea
                    rows={3}
                    value={careText}
                    onChange={(e) => setCareText(e.target.value)}
                    placeholder="100% Shower and workout safe&#10;Wipe clean with soft polishing cloth"
                    className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black font-mono focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Dimensions & Sizing
                </label>
                <input
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  placeholder="e.g. 19 Inch + 2 Inch Extension or Length: 50cm"
                  className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  "Why It Hits" Highlights (1 per line)
                </label>
                <textarea
                  rows={4}
                  value={whyItHitsText}
                  onChange={(e) => setWhyItHitsText(e.target.value)}
                  placeholder="A unique wave-inspired design&#10;Pairs effortlessly with every outfit&#10;The perfect balance—not too minimal, not too bold&#10;Waterproof&#10;Anti-tarnish"
                  className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black font-mono focus:outline-none focus:ring-1 focus:ring-black"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Displayed in the DESCRIPTION/MATERIAL accordion below the product on the PDP.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: SEO & PREVIEW */}
          {activeTab === 'seo' && (
            <div className="space-y-5">
              {/* Header with Quick Auto-Fill */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-gradient-to-r from-gray-50 to-neutral-100 rounded-xl border border-gray-200">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Search Engine Optimization (SERP)</span>
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Enforces Google standards: Titles (45–60 chars) & Descriptions (120–155 chars)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAutoGenerateSeo}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-black hover:text-white text-gray-800 text-xs font-bold rounded-lg border border-gray-300 shadow-2xs transition-all cursor-pointer shrink-0"
                  title="Generate unique, Google-compliant title and 120-155 char description"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Auto-Generate Optimal SEO</span>
                </button>
              </div>

              {/* Error Alert if Validation Fails */}
              {seoError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-800 animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-rose-900">SEO Requirement Notice</p>
                    <p className="text-[11px] text-rose-700 mt-0.5">{seoError}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAutoGenerateSeo}
                    className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-[10px] shrink-0 transition-colors cursor-pointer"
                  >
                    Auto-Fill Now
                  </button>
                </div>
              )}

              {/* SEO Meta Title */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    SEO Meta Title
                  </label>
                  {(() => {
                    const status = getSeoTitleStatus(seoTitle);
                    const len = (seoTitle || '').trim().length;
                    return (
                      <span
                        className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
                          status === 'empty'
                            ? 'bg-gray-100 text-gray-500 border-gray-200'
                            : status === 'optimal'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold'
                            : status === 'short'
                            ? 'bg-amber-50 text-amber-700 border-amber-200 font-semibold'
                            : 'bg-rose-50 text-rose-700 border-rose-200 font-bold'
                        }`}
                      >
                        {len}/60 chars ({status === 'optimal' ? 'Optimal' : status === 'short' ? 'Short (<45)' : status === 'long' ? 'Too long (>60)' : 'Empty'})
                      </span>
                    );
                  })()}
                </div>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => {
                    setSeoTitle(e.target.value);
                    if (seoError) setSeoError(null);
                  }}
                  placeholder={`${title} | ${category} | PASAAVA Men's Jewellery`}
                  className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
                />
                <p className="text-[11px] text-gray-400 mt-1">Recommended length: 45–60 characters.</p>
              </div>

              {/* SEO Meta Description */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    SEO Meta Description
                  </label>
                  {(() => {
                    const status = getSeoDescStatus(seoDesc);
                    const len = (seoDesc || '').trim().length;
                    return (
                      <span
                        className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
                          status === 'empty'
                            ? 'bg-gray-100 text-gray-500 border-gray-200'
                            : status === 'optimal'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold'
                            : status === 'short'
                            ? 'bg-amber-50 text-amber-700 border-amber-200 font-bold'
                            : 'bg-rose-50 text-rose-700 border-rose-200 font-bold'
                        }`}
                      >
                        {len}/155 chars ({status === 'optimal' ? 'Optimal' : status === 'short' ? 'Too short (min 120)' : status === 'long' ? 'Too long (max 155)' : 'Empty'})
                      </span>
                    );
                  })()}
                </div>
                <textarea
                  rows={3}
                  value={seoDesc}
                  onChange={(e) => {
                    setSeoDesc(e.target.value);
                    if (seoError) setSeoError(null);
                  }}
                  placeholder="Bold jewellery for men. Combines lustrous materials with modern masculine design. Premium men’s jewellery from PASAAVA. Shop now."
                  className={`w-full px-3.5 py-2.5 bg-[#F9F9F9] border rounded-xl text-xs text-black focus:outline-none transition-colors ${
                    getSeoDescStatus(seoDesc) === 'short' && (seoDesc || '').trim().length > 0
                      ? 'border-amber-300 focus:ring-1 focus:ring-amber-500'
                      : getSeoDescStatus(seoDesc) === 'long'
                      ? 'border-rose-300 focus:ring-1 focus:ring-rose-500'
                      : getSeoDescStatus(seoDesc) === 'optimal'
                      ? 'border-emerald-300 focus:ring-1 focus:ring-emerald-500'
                      : 'border-gray-200 focus:ring-1 focus:ring-black'
                  }`}
                />
                <div className="flex items-center justify-between text-[11px] mt-1 text-gray-500">
                  <span>Recommended Google snippet length: <strong>120–155 characters</strong>.</span>
                  {getSeoDescStatus(seoDesc) === 'short' && (
                    <span className="text-amber-700 font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                      Add at least {SEO_LIMITS.DESC_MIN - (seoDesc || '').trim().length} more chars
                    </span>
                  )}
                </div>
              </div>

              {/* Google SERP Snippet Preview */}
              <div className="bg-[#F8F9FA] p-4 rounded-xl border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Google Search Result Snippet Preview
                  </span>
                  <a
                    href={`/#/product/${slug || 'sample-piece'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                    title="Open live product page in new tab"
                  >
                    <span>Open Live Product Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-2xs font-sans">
                  <a
                    href={`/#/product/${slug || 'sample-piece'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#202124] flex items-center gap-1.5 mb-0.5 hover:underline cursor-pointer group"
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-black text-white text-[8px] flex items-center justify-center font-bold">P</span>
                    <span className="text-gray-700 truncate font-mono text-[10px]">https://pasaava.growithcp.live › product › {slug || 'sample-piece'}</span>
                  </a>
                  <a
                    href={`/#/product/${slug || 'sample-piece'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug block"
                  >
                    {seoTitle || `${title || 'Product'} | ${category} | PASAAVA Men's Jewellery`}
                  </a>
                  <div className="text-xs text-[#4d5156] line-clamp-2 mt-1 leading-relaxed">
                    {seoDesc ||
                      'Bold masculine jewellery engineered from waterproof surgical steel. Premium men’s jewellery from PASAAVA. Shop now.'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <div className="flex items-center gap-3">
              {getSeoDescStatus(seoDesc) === 'short' && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg font-medium">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  SEO description &lt; 120 chars
                </span>
              )}
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-[#111111] text-white text-xs font-bold rounded-xl hover:bg-black transition-all cursor-pointer shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>{isEditing ? 'Update Hardware Piece' : 'Create Product'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
