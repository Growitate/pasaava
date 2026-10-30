import React from 'react';
import { Menu, ExternalLink, IndianRupee, Bell, ShieldCheck } from 'lucide-react';
import { storageService } from '../../services/storageService';

interface AdminHeaderProps {
  currentPath: string;
  onOpenMobileMenu: () => void;
  onNavigate: (path: string) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  currentPath,
  onOpenMobileMenu,
  onNavigate
}) => {
  const productsCount = storageService.getProducts().length;
  const pendingReviewsCount = storageService.getReviews().filter((r) => r.status === 'pending').length;

  const getPageTitle = () => {
    const lower = currentPath.toLowerCase();
    if (lower.includes('/admin/products')) return 'Product Management';
    if (lower.includes('/admin/categories')) return 'Category Management';
    if (lower.includes('/admin/orders')) return 'Customer Orders';
    if (lower.includes('/admin/reviews')) return 'Product Reviews';
    if (lower.includes('/admin/homepage')) return 'Homepage & Hero Banner';
    if (lower.includes('/admin/settings')) return 'Settings & Backups';
    return 'Store Overview & Analytics';
  };

  return (
    <header className="h-16 bg-white border-b border-[#EBEBEB] px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-20 select-none">
      {/* Left side: Hamburger + Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-sm sm:text-base font-bold text-[#111111]">{getPageTitle()}</h1>
          <p className="text-[11px] text-gray-500 hidden sm:block">
            PASAAVA Luxury Men's Atelier • Live Control
          </p>
        </div>
      </div>

      {/* Right side: Currency, Live Store, Pending alerts */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Currency Pill */}
        <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <IndianRupee className="w-3.5 h-3.5" />
          <span>INR Store</span>
        </div>

        {/* Pending Reviews alert */}
        {pendingReviewsCount > 0 && (
          <button
            onClick={() => onNavigate('/admin/reviews')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold hover:bg-amber-100 transition-colors cursor-pointer"
          >
            <Bell className="w-3.5 h-3.5 text-amber-600" />
            <span>{pendingReviewsCount} Review{pendingReviewsCount === 1 ? '' : 's'} Pending</span>
          </button>
        )}

        {/* View Storefront button */}
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Storefront</span>
        </button>

        {/* Admin Badge */}
        <div className="flex items-center gap-1.5 pl-2 border-l border-gray-200 text-xs text-gray-600">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="hidden md:inline font-medium">Session Active</span>
        </div>
      </div>
    </header>
  );
};
