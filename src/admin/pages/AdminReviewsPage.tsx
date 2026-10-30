import React, { useState, useEffect } from 'react';
import {
  Star,
  CheckCircle,
  XCircle,
  Trash2,
  Clock,
  ThumbsUp,
  ShieldCheck,
  Search,
  ExternalLink,
  Plus,
  Image as ImageIcon,
  X,
  Filter,
  Link2,
  Copy,
  Check,
  MessageCircle
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { Product, ProductReview, Order } from '../../types';

interface AdminReviewsPageProps {
  onNavigate: (path: string) => void;
}

export const AdminReviewsPage: React.FC<AdminReviewsPageProps> = ({ onNavigate }) => {
  const [reviews, setReviews] = useState<ProductReview[]>(() => storageService.getReviews());
  const [products] = useState<Product[]>(() => storageService.getProducts());
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  // Image zoom modal
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Manual Review Creation Modal
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState<number>(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newProductSlug, setNewProductSlug] = useState(products[0]?.slug || 'stella-tennis-bracelet');
  const [newLocation, setNewLocation] = useState('Mumbai, MH');
  const [newVerified, setNewVerified] = useState(true);

  // Generate Review Link Modal
  const [isLinkGenOpen, setIsLinkGenOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(() => storageService.getOrders());
  const [selectedOrderId, setSelectedOrderId] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    return storageService.subscribe(() => {
      setReviews(storageService.getReviews());
      setOrders(storageService.getOrders());
    });
  }, []);

  const handleOpenLinkGen = () => {
    const allOrders = storageService.getOrders();
    setOrders(allOrders);
    const candidate = allOrders.find((o) => !o.reviewSubmitted) || allOrders[0];
    if (candidate) {
      setSelectedOrderId(candidate.id);
    }
    setIsLinkGenOpen(true);
  };

  const handleGenerateOrderToken = (orderId: string) => {
    storageService.generateReviewToken(orderId);
    setOrders(storageService.getOrders());
    showNotification('Secure verified review link generated!');
  };

  const copyReviewLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
    showNotification('Review link copied to clipboard');
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUpdateStatus = (id: string, status: 'approved' | 'rejected') => {
    storageService.updateReviewStatus(id, status);
    showNotification(`Review marked as ${status.toUpperCase()}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to permanently delete this review?')) {
      storageService.deleteReview(id);
      showNotification('Review deleted');
    }
  };

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) {
      showNotification('Please fill in Author name and comment.');
      return;
    }

    storageService.submitReview({
      author: newAuthor.trim(),
      rating: newRating,
      title: newTitle.trim(),
      comment: newComment.trim(),
      productSlug: newProductSlug,
      location: newLocation.trim(),
      verified: newVerified,
      recommended: true,
      date: new Date().toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      })
    });

    setIsCreateOpen(false);
    setNewAuthor('');
    setNewTitle('');
    setNewComment('');
    showNotification('New review submitted to pending moderation queue');
  };

  const filtered = reviews.filter((r) => {
    const matchesTab = activeTab === 'all' || (r.status || 'pending') === activeTab;
    const matchesSearch =
      r.author.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase()) ||
      (r.title && r.title.toLowerCase().includes(search.toLowerCase())) ||
      (r.productSlug && r.productSlug.toLowerCase().includes(search.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const pendingCount = reviews.filter((r) => (r.status || 'pending') === 'pending').length;
  const approvedCount = reviews.filter((r) => r.status === 'approved').length;
  const rejectedCount = reviews.filter((r) => r.status === 'rejected').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Trust & Social Proof
          </span>
          <h2 className="text-xl font-bold text-[#111111] mt-0.5">Customer Reviews ({reviews.length})</h2>
          <p className="text-xs text-gray-500">
            Moderate customer feedback. Approved reviews dynamically display on storefront product pages.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleOpenLinkGen}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#D0D0D0] text-[#111111] rounded-xl text-xs font-semibold hover:bg-gray-50 transition-all cursor-pointer shadow-xs"
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Generate Review Link</span>
          </button>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-black text-white rounded-xl text-xs font-semibold hover:bg-gray-800 transition-all cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Review Manually</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-3.5 bg-black text-white text-xs font-medium rounded-xl shadow-lg flex items-center justify-between">
          <span>{notification}</span>
          <button onClick={() => setNotification(null)} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#EBEBEB] flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between shadow-xs">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'pending'
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Pending ({pendingCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('approved')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'approved'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Approved ({approvedCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('rejected')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'rejected'
                ? 'bg-red-100 text-red-900 border border-red-300'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Rejected ({rejectedCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-black text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span>All ({reviews.length})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search author, keyword, slug..."
            className="w-full pl-8 pr-3 py-1.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
      </div>

      {/* Review Cards Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-gray-200 text-gray-500 text-xs">
          No reviews found matching your filter criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-5 rounded-2xl border border-[#EBEBEB] shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-black text-black' : 'text-gray-200'
                        }`}
                      />
                    ))}
                    <span className="text-[11px] font-bold text-gray-800 ml-1.5">
                      {rev.rating}/5
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        rev.status === 'approved'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : rev.status === 'rejected'
                          ? 'bg-red-50 text-red-800 border border-red-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {rev.status || 'pending'}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {rev.date || new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {rev.title && (
                  <h4 className="text-xs font-bold text-gray-900 mb-1">{rev.title}</h4>
                )}
                <p className="text-xs text-gray-600 leading-relaxed italic">"{rev.comment}"</p>

                {/* Customer Uploaded Photos */}
                {rev.images && rev.images.length > 0 && (
                  <div className="mt-3 flex items-center gap-2 overflow-x-auto py-1">
                    {rev.images.map((imgUrl, i) => (
                      <img
                        key={i}
                        src={imgUrl}
                        alt="Customer upload"
                        onClick={() => setPreviewImage(imgUrl)}
                        className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200 cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    ))}
                  </div>
                )}

                <div className="mt-3 flex items-center justify-between text-[11px] text-gray-500 pt-3 border-t border-gray-100">
                  <div className="font-semibold text-black flex items-center gap-1.5">
                    <span>{rev.author}</span>
                    {rev.verified && (
                      <span className="flex items-center gap-0.5 text-[9.5px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                        <ShieldCheck className="w-3 h-3" />
                        Verified Buyer
                      </span>
                    )}
                    {rev.location && (
                      <span className="text-[10px] text-gray-400 font-normal">
                        • {rev.location}
                      </span>
                    )}
                  </div>

                  {rev.productSlug && (
                    <a
                      href={`/#/product/${rev.productSlug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1 font-mono text-[10px]"
                    >
                      <span>/{rev.productSlug}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  {rev.status !== 'approved' && rev.id && (
                    <button
                      onClick={() => handleUpdateStatus(rev.id!, 'approved')}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white rounded-lg text-[11px] font-semibold hover:bg-gray-800 transition-colors cursor-pointer shadow-xs active:scale-95"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Accept / Approve</span>
                    </button>
                  )}

                  {rev.status !== 'rejected' && rev.id && (
                    <button
                      onClick={() => handleUpdateStatus(rev.id!, 'rejected')}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-[11px] font-semibold hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer active:scale-95"
                    >
                      <XCircle className="w-3.5 h-3.5 text-red-500" />
                      <span>Reject</span>
                    </button>
                  )}

                  {rev.status === 'approved' && (
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-md flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      <span>Live on storefront</span>
                    </span>
                  )}
                </div>

                {rev.id && (
                  <button
                    onClick={() => handleDelete(rev.id!)}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-xl max-h-[85vh] bg-white rounded-2xl p-2 overflow-hidden shadow-2xl">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 p-2 bg-black/60 text-white rounded-full hover:bg-black"
            >
              <X className="w-4 h-4" />
            </button>
            <img src={previewImage} alt="Preview" className="max-w-full max-h-[80vh] rounded-xl object-contain" />
          </div>
        </div>
      )}

      {/* Manual Review Creation Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-[#111111]">Create Customer Testimonial</h3>
                <p className="text-xs text-gray-400">Add an offline or manually collected review</p>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-black hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateReview} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  Product Target
                </label>
                <select
                  value={newProductSlug}
                  onChange={(e) => setNewProductSlug(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-1 focus:ring-black"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.slug}>
                      {p.title} ({p.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Vikramaditya S."
                    className="w-full px-3 py-2 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Rating (1 to 5)
                  </label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <option value={5}>5 Stars (Exceptional)</option>
                    <option value={4}>4 Stars (Very Good)</option>
                    <option value={3}>3 Stars (Average)</option>
                    <option value={2}>2 Stars (Disappointed)</option>
                    <option value={1}>1 Star (Poor)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  Review Headline
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Superior finish and heavyweight steel"
                  className="w-full px-3 py-2 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  Review Content
                </label>
                <textarea
                  rows={3}
                  required
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Detailed customer experience..."
                  className="w-full px-3 py-2 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-1 focus:ring-black resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Bangalore, KA"
                    className="w-full px-3 py-2 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div className="pt-4 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="verifiedCheck"
                    checked={newVerified}
                    onChange={(e) => setNewVerified(e.target.checked)}
                    className="w-4 h-4 rounded text-black focus:ring-black"
                  />
                  <label htmlFor="verifiedCheck" className="text-xs text-gray-700 font-medium">
                    Verified Buyer Badge
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-xl font-bold hover:bg-gray-800"
                >
                  Create Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Generate Review Link Modal */}
      {isLinkGenOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center">
                  <Link2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#111111]">Generate Verified Review Link</h3>
                  <p className="text-[11px] text-gray-500">
                    Create a single-use verified buyer review link for customer feedback.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsLinkGenOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="p-6 text-center text-xs text-gray-500 bg-gray-50 rounded-xl">
                No orders found in store database yet. Once an order is created, you can issue verified review links here.
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                    Select Customer Order
                  </label>
                  <select
                    value={selectedOrderId}
                    onChange={(e) => setSelectedOrderId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#F9F9F9] border border-[#E0E0E0] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    {orders.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.orderNo} — {o.customer.name} ({o.items.length} item{o.items.length > 1 ? 's' : ''})
                        {o.reviewSubmitted ? ' • [Review Submitted]' : o.reviewToken ? ' • [Link Active]' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {(() => {
                  const currentOrder = orders.find((o) => o.id === selectedOrderId);
                  if (!currentOrder) return null;

                  const reviewUrl = currentOrder.reviewToken
                    ? `${window.location.origin}/#/review/${currentOrder.reviewToken}`
                    : null;

                  return (
                    <div className="bg-[#FAF8F5] border border-[#E8DFD5] rounded-xl p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#111111]">{currentOrder.customer.name}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/5 text-gray-700">
                              {currentOrder.orderNo}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 mt-0.5">
                            Phone: {currentOrder.customer.phone || 'N/A'} • Items: {currentOrder.items.map((i) => i.title).join(', ')}
                          </p>
                        </div>

                        {currentOrder.reviewSubmitted ? (
                          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg font-bold text-[10px] flex items-center gap-1">
                            <Check className="w-3 h-3" /> Submitted
                          </span>
                        ) : null}
                      </div>

                      {currentOrder.reviewSubmitted ? (
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                          This customer has already submitted their review for this order. It is listed in the reviews table above.
                        </div>
                      ) : reviewUrl ? (
                        <div className="space-y-2.5 pt-1">
                          <label className="block text-[11px] font-semibold text-gray-700">
                            Single-Use Verified Review URL:
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              readOnly
                              value={reviewUrl}
                              className="flex-1 px-3 py-2 bg-white border border-[#D5D5D5] rounded-lg text-xs font-mono text-gray-800 select-all"
                            />
                            <button
                              onClick={() => copyReviewLink(reviewUrl)}
                              className="px-3.5 py-2 bg-black text-white rounded-lg text-xs font-semibold hover:bg-gray-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>

                          <div className="flex items-center gap-2 pt-1">
                            {currentOrder.customer.phone && (
                              <a
                                href={`https://wa.me/${currentOrder.customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                  `Hi ${currentOrder.customer.name}! Thank you for your purchase from PASAAVA. Please share your experience with your jewelry piece here: ${reviewUrl}`
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>Send via WhatsApp</span>
                              </a>
                            )}
                            <a
                              href={reviewUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Test Link</span>
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => handleGenerateOrderToken(currentOrder.id)}
                            className="w-full py-2.5 bg-black text-white text-xs font-bold rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                          >
                            <Link2 className="w-3.5 h-3.5" />
                            <span>Generate Link for {currentOrder.customer.name}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()}

                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200/80 text-[11px] text-gray-600 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    When the customer opens this link, they are verified automatically. Their submission will appear in the <strong>Pending</strong> moderation queue with a <strong>Verified Buyer</strong> badge.
                  </span>
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsLinkGenOpen(false)}
                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
