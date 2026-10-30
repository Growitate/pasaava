import React from 'react';

export const TrustStrip: React.FC = () => {
  return (
    <section className="bg-[#F8F8F8] border-t border-[#EAEAEA] py-6 sm:py-8 md:py-10 select-none w-full">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 text-center">
          {/* 1. DISPATCH IN 48 HRS */}
          <div className="flex flex-col items-center justify-start px-1">
            <div className="mb-2 sm:mb-2.5 text-[#111111] flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-black fill-black" viewBox="0 0 24 24">
                <path d="M13.13 2.21a1 1 0 0 0-.82-.21C8.28 2.65 4.3 6.63 3.66 10.66a1 1 0 0 0 .22.82l2.32 2.32c-.17.91-.04 1.86.37 2.7l-3.3 3.3a1 1 0 0 0 0 1.41l2.83 2.83a1 1 0 0 0 1.41 0l3.3-3.3c.84.41 1.79.54 2.7.37l2.32 2.32a1 1 0 0 0 .82.22c4.03-.64 8.01-4.62 8.66-8.65a1 1 0 0 0-.21-.82L13.13 2.21zM15 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
              </svg>
            </div>
            <h4 className="text-[10px] sm:text-xs md:text-[13px] font-bold uppercase tracking-wider text-[#111111] leading-tight mb-1">
              DISPATCH IN 48 HRS
            </h4>
            <p className="text-[9px] sm:text-[11px] md:text-xs text-[#666666] leading-tight">
              Delivery in 3-8 Days
            </p>
          </div>

          {/* 2. 1 YEAR WARRANTY */}
          <div className="flex flex-col items-center justify-start px-1">
            <div className="mb-2 sm:mb-2.5 text-[#111111] flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" />
                <path d="M9.5 11.5l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <h4 className="text-[10px] sm:text-xs md:text-[13px] font-bold uppercase tracking-wider text-[#111111] leading-tight mb-1">
              1 YEAR WARRANTY
            </h4>
            <p className="text-[9px] sm:text-[11px] md:text-xs text-[#666666] leading-tight">
              Waterproof / Anti-tarnish
            </p>
          </div>

          {/* 3. EASY EXCHANGE */}
          <div className="flex flex-col items-center justify-start px-1">
            <div className="mb-2 sm:mb-2.5 text-[#111111] flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 21h5v-5" />
              </svg>
            </div>
            <h4 className="text-[10px] sm:text-xs md:text-[13px] font-bold uppercase tracking-wider text-[#111111] leading-tight mb-1">
              EASY EXCHANGE
            </h4>
            <p className="text-[9px] sm:text-[11px] md:text-xs text-[#666666] leading-tight">
              7 Day Exchange Period
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

