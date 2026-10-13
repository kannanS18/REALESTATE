import React from 'react';
import { Sparkles, Shield, Globe2, ArrowUp } from 'lucide-react';

export default function Footer({ onNavClick }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050608] border-t border-white/10 pt-16 pb-12 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          
          {/* Atelier Brand Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-gold-gradient flex items-center justify-center text-black font-serif font-bold text-base">
                A
              </div>
              <span className="font-serif text-xl tracking-[0.2em] font-medium text-white">
                AURA PRIVÉ
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-light">
              India's premier luxury real estate advisory and private treaty mandate desk. 
              Representing landmark bungalows, sea-facing penthouses, and private estates across Mumbai, Delhi NCR, Bengaluru, and Goa.
            </p>
            <div className="flex items-center space-x-2 text-gold-400 text-[11px]">
              <Shield className="w-3.5 h-3.5" />
              <span>RERA Registered & 30-Year Title Search Audited</span>
            </div>
          </div>

          {/* Navigation Directory */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold">Atelier Portfolio</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavClick('home')} className="hover:text-gold-400 transition-colors">
                  Atelier Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('explore3d')} className="hover:text-gold-400 transition-colors">
                  3D Villa Studio
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('estates')} className="hover:text-gold-400 transition-colors">
                  Luxury Residences
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('services')} className="hover:text-gold-400 transition-colors">
                  Real Estate Services
                </button>
              </li>
            </ul>
          </div>

          {/* Curatorial & Press */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold">Intelligence</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavClick('journal')} className="hover:text-gold-400 transition-colors">
                  Market Research & Journal
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('about')} className="hover:text-gold-400 transition-colors">
                  Heritage & Advisory Pedigree
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('contact')} className="hover:text-gold-400 transition-colors">
                  Private Desk
                </button>
              </li>
              <li>
                <span className="text-slate-500">MahaRERA & RERA Compliant</span>
              </li>
            </ul>
          </div>

          {/* Indian Metro Desks */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold">Advisory Desks</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-light">
              Mumbai (BKC) • New Delhi (Barakhamba) • Bengaluru (Lavelle Rd) • Goa (Assagao) • Dubai (NRI Desk)
            </p>
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all text-[11px]"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3 h-3 text-gold-400" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Regulatory */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 Aura Privé Luxury Real Estate Advisory India Pvt. Ltd. All Rights Reserved.
          </div>
          <div className="flex space-x-6">
            <span>RERA Verification Mandate</span>
            <span>AML / KYC Compliant</span>
            <span>Terms of Private Treaty</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
