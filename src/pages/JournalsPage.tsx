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
    <div className="pt-24 pb-12 sm:py-20 bg-white text-[#111111]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#111111]">
            The PASAAVA Journal
          </h1>
          <p className="text-sm sm:text-base text-[#6B6B6B] leading-relaxed">
            Curated men's style guides, chain layering tutorials, and engineering stories exploring the architecture of modern masculine luxury.
          </p>
        </div>

        {/* Featured Editorial Post */}
        {featuredArticle && (
          <div
            onClick={() => onNavigate(`/journals/${featuredArticle.slug}`)}
            className="mb-16 bg-[#F5F5F5] rounded-3xl overflow-hidden border border-[#E5E5E5] shadow-xs grid grid-cols-1 lg:grid-cols-12 cursor-pointer group hover:border-[#111111] transition-all"
          >
            <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden bg-[#F3F3F3]">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-[#111111]">
                  <span>{featuredArticle.category}</span>
                  <span>•</span>
                  <span className="text-[#6B6B6B] flex items-center gap-1 font-normal lowercase">
                    <Clock className="w-3 h-3" />
                    {featuredArticle.readTime}
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#111111] group-hover:text-[#333333] transition-colors leading-tight">
                  {featuredArticle.title}
                </h2>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E5E5] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#111111]">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#111111]" />
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
              className="bg-[#F5F5F5] rounded-3xl overflow-hidden border border-[#E5E5E5] shadow-xs cursor-pointer group flex flex-col justify-between hover:border-[#111111] transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#F3F3F3]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-[#6B6B6B]">
                    <span className="font-semibold uppercase tracking-wider text-[#111111]">
                      {article.category}
                    </span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl font-normal text-[#111111] group-hover:text-[#333333] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#6B6B6B] line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E5E5] flex items-center justify-between text-xs font-medium text-[#6B6B6B] group-hover:text-[#111111]">
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
