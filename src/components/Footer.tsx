import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [socialLinks, setSocialLinks] = useState(() => storageService.getSettings().socialLinks);

  useEffect(() => {
    return storageService.subscribe(() => {
      setSocialLinks(storageService.getSettings().socialLinks);
    });
  }, []);

  const cleanWaNumber = (socialLinks.whatsapp || '+919876543210').replace(/[^0-9]/g, '');

  return (
    <footer className="bg-[#111111] text-white pt-16 pb-12 border-t border-[#222222] select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[#222222]">
          {/* Follow Us / Social Channels Column */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">
              Atelier Channels
            </h4>
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href={socialLinks.instagram || 'https://instagram.com/pasaava'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 inline-flex items-center justify-center rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-white/90 hover:text-white hover:bg-[#252525] hover:border-white/30 transition-all cursor-pointer group shadow-xs"
                aria-label="Instagram"
                title="Follow on Instagram"
              >
                <svg
                  className="w-[18px] h-[18px] transition-transform duration-200 group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
                </svg>
              </a>

              {/* WhatsApp Support */}
              <a
                href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
                  'Hello PASAAVA Atelier Concierge, I would like to inquire about your jewellery pieces.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 inline-flex items-center justify-center rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-white/90 hover:text-[#25D366] hover:bg-[#252525] hover:border-[#25D366]/40 transition-all cursor-pointer group shadow-xs"
                aria-label="WhatsApp Concierge"
                title="Chat on WhatsApp"
              >
                <svg
                  className="w-[18px] h-[18px] fill-current transition-transform duration-200 group-hover:scale-110"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24M8.53 7.33c-.14 0-.36.05-.54.26-.19.2-.72.71-.72 1.73s.74 2.01.85 2.15c.1.15 1.44 2.21 3.51 3.1 1.71.74 2.06.6 2.43.56.37-.03 1.2-.49 1.37-.96.17-.48.17-.89.12-.97-.05-.09-.19-.14-.39-.25s-1.2-.59-1.39-.66c-.19-.07-.33-.1-.47.1-.14.2-.54.66-.66.8-.12.14-.24.15-.45.05-.2-.1-.86-.32-1.64-1.02-.61-.54-1.02-1.21-1.14-1.42-.12-.2-.01-.31.09-.41.09-.09.2-.24.3-.36.1-.12.14-.2.2-.34.07-.14.03-.26-.02-.36-.05-.1-.47-1.14-.65-1.56-.17-.41-.35-.35-.48-.36h-.36z" />
                </svg>
              </a>

              {/* Email Concierge */}
              <a
                href={`mailto:${socialLinks.email || 'atelier@pasaava.com'}`}
                className="w-10 h-10 inline-flex items-center justify-center rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-white/90 hover:text-white hover:bg-[#252525] hover:border-white/30 transition-all cursor-pointer group shadow-xs"
                aria-label="Email Concierge"
                title="Send Email"
              >
                <svg
                  className="w-[18px] h-[18px] transition-transform duration-200 group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>
            <p className="text-[11px] text-gray-400 font-light">
              Direct atelier concierge available Mon–Sat, 10am–8pm IST.
            </p>
          </div>

          {/* About Us Column (PASAAVA Story Description) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">
              About Us
            </h4>
            <p className="text-xs sm:text-sm text-[#BDBDBD] leading-relaxed font-light">
              We didn't start as PASAAVA. We started a year earlier with a different name and different products. It taught us a lot, mostly about what was missing. We kept looking for accessories we'd actually wear and kept not finding them. Everything was either too basic or too try-hard, and nothing felt like us. So we rebuilt it from scratch, new name, new products, new everything. When "PASAAVA" came up, it just clicked. Today PASAAVA is a brand built by two guys who got tired of searching and decided to make it themselves. It's made for people who want to look good without trying too hard.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#BDBDBD]">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/collections')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Policies Column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">
              Policies
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#BDBDBD]">
              <li>
                <button
                  onClick={() => onNavigate('/privacy-policy')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/terms-of-service')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Terms of service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/shipping-policy')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Shipping Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/returns-exchange-policy')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Returns &amp; Exchange Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/refund-policy')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Refund Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/warranty-policy')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Warranty Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E8E8E]">
          <span>© 2026 PASAAVA. Engineered Men's Jewellery. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};
