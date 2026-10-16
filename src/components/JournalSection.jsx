import React, { useState } from 'react';
import { 
  BookOpen, Calendar, Clock, User, 
  ArrowRight, Sparkles, Search, X
} from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/journalData';

export default function JournalSection() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Market Intelligence', 'Legal & Title Diligence', 'Design & Architecture'];

  const filteredArticles = JOURNAL_ARTICLES.filter(art => {
    const matchesCat = activeCategory === 'All' || art.category === activeCategory || 
      (activeCategory === 'Market Intelligence' && art.category === 'Market Intelligence') ||
      (activeCategory === 'Legal & Title Diligence' && art.id.includes('rera')) ||
      (activeCategory === 'Design & Architecture' && (art.category === 'Design Philosophy' || art.category === 'Architectural Theory'));
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section className="py-20 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" /> Curated Real Estate Intelligence
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
              The Solis Journal & Market Research
            </h2>
            <p className="text-sm text-slate-400 max-w-xl font-light">
              Authoritative research papers on Indian luxury micro-markets, Lutyens' capital preservation, RERA jurisprudence, and prime rental yields.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search essays..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-gold-500/50"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-gold-500 text-black font-semibold shadow-md shadow-gold-500/20'
                  : 'glass-panel text-slate-300 hover:text-white hover:border-gold-500/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-gold-500/40 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold-500/10"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold text-gold-400 border border-gold-500/30 uppercase tracking-widest">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gold-400" /> {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold-400" /> {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-white font-normal group-hover:text-gold-300 transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <div className="flex items-center justify-between border-t border-white/5 pt-4 text-xs">
                  <span className="text-slate-400 font-light">By {article.author}</span>
                  <span className="text-gold-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read Essay <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* VIP Journal Dispatch Subscription */}
        <div className="mt-16 glass-panel-gold p-8 rounded-3xl border border-gold-500/30 text-center max-w-3xl mx-auto space-y-4">
          <Sparkles className="w-6 h-6 text-gold-400 mx-auto" />
          <h3 className="font-serif text-3xl text-white">Receive The Confidential Quarterly Dossier</h3>
          <p className="text-xs text-slate-300 max-w-lg mx-auto font-light">
            Privileged global market data, unlisted architectural transactions, and curatorial retrospectives delivered directly to your desk.
          </p>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you. Your address has been added to the private quarterly registry.");
            }}
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2"
          >
            <input
              type="email"
              required
              placeholder="familyoffice@domain.com"
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-gold-500/60"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl glass-panel-gold rounded-3xl overflow-hidden border border-gold-500/40 shadow-2xl max-h-[85vh] flex flex-col">
            
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-white/10 flex justify-between items-start">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
                  {selectedArticle.category} • {selectedArticle.date}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mt-1 leading-snug">
                  {selectedArticle.title}
                </h3>
                <div className="text-xs text-slate-400 mt-2">
                  Written by {selectedArticle.author} ({selectedArticle.readTime})
                </div>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold-500 hover:text-black flex items-center justify-center text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-sm text-slate-200 leading-relaxed font-light whitespace-pre-line">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
              {selectedArticle.content}
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-white/10 text-right bg-black/40">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2 rounded-xl bg-gold-500 text-black text-xs font-bold uppercase tracking-wider"
              >
                Close Essay
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
