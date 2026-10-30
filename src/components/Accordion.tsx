import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ChevronDown } from 'lucide-react';

export interface AccordionItemData {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  variant?: 'minimal' | 'bordered' | 'pdp';
  iconType?: 'plus-minus' | 'chevron';
  className?: string;
  titleClassName?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  variant = 'minimal',
  iconType,
  className = '',
  titleClassName = ''
}) => {
  const [openIds, setOpenIds] = useState<string[]>(() => {
    return items.filter((i) => i.defaultOpen).map((i) => i.id);
  });

  const isPdp = variant === 'pdp' || variant === 'bordered' || iconType === 'chevron';

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  if (isPdp) {
    return (
      <div className={`divide-y divide-[#E5E5E5] border-y border-[#E5E5E5] w-full ${className}`}>
        {items.map((item) => {
          const isOpen = openIds.includes(item.id);

          return (
            <div key={item.id} className="w-full">
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between text-left py-4 sm:py-4.5 transition-colors cursor-pointer group"
                aria-expanded={isOpen}
              >
                <span
                  className={
                    titleClassName ||
                    'text-sm font-semibold tracking-wider text-[#111111] uppercase font-sans'
                  }
                >
                  {item.title}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#111111] transition-transform duration-300 ease-out stroke-[1.75] ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5 pt-1 text-sm text-[#333333] leading-relaxed">
                      {item.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div
            key={item.id}
            className="rounded-2xl border border-[#E5E5E5] bg-white overflow-hidden shadow-xs transition-colors"
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between text-left transition-colors cursor-pointer p-4 sm:p-5"
              aria-expanded={isOpen}
            >
              <span className="text-sm sm:text-base font-medium text-[#111111]">
                {item.title}
              </span>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 ${
                  isOpen
                    ? 'bg-[#111111] text-white'
                    : 'bg-[#F5F5F5] text-[#111111] border border-[#E5E5E5]'
                }`}
              >
                {isOpen ? (
                  <Minus className="w-3.5 h-3.5" />
                ) : (
                  <Plus className="w-3.5 h-3.5" />
                )}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="text-xs sm:text-sm font-light text-[#6B6B6B] leading-relaxed px-4 sm:px-5 pb-5 pt-1 border-t border-[#E5E5E5]">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
