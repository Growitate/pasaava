import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Shield
} from 'lucide-react';
import { AnnouncementBar } from './AnnouncementBar';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface NavbarProps {
  onOpenSearch: () => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  currentPath,
  onNavigate
}) => {
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const [collectionsHover, setCollectionsHover] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
      const heroThreshold = Math.max(380, window.innerHeight * 0.65);
      setIsPastHero(scrollY > heroThreshold);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open to fix sidebar fixing and background scroll issues
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  const cleanCurrentPath = (currentPath || '/').replace(/^#/, '').split('?')[0].split('#')[0] || '/';
  const isHome = cleanCurrentPath === '/' || cleanCurrentPath === '' || cleanCurrentPath === '/home';
  const isOverHero = isHome && !isPastHero;

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    setCollectionsHover(false);
    onNavigate(path);
  };

  return (
    <>
      {/* 1. Announcement Bar (36px, #000 bg, white text, rotating) */}
      <AnnouncementBar />

      {/* 2. Desktop Navigation Header (Floating Half-Cut Dark Bar) */}
      <div
        className={`hidden md:block fixed left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 max-w-[1400px] mx-auto z-40 transition-all duration-300 ${isScrolled ? 'top-3' : 'top-[44px]'
          }`}
      >
        <header
          className={`w-full h-[58px] lg:h-[62px] px-6 lg:px-8 rounded-[6px] transition-all duration-300 flex items-center justify-between text-white select-none ${isOverHero
              ? isScrolled
                ? 'bg-black/50 backdrop-blur-md border border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.2)]'
                : 'bg-black/35 backdrop-blur-md border border-white/15 shadow-none'
              : isScrolled
                ? 'bg-black/75 backdrop-blur-md border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.25)]'
                : 'bg-black/70 backdrop-blur-md border border-white/15 shadow-[0_6px_24px_rgba(0,0,0,0.2)]'
            }`}
        >
          {/* Left: PASAAVA Logo */}
          <div className="flex-1 flex items-center justify-start">
            <button
              onClick={() => handleNavClick('/')}
              className="inline-flex items-center justify-start hover:opacity-85 transition-opacity cursor-pointer select-none"
              aria-label="PASAAVA Home"
            >
              <img
                src="/images/pasaava-logo.png"
                alt="PASAAVA"
                className="h-6 sm:h-7 lg:h-7.5 w-auto max-w-[160px] object-contain brightness-0 invert"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  if (target.nextElementSibling) {
                    (target.nextElementSibling as HTMLElement).style.display = 'block';
                  }
                }}
              />
              <span
                style={{ display: 'none' }}
                className="font-sans font-bold text-lg lg:text-xl tracking-[0.22em] uppercase text-white"
              >
                PASAAVA
              </span>
            </button>
          </div>

          {/* Center: Desktop Nav Links (COLLECTIONS, ABOUT, CONTACT) */}
          <nav className="flex items-center space-x-6 lg:space-x-8">
            {/* Collections Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCollectionsHover(true)}
              onMouseLeave={() => setCollectionsHover(false)}
            >
              <button
                onClick={() => handleNavClick('/shop')}
                className={`py-1 flex items-center gap-1.5 cursor-pointer uppercase text-[11.5px] lg:text-[12px] font-semibold tracking-[0.1em] transition-colors ${currentPath.includes('category') || currentPath === '/shop'
                  ? 'text-white'
                  : 'text-white/85 hover:text-white'
                  }`}
              >
                <span>Collections</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${collectionsHover ? 'rotate-180' : ''
                    }`}
                />
              </button>

              <AnimatePresence>
                {collectionsHover && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[440px] bg-black/85 backdrop-blur-xl border border-white/15 text-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-5 grid grid-cols-2 gap-4 mt-3 z-50"
                  >
                    <div>
                      <h4 className="text-[11px] uppercase tracking-wider text-white font-semibold mb-2.5 px-2 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-white" />
                        <span>Core Categories</span>
                      </h4>
                      <ul className="space-y-1">
                        <li>
                          <button
                            onClick={() => handleNavClick('/shop')}
                            className="w-full text-left px-2 py-1.5 text-xs text-white hover:bg-white/10 rounded-lg font-medium transition-colors cursor-pointer"
                          >
                            All Men's Jewelry
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleNavClick('/category/chains')}
                            className="w-full text-left px-2 py-1.5 text-xs text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                          >
                            Chains
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleNavClick('/category/neck-chains')}
                            className="w-full text-left px-2 py-1.5 text-xs text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                          >
                            Neck Chains
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleNavClick('/category/bracelets')}
                            className="w-full text-left px-2 py-1.5 text-xs text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                          >
                            Bracelets
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleNavClick('/category/rings')}
                            className="w-full text-left px-2 py-1.5 text-xs text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                          >
                            Rings
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleNavClick('/category/earrings')}
                            className="w-full text-left px-2 py-1.5 text-xs text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                          >
                            Earrings
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleNavClick('/category/pendants')}
                            className="w-full text-left px-2 py-1.5 text-xs text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                          >
                            Pendants
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[11px] uppercase tracking-wider text-white/60 font-semibold mb-2.5 px-2 flex items-center gap-1.5">
                        <Shield className="w-3 h-3 text-white" />
                        <span>Curations</span>
                      </h4>
                      <ul className="space-y-1">
                        <li>
                          <button
                            onClick={() => handleNavClick('/men-category/men-bestsellers')}
                            className="w-full text-left px-2 py-1.5 text-xs text-white hover:bg-white/10 rounded-lg font-medium transition-colors cursor-pointer"
                          >
                            Best Sellers
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleNavClick('/men-category/men-newarrivals')}
                            className="w-full text-left px-2 py-1.5 text-xs text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                          >
                            New Releases
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleNavClick('/men-category/men-onsale')}
                            className="w-full text-left px-2 py-1.5 text-xs text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                          >
                            Archive & Sale
                          </button>
                        </li>
                      </ul>

                      <div className="mt-4 p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-white/70 leading-snug">
                        <strong className="text-white block mb-0.5 font-medium">316L Surgical Steel</strong>
                        100% Waterproof & Gym Safe
                      </div>
                    </div>

                    <div className="col-span-2 pt-2 border-t border-white/10 flex items-center justify-between text-xs font-medium">
                      <button
                        onClick={() => handleNavClick('/shop')}
                        className="text-white hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <span>View Full Catalog</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                      <span className="text-white/50">25 Signature Pieces</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About */}
            <button
              onClick={() => handleNavClick('/about')}
              className={`cursor-pointer uppercase text-[11.5px] lg:text-[12px] font-semibold tracking-[0.1em] transition-colors ${currentPath === '/about'
                ? 'text-white'
                : 'text-white/85 hover:text-white'
                }`}
            >
              About
            </button>

            {/* Contact */}
            <button
              onClick={() => handleNavClick('/contact')}
              className={`cursor-pointer uppercase text-[11.5px] lg:text-[12px] font-semibold tracking-[0.1em] transition-colors ${currentPath === '/contact'
                ? 'text-white'
                : 'text-white/85 hover:text-white'
                }`}
            >
              Contact
            </button>
          </nav>

          {/* Right: Desktop Icons (Search, Heart, Cart, User) */}
          <div className="flex-1 flex items-center justify-end gap-4 lg:gap-5 text-white">
            {/* Search */}
            <button
              onClick={onOpenSearch}
              aria-label="Search"
              className="flex items-center justify-center p-1.5 text-white hover:text-white/75 transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" strokeWidth={1.75} />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => handleNavClick('/favourite')}
              aria-label="Wishlist"
              className="relative flex items-center justify-center p-1.5 text-white hover:text-white/75 transition-colors cursor-pointer"
            >
              <Heart className="w-5 h-5" strokeWidth={1.75} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full text-[10px] font-bold bg-white text-[#111111] shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Bag"
              className="relative flex items-center justify-center p-1.5 text-white hover:text-white/75 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.75} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full text-[10px] font-bold bg-white text-[#111111] shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User */}
            <button
              onClick={() => handleNavClick('/contact')}
              aria-label="User Account"
              className="flex items-center justify-center p-1.5 text-white hover:text-white/75 transition-colors cursor-pointer"
            >
              <User className="w-5 h-5" strokeWidth={1.75} />
            </button>
          </div>
        </header>
      </div>

      {/* 3. Mobile Floating Half-Cut Pill Header */}
      <div
        className={`md:hidden fixed left-[12px] right-[12px] z-40 h-[52px] rounded-[6px] px-3.5 flex items-center justify-between text-white select-none transition-all duration-300 ${isScrolled ? 'top-3' : 'top-[44px]'
          } ${isOverHero
            ? isScrolled
              ? 'bg-black/50 backdrop-blur-md border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.2)]'
              : 'bg-black/35 backdrop-blur-md border border-white/15 shadow-none'
            : isScrolled
              ? 'bg-black/75 backdrop-blur-md border border-white/15 shadow-[0_6px_20px_rgba(0,0,0,0.25)]'
              : 'bg-black/70 backdrop-blur-md border border-white/15 shadow-[0_4px_14px_rgba(0,0,0,0.2)]'
          }`}
      >
        {/* Left: Hamburger + Search */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            className="p-1 hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center"
          >
            <Menu className="w-5 h-5 text-white" strokeWidth={2} />
          </button>

          <button
            onClick={onOpenSearch}
            aria-label="Search"
            className="p-1 hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center"
          >
            <Search className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
        </div>

        {/* Center: PASAAVA Logo */}
        <button
          onClick={() => handleNavClick('/')}
          className="flex items-center justify-center hover:opacity-85 transition-opacity cursor-pointer select-none"
          aria-label="PASAAVA Home"
        >
          <img
            src="/images/pasaava-logo.png"
            alt="PASAAVA"
            className="h-5 sm:h-5.5 w-auto max-w-[130px] object-contain brightness-0 invert"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              if (target.nextElementSibling) {
                (target.nextElementSibling as HTMLElement).style.display = 'block';
              }
            }}
          />
          <span
            style={{ display: 'none' }}
            className="font-sans font-bold text-[15px] sm:text-[16px] tracking-[0.22em] uppercase text-white leading-none"
          >
            PASAAVA
          </span>
        </button>

        {/* Right: Wishlist + Cart */}
        <div className="flex items-center gap-3">
          {/* Wishlist */}
          <button
            onClick={() => handleNavClick('/favourite')}
            aria-label="Wishlist"
            className="relative p-1 hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center"
          >
            <Heart className="w-5 h-5 text-white" strokeWidth={2} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full text-[10px] font-bold bg-white text-[#111111] shadow-xs">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Cart"
            className="relative p-1 hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center"
          >
            <ShoppingBag className="w-5 h-5 text-white" strokeWidth={2} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full text-[10px] font-bold bg-white text-[#111111] shadow-xs">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 4. Mobile Slide-in Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-[320px] sm:max-w-[340px] h-full h-[100dvh] max-h-screen bg-white text-[#111111] z-[70] flex flex-col shadow-2xl md:hidden border-r border-[#E5E5E5] overscroll-contain"
            >
              {/* Row 1: HOME + Close Button (Matches reference Image 2 exactly) */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#EBEBEB] bg-white flex-shrink-0">
                <button
                  onClick={() => handleNavClick('/')}
                  className="font-bold text-sm uppercase tracking-wider text-[#111111] hover:text-[#6B6B6B] transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 -mr-1 text-[#111111] hover:text-[#6B6B6B] transition-colors cursor-pointer flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 stroke-[2]" />
                </button>
              </div>

              {/* Navigation Items (Full-width rows with divider borders matching Image 2) */}
              <div className="flex-1 overflow-y-auto">
                {/* Collections with Dropdown */}
                <div className="border-b border-[#EBEBEB]">
                  <button
                    onClick={() => setMobileCollectionsOpen((prev) => !prev)}
                    className="w-full text-left px-6 py-4 text-sm font-bold uppercase tracking-wider text-[#111111] hover:bg-[#FAFAFA] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>Collections</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#111111] transition-transform duration-200 ${mobileCollectionsOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileCollectionsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden bg-[#FAFAFA] border-t border-[#EBEBEB]"
                      >
                        <button
                          onClick={() => handleNavClick('/shop')}
                          className="w-full text-left py-3 px-8 text-xs font-semibold uppercase tracking-wider text-[#111111] hover:bg-[#F0F0F0] transition-colors flex items-center justify-between cursor-pointer border-b border-[#EBEBEB]/60"
                        >
                          <span>All Collections</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#6B6B6B]" />
                        </button>

                        <button
                          onClick={() => handleNavClick('/category/chains')}
                          className="w-full text-left py-3 px-8 text-xs font-medium uppercase tracking-wider text-[#444444] hover:text-[#111111] hover:bg-[#F0F0F0] transition-colors flex items-center justify-between cursor-pointer border-b border-[#EBEBEB]/60"
                        >
                          <span>Chains</span>
                        </button>

                        <button
                          onClick={() => handleNavClick('/category/neck-chains')}
                          className="w-full text-left py-3 px-8 text-xs font-medium uppercase tracking-wider text-[#444444] hover:text-[#111111] hover:bg-[#F0F0F0] transition-colors flex items-center justify-between cursor-pointer border-b border-[#EBEBEB]/60"
                        >
                          <span>Neck Chains</span>
                        </button>

                        <button
                          onClick={() => handleNavClick('/category/bracelets')}
                          className="w-full text-left py-3 px-8 text-xs font-medium uppercase tracking-wider text-[#444444] hover:text-[#111111] hover:bg-[#F0F0F0] transition-colors flex items-center justify-between cursor-pointer border-b border-[#EBEBEB]/60"
                        >
                          <span>Bracelets</span>
                        </button>

                        <button
                          onClick={() => handleNavClick('/category/rings')}
                          className="w-full text-left py-3 px-8 text-xs font-medium uppercase tracking-wider text-[#444444] hover:text-[#111111] hover:bg-[#F0F0F0] transition-colors flex items-center justify-between cursor-pointer border-b border-[#EBEBEB]/60"
                        >
                          <span>Rings</span>
                        </button>

                        <button
                          onClick={() => handleNavClick('/category/earrings')}
                          className="w-full text-left py-3 px-8 text-xs font-medium uppercase tracking-wider text-[#444444] hover:text-[#111111] hover:bg-[#F0F0F0] transition-colors flex items-center justify-between cursor-pointer border-b border-[#EBEBEB]/60"
                        >
                          <span>Earrings</span>
                        </button>

                        <button
                          onClick={() => handleNavClick('/category/pendants')}
                          className="w-full text-left py-3 px-8 text-xs font-medium uppercase tracking-wider text-[#444444] hover:text-[#111111] hover:bg-[#F0F0F0] transition-colors flex items-center justify-between cursor-pointer border-b border-[#EBEBEB]/60"
                        >
                          <span>Pendants</span>
                        </button>

                        <button
                          onClick={() => handleNavClick('/category/bestsellers')}
                          className="w-full text-left py-3 px-8 text-xs font-medium uppercase tracking-wider text-[#111111] hover:bg-[#F0F0F0] transition-colors flex items-center justify-between cursor-pointer"
                        >
                          <span className="font-semibold">★ Best Sellers</span>
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#111111] text-white">Popular</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* About */}
                <div className="border-b border-[#EBEBEB]">
                  <button
                    onClick={() => handleNavClick('/about')}
                    className="w-full text-left px-6 py-4 text-sm font-bold uppercase tracking-wider text-[#111111] hover:bg-[#FAFAFA] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>About</span>
                  </button>
                </div>

                {/* Contact */}
                <div className="border-b border-[#EBEBEB]">
                  <button
                    onClick={() => handleNavClick('/contact')}
                    className="w-full text-left px-6 py-4 text-sm font-bold uppercase tracking-wider text-[#111111] hover:bg-[#FAFAFA] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>Contact</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
