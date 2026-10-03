import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Star, ShieldCheck, Check, Droplets } from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { Ticker } from '../components/Ticker';
import { ProductCard } from '../components/ProductCard';
import { GenderSplitSection } from '../components/GenderSplitSection';
import { BrandStorySection } from '../components/BrandStorySection';
import { CustomerSpotlightSection } from '../components/CustomerSpotlightSection';
import { NewsletterSection } from '../components/NewsletterSection';
import { Accordion } from '../components/Accordion';
import { products, getFeaturedProducts, getNewArrivals } from '../data/products';
import { faqs } from '../data/faqs';
import { Product } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface HomePageProps {
  onQuickView: (product: Product) => void;
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onQuickView,
  onNavigate
}) => {
  const { formatPrice } = useCurrency();
  const bestSellers = getFeaturedProducts();
  const newArrivals = getNewArrivals();

  const [activeTab, setActiveTab] = useState<'All' | 'Chains' | 'Bracelets' | 'Rings' | 'Earrings'>('All');

  const exploreProducts = activeTab === 'All'
    ? products.slice(0, 8)
    : products.filter(p => p.category.toLowerCase().includes(activeTab.toLowerCase())).slice(0, 8);

  const testimonials = [
    {
      author: 'Marcus Vance',
      role: 'Architect & Collector',
      comment: 'The weight, beveled edge polish, and solid surgical steel feel of the Atlas Cuban Chain easily rival bespoke jewelry houses five times the price.',
      stars: 5,
      product: 'Atlas Cuban Chain'
    },
    {
      author: 'Alexander Cole',
      role: 'Creative Director & Horologist',
      comment: 'Finally, men\'s jewelry that actually survives daily showers, heavy gym workouts, and travel without green discoloration. PASAAVA is unmatched.',
      stars: 5,
      product: 'Titan Link Bracelet'
    },
    {
      author: 'Noah Bennett',
      role: 'Industrial Designer',
      comment: 'The Atlas Signet Ring and Knox Rope Bracelet feel indestructible. The precision tolerances and clasps are pure luxury horology quality.',
      stars: 5,
      product: 'Atlas Signet Ring'
    }
  ];

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <HeroSection onNavigate={onNavigate} />

      {/* 2. Brand Ticker */}
      <Ticker />

      {/* 3. Best Sellers: Our Most Loved Designs */}
      <section className="py-20 md:py-28 bg-[#f8f6f3]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#b9836a]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Customer Favorites</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1c1c1a]">
                Our Most Loved Hardware
              </h2>
              <p className="text-sm sm:text-base text-[#6d6a67] max-w-lg">
                The iconic signatures defining the PASAAVA aesthetic. Engineered to be worn on repeat.
              </p>
            </div>

            <button
              onClick={() => onNavigate('/men-category/men-bestsellers')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1c1c1a] hover:text-[#b9836a] transition-colors group self-start md:self-auto cursor-pointer"
            >
              <span>Explore Best Sellers</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Grid Layout with Highlight Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onNavigate={(slug) => onNavigate(`/product/${slug}`)}
              />
            ))}
          </div>

          {/* Featured Editorial Banner Card */}
          <div className="mt-12 bg-[#1c1c1a] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 hidden md:block">
              <img
                src="/images/hero-masculine-atelier.jpg"
                alt="PASAAVA Men's Icons"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="max-w-xl space-y-4 relative z-10">
              <span className="text-xs uppercase tracking-widest text-[#b9836a] font-semibold">
                The Icons of PASAAVA
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light leading-snug">
                Engineered to catch the light. Crafted to endure every season.
              </h3>
              <p className="text-sm text-[#9a9da3] leading-relaxed">
                Discover our signature men's pieces crafted from waterproof surgical steel, titanium, and 18K gold PVD with a 2-Year Craftsmanship Guarantee.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/shop')}
                  className="inline-flex items-center gap-2 bg-white text-[#1c1c1a] px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#fafaf7] hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  <span>Explore Full Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Men's Flagship Hardware Categories */}
      <GenderSplitSection onNavigate={onNavigate} />

      {/* 5. New Arrivals: Latest Obsessions */}
      <section className="py-20 md:py-28 bg-[#f8f6f3]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#b9836a]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>New Season Drop</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1c1c1a]">
                Our Latest Drops
              </h2>
              <p className="text-sm sm:text-base text-[#6d6a67] max-w-lg">
                Fresh architectural silhouettes, chiseled signets, and dense spiral rope hardware just introduced into the studio.
              </p>
            </div>

            <button
              onClick={() => onNavigate('/men-category/men-newarrivals')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1c1c1a] hover:text-[#b9836a] transition-colors group self-start md:self-auto cursor-pointer"
            >
              <span>View All New Drops</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onNavigate={(slug) => onNavigate(`/product/${slug}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Brand Story & Craftsmanship */}
      <BrandStorySection onNavigate={onNavigate} />

      {/* 7. Explore More Products: Dynamic Tabbed Showcase */}
      <section className="py-20 md:py-28 bg-[#fafaf7] border-t border-[#e8e8e8]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#b9836a]">
              Curated Catalog
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1c1c1a]">
              Discover Your Signature
            </h2>
            <p className="text-sm sm:text-base text-[#6d6a67]">
              Filter across categories and discover the hardware that defines your personal presence.
            </p>

            {/* Category Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {(['All', 'Chains', 'Bracelets', 'Rings', 'Earrings'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-[#1c1c1a] text-white shadow-sm'
                      : 'bg-white border border-[#e0e0e0] text-[#6d6a67] hover:border-[#1c1c1a] hover:text-[#1c1c1a]'
                  }`}
                >
                  {tab === 'All' ? 'Show All' : tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {exploreProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onNavigate={(slug) => onNavigate(`/product/${slug}`)}
              />
            ))}
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={() => onNavigate('/shop')}
              className="inline-flex items-center gap-2.5 bg-[#1c1c1a] text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
            >
              <span>Explore All 25 Men's Pieces</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. Editorial Press & Customer Quotes Slider */}
      <section className="py-20 md:py-28 bg-[#16181c] text-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#b9836a]">
              Verified Reviews
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal">
              Tested by Modern Men
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#232529] p-8 rounded-3xl border border-[#2a2c30] flex flex-col justify-between space-y-6 relative group hover:border-[#b9836a]/50 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex text-[#d4af37]">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="font-serif text-base sm:text-lg font-light italic leading-relaxed text-white/90">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-semibold text-white">{t.author}</h4>
                    <p className="text-[#9a9da3]">{t.role}</p>
                  </div>
                  <span className="text-[11px] text-[#b9836a] font-medium bg-[#b9836a]/10 px-2.5 py-1 rounded-full">
                    {t.product}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Customer Spotlight: Community Gallery */}
      <CustomerSpotlightSection onNavigate={onNavigate} />

      {/* 10. Frequently Asked Questions */}
      <section className="py-20 md:py-28 bg-[#fafaf7] border-t border-[#e8e8e8]">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#b9836a]">
              Help & Clarity
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1c1c1a]">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-[#6d6a67]">
              Everything you need to know about our men's sizing, waterproof materials, and 2-Year guarantee.
            </p>
          </div>

          <Accordion
            items={faqs.map((faq, idx) => ({
              id: `faq-${idx}`,
              title: faq.question,
              content: <p className="leading-relaxed">{faq.answer}</p>,
              defaultOpen: idx === 0
            }))}
            allowMultiple={false}
          />
        </div>
      </section>

      {/* 11. Newsletter Subscription */}
      <NewsletterSection />
    </div>
  );
};
