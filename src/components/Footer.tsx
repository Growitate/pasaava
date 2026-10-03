import React from 'react';
import { ArrowUpRight, Shield, Sparkles, Droplets } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#16181c] text-white pt-16 pb-12 border-t border-[#232529]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <span className="tracking-[0.25em] text-2xl font-bold uppercase text-white inline-block">
              PASAAVA
            </span>
            <p className="text-sm text-[#9a9da3] max-w-sm leading-relaxed">
              Modern men's jewellery engineered for strength, precision, and timeless masculine elegance. Forged from waterproof 316L surgical steel, aerospace titanium, and 18K gold PVD.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#bec3cc]">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#b9836a]" />
                2-Year Craftsmanship Guarantee
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-[#b9836a]" />
                100% Sweat & Waterproof
              </span>
            </div>
          </div>

          {/* Men's Collections Column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white/90 mb-4">
              Men's Hardware
            </h4>
            <ul className="space-y-2.5 text-sm text-[#9a9da3]">
              <li>
                <button
                  onClick={() => onNavigate('/men-category/men-chain')}
                  className="hover:text-white transition-colors"
                >
                  Neck Chains & Pendants
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/men-category/men-bracelet')}
                  className="hover:text-white transition-colors"
                >
                  Bracelets & Cuffs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/men-category/men-ring')}
                  className="hover:text-white transition-colors"
                >
                  Rings & Signets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/men-category/men-earring')}
                  className="hover:text-white transition-colors"
                >
                  Earrings & Studs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/shop')}
                  className="hover:text-white transition-colors font-medium text-white/80"
                >
                  All 25 Men's Pieces
                </button>
              </li>
            </ul>
          </div>

          {/* Pages Column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white/90 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-[#9a9da3]">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors"
                >
                  About PASAAVA
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/journals')}
                  className="hover:text-white transition-colors"
                >
                  Men's Style Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/favourite')}
                  className="hover:text-white transition-colors"
                >
                  Saved Wishlist
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-white transition-colors"
                >
                  Concierge & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Policy Column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white/90 mb-4">
              Client Service
            </h4>
            <ul className="space-y-2.5 text-sm text-[#9a9da3]">
              <li>
                <button
                  onClick={() => onNavigate('/terms')}
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/privacy-policy')}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/refund-policy')}
                  className="hover:text-white transition-colors"
                >
                  Refund & Shipping Policy
                </button>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Instagram (@pasaava)</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods & Bottom row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#9a9da3] mr-2">
              Guaranteed Safe Checkout:
            </span>
            <span className="px-2.5 py-1 rounded bg-[#232529] text-[11px] font-medium text-white/80">
              Apple Pay
            </span>
            <span className="px-2.5 py-1 rounded bg-[#232529] text-[11px] font-medium text-white/80">
              Google Pay
            </span>
            <span className="px-2.5 py-1 rounded bg-[#232529] text-[11px] font-medium text-white/80">
              PayPal
            </span>
            <span className="px-2.5 py-1 rounded bg-[#232529] text-[11px] font-medium text-white/80">
              Visa / Mastercard
            </span>
            <span className="px-2.5 py-1 rounded bg-[#232529] text-[11px] font-medium text-white/80">
              Amex
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#9a9da3]">
            <span>© 2026 PASAAVA. Engineered Men's Jewellery. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
