import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles, Mail } from 'lucide-react';
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
    <section className="py-20 md:py-28 bg-[#16181c] text-white relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#b9836a]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#b9836a] text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VIP Access</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
            Join the PASAAVA Society
          </h2>

          <p className="text-sm sm:text-base text-[#9a9da3] leading-relaxed">
            Subscribe to receive private preview drops, men's styling editor notes, and an instant <strong className="text-white">10% welcome gift</strong> on your first order.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 bg-white/10 border border-white/20 rounded-2xl max-w-md mx-auto flex items-center justify-center gap-3 text-sm text-white"
            >
              <div className="w-8 h-8 rounded-full bg-[#22c55e] flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Welcome to the PASAAVA Society!</p>
                <p className="text-xs text-[#bec3cc]">Use code <strong className="text-white">PASAAVA10</strong> at checkout.</p>
              </div>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2"
            >
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-[#9a9da3] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-[#9a9da3] text-sm pl-11 pr-4 py-3.5 rounded-full focus:outline-none focus:border-[#b9836a] focus:bg-white/15 transition-all"
                />
              </div>

              <button
                type="submit"
                className="bg-white text-[#1c1c1a] hover:bg-[#fafaf7] px-7 py-3.5 rounded-full text-sm font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg cursor-pointer flex-shrink-0"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <p className="text-[11px] text-[#5c5f66] pt-2">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};
