import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Droplets, Dumbbell } from 'lucide-react';

interface BrandStorySectionProps {
  onNavigate: (path: string) => void;
}

export const BrandStorySection: React.FC<BrandStorySectionProps> = ({
  onNavigate
}) => {
  const pillars = [
    {
      icon: Droplets,
      title: '100% Waterproof & Gym Safe',
      desc: 'Forged from surgical 316L stainless steel and vacuum PVD coating that never tarnishes, rusts, or stains skin.'
    },
    {
      icon: Dumbbell,
      title: 'Built for High Performance',
      desc: 'Engineered with reinforced solder joints and heavy-duty clasps that stay secure through intense training.'
    },
    {
      icon: Shield,
      title: '2-Year Craftsmanship Guarantee',
      desc: 'Every piece is backed by our full warranty against defects, link breakage, and finish longevity.'
    },
    {
      icon: Sparkles,
      title: 'Hypoallergenic Skin Comfort',
      desc: '100% nickel-free and lead-free compositions designed for sensitive skin and non-stop 24/7 wear.'
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-[#fafaf7] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story & Image Banner */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl bg-[#1c1c1a] border border-[#e8e8e8]">
              <img
                src="/images/hero-masculine-atelier.jpg"
                alt="PASAAVA Men's Atelier Craftsmanship"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

              {/* Floating Quote Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/40 shadow-xl">
                <p className="font-serif italic text-base sm:text-lg text-[#1c1c1a] leading-snug">
                  "Men's jewelry shouldn't be fragile, exorbitant, or locked in a drawer. It should be built like armor—ready for every movement, sweat, and gesture."
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#b9836a] uppercase tracking-wider">
                    PASAAVA Design Atelier
                  </span>
                  <span className="text-xs text-[#9a948e]">Est. 2024</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Values & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#b9836a]">
                The PASAAVA Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1c1c1a] leading-tight">
                Precision Hardware Forged for the Modern Man
              </h2>
              <p className="text-base text-[#6d6a67] leading-relaxed">
                At PASAAVA, we merge architectural minimalism with unyielding industrial durability. We bridge the gap between flimsy fast fashion and inaccessible bespoke jewelers, giving men heavyweight hardware that lasts a lifetime.
              </p>
            </div>

            {/* Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div key={idx} className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#e8e8e8] flex items-center justify-center text-[#b9836a] shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-semibold text-[#1c1c1a]">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-[#6d6a67] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Action CTA */}
            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => onNavigate('/about')}
                className="flex items-center gap-2 bg-[#1c1c1a] text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-black transition-transform active:scale-95 shadow-md group cursor-pointer"
              >
                <span>About Our Craft</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('/journals')}
                className="text-xs font-semibold uppercase tracking-wider text-[#1c1c1a] hover:text-[#b9836a] transition-colors py-2 px-3"
              >
                Men's Style Journal
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
