import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onJoinClick?: () => void;
}

export function Navbar({ activeTab = 'Home', onTabChange, onJoinClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Team', id: 'team' },
    { name: 'Events', id: 'events' },
    { name: 'Join Us', id: 'join' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07020E]/90 backdrop-blur-xl border-b border-purple-900/30 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* ── Left: Exact AWS Student Builder Group Logo from user image ── */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onTabChange?.('Home');
            }}
            className="flex items-center space-x-3 group z-20 cursor-pointer"
          >
            {/* Purple Chip Logo (SVG matching provided user image with fallback image) */}
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 filter drop-shadow-[0_0_12px_rgba(168,85,247,0.4)]">
                {/* 3 top pins */}
                <rect x="14" y="2" width="4" height="6" fill="#A855F7" rx="0.5" />
                <rect x="22" y="2" width="4" height="6" fill="#A855F7" rx="0.5" />
                <rect x="30" y="2" width="4" height="6" fill="#A855F7" rx="0.5" />
                {/* 3 bottom pins */}
                <rect x="14" y="40" width="4" height="6" fill="#A855F7" rx="0.5" />
                <rect x="22" y="40" width="4" height="6" fill="#A855F7" rx="0.5" />
                <rect x="30" y="40" width="4" height="6" fill="#A855F7" rx="0.5" />
                {/* 3 left pins */}
                <rect x="2" y="14" width="6" height="4" fill="#A855F7" rx="0.5" />
                <rect x="2" y="22" width="6" height="4" fill="#A855F7" rx="0.5" />
                <rect x="2" y="30" width="6" height="4" fill="#A855F7" rx="0.5" />
                {/* 3 right pins */}
                <rect x="40" y="14" width="6" height="4" fill="#A855F7" rx="0.5" />
                <rect x="40" y="22" width="6" height="4" fill="#A855F7" rx="0.5" />
                <rect x="40" y="30" width="6" height="4" fill="#A855F7" rx="0.5" />
                {/* Main hollow square frame */}
                <rect x="8" y="8" width="32" height="32" stroke="#A855F7" strokeWidth="6" rx="1" fill="#07020E" />
              </svg>
            </div>
            
            {/* Logo text: AWS Student Builder Group / - GCOEK */}
            <div className="flex flex-col leading-tight">
              <span className="font-heading font-extrabold text-[15px] sm:text-[16px] tracking-tight text-white">
                AWS Student Builder Group
              </span>
              <span className="font-mono text-xs sm:text-[13px] font-bold text-[#FF9900] tracking-wider">
                – GCOEK
              </span>
            </div>
          </a>

          {/* ── Center: Floating Pill Capsule Menu: Home, Team, Events, Join Us ── */}
          <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#180d2d]/85 backdrop-blur-xl border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
              {navLinks.map((link) => {
                const isActive = activeTab.toLowerCase() === link.name.toLowerCase();
                return (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => onTabChange?.(link.name)}
                    className={`relative px-4 sm:px-5 py-1.5 text-xs sm:text-sm font-medium tracking-wide rounded-full transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#291746] text-white border border-[#4e277a] shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                        : 'text-[#9c93af] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Right: Glossy White Pill CTA Button: Join Now! ── */}
          <div className="hidden md:flex items-center space-x-3 z-20">
            <button
              type="button"
              onClick={onJoinClick}
              className="white-pill-btn px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-1.5 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.25)]"
            >
              Join Now!
            </button>
          </div>

          {/* ── Mobile menu button ── */}
          <div className="md:hidden z-20">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-purple-950/40 border border-purple-500/30 text-zinc-300 hover:text-white focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Navigation Drawer ── */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#080212]/95 backdrop-blur-2xl border-b border-purple-500/30 px-6 py-5 shadow-2xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = activeTab.toLowerCase() === link.name.toLowerCase();
              return (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => {
                    onTabChange?.(link.name);
                    setIsOpen(false);
                  }}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium tracking-wide transition-colors ${
                    isActive
                      ? 'bg-purple-600/30 text-white border border-purple-500/40'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  onJoinClick?.();
                  setIsOpen(false);
                }}
                className="white-pill-btn block w-full text-center py-3 rounded-full text-sm font-semibold"
              >
                Join Now!
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
