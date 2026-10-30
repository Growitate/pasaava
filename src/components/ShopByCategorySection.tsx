import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, Variants } from 'framer-motion';
import { Link2, Layers, CircleDot, Sparkles, ArrowRight } from 'lucide-react';

export interface CategoryFamily {
  id: string;
  name: string;
  shortName: string;
  icon: React.ComponentType<{ className?: string }>;
  squareImage1: string;
  squareImage2: string;
  verticalImage: string;
  thumbnail: string;
  description: string;
  startingPrice: number;
  count: number;
  finishes: string;
  link: string;
  glowColor: string;
  accentColor: string;
}

export const categoryFamilies: CategoryFamily[] = [
  {
    id: 'chains',
    name: 'Chains & Pendants',
    shortName: 'Chains',
    icon: Link2,
    squareImage1: '/images/cat-chains-sq1.jpg',
    squareImage2: '/images/model-men-chain.jpg',
    verticalImage: '/images/cat-chains-vert.jpg',
    thumbnail: '/images/cat-chain.jpg',
    description: 'Diamond-cut Cuban links, classic Figaro, geometric box chains, and heavy statement pendants engineered from waterproof 316L steel.',
    startingPrice: 65,
    count: 8,
    finishes: '18K Gold PVD • Polished Silver • Matte Black',
    link: '/men-category/men-chain',
    glowColor: 'rgba(201,162,92,0.24)',
    accentColor: '#c9a25c'
  },
  {
    id: 'bracelets',
    name: 'Bracelets & Cuffs',
    shortName: 'Bracelets',
    icon: Layers,
    squareImage1: '/images/cat-bracelets-sq1.jpg',
    squareImage2: '/images/model-men-wrist.jpg',
    verticalImage: '/images/cat-bracelets-vert.jpg',
    thumbnail: '/images/cat-bracelet.jpg',
    description: 'Solid curb chains, braided Italian calfskin cords, and engineered horology link bracelets built to layer seamlessly.',
    startingPrice: 70,
    count: 7,
    finishes: 'Rhodium Steel • 18K Gold • Obsidian Black',
    link: '/men-category/men-bracelet',
    glowColor: 'rgba(96,165,250,0.24)',
    accentColor: '#60a5fa'
  },
  {
    id: 'rings',
    name: 'Rings & Signets',
    shortName: 'Rings',
    icon: CircleDot,
    squareImage1: '/images/cat-ring.jpg',
    squareImage2: '/images/model-men-signet.jpg',
    verticalImage: '/images/cat-rings-vert.jpg',
    thumbnail: '/images/model-men-ring.jpg',
    description: 'Cushion signets, beveled industrial bands, and brushed comfort-fit tungsten rings crafted for everyday presence.',
    startingPrice: 55,
    count: 6,
    finishes: 'Brushed Tungsten • 18K Gold • Hammered Steel',
    link: '/men-category/men-ring',
    glowColor: 'rgba(245,158,11,0.24)',
    accentColor: '#f59e0b'
  },
  {
    id: 'earrings',
    name: 'Earrings & Studs',
    shortName: 'Earrings',
    icon: Sparkles,
    squareImage1: '/images/cat-earring.jpg',
    squareImage2: '/images/model-men-earring.jpg',
    verticalImage: '/images/cat-earrings-vert.jpg',
    thumbnail: '/images/cat-earring.jpg',
    description: 'Matte black titanium studs, micro cross charms, and solid heavyweight huggie hoops forged for subtle edge.',
    startingPrice: 45,
    count: 4,
    finishes: 'Rose Gold PVD • Matte Obsidian • Silver Steel',
    link: '/men-category/men-earring',
    glowColor: 'rgba(244,114,182,0.24)',
    accentColor: '#f472b6'
  }
];

interface ShopByCategorySectionProps {
  onNavigate: (path: string) => void;
}

