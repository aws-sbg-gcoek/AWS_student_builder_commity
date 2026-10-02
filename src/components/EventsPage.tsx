import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar, MapPin, Clock, ExternalLink, CheckCircle2,
  X, ChevronRight, ChevronLeft, MessageSquare, Video,
  Sparkles, Terminal, ArrowRight, Filter, Images,
} from 'lucide-react';
import { eventsData, AppEvent } from '../data/events';
import { SpotlightFooter } from './SpotlightFooter';

interface EventsPageProps {
  onNavigateHome: () => void;
  onJoinClick: () => void;
}

// ─── Gallery images ────────────────────────────────────────────────────────────
const GALLERY_IMAGES = [
  'https://i.ibb.co/wh3WN4c8/highres-532347430.avif',
  'https://i.ibb.co/mC48zSdN/highres-532347431.avif',
  'https://i.ibb.co/sd6ZXFt4/highres-532347403-1.avif',
  'https://i.ibb.co/h1RwtVP4/highres-532347403.avif',
  'https://i.ibb.co/n8kj4dLH/highres-532347401.avif',
  'https://i.ibb.co/Mx9LRq1m/highres-532347400.avif',
  'https://i.ibb.co/7JqJhG3N/highres-532347399.avif',
  'https://i.ibb.co/r2PWsbBj/IMG-20260313-133159131-HDR-AE-2-jpg.jpg',
  'https://i.ibb.co/ZztxTXTj/Whats-App-Image-2026-09-04-at-7-49-19-PM.jpg',
  'https://i.ibb.co/1Gt9j8Nd/Whats-App-Image-2026-09-04-at-7-49-40-PM-1.jpg',
  'https://i.ibb.co/NdxvXsC8/Whats-App-Image-2026-09-04-at-7-49-40-PM.jpg',
  'https://i.ibb.co/84t7RpCz/Whats-App-Image-2026-09-04-at-7-49-41-PM.jpg',
];

