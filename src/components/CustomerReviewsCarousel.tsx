import React, { useState, useEffect } from 'react';
import { Star, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, PanInfo, Transition } from 'framer-motion';

interface ReviewSlide {
  id: string;
  name: string;
  image: string;
  title: string;
  text: string;
  product: string;
}

const REVIEWS_DATA: ReviewSlide[] = [
  {
    id: 'rev-1',
    name: 'MANAS',
    image: '/images/model-men-earring.jpg',
    title: '“PASAAVA QUALITY”',
    text: 'I love this piece, doesn’t feel cheap at all, it’s heavy and looks exactly like on the site.',
    product: 'Titan Stud Earring'
  },
  {
    id: 'rev-2',
    name: 'KRISHNA',
    image: '/images/model-men-wrist.jpg',
    title: '“SO GOOD!”',
    text: 'The quality of the material is 10/10, looks expensive and the design is amazing. Definitely an eye catcher!',
    product: 'Viper Tennis Bracelet'
  },
  {
    id: 'rev-3',
    name: 'SHREYA',
    image: '/images/model-men-pendant.jpg',
    title: '“LOVED THE ACCESSORIES”',
    text: 'Best product decision and the team was super supportive and responsive. Definitely coming back for more products. Quality of piece is too good and everyone loved it.',
    product: 'Ares Cross Pendant'
  },
  {
    id: 'rev-4',
    name: 'RAMYABINA',
    image: '/images/model-men-chain.jpg',
    title: '“AMAZING”',
    text: 'Amazing, very good quality! The weight, polish and shine on the chain are exceptional.',
    product: 'Atlas Cuban Chain'
  },
  {
    id: 'rev-5',
    name: 'ADIRA',
    image: '/images/model-men-signet.jpg',
    title: '“FAVE PIECE!”',
    text: 'It’s lovely! Fave piece in my collection right now! Survives every workout and shower without tarnish.',
    product: 'Atlas Signet Ring'
  },
  {
    id: 'rev-6',
    name: 'MARCUS V.',
    image: '/images/model-men-cuban.jpg',
    title: '“INDISPENSABLE”',
    text: 'Horology-grade locking clasps and solid surgical steel. Heavyweight feel that easily rivals bespoke houses.',
    product: 'Titan Link Bracelet'
  }
];

