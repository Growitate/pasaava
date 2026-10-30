import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setSubscribed(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  return (
    <section className="py-16 md:py-24 bg-white text-[#111111] relative overflow-hidden border-t border-[#E5E5E5]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#111111]">
            Join the PASAAVA Society
          </h2>

          <p className="text-sm text-[#6B6B6B] font-normal leading-relaxed max-w-xl mx-auto">
            Subscribe to receive private preview drops, men's styling editor notes, and an instant <strong className="text-[#111111] font-medium">10% welcome gift</strong> on your first order.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 bg-[#F5F5F5] border border-[#E5E5E5] rounded-2xl max-w-md mx-auto flex items-center justify-center gap-3 text-sm text-[#111111]"
            >
              <div className="w-8 h-8 rounded-full bg-[#22c55e] flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-[#111111]">Welcome to the PASAAVA Society!</p>
                <p className="text-xs text-[#6B6B6B]">Use code <strong className="text-[#111111]">PASAAVA10</strong> at checkout.</p>
              </div>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2"
            >
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-[#6B6B6B] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-white border border-[#E5E5E5] text-[#111111] placeholder-[#6B6B6B] text-sm pl-11 pr-4 py-3.5 rounded-full focus:outline-none focus:border-[#111111] transition-all shadow-xs"
                />
              </div>

              {/* Solid CTA: #111 bg, white text. Hover: #333 */}
              <button
                type="submit"
                className="bg-[#111111] text-white hover:bg-[#333333] px-7 py-3.5 rounded-full text-sm font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm cursor-pointer flex-shrink-0"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <p className="text-[11px] text-[#6B6B6B] pt-2">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};
