import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storageService } from '../services/storageService';

const DEFAULT_ANNOUNCEMENTS = [
  'Free express shipping across India on orders over ₹999',
  '100% Waterproof & Gym Safe Jewelry',
  'Hypoallergenic & Nickel-Free 316L Steel',
  '2-Year Craftsmanship Guarantee'
];

export const AnnouncementBar: React.FC = () => {
  const [announcements, setAnnouncements] = useState<string[]>(() => {
    const custom = storageService.getSettings().announcementText;
    return custom ? [custom, ...DEFAULT_ANNOUNCEMENTS.slice(1)] : DEFAULT_ANNOUNCEMENTS;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    return storageService.subscribe(() => {
      const custom = storageService.getSettings().announcementText;
      if (custom) {
        setAnnouncements([custom, ...DEFAULT_ANNOUNCEMENTS.slice(1)]);
      }
    });
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isPaused, announcements.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full h-[36px] bg-[#000000] text-white flex items-center justify-center relative select-none z-50 overflow-hidden"
    >
      <div className="max-w-[1440px] w-full mx-auto px-3 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Previous Arrow Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous announcement"
          className="text-white/80 hover:text-white transition-colors cursor-pointer text-base leading-none px-2 py-1 flex items-center justify-center select-none"
        >
          ‹
        </button>

        {/* Center Animated Announcement Text */}
        <div className="flex-1 text-center overflow-hidden h-[20px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="text-[12px] font-medium tracking-wide text-white truncate px-2"
            >
              {announcements[currentIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Next Arrow Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next announcement"
          className="text-white/80 hover:text-white transition-colors cursor-pointer text-base leading-none px-2 py-1 flex items-center justify-center select-none"
        >
          ›
        </button>
      </div>
    </div>
  );
};
