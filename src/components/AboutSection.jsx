import React from 'react';
import { 
  Building2, Globe2, Award, Sparkles, 
  Compass, ShieldCheck, CheckCircle2, MapPin
} from 'lucide-react';

export default function AboutSection({ onScheduleTour }) {
  const offices = [
    { city: "Mumbai", district: "Bandra Kurla Complex & Nariman Point", focus: "Flagship Corporate & Sea-Facing Estates" },
    { city: "New Delhi", district: "Barakhamba Road & Lutyens' Zone", focus: "Capital Region Private Treaty & Bungalows" },
    { city: "Bengaluru", district: "Lavelle Road & UB City", focus: "Aristocratic Mansions & Tech Leadership Estates" },
    { city: "Goa", district: "Assagao & Candolim Promenade", focus: "Luxury Coastal Villas & Holiday Homes" },
    { city: "Dubai (NRI Desk)", district: "DIFC Gate Precinct", focus: "Global Indian Family Offices & Cross-Border Wealth" },
  ];

  const milestones = [
    { year: "2002", title: "Atelier Founded in Mumbai", desc: "Established as a discreet private advisory for prominent Indian business families." },
    { year: "2012", title: "National Metropolitan Expansion", desc: "Set up dedicated private treaty desks in Lutyens' Delhi, Bengaluru, and Goa." },
    { year: "2020", title: "Pioneering Legal Transparency", desc: "Introduced 30-year forensic title audits and RERA legal clearance frameworks." },
    { year: "2026", title: "₹8,500+ Cr Transacted Value", desc: "Over 240 trophy bungalows, sea-facing penthouses, and private estates placed." }
  ];

  return (
    <section className="py-20 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Heritage Story Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold flex items-center gap-2">
              <Compass className="w-3.5 h-3.5" /> Corporate Heritage & Pedigree
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white leading-tight">
              Two Decades of Integrity in Indian Luxury Real Estate.
            </h2>
            <div className="space-y-4 text-slate-300 text-sm leading-relaxed font-light">
              <p>
                Founded on the bedrock of uncompromised legal diligence, absolute discretion, and deep micro-market intelligence, 
                <span className="text-gold-400 font-normal"> SOLIS</span> is India's leading boutique consultancy for ultra-high-net-worth property transactions.
              </p>
              <p>
                We do not deal in generic listings. Every bungalow, sea-facing penthouse, and private villa under our mandate 
                undergoes rigorous 30-year title searches, non-encumbrance verification, and RERA compliance before presentation. 
                Whether advising corporate promoters in Mumbai, diplomatic families in Lutyens' Delhi, or tech entrepreneurs in Bengaluru, 
                we ensure seamless, transparent property acquisitions with institutional rigor.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="glass-panel p-4 rounded-xl border border-white/10 card-buoyancy-hover">
                <div className="text-gold-400 font-sans text-2xl sm:text-3xl font-bold tracking-tight lining-nums">100%</div>
                <div className="text-xs uppercase tracking-wider text-slate-300 mt-1">Title Clearance</div>
                <div className="text-[11px] text-slate-400 mt-0.5">30-year forensic legal verification</div>
              </div>
              <div className="glass-panel p-4 rounded-xl border border-white/10 card-buoyancy-hover">
                <div className="text-gold-400 font-sans text-2xl sm:text-3xl font-bold tracking-tight lining-nums">₹8,500 Cr+</div>
                <div className="text-xs uppercase tracking-wider text-slate-300 mt-1">Completed Transactions</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Across India's most coveted pin codes</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl glass-panel-gold p-3">
              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80"
                alt="Luxury Real Estate Advisory"
                className="w-full h-[440px] object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-2xl" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block">
                  Our Guiding Principle
                </span>
                <p className="font-serif text-lg text-white italic mt-1">
                  "Real estate transactions must stand on absolute legal transparency, fair valuation, and fiduciary trust."
                </p>
                <span className="text-xs text-slate-400 block mt-1">— Advisory Board, SOLIS</span>
              </div>
            </div>
          </div>

        </div>

        {/* Global & Indian Offices Grid */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
              Regional Desks
            </span>
            <h3 className="font-serif text-3xl text-white">
              Advisory Presence Across India's Financial Capitals
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {offices.map((office, idx) => (
              <div key={idx} className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-gold-500/30 transition-all text-center group">
                <MapPin className="w-5 h-5 text-gold-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-serif text-lg text-white">{office.city}</h4>
                <div className="text-xs text-gold-300 font-medium mt-1">{office.district}</div>
                <div className="text-[11px] text-slate-400 mt-2 leading-relaxed">{office.focus}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Chronology & Milestones */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
              Chronology of Distinction
            </span>
            <h3 className="font-serif text-3xl text-white">
              Over Two Decades of Leadership
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative pl-6 border-l border-gold-500/30 space-y-2">
                <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-gold-500 shadow-md shadow-gold-500/50" />
                <div className="font-serif text-2xl text-gold-400 font-bold">{m.year}</div>
                <h5 className="font-medium text-white text-sm">{m.title}</h5>
                <p className="text-xs text-slate-400 leading-relaxed font-light">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
