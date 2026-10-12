import React, { useEffect, useRef, useState } from 'react';

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Check if pointer device supports fine movement
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check if hovering over clickable or interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = target.closest('button, a, input, select, textarea, [role="button"], .stat-card-image, .team-card');
        setIsHovering(!!isClickable);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Fluid trailing flow loop with smooth linear interpolation
    const animate = () => {
      // 0.16 lerp factor provides a silky, fluid liquid lag behind cursor
      glowX += (mouseX - glowX) * 0.16;
      glowY += (mouseY - glowY) * 0.16;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 select-none ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* ── Flowing Light Purple Ambient Fluid Glow ── */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-none"
      >
        <div
          className={`rounded-full transition-all duration-300 ease-out pointer-events-none ${
            isClicking
              ? 'w-24 h-24 bg-[#9553e6]/40 blur-xl scale-75'
              : isHovering
              ? 'w-48 h-48 bg-gradient-to-r from-[#AC69FF]/35 via-[#9553e6]/30 to-[#7200FF]/35 blur-2xl scale-110'
              : 'w-36 h-36 bg-gradient-to-r from-[#9553e6]/25 via-[#AC69FF]/20 to-[#7200FF]/25 blur-2xl'
          }`}
          style={{
            backgroundColor: 'rgba(149,83,230,0.25)',
            boxShadow: '0 0 45px rgba(149,83,230,0.25)',
          }}
        />
      </div>

      {/* ── Crisp Light Purple Center Spark ── */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-none"
      >
        <div
          className={`rounded-full transition-all duration-150 pointer-events-none ${
            isClicking
              ? 'w-2 h-2 bg-[#E9D5FF] shadow-[0_0_12px_#AC69FF]'
              : isHovering
              ? 'w-3.5 h-3.5 bg-white border border-[#AC69FF] shadow-[0_0_20px_#AC69FF]'
              : 'w-2.5 h-2.5 bg-[#AC69FF] shadow-[0_0_12px_#9553e6]'
          }`}
        />
      </div>
    </div>
  );
}
