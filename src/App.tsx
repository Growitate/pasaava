import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import { AdminRoot } from './admin/AdminRoot';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TrustStrip } from './components/TrustStrip';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CategoryPage } from './pages/CategoryPage';
import { AboutPage } from './pages/AboutPage';
import { JournalsPage } from './pages/JournalsPage';
import { JournalDetailPage } from './pages/JournalDetailPage';
import { ContactPage } from './pages/ContactPage';
import { FavouritePage } from './pages/FavouritePage';
import { LegalPage } from './pages/LegalPage';
import { PublicReviewPage } from './pages/PublicReviewPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { Product } from './types';

export const AppContent: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash) return hash;
    if (window.location.pathname && window.location.pathname !== '/') {
      return window.location.pathname;
    }
    return '/';
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync with browser hash changes and initial pathname
  useEffect(() => {
    // If user loaded the page with a pathname (e.g. /admin) and no hash, sync the hash
    if (!window.location.hash && window.location.pathname && window.location.pathname !== '/') {
      window.location.hash = `#${window.location.pathname}`;
    }

    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      setCurrentPath(hash || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = `#${path}`;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Page Content based on currentPath with robust normalization
  const renderPage = () => {
    // Clean & normalize path (strip query params, trailing slashes, hashes)
    const raw = (currentPath || '/').trim();
    const withoutQuery = raw.split('?')[0].split('#')[0];
    const cleanPath = withoutQuery.replace(/\/+$/, '') || '/';
    const lowerPath = cleanPath.toLowerCase();

    // 1. Home
    if (lowerPath === '/' || lowerPath === '' || lowerPath === '/home') {
      return (
        <HomePage
          onQuickView={(p) => setQuickViewProduct(p)}
          onNavigate={navigate}
        />
      );
    }

    // 2. Shop / Collections / Catalog / All Pieces
    if (
      lowerPath === '/shop' ||
      lowerPath === '/collections' ||
      lowerPath === '/collection' ||
      lowerPath === '/catalog' ||
      lowerPath === '/all' ||
      lowerPath === '/all-pieces' ||
      lowerPath === '/products' ||
      lowerPath === '/collections/all'
    ) {
      return (
        <ShopPage
          onQuickView={(p) => setQuickViewProduct(p)}
          onNavigate={navigate}
        />
      );
    }

    // 3. Product Detail Page: /product/:slug, /products/:slug, /p/:slug
    if (
      lowerPath.startsWith('/product/') ||
      lowerPath.startsWith('/products/') ||
      lowerPath.startsWith('/p/')
    ) {
      const slug = cleanPath
        .replace(/^\/(product|products|p)\/+/i, '')
        .replace(/^\/(product|products|p)\/+/i, '')
        .replace(/^\/+|\/+$/g, '');
      return (
        <ProductDetailPage
          slug={slug}
          onQuickView={(p) => setQuickViewProduct(p)}
          onNavigate={navigate}
        />
      );
    }

    // 4. Categories & Subcategories (/men-category, /women-category, /category, /categories, /collections/:sub)
    if (
      lowerPath === '/men-category' ||
      lowerPath === '/women-category' ||
      lowerPath === '/category' ||
      lowerPath === '/categories'
    ) {
      return (
        <CategoryPage
          gender="men"
          onQuickView={(p) => setQuickViewProduct(p)}
          onNavigate={navigate}
        />
      );
    }

    if (
      lowerPath.startsWith('/men-category/') ||
      lowerPath.startsWith('/women-category/') ||
      lowerPath.startsWith('/category/') ||
      lowerPath.startsWith('/categories/') ||
      lowerPath.startsWith('/collections/')
    ) {
      const sub = cleanPath
        .replace(/^\/(men-category|women-category|category|categories|collections)\//i, '')
        .replace(/^(men-|women-)/i, '');

      return (
        <CategoryPage
          gender="men"
          subcategory={sub}
          onQuickView={(p) => setQuickViewProduct(p)}
          onNavigate={navigate}
        />
      );
    }

    // 5. About / Story
    if (
      lowerPath === '/about' ||
      lowerPath === '/about-us' ||
      lowerPath === '/story' ||
      lowerPath === '/our-story'
    ) {
      return <AboutPage onNavigate={navigate} />;
    }

    // 6. Journals / Blog
    if (
      lowerPath === '/journals' ||
      lowerPath === '/journal' ||
      lowerPath === '/blog' ||
      lowerPath === '/news'
    ) {
      return <JournalsPage onNavigate={navigate} />;
    }
    if (
      lowerPath.startsWith('/journals/') ||
      lowerPath.startsWith('/journal/') ||
      lowerPath.startsWith('/blog/')
    ) {
      const slug = cleanPath.replace(/^\/(journals|journal|blog)\//i, '');
      return <JournalDetailPage slug={slug} onNavigate={navigate} />;
    }

    // 7. Contact / Help / Support
    if (
      lowerPath === '/contact' ||
      lowerPath === '/contact-us' ||
      lowerPath === '/support' ||
      lowerPath === '/help'
    ) {
      return <ContactPage onNavigate={navigate} />;
    }

    // 8. Favourites / Wishlist
    if (
      lowerPath === '/favourite' ||
      lowerPath === '/favourites' ||
      lowerPath === '/wishlist'
    ) {
      return (
        <FavouritePage
          onQuickView={(p) => setQuickViewProduct(p)}
          onNavigate={navigate}
        />
      );
    }

    // 9. Legal Pages
    if (
      lowerPath === '/terms' ||
      lowerPath === '/terms-of-service' ||
      lowerPath === '/terms-and-conditions'
    ) {
      return <LegalPage type="terms" onNavigate={navigate} />;
    }
    if (lowerPath === '/privacy' || lowerPath === '/privacy-policy') {
      return <LegalPage type="privacy" onNavigate={navigate} />;
    }
    if (
      lowerPath === '/shipping' ||
      lowerPath === '/shipping-policy' ||
      lowerPath === '/shipping-info'
    ) {
      return <LegalPage type="shipping" onNavigate={navigate} />;
    }
    if (
      lowerPath === '/returns' ||
      lowerPath === '/returns-policy' ||
      lowerPath === '/returns-exchange' ||
      lowerPath === '/returns-exchange-policy' ||
      lowerPath === '/returns-and-exchange-policy' ||
      lowerPath === '/returns-and-exchanges'
    ) {
      return <LegalPage type="returns" onNavigate={navigate} />;
    }
    if (
      lowerPath === '/refund' ||
      lowerPath === '/refund-policy' ||
      lowerPath === '/refunds'
    ) {
      return <LegalPage type="refund" onNavigate={navigate} />;
    }
    if (
      lowerPath === '/warranty' ||
      lowerPath === '/warranty-policy' ||
      lowerPath === '/guarantee'
    ) {
      return <LegalPage type="warranty" onNavigate={navigate} />;
    }

    // Review Token submission page (/review/:token)
    if (lowerPath.startsWith('/review/')) {
      const token = cleanPath.replace(/^\/review\//i, '').trim();
      return <PublicReviewPage token={token} onNavigate={navigate} />;
    }

    // 10. Direct Product slug check fallback (e.g. #/spikeball-pearl-chain)
    const directSlug = cleanPath.replace(/^\//, '');
    if (directSlug) {
      return (
        <ProductDetailPage
          slug={directSlug}
          onQuickView={(p) => setQuickViewProduct(p)}
          onNavigate={navigate}
        />
      );
    }

    // 11. 404 Fallback
    return <NotFoundPage onNavigate={navigate} />;
  };

  // Dedicated Admin Panel Routing (no storefront header/footer/trust strip)
  if (currentPath.startsWith('/admin')) {
    return <AdminRoot currentPath={currentPath} onNavigate={navigate} />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-[#111111] antialiased">
      {/* Navigation */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        currentPath={currentPath}
        onNavigate={navigate}
      />

      {/* Main Content */}
      <main className="flex-1">{renderPage()}</main>

      {/* Trust Strip */}
      <TrustStrip />

      {/* Footer */}
      <Footer onNavigate={navigate} />

      {/* Global Modals & Drawers */}
      <CartDrawer onNavigate={navigate} />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigate}
      />
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onNavigate={navigate}
      />
    </div>
  );
};

export function App() {
  return (
    <CurrencyProvider>
      <WishlistProvider>
        <CartProvider>
          <AdminAuthProvider>
            <AppContent />
          </AdminAuthProvider>
        </CartProvider>
      </WishlistProvider>
    </CurrencyProvider>
  );
}

export default App;
