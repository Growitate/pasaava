import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, Check, Sparkles, MessageSquare } from 'lucide-react';
import { Accordion } from '../components/Accordion';
import { faqs } from '../data/faqs';
import confetti from 'canvas-confetti';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
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
    <div className="py-12 sm:py-20 bg-[#f8f6f3]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#b9836a]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customer Concierge</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1c1c1a]">
            We're Here to Help
          </h1>
          <p className="text-sm sm:text-base text-[#6d6a67]">
            Have a question regarding styling, ring sizing, or custom orders? Reach out to our dedicated concierge team.
          </p>
        </div>

        {/* 2-Column Contact Info and Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-[#e8e8e8] shadow-xs space-y-6">
              <h3 className="font-serif text-2xl font-normal text-[#1c1c1a]">
                Atelier & Studio
              </h3>

              <div className="space-y-4 text-sm text-[#6d6a67]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#b9836a] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1c1c1a] block">Flagship Atelier</strong>
                    <span>458 Broadway, Soho District<br />New York, NY 10013</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#b9836a] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1c1c1a] block">Email Support</strong>
                    <a href="mailto:concierge@pasaava.com" className="hover:text-[#b9836a] transition-colors">
                      concierge@pasaava.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#b9836a] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1c1c1a] block">Response Hours</strong>
                    <span>Monday – Friday: 9am – 6pm EST<br />Average response time: &lt; 2 hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Guarantees Box */}
            <div className="bg-[#1c1c1a] text-white rounded-3xl p-8 shadow-md space-y-4">
              <h4 className="font-serif text-xl font-light text-white">
                The PASAAVA Promise
              </h4>
              <ul className="space-y-2 text-xs text-[#9a9da3] leading-relaxed">
                <li>• 30-Day Hassle-Free Returns & Exchanges</li>
                <li>• Free Ring Resizing Assistance</li>
                <li>• 2-Year Craftsmanship Guarantee Included</li>
              </ul>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#e8e8e8] shadow-sm">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#22c55e]/10 text-[#22c55e] flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-light text-[#1c1c1a]">
                  Message Received
                </h3>
                <p className="text-sm text-[#6d6a67] max-w-md mx-auto">
                  Thank you, <strong className="text-[#1c1c1a]">{formData.name}</strong>. A concierge specialist will respond to <strong className="text-[#1c1c1a]">{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', orderNumber: '', subject: 'General Inquiry', message: '' });
                  }}
                  className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#b9836a] hover:underline"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#1c1c1a]">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Olivia Vance"
                      className="w-full bg-[#fafaf7] border border-[#e8e8e8] rounded-2xl px-4 py-3 text-sm text-[#1c1c1a] focus:outline-none focus:border-[#1c1c1a]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#1c1c1a]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. olivia@example.com"
                      className="w-full bg-[#fafaf7] border border-[#e8e8e8] rounded-2xl px-4 py-3 text-sm text-[#1c1c1a] focus:outline-none focus:border-[#1c1c1a]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#1c1c1a]">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#fafaf7] border border-[#e8e8e8] rounded-2xl px-4 py-3 text-sm text-[#1c1c1a] focus:outline-none focus:border-[#1c1c1a]"
                    >
                      <option value="General Inquiry">General Styling Question</option>
                      <option value="Order Tracking">Order & Shipping Status</option>
                      <option value="Returns">Return or Exchange</option>
                      <option value="Warranty">Warranty & Repair</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#1c1c1a]">
                      Order Number (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.orderNumber}
                      onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                      placeholder="e.g. #PAS-84920"
                      className="w-full bg-[#fafaf7] border border-[#e8e8e8] rounded-2xl px-4 py-3 text-sm text-[#1c1c1a] focus:outline-none focus:border-[#1c1c1a]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#1c1c1a]">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can our concierge team assist you today?"
                    className="w-full bg-[#fafaf7] border border-[#e8e8e8] rounded-2xl p-4 text-sm text-[#1c1c1a] focus:outline-none focus:border-[#1c1c1a]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1c1c1a] text-white py-4 px-6 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-black transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Concierge</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-center text-[#1c1c1a] mb-8">
            Common Inquiries
          </h3>
          <Accordion
            items={faqs.slice(0, 4).map((f, i) => ({
              id: `c-faq-${i}`,
              title: f.question,
              content: <p>{f.answer}</p>
            }))}
          />
        </div>
      </div>
    </div>
  );
};
