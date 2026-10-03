import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Shield
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface NavbarProps {
  onOpenSearch: () => void;
  currentPath: string;
  onNavigate: (path: string) => void;
  isHeroOverlay?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  currentPath,
  onNavigate,
  isHeroOverlay = false
}) => {
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsHover, setCollectionsHover] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkNav = !isScrolled && (currentPath === '/' || currentPath === '');

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    setCollectionsHover(false);
    onNavigate(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-dark-nav py-3.5 shadow-lg'
            : isDarkNav
            ? 'bg-transparent py-5 sm:py-6 text-white'
            : 'glass-dark-nav py-4 text-white'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Left Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-normal text-white/90">
            {/* Collections Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCollectionsHover(true)}
              onMouseLeave={() => setCollectionsHover(false)}
            >
              <button
                onClick={() => handleNavClick('/shop')}
                className="hover:text-white transition-colors py-1 flex items-center gap-1 cursor-pointer tracking-wider font-medium text-xs uppercase"
              >
                <span>Collections</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${collectionsHover ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {collectionsHover && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 w-[440px] bg-[#16181c] text-white rounded-2xl shadow-2xl border border-white/10 p-5 grid grid-cols-2 gap-4 mt-2 z-50 backdrop-blur-xl"
                  >
                    <div>
                      <h4 className="text-[11px] uppercase tracking-wider text-[#b9836a] font-semibold mb-2.5 px-2 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        <span>Core Categories</span>
                      </h4>
                      <ul className="space-y-1">
                        <li>
                          <button
                            onClick={() => handleNavClick('/shop')}
                            className="w-full text-left px-2 py-1.5 text-xs text-white hover:bg-white/10 rounded-lg font-medium transition-colors"
                          >
                            All Men's Jewelry
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleNavClick('/men-category/men-chain')}
                            className="w-full text-left px-2 py-1.5 text-xs text-white/80 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            Neck Chains & Pendants
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleNavClick('/men-category/men-bracelet')}
                            className="w-full text-left px-2 py-1.5 text-xs text-white/80 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            Bracelets & Cuffs
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleNavClick('/men-category/men-ring')}
                            className="w-full text-left px-2 py-1.5 text-xs text-white/80 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            Rings & Signets
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleNavClick('/men-category/men-earring')}
                            className="w-full text-left px-2 py-1.5 text-xs text-white/80 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            Earrings & Studs
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[11px] uppercase tracking-wider text-white/50 font-semibold mb-2.5 px-2 flex items-center gap-1.5">
                        <Shield className="w-3 h-3 text-[#b9836a]" />
                        <span>Curations</span>
                      </h4>
                      <ul className="space-y-1">
                        <li>
                          <button
                            onClick={() => handleNavClick('/men-category/men-bestsellers')}
                            className="w-full text-left px-2 py-1.5 text-xs text-white hover:bg-white/10 rounded-lg font-medium transition-colors"
                          >
                            Best Sellers
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleNavClick('/men-category/men-newarrivals')}
                            className="w-full text-left px-2 py-1.5 text-xs text-white/80 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            New Releases
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleNavClick('/men-category/men-onsale')}
                            className="w-full text-left px-2 py-1.5 text-xs text-white/80 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            Archive & Sale
                          </button>
                        </li>
                      </ul>

                      <div className="mt-4 p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-white/70 leading-snug">
                        <strong className="text-white block mb-0.5">316L Surgical Steel</strong>
                        100% Waterproof & Gym Proof
                      </div>
                    </div>

                    <div className="col-span-2 pt-2 border-t border-white/10 flex items-center justify-between text-xs font-medium">
                      <button
                        onClick={() => handleNavClick('/shop')}
                        className="text-[#b9836a] hover:underline flex items-center gap-1"
                      >
                        <span>View Full Catalog</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                      <span className="text-white/40">25 Signature Pieces</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => handleNavClick('/about')}
              className="hover:text-white transition-colors cursor-pointer tracking-wider font-medium text-xs uppercase text-white/80"
            >
              About
            </button>

            <button
              onClick={() => handleNavClick('/contact')}
              className="hover:text-white transition-colors cursor-pointer tracking-wider font-medium text-xs uppercase text-white/80"
            >
              Contact
            </button>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-white hover:text-white/80"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Center Logo: PASAAVA */}
          <div className="flex-1 lg:flex-initial text-center">
            <button
              onClick={() => handleNavClick('/')}
              className="inline-flex items-center text-xl sm:text-2xl font-bold tracking-[0.2em] text-white hover:opacity-90 transition-opacity uppercase"
            >
              <span>PASAAVA</span>
            </button>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5 text-white">
            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              aria-label="Search"
              className="flex items-center justify-center p-1.5 text-white/90 hover:text-white transition-colors cursor-pointer"
            >
              <Search className="w-[18px] h-[18px]" strokeWidth={1.75} />
            </button>

            {/* Wishlist Icon with round badge */}
            <button
              onClick={() => handleNavClick('/favourite')}
              aria-label="Wishlist"
              className="relative flex items-center justify-center p-1.5 text-white/90 hover:text-white transition-colors cursor-pointer"
            >
              <Heart className="w-[18px] h-[18px]" strokeWidth={1.75} />
              <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-white text-[#1c1c1a] text-[10px] font-bold shadow-xs">
                {wishlist.length}
              </span>
            </button>

            {/* Cart Icon with round badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Bag"
              className="relative flex items-center justify-center p-1.5 text-white/90 hover:text-white transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.75} />
              <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-white text-[#1c1c1a] text-[10px] font-bold shadow-xs">
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-[340px] bg-[#16181c] text-white z-50 p-6 flex flex-col justify-between shadow-2xl lg:hidden border-r border-white/10"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <span className="text-xl font-bold tracking-[0.2em] text-white uppercase">
                    PASAAVA
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="py-6 space-y-3">
                  <button
                    onClick={() => handleNavClick('/shop')}
                    className="block w-full text-left py-2 text-base font-semibold text-white hover:text-[#b9836a] transition-colors"
                  >
                    All Men's Collections
                  </button>
                  <button
                    onClick={() => handleNavClick('/men-category/men-chain')}
                    className="block w-full text-left py-1.5 text-sm font-medium text-white/80 hover:text-[#b9836a] transition-colors pl-3 border-l-2 border-white/10"
                  >
                    Chains & Pendants
                  </button>
                  <button
                    onClick={() => handleNavClick('/men-category/men-bracelet')}
                    className="block w-full text-left py-1.5 text-sm font-medium text-white/80 hover:text-[#b9836a] transition-colors pl-3 border-l-2 border-white/10"
                  >
                    Bracelets & Cuffs
                  </button>
                  <button
                    onClick={() => handleNavClick('/men-category/men-ring')}
                    className="block w-full text-left py-1.5 text-sm font-medium text-white/80 hover:text-[#b9836a] transition-colors pl-3 border-l-2 border-white/10"
                  >
                    Rings & Signets
                  </button>
                  <button
                    onClick={() => handleNavClick('/men-category/men-earring')}
                    className="block w-full text-left py-1.5 text-sm font-medium text-white/80 hover:text-[#b9836a] transition-colors pl-3 border-l-2 border-white/10"
                  >
                    Earrings & Studs
                  </button>
                  <button
                    onClick={() => handleNavClick('/men-category/men-bestsellers')}
                    className="block w-full text-left py-1.5 text-sm font-medium text-[#b9836a] hover:underline pl-3 border-l-2 border-[#b9836a]/40"
                  >
                    Best Sellers
                  </button>

                  <div className="pt-4 border-t border-white/10 space-y-2">
                    <button
                      onClick={() => handleNavClick('/about')}
                      className="block w-full text-left py-1.5 text-sm text-white/70 hover:text-white transition-colors"
                    >
                      About PASAAVA
                    </button>
                    <button
                      onClick={() => handleNavClick('/contact')}
                      className="block w-full text-left py-1.5 text-sm text-white/70 hover:text-white transition-colors"
                    >
                      Contact & Concierge
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 text-xs text-white/50 text-center">
                © 2026 PASAAVA. Engineered Men's Jewellery.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
