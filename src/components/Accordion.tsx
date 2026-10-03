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
  variant?: 'minimal' | 'bordered';
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  variant = 'minimal'
}) => {
  const [openIds, setOpenIds] = useState<string[]>(() => {
    return items.filter((i) => i.defaultOpen).map((i) => i.id);
  });

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={variant === 'bordered' ? 'divide-y divide-[#e8e8e8] border-y border-[#e8e8e8]' : 'space-y-3'}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div
            key={item.id}
            className={
              variant === 'bordered'
                ? 'py-4'
                : 'rounded-2xl border border-[#e8e8e8] bg-white overflow-hidden shadow-xs transition-colors'
            }
          >
            <button
              onClick={() => toggle(item.id)}
              className={`w-full flex items-center justify-between text-left transition-colors ${
                variant === 'minimal' ? 'p-4 sm:p-5' : 'py-2'
              }`}
              aria-expanded={isOpen}
            >
              <span className="text-sm sm:text-base font-medium text-[#1c1c1a]">
                {item.title}
              </span>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 ${
                  variant === 'minimal'
                    ? isOpen
                      ? 'bg-[#1c1c1a] text-white'
                      : 'bg-[#f5f4f0] text-[#1c1c1a]'
                    : 'text-[#1c1c1a]'
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
                  <div
                    className={`text-xs sm:text-sm text-[#6d6a67] leading-relaxed ${
                      variant === 'minimal'
                        ? 'px-4 sm:px-5 pb-5 pt-1 border-t border-[#f0f0f0]'
                        : 'pb-4 pt-2'
                    }`}
                  >
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
