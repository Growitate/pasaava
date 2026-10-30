import React, { useState, useEffect } from 'react';
import {
  Star,
  CheckCircle2,
  Upload,
  X,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { seoService } from '../services/seoService';
import { Order, OrderItem, ProductReview } from '../types';

interface PublicReviewPageProps {
  token: string;
  onNavigate: (path: string) => void;
}

const RATING_LABELS = [
  'Select a rating',
  '1 Star • Poor Quality',
  '2 Stars • Fair / Disappointed',
  '3 Stars • Average Quality',
  '4 Stars • Very Good',
  '5 Stars • Exceptional Craftsmanship'
];

export const PublicReviewPage: React.FC<PublicReviewPageProps> = ({ token, onNavigate }) => {
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] = useState<OrderItem | null>(null);

  // Form Fields
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [images, setImages] = useState<string[]>([]);

  // State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    seoService.applyMeta({
      title: 'Submit Verified Review | PASAAVA',
      noindex: true
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!token) {
      setOrder(null);
      return;
    }
    const matched = storageService.getOrderByReviewToken(token);
    setOrder(matched || null);
    if (matched && matched.items.length > 0) {
      setSelectedProduct(matched.items[0]);
      setAuthorName(matched.customer.name);
    }
  }, [token]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > 2) {
      alert('You can upload up to 2 product photos.');
      return;
    }

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      if (file.size > 5 * 1024 * 1024) {
        alert('Image must be under 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          setImages((prev) => (prev.length < 2 ? [...prev, dataUrl] : prev));
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      setError('Please select a star rating.');
      return;
    }
    if (!comment.trim()) {
      setError('Please share a few words about your experience.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    setTimeout(() => {
      try {
        storageService.submitReview({
          productSlug: selectedProduct?.productSlug || 'pasaava-piece',
          author: authorName.trim() || 'Verified Customer',
          rating,
          date: new Date().toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
          }),
          title: title.trim() || undefined,
          comment: comment.trim(),
          verified: true,
          token,
          images: images.length > 0 ? images : undefined,
          recommended: rating >= 4,
          location: order?.customer.city || 'India'
        });

        setIsSubmitting(false);
        setSubmitted(true);
      } catch (err) {
        console.error('Failed to submit review:', err);
        setError('Submission failed. Please try again.');
        setIsSubmitting(false);
      }
    }, 600);
  };

  // Loading state
  if (order === undefined) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  // Invalid Token State
  if (order === null || order.reviewSubmitted) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 bg-[#FBFBFB]">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-gray-200 shadow-sm text-center space-y-4">
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto border border-amber-200">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Review Link Expired or Already Used</h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            This single-use review link has either already been submitted or is no longer valid.
            Thank you for being a valued PASAAVA collector!
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('/')}
              className="py-3 px-6 bg-black text-white text-xs font-semibold rounded-xl hover:bg-gray-800 transition-all cursor-pointer"
            >
              Return to Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Submitted Thank You State
  if (submitted) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 bg-[#FBFBFB]">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-gray-200 shadow-sm text-center space-y-5">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-200">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">Thank You for Your Feedback!</h2>
            <p className="text-xs text-gray-500 mt-1">
              Your verified review for <strong>{selectedProduct?.title}</strong> has been submitted.
              Once verified by our atelier, it will be published to the store.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Customer Purchase</span>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('/')}
              className="w-full py-3.5 px-6 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-all cursor-pointer"
            >
              Explore New Drops
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Review Form
  return (
    <div className="min-h-screen bg-[#FBFBFB] py-10 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-xl mx-auto space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-black tracking-[0.25em] text-[#111111] uppercase">
            PASAAVA
          </h1>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Verified Hardware Review
          </p>
        </div>

        {/* Product Card Being Reviewed */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-4">
          <img
            src={selectedProduct?.image || '/images/drop-wave-chain.jpg'}
            alt={selectedProduct?.title}
            className="w-16 h-16 rounded-xl object-cover border border-gray-200 bg-gray-50 flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded w-max mb-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Verified Order #{order.orderNo}</span>
            </div>
            <h3 className="text-sm font-bold text-gray-900 truncate">{selectedProduct?.title}</h3>
            <p className="text-[11px] text-gray-400">
              Purchased on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Multi-product selector if order had multiple items */}
        {order.items.length > 1 && (
          <div className="bg-white p-3.5 rounded-xl border border-gray-200 text-xs">
            <label className="block text-[11px] font-semibold text-gray-500 mb-2">
              Select product you want to review:
            </label>
            <div className="flex flex-wrap gap-2">
              {order.items.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedProduct(item)}
                  className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-all cursor-pointer ${
                    selectedProduct?.productId === item.productId
                      ? 'bg-black text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Review Submission Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Star Rating Selector */}
          <div className="space-y-2 text-center py-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              Your Overall Rating
            </label>
            <div className="flex items-center justify-center gap-2 py-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 cursor-pointer transition-transform hover:scale-125 focus:outline-none"
                    aria-label={`Rate ${star} star`}
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        isFilled
                          ? 'fill-[#111111] text-[#111111]'
                          : 'text-gray-300 hover:text-gray-400'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <p className="text-xs font-semibold text-gray-600">
              {RATING_LABELS[hoverRating || rating]}
            </p>
          </div>

          {/* Review Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Review Title (Headline)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Stunning weight, daily gym staple"
              className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Review Detailed Comment */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Detailed Experience *
            </label>
            <textarea
              rows={4}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How does the jewelry feel? Tell other collectors about the polish, weight, durability, and packaging..."
              className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black leading-relaxed"
            />
          </div>

          {/* Display Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Your Name (displayed publicly)
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="e.g. Aryan S."
              className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Photo Upload (Max 2) */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-gray-700">
                Add Photos (Optional, max 2)
              </label>
              <span className="text-[11px] text-gray-400">{images.length}/2 uploaded</span>
            </div>

            {/* Previews */}
            <div className="flex items-center gap-3">
              {images.map((imgUrl, i) => (
                <div
                  key={i}
                  className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 bg-gray-100 group"
                >
                  <img src={imgUrl} alt="Review upload" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {images.length < 2 && (
                <label className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 hover:border-black flex flex-col items-center justify-center text-gray-400 hover:text-black cursor-pointer transition-colors bg-gray-50/50">
                  <Upload className="w-5 h-5 mb-1" />
                  <span className="text-[10px] font-semibold">Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#111111] text-white py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all cursor-pointer shadow-md disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Submit Verified Review</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
