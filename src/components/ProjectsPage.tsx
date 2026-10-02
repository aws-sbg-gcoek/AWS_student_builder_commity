import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Terminal, Github, ExternalLink, Sparkles, Code2, Layers, Search } from 'lucide-react';
import { projectsData } from '../data/projects';
import { SpotlightFooter } from './SpotlightFooter';

interface ProjectsPageProps {
  onNavigateHome: () => void;
  onNavigateToProject: (projectId: string) => void;
  onJoinClick: () => void;
}

// Purple-theme palettes — all cards stay on-brand, with subtle variation
const CARD_PALETTES = [
  { bg: '#0B0515', grad: 'linear-gradient(145deg,#160a2e,#0B0515)', accent: '#A78BFA', glow: 'rgba(167,139,250,0.22)', tag: 'bg-violet-500/15 text-violet-300 border-violet-500/25' },
  { bg: '#0d0620', grad: 'linear-gradient(145deg,#1a0d3a,#0d0620)', accent: '#C084FC', glow: 'rgba(192,132,252,0.22)', tag: 'bg-purple-500/15 text-purple-300 border-purple-500/25' },
  { bg: '#090418', grad: 'linear-gradient(145deg,#130930,#090418)', accent: '#818CF8', glow: 'rgba(129,140,248,0.22)', tag: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25' },
  { bg: '#0e0525', grad: 'linear-gradient(145deg,#1c0c3f,#0e0525)', accent: '#D8B4FE', glow: 'rgba(216,180,254,0.22)', tag: 'bg-fuchsia-500/15 text-fuchsia-200 border-fuchsia-500/25' },
  { bg: '#0a0420', grad: 'linear-gradient(145deg,#150836,#0a0420)', accent: '#A855F7', glow: 'rgba(168,85,247,0.22)',  tag: 'bg-purple-600/15 text-purple-300 border-purple-600/25' },
  { bg: '#0c0522', grad: 'linear-gradient(145deg,#17093a,#0c0522)', accent: '#7C3AED', glow: 'rgba(124,58,237,0.22)',  tag: 'bg-violet-600/15 text-violet-300 border-violet-600/25' },
  { bg: '#0b0418', grad: 'linear-gradient(145deg,#14082e,#0b0418)', accent: '#E879F9', glow: 'rgba(232,121,249,0.22)', tag: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/25' },
];

function FlipCard({
  project,
  index,
  onNavigateToProject,
}: {
  project: typeof projectsData[0];
  index: number;
  onNavigateToProject: (id: string) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const palette = CARD_PALETTES[index % CARD_PALETTES.length];
  const colDelay = (index % 3) * 80; // stagger by column

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setFlipped(true), colDelay);
        } else {
          setTimeout(() => setFlipped(false), colDelay);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [colDelay]);

  return (
    <div
      ref={cardRef}
      style={{ perspective: '1200px', minHeight: '540px' }}
      className="relative"
    >
      <div
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 1.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: flipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
          width: '100%',
          minHeight: '540px',
          position: 'relative',
        }}
      >

        {/* ══════════════ FRONT FACE ══════════════ */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: palette.grad,
            boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 32px 80px -16px rgba(0,0,0,0.8), 0 0 60px -10px ${palette.glow}`,
          }}
          className="absolute inset-0 rounded-3xl border border-white/[0.07] overflow-hidden flex flex-col group"
        >
          {/* Noise grain */}
          <div
            className="absolute inset-0 pointer-events-none z-0 opacity-[0.025] rounded-3xl"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '128px',
            }}
          />

          {/* Ambient glow blob */}
          <div
            className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[120px] pointer-events-none z-0 opacity-25 group-hover:opacity-40 transition-opacity duration-700"
            style={{ background: palette.glow }}
          />

          {/* ── Image strip ── */}
          {project.projectImage && (
            <div className="relative w-full h-56 overflow-hidden flex-shrink-0 z-10">
              <img
                src={project.projectImage}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
              />
              {/* Gradient fade into card body */}
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0.1) 20%, ${palette.bg} 100%)` }}
              />
              {/* Category pill */}
              <span className={`absolute top-3 left-3 text-[10px] font-mono font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full border backdrop-blur-md ${palette.tag}`}>
                {project.category}
              </span>
              {/* Live badge */}
              {project.liveDemo && (
                <span className="absolute top-3 right-3 flex items-center gap-1.5 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-black/50 border border-white/10 text-emerald-400 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live
                </span>
              )}
            </div>
          )}

          {/* ── Body ── */}
          <div className="relative z-10 flex flex-col flex-grow p-6 pt-5">
            {/* Title */}
            <h3
              className="text-[1.5rem] font-black text-white leading-[1.15] tracking-tight mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {project.title}
            </h3>

            {/* Tagline */}
            <p className="text-[13px] font-semibold mb-3 leading-snug" style={{ color: palette.accent }}>
              {project.tagline.replace(/"/g, '')}
            </p>

            {/* Description */}
            <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3 flex-grow mb-5">
              {project.description}
            </p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.techStack.slice(0, 4).map((tech, i) => (
                <span key={i} className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-white/[0.05] border border-white/[0.07] text-zinc-300">
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-white/[0.03] border border-white/[0.04] text-zinc-500">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/[0.06] mb-4" />

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto">
              {/* Creator */}
              <div className="flex items-center gap-2.5">
                {project.creatorImage ? (
                  <img
                    src={project.creatorImage}
                    alt={project.creator}
                    className="w-8 h-8 rounded-full object-cover object-top border border-white/10 flex-shrink-0"
                  />
                ) : (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0"
                    style={{ background: `linear-gradient(135deg,${palette.accent}55,${palette.accent}22)`, border: `1px solid ${palette.accent}44` }}
                  >
                    {project.creator.charAt(0)}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-white leading-none mb-0.5">{project.creator}</span>
                  <span className="text-[10px] text-zinc-500 font-mono leading-none">{project.role}</span>
                </div>
              </div>

              {/* Links + CTA */}
              <div className="flex items-center gap-2.5">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="text-zinc-500 hover:text-zinc-200 transition-colors" title="Source">
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {project.liveDemo && (
                  <a href={project.liveDemo} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="text-zinc-500 hover:text-zinc-200 transition-colors" title="Live Demo">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button
                  onClick={e => { e.stopPropagation(); onNavigateToProject(project.id); }}
                  className="flex items-center gap-1.5 text-[12px] font-bold px-3.5 py-1.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{
                    background: `linear-gradient(135deg,${palette.accent}22,${palette.accent}0a)`,
                    border: `1px solid ${palette.accent}44`,
                    color: palette.accent,
                    boxShadow: `0 0 18px ${palette.glow}`,
                  }}
                >
                  Explore
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom sweep line on hover */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
            style={{ background: `linear-gradient(to right, transparent, ${palette.accent}88, transparent)` }}
          />
        </div>

        {/* ══════════════ BACK FACE ══════════════ */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: palette.grad,
            boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 32px 80px -16px rgba(0,0,0,0.8)`,
          }}
          className="absolute inset-0 rounded-3xl border border-white/[0.07] overflow-hidden flex flex-col items-center justify-center"
        >
          {/* Big radial glow */}
          <div
            className="absolute inset-0 opacity-30 blur-3xl pointer-events-none"
            style={{ background: `radial-gradient(ellipse at center, ${palette.glow} 0%, transparent 70%)` }}
          />

          {/* Noise */}
          <div
            className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] rounded-3xl"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '128px',
            }}
          />

          <div className="relative z-10 flex flex-col items-center justify-center gap-6 p-10 text-center">
            {/* Icon badge */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg,${palette.accent}22,${palette.accent}08)`,
                border: `1px solid ${palette.accent}44`,
                boxShadow: `0 0 32px ${palette.glow}`,
              }}
            >
              <Layers className="w-8 h-8" style={{ color: palette.accent }} />
            </div>

            {/* Category */}
            <div>
              <div className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-2" style={{ color: palette.accent }}>
                {project.category}
              </div>
              {/* Big bold title — the premium moment */}
              <h3 className="text-2xl font-black text-white leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                {project.title}
              </h3>
              {project.tagline && (
                <p className="text-sm mt-2 font-semibold" style={{ color: `${palette.accent}cc` }}>
                  {project.tagline.replace(/"/g, '')}
                </p>
              )}
            </div>

            {/* Hint */}
            <p className="text-[11px] text-zinc-600 font-mono tracking-widest animate-pulse">
              Scroll to reveal ↓
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export function ProjectsPage({ onNavigateHome, onNavigateToProject, onJoinClick }: ProjectsPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(projectsData.map(p => p.category)))];

  const filtered = projectsData.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.techStack.some(t => t.toLowerCase().includes(q)) || p.creator.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#07020E] text-white flex flex-col font-sans relative selection:bg-purple-600 selection:text-white pt-24 overflow-x-hidden">
      {/* Background grid */}
      <div className="fixed inset-0 pointer-events-none bg-hero-grid opacity-30 z-0" />

      {/* Watermarks */}
      <div
        aria-hidden="true"
        className="fixed top-[18%] left-1/2 -translate-x-1/2 text-[26vw] font-black tracking-widest text-transparent watermark-outline pointer-events-none select-none z-0 whitespace-nowrap opacity-[0.05] leading-none animate-float-slow"
      >
        PROJECTS
      </div>

      <div className="relative z-10 flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-40">

        {/* ─── HERO ─── */}
        <section className="relative min-h-[92vh] flex items-center pt-8 pb-12 overflow-hidden">

          {/* Ambient glows */}
          <div className="absolute top-[5%] right-[5%] w-[600px] h-[500px] bg-purple-700/15 blur-[160px] rounded-full pointer-events-none" />
          <div className="absolute top-[15%] left-[3%] w-[450px] h-[350px] bg-indigo-900/15 blur-[130px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[10%] left-1/3 w-[500px] h-[200px] bg-violet-800/10 blur-[120px] rounded-full pointer-events-none" />

          {/* ── TWO-COLUMN LAYOUT ── */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0 items-center">

            {/* LEFT — content */}
            <div className="flex flex-col items-start text-left z-10 px-2">
              {/* Pill badge */}
              <div
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#180d2f]/90 border border-purple-500/30 shadow-[0_0_24px_rgba(168,85,247,0.25)] mb-10"
                style={{ animation: 'fadeInDown 0.6s ease both' }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4EF35E] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4EF35E]" />
                </span>
                <Terminal className="w-3.5 h-3.5 text-[#4EF35E]" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#FF9900]">
                  COMMUNITY SHOWCASE • GCOEK
                </span>
              </div>

              {/* Headline */}
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.05] tracking-tight mb-6"
                style={{ animation: 'fadeInUp 0.7s ease 0.15s both', fontFamily: 'var(--font-heading)' }}
              >
                Our{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-purple-200">
                  Projects
                </span>
              </h1>

              {/* Subtitle with glow */}
              <p
                className="text-base sm:text-lg text-zinc-200 max-w-lg mb-12 leading-relaxed"
                style={{ 
                  animation: 'fadeInUp 0.7s ease 0.25s both',
                  textShadow: '0 0 20px rgba(216,180,254,0.4), 0 0 40px rgba(167,139,250,0.2)'
                }}
              >
                Real-world solutions built across AI, machine learning, cloud
                infrastructure, and serverless systems by GCOEK students.
              </p>

              {/* Stats row — inline horizontal premium */}
              <div
                className="flex flex-row flex-wrap gap-3 mb-8"
                style={{ animation: 'fadeInUp 0.7s ease 0.4s both' }}
              >
                {[
                  { value: `${projectsData.length}`, label: 'Projects',     icon: '🚀', accent: '#4EF35E',  glow: 'rgba(78,243,94,0.2)',   border: 'rgba(78,243,94,0.25)',   bg: 'rgba(78,243,94,0.06)' },
                  { value: '3+',                     label: 'AI & ML',      icon: '🤖', accent: '#C084FC',  glow: 'rgba(192,132,252,0.2)', border: 'rgba(192,132,252,0.25)', bg: 'rgba(192,132,252,0.06)' },
                  { value: '100%',                   label: 'Cloud Native', icon: '☁️', accent: '#60A5FA',  glow: 'rgba(96,165,250,0.2)',  border: 'rgba(96,165,250,0.25)',  bg: 'rgba(96,165,250,0.06)' },
                  { value: 'AWS',                    label: 'Powered',      icon: '⚡', accent: '#FF9900',  glow: 'rgba(255,153,0,0.2)',   border: 'rgba(255,153,0,0.25)',   bg: 'rgba(255,153,0,0.06)' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="relative flex items-center gap-3 px-5 py-3.5 rounded-2xl backdrop-blur-md overflow-hidden group hover:scale-105 transition-transform duration-300 cursor-default"
                    style={{ background: stat.bg, border: `1px solid ${stat.border}`, boxShadow: `0 0 20px ${stat.glow}` }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" style={{ background: `radial-gradient(circle at 50% 50%, ${stat.glow}, transparent 70%)` }} />
                    <span className="text-xl relative z-10 leading-none">{stat.icon}</span>
                    <div className="relative z-10">
                      <div className="text-[1.4rem] font-black leading-none" style={{ color: stat.accent }}>{stat.value}</div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5 tracking-widest uppercase">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Real stats strip */}
              <div
                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl w-fit border backdrop-blur-md"
                style={{ animation: 'fadeInUp 0.7s ease 0.55s both', background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}
              >
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4EF35E] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4EF35E]" />
                </span>
                <span className="text-[12px] font-mono text-zinc-400">
                  <span className="text-white font-bold">{projectsData.filter(p => p.liveDemo).length}</span> live demos
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-[12px] font-mono text-zinc-400">
                  <span className="text-white font-bold">{projectsData.filter(p => p.github).length}</span> open source
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-[12px] font-mono text-zinc-400">
                  <span className="text-white font-bold">{new Set(projectsData.map(p => p.category)).size}</span> categories
                </span>
              </div>
            </div>

            {/* RIGHT — 3D desktop monitor illustration */}
            <div
              className="flex items-center justify-center relative w-full"
              style={{ minHeight: '480px' }}
            >
              {/* Ambient glow */}
              <div className="absolute w-96 h-96 rounded-full bg-purple-700/20 blur-[120px] pointer-events-none" />

              {/* Main SVG illustration - 3D Desktop Monitor */}
              <svg
                viewBox="0 0 600 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full max-w-[560px] animate-float-slow relative z-0"
                style={{ animationDuration: '7s', filter: 'drop-shadow(0 20px 50px rgba(124,58,237,0.3))' }}
              >
                <defs>
                  {/* Monitor gradient - white/light gray */}
                  <linearGradient id="monitorFrame" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#F0F0F5" />
                  </linearGradient>
                  
                  {/* Screen gradient - purple theme */}
                  <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#9333EA" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                  
                  {/* UI card gradients - purple shades */}
                  <linearGradient id="pinkCard" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#D8B4FE" />
                    <stop offset="100%" stopColor="#C084FC" />
                  </linearGradient>
                  
                  <linearGradient id="purpleCard" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#A78BFA" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                  
                  <linearGradient id="cyanCard" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#E9D5FF" />
                    <stop offset="100%" stopColor="#D8B4FE" />
                  </linearGradient>
                </defs>

                {/* Ground shadow */}
                <ellipse cx="300" cy="520" rx="160" ry="20" fill="rgba(100,40,200,0.15)" />

                {/* ══════ 3D DESKTOP MONITOR ══════ */}
                <g transform="translate(300,320)">
                  
                  {/* Monitor stand base */}
                  <ellipse cx="0" cy="160" rx="80" ry="12" fill="#E8E8F0" />
                  <ellipse cx="0" cy="158" rx="76" ry="10" fill="#FFFFFF" />
                  
                  {/* Monitor stand pole */}
                  <rect x="-8" y="90" width="16" height="70" rx="3" fill="#F0F0F5" />
                  <rect x="-6" y="90" width="12" height="70" rx="2" fill="#FFFFFF" />
                  
                  {/* Monitor back (3D depth) - right side visible */}
                  <path d="M160,-150 L160,60 L140,80 L140,-130 Z" fill="#D8D8E0" />
                  <path d="M-160,-150 L160,-150 L140,-130 L-140,-130 Z" fill="#E8E8F0" />
                  
                  {/* Main monitor frame - front face */}
                  <rect x="-160" y="-150" width="320" height="240" rx="20" fill="url(#monitorFrame)" stroke="#E0E0E8" strokeWidth="3" />
                  
                  {/* Inner bezel */}
                  <rect x="-150" y="-140" width="300" height="220" rx="16" fill="#FFFFFF" />
                  
                  {/* Screen */}
                  <rect x="-145" y="-135" width="290" height="210" rx="12" fill="url(#screenGrad)" />
                  
                  {/* ═══ UI CARDS ON SCREEN ═══ */}
                  
                  {/* Top-left: Browser window card with buttons */}
                  <g transform="translate(-85,-75)">
                    <rect width="100" height="70" rx="10" fill="url(#pinkCard)" />
                    {/* Window buttons */}
                    <circle cx="12" cy="12" r="4" fill="#FF5F56" />
                    <circle cx="24" cy="12" r="4" fill="#FFBD2E" />
                    <circle cx="36" cy="12" r="4" fill="#27C93F" />
                    {/* Content bar */}
                    <rect x="10" y="24" width="80" height="8" rx="4" fill="rgba(255,255,255,0.9)" />
                    {/* Lines */}
                    <rect x="10" y="36" width="60" height="4" rx="2" fill="rgba(255,255,255,0.7)" />
                    <rect x="10" y="44" width="70" height="4" rx="2" fill="rgba(255,255,255,0.7)" />
                    <rect x="10" y="52" width="50" height="4" rx="2" fill="rgba(255,255,255,0.7)" />
                  </g>
                  
                  {/* Top-right: Email/Message card */}
                  <g transform="translate(50,-75)">
                    <rect width="80" height="80" rx="12" fill="url(#pinkCard)" />
                    {/* Envelope flap */}
                    <path d="M20,30 L40,45 L60,30" stroke="rgba(255,255,255,0.95)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    {/* Envelope body */}
                    <rect x="20" y="30" width="40" height="30" rx="4" stroke="rgba(255,255,255,0.95)" strokeWidth="3" fill="none" />
                    {/* Dots */}
                    <circle cx="66" cy="20" r="3" fill="#F472B6" />
                    <circle cx="74" cy="16" r="2" fill="#F472B6" opacity="0.7" />
                  </g>
                  
                  {/* Bottom-left: Typography/Text card */}
                  <g transform="translate(-85,15)">
                    <rect width="80" height="90" rx="12" fill="url(#purpleCard)" />
                    {/* "Aa" text */}
                    <text x="40" y="45" fontSize="32" fontWeight="bold" fill="rgba(255,255,255,0.95)" textAnchor="middle" fontFamily="system-ui">Aa</text>
                    {/* Lines below */}
                    <rect x="15" y="55" width="50" height="4" rx="2" fill="rgba(255,255,255,0.9)" />
                    <rect x="15" y="62" width="50" height="4" rx="2" fill="rgba(255,255,255,0.9)" />
                    <rect x="15" y="69" width="50" height="4" rx="2" fill="rgba(255,255,255,0.9)" />
                    <rect x="15" y="76" width="35" height="4" rx="2" fill="rgba(255,255,255,0.9)" />
                  </g>
                  
                  {/* Bottom-right: Form/Input card */}
                  <g transform="translate(50,25)">
                    <rect width="80" height="70" rx="12" fill="url(#cyanCard)" />
                    {/* Input field 1 */}
                    <rect x="12" y="15" width="56" height="12" rx="6" fill="rgba(255,255,255,0.9)" />
                    {/* Input field 2 */}
                    <rect x="12" y="32" width="56" height="12" rx="6" fill="rgba(255,255,255,0.9)" />
                    {/* Button */}
                    <rect x="12" y="49" width="56" height="12" rx="6" fill="rgba(255,255,255,0.95)" />
                  </g>
                  
                  {/* Screen gloss reflection */}
                  <rect x="-140" y="-130" width="120" height="80" rx="8" fill="rgba(255,255,255,0.08)" />
                  
                </g>

                {/* ══════ 3D KEYBOARD & MOUSE ══════ */}
                <g transform="translate(300,480)">
                  {/* Keyboard - 3D rounded rectangle in front */}
                  {/* Keyboard top face */}
                  <rect x="-90" y="0" width="160" height="40" rx="8" fill="#FFFFFF" />
                  {/* Keyboard left side (3D depth) */}
                  <path d="M-90,0 L-95,5 L-95,45 L-90,40 Z" fill="#E8E8F0" />
                  {/* Keyboard front face */}
                  <path d="M-90,40 L70,40 L65,45 L-95,45 Z" fill="#D8D8E0" />
                  
                  {/* Black lines on keyboard (key separations) */}
                  {/* Horizontal lines */}
                  <line x1="-80" y1="12" x2="60" y2="12" stroke="#7C3AED" strokeWidth="1.5" opacity="0.3" />
                  <line x1="-80" y1="22" x2="60" y2="22" stroke="#7C3AED" strokeWidth="1.5" opacity="0.3" />
                  <line x1="-80" y1="32" x2="60" y2="32" stroke="#7C3AED" strokeWidth="1.5" opacity="0.3" />
                  
                  {/* Vertical lines (suggestion of keys) */}
                  {[-60, -40, -20, 0, 20, 40].map((x, i) => (
                    <line key={i} x1={x} y1="6" x2={x} y2="36" stroke="#7C3AED" strokeWidth="1" opacity="0.25" />
                  ))}
                  
                  {/* Mouse - 3D cylinder on the right */}
                  {/* Mouse body */}
                  <ellipse cx="100" cy="20" rx="16" ry="20" fill="#FFFFFF" />
                  {/* Mouse left side highlight */}
                  <ellipse cx="96" cy="20" rx="14" ry="18" fill="rgba(255,255,255,0.5)" />
                  
                  {/* Purple line down the middle of mouse (button separator) */}
                  <line x1="100" y1="5" x2="100" y2="28" stroke="#7C3AED" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
                  
                  {/* Mouse scroll wheel */}
                  <rect x="99" y="12" width="2" height="6" rx="1" fill="#7C3AED" opacity="0.5" />
                  
                  {/* Mouse bottom shadow */}
                  <ellipse cx="100" cy="38" rx="16" ry="4" fill="rgba(124,58,237,0.15)" />
                </g>
              </svg>

              {/* Floating badges (outside SVG) */}
              <div className="absolute top-[4%] left-[8%] flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#160a2e]/95 border border-[#4EF35E]/40 backdrop-blur-md animate-float-slow text-[11px] font-mono font-bold text-[#4EF35E] shadow-[0_0_12px_rgba(78,243,94,0.2)] z-10" style={{ animationDelay: '-1s' }}>
                ✓ Deployed
              </div>
              <div className="absolute top-[8%] right-[6%] flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1a0e0a]/95 border border-[#FF9900]/40 backdrop-blur-md animate-float-slow text-[11px] font-mono font-bold text-[#FF9900] shadow-[0_0_12px_rgba(255,153,0,0.2)] z-10" style={{ animationDelay: '-3s' }}>
                ⚡ AWS
              </div>
              <div className="absolute bottom-[10%] left-[4%] flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#160a2e]/95 border border-purple-500/40 backdrop-blur-md animate-float-slow text-[11px] font-mono font-bold text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.2)] z-10" style={{ animationDelay: '-5s' }}>
                &lt;/&gt; Open Source
              </div>

              {/* Orbit dots */}
              <div className="absolute top-[22%] right-[12%] w-2 h-2 rounded-full bg-purple-400/50 animate-float-slow pointer-events-none" style={{ animationDelay: '-2s' }} />
              <div className="absolute top-[62%] right-[8%] w-1.5 h-1.5 rounded-full bg-fuchsia-400/40 animate-float-slow pointer-events-none" style={{ animationDelay: '-4s' }} />
              <div className="absolute bottom-[24%] left-[10%] w-2 h-2 rounded-full bg-violet-300/40 animate-float-slow pointer-events-none" style={{ animationDelay: '-1.5s' }} />
            </div>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce opacity-25">
            <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-zinc-500 to-transparent" />
          </div>
        </section>

        {/* ── SEARCH + FILTER BAR ── */}
        <div className="mb-12 space-y-5">
          {/* Premium search input */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, category, or tech (e.g. FraudLens, AWS, Docker)..."
              className="w-full pl-12 pr-5 py-4 rounded-2xl text-white text-sm placeholder-zinc-500 focus:outline-none transition-all backdrop-blur-md"
              style={{
                background: 'linear-gradient(135deg,rgba(22,10,46,0.9),rgba(13,6,32,0.9))',
                border: '1px solid rgba(168,85,247,0.2)',
                boxShadow: '0 0 0 0 transparent',
              }}
              onFocus={e => { e.currentTarget.style.border = '1px solid rgba(168,85,247,0.6)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(168,85,247,0.12), 0 0 30px rgba(168,85,247,0.1)'; }}
              onBlur={e => { e.currentTarget.style.border = '1px solid rgba(168,85,247,0.2)'; e.currentTarget.style.boxShadow = 'none'; }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors text-xs font-mono"
              >
                ✕ clear
              </button>
            )}
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map(cat => {
              const count = cat === 'All' ? projectsData.length : projectsData.filter(p => p.category === cat).length;
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
                  style={active ? {
                    background: 'linear-gradient(135deg,#7C3AED,#A855F7)',
                    color: '#fff',
                    boxShadow: '0 0 18px rgba(147,51,234,0.5)',
                    border: '1px solid rgba(168,85,247,0.5)',
                  } : {
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#a1a1aa',
                  }}
                >
                  <span>{cat}</span>
                  <span
                    className="text-[11px] font-mono px-1.5 py-0.5 rounded-full"
                    style={active ? { background: 'rgba(255,255,255,0.2)', color: '#fff' } : { background: 'rgba(255,255,255,0.08)', color: '#71717a' }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Result count */}
          {(search || activeCategory !== 'All') && (
            <div className="flex items-center justify-center gap-2 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-zinc-400">Showing</span>
              <span className="text-white font-bold">{filtered.length}</span>
              <span className="text-zinc-400">of {projectsData.length} projects</span>
              <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="ml-2 text-purple-400 hover:text-purple-300 underline">Reset</button>
            </div>
          )}
        </div>

        {/* ── FLIP CARD GRID ── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-zinc-500">
            <Search className="w-10 h-10 mb-4 opacity-30" />
            <p className="font-mono text-sm">No projects match your search.</p>
            <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="mt-4 text-xs text-purple-400 hover:text-purple-300 font-mono underline">Clear filters</button>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 relative z-10">
          {filtered.map((project, i) => (
            <FlipCard
              key={project.id}
              project={project}
              index={i}
              onNavigateToProject={onNavigateToProject}
            />
          ))}
        </div>
        )}
      </div>

      {/* ── SUBMIT YOUR WORK CTA ── */}
      <div className="relative overflow-hidden border-t border-white/[0.06]">
        {/* Background */}
        <div className="absolute inset-0 bg-[#07020E]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-purple-700/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-hero-grid opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 sm:py-32 text-center">
          {/* Label */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#FF9900]" />
            <span className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-[#FF9900]">Submit Your Work</span>
            <div className="h-px w-8 bg-[#FF9900]" />
          </div>

          {/* Headline */}
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Have a project to showcase?
          </h2>

          {/* Subtitle */}
          <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Built something cool on the cloud? Reach out and we'll feature your project on this page for the whole community to see.
          </p>

          {/* Two CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/918421807460"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-[0_0_32px_rgba(37,211,102,0.5)]"
              style={{ background: '#25D366', color: '#fff' }}
            >
              {/* WhatsApp icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
            <a
              href="mailto:awssbggcoek@gmail.com"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-[0_0_32px_rgba(255,153,0,0.5)] border-2"
              style={{ background: 'transparent', color: '#FF9900', borderColor: '#FF9900' }}
            >
              {/* Email icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 8.586 5.379a2 2 0 0 0 2.828 0L22 7"/></svg>
              Email Us
            </a>
          </div>
        </div>
      </div>

      <SpotlightFooter onJoinClick={onJoinClick} />
    </div>
  );
}
