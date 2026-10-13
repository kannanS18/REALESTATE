import React from 'react';
import { 
  Building2, FileCheck, Landmark, Key, 
  ShieldCheck, Banknote, ArrowRight, Award, CheckCircle2
} from 'lucide-react';

export default function ServicesSection({ onInquireService }) {
  const services = [
    {
      icon: Building2,
      title: "Luxury Residential Acquisitions",
      subtitle: "Bespoke Home Search & Buyer Advisory",
      description: "Comprehensive acquisition advisory for high-net-worth individuals, industrialists, and family offices seeking prime villas, luxury penthouses, and heritage bungalows across Mumbai, Delhi NCR, Bengaluru, and Goa. We handle confidential sourcing, on-ground inspections, and optimal price negotiations.",
      features: [
        "Off-Market & Pre-Launch Exclusive Access",
        "Direct Seller & Promoter Negotiations",
        "Comparative Market Value Appraisal & Yield Analysis"
      ]
    },
    {
      icon: Key,
      title: "Exclusive Seller Representation",
      subtitle: "Strategic Marketing & Mandate Sales",
      description: "Dedicated representation for property owners and promoters looking to sell premier luxury real estate. We manage private, qualified buyer screenings, high-definition architectural photography, and targeted outreach to vetted corporate leaders and NRIs without compromising discretion.",
      features: [
        "Targeted HNI & Global NRI Buyer Network",
        "Discreet Off-Market Mandate Representation",
        "Complete Negotiation & Transaction Closing"
      ]
    },
    {
      icon: FileCheck,
      title: "Legal Due Diligence & RERA Compliance",
      subtitle: "Clear Title Search, Conveyance & Sanctions",
      description: "Complete legal verification conducted by senior property advocates before you commit capital. We verify 30-year title track records, non-encumbrance certificates, RERA project approvals, sanctioned building plans, and local municipal clearances to ensure 100% risk-free transactions.",
      features: [
        "30-Year Comprehensive Title Search Reports",
        "RERA Registration & Sanctioned Plan Audits",
        "Stamp Duty, Registration & Conveyance Deed Drafting"
      ]
    },
    {
      icon: Landmark,
      title: "HNI Mortgage & Structured Finance",
      subtitle: "Private Banking & High-Ticket Home Loans",
      description: "Direct liaison with senior wealth management and private banking desks at leading Indian and multinational financial institutions (HDFC, ICICI, Kotak, Standard Chartered). We structure low-interest high-ticket home loans, loan against property (LAP), and customized repayment schedules.",
      features: [
        "Preferential Interest Rates for High-Ticket Portfolios",
        "Fast-Track Sanction & Doorstep Documentation",
        "Tax-Efficient Debt & Capital Gains Advisory"
      ]
    },
    {
      icon: Banknote,
      title: "Prime Luxury Leasing & Tenancy",
      subtitle: "Corporate Expatriate & Consular Leasing",
      description: "Connecting prime homeowners with vetted multinational CXOs, consulates, and leading corporate enterprises. We formulate robust lease deeds, verify tenant credentials, oversee security deposit escrows, and ensure seamless renewal and inventory handovers.",
      features: [
        "Vetted Expatriate & Corporate Leadership Tenants",
        "Airtight Legal Lease Agreement Drafting",
        "Timely Rent Remittance & Deposit Management"
      ]
    },
    {
      icon: ShieldCheck,
      title: "Comprehensive Property Management",
      subtitle: "Turnkey Asset Care for Absentee Owners & NRIs",
      description: "End-to-end property care and facility maintenance for second-home owners, holiday villas, and overseas NRI clients. From routine maintenance, utility bill settlements, and society liaison to periodic property health audits, we preserve and enhance your property's long-term capital value.",
      features: [
        "Quarterly Inspection Reports with Photographic Audits",
        "Property Tax & Society Maintenance Clearance",
        "Dedicated Relationship Manager & NRI Support Desk"
      ]
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-black/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold flex items-center justify-center gap-2">
            <Award className="w-3.5 h-3.5" /> Professional Real Estate Advisory
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
            Comprehensive Real Estate Services
          </h2>
          <p className="text-sm text-slate-300 font-light leading-relaxed">
            From verified property acquisitions and title legal scrutiny to high-yield leasing and wealth management, our advisory delivers transparent, end-to-end real estate solutions across India.
          </p>
        </div>

        {/* Services 3-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-gold-500/40 card-buoyancy-hover flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-gold-gradient/10 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-gold-400 font-semibold block">
                      {srv.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl text-white font-normal mt-1 group-hover:text-gold-300 transition-colors">
                      {srv.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {srv.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    {srv.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5">
                  <button
                    onClick={() => onInquireService && onInquireService(`Service Inquiry: ${srv.title}`)}
                    className="inline-flex items-center space-x-2 text-xs font-semibold text-gold-400 hover:text-gold-300 group-hover:translate-x-1 transition-all uppercase tracking-wider"
                  >
                    <span>Consult Our Specialists</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legal & Regulatory Integrity Banner */}
        <div className="mt-16 glass-panel-gold p-8 rounded-3xl border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold flex items-center justify-center sm:justify-start gap-2">
              <ShieldCheck className="w-4 h-4" /> 100% Legal & RERA Compliant Transactions
            </span>
            <h4 className="font-serif text-2xl text-white font-normal">
              Direct Representation with Absolute Due Diligence
            </h4>
            <p className="text-xs text-slate-300 max-w-xl font-light">
              Every property marketed or represented by Aura Privé undergoes exhaustive legal title scrutiny, municipal clearance audits, and RERA compliance verification.
            </p>
          </div>
          <button
            onClick={() => onInquireService && onInquireService('Legal Advisory & Title Verification')}
            className="px-6 py-3.5 rounded-xl bg-gold-gradient text-black font-bold text-xs uppercase tracking-widest hover:opacity-90 shrink-0 shadow-lg shadow-gold-500/20"
          >
            Speak With Our Legal Desk
          </button>
        </div>

      </div>
    </section>
  );
}