export const ShopByCategorySection: React.FC<ShopByCategorySectionProps> = ({ onNavigate }) => {
  const shouldReduceMotion = useReducedMotion();
  const [{ activeIndex, direction }, setActiveState] = useState<{ activeIndex: number; direction: number }>({
    activeIndex: 0,
    direction: 1
  });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isHoveringSection, setIsHoveringSection] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  const activeCategory = categoryFamilies[activeIndex];

  // Preload all gallery and thumbnail images on mount
  useEffect(() => {
    categoryFamilies.forEach((cat) => {
      [cat.squareImage1, cat.squareImage2, cat.verticalImage, cat.thumbnail].forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });
  }, []);

  // Auto-rotate every 6s until user interacts; pause on hover
  useEffect(() => {
    if (hasInteracted || isHoveringSection) return;

    const timer = setInterval(() => {
      setActiveState((prev) => ({
        activeIndex: (prev.activeIndex + 1) % categoryFamilies.length,
        direction: 1
      }));
    }, 6000);

    return () => clearInterval(timer);
  }, [hasInteracted, isHoveringSection]);

  const selectCategory = (newIndex: number) => {
    if (newIndex === activeIndex) return;
    setHasInteracted(true);
    const dir = newIndex > activeIndex ? 1 : -1;
    setActiveState({
      activeIndex: newIndex,
      direction: dir
    });
  };

  // Keyboard navigation for tablist
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % categoryFamilies.length;
      selectCategory(nextIndex);
      const nextEl = document.getElementById(`category-tab-${nextIndex}`);
      nextEl?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + categoryFamilies.length) % categoryFamilies.length;
      selectCategory(prevIndex);
      const prevEl = document.getElementById(`category-tab-${prevIndex}`);
      prevEl?.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectCategory(index);
    }
  };

  // Mobile swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartXRef.current;
    touchStartXRef.current = null;

    if (Math.abs(diffX) > 45) {
      setHasInteracted(true);
      if (diffX > 0) {
        // Swiped right -> previous (slide in from left)
        setActiveState((prev) => ({
          activeIndex: (prev.activeIndex - 1 + categoryFamilies.length) % categoryFamilies.length,
          direction: -1
        }));
      } else {
        // Swiped left -> next (slide in from right)
        setActiveState((prev) => ({
          activeIndex: (prev.activeIndex + 1) % categoryFamilies.length,
          direction: 1
        }));
      }
    }
  };

  // Direction-aware horizontal sliding variants
  const stageVariants: Variants = {
    initial: (customDirection: number) => ({
      opacity: 0,
      x: shouldReduceMotion ? 0 : customDirection > 0 ? '40%' : '-40%',
      filter: shouldReduceMotion ? 'none' : 'blur(6px)',
      scale: 0.98
    }),
    animate: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 28 },
        scale: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        filter: { duration: 0.35 },
        opacity: { duration: 0.35 }
      }
    },
    exit: (customDirection: number) => ({
      opacity: 0,
      x: shouldReduceMotion ? 0 : customDirection > 0 ? '-40%' : '40%',
      filter: shouldReduceMotion ? 'none' : 'blur(6px)',
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 28 },
        scale: { duration: 0.35 },
        filter: { duration: 0.25 },
        opacity: { duration: 0.25 }
      }
    })
  };

  return (
    <section
      className="py-12 md:py-16 bg-[#F5F5F5] border-t border-[#E5E5E5] relative overflow-hidden"
      onMouseEnter={() => setIsHoveringSection(true)}
      onMouseLeave={() => setIsHoveringSection(false)}
      style={{ perspective: '1200px' }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#111111]">
            Shop by Category
          </h2>
          <p className="text-xs sm:text-sm font-normal text-[#6B6B6B] max-w-md mx-auto leading-relaxed">
            Four families of hardware, engineered to be worn daily.
          </p>
        </div>

        {/* Scroll-In Single Image Showcase Stage */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 4 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-[760px] sm:max-w-[820px] md:max-w-[860px] mx-auto"
        >
          {/* Single Image Card */}
          <div
            onClick={() => onNavigate(activeCategory.link)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="region"
            aria-label="Category Showcase"
            className="relative z-10 rounded-[20px] sm:rounded-[24px] border border-[#E5E5E5] bg-[#F3F3F3] shadow-md overflow-hidden cursor-pointer group select-none"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeCategory.id}
                custom={direction}
                variants={stageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative aspect-[16/10] sm:aspect-[16/9] md:h-[380px] w-full overflow-hidden flex flex-col justify-end"
              >
                <img
                  src={activeCategory.verticalImage}
                  alt={activeCategory.name}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Cinematic Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15" />

                {/* Top Badge */}
                <div className="absolute top-3.5 left-3.5 sm:top-5 sm:left-5 z-20 flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase text-white/90">
                    {activeCategory.count} Signature Designs
                  </div>
                </div>

                {/* Bottom Overlay Info */}
                <div className="relative z-20 p-5 sm:p-7 md:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold block text-white/80">
                      Hardware Family
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-white">
                      {activeCategory.name}
                    </h3>
                  </div>

                  <div className="inline-flex items-center gap-2 self-start sm:self-auto px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-[#111111] hover:bg-[#F0F0F0] backdrop-blur-md text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all shadow-md">
                    <span>Explore Family</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Clean Floating Category Items (No box containers) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-2"
          role="tablist"
          aria-label="Category Selection"
        >
          {categoryFamilies.map((cat, idx) => {
            const isActive = activeIndex === idx;

            return (
              <motion.button
                key={cat.id}
                id={`category-tab-${idx}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`category-panel-${cat.id}`}
                aria-label={`Select ${cat.name}`}
                tabIndex={0}
                onClick={() => selectCategory(idx)}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="group relative flex flex-col items-center bg-transparent border-0 p-1 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-full"
              >
                {/* Floating Circular Jewelry Thumbnail */}
                <div
                  className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden transition-all duration-300 ${
                    isActive
                      ? 'ring-2 ring-[#111111] ring-offset-2 ring-offset-[#F5F5F5] shadow-sm scale-105'
                      : 'ring-1 ring-[#E5E5E5] opacity-75 hover:opacity-100 hover:ring-[#111111]'
                  }`}
                >
                  <img
                    src={cat.thumbnail}
                    alt={cat.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Refined Category Label Below Image */}
                <span
                  className={`mt-1.5 text-[10px] font-semibold tracking-widest uppercase transition-colors duration-200 ${
                    isActive ? 'text-[#111111]' : 'text-[#6B6B6B] group-hover:text-[#111111]'
                  }`}
                >
                  {cat.shortName}
                </span>

                {/* Active Indicator Dot */}
                {isActive && (
                  <motion.div
                    layoutId="categoryActiveDot"
                    className="mt-1 w-1 h-1 rounded-full bg-[#111111]"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Refined Minimalist Action */}
        <div className="mt-6 sm:mt-7 text-center" id={`category-panel-${activeCategory.id}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="inline-flex items-center justify-center"
            >
              <button
                onClick={() => onNavigate(activeCategory.link)}
                className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#111111] hover:bg-[#333333] text-white text-[11px] font-semibold uppercase tracking-widest transition-all duration-200 cursor-pointer shadow-sm"
              >
                <span>Explore {activeCategory.name}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
