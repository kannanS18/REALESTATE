import React from 'react';
import { 
  ArrowRight, Box, Compass, Landmark, Building2, 
  Sparkles, ShieldCheck, FileCheck, Key, ChevronRight,
  MapPin, Award, BookOpen, CheckCircle2
} from 'lucide-react';

export default function HomeHighlights({ 
  onNavigate, 
  onOpenBooking 
}) {
  // Top 3 Curated Flagship Indian Estates for the Home Spotlight
  const featuredEstates = [
    {
      id: "sovereign",
      title: "The Sovereign Sea-Face Bungalow",
      location: "Worli Sea Face, Mumbai, Maharashtra",
      price: "₹145.00 Cr",
      specs: "22,400 sq ft • 7 Suites • 10 Baths • Private Lawns",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      badge: "Freehold Seafront Plot"
    },
    {
      id: "aurora",
      title: "Villa Aurora • Modernist Cantilever",
      location: "Assagao, North Goa",
      price: "₹48.50 Cr",
      specs: "14,850 sq ft • 6 Suites • 8 Baths • Infinity Basin",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      badge: "Ready for Possession"
    },
    {
      id: "malabar",
      title: "The Malabar Hill Triplex Penthouse",
      location: "Malabar Hill, South Mumbai, Maharashtra",
      price: "₹95.00 Cr",
      specs: "11,200 sq ft • 5 Suites • 7 Baths • Private Sky Plunge Pool",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      badge: "Queen's Necklace Panorama"
    }
  ];

  // 3 Core Real Estate Advisory Pillars for Home Highlights
  const advisoryPillars = [
    {
      icon: Building2,
      title: "Luxury Residential Acquisitions",
      description: "Confidential search and acquisition advisory for prime bungalows, sea-facing penthouses, and luxury villas across Mumbai, Delhi NCR, Bengaluru, and Goa.",
      highlight: "Direct Owner Negotiations"
    },
    {
      icon: FileCheck,
      title: "Legal Due Diligence & RERA",
      description: "Rigorous 30-year title verification, non-encumbrance scrutiny, municipal plan approvals, and seamless stamp duty conveyance.",
      highlight: "100% Clear Title Assurance"
    },
    {
      icon: Key,
      title: "Exclusive Seller Mandates",
      description: "High-discretion representation for luxury homeowners and promoters, marketing exclusively to vetted Indian industrialists and global NRIs.",
      highlight: "Maximum Price Realization"
    }
  ];

  // Top 2 Real Estate Market Intelligence Briefs
  const journalHighlights = [
    {
      title: "Mumbai & Delhi NCR Luxury Housing Report: The Rise of Prime Coastal Freehold Assets",
      category: "Market Research",
      date: "October 2026",
      readTime: "6 min read",
      snippet: "An analytical study into how Indian corporate leaders and family offices are deploying capital into legacy seafront bungalows and high-ticket penthouses in Worli and Malabar Hill."
    },
    {
      title: "Navigating RERA Due Diligence & Clean Title Verification in High-Ticket Property Purchases",
      category: "Legal & Regulatory",
      date: "September 2026",
      readTime: "5 min read",
      snippet: "Essential guidelines for luxury homebuyers on verifying 30-year search reports, non-encumbrance certificates, and sanctioned plan approvals before transaction closing."
    }
  ];

  return (
    <div className="space-y-24 py-6">
      
      {/* =========================================================================
          SECTION 1: FEATURED ESTATES SPOTLIGHT (HOT TOPIC FROM ESTATES)
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Curated Indian Luxury Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mt-2">
              Featured Flagship Residences
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl font-light mt-1">
              Handpicked luxury bungalows, penthouses, and private estates across India's premier pin codes.
            </p>
          </div>
          <button
            onClick={() => onNavigate('estates')}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-gold-400 hover:text-gold-300 uppercase tracking-widest group"
          >
            <span>View All Estates (6 Available)</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 3-Column Estates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredEstates.map((estate) => (
            <article 
              key={estate.id}
              className={`glass-panel rounded-2xl overflow-hidden border border-white/10 group hover:border-gold-500/40 card-buoyancy-hover flex flex-col ${
                estate.badge.includes('Seafront') || estate.badge.includes('Infinity') ? 'water-surface' : ''
              }`}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={estate.image} 
                  alt={estate.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c12] via-transparent to-black/30" />
                <span className="absolute top-4 left-4 text-[10px] uppercase tracking-wider font-semibold bg-black/70 backdrop-blur-md text-gold-400 px-3 py-1 rounded-full border border-gold-500/30">
                  {estate.badge}
                </span>
                <span className="absolute bottom-3 right-4 font-serif text-xl text-white font-medium lining-nums">
                  {estate.price}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center text-[11px] text-slate-400 gap-1.5">
                    <MapPin className="w-3 h-3 text-gold-400" />
                    <span>{estate.location}</span>
                  </div>
                  <h3 className="font-serif text-xl text-white group-hover:text-gold-300 transition-colors">
                    {estate.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-light mt-1 lining-nums">
                    {estate.specs}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-white/5">
                  <button
                    onClick={() => onNavigate('estates')}
                    className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 transition-colors btn-secondary-physical"
                  >
                    <span>Full Specs</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onOpenBooking(`Private Tour: ${estate.title}`)}
                    className="px-3.5 py-1.5 rounded-lg bg-gold-gradient text-black font-bold text-[11px] uppercase tracking-wider hover:opacity-90 shadow-md shadow-gold-500/20 btn-primary-physical"
                  >
                    Schedule Viewing
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: 3D VIRTUAL ATELIER PREVIEW (HOT TOPIC FROM 3D STUDIO)
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-gold-500/35 liquid-glass p-8 sm:p-12 lg:p-16 shadow-2xl">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
          <div className="absolute -bottom-10 left-10 w-80 h-80 bg-sky-500/10 rounded-full blur-[130px] pointer-events-none animate-fluid-blob-2" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold flex items-center gap-2">
                <Box className="w-4 h-4" /> Interactive 3D Property Studio
              </span>
              
              <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal leading-tight">
                Inspect Luxury Architecture Remotely Before On-Site Visits.
              </h2>
              
              <p className="text-sm text-slate-300 font-light leading-relaxed max-w-xl">
                Explore interactive 60 FPS architectural models of both our <strong className="text-white font-semibold">Worli Sea Face Sovereign Bungalow</strong> and <strong className="text-white font-semibold">Assagao Modernist Villa</strong>. 
                Orbit 360°, inspect sunlight orientation throughout the day, and use <strong>Interior X-Ray Cutaway Mode</strong> to examine room layouts, chandeliers, and staircases.
              </p>

              {/* Feature Badges */}
              <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
                <div className="glass-panel p-3 rounded-xl border border-white/10 text-center">
                  <span className="block text-gold-400 font-bold text-xs uppercase font-mono">60 FPS</span>
                  <span className="text-[10px] text-slate-400">Smooth Orbit</span>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-white/10 text-center">
                  <span className="block text-gold-400 font-bold text-xs uppercase font-mono">X-Ray</span>
                  <span className="text-[10px] text-slate-400">Interior Cutaway</span>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-white/10 text-center">
                  <span className="block text-gold-400 font-bold text-xs uppercase font-mono">Solar</span>
                  <span className="text-[10px] text-slate-400">Sun Orientation</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('explore3d')}
                  className="px-7 py-3.5 rounded-xl bg-gold-gradient text-black font-bold text-xs uppercase tracking-widest hover:opacity-90 shadow-xl shadow-gold-500/25 flex items-center gap-2 btn-primary-physical"
                >
                  <Box className="w-4 h-4" />
                  <span>Launch 3D Property Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('estates')}
                  className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold uppercase tracking-wider border border-white/10 btn-secondary-physical transition-colors"
                >
                  Browse All Properties
                </button>
              </div>
            </div>

            {/* Visual Teaser Right Column */}
            <div className="lg:col-span-5 relative">
              <div className="glass-panel rounded-2xl overflow-hidden border border-gold-500/30 p-2 shadow-2xl relative group card-buoyancy-hover">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" 
                  alt="3D Studio Preview"
                  className="w-full h-72 object-cover rounded-xl"
                  loading="lazy"
                />
                <div className="absolute inset-2 rounded-xl bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2 text-xs font-bold text-gold-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>3D Architectural Walkthrough Active</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Toggle between the Worli Grand Estate and Goa Cantilevered Villa with real-time controls.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: REAL ESTATE SERVICES HIGHLIGHTS (HOT TOPIC FROM SERVICES)
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold flex items-center gap-2">
              <Award className="w-3.5 h-3.5" /> Professional Real Estate Services
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mt-2">
              End-to-End Real Estate Advisory
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl font-light mt-1">
              Verified acquisitions, legal due diligence, exclusive seller mandates, and structured finance across India.
            </p>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-gold-400 hover:text-gold-300 uppercase tracking-widest group btn-secondary-physical"
          >
            <span>Explore All 6 Services</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advisoryPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="glass-panel p-7 rounded-2xl border border-white/10 hover:border-gold-500/40 card-buoyancy-hover flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center border border-gold-500/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl text-white font-normal">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-gold-400 font-mono">
                    {pillar.highlight}
                  </span>
                  <button
                    onClick={() => onNavigate('services')}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>Read Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: HERITAGE & CREDIBILITY EXCERPT (HOT TOPIC FROM ABOUT)
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold flex items-center gap-2">
                <Compass className="w-3.5 h-3.5" /> Track Record & Credibility
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal leading-snug">
                "Transparent transactions, verified titles, and discreet representation for India's finest addresses."
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-2xl">
                Headquartered in Mumbai with dedicated advisory desks across New Delhi, Bengaluru, and Goa, Aura Privé advises industrialists, family offices, and NRI leaders on high-value residential and commercial real estate.
              </p>
              
              <div className="flex flex-wrap gap-8 pt-4">
                <div>
                  <div className="font-serif text-2xl text-gold-400 font-normal lining-nums">₹8,500+ Cr</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">Transacted Value</div>
                </div>
                <div>
                  <div className="font-serif text-2xl text-gold-400 font-normal lining-nums">100%</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">RERA & Title Clear</div>
                </div>
                <div>
                  <div className="font-serif text-2xl text-gold-400 font-normal lining-nums">24+ Years</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">Industry Leadership</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end space-y-3">
              <button
                onClick={() => onNavigate('about')}
                className="px-6 py-3.5 rounded-xl bg-gold-gradient text-black font-bold text-xs uppercase tracking-widest hover:opacity-90 shadow-xl shadow-gold-500/20 btn-primary-physical"
              >
                Learn More About Us →
              </button>
              <span className="text-[11px] text-slate-400">
                Explore our offices, partners & history
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: LATEST JOURNAL DISPATCHES (HOT TOPIC FROM JOURNAL)
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" /> Market Intelligence & Insights
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mt-2">
              Indian Luxury Real Estate Reports
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl font-light mt-1">
              Authoritative market analysis on price trends, regulatory updates, and prime micro-markets.
            </p>
          </div>
          <button
            onClick={() => onNavigate('journal')}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-gold-400 hover:text-gold-300 uppercase tracking-widest group btn-secondary-physical"
          >
            <span>Read All Reports</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {journalHighlights.map((post, idx) => (
            <article 
              key={idx}
              className="glass-panel p-7 rounded-2xl border border-white/10 hover:border-gold-500/40 card-buoyancy-hover transition-all flex flex-col justify-between space-y-4 group cursor-pointer"
              onClick={() => onNavigate('journal')}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="text-gold-400 uppercase tracking-wider font-semibold font-mono">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-serif text-xl text-white group-hover:text-gold-300 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {post.snippet}
                </p>
              </div>

              <div className="pt-2 flex items-center text-xs font-semibold text-gold-400 gap-1.5">
                <span>Read Full Report</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: VIP CONSULTATION BANNER (HOT TOPIC FROM CONTACT)
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gold-500/30 bg-gradient-to-r from-gold-500/10 via-black/60 to-gold-500/10 p-8 sm:p-12 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold block">
            Confidential Consultations Across India
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
            Planning to Acquire or Sell a High-Value Property?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl mx-auto leading-relaxed">
            Connect with our Senior Managing Partners in Mumbai, Delhi, Bengaluru, or Goa for discrete, professional real estate advisory.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={() => onOpenBooking('VIP Property Consultation')}
              className="px-8 py-3.5 rounded-xl bg-gold-gradient text-black font-bold text-xs uppercase tracking-widest hover:opacity-90 shadow-xl shadow-gold-500/25 btn-primary-physical"
            >
              Schedule Private Consultation
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