export const CustomerReviewsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(4); // Default on ADIRA ("FAVE PIECE!")
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const total = REVIEWS_DATA.length;

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    setTimeout(() => setIsDragging(false), 50);
    const swipeThreshold = 30;
    const velocityThreshold = 100;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      handlePrev();
    }
  };

  // 3 visible cards in view for desktop
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  const leftReview = REVIEWS_DATA[prevIndex];
  const centerReview = REVIEWS_DATA[currentIndex];
  const rightReview = REVIEWS_DATA[nextIndex];

  // Auto-play timer (paused when interacting/hovering)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  // Spring transition physics for tactile feel
  const springTransition: Transition = {
    type: 'spring',
    stiffness: 280,
    damping: 28,
    mass: 0.8
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: springTransition
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.95,
      transition: springTransition
    })
  };

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden select-none border-b border-[#E5E5E5] flex flex-col items-center justify-center bg-white"
    >
      {/* 1. 3D Liquid Chrome Ambient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.04, 1],
            x: [0, -12, 0]
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -inset-10 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: "url('/images/liquid-chrome-bg.jpg')"
          }}
        />

        {/* Soft Radial & Linear White Overlays */}
        <div className="absolute inset-0 bg-radial from-white via-white/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-white" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
      </div>

      {/* 2. Main Carousel Container */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col items-center">
        {/* Interactive Swipable Track */}
        <div className="w-full relative flex items-center justify-center">
          {/* Left Arrow (Desktop / Tablet) */}
          <button
            onClick={handlePrev}
            aria-label="Previous review"
            className="hidden md:flex absolute left-0 lg:-left-2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-black shadow-md hover:shadow-lg border border-black/10 items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5 text-black" strokeWidth={2.5} />
          </button>

          {/* Right Arrow (Desktop / Tablet) */}
          <button
            onClick={handleNext}
            aria-label="Next review"
            className="hidden md:flex absolute right-0 lg:-right-2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-black shadow-md hover:shadow-lg border border-black/10 items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5 text-black" strokeWidth={2.5} />
          </button>

          {/* Swipable & Draggable Area */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            className="w-full max-w-[1100px] py-6 flex flex-col items-center cursor-grab active:cursor-grabbing touch-pan-y"
          >
            {/* Desktop 3-Card Stage */}
            <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 items-center w-full">
              {/* Left Card (Slightly smaller, clickable) */}
              <motion.div
                key={`left-${leftReview.id}`}
                onClick={() => {
                  if (!isDragging) handlePrev();
                }}
                initial={{ opacity: 0.7, x: direction > 0 ? 30 : -30, scale: 0.95 }}
                animate={{ opacity: 0.88, x: 0, scale: 0.96 }}
                transition={springTransition}
                style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.07)'
                }}
                className="w-full bg-white rounded-[4px] p-6 lg:p-7 text-center border border-black/5 flex flex-col items-center justify-between min-h-[220px] hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              >
                {/* 5 Black Stars */}
                <div className="flex items-center justify-center gap-1 text-black mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black" strokeWidth={0} />
                  ))}
                </div>

                {/* Bold Uppercase Title */}
                <h3 className="font-sans font-bold text-sm lg:text-base uppercase tracking-tight text-black mb-2 leading-snug">
                  {leftReview.title}
                </h3>

                {/* Text */}
                <p className="text-[13.5px] lg:text-[14px] text-[#6B6B6B] leading-relaxed line-clamp-4 mb-4 font-normal px-2">
                  {leftReview.text}
                </p>

                {/* Uppercase Name + Verified Tick */}
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold tracking-wider uppercase text-black mt-auto pt-2">
                  <span>{leftReview.name}</span>
                  <span className="w-4 h-4 rounded-full border border-black flex items-center justify-center text-[9px] leading-none">
                    <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                  </span>
                </div>
              </motion.div>

              {/* Center Active Card (Elevated & Prominent) */}
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={centerReview.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{
                    boxShadow: '0 16px 45px rgba(0, 0, 0, 0.16)'
                  }}
                  className="w-full bg-white rounded-[4px] p-7 lg:p-8 text-center border border-black/10 flex flex-col items-center justify-between min-h-[250px] relative z-20 scale-[1.08] lg:scale-[1.12]"
                >
                  {/* 5 Black Stars */}
                  <div className="flex items-center justify-center gap-1 text-black mb-3.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 fill-black text-black" strokeWidth={0} />
                    ))}
                  </div>

                  {/* Bold Uppercase Title */}
                  <h3 className="font-sans font-bold text-base lg:text-lg uppercase tracking-tight text-black mb-2.5 leading-snug">
                    {centerReview.title}
                  </h3>

                  {/* Text */}
                  <p className="text-[14px] lg:text-[15px] text-[#555555] leading-relaxed line-clamp-5 mb-5 font-normal px-3">
                    {centerReview.text}
                  </p>

                  {/* Uppercase Name + Verified Tick */}
                  <div className="flex items-center justify-center gap-1.5 text-xs lg:text-sm font-bold tracking-wider uppercase text-black mt-auto pt-2">
                    <span>{centerReview.name}</span>
                    <span className="w-4 h-4 rounded-full border border-black flex items-center justify-center text-[9px] leading-none">
                      <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Right Card (Slightly smaller, clickable) */}
              <motion.div
                key={`right-${rightReview.id}`}
                onClick={() => {
                  if (!isDragging) handleNext();
                }}
                initial={{ opacity: 0.7, x: direction > 0 ? 30 : -30, scale: 0.95 }}
                animate={{ opacity: 0.88, x: 0, scale: 0.96 }}
                transition={springTransition}
                style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.07)'
                }}
                className="w-full bg-white rounded-[4px] p-6 lg:p-7 text-center border border-black/5 flex flex-col items-center justify-between min-h-[220px] hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              >
                {/* 5 Black Stars */}
                <div className="flex items-center justify-center gap-1 text-black mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black" strokeWidth={0} />
                  ))}
                </div>

                {/* Bold Uppercase Title */}
                <h3 className="font-sans font-bold text-sm lg:text-base uppercase tracking-tight text-black mb-2 leading-snug">
                  {rightReview.title}
                </h3>

                {/* Text */}
                <p className="text-[13.5px] lg:text-[14px] text-[#6B6B6B] leading-relaxed line-clamp-4 mb-4 font-normal px-2">
                  {rightReview.text}
                </p>

                {/* Uppercase Name + Verified Tick */}
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold tracking-wider uppercase text-black mt-auto pt-2">
                  <span>{rightReview.name}</span>
                  <span className="w-4 h-4 rounded-full border border-black flex items-center justify-center text-[9px] leading-none">
                    <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Mobile View: High-Response Single Swipable Card */}
            <div className="md:hidden w-full max-w-[340px] sm:max-w-[390px] min-h-[260px] flex items-center justify-center overflow-visible">
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={centerReview.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{
                    boxShadow: '0 12px 35px rgba(0, 0, 0, 0.14)'
                  }}
                  className="w-full bg-white rounded-[4px] p-6 sm:p-7 text-center border border-black/10 flex flex-col items-center justify-between min-h-[220px] relative z-10"
                >
                  {/* 5 Black Stars */}
                  <div className="flex items-center justify-center gap-1 text-black mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-black text-black" strokeWidth={0} />
                    ))}
                  </div>

                  {/* Bold Uppercase Title */}
                  <h3 className="font-sans font-bold text-base uppercase tracking-tight text-black mb-2 leading-snug">
                    {centerReview.title}
                  </h3>

                  {/* Text */}
                  <p className="text-[14px] text-[#6B6B6B] leading-relaxed line-clamp-4 mb-4 font-normal px-2">
                    {centerReview.text}
                  </p>

                  {/* Uppercase Name + Verified Tick */}
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold tracking-wider uppercase text-black mt-auto pt-2">
                    <span>{centerReview.name}</span>
                    <span className="w-4 h-4 rounded-full border border-black flex items-center justify-center text-[8px] leading-none">
                      <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* 3. Pagination Dots & Pill Indicator */}
        <div className="flex items-center justify-center gap-2 mt-4 z-20">
          {REVIEWS_DATA.map((rev, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={rev.id}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                aria-label={`Go to review ${index + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-7 h-2 bg-black'
                    : 'w-2 h-2 bg-black/20 hover:bg-black/40'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

