
'use client';

import React, { useEffect, useState, useRef } from 'react';

/**
 * @fileOverview A high-performance interactive background component.
 * Renders an animated mesh gradient that subtly reacts to mouse movement.
 */
export function InteractiveBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate position as percentage of window
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-[#0a0a0a]"
      aria-hidden="true"
    >
      {/* Primary Interactive Gradient */}
      <div 
        className="absolute inset-0 opacity-40 transition-transform duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Ambient Moving Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] animate-blob" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px] animate-blob [animation-delay:2s]" />
      <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-violet-600/5 blur-[100px] animate-blob [animation-delay:4s]" />

      {/* Subtle Dot Overlay for Texture */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      
      {/* Noise Texture for extra premium feel */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
