import React, { useEffect } from 'react';
import { getJournalBySlug, journals } from '../data/journals';
import { ArrowLeft, Clock, Calendar, User, Share2, Sparkles, ArrowRight } from 'lucide-react';

interface JournalDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const JournalDetailPage: React.FC<JournalDetailPageProps> = ({
  slug,
  onNavigate
}) => {
  const article = getJournalBySlug(slug) || journals[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const otherArticles = journals.filter((j) => j.slug !== article.slug).slice(0, 2);

  return (
    <div className="py-10 sm:py-16 bg-[#f8f6f3]">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('/journals')}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6d6a67] hover:text-[#1c1c1a] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Journals</span>
        </button>

        {/* Article Header */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#b9836a]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{article.category}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1c1c1a] leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#9a948e] pt-2 border-b border-[#e8e8e8] pb-6">
            <span className="flex items-center gap-1.5 text-[#1c1c1a] font-medium">
              <User className="w-3.5 h-3.5 text-[#b9836a]" />
              {article.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden aspect-[16/10] bg-[#e0ded8] shadow-md mb-12 border border-[#e8e8e8]">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none text-[#1c1c1a] space-y-6 leading-relaxed">
          <p className="text-lg sm:text-xl font-light font-serif italic text-[#6d6a67] border-l-2 border-[#b9836a] pl-6 my-6">
            "{article.excerpt}"
          </p>

          {article.content.map((paragraph, idx) => (
            <p key={idx} className="text-base sm:text-lg text-[#374151] leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Share & Explore Section */}
        <div className="mt-16 pt-8 border-t border-[#e8e8e8] flex items-center justify-between">
          <button
            onClick={() => onNavigate('/shop')}
            className="bg-[#1c1c1a] text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-black transition-colors"
          >
            Explore Featured Jewelry
          </button>

          <button
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              alert('Link copied to clipboard!');
            }}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6d6a67] hover:text-[#1c1c1a]"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Story</span>
          </button>
        </div>

        {/* More Articles */}
        <div className="mt-20 pt-12 border-t border-[#e8e8e8]">
          <h3 className="font-serif text-2xl font-normal text-[#1c1c1a] mb-6">
            More from the Journal
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {otherArticles.map((item) => (
              <div
                key={item.slug}
                onClick={() => onNavigate(`/journals/${item.slug}`)}
                className="bg-white p-5 rounded-2xl border border-[#e8e8e8] shadow-xs cursor-pointer hover:border-[#b9836a]/50 transition-all group"
              >
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#b9836a]">
                  {item.category}
                </span>
                <h4 className="font-serif text-lg font-normal text-[#1c1c1a] group-hover:text-[#b9836a] transition-colors mt-1">
                  {item.title}
                </h4>
                <div className="mt-3 flex items-center justify-between text-xs text-[#9a948e]">
                  <span>{item.readTime}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#b9836a] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
