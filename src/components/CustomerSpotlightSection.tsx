import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { customerSpotlights } from '../data/customerFeatures';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface CustomerSpotlightSectionProps {
  onNavigate: (path: string) => void;
}

export const CustomerSpotlightSection: React.FC<CustomerSpotlightSectionProps> = ({
  onNavigate
}) => {
  return (
    <section className="py-20 md:py-28 bg-[#f8f6f3] border-t border-[#e8e8e8]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#b9836a]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Community & Real Styling</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1c1c1a]">
              Featured Men of PASAAVA
            </h2>
            <p className="text-sm sm:text-base text-[#6d6a67] max-w-lg">
              Styled by creators, athletes, and architects across the globe. Tag <strong className="text-[#1c1c1a]">@pasaava</strong> to be featured in our upcoming gallery spotlight.
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-[#e0e0e0] px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#1c1c1a] hover:border-[#1c1c1a] hover:bg-[#fafaf7] transition-all shadow-xs self-start md:self-auto"
          >
            <InstagramIcon className="w-4 h-4 text-[#b9836a]" />
            <span>Follow @pasaava</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {customerSpotlights.map((spotlight, idx) => (
            <motion.div
              key={spotlight.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => onNavigate(`/product/${spotlight.productSlug}`)}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#e0ded8] shadow-sm cursor-pointer border border-[#e8e8e8]"
            >
              <img
                src={spotlight.image}
                alt={spotlight.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Overlay Details */}
              <div className="absolute inset-x-3 bottom-3 text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-[10px] text-[#b9836a] font-medium block">
                  {spotlight.handle}
                </span>
                <h4 className="text-xs font-semibold leading-tight truncate">
                  {spotlight.name}
                </h4>
                <p className="text-[11px] text-white/80 truncate mt-0.5">
                  wearing {spotlight.productTitle}
                </p>
              </div>

              {/* Floating Instagram Icon */}
              <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#1c1c1a] opacity-80 group-hover:opacity-100 group-hover:bg-white transition-all shadow-xs">
                <InstagramIcon className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Callout Footer */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-[#e8e8e8] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-xl sm:text-2xl font-light text-[#1c1c1a]">
              Join the PASAAVA Movement
            </h4>
            <p className="text-xs sm:text-sm text-[#6d6a67]">
              Share your personal styling with <span className="font-semibold text-[#1c1c1a]">#PasaavaMen</span> on Instagram for early access to private drops.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/shop')}
            className="flex-shrink-0 bg-[#1c1c1a] text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-black transition-transform active:scale-95 shadow-sm"
          >
            Shop Featured Looks
          </button>
        </div>
      </div>
    </section>
  );
};
