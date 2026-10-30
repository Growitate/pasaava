import React from 'react';
import { ArrowRight, ShieldCheck, Droplets } from 'lucide-react';

interface PromoBannerProps {
  onNavigate: (path: string) => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onNavigate }) => {
  return (
    <section className="w-full bg-gradient-to-b from-[#0B0F1A] to-[#000000] text-white py-16 sm:py-20 lg:py-24 border-y border-white/10 overflow-hidden relative select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left / Center Info */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-white/90">
              <span>Engineered Hardware Atelier</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.05]">
              Built For Strength.
              <br />
              <span className="text-white/60 font-serif font-light italic lowercase">finished for</span>
              <br />
              Legacy.
            </h2>

            <p className="text-white/80 text-xs sm:text-sm lg:text-base leading-relaxed max-w-lg font-light">
              Solid surgical steel chains, high-refraction stones, and chiseled signets crafted to survive intense workouts, hot showers, and daily travel without tarnish or fading.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-white" />
                100% Waterproof & Sweatproof
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-white" />
                2-Year Craftsmanship Guarantee
              </span>
            </div>

            <div className="pt-3">
              {/* Solid CTA: White bg, #111 text */}
              <button
                onClick={() => onNavigate('/shop')}
                className="inline-flex items-center gap-2.5 bg-white text-[#111111] hover:bg-white/90 px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-lg active:scale-95"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Centered Image Graphic */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div
              onClick={() => onNavigate('/shop')}
              className="relative w-full max-w-[520px] aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-white/20 bg-white/5 shadow-2xl group cursor-pointer"
            >
              <img
                src="/images/hero-masculine-atelier.jpg"
                alt="PASAAVA Atelier Collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-white/70 font-semibold block">
                    Men's Hardware Suite
                  </span>
                  <span className="text-sm font-semibold tracking-wide uppercase">
                    316L Surgical Steel & 18K Gold
                  </span>
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-white bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  Explore
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
