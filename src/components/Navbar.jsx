import React, { useState } from 'react';
import { 
  Building2, Globe2, Sparkles, Menu, X, ArrowUpRight
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage, onOpenContactModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState('INR');

  // Professional, concise, high-end luxury nav labels that never wrap
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'explore3d', label: '3D Villa' },
    { id: 'estates', label: 'Estates' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'Heritage' },
    { id: 'journal', label: 'Journal' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-[#08090b]/75 border-b border-white/[0.12] shadow-2xl transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Atelier Branding */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3.5 group text-left shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0B0D13] border border-gold-500/40 flex items-center justify-center p-1.5 shadow-lg shadow-gold-500/20 group-hover:border-gold-400 transition-all">
              <img src={`${(import.meta.env.BASE_URL || '/').replace(/\/$/, '')}/favicon.svg`} alt="SOLIS" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-[0.25em] font-medium text-white group-hover:text-gold-400 transition-colors uppercase whitespace-nowrap">
                SOLIS
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-gold-400/80 font-sans whitespace-nowrap">
                Luxury Real Estate India
              </span>
            </div>
          </button>

          {/* Desktop Nav Links - Professional, sleek, no wrap */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 shrink-0">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 lg:px-4 py-2 rounded-lg text-xs tracking-[0.18em] uppercase whitespace-nowrap transition-all duration-200 relative ${
                    isActive 
                      ? 'text-gold-400 font-semibold bg-white/[0.06] shadow-sm' 
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gold-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Currency Switcher & VIP Action */}
          <div className="hidden sm:flex items-center space-x-3 shrink-0">
            {/* Currency Selector */}
            <div className="flex items-center space-x-1.5 text-xs text-slate-300 bg-white/[0.04] px-2.5 py-1.5 rounded-lg border border-white/[0.08]">
              <Globe2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer text-xs font-mono"
              >
                <option value="INR" className="bg-[#12141a] text-white">INR (₹ Cr)</option>
                <option value="USD" className="bg-[#12141a] text-white">USD ($)</option>
                <option value="AED" className="bg-[#12141a] text-white">AED (د.إ)</option>
                <option value="GBP" className="bg-[#12141a] text-white">GBP (£)</option>
              </select>
            </div>

            {/* Direct CTA */}
            <button
              onClick={() => onOpenContactModal('Private Consultation')}
              className="px-4 py-2 rounded-xl bg-gold-gradient text-black font-semibold text-xs tracking-wider uppercase btn-primary-physical flex items-center space-x-1.5 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Private Viewing</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/[0.08] space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-1.5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-3.5 py-2.5 rounded-lg text-xs font-medium tracking-wider uppercase whitespace-nowrap ${
                    activePage === link.id
                      ? 'bg-gold-500 text-black font-bold'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="pt-3 border-t border-white/[0.08] flex justify-between items-center px-1">
              <span className="text-xs text-slate-400">Currency</span>
              <span className="text-xs font-semibold text-gold-400">{currency}</span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContactModal('Mobile VIP Booking');
              }}
              className="w-full py-3 rounded-xl bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider text-center"
            >
              Book Private Viewing
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
