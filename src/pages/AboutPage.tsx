import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Droplets, ArrowRight, Dumbbell } from 'lucide-react';
import { Ticker } from '../components/Ticker';
import { NewsletterSection } from '../components/NewsletterSection';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

interface StatItemConfig {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
  formatNumber?: boolean;
  label: string;
}

const StatCounter: React.FC<{
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  formatNumber?: boolean;
}> = ({ target, decimals = 0, prefix = '', suffix = '', formatNumber = false }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 2200;

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const current = easedProgress * target;

      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, target]);

  const displayValue = formatNumber
    ? Math.round(count).toLocaleString('en-US')
    : count.toFixed(decimals);

  return (
    <span ref={ref} className="tabular-nums inline-block transition-transform duration-300">
      {prefix}{displayValue}{suffix}
    </span>
  );
};

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const stats: StatItemConfig[] = [
    { target: 45000, suffix: '+', formatNumber: true, label: 'Men in the PASAAVA Society' },
    { target: 316, suffix: 'L', formatNumber: false, label: 'Surgical Stainless Steel' },
    { target: 2, suffix: '-Year', formatNumber: false, label: 'Craftsmanship Guarantee' },
    { target: 4.9, decimals: 1, suffix: '★', formatNumber: false, label: 'Average Community Rating' }
  ];

  return (
    <div className="space-y-0 bg-white text-[#111111]">
      {/* 1. Hero Header */}
      <section className="pt-24 pb-16 sm:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#111111] leading-tight">
            Forged with Precision. <br />
            <span className="italic text-[#111111]">Engineered for Modern Men.</span>
          </h1>
          <p className="text-sm sm:text-[15px] font-normal text-[#6B6B6B] leading-relaxed max-w-xl mx-auto tracking-wide font-sans">
            PASAAVA was founded on a singular conviction: fine men's jewelry shouldn't be fragile, exorbitant, or locked in a safe. It should be built like armor—ready to accompany every workout, boardroom pitch, and quiet confidence of daily life.
          </p>
        </div>
      </section>

      {/* 2. Hero Visual Showcase */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-[#F3F3F3] border border-[#E5E5E5] shadow-xs">
            <img
              src="/images/model-men-chain.jpg"
              alt="Atelier Precision"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-[#F3F3F3] border border-[#E5E5E5] shadow-xs md:translate-y-6">
            <img
              src="/images/hero-masculine-bold.jpg"
              alt="Modern Minimalism"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-[#F3F3F3] border border-[#E5E5E5] shadow-xs">
            <img
              src="/images/model-men-signet.jpg"
              alt="Everyday Armor"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. Ticker */}
      <Ticker />

      {/* 4. Stats Counter */}
      <section className="py-16 sm:py-20 bg-[#F5F5F5] text-[#111111] border-y border-[#E5E5E5]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#E5E5E5]">
            {stats.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="pt-4 md:pt-0 px-4 space-y-1.5"
              >
                <div className="font-serif text-3xl sm:text-5xl font-normal text-[#111111]">
                  <StatCounter
                    target={s.target}
                    decimals={s.decimals}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    formatNumber={s.formatNumber}
                  />
                </div>
                <p className="text-xs sm:text-sm text-[#6B6B6B] font-normal">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Craftsmanship & Engineering Pillars */}
      <section className="py-16 md:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#111111] leading-tight">
              Hardware That Withstands Real Life
            </h2>
            <p className="text-sm sm:text-base font-light text-[#6B6B6B] leading-relaxed">
              We exclusively utilize surgical-grade 316L stainless steel, aerospace titanium, tungsten carbide, and thick 18K gold vacuum PVD coatings. Our manufacturing process produces zero hazardous water runoff and creates a permanent molecular bond that will never fade, peel, tarnish, or turn skin green.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <Droplets className="w-5 h-5 text-[#111111] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#111111]">100% Waterproof & Sweatproof</h4>
                  <p className="text-xs font-light text-[#6B6B6B]">Wear your jewelry in the ocean, sauna, shower, or gym without taking it off.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Dumbbell className="w-5 h-5 text-[#111111] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#111111]">Reinforced Strength</h4>
                  <p className="text-xs font-light text-[#6B6B6B]">Laser-welded link joints and custom high-torque compression clasps.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#111111] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#111111]">2-Year Craftsmanship Guarantee</h4>
                  <p className="text-xs font-light text-[#6B6B6B]">Free replacements on any clasp, chain, or structural defect.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('/shop')}
                className="inline-flex items-center gap-2 bg-[#111111] text-white px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#333333] transition-all active:scale-95 shadow-sm cursor-pointer"
              >
                <span>Discover Men's Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden aspect-square shadow-xl bg-[#111111] border border-[#E5E5E5] group">
            <img
              src="/images/cat-bracelets-sq1.jpg"
              alt="Hardware That Withstands Real Life - Precision 316L Surgical Steel & 18K Gold Clasp"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </div>
      </section>

      {/* 6. Newsletter */}
      <NewsletterSection />
    </div>
  );
};
