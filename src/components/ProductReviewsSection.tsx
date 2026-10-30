import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Check,
  Filter,
  ChevronDown,
  Edit3,
  X,
  CheckCircle2,
  ThumbsUp,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Product, ProductReview } from '../types';
import { getProductReviews, saveUserReview } from '../data/productReviews';
import { storageService } from '../services/storageService';

interface ProductReviewsSectionProps {
  product: Product;
  selectedColor?: string;
}

// Swatch gradient helper for luxury finish pills
function getSwatchClass(colorName: string): string {
  const c = colorName.toLowerCase();
  if (c.includes('gold') && !c.includes('rose') && !c.includes('white')) {
    return 'bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 border border-amber-500/50';
  }
  if (c.includes('rose')) {
    return 'bg-gradient-to-tr from-rose-400 via-rose-300 to-amber-200 border border-rose-400/50';
  }
  if (c.includes('black') || c.includes('obsidian') || c.includes('dark')) {
    return 'bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-700 border border-neutral-600';
  }
  return 'bg-gradient-to-tr from-slate-400 via-slate-200 to-white border border-slate-300';
}

const PROMPT_SUGGESTIONS = [
  'Heavyweight build',
  'Mirror steel shine',
  'Waterproof & sweatproof',
  'Bulletproof clasp',
  'Luxury presentation case'
];

const RATING_DESCRIPTIONS: Record<number, { title: string; subtitle: string }> = {
  5: { title: 'Exceptional craftsmanship & flawless finish', subtitle: '5.0 ★ Exceptional' },
  4: { title: 'High quality build & comfortable fit', subtitle: '4.0 ★ Very Good' },
  3: { title: 'Average piece, meets standard expectations', subtitle: '3.0 ★ Average' },
  2: { title: 'Below expectations, needs improvement', subtitle: '2.0 ★ Fair' },
  1: { title: 'Unsatisfactory piece or experience', subtitle: '1.0 ★ Poor' }
};

// Store reviews data for the Store Reviews tab
const STORE_REVIEWS: ProductReview[] = [
  {
    id: 'store-1',
    author: 'Anonymous',
    rating: 5,
    date: '10/05/2026',
    title: 'PASAAVA Quality',
    comment: 'PASAAVA pieces are top tier. Weight, polish and packaging exceeded all expectations.',
    verified: true
  },
  {
    id: 'store-2',
    author: 'Parth Tanwar',
    rating: 5,
    date: '10/02/2026',
    title: 'Nice quality',
    comment: 'Superior finish and weight. Looks even better in person than online. Clasp is very solid.',
    verified: true
  },
  {
    id: 'store-3',
    author: 'Zeon Caldeira',
    rating: 5,
    date: '09/24/2026',
    title: 'Everyday collection',
    comment: 'Waterproof as promised! Worn in gym, shower, and pool every single day. Zero tarnish.',
    verified: true
  },
  {
    id: 'store-4',
    author: 'Lucas Martinez',
    rating: 5,
    date: '09/18/2026',
    title: 'Great customer support',
    comment: 'Express delivery arrived in 2 days. The presentation box feels like a ₹10,000 watch case.',
    verified: true
  },
  {
    id: 'store-5',
    author: 'Anonymous',
    rating: 4,
    date: '09/11/2026',
    title: 'Solid craftsmanship',
    comment: 'Great weight and finish on every piece ordered so far. Double latch is secure.',
    verified: true
  }
];

