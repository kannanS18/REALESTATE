import React, { useEffect, useRef } from 'react';

/**
 * LiquidCursorOrb - 2026 Interactive Refractive Liquid Glass Pointer Aura
 * Tracks mouse physics smoothly with spring easing and ambient organic morphing.
 */
export default function LiquidCursorOrb() {
  const orbRef = useRef(null);
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationFrameId;
    const updatePosition = () => {
      // Fluid spring dampening (smooth organic follow)
      pos.current.x += (mouse.current.x - pos.current.x) * 0.08;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.08;

      if (orbRef.current) {
        orbRef.current.style.transform = `translate3d(${pos.current.x - 220}px, ${pos.current.y - 220}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {/* Floating Ambient Fluid Spheres */}
      <div 
        ref={orbRef}
        className="absolute w-[440px] h-[440px] rounded-full opacity-35 blur-[120px] transition-opacity duration-1000 will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.25) 0%, rgba(240,213,136,0.12) 40%, rgba(30,144,255,0.06) 70%, transparent 100%)',
        }}
      />
    </div>
  );
}
