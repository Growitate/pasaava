import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, Clock } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

interface AdminLoginPageProps {
  onNavigate: (path: string) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onNavigate }) => {
  const { login, lockoutSecondsRemaining } = useAdminAuth();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter the admin password');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Simulate minor security latency
    setTimeout(() => {
      const res = login(password);
      setIsSubmitting(false);

      if (res.success) {
        onNavigate('/admin/dashboard');
      } else {
        setError(res.error || 'Authentication failed');
      }
    }, 300);
  };

  const isLocked = lockoutSecondsRemaining > 0;

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex flex-col justify-center py-12 sm:px-6 lg:px-8 select-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* PASAAVA Brand Header */}
        <h1 className="text-3xl font-black tracking-[0.25em] text-[#111111] uppercase">
          PASAAVA
        </h1>
        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 text-[#444444] text-xs font-semibold tracking-widest uppercase">
          <ShieldCheck className="w-3.5 h-3.5 text-black" />
          Atelier Control Panel
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-sm border border-[#EBEBEB] rounded-2xl">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#111111]">Admin Sign In</h2>
            <p className="text-xs text-[#666666] mt-1">
              Enter your master store password to manage hardware inventory and orders.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {isLocked && (
            <div className="mb-5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2.5">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span>
                Security lock active. Try again in <strong>{lockoutSecondsRemaining} seconds</strong>.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-2">
                Master Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  disabled={isLocked || isSubmitting}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Enter admin password"
                  autoFocus
                  className="block w-full pl-10 pr-10 py-3 bg-[#F9F9F9] border border-[#E0E0E0] rounded-xl text-sm text-[#111111] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLocked || isSubmitting}
              className="w-full bg-[#111111] text-white py-3.5 px-4 rounded-xl font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#2b2b2b] transition-all duration-200 active:scale-[0.99] shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Unlock Admin Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#F0F0F0] text-center">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="text-xs text-[#777777] hover:text-black font-medium transition-colors cursor-pointer"
            >
              ← Return to PASAAVA Storefront
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
