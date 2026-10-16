import React, { useState } from 'react';
import { 
  ShieldCheck, Send, PhoneCall, Mail, MapPin, 
  Sparkles, CheckCircle2, Lock, Calendar, Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactSection({ prefilledSubject }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    modality: '3D Spatial VR Consultation',
    preferredDate: '',
    interest: prefilledSubject || 'General Private Treaty Inquiry',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const modalities = [
    'Private On-Site Property Inspection',
    'Interactive 3D Virtual Walkthrough',
    'Senior Partner Office Consultation (BKC / Barakhamba)',
    'Confidential Legal & Title Due Diligence Review'
  ];

  const sanitizeInput = (str) => {
    return str.replace(/[<>]/g, '').trim();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Input validation
    const cleanName = sanitizeInput(formData.name);
    const cleanEmail = sanitizeInput(formData.email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanName || cleanName.length < 2) {
      setErrorMsg('Please provide a valid representative name.');
      return;
    }

    if (!emailRegex.test(cleanEmail)) {
      setErrorMsg('Please provide an authentic email address.');
      return;
    }

    // Trigger VIP celebration
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#f0d588', '#ffffff']
    });

    setSubmitted(true);
  };

  return (
    <section className="py-20 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold flex items-center justify-center gap-2">
            <Lock className="w-3.5 h-3.5" /> Confidential Engagement
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
            Schedule a Private Consultation
          </h2>
          <p className="text-sm text-slate-300 font-light leading-relaxed">
            All appointments are conducted with sovereign discretion. Connect with our principal partners 
            for private estate tours, exclusive mandates, or RERA title verification dossiers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Direct Concierge & Protocols */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
              <h3 className="font-serif text-2xl text-white">The Principal Advisory Desk</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Direct coordination for family offices, business leaders, NRI investors, and high-net-worth property buyers.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3 text-xs text-slate-300">
                  <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block">Mumbai Headquarters</span>
                    <span className="text-slate-400">The Capital, Level 14, Bandra Kurla Complex (BKC), Mumbai 400051</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-xs text-slate-300">
                  <PhoneCall className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block">Principal Advisory Line</span>
                    <span className="text-slate-400">+91 (022) 6988 5000 (Mumbai Direct)</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-xs text-slate-300">
                  <Mail className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block">Encrypted Desk</span>
                    <span className="text-slate-400">advisory@solisestates.in</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-2">
                <div className="flex items-center space-x-2 text-xs text-gold-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-semibold">RERA Registered & Non-Disclosure Protocol</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Strict client confidentiality guaranteed. Title audits and transaction records are handled under strict NDA protocols.
                </p>
              </div>
            </div>

            {/* Response Time Guarantee */}
            <div className="glass-panel-gold p-5 rounded-2xl border border-gold-500/30 flex items-center space-x-4">
              <Clock className="w-6 h-6 text-gold-400 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-white block">Under 2-Hour Response Time</span>
                <span className="text-[11px] text-slate-300">Dedicated Senior Real Estate Partner assigned immediately.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel-gold p-8 sm:p-10 rounded-3xl border border-gold-500/30 shadow-2xl">
              
              {submitted ? (
                <div className="text-center py-12 space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-gold-gradient text-black flex items-center justify-center mx-auto shadow-xl shadow-gold-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl text-white">Consultation Dossier Dispatched</h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-gold-400 font-semibold">{formData.name}</span>. 
                    Our Managing Advisory Desk has received your request regarding 
                    <span className="text-gold-400"> {formData.interest}</span>. A Senior Partner will connect with you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        modality: 'Private On-Site Property Inspection',
                        preferredDate: '',
                        interest: 'General Private Treaty Inquiry',
                        notes: ''
                      });
                    }}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs uppercase font-semibold tracking-wider transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl text-white">Private Treaty Consultation</h3>
                    <p className="text-xs text-slate-400">Direct transmission to the SOLIS Managing Desk.</p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-200 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Representative Name */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-slate-300 font-semibold">
                        Representative / Family Office Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lord Alexander Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-500/60"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-slate-300 font-semibold">
                        Official Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="vance@familyoffice.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-500/60"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone / Signal */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-slate-300 font-semibold">
                        Phone / Direct Line
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98200 12345"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-500/60"
                      />
                    </div>

                    {/* Preferred Date */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-slate-300 font-semibold">
                        Desired Consultation Date
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500/60 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Modality Selector */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-slate-300 font-semibold">
                      Preferred Viewing Modality
                    </label>
                    <select
                      value={formData.modality}
                      onChange={(e) => setFormData({ ...formData, modality: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500/60 cursor-pointer"
                    >
                      {modalities.map((m, idx) => (
                        <option key={idx} value={m} className="bg-[#12141a]">
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Estate of Interest */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-slate-300 font-semibold">
                      Specific Property / Service of Interest
                    </label>
                    <input
                      type="text"
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500/60"
                    />
                  </div>

                  {/* Notes */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-slate-300 font-semibold">
                      Confidential Notes / Acquisition Specifications
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify requirements such as freehold title audit, NRI repatriation advisory, site inspection logistics, or custom NDA requirements..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-500/60"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gold-gradient text-black rounded-xl text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 shadow-xl shadow-gold-500/20"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmit Confidential Request</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
