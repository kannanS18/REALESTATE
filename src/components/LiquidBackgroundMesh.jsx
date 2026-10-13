import React from 'react';

/**
 * LiquidBackgroundMesh - 2026 Fluid Mesh Blobs & Refractive Prism Field
 * Provides ambient liquid motion beneath glass panels without heavy WebGL overhead.
 */
export default function LiquidBackgroundMesh() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Liquid Blob 1 - Warm Royal Gold */}
      <div 
        className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] rounded-full blur-[140px] opacity-25 animate-fluid-blob-1"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.35) 0%, rgba(184, 144, 37, 0.15) 50%, transparent 75%)'
        }}
      />

      {/* Liquid Blob 2 - Oceanic Azure Prism */}
      <div 
        className="absolute top-[35%] -right-[15%] w-[50vw] h-[50vw] rounded-full blur-[150px] opacity-20 animate-fluid-blob-2"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.28) 0%, rgba(99, 102, 241, 0.12) 55%, transparent 80%)'
        }}
      />

      {/* Liquid Blob 3 - Deep Platinum Radiance */}
      <div 
        className="absolute -bottom-[20%] left-[25%] w-[60vw] h-[60vw] rounded-full blur-[160px] opacity-20 animate-fluid-blob-1"
        style={{
          background: 'radial-gradient(circle, rgba(240, 213, 136, 0.22) 0%, rgba(20, 24, 35, 0.5) 60%, transparent 80%)',
          animationDuration: '26s'
        }}
      />

      {/* Subtle Specular Refraction Noise Grain */}
      <div 
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
