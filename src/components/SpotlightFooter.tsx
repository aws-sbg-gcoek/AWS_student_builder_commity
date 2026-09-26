import React, { useState, useRef, useEffect } from 'react';
import { 
  Github, Linkedin, Youtube, Twitter, Mail, MapPin, 
  Clock, ArrowUp, Sparkles, Send, CheckCircle2, MessageSquare
} from 'lucide-react';

export function SpotlightFooter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [containerMousePos, setContainerMousePos] = useState({ x: 500, y: 150 });
  const [textMousePos, setTextMousePos] = useState({ x: 400, y: 60 });
  const [isHovered, setIsHovered] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Track mouse coordinates relative to both container and text element
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    if (textRef.current) {
      const textRect = textRef.current.getBoundingClientRect();
      setTextMousePos({
        x: e.clientX - textRect.left,
        y: e.clientY - textRect.top,
      });
    }
    setIsHovered(true);
  };

  // Track touch coordinates for mobile and tablet devices
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!e.touches[0]) return;
    const touch = e.touches[0];
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerMousePos({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
    }
    if (textRef.current) {
      const textRect = textRef.current.getBoundingClientRect();
      setTextMousePos({
        x: touch.clientX - textRect.left,
        y: touch.clientY - textRect.top,
      });
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Subtle idle breathing animation when mouse is not active
  useEffect(() => {
    if (isHovered) return;
    let frameId: number;
    let angle = 0;
    const animate = () => {
      angle += 0.02;
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth || 1000;
        const height = containerRef.current.offsetHeight || 300;
        setContainerMousePos({
          x: width / 2 + Math.sin(angle) * (width * 0.35),
          y: height / 2 + Math.cos(angle * 1.5) * 40,
        });
      }
      if (textRef.current) {
        const textWidth = textRef.current.offsetWidth || 800;
        const textHeight = textRef.current.offsetHeight || 120;
        setTextMousePos({
          x: textWidth / 2 + Math.sin(angle) * (textWidth * 0.35),
          y: textHeight / 2 + Math.cos(angle * 1.5) * 20,
        });
      }
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isHovered]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setIsSubscribed(false);
    }, 3500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#000000] text-white border-t border-purple-950/60 overflow-hidden select-none">
      
      {/* ─── 1. TOP HERO SECTION: INTERACTIVE MOUSE-TRACKING VIOLET SPOTLIGHT OVER "AWS COMMUNITY" ─── */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchMove}
        onTouchMove={handleTouchMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative w-full pt-14 pb-12 sm:pt-20 sm:pb-18 px-3 sm:px-6 lg:px-8 overflow-hidden cursor-crosshair border-b border-purple-950/40 bg-gradient-to-b from-[#07020E] via-[#020005] to-[#000000]"
      >
        {/* Dynamic Interactive Violet Spotlight Glow overlay behind the letters */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 380px at ${containerMousePos.x}px ${containerMousePos.y}px, rgba(168, 85, 247, 0.35), rgba(124, 58, 237, 0.15) 45%, transparent 75%)`
          }}
        />

        {/* Subtle grid mesh overlay for high-tech aesthetic */}
        <div className="absolute inset-0 bg-hero-grid opacity-20 pointer-events-none" />

        {/* Ambient Top Glow Tag */}
        <div className="text-center relative z-10 mb-4 sm:mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-[11px] sm:text-xs font-mono backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-[#4EF35E]" />
            <span>TOUCH OR HOVER TO ACTIVATE VIOLET SPOTLIGHT</span>
          </div>
        </div>

        {/* Large Typography: "AWS COMMUNITY" - Clearly visible and perfectly responsive */}
        <div 
          ref={textRef}
          className="relative w-full max-w-6xl mx-auto flex items-center justify-center text-center px-1 sm:px-4 py-2 sm:py-4"
        >
          {/* Layer 1: Base Clearly Visible Metallic Violet/White Text */}
          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-[88px] xl:text-[108px] font-black tracking-tight leading-none select-none uppercase text-zinc-400/80 filter drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] transition-colors whitespace-nowrap">
            AWS COMMUNITY
          </h2>

          {/* Layer 2: Glowing Electric Violet Spotlight Revealed Text (Masked to cursor coordinates) */}
          <h2 
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center text-3xl sm:text-5xl md:text-7xl lg:text-[88px] xl:text-[108px] font-black tracking-tight leading-none select-none uppercase pointer-events-none text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-300 to-[#C084FC] filter drop-shadow-[0_0_35px_rgba(168,85,247,1)] whitespace-nowrap"
            style={{
              maskImage: `radial-gradient(circle 260px at ${textMousePos.x}px ${textMousePos.y}px, black 40%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle 260px at ${textMousePos.x}px ${textMousePos.y}px, black 40%, transparent 100%)`,
            }}
          >
            AWS COMMUNITY
          </h2>
        </div>

        {/* Sub-label */}
        <div className="text-center relative z-10 mt-4">
          <p className="text-xs sm:text-sm font-mono text-zinc-400 tracking-wider">
            GOVERNMENT COLLEGE OF ENGINEERING, KOLHAPUR • STUDENT BUILDER GROUP
          </p>
        </div>
      </div>

      {/* ─── 2. MAIN FOOTER CONTENT: MULTI-COLUMN LAYOUT (PURE BLACK) ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* ── LEFT COLUMN (Cols 1-4): Logo, About & Social Media Icons ── */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 filter drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]">
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
                  {/* Main square frame */}
                  <rect x="8" y="8" width="32" height="32" stroke="#A855F7" strokeWidth="6" rx="1" fill="#000000" />
                </svg>
              </div>
              
              <div className="flex flex-col leading-tight">
                <span className="font-heading font-extrabold text-base tracking-tight text-white">
                  AWS Student Builder Group
                </span>
                <span className="font-mono text-xs font-bold text-[#FF9900] tracking-wider">
                  – GCOEK
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              Empowering undergraduate engineering students with real-world cloud architectures, serverless microservices, and Generative AI on AWS.
            </p>

            {/* Horizontal row of social media icons: LinkedIn, GitHub, YouTube, Discord, X/Twitter */}
            <div>
              <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-3">
                CONNECT WITH THE COMMUNITY
              </div>
              <div className="flex items-center space-x-2.5">
                
                {/* LinkedIn */}
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-xl bg-[#110524] border border-purple-500/25 flex items-center justify-center text-zinc-400 hover:text-white hover:border-purple-400 hover:bg-purple-900/40 hover:scale-110 transition-all cursor-pointer shadow-sm"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                {/* GitHub */}
                <a 
                  href="https://github.com/AWSCloudClubGCOE" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="GitHub"
                  className="w-9 h-9 rounded-xl bg-[#110524] border border-purple-500/25 flex items-center justify-center text-zinc-400 hover:text-white hover:border-purple-400 hover:bg-purple-900/40 hover:scale-110 transition-all cursor-pointer shadow-sm"
                >
                  <Github className="w-4 h-4" />
                </a>

                {/* YouTube */}
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-xl bg-[#110524] border border-purple-500/25 flex items-center justify-center text-zinc-400 hover:text-white hover:border-purple-400 hover:bg-purple-900/40 hover:scale-110 transition-all cursor-pointer shadow-sm"
                >
                  <Youtube className="w-4 h-4" />
                </a>

                {/* Discord */}
                <a 
                  href="https://discord.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Discord"
                  className="w-9 h-9 rounded-xl bg-[#110524] border border-purple-500/25 flex items-center justify-center text-zinc-400 hover:text-white hover:border-purple-400 hover:bg-purple-900/40 hover:scale-110 transition-all cursor-pointer shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>

                {/* X / Twitter */}
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Twitter"
                  className="w-9 h-9 rounded-xl bg-[#110524] border border-purple-500/25 flex items-center justify-center text-zinc-400 hover:text-white hover:border-purple-400 hover:bg-purple-900/40 hover:scale-110 transition-all cursor-pointer shadow-sm"
                >
                  <Twitter className="w-4 h-4" />
                </a>

              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-white mb-1.5">Get Workshop Updates & Swag Alerts</div>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#4EF35E] font-medium py-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Subscribed! Check your inbox for upcoming alerts.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter student email..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#110524] border border-purple-500/30 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-purple-400"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-colors cursor-pointer flex-shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* ── MIDDLE / RIGHT COLUMNS (Cols 5-12): Organised Categories ── */}
          
          {/* Column: ABOUT */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold text-white tracking-widest uppercase">
              ABOUT
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-medium">
              <li>
                <a href="#home" className="hover:text-purple-300 transition-colors">Our Mission</a>
              </li>
              <li>
                <a href="#events" className="hover:text-purple-300 transition-colors">Student Leaders</a>
              </li>
              <li>
                <a href="#events" className="hover:text-purple-300 transition-colors">Cloud Bootcamps</a>
              </li>
              <li>
                <a href="#events" className="hover:text-purple-300 transition-colors">24h Hackathons</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-purple-300 transition-colors">Community Guidelines</a>
              </li>
            </ul>
          </div>

          {/* Column: COMPANY / COMMUNITY */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold text-white tracking-widest uppercase">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-medium">
              <li>
                <a href="#home" className="hover:text-purple-300 transition-colors">AWS Builder Network</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-purple-300 transition-colors">Student Projects</a>
              </li>
              <li>
                <a href="#events" className="hover:text-purple-300 transition-colors">Certification Perks</a>
              </li>
              <li>
                <a href="#events" className="hover:text-purple-300 transition-colors">Partner Companies</a>
              </li>
              <li>
                <a href="https://github.com/AWSCloudClubGCOE" target="_blank" rel="noreferrer" className="hover:text-purple-300 transition-colors">
                  Open Source Repo
                </a>
              </li>
            </ul>
          </div>

          {/* Column: CONTACT & SUPPORT */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold text-white tracking-widest uppercase">
              CONTACT & CAMPUS
            </h4>
            <div className="space-y-3 text-xs text-zinc-400">
              
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>
                  Department of Computer Science & Engineering,<br />
                  Government College of Engineering, Kolhapur (GCOEK),<br />
                  Maharashtra, India - 416012
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#4EF35E] flex-shrink-0" />
                <a href="mailto:awssbggcoek@gmail.com" className="text-purple-300 hover:text-white transition-colors">
                  awssbggcoek@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#FF9900] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-zinc-300 font-medium">Support & Lab Hours:</div>
                  <div className="text-[11px] text-zinc-400">Mon - Fri: 9:00 AM – 5:30 PM IST</div>
                  <div className="text-[11px] text-purple-300">Saturday Hack Nights on Discord</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ─── BOTTOM COPYRIGHT & BACK TO TOP BAR ─── */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4EF35E] animate-pulse" />
            <span>All Cloud Systems Operational (AWS ap-south-1)</span>
          </div>

          <div>
            © 2026 AWS Student Builder Group GCOEK. All rights reserved.
          </div>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#110524] border border-purple-500/20 text-zinc-400 hover:text-white hover:border-purple-400 transition-all cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </footer>
  );
}
