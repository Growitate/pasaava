import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CurrencyProvider } from './context/CurrencyContext';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
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
import { NotFoundPage } from './pages/NotFoundPage';

import { Product } from './types';

export const AppContent: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const hash = window.location.hash.replace(/^#/, '');
    return hash || '/';
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync with browser hash changes
  useEffect(() => {
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

  // Render Page Content based on currentPath
  const renderPage = () => {
    // 1. Home
    if (currentPath === '/' || currentPath === '') {
      return (
        <HomePage
          onQuickView={(p) => setQuickViewProduct(p)}
          onNavigate={navigate}
        />
      );
    }

    // 2. Shop
    if (currentPath === '/shop') {
      return (
        <ShopPage
          onQuickView={(p) => setQuickViewProduct(p)}
          onNavigate={navigate}
        />
      );
    }

    // 3. Product Detail Page: /product/:slug
    if (currentPath.startsWith('/product/')) {
      const slug = currentPath.replace('/product/', '');
      return (
        <ProductDetailPage
          slug={slug}
          onQuickView={(p) => setQuickViewProduct(p)}
          onNavigate={navigate}
        />
      );
    }

    // 4. Men's Category & Subcategories
    if (currentPath === '/men-category' || currentPath === '/women-category') {
      return (
        <CategoryPage
          gender="men"
          onQuickView={(p) => setQuickViewProduct(p)}
          onNavigate={navigate}
        />
      );
    }
    if (currentPath.startsWith('/men-category/')) {
      const sub = currentPath.replace('/men-category/men-', '').replace('/men-category/', '');
      return (
        <CategoryPage
          gender="men"
          subcategory={sub}
          onQuickView={(p) => setQuickViewProduct(p)}
          onNavigate={navigate}
        />
      );
    }
    if (currentPath.startsWith('/women-category/')) {
      const sub = currentPath.replace('/women-category/women-', '').replace('/women-category/', '');
      return (
        <CategoryPage
          gender="men"
          subcategory={sub}
          onQuickView={(p) => setQuickViewProduct(p)}
          onNavigate={navigate}
        />
      );
    }

    // 5. About
    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }

    // 6. Journals Listing & Detail
    if (currentPath === '/journals') {
      return <JournalsPage onNavigate={navigate} />;
    }
    if (currentPath.startsWith('/journals/')) {
      const slug = currentPath.replace('/journals/', '');
      return <JournalDetailPage slug={slug} onNavigate={navigate} />;
    }

    // 7. Contact
    if (currentPath === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }

    // 8. Favourites
    if (currentPath === '/favourite') {
      return (
        <FavouritePage
          onQuickView={(p) => setQuickViewProduct(p)}
          onNavigate={navigate}
        />
      );
    }

    // 9. Legal Pages
    if (currentPath === '/terms') {
      return <LegalPage type="terms" onNavigate={navigate} />;
    }
    if (currentPath === '/privacy-policy') {
      return <LegalPage type="privacy" onNavigate={navigate} />;
    }
    if (currentPath === '/refund-policy') {
      return <LegalPage type="refund" onNavigate={navigate} />;
    }

    // 10. 404
    return <NotFoundPage onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f8f6f3] text-[#1c1c1a] antialiased">
      {/* Navigation */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        currentPath={currentPath}
        onNavigate={navigate}
      />

      {/* Main Content */}
      <main className="flex-1">{renderPage()}</main>

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
          <AppContent />
        </CartProvider>
      </WishlistProvider>
    </CurrencyProvider>
  );
}

export default App;
