import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Droplets } from 'lucide-react';

interface GenderSplitSectionProps {
  onNavigate: (path: string) => void;
}

export const GenderSplitSection: React.FC<GenderSplitSectionProps> = ({
  onNavigate
}) => {
  return (
    <section className="py-16 md:py-24 bg-[#fafaf7] border-y border-[#e8e8e8]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#b9836a]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Men's Pillars</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1c1c1a]">
            Engineered for Daily Armor
          </h2>
          <p className="text-sm sm:text-base text-[#6d6a67] leading-relaxed">
            From boardroom precision to weekend activewear, discover the two foundational pillars of the modern man's jewelry wardrobe.
          </p>
        </div>

        {/* 2-Column Split Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1: Neck Chains & Pendants */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => onNavigate('/men-category/men-chain')}
            className="group relative h-[460px] sm:h-[540px] rounded-3xl overflow-hidden shadow-lg cursor-pointer bg-[#1c1c1a]"
          >
            <img
              src="/images/model-men-chain.jpg"
              alt="Neck Chains & Pendants"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="absolute bottom-8 left-8 right-8 text-white space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#b9836a] font-semibold">
                Foundation Neckwear
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-light">
                Chains & Pendants
              </h3>
              <p className="text-sm text-white/80 max-w-md line-clamp-2">
                Heavyweight Cuban links, Italian Figaro, and beveled military shield tags engineered from waterproof 316L steel.
              </p>
              <div className="pt-2 flex items-center gap-2 text-sm font-medium text-[#b9836a] group-hover:text-white transition-colors">
                <span>Explore Chains & Neckwear</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </motion.div>

          {/* Card 2: Bracelets, Rings & Signets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            onClick={() => onNavigate('/men-category/men-bracelet')}
            className="group relative h-[460px] sm:h-[540px] rounded-3xl overflow-hidden shadow-lg cursor-pointer bg-[#1c1c1a]"
          >
            <img
              src="/images/model-men-wrist.jpg"
              alt="Bracelets & Signet Rings"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="absolute bottom-8 left-8 right-8 text-white space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#b9836a] font-semibold">
                Architectural Wristwear & Bands
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-light">
                Bracelets & Signets
              </h3>
              <p className="text-sm text-white/80 max-w-md line-clamp-2">
                Solid curb bracelets, horology link hardware, braided calfskin cords, and chiseled comfort-fit signet rings.
              </p>
              <div className="pt-2 flex items-center gap-2 text-sm font-medium text-[#b9836a] group-hover:text-white transition-colors">
                <span>Explore Bracelets & Rings</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
