import React from 'react';
import GraphifyProjectMap from './components/GraphifyProjectMap';
import LiquidBackgroundMesh from './components/LiquidBackgroundMesh';
import LiquidCursorOrb from './components/LiquidCursorOrb';
import LiquidTitaniumMagneticMotion from './components/LiquidTitaniumMagneticMotion';
import { Brain, ExternalLink, Network, ShieldCheck, Activity, Layers, ArrowLeft } from 'lucide-react';

export default function App() {
  const mainSiteUrl = 'https://kannans18.github.io/REALESTATE/';

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-pink-500 selection:text-white">
      {/* Background Ambience */}
      <LiquidBackgroundMesh />
      <LiquidCursorOrb />
      <LiquidTitaniumMagneticMotion />

      {/* Dedicated Intelligence Navigation Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-[#08090b]/85 border-b border-white/[0.12] shadow-2xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Branding */}
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0B0D13] border border-pink-500/40 flex items-center justify-center p-2 shadow-lg shadow-pink-500/20">
                <Brain className="w-full h-full text-pink-400" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-lg tracking-[0.2em] font-medium text-white uppercase whitespace-nowrap">
                    Aura Privé
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    GRAPHIFY CORE
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-[0.25em] text-slate-400 font-sans">
                  Personal Knowledge & Swarm Hub
                </span>
              </div>
            </div>

            {/* Status Pills & Link to Main Demo */}
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Claude-Mem Synced</span>
              </div>

              <a
                href={mainSiteUrl}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
              >
                <span>Live Demo Site</span>
                <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
              </a>
            </div>

          </div>
        </div>
      </header>

      {/* Main Container: Strictly Graphify & Claude-Mem Knowledge System */}
      <main className="relative z-10 py-6">
        <GraphifyProjectMap />
      </main>

      {/* Dedicated Clean Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#06080c]/80 py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-pink-400" />
            <span className="font-mono text-slate-400">Aura Privé Private Architecture Intelligence</span>
          </div>
          <div className="text-slate-500 font-mono text-[11px]">
            Personal Developer Branch (sabu) • 12-Brother Consensus Fleet • Cross-Session Claude-Mem
          </div>
          <a
            href={mainSiteUrl}
            className="text-gold-400 hover:text-gold-300 text-xs font-sans tracking-wider uppercase transition-colors"
          >
            ← Return to Public Real Estate
          </a>
        </div>
      </footer>
    </div>
  );
}