// ─── Type styles ───────────────────────────────────────────────────────────────
const TYPE_STYLES: Record<string, { badge: string; accent: string }> = {
  Meetup:           { badge: 'bg-purple-500/15 text-purple-300 border-purple-500/30',    accent: '#A78BFA' },
  Workshop:         { badge: 'bg-blue-500/15 text-blue-300 border-blue-500/30',          accent: '#60A5FA' },
  Seminar:          { badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30', accent: '#34D399' },
  'Expert Lecture': { badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',       accent: '#FBBF24' },
  Hackathon:        { badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',          accent: '#FB7185' },
};
const defaultStyle = { badge: 'bg-zinc-500/15 text-zinc-300 border-zinc-500/30', accent: '#94A3B8' };
function getStyle(type: string) { return TYPE_STYLES[type] ?? defaultStyle; }

// ─── Gallery flip card ────────────────────────────────────────────────────────
function GalleryFlipCard({ src, index, total, onClick }: { src: string; index: number; total: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const colDelay = (index % 4) * 60;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => setFlipped(true), colDelay);
        else setTimeout(() => setFlipped(false), colDelay);
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [colDelay]);

  return (
    <div
      ref={ref}
      className="break-inside-avoid mb-3 cursor-zoom-in"
      style={{ perspective: '900px' }}
      onClick={onClick}
    >
      <div
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 1.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: flipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
          position: 'relative',
        }}
      >
        {/* ── FRONT — photo ── */}
        <div
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          className="group relative rounded-2xl overflow-hidden border border-white/[0.06] hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_28px_rgba(168,85,247,0.3)]"
        >
          <img
            src={src}
            alt={`Event photo ${index + 1}`}
            className="w-full h-auto block object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Images className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="text-[10px] font-mono text-white/70 tracking-wider">{index + 1} / {total}</span>
            </div>
          </div>
        </div>

        {/* ── BACK — purple glow placeholder ── */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            position: 'absolute',
            inset: 0,
            minHeight: '120px',
          }}
          className="rounded-2xl border border-purple-500/20 overflow-hidden flex items-center justify-center"
        >
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(145deg,#1a0d3a,#0d0620)' }}
          />
          {/* Radial glow */}
          <div
            className="absolute inset-0 opacity-40"
            style={{ background: 'radial-gradient(ellipse at center, rgba(192,132,252,0.35) 0%, transparent 70%)' }}
          />
          {/* Noise */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '128px' }}
          />
          {/* Icon + number */}
          <div className="relative z-10 flex flex-col items-center gap-2 p-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(192,132,252,0.15)', border: '1px solid rgba(192,132,252,0.3)' }}
            >
              <Images className="w-5 h-5 text-purple-300" />
            </div>
            <span className="text-[10px] font-mono text-purple-400 tracking-widest">PHOTO {index + 1}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ images, startIdx, onClose }: { images: string[]; startIdx: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIdx);
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i + 1) % images.length); };

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setIdx(i => (i - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setIdx(i => (i + 1) % images.length);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [images.length, onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-2xl" onClick={onClose}>
      {/* Close */}
      <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white z-20 transition-colors">
        <X className="w-6 h-6" />
      </button>
      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs font-mono text-zinc-400 z-20">
        {idx + 1} / {images.length}
      </div>
      {/* Prev */}
      <button onClick={prev} className="absolute left-3 sm:left-6 p-3 rounded-full bg-white/10 hover:bg-purple-600/60 text-white z-20 transition-all hover:scale-110">
        <ChevronLeft className="w-6 h-6" />
      </button>
      {/* Image */}
      <div className="relative max-w-5xl w-full mx-14 sm:mx-20" onClick={e => e.stopPropagation()}>
        <img
          src={images[idx]}
          alt={`Gallery ${idx + 1}`}
          className="w-full max-h-[82vh] object-contain rounded-2xl shadow-2xl"
        />
        {/* Purple glow under image */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-purple-600/25 blur-[40px] rounded-full pointer-events-none" />
      </div>
      {/* Next */}
      <button onClick={next} className="absolute right-3 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-purple-600/60 text-white z-20 transition-all hover:scale-110">
        <ChevronRight className="w-6 h-6" />
      </button>
      {/* Thumbnail strip */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 overflow-x-auto max-w-[90vw] px-2">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={e => { e.stopPropagation(); setIdx(i); }}
            className={`flex-shrink-0 w-12 h-9 rounded-lg overflow-hidden border-2 transition-all ${
              i === idx ? 'border-purple-400 scale-110 shadow-[0_0_10px_rgba(168,85,247,0.6)]' : 'border-white/10 opacity-50 hover:opacity-80'
            }`}
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Event Modal ──────────────────────────────────────────────────────────────
function EventModal({ event, onClose }: { event: AppEvent; onClose: () => void }) {
  const style = getStyle(event.type);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl" onClick={onClose}>
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0d041d] border border-purple-500/40 shadow-2xl text-white" onClick={e => e.stopPropagation()}>
        {event.image && (
          <div className="relative w-full h-52 sm:h-64 overflow-hidden rounded-t-3xl flex-shrink-0">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d041d] via-transparent to-black/30" />
            <span className={`absolute top-4 left-4 text-[10px] font-mono font-bold px-3 py-1 rounded-full border backdrop-blur-md ${style.badge}`}>{event.type}</span>
          </div>
        )}
        <div className="p-6 sm:p-8">
          <button type="button" onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors z-20"><X className="w-5 h-5" /></button>
          <div className="mb-6 pr-8">
            {!event.image && <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border ${style.badge} mb-3 inline-block`}>{event.type}</span>}
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{event.title}</h3>
            <div className="flex flex-wrap gap-3 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-emerald-400"><Calendar className="w-3.5 h-3.5" />{event.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{event.time}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-purple-400" />{event.location}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <div>
                <h4 className="text-[10px] font-mono font-bold text-purple-300 uppercase tracking-wider mb-2">Overview</h4>
                <p className="text-sm text-zinc-300 leading-relaxed">{event.desc}</p>
              </div>
              {event.highlights && event.highlights.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-mono font-bold text-purple-300 uppercase tracking-wider mb-3">Highlights</h4>
                  <div className="space-y-2">
                    {event.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" /><span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {event.schedule && event.schedule.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-mono font-bold text-purple-300 uppercase tracking-wider mb-3">Schedule</h4>
                  <div className="space-y-3 border-l-2 border-purple-500/30 pl-4 ml-1">
                    {event.schedule.map((s, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#0d041d]" style={{ background: style.accent }} />
                        <div className="text-[11px] font-mono font-bold" style={{ color: style.accent }}>{s.time}</div>
                        <div className="text-sm text-white font-semibold leading-tight">{s.title}</div>
                        <div className="text-xs text-zinc-400 mt-0.5">{s.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="lg:col-span-2 space-y-3">
              {event.link && <a href={event.link} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-purple-600/20 hover:bg-purple-600/35 border border-purple-500/40 text-white text-sm font-semibold transition-all"><ExternalLink className="w-4 h-4" />View Event Page</a>}
              {event.meetLink && <a href={event.meetLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/30 text-emerald-300 text-sm font-semibold transition-all"><Video className="w-4 h-4" />Join Google Meet</a>}
              {event.whatsappLink && <a href={event.whatsappLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-green-600/15 hover:bg-green-600/25 border border-green-500/30 text-green-300 text-sm font-semibold transition-all"><MessageSquare className="w-4 h-4" />WhatsApp Group</a>}
              <div className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl text-xs font-mono font-bold border ${event.status === 'upcoming' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-zinc-500/10 border-zinc-500/20 text-zinc-400'}`}>
                <span className={`w-2 h-2 rounded-full ${event.status === 'upcoming' ? 'bg-emerald-400 animate-ping' : 'bg-zinc-500'}`} />
                {event.status === 'upcoming' ? 'Upcoming Event' : 'Past Event'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Particle dust ─────────────────────────────────────────────────────────────
const DUST_COLORS = ['#7C3AED','#9333EA','#A855F7','#C084FC','#D8B4FE','#6D28D9','#8B5CF6','#E879F9','#4C1D95','#DDD6FE','#ffffff','#ede9fe'];

function runDust(canvas: HTMLCanvasElement, cardW: number, cardH: number, mode: 'dissolve' | 'assemble', onDone: () => void) {
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  if (!ctx) return;
  canvas.width = cardW; canvas.height = cardH;
  const COUNT = 360, DURATION = mode === 'dissolve' ? 480 : 1200, MAX_DELAY = mode === 'dissolve' ? 0 : 0.55;
  interface P { x:number;y:number;tx:number;ty:number;sx:number;sy:number;r:number;color:string;opacity:number;delay:number; }
  const particles: P[] = Array.from({ length: COUNT }, () => {
    const tx = Math.random() * cardW, ty = Math.random() * cardH;
    const angle = Math.random() * Math.PI * 2, dist = cardW * 0.25 + Math.random() * cardW * 0.65;
    const sx = cardW / 2 + Math.cos(angle) * dist, sy = cardH / 2 + Math.sin(angle) * dist;
    return { tx,ty,sx,sy, x:mode==='assemble'?sx:tx, y:mode==='assemble'?sy:ty, r:1.5+Math.random()*2.5, color:DUST_COLORS[Math.floor(Math.random()*DUST_COLORS.length)], opacity:mode==='assemble'?0:1, delay:Math.random()*MAX_DELAY };
  });
  let startTime: number | null = null; let rafId: number;
  function step(ts: number) {
    if (!startTime) startTime = ts;
    const globalT = Math.min((ts - startTime) / DURATION, 1);
    ctx.clearRect(0, 0, cardW, cardH);
    let allDone = true;
    for (const p of particles) {
      const rawT = MAX_DELAY > 0 ? Math.max(0, Math.min((globalT - p.delay) / (1 - p.delay), 1)) : globalT;
      const ease = mode === 'dissolve' ? 1 - Math.pow(1 - rawT, 2) : rawT < 0.5 ? 4*rawT*rawT*rawT : 1 - Math.pow(-2*rawT+2,3)/2;
      if (mode === 'assemble') { p.x=p.sx+(p.tx-p.sx)*ease; p.y=p.sy+(p.ty-p.sy)*ease; p.opacity=ease; }
      else { p.x=p.tx+(p.sx-p.tx)*ease; p.y=p.ty+(p.sy-p.ty)*ease; p.opacity=1-ease; }
      if (rawT < 1) allDone = false;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = p.color; ctx.globalAlpha = p.opacity*(0.55+Math.random()*0.45); ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (!allDone || globalT < 1) { rafId = requestAnimationFrame(step); } else { cancelAnimationFrame(rafId); onDone(); }
  }
  rafId = requestAnimationFrame(step);
  return () => cancelAnimationFrame(rafId);
}

// ─── Event Card ───────────────────────────────────────────────────────────────
function EventCard({ event, onClick }: { event: AppEvent; index: number; onClick: () => void }) {
  type Phase = 'hidden'|'assembling'|'visible'|'dissolving';
  const [phase, setPhase] = useState<Phase>('hidden');
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cleanupRef = useRef<(()=>void)|void>();
  const style = getStyle(event.type);

  useEffect(() => {
    const el = cardRef.current; if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setPhase(prev => (prev==='hidden'||prev==='dissolving')?'assembling':prev);
      else setPhase(prev => (prev==='visible'||prev==='assembling')?'dissolving':prev);
    }, { threshold: 0, rootMargin: '0px' });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (phase !== 'assembling' && phase !== 'dissolving') return;
    const card = cardRef.current, canvas = canvasRef.current; if (!card || !canvas) return;
    if (cleanupRef.current) cleanupRef.current();
    const { offsetWidth: w, offsetHeight: h } = card;
    cleanupRef.current = runDust(canvas, w, h, phase==='assembling'?'assemble':'dissolve', () => {
      setPhase(phase==='assembling'?'visible':'hidden');
    });
  }, [phase]);

  const cardVisible = phase === 'visible';
  const dustVisible = phase === 'assembling' || phase === 'dissolving';

  return (
    <div ref={cardRef} className="group relative rounded-3xl cursor-pointer" style={{ minHeight: '560px' }} onClick={phase==='visible'?onClick:undefined}>
      <canvas ref={canvasRef} className="absolute inset-0 rounded-3xl z-30 pointer-events-none" style={{ opacity: dustVisible?1:0 }} />
      <div className="absolute inset-0 rounded-3xl border border-white/[0.07] overflow-hidden flex flex-col" style={{ background:'linear-gradient(145deg,#13082a,#09040f)', boxShadow:'0 0 0 1px rgba(255,255,255,0.04), 0 24px 60px -12px rgba(0,0,0,0.7)', opacity:cardVisible?1:0, transition:phase==='dissolving'?'opacity 0s':'opacity 0.04s' }}>
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.025]" style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize:'128px' }} />
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-[90px] pointer-events-none z-0 opacity-20 group-hover:opacity-35 transition-opacity duration-700" style={{ background: style.accent }} />
        {event.image && (
          <div className="relative w-full h-56 overflow-hidden flex-shrink-0 z-10">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09040f]" />
            <span className={`absolute top-3 left-3 text-[10px] font-mono font-bold px-3 py-1 rounded-full border backdrop-blur-md ${style.badge}`}>{event.type}</span>
            <span className={`absolute top-3 right-3 flex items-center gap-1.5 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full backdrop-blur-md border ${event.status==='upcoming'?'bg-emerald-950/80 border-emerald-500/30 text-emerald-400':'bg-black/60 border-white/10 text-zinc-400'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${event.status==='upcoming'?'bg-emerald-400 animate-ping':'bg-zinc-500'}`} />
              {event.status==='upcoming'?'Upcoming':'Past'}
            </span>
          </div>
        )}
        <div className="relative z-10 flex flex-col flex-grow p-6 pt-5">
          <div className="flex flex-wrap items-center gap-3 mb-4 text-[11px] font-mono">
            <span className="flex items-center gap-1.5" style={{ color: style.accent }}><Calendar className="w-3.5 h-3.5" />{event.date}</span>
            <span className="text-zinc-500 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{event.time}</span>
          </div>
          <h3 className="text-[1.35rem] font-black text-white leading-snug tracking-tight mb-2 group-hover:text-purple-100 transition-colors" style={{ fontFamily:'var(--font-heading)' }}>{event.title}</h3>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-4"><MapPin className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />{event.location}</div>
          <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3 flex-grow mb-5">{event.desc}</p>
          {event.highlights && event.highlights.length > 0 && (
            <div className="flex flex-col gap-2 mb-5">
              {event.highlights.slice(0,2).map((h,i) => (
                <div key={i} className="flex items-start gap-1.5 text-[11px] text-zinc-400">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" /><span className="line-clamp-1">{h}</span>
                </div>
              ))}
            </div>
          )}
          <div className="w-full h-px bg-white/[0.06] mb-5" />
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2">
              {event.meetLink && <Video className="w-4 h-4 text-emerald-400" />}
              {event.whatsappLink && <MessageSquare className="w-4 h-4 text-green-400" />}
              {event.link && <ExternalLink className="w-4 h-4 text-zinc-500" />}
            </div>
            <button onClick={e=>{e.stopPropagation();onClick();}} className="flex items-center gap-1.5 text-[12px] font-bold px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95" style={{ background:`${style.accent}18`, border:`1px solid ${style.accent}44`, color:style.accent }}>
              View Details <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background:`linear-gradient(to right, transparent, ${style.accent}88, transparent)` }} />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function EventsPage({ onNavigateHome, onJoinClick }: EventsPageProps) {
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);
  const [filter, setFilter]         = useState<'all'|'upcoming'|'past'>('all');
  const [typeFilter, setTypeFilter]  = useState('All');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  const types    = ['All', ...Array.from(new Set(eventsData.map(e => e.type)))];
  const filtered = eventsData.filter(e => (filter==='all'||e.status===filter) && (typeFilter==='All'||e.type===typeFilter));
  const upcomingCount = eventsData.filter(e => e.status === 'upcoming').length;
  const pastCount     = eventsData.filter(e => e.status === 'past').length;

  return (
    <div className="min-h-screen bg-[#07020E] text-white flex flex-col font-sans relative selection:bg-purple-600 selection:text-white pt-24 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none bg-hero-grid opacity-30 z-0" />
      <div aria-hidden="true" className="fixed top-[18%] left-1/2 -translate-x-1/2 text-[26vw] font-black tracking-widest text-transparent watermark-outline pointer-events-none select-none z-0 whitespace-nowrap opacity-[0.04] leading-none animate-float-slow">EVENTS</div>

      <div className="relative z-10 flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-40">

        {/* ── HERO ── */}
        <section className="relative min-h-[100vh] flex items-center py-24 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-purple-700/15 blur-[160px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[450px] h-[350px] bg-indigo-900/15 blur-[130px] rounded-full pointer-events-none" />
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0 items-center">
            {/* LEFT */}
            <div className="flex flex-col items-start text-left z-10">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#180d2f]/90 border border-purple-500/30 shadow-[0_0_24px_rgba(168,85,247,0.25)] mb-10" style={{ animation:'fadeInDown 0.6s ease both' }}>
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4EF35E] opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-[#4EF35E]" /></span>
                <Terminal className="w-3.5 h-3.5 text-[#4EF35E]" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#FF9900]">COMMUNITY EVENTS • GCOEK</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.05] tracking-tight mb-6" style={{ animation:'fadeInUp 0.7s ease 0.1s both', fontFamily:'var(--font-heading)' }}>
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-[#4EF35E]">Events</span>
              </h1>
              <p className="text-base sm:text-lg text-zinc-400 max-w-lg mb-14 leading-relaxed" style={{ animation:'fadeInUp 0.7s ease 0.2s both' }}>
                Workshops, seminars, meetups and expert lectures — hands-on learning experiences built by and for student cloud builders at GCOEK.
              </p>
              {/* Premium stat cards */}
              <div className="flex flex-wrap gap-3 sm:gap-4" style={{ animation:'fadeInUp 0.7s ease 0.35s both' }}>
                {[
                  { value:`${eventsData.length}`, label:'Total Events',  icon:'🗓️', glow:'rgba(168,85,247,0.3)',  border:'border-purple-500/30', bg:'bg-purple-900/20' },
                  { value:`${upcomingCount}`,      label:'Upcoming',     icon:'🚀', glow:'rgba(52,211,153,0.3)',  border:'border-emerald-500/30', bg:'bg-emerald-900/20' },
                  { value:`${pastCount}`,           label:'Past Events',  icon:'✅', glow:'rgba(96,165,250,0.3)',  border:'border-blue-500/30',    bg:'bg-blue-900/20' },
                  { value:`${new Set(eventsData.map(e=>e.type)).size}`, label:'Event Types', icon:'⚡', glow:'rgba(251,191,36,0.3)', border:'border-amber-500/30', bg:'bg-amber-900/20' },
                ].map((s,i) => (
                  <div key={i} className={`relative flex items-center gap-3 px-5 py-4 rounded-2xl ${s.bg} ${s.border} border backdrop-blur-md overflow-hidden group hover:scale-105 transition-transform duration-300`} style={{ boxShadow:`0 0 24px ${s.glow}` }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background:`radial-gradient(circle at 50% 50%, ${s.glow}, transparent 70%)` }} />
                    <span className="text-2xl relative z-10">{s.icon}</span>
                    <div className="relative z-10">
                      <div className="text-2xl font-black text-white leading-none">{s.value}</div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5 tracking-widest uppercase">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* RIGHT — 3D calendar */}
            <div aria-hidden="true" className="flex items-center justify-center relative select-none pointer-events-none" style={{ minHeight:'500px' }}>
              <div className="absolute w-80 h-80 rounded-full bg-purple-600/20 blur-[100px]" />
              <div className="absolute w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] rounded-full border border-purple-500/10 animate-spin-slow" style={{ animationDuration:'30s' }} />
              <div className="absolute w-[330px] h-[330px] sm:w-[420px] sm:h-[420px] rounded-full border border-purple-400/[0.06]" style={{ animation:'spinSlow 22s linear infinite reverse' }} />
              <div className="relative animate-float-slow" style={{ animationDuration:'6s' }}>
                <svg viewBox="0 0 220 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:'clamp(280px,40vw,420px)', filter:'drop-shadow(0 24px 48px rgba(168,85,247,0.35)) drop-shadow(0 8px 20px rgba(0,0,0,0.6))' }}>
                  <rect x="18" y="38" width="178" height="172" rx="18" fill="#1a0840" opacity="0.7" />
                  <rect x="14" y="34" width="178" height="172" rx="18" fill="#2d1460" />
                  <rect x="14" y="34" width="178" height="172" rx="18" fill="url(#calBack)" />
                  <rect x="8" y="28" width="178" height="172" rx="18" fill="#f8f6ff" />
                  <rect x="8" y="28" width="178" height="172" rx="18" fill="url(#calFront)" />
                  <rect x="8" y="28" width="178" height="48" rx="18" fill="#7C3AED" />
                  <rect x="8" y="56" width="178" height="20" fill="#7C3AED" />
                  {[38,62,86,110,134,158].map((x,i) => (<g key={i}><ellipse cx={x} cy="28" rx="7" ry="10" fill="#4c1d95" /><ellipse cx={x} cy="28" rx="5" ry="7" fill="none" stroke="#c4b5fd" strokeWidth="3" strokeDasharray="11 3" /></g>))}
                  {[[28,92],[68,92],[108,92],[148,92],[28,122],[68,122],[108,122],[148,122],[28,152],[68,152],[108,152],[148,152]].map(([cx,cy],i) => (<rect key={i} x={cx-14} y={cy-10} width="28" height="20" rx="5" fill={i===4?'#ede9fe':'#f3f0ff'} stroke={i===4?'#7C3AED':'#ddd6fe'} strokeWidth="1" />))}
                  <path d="M54 122 l6 6 l10 -10" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="calFront" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(255,255,255,0.15)" /><stop offset="100%" stopColor="rgba(255,255,255,0)" /></linearGradient>
                    <linearGradient id="calBack" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(168,85,247,0.3)" /><stop offset="100%" stopColor="rgba(109,40,217,0.1)" /></linearGradient>
                  </defs>
                </svg>
                <div className="absolute -top-4 -right-4 animate-float-slow" style={{ animationDelay:'-2s', animationDuration:'5s' }}>
                  <div className="relative">
                    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:'clamp(68px,10vw,92px)', filter:'drop-shadow(0 6px 16px rgba(255,153,0,0.5))' }}>
                      <circle cx="32" cy="32" r="28" fill="#FF9900" /><circle cx="32" cy="32" r="28" fill="url(#bellGrad)" />
                      <path d="M32 14 C24 14 20 20 20 28 L18 38 H46 L44 28 C44 20 40 14 32 14Z" fill="white" opacity="0.95"/>
                      <rect x="28" y="38" width="8" height="5" rx="2" fill="white" opacity="0.9"/>
                      <ellipse cx="32" cy="43" rx="5" ry="3" fill="white" opacity="0.85"/>
                      <ellipse cx="25" cy="24" rx="4" ry="3" fill="white" opacity="0.3" transform="rotate(-20 25 24)" />
                      <defs><radialGradient id="bellGrad" cx="35%" cy="30%"><stop offset="0%" stopColor="rgba(255,220,80,0.6)" /><stop offset="100%" stopColor="rgba(200,80,0,0.3)" /></radialGradient></defs>
                    </svg>
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 border-2 border-[#07020E] flex items-center justify-center"><span className="text-[9px] font-black text-white leading-none">!</span></div>
                  </div>
                </div>
                <div className="absolute top-[10%] -left-6 w-2.5 h-2.5 rounded-full bg-purple-400/60 animate-float-slow" style={{ animationDelay:'-1s' }} />
                <div className="absolute bottom-[20%] -left-4 w-2 h-2 rounded-full bg-violet-300/40 animate-float-slow" style={{ animationDelay:'-3.5s' }} />
                <div className="absolute top-[60%] -right-6 w-2 h-2 rounded-full bg-fuchsia-400/50 animate-float-slow" style={{ animationDelay:'-2s' }} />
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce opacity-25">
            <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-zinc-500 to-transparent" />
          </div>
        </section>

        {/* ── FILTER BAR ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-14 p-4 sm:p-5 rounded-2xl border border-white/[0.07] backdrop-blur-md" style={{ background:'linear-gradient(135deg,#130828,#0a0418)', boxShadow:'0 0 0 1px rgba(255,255,255,0.04),0 20px 40px -12px rgba(0,0,0,0.6),0 0 40px -10px rgba(168,85,247,0.12)' }}>
          <div className="flex items-center gap-1 p-1 rounded-xl bg-black/30 border border-white/[0.05]">
            {(['all','upcoming','past'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`text-xs font-bold px-5 py-2 rounded-lg transition-all duration-200 capitalize tracking-wide ${filter===f?'bg-purple-600 text-white shadow-[0_0_16px_rgba(147,51,234,0.5)]':'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
                {f==='all'?'All Events':f.charAt(0).toUpperCase()+f.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
            {types.map(t => {
              const active = typeFilter === t;
              const ts = t !== 'All' ? getStyle(t) : null;
              return (
                <button key={t} onClick={() => setTypeFilter(t)} className="text-[11px] font-mono font-bold px-3.5 py-1.5 rounded-xl border transition-all duration-200 hover:scale-105"
                  style={active&&ts?{ background:`${ts.accent}22`, border:`1px solid ${ts.accent}55`, color:ts.accent, boxShadow:`0 0 12px ${ts.accent}44` }:active?{ background:'rgba(168,85,247,0.2)', border:'1px solid rgba(168,85,247,0.5)', color:'#D8B4FE', boxShadow:'0 0 12px rgba(168,85,247,0.3)' }:{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', color:'#71717a' }}>
                  {t}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-white font-bold">{filtered.length}</span> event{filtered.length!==1?'s':''}
          </div>
        </div>

        {/* ── CARD GRID ── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-zinc-500">
            <Sparkles className="w-10 h-10 mb-4 opacity-30" />
            <p className="font-mono text-sm">No events match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12">
            {filtered.map((event,i) => (
              <EventCard key={event.id} event={event} index={i} onClick={() => setSelectedEvent(event)} />
            ))}
          </div>
        )}

        {/* ── COMMUNITY GALLERY ── */}
        <section className="mt-28">
          {/* Header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-grow bg-white/[0.06]" />
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 tracking-widest uppercase">
                <Images className="w-3.5 h-3.5 text-purple-400" />
                Community Moments
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight" style={{ fontFamily:'var(--font-heading)' }}>
                Event{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-[#4EF35E]">Gallery</span>
              </h2>
              <p className="text-xs text-zinc-500 font-mono">{GALLERY_IMAGES.length} photos · Click to view full size</p>
            </div>
            <div className="h-px flex-grow bg-white/[0.06]" />
          </div>

          {/* Masonry grid — flip cards */}
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4 [column-gap:12px]">
            {GALLERY_IMAGES.map((src, i) => (
              <GalleryFlipCard
                key={i}
                src={src}
                index={i}
                total={GALLERY_IMAGES.length}
                onClick={() => setLightboxIdx(i)}
              />
            ))}
          </div>
        </section>

        {/* ── JOIN CTA ── */}
        <div className="mt-24 flex flex-col items-center text-center">
          <div className="w-full h-px bg-white/[0.06] mb-12" />
          <p className="text-zinc-400 text-sm mb-6">Want to be part of the next event?</p>
          <button onClick={onJoinClick} className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-purple-600/20 border border-purple-500/40 text-white font-semibold text-sm hover:bg-purple-600/35 hover:border-purple-400 transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_0_24px_rgba(168,85,247,0.25)]">
            Join the Community
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <SpotlightFooter />

      {/* Event detail modal */}
      {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}

      {/* Photo lightbox */}
      {lightboxIdx !== null && (
        <Lightbox images={GALLERY_IMAGES} startIdx={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}
    </div>
  );
}
