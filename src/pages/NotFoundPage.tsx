import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-24 sm:py-36 bg-[#f8f6f3] text-center">
      <div className="max-w-md mx-auto px-4 space-y-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#b9836a]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Error 404</span>
        </div>
        <h1 className="font-serif text-5xl sm:text-6xl font-normal text-[#1c1c1a]">
          Page Not Found
        </h1>
        <p className="text-sm text-[#6d6a67] leading-relaxed">
          The page you are looking for might have been moved, renamed, or is temporarily unavailable.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 bg-[#1c1c1a] text-white px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-black transition-transform active:scale-95 shadow-md"
          >
            <span>Return to Homepage</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