// Helper to format date as MM/DD/YYYY matching the design image
function formatReviewDate(dateStr: string): string {
  if (!dateStr) return '09/27/2026';
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) return dateStr;
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  }
  return dateStr;
}

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({
  product,
  selectedColor
}) => {
  const INITIAL_VISIBLE = 2;
  const [activeTab, setActiveTab] = useState<'product' | 'store'>('product');
  const [productReviews, setProductReviews] = useState<ProductReview[]>(() =>
    getProductReviews(product)
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'highest' | 'lowest' | 'recent'>('highest');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [expandedReviewIds, setExpandedReviewIds] = useState<Record<string, boolean>>({});

  // Write Review Modal States
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [formRating, setFormRating] = useState<number>(5);
  const [formHoverRating, setFormHoverRating] = useState<number>(0);
  const [formTitle, setFormTitle] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formAuthor, setFormAuthor] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formRecommended, setFormRecommended] = useState(true);
  const [formColor, setFormColor] = useState(
    selectedColor || product.colors?.[0]?.name || 'Silver Steel'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const sortRef = useRef<HTMLDivElement>(null);

  const toggleReviewExpand = (reviewId: string) => {
    setExpandedReviewIds((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAuthor.trim() || !formComment.trim()) {
      alert('Please provide your name and review comments.');
      return;
    }
    setIsSubmitting(true);

    const titleText = formTitle.trim() || `${formRating} Star Customer Review`;
    const authorText = formAuthor.trim();
    const commentText = formComment.trim();
    const locationText = formLocation.trim() || 'Verified Buyer';

    // 1. Submit review to admin moderation queue with status 'pending'
    saveUserReview(product, {
      author: authorText,
      rating: formRating,
      title: titleText,
      comment: commentText,
      location: locationText,
      color: formColor,
      recommended: formRecommended
    });

    // 2. Refresh local reviews state (pending review will not show until admin approves)
    setProductReviews(getProductReviews(product));
    setIsSubmitting(false);
    setIsWriteReviewOpen(false);

    // Reset form
    setFormTitle('');
    setFormComment('');
    setFormAuthor('');
    setFormLocation('');
    setFormRating(5);

    // Toast feedback
    setToastMessage(
      'Thank you! Your review has been submitted for moderation and will appear on the store once accepted by our team.'
    );
    setTimeout(() => setToastMessage(null), 6000);
  };

  // Reload reviews on product change & listen to storageService updates
  useEffect(() => {
    const refresh = () => {
      const loaded = getProductReviews(product);
      setProductReviews(loaded);
    };

    refresh();
    setSelectedRatingFilter(null);
    setVisibleCount(INITIAL_VISIBLE);
    setExpandedReviewIds({});
    setIsFilterOpen(false);
    setIsSortDropdownOpen(false);

    return storageService.subscribe(refresh);
  }, [product.id, product.slug]);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentList = activeTab === 'product' ? productReviews : STORE_REVIEWS;

  // Rating metric calculation for the active tab
  const metrics = useMemo(() => {
    const total = currentList.length;
    if (total === 0) return { avgRating: 5.0, count: 0 };
    const sum = currentList.reduce((acc, r) => acc + r.rating, 0);
    return {
      avgRating: Number((sum / total).toFixed(1)),
      count: total
    };
  }, [currentList]);

  // Filter & sort reviews
  const displayedReviews = useMemo(() => {
    let result = [...currentList];

    if (selectedRatingFilter !== null) {
      result = result.filter(
        (r) => Math.round(r.rating) === selectedRatingFilter
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'highest') return b.rating - a.rating;
      if (sortBy === 'lowest') return a.rating - b.rating;
      const dateA = new Date(a.date).getTime() || 0;
      const dateB = new Date(b.date).getTime() || 0;
      return dateB - dateA;
    });

    return result;
  }, [currentList, selectedRatingFilter, sortBy]);

  const sortLabels: Record<string, string> = {
    highest: 'Highest Rating',
    lowest: 'Lowest Rating',
    recent: 'Most Recent'
  };

  return (
    <section
      id="customer-reviews"
      className="mt-16 pt-12 border-t border-[#E5E5E5] scroll-mt-24 w-full"
    >
      {/* 1. Header: Customer Reviews, 4.0 1 review [✓ Verified] + Right Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-normal text-[#111111] font-sans tracking-tight">
            Customer Reviews
          </h2>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold text-[#111111] leading-none">
              {metrics.avgRating.toFixed(1)}
            </span>

            <span className="text-xs text-[#111111] font-normal">
              {metrics.count} {metrics.count === 1 ? 'review' : 'reviews'}
            </span>

            {/* Cyan/Teal Verified Badge matching provided image */}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] bg-[#99F6E4] text-[#0F766E] text-[11px] font-semibold tracking-wide">
              <Check className="w-3 h-3 stroke-[3]" />
              <span>Verified</span>
            </span>
          </div>
        </div>

        {/* Right side: Trust Assurance & Write a Review button */}
        <div className="flex items-center gap-3 sm:gap-4 self-start sm:self-center">
          <div className="text-xs text-[#777777] hidden md:flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#16a34a] stroke-[2.5]" />
            <span>100% Verified Customer Feedback</span>
          </div>

          <button
            type="button"
            onClick={() => setIsWriteReviewOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] hover:bg-black text-white text-xs font-semibold rounded-full shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Write a Review</span>
          </button>
        </div>
      </div>

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-between gap-3 text-xs text-[#065F46] animate-fadeIn">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#059669] flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="p-1 hover:bg-[#D1FAE5] rounded-full text-[#047857] cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Tabs & Filter Row: Product reviews (X) | Store reviews (Y) --------- [Y] [Highest Rating v] */}
      <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-2 mb-6">
        {/* Left: Product reviews (X) & Store reviews (Y) */}
        <div className="flex items-center gap-5 sm:gap-7">
          <button
            type="button"
            onClick={() => {
              setActiveTab('product');
              setSelectedRatingFilter(null);
              setVisibleCount(INITIAL_VISIBLE);
            }}
            className={`text-xs sm:text-sm transition-colors cursor-pointer relative pb-2 -mb-2 ${
              activeTab === 'product'
                ? 'font-semibold text-black border-b-2 border-black'
                : 'font-normal text-[#777777] hover:text-black'
            }`}
          >
            Product reviews ({productReviews.length})
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('store');
              setSelectedRatingFilter(null);
              setVisibleCount(INITIAL_VISIBLE);
            }}
            className={`text-xs sm:text-sm transition-colors cursor-pointer relative pb-2 -mb-2 ${
              activeTab === 'store'
                ? 'font-semibold text-black border-b-2 border-black'
                : 'font-normal text-[#777777] hover:text-black'
            }`}
          >
            Store reviews ({STORE_REVIEWS.length})
          </button>
        </div>

        {/* Right: Filter button [ Y ] & Sort button [ Highest Rating v ] */}
        <div className="flex items-center gap-2">
          {/* Filter button icon pill */}
          <button
            type="button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
              isFilterOpen || selectedRatingFilter !== null
                ? 'border-black bg-black text-white'
                : 'border-[#D1D1D6] text-black hover:border-black'
            }`}
            aria-label="Filter reviews"
          >
            <Filter className="w-3.5 h-3.5 stroke-[1.8]" />
          </button>

          {/* Sort Dropdown Pill */}
          <div ref={sortRef} className="relative">
            <button
              type="button"
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className="h-8 px-3 rounded-full border border-[#D1D1D6] flex items-center gap-1.5 text-xs font-normal text-black hover:border-black transition-colors cursor-pointer"
            >
              <span>{sortLabels[sortBy]}</span>
              <ChevronDown className="w-3 h-3 text-black stroke-[2]" />
            </button>

            {/* Sort Popover Menu */}
            {isSortDropdownOpen && (
              <div className="absolute right-0 top-10 bg-white border border-[#E5E5E5] rounded-xl shadow-md py-1.5 w-36 z-20 text-xs">
                {(['highest', 'lowest', 'recent'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSortBy(opt);
                      setIsSortDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 hover:bg-[#F5F5F5] transition-colors cursor-pointer ${
                      sortBy === opt ? 'font-semibold text-black' : 'text-[#555555]'
                    }`}
                  >
                    {sortLabels[opt]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Star Options (when filter icon is toggled) */}
      {isFilterOpen && (
        <div className="flex items-center gap-2 pb-4 mb-4 border-b border-[#F0F0F0] text-xs">
          <span className="text-[#777777]">Filter by:</span>
          <button
            type="button"
            onClick={() => setSelectedRatingFilter(null)}
            className={`px-2.5 py-1 rounded-full text-[11px] cursor-pointer ${
              selectedRatingFilter === null
                ? 'bg-black text-white'
                : 'bg-[#F0F0F0] text-[#555555] hover:text-black'
            }`}
          >
            All
          </button>
          {[5, 4, 3, 2, 1].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() =>
                setSelectedRatingFilter(selectedRatingFilter === st ? null : st)
              }
              className={`px-2.5 py-1 rounded-full text-[11px] inline-flex items-center gap-1 cursor-pointer ${
                selectedRatingFilter === st
                  ? 'bg-black text-white'
                  : 'bg-[#F0F0F0] text-[#555555] hover:text-black'
              }`}
            >
              <span>{st}</span>
              <Star className="w-2.5 h-2.5 fill-current" />
            </button>
          ))}
        </div>
      )}

      {/* 3. Reviews List Matching the Design Image */}
      {displayedReviews.length === 0 ? (
        <div className="py-12 text-center text-xs text-[#777777]">
          No reviews found matching the current filter.
        </div>
      ) : (
        <div className="divide-y divide-[#E5E5E5]">
          {displayedReviews.slice(0, visibleCount).map((review) => {
            const initial = review.author?.trim()?.[0]?.toUpperCase() || 'A';
            const formattedDate = formatReviewDate(review.date);

            return (
              <div
                key={review.id || `${review.author}-${review.date}`}
                className="py-6 first:pt-2 last:pb-4 space-y-2.5"
              >
                {/* Justified Top Row: 5 Solid Black Stars on Left, Date on Right */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1 text-black">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= review.rating
                            ? 'fill-black text-black'
                            : 'fill-none text-black stroke-[1.75]'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-[11px] text-[#777777] font-normal tracking-wide">
                    {formattedDate}
                  </span>
                </div>

                {/* Justified Author Row: Avatar + Name + Verified Badge on Left, Finish on Right */}
                <div className="flex items-center justify-between gap-3 pt-0.5">
                  <div className="flex items-center gap-2.5">
                    {/* Round light-gray avatar with initial letter */}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#EAEAEA] flex items-center justify-center text-xs font-bold text-[#444444] flex-shrink-0">
                      {initial}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-[13px] font-bold text-black leading-tight">
                        {review.author || 'Anonymous'}
                      </span>

                      {review.verified && (
                        <span className="text-[10px] font-normal text-black border border-[#CCCCCC] rounded-full px-2 py-0.2 leading-tight">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>

                  {review.color && (
                    <span className="text-[11px] text-[#888888] hidden sm:inline">
                      {review.color}
                    </span>
                  )}
                </div>

                {/* Review Comment with View More / View Less */}
                <div className="pt-1">
                  <p className="text-xs sm:text-[13px] text-[#222222] font-normal leading-relaxed max-w-4xl">
                    {review.comment.length > 140 && !expandedReviewIds[review.id || '']
                      ? `${review.comment.slice(0, 140)}...`
                      : review.comment}
                    {review.comment.length > 140 && (
                      <button
                        type="button"
                        onClick={() => review.id && toggleReviewExpand(review.id)}
                        className="text-xs font-semibold text-black underline hover:no-underline ml-1.5 cursor-pointer inline-block"
                      >
                        {expandedReviewIds[review.id || ''] ? 'View less' : 'View more'}
                      </button>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View More Reviews Button */}
      {displayedReviews.length > visibleCount ? (
        <div className="pt-8 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 3)}
            className="text-xs font-medium text-black border border-black rounded-full px-6 py-2.5 hover:bg-black hover:text-white transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>View more reviews</span>
            <span className="text-[11px] opacity-60">
              ({displayedReviews.length - visibleCount} more)
            </span>
          </button>
        </div>
      ) : displayedReviews.length > INITIAL_VISIBLE ? (
        <div className="pt-8 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount(INITIAL_VISIBLE)}
            className="text-xs font-medium text-[#777777] hover:text-black hover:underline transition-colors cursor-pointer"
          >
            View less
          </button>
        </div>
      ) : null}

      {/* 4. Ultra-Premium Write Review Modal Dialog */}
      <AnimatePresence>
        {isWriteReviewOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-white rounded-[32px] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.35)] border border-[#EBEBEB] overflow-hidden my-auto flex flex-col max-h-[90vh]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="write-review-title"
            >
              {/* Top Accent Hairline */}
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#111111] to-transparent flex-shrink-0" />

              {/* Modal Header (Fixed) */}
              <div className="p-5 sm:p-6 border-b border-[#F0F0F0] bg-gradient-to-b from-[#FAFAFA] to-white relative flex-shrink-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#111111]/5 border border-[#111111]/10 text-[10px] font-bold tracking-[0.2em] uppercase text-[#666666]">
                      <Sparkles className="w-2.5 h-2.5 text-[#111111]" />
                      <span>Verified Collector Review</span>
                    </div>
                    <h3
                      id="write-review-title"
                      className="font-serif text-2xl sm:text-3xl font-normal text-[#111111] tracking-tight"
                    >
                      Share Your Experience
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsWriteReviewOpen(false)}
                    className="w-9 h-9 rounded-full border border-[#E5E5E5] bg-white flex items-center justify-center text-[#666666] hover:text-black hover:border-black hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xs"
                    aria-label="Close dialog"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Product Embedded Card */}
                <div className="mt-3.5 p-3 rounded-2xl bg-[#F6F6F6] border border-[#EEEEEE] flex items-center gap-3.5">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white border border-[#E5E5E5] flex-shrink-0 shadow-xs">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] uppercase tracking-widest font-semibold text-[#888888]">
                      {product.category}
                    </div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-[#111111] truncate leading-snug">
                      {product.title}
                    </h4>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 text-[11px] font-medium text-[#16a34a] bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Atelier Authenticated</span>
                  </div>
                </div>
              </div>

              {/* Modal Body Form */}
              <form onSubmit={handleSubmitReview} className="flex flex-col flex-1 min-h-0">
                <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
                  {/* 1. Overall Rating Card */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#FBFBFB] border border-[#EEEEEE] space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#111111]">
                        Overall Rating <span className="text-[#e04545]">*</span>
                      </label>
                      <span className="text-[11px] font-bold text-[#111111] bg-white border border-[#E5E5E5] px-3 py-1 rounded-full shadow-xs">
                        {RATING_DESCRIPTIONS[formHoverRating || formRating]?.subtitle}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const isActive = (formHoverRating || formRating) >= star;
                        return (
                          <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setFormHoverRating(star)}
                            onMouseLeave={() => setFormHoverRating(0)}
                            onClick={() => setFormRating(star)}
                            className="p-1 hover:scale-120 active:scale-95 transition-transform cursor-pointer focus:outline-hidden"
                            aria-label={`${star} star rating`}
                          >
                            <Star
                              className={`w-8 h-8 sm:w-9 sm:h-9 transition-colors ${
                                isActive
                                  ? 'fill-[#111111] text-[#111111] drop-shadow-xs'
                                  : 'fill-none text-[#D6D6D6] hover:text-[#888888]'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>

                    <p className="text-[11px] text-[#777777] italic">
                      {RATING_DESCRIPTIONS[formHoverRating || formRating]?.title} — Click stars to set rating
                    </p>
                  </div>

                  {/* 2. Color Finish Selection with Luxury Swatches */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#111111]">
                        Finish / Material
                      </label>
                      <div className="flex flex-wrap gap-2.5">
                        {product.colors.map((c) => {
                          const isSelected = formColor === c.name;
                          return (
                            <button
                              key={c.name}
                              type="button"
                              onClick={() => setFormColor(c.name)}
                              className={`group inline-flex items-center gap-2.5 text-xs px-4 py-2.5 rounded-full border transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-[#111111] bg-[#111111] text-white font-semibold shadow-xs scale-102'
                                  : 'border-[#E5E5E5] bg-white text-[#444444] hover:border-black'
                              }`}
                            >
                              <span
                                className={`w-3.5 h-3.5 rounded-full ring-1 ${getSwatchClass(
                                  c.name
                                )} ${isSelected ? 'ring-white/40' : 'ring-black/10'}`}
                              />
                              <span>{c.name}</span>
                              {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 3. Review Headline */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#111111]">
                      Headline Summary
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Architectural heft, razor-sharp facets & flawless clasp"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="w-full px-4 py-3 text-xs sm:text-[13px] bg-[#FBFBFB] hover:bg-white focus:bg-white border border-[#E0E0E0] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-2xl focus:outline-hidden transition-all placeholder:text-[#A8A8A8]"
                    />
                  </div>

                  {/* 4. Review Comment Textarea + Quick Prompt Chips */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#111111]">
                        Detailed Review <span className="text-[#e04545]">*</span>
                      </label>
                      <span className="text-[10px] text-[#888888] font-mono">
                        {formComment.length} characters
                      </span>
                    </div>

                    <textarea
                      rows={4}
                      required
                      placeholder="Describe the tactile weight, steel grade, daily wear resilience in shower or gym, clasp action, or packaging presentation..."
                      value={formComment}
                      onChange={(e) => setFormComment(e.target.value)}
                      className="w-full p-4 text-xs sm:text-[13px] bg-[#FBFBFB] hover:bg-white focus:bg-white border border-[#E0E0E0] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-2xl focus:outline-hidden transition-all resize-none leading-relaxed placeholder:text-[#A8A8A8]"
                    />

                    {/* Prompt Idea Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#888888]">
                        Add quick tag:
                      </span>
                      {PROMPT_SUGGESTIONS.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() =>
                            setFormComment((prev) =>
                              prev ? `${prev} ${tag}.` : `${tag}.`
                            )
                          }
                          className="text-[10px] px-2.5 py-1 rounded-full bg-[#F4F4F4] hover:bg-[#111111] text-[#555555] hover:text-white transition-colors cursor-pointer border border-[#EAEAEA]"
                        >
                          + {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 5. Author Name & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#111111]">
                        Your Name <span className="text-[#e04545]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Julian Reed"
                        value={formAuthor}
                        onChange={(e) => setFormAuthor(e.target.value)}
                        className="w-full px-4 py-3 text-xs sm:text-[13px] bg-[#FBFBFB] hover:bg-white focus:bg-white border border-[#E0E0E0] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-2xl focus:outline-hidden transition-all placeholder:text-[#A8A8A8]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#111111]">
                        Location / City (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mumbai, IN"
                        value={formLocation}
                        onChange={(e) => setFormLocation(e.target.value)}
                        className="w-full px-4 py-3 text-xs sm:text-[13px] bg-[#FBFBFB] hover:bg-white focus:bg-white border border-[#E0E0E0] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-2xl focus:outline-hidden transition-all placeholder:text-[#A8A8A8]"
                      />
                    </div>
                  </div>

                  {/* 6. Recommendation Segmented Toggle */}
                  <div className="p-4 rounded-2xl bg-[#FBFBFB] border border-[#EEEEEE] space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#111111] block">
                      Would you recommend this piece?
                    </label>
                    <div className="inline-flex p-1 rounded-full bg-[#EAEAEA] gap-1">
                      <button
                        type="button"
                        onClick={() => setFormRecommended(true)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                          formRecommended
                            ? 'bg-[#111111] text-white shadow-xs'
                            : 'text-[#666666] hover:text-black'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Yes, I recommend it</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormRecommended(false)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                          !formRecommended
                            ? 'bg-[#111111] text-white shadow-xs'
                            : 'text-[#666666] hover:text-black'
                        }`}
                      >
                        <span>No</span>
                      </button>
                    </div>
                  </div>

                  {/* Trust Assurance Card */}
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#F6FDF9] border border-[#A7F3D0]/60 text-[11px] text-[#065F46]">
                    <ShieldCheck className="w-4 h-4 text-[#059669] flex-shrink-0" />
                    <span>
                      Reviews undergo quality moderation to ensure 100% genuine verified collector experiences.
                    </span>
                  </div>
                </div>

                {/* 7. Pinned Luxury Footer Actions */}
                <div className="p-4 sm:px-6 bg-white/95 backdrop-blur-xs border-t border-[#F0F0F0] flex items-center justify-between gap-3 flex-shrink-0">
                  <span className="text-[11px] text-[#888888] hidden sm:flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Quality Assured</span>
                  </span>

                  <div className="flex items-center gap-2.5 ml-auto">
                    <button
                      type="button"
                      onClick={() => setIsWriteReviewOpen(false)}
                      className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#666666] hover:text-black hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-7 py-3 rounded-full text-xs font-bold tracking-widest uppercase bg-[#111111] hover:bg-black text-white transition-all active:scale-95 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Publishing...</span>
                      ) : (
                        <>
                          <span>Submit Review</span>
                          <Sparkles className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
