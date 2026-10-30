import React, { useEffect } from 'react';
import { useAdminAuth } from './context/AdminAuthContext';
import { AdminLayout } from './components/AdminLayout';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminProductsPage } from './pages/AdminProductsPage';
import { AdminCategoriesPage } from './pages/AdminCategoriesPage';
import { AdminOrdersPage } from './pages/AdminOrdersPage';
import { AdminReviewsPage } from './pages/AdminReviewsPage';
import { AdminHomepagePage } from './pages/AdminHomepagePage';
import { AdminSettingsPage } from './pages/AdminSettingsPage';
import { seoService } from '../services/seoService';

interface AdminRootProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const AdminRoot: React.FC<AdminRootProps> = ({ currentPath, onNavigate }) => {
  const { isAuthenticated } = useAdminAuth();

  useEffect(() => {
    seoService.applyMeta({
      title: 'PASAAVA Admin Control Panel',
      noindex: true
    });
  }, []);

  // If path is specifically /admin/login
  if (currentPath === '/admin/login' || currentPath === '/admin/login/') {
    return <AdminLoginPage onNavigate={onNavigate} />;
  }

  // If user is not authenticated, show login page directly
  if (!isAuthenticated) {
    return <AdminLoginPage onNavigate={onNavigate} />;
  }

  const renderAdminPage = () => {
    const lower = currentPath.toLowerCase();

    if (lower.startsWith('/admin/products')) {
      return <AdminProductsPage onNavigate={onNavigate} />;
    }
    if (lower.startsWith('/admin/categories')) {
      return <AdminCategoriesPage onNavigate={onNavigate} />;
    }
    if (lower.startsWith('/admin/orders')) {
      return <AdminOrdersPage onNavigate={onNavigate} />;
    }
    if (lower.startsWith('/admin/reviews')) {
      return <AdminReviewsPage onNavigate={onNavigate} />;
    }
    if (lower.startsWith('/admin/homepage')) {
      return <AdminHomepagePage onNavigate={onNavigate} />;
    }
    if (lower.startsWith('/admin/settings')) {
      return <AdminSettingsPage onNavigate={onNavigate} />;
    }

    // Default: Dashboard (/admin or /admin/dashboard)
    return <AdminDashboardPage onNavigate={onNavigate} />;
  };

  return (
    <AdminLayout currentPath={currentPath} onNavigate={onNavigate}>
      {renderAdminPage()}
    </AdminLayout>
  );
};
