import React, { useState } from 'react';
import { 
  Building2, Bed, Bath, Maximize, Calendar, 
  ArrowUpRight, Box, ShieldCheck, Heart, Sparkles, Filter
} from 'lucide-react';
import { ESTATES } from '../data/estatesData';

export default function EstatesShowcase({ onSelect3DView, onBookViewing, searchCriteria }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedEstateModal, setSelectedEstateModal] = useState(null);
  const [savedFavorites, setSavedFavorites] = useState([]);

  const categories = ['All', 'Modernist', 'Waterfront', 'Penthouses', 'Historic Estates'];

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setSavedFavorites(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Filter estates based on activeCategory or searchCriteria
  const filteredEstates = ESTATES.filter(estate => {
    if (activeCategory !== 'All' && estate.category !== activeCategory) {
      return false;
    }
    if (searchCriteria) {
      if (searchCriteria.location !== 'All' && !estate.location.toLowerCase().includes(searchCriteria.location.toLowerCase())) {
        return false;
      }
      if (searchCriteria.category !== 'All' && estate.category !== searchCriteria.category) {
        return false;
      }
      if (searchCriteria.budget === 'tier1' && (estate.price < 25000000 || estate.price > 40000000)) {
        return false;
      }
      if (searchCriteria.budget === 'tier2' && (estate.price < 40000000 || estate.price > 60000000)) {
        return false;
      }
      if (searchCriteria.budget === 'tier3' && estate.price < 60000000) {
        return false;
      }
    }
    return true;
  });

  return (
    <section className="py-20 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Curated Portfolio 2026
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
              Signature Architectural Monoliths
            </h2>
            <p className="text-sm text-slate-400 max-w-xl font-light">
              Each residence in our collection represents a milestone in engineering, privacy, and biophilic luxury. 
              Available via private treaty and authenticated discrete channels.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-medium btn-secondary-physical ${
                  activeCategory === cat
                    ? 'bg-gold-500 text-black font-semibold shadow-md shadow-gold-500/20'
                    : 'glass-panel text-slate-300 hover:text-white hover:border-gold-500/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Estates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEstates.map((estate) => {
            const isFav = savedFavorites.includes(estate.id);
            return (
              <div
                key={estate.id}
                onClick={() => setSelectedEstateModal(estate)}
                className="group glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-gold-500/40 card-buoyancy-hover flex flex-col cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative h-72 w-full overflow-hidden">
                  <img
                    src={estate.image}
                    alt={estate.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-gold-400 border border-gold-500/30 uppercase tracking-widest">
                      {estate.status}
                    </span>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => toggleFavorite(estate.id, e)}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:text-gold-400 btn-secondary-physical transition-colors"
                    aria-label="Save to favorites"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-gold-400 text-gold-400' : ''}`} />
                  </button>

                  {/* 3D Launch Badge if it's the 3D model */}
                  {estate.id === 'villa-aurora' && (
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-gold-500 text-black px-3 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 shadow-lg">
                        <Box className="w-3.5 h-3.5" /> Interactive 3D Model Available
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gold-400 font-medium">
                      {estate.location}
                    </div>
                    <h3 className="font-serif text-2xl text-white font-normal mt-1 group-hover:text-gold-300 transition-colors">
                      {estate.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                      {estate.description}
                    </p>
                  </div>

                  {/* Architectural Specs Ribbon */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-semibold text-slate-200 lining-nums">{estate.specs.beds} Suites</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">Bedrooms</span>
                    </div>
                    <div className="flex flex-col items-center border-x border-white/5">
                      <span className="text-xs font-semibold text-slate-200 lining-nums">{estate.specs.baths} Baths</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">Bathrooms</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-semibold text-slate-200 lining-nums">{estate.specs.sqft.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">Sq Ft</span>
                    </div>
                  </div>

                  {/* Bottom Price & Action */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400">Offered At</div>
                      <div className="font-serif text-xl text-white font-medium lining-nums">{estate.priceFormatted}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {estate.id === 'villa-aurora' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelect3DView && onSelect3DView();
                          }}
                          className="p-2 rounded-xl bg-gold-gradient text-black hover:opacity-90 btn-primary-physical transition-opacity"
                          title="Open 3D Model"
                        >
                          <Box className="w-4 h-4" />
                        </button>
                      )}
                      <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-slate-300 group-hover:border-gold-400 group-hover:text-gold-400 transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredEstates.length === 0 && (
          <div className="text-center py-16 glass-panel rounded-2xl border border-white/10">
            <p className="text-slate-300 font-serif text-xl">No residences match your specific filter.</p>
            <button
              onClick={() => setActiveCategory('All')}
              className="mt-4 px-6 py-2 rounded-xl bg-gold-500 text-black text-xs uppercase font-bold tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Estate Detail Modal */}
      {selectedEstateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl glass-panel-gold rounded-3xl overflow-hidden border border-gold-500/40 shadow-2xl max-h-[90vh] flex flex-col">
            
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-80 w-full">
              <img
                src={selectedEstateModal.image}
                alt={selectedEstateModal.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedEstateModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-gold-500 hover:text-black transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-gold-400 border border-gold-500/40 uppercase tracking-widest">
                  {selectedEstateModal.category} • {selectedEstateModal.status}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
                    {selectedEstateModal.location}
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal mt-1">
                    {selectedEstateModal.title}
                  </h3>
                  <div className="text-xs text-slate-400 mt-1">
                    Architect: <span className="text-slate-200">{selectedEstateModal.architect}</span>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-xs uppercase tracking-wider text-slate-400">Acquisition Price</div>
                  <div className="font-serif text-2xl sm:text-3xl text-gold-400 font-medium">
                    {selectedEstateModal.priceFormatted}
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {selectedEstateModal.description}
              </p>

              {/* Architectural Highlights */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-gold-400 font-semibold">
                  Curated Architectural Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedEstateModal.highlights.map((h, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-slate-200 bg-white/5 p-3 rounded-xl border border-white/5">
                      <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                {selectedEstateModal.id === 'villa-aurora' && (
                  <button
                    onClick={() => {
                      setSelectedEstateModal(null);
                      onSelect3DView && onSelect3DView();
                    }}
                    className="flex-1 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-gold-500/30 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 btn-secondary-physical"
                  >
                    <Box className="w-4 h-4 text-gold-400" />
                    <span>Launch 3D Spatial Twin</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    const estateTitle = selectedEstateModal.title;
                    setSelectedEstateModal(null);
                    onBookViewing && onBookViewing(`Acquisition Inquiry: ${estateTitle}`);
                  }}
                  className="flex-1 py-3.5 rounded-xl bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 btn-primary-physical flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Request Confidential Dossier</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
