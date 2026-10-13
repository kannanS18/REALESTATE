import React, { useState } from 'react';
import { 
  ArrowRight, Box, Compass, Sparkles, ShieldCheck, 
  ChevronRight, MapPin, Building2, Crown, ExternalLink,
  Layers, Check
} from 'lucide-react';
import { ESTATES } from '../data/estatesData';

/**
 * HeroBanner - Architectural Ultra-Luxury Editorial Hero
 * Redesigned in unison by the Council of Brothers:
 * - Brother 4 (Taste Director): Removed aggressive in-your-face booking form. Replaced with quiet wealth breathing room.
 * - Brother 1 (Senior UI/UX Craftsman): Monumental editorial typography + Interactive flagship portfolio carousel + Discreet VIP private treaty triggers.
 * - Brother 2 & 6 (Physics & Motion): Liquid titanium sheen & tactile magnetic card elevation.
 * - Brother 3 (RERA Integrity): Verified ₹ Crores, RERA credentials, and title transparency.
 */
export default function HeroBanner({ onExplore3D, onBrowseEstates, onOpenBookingModal }) {
  const [selectedEstateIndex, setSelectedEstateIndex] = useState(0);
  const currentEstate = ESTATES[selectedEstateIndex] || ESTATES[0];

  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Background Architectural Grid & Subtle Radial Atmosphere */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(212, 175, 55, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(212, 175, 55, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[700px] h-[450px] bg-gold-500/[0.06] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-12 w-[450px] h-[450px] bg-cyan-500/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Editorial Grid: Left Architectural Manifesto + Right Flagship Portfolio Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Architectural Editorial Manifesto & Discreet Triggers (ZERO forced sale forms) */}
          <div className="lg:col-span-6 space-y-7">
            
            {/* RERA & Accolade Quiet Micro-Badge */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-gold-500/30 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] font-medium text-gold-300">
                Private Treaty Atelier • RERA Registered
              </span>
            </div>

            {/* Monumental Architectural Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.06]">
              Architectural Sovereignty. <br />
              <span className="italic font-light text-gold-400 gold-glow">Curated Across India.</span>
            </h1>

            {/* Editorial Statement */}
            <p className="font-sans text-xs sm:text-sm lg:text-base text-slate-300 font-light leading-relaxed max-w-xl">
              Aura Privé discreetly brokers India's rarest architectural landmarks — from coastal promontories in Assagao to sea-facing heritage estates on Worli Sea Face. We deliver complete legal title sovereignty, architectural spatial digital twins, and uncompromised discretion.
            </p>

            {/* Discreet VIP Action Triggers: Elegant Exploration without Pressure */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExplore3D}
                className="px-6 py-3.5 bg-gold-gradient text-black rounded-xl text-xs font-bold uppercase tracking-widest hover:opacity-90 shadow-xl shadow-gold-500/20 flex items-center space-x-2.5 btn-primary-physical"
              >
                <Box className="w-4 h-4" />
                <span>Enter 3D Spatial Twin Studio</span>
              </button>

              <button
                onClick={onBrowseEstates}
                className="px-6 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white border border-white/15 hover:border-gold-500/40 rounded-xl text-xs font-semibold tracking-wider flex items-center space-x-2 btn-secondary-physical backdrop-blur-md"
              >
                <span>Browse Private Portfolio</span>
                <ChevronRight className="w-4 h-4 text-gold-400" />
              </button>
            </div>

            {/* Discreet Confidential Consultation Trigger (Opens Modal on User Will, Not Forcing Form) */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>Confidential Off-Market Acquisition Desk</span>
              </div>
              <button
                onClick={() => onOpenBookingModal && onOpenBookingModal('Confidential Private Treaty Inquiry')}
                className="text-gold-400 hover:text-white font-mono text-[11px] underline underline-offset-4 flex items-center gap-1 transition-colors"
              >
                <span>Request Private Treaty Dossier</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Flagship Estate Showcase */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden glass-panel-gold border border-gold-500/40 shadow-2xl p-3 sm:p-4 group card-buoyancy-hover">
              
              {/* Primary Architectural Visual */}
              <div className="relative h-80 sm:h-[440px] w-full rounded-2xl overflow-hidden">
                <img
                  src={currentEstate.image}
                  alt={currentEstate.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Film Noir Vignette & Glass Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/30" />

                {/* Top Status & Price Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-bold text-gold-400 border border-gold-500/40 uppercase tracking-widest flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5 text-gold-400" />
                    <span>FLAGSHIP COLLECTION • {currentEstate.status}</span>
                  </span>

                  <span className="bg-black/85 backdrop-blur-md px-4 py-1.5 rounded-xl font-serif text-base sm:text-lg font-bold text-white border border-white/15 lining-nums">
                    {currentEstate.priceFormatted}
                  </span>
                </div>

                {/* Interactive 3D Launch Pill (If 3D Model Available) */}
                {currentEstate.id === 'villa-aurora' && (
                  <button
                    onClick={onExplore3D}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-2.5 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform btn-primary-physical"
                  >
                    <Box className="w-4 h-4" />
                    <span>Launch 3D Interactive Spatial Twin</span>
                  </button>
                )}

                {/* Bottom Architectural Details */}
                <div className="absolute bottom-4 left-4 right-4 space-y-2 pointer-events-none">
                  <div className="text-xs uppercase tracking-widest text-gold-400 font-semibold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gold-400" /> {currentEstate.location}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight">
                    {currentEstate.title}
                  </h3>
                  
                  {/* Architectural Specs Ribbon */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-200 pt-1 font-mono">
                    <span className="bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10 lining-nums">
                      {currentEstate.specs.sqft.toLocaleString()} SQ FT
                    </span>
                    <span className="bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10 lining-nums">
                      {currentEstate.specs.beds} SUITES
                    </span>
                    <span className="bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10 lining-nums">
                      {currentEstate.specs.baths} BATHS
                    </span>
                    <span className="bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10 lining-nums">
                      {currentEstate.specs.garage} CARS
                    </span>
                  </div>
                </div>
              </div>

              {/* 2026 Architectural Landmark Switcher: Elegant Pagination & Controls (No horizontal scrollbar) */}
              <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                    Landmark {selectedEstateIndex + 1} of {Math.min(ESTATES.length, 4)}:
                  </span>
                  <span className="text-xs text-gold-400 font-serif font-medium hidden sm:inline">
                    {currentEstate.title}
                  </span>
                </div>

                {/* Micro-Progress Segment Bars + Prev/Next Controls */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1.5">
                    {ESTATES.slice(0, 4).map((estate, idx) => (
                      <button
                        key={estate.id}
                        onClick={() => setSelectedEstateIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          selectedEstateIndex === idx
                            ? 'w-7 bg-gold-gradient shadow-sm shadow-gold-500/50'
                            : 'w-2 bg-white/20 hover:bg-white/40'
                        }`}
                        title={estate.title}
                      />
                    ))}
                  </div>

                  <div className="flex items-center space-x-1 pl-2 border-l border-white/10">
                    <button
                      onClick={() => setSelectedEstateIndex((prev) => (prev > 0 ? prev - 1 : 3))}
                      className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
                      title="Previous Estate"
                    >
                      <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                    </button>
                    <button
                      onClick={() => setSelectedEstateIndex((prev) => (prev < 3 ? prev + 1 : 0))}
                      className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
                      title="Next Estate"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Global Performance Benchmarks Ribbon */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { metric: "₹8,500 Cr+", label: "Transacted Volume", sub: "Verified luxury private sales" },
            { metric: "100%", label: "Title Verified", sub: "RERA clear & non-encumbered" },
            { metric: "4 Hubs", label: "Metro Presence", sub: "Mumbai, Delhi, Bengaluru, Goa" },
            { metric: "24+ Years", label: "Industry Standing", sub: "Advisory to sovereign families" }
          ].map((item, idx) => (
            <div key={idx} className="glass-panel p-4 rounded-xl border border-white/[0.06] text-center hover:border-gold-500/30 transition-all card-buoyancy-hover">
              <div className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-gold-400 lining-nums">{item.metric}</div>
              <div className="text-xs uppercase tracking-wider text-slate-200 mt-0.5 font-semibold">{item.label}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{item.sub}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
