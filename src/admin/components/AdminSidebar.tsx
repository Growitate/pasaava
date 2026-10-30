import React from 'react';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Star,
  Film,
  Settings,
  ExternalLink,
  LogOut,
  X
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

interface AdminSidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentPath,
  onNavigate,
  isOpenMobile,
  onCloseMobile
}) => {
  const { logout } = useAdminAuth();

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Categories', path: '/admin/categories', icon: Layers },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Reviews', path: '/admin/reviews', icon: Star },
    { label: 'Homepage & Hero', path: '/admin/homepage', icon: Film },
    { label: 'Settings & Backup', path: '/admin/settings', icon: Settings }
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    onCloseMobile();
  };

  const handleLogout = () => {
    logout();
    onNavigate('/admin/login');
  };

  const normalizedPath =
    currentPath === '/admin' || currentPath === '/admin/' ? '/admin/dashboard' : currentPath;

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-white border-r border-[#EBEBEB] text-[#111111]">
      {/* Brand Header */}
      <div>
        <div className="h-16 px-6 flex items-center justify-between border-b border-[#EBEBEB]">
          <div className="flex items-center gap-2.5">
            <span className="text-xl font-black tracking-[0.2em] text-[#111111]">PASAAVA</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black text-white">
              ADMIN
            </span>
          </div>
          {/* Mobile close button */}
          <button
            onClick={onCloseMobile}
            className="md:hidden text-gray-500 hover:text-black p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Store Management
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              normalizedPath === item.path ||
              (item.path !== '/admin/dashboard' && normalizedPath.startsWith(item.path));

            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#111111] text-white shadow-sm font-bold'
                    : 'text-[#444444] hover:bg-[#F5F5F5] hover:text-[#111111]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#666666]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / Storefront Link & Logout */}
      <div className="p-4 border-t border-[#EBEBEB] space-y-2">
        <button
          onClick={() => onNavigate('/')}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#444444] hover:bg-[#F5F5F5] hover:text-[#111111] transition-all cursor-pointer border border-[#EAEAEA]"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
            <span>Live Storefront</span>
          </span>
          <span className="text-[10px] text-gray-400">View</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 h-screen sticky top-0 flex-shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[85%] h-full bg-white z-10 shadow-xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
