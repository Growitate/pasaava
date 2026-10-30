import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MapPin,
  Clock,
  Send,
  Check,
  Sparkles,
  Shield,
  RotateCcw,
  Award,
  ArrowUpRight,
  MessageCircle
} from 'lucide-react';
import { Accordion } from '../components/Accordion';
import { faqs } from '../data/faqs';
import { storageService } from '../services/storageService';
import confetti from 'canvas-confetti';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [socialLinks, setSocialLinks] = useState(() => storageService.getSettings().socialLinks);

  useEffect(() => {
    return storageService.subscribe(() => {
      setSocialLinks(storageService.getSettings().socialLinks);
    });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderNumber: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="pt-24 pb-16 sm:py-24 bg-[#FAFAFA] text-[#111111]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-[11px] font-bold tracking-[0.18em] uppercase text-black/70 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>PASAAVA Client Services</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#111111] tracking-tight">
            We're Here to Assist
          </h1>
          <p className="text-sm sm:text-base font-light text-[#666666] max-w-xl mx-auto leading-relaxed">
            Have questions on sizing, styling combinations, or custom hardware commissions? Connect directly with our atelier artisans.
          </p>
        </div>

        {/* MAIN 2-COLUMN SECTION (Info Card & Form Card) */}
        <div id="inquiry-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Atelier Hub & Guarantees Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Atelier Studio Card */}
            <div className="bg-[#141414] text-white rounded-[28px] p-7 sm:p-9 border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.25)] relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10 relative z-10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 block mb-1">
                    Direct Concierge
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white tracking-tight">
                    Studio & Atelier
                  </h3>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-semibold text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Concierge Live</span>
                </div>
              </div>

              {/* Contact Information List */}
              <div className="space-y-4 my-6 relative z-10">
                {/* Location */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-white/25 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white shadow-xs flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block mb-0.5">
                      Flagship Atelier
                    </span>
                    <p className="text-sm font-semibold text-white leading-snug">
                      458 Broadway, SoHo District
                    </p>
                    <p className="text-xs font-light text-white/60 mt-0.5">
                      New York, NY 10013 · By Appointment & Walk-in
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-white/25 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white shadow-xs flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block mb-0.5">
                      Direct Email Inquiries
                    </span>
                    <a
                      href={`mailto:${socialLinks.email || 'concierge@pasaava.com'}`}
                      className="text-sm font-semibold text-white hover:text-white/80 transition-colors inline-flex items-center gap-1.5 group"
                    >
                      <span>{socialLinks.email || 'concierge@pasaava.com'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                    <p className="text-xs font-light text-white/60 mt-0.5">
                      Styling, bespoke sizing & order tracking
                    </p>
                  </div>
                </div>

                {/* WhatsApp Live Concierge */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-emerald-500/40 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shadow-xs flex-shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block mb-0.5">
                      WhatsApp Live Concierge
                    </span>
                    <a
                      href={`https://wa.me/${(socialLinks.whatsapp || '+919876543210').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        'Hello PASAAVA Atelier Concierge, I would like to inquire about bespoke sizing and styling.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1.5 group"
                    >
                      <span>{socialLinks.whatsapp || '+91 98765 43210'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400/80 group-hover:text-emerald-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                    <p className="text-xs font-light text-white/60 mt-0.5">
                      Direct WhatsApp assistance Mon–Sat, 10am–8pm IST
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-white/25 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white shadow-xs flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block mb-0.5">
                      Operating Schedule
                    </span>
                    <p className="text-sm font-semibold text-white leading-snug">
                      Monday – Friday: 9am – 6pm EST
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-white/60 font-light">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Average response time: &lt; 2 hours</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Footer */}
              <div className="pt-5 border-t border-white/10 flex items-center justify-between text-xs text-white/70 relative z-10">
                <span className="font-light">International shipping support</span>
                <span className="font-semibold text-white">Worldwide Concierge</span>
              </div>
            </div>

            {/* Quick Guarantees Box */}
            <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-black/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-4">
              <div className="flex items-center justify-between pb-3.5 border-b border-black/[0.06]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/60 block mb-0.5">
                    Authenticity & Guarantee
                  </span>
                  <h4 className="font-serif text-lg font-normal text-[#111111]">
                    The PASAAVA Promise
                  </h4>
                </div>
                <div className="w-8 h-8 rounded-full bg-black/5 border border-black/10 flex items-center justify-center text-[#111111]">
                  <Shield className="w-4 h-4" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 text-xs text-[#666666]">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAFAFA] border border-black/[0.04]">
                  <div className="w-7 h-7 rounded-lg bg-white text-[#111111] border border-black/10 flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <RotateCcw className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-[#111111] block font-semibold text-xs">30-Day Hassle-Free Returns</strong>
                    <span className="text-[#666666] text-[11px] font-light">Free prepaid returns & exchanges globally</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAFAFA] border border-black/[0.04]">
                  <div className="w-7 h-7 rounded-lg bg-white text-[#111111] border border-black/10 flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-[#111111] block font-semibold text-xs">Custom Sizing Concierge</strong>
                    <span className="text-[#666666] text-[11px] font-light">Complimentary ring sizers & exchange support</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAFAFA] border border-black/[0.04]">
                  <div className="w-7 h-7 rounded-lg bg-white text-[#111111] border border-black/10 flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-[#111111] block font-semibold text-xs">Lifetime Waterproof Warranty</strong>
                    <span className="text-[#666666] text-[11px] font-light">Full coverage on 316L structural steel & clasps</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Form Card */}
          <div className="lg:col-span-7 bg-white rounded-[28px] p-7 sm:p-10 border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            <div className="pb-6 mb-7 border-b border-black/[0.06] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/60 block mb-1">
                  Direct Dispatch
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#111111] tracking-tight">
                  Send a Direct Message
                </h3>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 text-[11px] font-semibold text-black/70">
                <span>Encrypted & Private</span>
              </div>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#111111]">
                  Inquiry Dispatched
                </h3>
                <p className="text-sm font-light text-[#666666] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#111111]">{formData.name}</strong>. A dedicated concierge specialist will review your request and reply to <strong className="text-[#111111]">{formData.email}</strong> within 2 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', orderNumber: '', subject: 'General Inquiry', message: '' });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-xs font-semibold uppercase tracking-wider hover:bg-black/80 transition-all cursor-pointer shadow-md"
                  >
                    <span>Submit another inquiry</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#111111]">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Marcus Vance"
                      className="w-full bg-[#FAFAFA] border border-black/10 rounded-2xl px-4 py-3.5 text-sm text-[#111111] placeholder:text-black/40 focus:outline-none focus:border-black focus:bg-white transition-all shadow-2xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#111111]">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. marcus@domain.com"
                      className="w-full bg-[#FAFAFA] border border-black/10 rounded-2xl px-4 py-3.5 text-sm text-[#111111] placeholder:text-black/40 focus:outline-none focus:border-black focus:bg-white transition-all shadow-2xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#111111]">
                      Subject / Topic
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#FAFAFA] border border-black/10 rounded-2xl px-4 py-3.5 text-sm text-[#111111] focus:outline-none focus:border-black focus:bg-white transition-all shadow-2xs cursor-pointer"
                    >
                      <option value="General Inquiry">General Styling Question</option>
                      <option value="Order Tracking">Order & Shipping Status</option>
                      <option value="Returns">Return or Exchange</option>
                      <option value="Warranty">Warranty & Lifetime Guarantee</option>
                      <option value="Custom Sizing">Custom Sizing / Bespoke Engraving</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#111111]">
                      Order Number (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.orderNumber}
                      onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                      placeholder="e.g. #PAS-84920"
                      className="w-full bg-[#FAFAFA] border border-black/10 rounded-2xl px-4 py-3.5 text-sm text-[#111111] placeholder:text-black/40 focus:outline-none focus:border-black focus:bg-white transition-all shadow-2xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#111111]">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can our concierge team assist you with sizing, materials, or order updates?"
                    className="w-full bg-[#FAFAFA] border border-black/10 rounded-2xl p-4 text-sm text-[#111111] placeholder:text-black/40 focus:outline-none focus:border-black focus:bg-white transition-all shadow-2xs resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#111111] text-white py-4 px-6 rounded-2xl text-xs font-bold uppercase tracking-[0.18em] hover:bg-black transition-all active:scale-[0.99] shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-3"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Concierge</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 3. COMMON INQUIRIES / FAQS IN CARDS */}
        <div className="mt-20 sm:mt-28 max-w-4xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/60">
              Immediate Answers
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-normal text-[#111111]">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
            <Accordion
              items={faqs.slice(0, 5).map((f, i) => ({
                id: `c-faq-${i}`,
                title: f.question,
                content: <p className="text-sm font-light text-[#666666] leading-relaxed">{f.answer}</p>
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

