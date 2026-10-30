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
    <section className="py-16 md:py-24 bg-white overflow-hidden border-t border-[#E5E5E5]">
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
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-xl bg-[#F3F3F3] border border-[#E5E5E5]">
              <img
                src="/images/hero-masculine-atelier.jpg"
                alt="PASAAVA Men's Atelier Craftsmanship"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Floating Quote Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-black/75 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/15 shadow-xl">
                <p className="font-serif italic text-base sm:text-lg text-white leading-snug">
                  "Men's jewelry shouldn't be fragile, exorbitant, or locked in a drawer. It should be built like armor—ready for every movement, sweat, and gesture."
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">
                    PASAAVA Design Atelier
                  </span>
                  <span className="text-xs text-white/60">Est. 2024</span>
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
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#111111] leading-tight">
                Precision Hardware Forged for the Modern Man
              </h2>
              <p className="text-sm sm:text-[15px] font-normal text-[#6B6B6B] leading-relaxed">
                At PASAAVA, we merge architectural minimalism with unyielding industrial durability. We bridge the gap between flimsy fast fashion and inaccessible bespoke jewelers, giving men heavyweight hardware that lasts a lifetime.
              </p>
            </div>

            {/* Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div key={idx} className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center text-[#111111] shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-semibold text-[#111111]">
                      {pillar.title}
                    </h4>
                    <p className="text-xs font-light text-[#6B6B6B] leading-relaxed">
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
                className="flex items-center gap-2 bg-[#111111] text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-[#333333] transition-all active:scale-95 shadow-sm group cursor-pointer"
              >
                <span>About Our Craft</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('/journals')}
                className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] hover:text-[#111111] transition-colors py-2 px-3 cursor-pointer"
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
