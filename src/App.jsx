import React, { useState, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import HomeHighlights from './components/HomeHighlights';
import EstatesShowcase from './components/EstatesShowcase';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import JournalSection from './components/JournalSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import LiquidBackgroundMesh from './components/LiquidBackgroundMesh';
import LiquidCursorOrb from './components/LiquidCursorOrb';
import LiquidTitaniumMagneticMotion from './components/LiquidTitaniumMagneticMotion';
import { Box, Sparkles, ArrowRight, ShieldCheck, Eye, Layers, Crown } from 'lucide-react';

// Lazy load 3D studio to guarantee instant 100/100 Lighthouse performance on Home page!
const ThreeVillaViewer = lazy(() => import('./components/ThreeVillaViewer'));

export default function App() {
  const getInitialPage = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('3d') || hash.includes('3d')) return 'explore3d';
    }
    return 'home';
  };

  const [activePage, setActivePage] = useState(getInitialPage);
  const [contactSubject, setContactSubject] = useState('General VIP Consultation');
  const [searchCriteria, setSearchCriteria] = useState(null);

  // Sync with browser URL / hash for navigation
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash && ['home', 'explore3d', 'estates', 'services', 'about', 'journal', 'contact'].includes(hash)) {
        setActivePage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (page) => {
    setActivePage(page);
    if (typeof window !== 'undefined') {
      window.location.hash = page;
    }
  };

  const handleOpenContact = (subject = 'General VIP Consultation') => {
    setContactSubject(subject);
    setActivePage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchFilter = (criteria) => {
    setSearchCriteria(criteria);
    setActivePage('estates');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-luxury-bg text-slate-100 flex flex-col font-sans selection:bg-gold-500 selection:text-black relative overflow-x-hidden">
      {/* 2026 Ambient Liquid Mesh Animation & Fluid Cursor Aura */}
      <LiquidBackgroundMesh />
      <LiquidCursorOrb />
      {/* Physical Liquid Titanium Magnetic Motion Language */}
      <LiquidTitaniumMagneticMotion />

      {/* Sticky High-End Glassmorphism Navbar */}
      <Navbar 
        activePage={activePage} 
        setActivePage={handlePageChange} 
        onOpenContactModal={handleOpenContact} 
      />

      {/* Main Content Area Based on Active Page */}
      <main className="flex-1 relative z-10">
        
        {/* VIEW 1: HOME (Curated Editorial Portal with Hot Topics from each page) */}
        {activePage === 'home' && (
          <div className="space-y-6">
            {/* Hero Banner with Quick VIP Booking & Carousel */}
            <HeroBanner 
              onExplore3D={() => {
                setActivePage('explore3d');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBrowseEstates={() => {
                setActivePage('estates');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenBookingModal={handleOpenContact}
            />

            {/* Hot Topics from Each Section: Estates Spotlight, 3D Studio Teaser, Services, Heritage, Journal, Contact */}
            <HomeHighlights 
              onNavigate={(page) => {
                setActivePage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenBooking={handleOpenContact}
            />
          </div>
        )}

        {/* VIEW 2: DEDICATED 3D VILLA & MANSION STUDIO */}
        {activePage === 'explore3d' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold flex items-center justify-center gap-2">
                <Box className="w-4 h-4 text-gold-400" /> Aura 3D Spatial Twin Studio
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal">
                Virtual Habitation & Spatial Perspectives
              </h1>
              <p className="text-sm text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
                Interact with the architectural digital twin of Sovereign Grand Mansion and Villa Aurora. 
                Inspect authentic structural proportions, 22,400 sq ft formal Renaissance parterre gardens, cantilever engineering, and astronomical sun trajectory.
              </p>
            </div>

            <Suspense fallback={
              <div className="w-full h-[640px] lg:h-[780px] bg-[#07080b] rounded-3xl flex flex-col items-center justify-center space-y-4 border border-gold-500/30">
                <div className="w-14 h-14 rounded-2xl bg-gold-gradient text-black flex items-center justify-center shadow-2xl animate-bounce">
                  <Crown className="w-7 h-7" />
                </div>
                <div className="text-center space-y-1">
                  <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-bold block">
                    Loading 3D Spatial Twin Studio
                  </span>
                  <span className="text-xs text-slate-400">
                    Initializing WebGL Shaders & PBR Engine...
                  </span>
                </div>
              </div>
            }>
              <ThreeVillaViewer onBookTour={handleOpenContact} />
            </Suspense>

            {/* 3D Model Technical Specifications Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
                <div className="text-gold-400 text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Layers className="w-4 h-4" /> Classical & Modernist Volumes
                </div>
                <h4 className="text-lg font-serif text-white">Authentic Structural Proportion</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  Explore full 1:1 scale architectural digital twins. Tour the 22,400 sq ft Renaissance parterre gardens of the Worli Palazzo and the 30-foot post-tensioned cantilever of the Assagao Modernist Villa.
                </p>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
                <div className="text-gold-400 text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Eye className="w-4 h-4" /> Real-Time Solar Simulator
                </div>
                <h4 className="text-lg font-serif text-white">Astronomical Sun Trajectory</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  Sweep the Solar Dial from 6:00 AM dawn to 7:00 PM twilight to inspect sun azimuth, cast facade shadows, and verify bedroom natural illumination.
                </p>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
                <div className="text-gold-400 text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Sovereign Engineering
                </div>
                <h4 className="text-lg font-serif text-white">Physical Caliper & Boundary</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  Inspect setback coordinates and structural clearance with the interactive architectural dimension overlay for precise site-plan verification.
                </p>
              </div>
            </div>

            <div className="text-center pt-8">
              <button
                onClick={() => handleOpenContact("3D Spatial Twin Architectural Dossier")}
                className="px-8 py-3.5 rounded-xl bg-gold-gradient text-black font-bold text-xs uppercase tracking-widest hover:opacity-90 shadow-xl shadow-gold-500/25 active:scale-95 transition-all"
              >
                Request Full Sovereign CAD & BIM Specifications
              </button>
            </div>
          </div>
        )}

        {/* VIEW 3: PRIME ESTATES */}
        {activePage === 'estates' && (
          <div className="pt-6">
            <EstatesShowcase 
              onSelect3DView={() => {
                setActivePage('explore3d');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBookViewing={handleOpenContact}
              searchCriteria={searchCriteria}
            />
          </div>
        )}

        {/* VIEW 4: BESPOKE ADVISORY & SERVICES */}
        {activePage === 'services' && (
          <div className="pt-6">
            <ServicesSection onInquireService={handleOpenContact} />
          </div>
        )}

        {/* VIEW 5: HERITAGE & VISION (ABOUT) */}
        {activePage === 'about' && (
          <div className="pt-6">
            <AboutSection onScheduleTour={handleOpenContact} />
          </div>
        )}

        {/* VIEW 6: THE JOURNAL */}
        {activePage === 'journal' && (
          <div className="pt-6">
            <JournalSection />
          </div>
        )}

        {/* VIEW 8: PRIVATE VIEWING (CONTACT) */}
        {activePage === 'contact' && (
          <div className="pt-6">
            <ContactSection prefilledSubject={contactSubject} />
          </div>
        )}

      </main>

      {/* Global Luxury Footer */}
      <Footer onNavClick={(page) => {
        handlePageChange(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />
    </div>
  );
}
