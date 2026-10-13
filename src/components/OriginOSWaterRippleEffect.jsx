import React, { useEffect, useRef } from 'react';

/**
 * OriginOSWaterRippleEffect - Physical Micro-Mesh Grid Fluid Waves
 * 
 * Recreates the tactile physics of OriginOS 6 fluid glass:
 * 1. Microscopic Fluid Grid: Divs are simulated as 2D heightmaps of microscopic sub-pixel cells (squares).
 * 2. Physical 2D Wave Equation: Discrete wave propagation across heightmap buffers.
 * 3. Optical Specular Refraction: Normal slopes generate natural water surface refraction
 *    (crystal light glints and depth shadows) without cheesy colored rings.
 * 4. Contiguous Medium Transmission: Energy propagates to nearby sibling cards and divs
 *    within proximity with physical distance falloff, so users feel the natural tactile connection.
 */
export default function OriginOSWaterRippleEffect() {
  const activeSimulations = useRef(new Map());

  useEffect(() => {
    // Transmit kinetic wave impulse to adjacent elements within radius
    const transmitToNearbyElements = (originX, originY, sourceEl, maxDist = 320) => {
      try {
        const sourceRect = sourceEl.getBoundingClientRect();
        const centerX = sourceRect.left + originX;
        const centerY = sourceRect.top + originY;

        // Query all interactive cards and elements on page
        const candidateElements = document.querySelectorAll(
          '.glass-panel, .glass-panel-gold, .liquid-glass, .card-buoyancy-hover, article, .estate-card'
        );

        candidateElements.forEach((el) => {
          if (el === sourceEl || !el.isConnected) return;
          const rect = el.getBoundingClientRect();
          const elCenterX = rect.left + rect.width / 2;
          const elCenterY = rect.top + rect.height / 2;

          const dist = Math.hypot(centerX - elCenterX, centerY - elCenterY);
          if (dist < maxDist && dist > 10) {
            // Distance-weighted elastic wave impulse
            const factor = Math.pow(1 - dist / maxDist, 1.8);
            const impulseY = -3.5 * factor; // Upward buoyant ripple displacement
            
            // Soft organic spring transition
            el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            el.style.transform = `translateY(${impulseY}px)`;

            setTimeout(() => {
              if (el.isConnected) {
                el.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
                el.style.transform = '';
              }
            }, 220);
          }
        });
      } catch (err) {
        // Safe fail-safe for edge DOM queries
      }
    };

    // 2D Micro-Mesh Fluid Wave Simulation on clicked element
    const spawnMicroGridFluidRipple = (clientX, clientY, targetEl) => {
      if (!targetEl) return;

      // Find primary container (button, card, glass panel, or interactive element)
      const container = targetEl.closest(
        'button, .btn-primary-physical, .btn-secondary-physical, .glass-panel, .glass-panel-gold, .liquid-glass, .card-buoyancy-hover, article, [role="button"]'
      ) || targetEl.closest('div');

      if (!container || !container.getBoundingClientRect) return;

      const rect = container.getBoundingClientRect();
      if (rect.width < 10 || rect.height < 10) return;

      const clickX = clientX - rect.left;
      const clickY = clientY - rect.top;

      // Also transmit contiguous kinetic wave to nearby sibling divs!
      transmitToNearbyElements(clickX, clickY, container);

      // If container already has an active simulation, inject new perturbation
      if (activeSimulations.current.has(container)) {
        const existing = activeSimulations.current.get(container);
        if (existing && existing.addDisturbance) {
          existing.addDisturbance(clickX, clickY);
        }
        return;
      }

      // Create an ultra-crisp physical fluid canvas layer inside the container
      const canvas = document.createElement('canvas');
      canvas.className = 'origin-water-fluid-mesh pointer-events-none';
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '25';
      canvas.style.mixBlendMode = 'overlay';
      canvas.style.opacity = '0.9';

      const computedStyle = window.getComputedStyle(container);
      canvas.style.borderRadius = computedStyle.borderRadius || '1rem';

      if (computedStyle.position === 'static') {
        container.style.position = 'relative';
      }
      const prevOverflow = container.style.overflow;
      container.style.overflow = 'hidden';
      container.appendChild(canvas);

      // Sub-pixel microscopic grid scale (each cell is ~3.5px)
      // Forms a seamless continuous liquid membrane to the human eye
      const gridScale = 3.5;
      const cols = Math.max(16, Math.floor(rect.width / gridScale));
      const rows = Math.max(16, Math.floor(rect.height / gridScale));

      canvas.width = cols;
      canvas.height = rows;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const size = cols * rows;
      // Double buffer Float32Array heightmaps for discrete 2D Laplace wave simulation
      let buffer1 = new Float32Array(size);
      let buffer2 = new Float32Array(size);

      const addDisturbance = (x, y, radius = 5, strength = 220) => {
        const gridX = Math.floor((x / rect.width) * cols);
        const gridY = Math.floor((y / rect.height) * rows);

        for (let r = -radius; r <= radius; r++) {
          for (let c = -radius; c <= radius; c++) {
            const curX = gridX + c;
            const curY = gridY + r;
            if (curX >= 0 && curX < cols && curY >= 0 && curY < rows) {
              const dist = Math.hypot(c, r);
              if (dist <= radius) {
                const idx = curY * cols + curX;
                buffer1[idx] += Math.cos((dist / radius) * (Math.PI / 2)) * strength;
              }
            }
          }
        }
      };

      // Initial tap splash at contact point
      addDisturbance(clickX, clickY);

      let animId;
      let frameCount = 0;
      const maxFrames = 72; // ~1.2s realistic natural water damping
      const damping = 0.962; // Viscous friction of water

      const simulateAndRender = () => {
        frameCount++;

        // 1. Solve 2D wave equation on microscopic grid
        // u(t+1) = (u_left + u_right + u_top + u_bottom) / 2 - u(t-1)
        for (let y = 1; y < rows - 1; y++) {
          const rowOffset = y * cols;
          for (let x = 1; x < cols - 1; x++) {
            const idx = rowOffset + x;
            const waveHeight = (
              (buffer1[idx - 1] + buffer1[idx + 1] + buffer1[idx - cols] + buffer1[idx + cols]) * 0.5
            ) - buffer2[idx];

            buffer2[idx] = waveHeight * damping;
          }
        }

        // Ping-Pong buffer swap
        const temp = buffer1;
        buffer1 = buffer2;
        buffer2 = temp;

        // 2. Render optical surface normal refraction (specular highlight + subtle depth)
        const imgData = ctx.createImageData(cols, rows);
        const data = imgData.data;

        for (let y = 1; y < rows - 1; y++) {
          const rowOffset = y * cols;
          for (let x = 1; x < cols - 1; x++) {
            const idx = rowOffset + x;
            const pixelIdx = idx * 4;

            // Finite difference gradients for physical surface slope
            const dX = buffer1[idx + 1] - buffer1[idx - 1];
            const dY = buffer1[idx + cols] - buffer1[idx - cols];

            // Specular refraction displacement intensity
            const intensity = Math.max(-140, Math.min(140, (dX + dY) * 0.85));

            if (Math.abs(intensity) > 0.4) {
              if (intensity > 0) {
                // Specular crest: pure crystalline light refraction
                data[pixelIdx] = 255;
                data[pixelIdx + 1] = 255;
                data[pixelIdx + 2] = 255;
                data[pixelIdx + 3] = Math.min(220, intensity * 2.2);
              } else {
                // Wave trough: soft optical refraction depth shadow
                data[pixelIdx] = 20;
                data[pixelIdx + 1] = 28;
                data[pixelIdx + 2] = 45;
                data[pixelIdx + 3] = Math.min(180, -intensity * 1.5);
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);

        if (frameCount < maxFrames) {
          animId = requestAnimationFrame(simulateAndRender);
        } else {
          // Graceful cleanup when water returns to calm equilibrium
          if (canvas.parentNode === container) {
            container.removeChild(canvas);
          }
          container.style.overflow = prevOverflow;
          activeSimulations.current.delete(container);
        }
      };

      animId = requestAnimationFrame(simulateAndRender);

      activeSimulations.current.set(container, {
        addDisturbance,
        cancel: () => cancelAnimationFrame(animId)
      });
    };

    const handlePointerDown = (e) => {
      // Ignore right clicks or secondary touches
      if (e.button !== undefined && e.button !== 0) return;
      spawnMicroGridFluidRipple(e.clientX, e.clientY, e.target);
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      activeSimulations.current.forEach(sim => sim.cancel && sim.cancel());
      activeSimulations.current.clear();
    };
  }, []);

  return null;
}
