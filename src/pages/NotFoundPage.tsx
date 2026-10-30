import React, { useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { seoService } from '../services/seoService';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    seoService.applyMeta({
      title: '404 - Page Not Found | PASAAVA',
      noindex: true
    });
  }, []);

  return (
    <div className="pt-32 pb-24 sm:py-36 bg-white text-center">
      <div className="max-w-md mx-auto px-4 space-y-6">
        <h1 className="font-serif text-5xl sm:text-6xl font-normal text-[#111111]">
          Page Not Found
        </h1>
        <p className="text-sm text-[#6B6B6B] leading-relaxed">
          The page you are looking for might have been moved, renamed, or is temporarily unavailable.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 bg-[#111111] text-white px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#333333] transition-all active:scale-95 shadow-md cursor-pointer"
          >
            <span>Return to Homepage</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
