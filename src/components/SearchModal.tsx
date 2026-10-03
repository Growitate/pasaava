import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { products } from '../data/products';
import { Product } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const quickTags = ['Cuban Chain', 'Signet Ring', 'Figaro Chain', 'Curb Bracelet', 'Black Studs', 'Rope Chain', 'Leather Cuffs', 'Huggie Hoops'];

  const filteredProducts: Product[] = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.gender.toLowerCase().includes(q)
        );
      })
    : [];

  const handleProductSelect = (slug: string) => {
    onClose();
    onNavigate(`/product/${slug}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#e8e8e8] z-10 flex flex-col max-h-[80vh]"
          >
            {/* Input Bar */}
            <div className="p-4 sm:p-5 border-b border-[#e8e8e8] flex items-center gap-3 bg-[#fafaf7]">
              <Search className="w-5 h-5 text-[#9a948e] flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search jewelry by name, metal, category..."
                className="w-full bg-transparent text-base sm:text-lg text-[#1c1c1a] placeholder-[#9a948e] focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded-full text-[#9a948e] hover:text-[#1c1c1a] hover:bg-black/5"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="hidden sm:inline-flex px-2.5 py-1 text-[11px] font-medium text-[#6d6a67] bg-white border border-[#e0e0e0] rounded-md shadow-xs"
              >
                ESC
              </button>
            </div>

            {/* Suggestions / Tags */}
            <div className="px-5 py-3 border-b border-[#f0f0f0] bg-[#fafaf7]/50 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-semibold text-[#9a948e] uppercase tracking-wider flex-shrink-0">
                Popular:
              </span>
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="text-xs px-2.5 py-1 rounded-full bg-white border border-[#e8e8e8] text-[#1c1c1a] hover:border-[#b9836a] hover:text-[#b9836a] transition-colors flex-shrink-0"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Results Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              {query.trim() === '' ? (
                <div>
                  <h4 className="text-xs font-semibold text-[#9a948e] uppercase tracking-wider mb-3">
                    Featured Drops
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {products.slice(0, 4).map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleProductSelect(p.slug)}
                        className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-[#f8f6f3] transition-colors cursor-pointer group border border-transparent hover:border-[#e8e8e8]"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-14 h-14 object-cover rounded-xl bg-[#f0ede6]"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] text-[#9a948e] uppercase font-medium">
                            {p.category}
                          </p>
                          <h5 className="text-sm font-medium text-[#1c1c1a] group-hover:text-[#b9836a] truncate transition-colors">
                            {p.title}
                          </h5>
                          <span className="text-xs font-semibold text-[#1c1c1a]">
                            {formatPrice(p.price)}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#9a948e] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#f8f6f3] flex items-center justify-center mx-auto mb-3 text-[#9a948e]">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-medium text-[#1c1c1a] mb-1">
                    No results for "{query}"
                  </h4>
                  <p className="text-xs text-[#9a948e]">
                    Try searching for “Bar Necklace”, “Rope Chain”, or “Signet Ring”.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#f0f0f0] text-xs text-[#9a948e]">
                    <span>Found {filteredProducts.length} matching pieces</span>
                    <span className="flex items-center gap-1 text-[#b9836a]">
                      <Sparkles className="w-3 h-3" />
                      Instant Results
                    </span>
                  </div>
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleProductSelect(p.slug)}
                      className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#f8f6f3] transition-all cursor-pointer group border border-transparent hover:border-[#e8e8e8]"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="w-16 h-16 object-cover rounded-xl bg-[#f0ede6]"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-[#9a948e] uppercase font-medium">
                            {p.category}
                          </span>
                          {p.badge && (
                            <span className="text-[10px] bg-[#1c1c1a] text-white px-2 py-0.5 rounded-full font-medium">
                              {p.badge}
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-medium text-[#1c1c1a] group-hover:text-[#b9836a] transition-colors truncate">
                          {p.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-sm font-semibold text-[#1c1c1a]">
                            {formatPrice(p.price)}
                          </span>
                          {p.originalPrice && (
                            <span className="text-xs text-[#9a948e] line-through">
                              {formatPrice(p.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#9a948e] group-hover:text-[#b9836a] group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
