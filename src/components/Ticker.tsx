import React from 'react';
import { Sparkles, Shield, Droplets, Dumbbell, Truck, Award } from 'lucide-react';

interface TickerProps {
  dark?: boolean;
}

export const Ticker: React.FC<TickerProps> = ({ dark = false }) => {
  const items = [
    { text: '100% Waterproof & Sweatproof', icon: Droplets },
    { text: '316L Surgical-Grade Steel & Titanium', icon: Shield },
    { text: '2-Year Craftsmanship Guarantee', icon: Award },
    { text: 'Engineered for the Modern Man', icon: Sparkles },
    { text: 'Gym, Ocean & Shower Safe', icon: Dumbbell },
    { text: 'Complimentary Luxury Keepsake Box', icon: Sparkles },
    { text: 'Free Express Shipping Across India Over ₹999', icon: Truck },
    { text: 'Hypoallergenic & Nickel-Free', icon: Shield }
  ];

  return (
    <div
      className="py-3.5 sm:py-4 overflow-hidden border-y border-[#E5E5E5] bg-[#F5F5F5] text-[#111111] select-none"
    >
      <div className="flex w-max animate-marquee space-x-8 items-center">
        {[...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center space-x-3 flex-shrink-0">
              <Icon className="w-3.5 h-3.5 text-[#111111]" />
              <span className="text-xs sm:text-sm font-medium tracking-wide uppercase text-[#111111]">
                {item.text}
              </span>
              <span className="text-[#111111] opacity-30 px-2">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
