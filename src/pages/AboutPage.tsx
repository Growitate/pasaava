import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Droplets, Leaf, Award, HeartHandshake, ArrowRight, Dumbbell } from 'lucide-react';
import { Ticker } from '../components/Ticker';
import { NewsletterSection } from '../components/NewsletterSection';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const stats = [
    { value: '45,000+', label: 'Men in the PASAAVA Society' },
    { value: '316L', label: 'Surgical Stainless Steel' },
    { value: '2-Year', label: 'Craftsmanship Guarantee' },
    { value: '4.9★', label: 'Average Community Rating' }
  ];

  return (
    <div className="space-y-0 bg-[#f8f6f3]">
      {/* 1. Hero Header */}
      <section className="py-16 sm:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#b9836a]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The PASAAVA Heritage</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1c1c1a] leading-tight">
            Forged with Precision. <br />
            <span className="italic text-[#b9836a]">Engineered for Modern Men.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#6d6a67] leading-relaxed max-w-2xl mx-auto">
            PASAAVA was founded on a singular conviction: fine men's jewelry shouldn't be fragile, exorbitant, or locked in a safe. It should be built like armor—ready to accompany every workout, boardroom pitch, and quiet confidence of daily life.
          </p>
        </div>
      </section>

      {/* 2. Hero Visual Showcase */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-[#1c1c1a] shadow-md">
            <img
              src="https://framerusercontent.com/images/3odeMwP2QYVyQFk3BYzYN9rt7o.jpg"
              alt="Atelier Precision"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
          <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-[#1c1c1a] shadow-md md:translate-y-6">
            <img
              src="/images/hero-masculine-bold.jpg"
              alt="Modern Minimalism"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
          <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-[#1c1c1a] shadow-md">
            <img
              src="/images/model-men-signet.jpg"
              alt="Everyday Armor"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
        </div>
      </section>

      {/* 3. Ticker */}
      <Ticker />

      {/* 4. Stats Counter */}
      <section className="py-16 sm:py-20 bg-[#16181c] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            {stats.map((s, idx) => (
              <div key={idx} className="pt-4 md:pt-0 px-4 space-y-1">
                <span className="font-serif text-3xl sm:text-5xl font-light text-[#b9836a]">
                  {s.value}
                </span>
                <p className="text-xs sm:text-sm text-[#9a9da3]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Craftsmanship & Engineering Pillars */}
      <section className="py-20 md:py-28 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#b9836a]">
              Engineering Excellence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1c1c1a] leading-tight">
              Hardware That Withstands Real Life
            </h2>
            <p className="text-sm sm:text-base text-[#6d6a67] leading-relaxed">
              We exclusively utilize surgical-grade 316L stainless steel, aerospace titanium, tungsten carbide, and thick 18K gold vacuum PVD coatings. Our manufacturing process produces zero hazardous water runoff and creates a permanent molecular bond that will never fade, peel, tarnish, or turn skin green.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <Droplets className="w-5 h-5 text-[#b9836a] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#1c1c1a]">100% Waterproof & Sweatproof</h4>
                  <p className="text-xs text-[#6d6a67]">Wear your jewelry in the ocean, sauna, shower, or gym without taking it off.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Dumbbell className="w-5 h-5 text-[#22c55e] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#1c1c1a]">Reinforced Strength</h4>
                  <p className="text-xs text-[#6d6a67]">Laser-welded link joints and custom high-torque compression clasps.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#b9836a] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#1c1c1a]">2-Year Craftsmanship Guarantee</h4>
                  <p className="text-xs text-[#6d6a67]">Free replacements on any clasp, chain, or structural defect.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('/shop')}
                className="inline-flex items-center gap-2 bg-[#1c1c1a] text-white px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-black transition-transform active:scale-95 shadow-md cursor-pointer"
              >
                <span>Discover Men's Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden aspect-square shadow-2xl bg-[#1c1c1a]">
            <img
              src="https://framerusercontent.com/images/M8EGKTse5nImufVQBcQkL00fc.webp"
              alt="PASAAVA Men's Crafting"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 6. Newsletter */}
      <NewsletterSection />
    </div>
  );
};
