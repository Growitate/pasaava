import React from 'react';
import { motion } from 'framer-motion';
import { journals } from '../data/journals';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';

interface JournalsPageProps {
  onNavigate: (path: string) => void;
}

export const JournalsPage: React.FC<JournalsPageProps> = ({ onNavigate }) => {
  const featuredArticle = journals[0];
  const remainingArticles = journals.slice(1);

  return (
    <div className="py-12 sm:py-20 bg-[#f8f6f3]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#b9836a]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Editorial & Styling</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1c1c1a]">
            The PASAAVA Journal
          </h1>
          <p className="text-sm sm:text-base text-[#6d6a67] leading-relaxed">
            Curated men's style guides, chain layering tutorials, and engineering stories exploring the architecture of modern masculine luxury.
          </p>
        </div>

        {/* Featured Editorial Post */}
        {featuredArticle && (
          <div
            onClick={() => onNavigate(`/journals/${featuredArticle.slug}`)}
            className="mb-16 bg-white rounded-3xl overflow-hidden border border-[#e8e8e8] shadow-md grid grid-cols-1 lg:grid-cols-12 cursor-pointer group hover:border-[#b9836a]/50 transition-all"
          >
            <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden bg-[#e0ded8]">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-[#b9836a]">
                  <span>{featuredArticle.category}</span>
                  <span>•</span>
                  <span className="text-[#9a948e] flex items-center gap-1 font-normal lowercase">
                    <Clock className="w-3 h-3" />
                    {featuredArticle.readTime}
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1c1c1a] group-hover:text-[#b9836a] transition-colors leading-tight">
                  {featuredArticle.title}
                </h2>
                <p className="text-sm text-[#6d6a67] leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#f0f0f0] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1c1c1a]">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#b9836a]" />
              </div>
            </div>
          </div>
        )}

        {/* 3-Column Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {remainingArticles.map((article) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => onNavigate(`/journals/${article.slug}`)}
              className="bg-white rounded-3xl overflow-hidden border border-[#e8e8e8] shadow-xs cursor-pointer group flex flex-col justify-between hover:shadow-md hover:border-[#b9836a]/40 transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#e0ded8]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-[#9a948e]">
                    <span className="font-semibold uppercase tracking-wider text-[#b9836a]">
                      {article.category}
                    </span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl font-normal text-[#1c1c1a] group-hover:text-[#b9836a] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#6d6a67] line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#f0f0f0] flex items-center justify-between text-xs font-medium text-[#1c1c1a] group-hover:text-[#b9836a]">
                  <span>{article.date}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
