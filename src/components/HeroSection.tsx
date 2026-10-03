import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Droplets, Sparkles, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (path: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-screen lg:min-h-[105vh] overflow-hidden bg-[#0c0c0c] flex flex-col justify-between select-none">
      {/* 1. Full-Screen Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-masculine-bold.jpg"
          alt="PASAAVA — Bold Modern Men's Jewellery"
          className="w-full h-full object-cover object-center pointer-events-none scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Cinematic gradient vignette for crisp typography readability and masculine moody depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* 2. Hero Content Container */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20 pt-36 sm:pt-44 lg:pt-52 pb-20 sm:pb-24 lg:pb-32 flex-1 flex flex-col justify-between">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start h-full">
          {/* Left Column: Exclusive Collection, Heading, Subtitle & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between max-w-2xl space-y-7 sm:space-y-10"
          >
            {/* Top Tag: / Exclusive Men's Hardware / */}
            <div className="flex items-center gap-2.5 text-white/80 text-xs sm:text-base font-semibold tracking-[0.25em] uppercase">
              <span className="text-[#b9836a]">/</span>
              <span>Exclusive Men's Hardware</span>
              <span className="text-[#b9836a]">/</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-sans font-bold text-white text-6xl sm:text-7xl md:text-8xl lg:text-[96px] xl:text-[108px] leading-[0.92] tracking-[-0.035em] drop-shadow-xl">
              Engineered
              <br />
              Masculine
              <br />
              Elegance
            </h1>

            {/* Subheading & Button Container */}
            <div className="pt-2 sm:pt-4 space-y-7 max-w-xl">
              <p className="text-white/90 text-base sm:text-lg lg:text-[19px] font-normal leading-relaxed">
                Architectural Cuban chains, solid signet rings, and engineered wristwear forged from 100% waterproof 316L surgical steel, titanium, and 18K gold. Built for the modern man.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={() => onNavigate('/shop')}
                  className="bg-white text-[#0c0c0c] hover:bg-white/90 py-4.5 sm:py-5 px-8 sm:px-10 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 active:scale-[0.99] shadow-2xl cursor-pointer text-center flex items-center justify-center gap-2.5"
                >
                  <span>Explore Men's Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('/men-category/men-bestsellers')}
                  className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 py-4.5 sm:py-5 px-7 sm:px-8 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 active:scale-[0.99] cursor-pointer text-center"
                >
                  Best Sellers
                </button>
              </div>

              {/* Highlights Pill */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-white/80">
                <span className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-[#b9836a]" />
                  100% Waterproof & Sweatproof
                </span>
                <span>•</span>
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#b9836a]" />
                  2-Year Guarantee
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Crafted For Legacy (Desktop Placement) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:h-full flex lg:flex-col lg:justify-end lg:items-end mt-12 lg:mt-0 pb-4 sm:pb-8 text-left lg:text-right"
          >
            <div className="space-y-4">
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#b9836a] font-bold block">
                PASAAVA Atelier
              </span>
              <h2 className="font-sans font-bold text-white text-5xl sm:text-7xl md:text-8xl lg:text-[88px] xl:text-[98px] leading-[0.94] tracking-[-0.03em] drop-shadow-lg">
                Forged For
                <br />
                Legacy
              </h2>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
