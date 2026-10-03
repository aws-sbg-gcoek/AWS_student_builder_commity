import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen, ExternalLink, Sparkles, Compass, Shield, Server,
  Layers, Terminal, Award, Search, CheckCircle2, ChevronRight,
  Code2, ArrowUpRight, Flame, Bookmark, Github, Cpu, Globe,
  Zap, Lightbulb, Rocket, Filter, RotateCcw, Layers3, Move3d, Images
} from 'lucide-react';
import { SpotlightFooter } from './SpotlightFooter';

interface ResourcesPageProps {
  onNavigateHome: () => void;
  onJoinClick: () => void;
}

interface ResourceLink {
  title: string;
  url: string;
  actionText: string;
  description?: string;
  icon?: string;
}

interface RoadmapStep {
  stepNumber: number;
  title: string;
  description: string;
  badge: string;
  badgeColor: string;
  accentColor: string;
  links: ResourceLink[];
}

const ROADMAP_STEPS: RoadmapStep[] = [
  {
    stepNumber: 1,
    title: 'Step 1: Cloud Fundamentals',
    description: 'Understand what cloud computing is, deployment models, and service models (IaaS, PaaS, SaaS).',
    badge: 'STAGE 01',
    badgeColor: 'bg-emerald-500/20 text-[#4EF35E] border-emerald-500/40',
    accentColor: '#4EF35E',
    links: [
      { title: 'AWS Getting Started', url: 'https://aws.amazon.com/getting-started/', actionText: 'LEARN →' },
      { title: 'Cloud Practitioner Training', url: 'https://aws.amazon.com/training/learn-about/cloud-practitioner/', actionText: 'LEARN →' },
      { title: 'AWS Skill Builder', url: 'https://aws.amazon.com/training/digital/', actionText: 'START LEARNING →' },
      { title: 'AWS Educate', url: 'https://aws.amazon.com/education/awseducate/', actionText: 'START LEARNING →' },
    ],
  },
  {
    stepNumber: 2,
    title: 'Step 2: AWS Core Services',
    description: 'Learn EC2 (Compute), S3 (Storage), RDS (Database), and VPC (Networking).',
    badge: 'STAGE 02',
    badgeColor: 'bg-cyan-500/20 text-[#38BDF8] border-cyan-500/40',
    accentColor: '#38BDF8',
    links: [
      { title: 'AWS Hands-On Tutorials', url: 'https://aws.amazon.com/getting-started/hands-on/', actionText: 'START LAB →' },
      { title: 'AWS Tutorials Directory', url: 'https://aws.amazon.com/tutorials/', actionText: 'VIEW RESOURCES →' },
      { title: 'AWS Documentation', url: 'https://docs.aws.amazon.com/', actionText: 'OPEN DOCS →' },
      { title: 'EC2 – Launch First Instance', url: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/tutorial-launch-my-first-ec2-instance.html', actionText: 'START LAB →' },
      { title: 'S3 – Getting Started', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html', actionText: 'OPEN DOCS →' },
      { title: 'RDS – Getting Started', url: 'https://docs.aws.amazon.com/AmazonRDS/latest/gettingstartedguide/what-is-rds.html', actionText: 'OPEN DOCS →' },
      { title: 'VPC – Getting Started', url: 'https://docs.aws.amazon.com/vpc/latest/userguide/vpc-getting-started.html', actionText: 'OPEN DOCS →' },
    ],
  },
  {
    stepNumber: 3,
    title: 'Step 3: Security & Identity',
    description: 'Master IAM (Identity and Access Management) and basic cloud security principles.',
    badge: 'STAGE 03',
    badgeColor: 'bg-purple-500/20 text-[#A855F7] border-purple-500/40',
    accentColor: '#A855F7',
    links: [
      { title: 'IAM – Getting Started', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started.html', actionText: 'OPEN DOCS →' },
      { title: 'AWS Security Documentation', url: 'https://docs.aws.amazon.com/security/', actionText: 'OPEN DOCS →' },
      { title: 'AWS Cloud Security', url: 'https://aws.amazon.com/security/', actionText: 'LEARN →' },
      { title: 'Well-Architected Security Pillar', url: 'https://docs.aws.amazon.com/wellarchitected/latest/framework/security.html', actionText: 'VIEW GUIDE →' },
    ],
  },
  {
    stepNumber: 4,
    title: 'Step 4: Serverless & Architecture',
    description: 'Explore Lambda, API Gateway, DynamoDB, and the Well-Architected Framework.',
    badge: 'STAGE 04',
    badgeColor: 'bg-amber-500/20 text-[#FF9900] border-amber-500/40',
    accentColor: '#FF9900',
    links: [
      { title: 'AWS Serverless Developer Guide', url: 'https://docs.aws.amazon.com/serverless/latest/devguide/', actionText: 'OPEN DOCS →' },
      { title: 'Lambda – Create Your First Function', url: 'https://docs.aws.amazon.com/lambda/latest/dg/getting-started.html', actionText: 'START LAB →' },
      { title: 'API Gateway – Getting Started', url: 'https://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started.html', actionText: 'START LAB →' },
      { title: 'DynamoDB – Getting Started', url: 'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStartedDynamoDB.html', actionText: 'START LAB →' },
      { title: 'Lambda Workshops & Tutorials', url: 'https://aws.amazon.com/lambda/resources/workshops-and-tutorials/', actionText: 'START LAB →' },
      { title: 'AWS Serverless Workshops', url: 'https://aws.amazon.com/serverless-workshops/', actionText: 'START LAB →' },
      { title: 'Well-Architected Framework', url: 'https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html', actionText: 'VIEW GUIDE →' },
      { title: 'AWS Architecture Center', url: 'https://aws.amazon.com/architecture/', actionText: 'VIEW GUIDE →' },
    ],
  },
  {
    stepNumber: 5,
    title: 'Step 5: Hands-on Projects',
    description: 'Build and deploy real applications to solidify your cloud knowledge.',
    badge: 'STAGE 05',
    badgeColor: 'bg-rose-500/20 text-[#FB7185] border-rose-500/40',
    accentColor: '#FB7185',
    links: [
      { title: 'AWS Hands-On Tutorials', url: 'https://aws.amazon.com/getting-started/hands-on/', actionText: 'START LAB →' },
      { title: 'AWS Workshops', url: 'https://workshops.aws/', actionText: 'START LAB →' },
      { title: 'AWS Code Examples Library', url: 'https://docs.aws.amazon.com/code-library/', actionText: 'OPEN DOCS →' },
      { title: 'AWS Samples on GitHub', url: 'https://github.com/aws-samples', actionText: 'VIEW RESOURCES →' },
      { title: 'Serverless Workshops (GitHub)', url: 'https://github.com/aws-samples/aws-serverless-workshops', actionText: 'START LAB →' },
    ],
  },
];

const INTERACTIVE_RESOURCES: ResourceLink[] = [
  { title: 'AWS Cloud Quest', url: 'https://skillbuilder.aws/', actionText: 'START QUEST →', description: '3D role-playing game designed to teach AWS cloud skills through real-world scenarios.' },
  { title: 'AWS Skill Builder', url: 'https://aws.amazon.com/training/digital/', actionText: 'START LEARNING →', description: 'Official digital learning center with 600+ free courses and self-paced labs.' },
  { title: 'AWS Builder Center', url: 'https://builder.aws.com/', actionText: 'LEARN →', description: 'Community hub for developers to read tutorials, discover projects, and learn together.' },
];

const WEB_DEV_RESOURCES: ResourceLink[] = [
  { title: 'Host a Static Website on S3', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html', actionText: 'START LAB →', description: 'Step-by-step tutorial to configure Amazon S3 for hosting high-performance static websites.' },
  { title: 'Build a Full-Stack React App (Amplify)', url: 'https://aws.amazon.com/getting-started/hands-on/build-react-app-amplify/', actionText: 'START LAB →', description: 'Deploy a complete React application with backend authentication & database in minutes.' },
  { title: 'AWS Amplify', url: 'https://aws.amazon.com/amplify/', actionText: 'LEARN →', description: 'Set of tools and services that can be used together to build scalable full-stack web apps.' },
  { title: 'Amazon CloudFront', url: 'https://aws.amazon.com/cloudfront/', actionText: 'LEARN →', description: 'Global Content Delivery Network (CDN) service that securely delivers data, videos, and APIs.' },
];

const CERTIFICATION_RESOURCES: ResourceLink[] = [
  { title: 'AWS Certification Hub', url: 'https://aws.amazon.com/certification/', actionText: 'VIEW GUIDE →', description: 'Main portal for exploring all official AWS certifications and exam schedules.' },
  { title: 'AWS Certified Cloud Practitioner', url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/', actionText: 'VIEW GUIDE →', description: 'The ideal starting point to validate foundational cloud fluency.' },
  { title: 'Exam Guide (CLF-C02)', url: 'https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.html', actionText: 'VIEW GUIDE →', description: 'Official exam outline detailing domain weightings and sample topics.' },
  { title: 'Certification Exam Prep', url: 'https://aws.amazon.com/certification/certification-prep/', actionText: 'VIEW GUIDE →', description: 'Official practice tests, exam review courses, and preparation guides.' },
  { title: 'Cloud Practitioner Training', url: 'https://aws.amazon.com/training/learn-about/cloud-practitioner/', actionText: 'LEARN →', description: 'Structured free digital curriculum tailored for the Cloud Practitioner exam.' },
];

const DEV_EXTRA_RESOURCES: ResourceLink[] = [
  { title: 'AWS Documentation', url: 'https://docs.aws.amazon.com/', actionText: 'OPEN DOCS →', description: 'Complete technical documentation for all 200+ AWS services.' },
  { title: 'AWS Code Examples', url: 'https://docs.aws.amazon.com/code-library/', actionText: 'OPEN DOCS →', description: 'Searchable code snippets in Python, Node.js, Java, Go, and more.' },
  { title: 'AWS CLI Reference', url: 'https://docs.aws.amazon.com/cli/', actionText: 'OPEN DOCS →', description: 'Command line tool documentation to control AWS services from your terminal.' },
  { title: 'AWS re:Post Community', url: 'https://repost.aws/', actionText: 'LEARN →', description: 'Official community Q&A forum driven by AWS experts and community members.' },
  { title: 'AWS Architecture Center', url: 'https://aws.amazon.com/architecture/', actionText: 'VIEW GUIDE →', description: 'Reference architecture diagrams, best practices, and design patterns.' },
];

const GITHUB_RESOURCES: ResourceLink[] = [
  { title: 'aws-samples', url: 'https://github.com/aws-samples', actionText: 'VIEW REPO →', description: 'Official GitHub organization containing thousands of code samples and reference apps.' },
  { title: 'aws-serverless-workshops', url: 'https://github.com/aws-samples/aws-serverless-workshops', actionText: 'START LAB →', description: 'Hands-on repository for building serverless web applications with Lambda, S3 & DynamoDB.' },
];

// ─── Particle dust animation engine ──────────────────────────────────────────
const DUST_COLORS = ['#7C3AED', '#9333EA', '#A855F7', '#C084FC', '#D8B4FE', '#6D28D9', '#8B5CF6', '#E879F9', '#4C1D95', '#4EF35E', '#38BDF8', '#FF9900'];

function runDust(canvas: HTMLCanvasElement, cardW: number, cardH: number, mode: 'dissolve' | 'assemble', onDone: () => void) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  canvas.width = cardW;
  canvas.height = cardH;
  const COUNT = 320;
  const DURATION = mode === 'dissolve' ? 480 : 1100;
  const MAX_DELAY = mode === 'dissolve' ? 0 : 0.5;

  interface P {
    x: number; y: number; tx: number; ty: number; sx: number; sy: number;
    r: number; color: string; opacity: number; delay: number;
  }

  const particles: P[] = Array.from({ length: COUNT }, () => {
    const tx = Math.random() * cardW;
    const ty = Math.random() * cardH;
    const angle = Math.random() * Math.PI * 2;
    const dist = cardW * 0.25 + Math.random() * cardW * 0.6;
    const sx = cardW / 2 + Math.cos(angle) * dist;
    const sy = cardH / 2 + Math.sin(angle) * dist;
    return {
      tx, ty, sx, sy,
      x: mode === 'assemble' ? sx : tx,
      y: mode === 'assemble' ? sy : ty,
      r: 1.5 + Math.random() * 2.5,
      color: DUST_COLORS[Math.floor(Math.random() * DUST_COLORS.length)],
      opacity: mode === 'assemble' ? 0 : 1,
      delay: Math.random() * MAX_DELAY,
    };
  });

  let startTime: number | null = null;
  let rafId: number;

  function step(ts: number) {
    if (!startTime) startTime = ts;
    const globalT = Math.min((ts - startTime) / DURATION, 1);
    ctx?.clearRect(0, 0, cardW, cardH);
    let allDone = true;

    for (const p of particles) {
      const rawT = MAX_DELAY > 0 ? Math.max(0, Math.min((globalT - p.delay) / (1 - p.delay), 1)) : globalT;
      const ease = mode === 'dissolve' ? 1 - Math.pow(1 - rawT, 2) : rawT < 0.5 ? 4 * rawT * rawT * rawT : 1 - Math.pow(-2 * rawT + 2, 3) / 2;
      
      if (mode === 'assemble') {
        p.x = p.sx + (p.tx - p.sx) * ease;
        p.y = p.sy + (p.ty - p.sy) * ease;
        p.opacity = ease;
      } else {
        p.x = p.tx + (p.sx - p.tx) * ease;
        p.y = p.ty + (p.sy - p.ty) * ease;
        p.opacity = 1 - ease;
      }

      if (rawT < 1) allDone = false;
      if (ctx) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * (0.6 + Math.random() * 0.4);
        ctx.fill();
      }
    }

    if (ctx) ctx.globalAlpha = 1;
    if (!allDone || globalT < 1) {
      rafId = requestAnimationFrame(step);
    } else {
      cancelAnimationFrame(rafId);
      onDone();
    }
  }

  rafId = requestAnimationFrame(step);
  return () => cancelAnimationFrame(rafId);
}

// ─── Particle Assembly Card Component ──────────────────────────────────────────
function AssemblyCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  type Phase = 'hidden' | 'assembling' | 'visible' | 'dissolving';
  const [phase, setPhase] = useState<Phase>('hidden');
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cleanupRef = useRef<(() => void) | void>(undefined);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPhase(prev => (prev === 'hidden' || prev === 'dissolving') ? 'assembling' : prev);
      } else {
        setPhase(prev => (prev === 'visible' || prev === 'assembling') ? 'dissolving' : prev);
      }
    }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (phase !== 'assembling' && phase !== 'dissolving') return;
    const card = cardRef.current;
    const canvas = canvasRef.current;
    if (!card || !canvas) return;

    if (cleanupRef.current) cleanupRef.current();
    const { offsetWidth: w, offsetHeight: h } = card;

    cleanupRef.current = runDust(canvas, w, h, phase === 'assembling' ? 'assemble' : 'dissolve', () => {
      setPhase(phase === 'assembling' ? 'visible' : 'hidden');
    });
  }, [phase]);

  const cardVisible = phase === 'visible';
  const dustVisible = phase === 'assembling' || phase === 'dissolving';

  return (
    <div ref={cardRef} className={`relative group ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 rounded-3xl z-30 pointer-events-none"
        style={{ opacity: dustVisible ? 1 : 0 }}
      />
      <div
        className="w-full h-full transition-opacity duration-300"
        style={{
          opacity: cardVisible ? 1 : 0,
          transition: phase === 'dissolving' ? 'opacity 0.05s' : 'opacity 0.3s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Interactive 3D Flip Card Component for Developer Resources ───────────────
function DevResourceFlipCard({ item, actionStyle }: { item: ResourceLink; actionStyle: string }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-[220px] cursor-pointer group select-none"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className="w-full h-full relative transition-transform duration-700 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* ── FRONT SIDE ── */}
        <div
          className="absolute inset-0 rounded-2xl bg-[#13082a]/90 border border-purple-900/40 p-5 backdrop-blur-xl flex flex-col justify-between shadow-lg group-hover:border-emerald-500/50 transition-colors"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Terminal className="w-5 h-5" />
              </span>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold border ${actionStyle}`}>
                {item.actionText}
              </span>
            </div>
            <h3 className="text-lg font-bold font-heading text-white group-hover:text-emerald-400 transition-colors">
              {item.title}
            </h3>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed line-clamp-2">
              {item.description}
            </p>
          </div>

          <div className="pt-3 border-t border-purple-900/30 flex items-center justify-between text-xs font-mono text-zinc-500">
            <span className="flex items-center gap-1 text-[11px] text-purple-400/80">
              <RotateCcw className="w-3 h-3 animate-spin-slow" /> Hover to flip
            </span>
            <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* ── BACK SIDE ── */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1a083b] via-[#100529] to-[#0a021b] border border-emerald-500/60 p-5 backdrop-blur-xl flex flex-col justify-between shadow-2xl"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
              OFFICIAL AWS DOCUMENTATION
            </span>
            <h4 className="text-base font-extrabold text-white font-heading">
              {item.title}
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {item.description} Access official AWS guides, reference architectures, and code snippets directly.
            </p>
          </div>

          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/35 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(78,243,94,0.25)]"
          >
            <span>Launch Resource</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Interactive 3D Flip Card Component for GitHub Resources ──────────────────
function GitHubResourceFlipCard({ item }: { item: ResourceLink }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-[220px] cursor-pointer group select-none"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className="w-full h-full relative transition-transform duration-700 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* ── FRONT SIDE ── */}
        <div
          className="absolute inset-0 rounded-3xl bg-[#150930]/90 border border-purple-900/50 p-6 backdrop-blur-xl flex items-start gap-4 shadow-lg group-hover:border-purple-400/60 transition-colors"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform flex-shrink-0">
            <Github className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xl font-bold font-mono text-white group-hover:text-purple-300 transition-colors truncate">
                  {item.title}
                </h3>
                <ExternalLink className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed line-clamp-2">
                {item.description}
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-purple-900/30">
              <span className="text-[11px] font-mono text-purple-400 underline truncate">
                github.com/aws-samples/{item.title}
              </span>
              <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1 whitespace-nowrap">
                <RotateCcw className="w-3 h-3 animate-spin-slow" /> Flip
              </span>
            </div>
          </div>
        </div>

        {/* ── BACK SIDE ── */}
        <div
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#210c4d] via-[#140632] to-[#0b021d] border border-purple-400/60 p-6 backdrop-blur-xl flex flex-col justify-between shadow-2xl"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-purple-300 uppercase tracking-widest flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5" /> OPEN SOURCE REPOSITORY
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-200 border border-purple-500/30">
                AWS OFFICIAL
              </span>
            </div>
            <h4 className="text-lg font-bold font-mono text-white">
              {item.title}
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Contains production-ready code samples, deployment scripts, and complete hands-on workshops directly from AWS engineers.
            </p>
          </div>

          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/50 text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)]"
          >
            <span>Explore Repository on GitHub</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Floating Creative Knowledge Vault Illustration (SVG) ─────────────────────
function CreativeFloatingVault() {
  return (
    <div className="flex items-center justify-center relative select-none pointer-events-none min-h-[380px] sm:min-h-[460px]">
      <div className="absolute w-80 h-80 rounded-full bg-purple-600/25 blur-[100px]" />
      <div 
        className="absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] rounded-full border border-purple-500/20 animate-spin-slow" 
        style={{ animationDuration: '32s' }} 
      />
      <div 
        className="absolute w-[290px] h-[290px] sm:w-[380px] sm:h-[380px] rounded-full border border-cyan-400/20" 
        style={{ animation: 'spinSlow 24s linear infinite reverse' }} 
      />

      <div className="relative animate-float-slow" style={{ animationDuration: '6s' }}>
        <svg
          viewBox="0 0 240 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: 'clamp(280px,36vw,400px)',
            filter: 'drop-shadow(0 24px 48px rgba(168,85,247,0.4)) drop-shadow(0 8px 24px rgba(0,0,0,0.7))',
          }}
        >
          <rect x="22" y="44" width="190" height="180" rx="22" fill="#150734" opacity="0.8" />
          <rect x="16" y="38" width="190" height="180" rx="22" fill="#2d1259" />

          <rect x="10" y="30" width="190" height="180" rx="22" fill="#0c031c" />
          <rect x="10" y="30" width="190" height="180" rx="22" fill="url(#vaultCoverGrad)" stroke="#a855f7" strokeWidth="2" />

          <rect x="10" y="30" width="28" height="180" rx="14" fill="#a855f7" opacity="0.9" />
          <line x1="24" y1="42" x2="24" y2="198" stroke="#ffffff" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />

          <rect x="44" y="46" width="144" height="148" rx="12" fill="#180b38" stroke="#38bdf8" strokeWidth="1" opacity="0.8" />

          <path
            d="M84 135 C84 122, 95 112, 108 112 C113 103, 124 97, 137 97 C153 97, 166 108, 169 123 C178 124, 185 132, 185 142 C185 152, 177 160, 167 160 L87 160 C76 160, 68 151, 68 140 C68 130, 75 122, 84 121 Z"
            fill="url(#cloudGrad)"
            opacity="0.95"
          />

          <path
            d="M92 148 Q125 168 158 148"
            stroke="#FF9900"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <polygon points="154,142 163,148 156,155" fill="#FF9900" />

          <circle cx="70" cy="70" r="4" fill="#4ef35e" />
          <line x1="70" y1="70" x2="110" y2="70" stroke="#4ef35e" strokeWidth="1.5" strokeDasharray="3 3" />
          
          <circle cx="165" cy="70" r="4" fill="#38bdf8" />
          <line x1="165" y1="70" x2="135" y2="70" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />

          <defs>
            <linearGradient id="vaultCoverGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(168,85,247,0.4)" />
              <stop offset="50%" stopColor="rgba(24,12,50,0.9)" />
              <stop offset="100%" stopColor="rgba(10,3,25,0.95)" />
            </linearGradient>

            <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </svg>

        <div 
          className="absolute -top-4 -right-4 animate-float-slow" 
          style={{ animationDelay: '-2s', animationDuration: '5s' }}
        >
          <div className="relative flex items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF9900] to-amber-600 flex items-center justify-center shadow-[0_0_24px_rgba(255,153,0,0.6)] border border-amber-300/40">
              <Sparkles className="w-7 h-7 text-white animate-pulse" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#4EF35E] border-2 border-[#07020E] animate-ping" />
          </div>
        </div>

        <div className="absolute top-[12%] -left-6 w-3 h-3 rounded-full bg-[#4EF35E] shadow-[0_0_10px_#4EF35E] animate-float-slow" style={{ animationDelay: '-1s' }} />
        <div className="absolute bottom-[22%] -left-4 w-2.5 h-2.5 rounded-full bg-[#38BDF8] shadow-[0_0_10px_#38BDF8] animate-float-slow" style={{ animationDelay: '-3.5s' }} />
        <div className="absolute top-[65%] -right-6 w-3 h-3 rounded-full bg-[#FF9900] shadow-[0_0_10px_#FF9900] animate-float-slow" style={{ animationDelay: '-2s' }} />
      </div>
    </div>
  );
}

export function ResourcesPage({ onNavigateHome, onJoinClick }: ResourcesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const CATEGORIES = ['All', 'Roadmap', 'Interactive', 'Web Dev', 'Certification', 'Developer', 'GitHub'];

  const getActionBadgeStyle = (actionText: string) => {
    if (actionText.includes('START LAB') || actionText.includes('START QUEST')) {
      return 'bg-emerald-500/20 text-[#4EF35E] border-emerald-500/30 hover:bg-emerald-500/30';
    }
    if (actionText.includes('OPEN DOCS') || actionText.includes('VIEW REPO')) {
      return 'bg-cyan-500/20 text-[#38BDF8] border-cyan-500/30 hover:bg-cyan-500/30';
    }
    if (actionText.includes('START LEARNING') || actionText.includes('LEARN')) {
      return 'bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30';
    }
    return 'bg-amber-500/20 text-[#FF9900] border-amber-500/30 hover:bg-amber-500/30';
  };

  const isMatch = (text: string) => text.toLowerCase().includes(searchQuery.toLowerCase());

  return (
    <div className="min-h-screen bg-[#07020E] text-white flex flex-col pt-24 font-sans relative overflow-x-hidden selection:bg-purple-600 selection:text-white">
      
      {/* ── Background Ambient Glow Effects & Fine Mesh Overlay ── */}
      <div className="fixed inset-0 pointer-events-none bg-hero-grid opacity-30 z-0" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-purple-600/15 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-96 right-10 w-[450px] h-[350px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none" />

      {/* ── Breadcrumb Header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center space-x-2 text-xs sm:text-sm text-zinc-400 mb-6 font-mono"
        >
          <button onClick={onNavigateHome} className="hover:text-purple-300 transition-colors">Home</button>
          <span>/</span>
          <span className="text-purple-400 font-semibold">Resources</span>
        </motion.div>
      </div>

      {/* ── Main Hero Section with Creative 3D Vault Illustration ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#180d2f]/90 border border-purple-500/30 shadow-[0_0_24px_rgba(168,85,247,0.25)] mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4EF35E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4EF35E]" />
              </span>
              <Terminal className="w-3.5 h-3.5 text-[#4EF35E]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#FF9900]">
                KNOWLEDGE VAULT • GCOEK
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-5 font-heading leading-[1.05]">
              Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-[#4EF35E]">Resources</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-light max-w-2xl">
              Curated links, roadmaps, and guides to help you master AWS and cloud computing — every card takes you directly to the official source.
            </p>

            {/* Quick Stat Pill Cards */}
            <div className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start">
              {[
                { value: '5 Steps', label: 'Roadmap Stages', icon: '🧭', glow: 'rgba(78,243,94,0.3)', border: 'border-emerald-500/30', bg: 'bg-emerald-900/20' },
                { value: '25+ Links', label: 'Curated Guides', icon: '⚡', glow: 'rgba(56,189,248,0.3)', border: 'border-cyan-500/30', bg: 'bg-cyan-900/20' },
                { value: '100% Free', label: 'Hands-on Labs', icon: '💻', glow: 'rgba(255,153,0,0.3)', border: 'border-amber-500/30', bg: 'bg-amber-900/20' },
                { value: 'CLF-C02', label: 'Certification Hub', icon: '🏆', glow: 'rgba(168,85,247,0.3)', border: 'border-purple-500/30', bg: 'bg-purple-900/20' },
              ].map((s, i) => (
                <div
                  key={i}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl ${s.bg} ${s.border} border backdrop-blur-md overflow-hidden group hover:scale-105 transition-all duration-300 shadow-lg`}
                >
                  <span className="text-2xl relative z-10">{s.icon}</span>
                  <div className="relative z-10 text-left">
                    <div className="text-lg font-black text-white leading-none">{s.value}</div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5 tracking-wider uppercase">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Creative Floating 3D Vault Illustration */}
          <div className="lg:col-span-5">
            <CreativeFloatingVault />
          </div>

        </div>

        {/* ── Search & Category Filter ── */}
        <div className="mt-12 max-w-4xl mx-auto space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
            <input
              type="text"
              placeholder="Search resources, topics, services (e.g. S3, Lambda, IAM, Certifications)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#14082e]/90 border border-purple-500/30 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 text-sm sm:text-base backdrop-blur-xl transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white bg-purple-900/40 px-2 py-1 rounded-lg"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs font-mono text-zinc-400 mr-2 hidden sm:inline-flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-400'
                    : 'bg-[#180d35]/70 text-zinc-400 hover:text-white border border-purple-900/30 hover:border-purple-600/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Container for Sections ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 space-y-20 pb-24">

        {/* ─────────────────────────────────────────────────────────────
            SECTION 1: ROADMAP (Cloud Beginner Roadmap)
           ───────────────────────────────────────────────────────────── */}
        {(selectedCategory === 'All' || selectedCategory === 'Roadmap') && (
          <section id="roadmap" className="space-y-8 scroll-mt-28">
            <div className="border-l-4 border-[#FF9900] pl-4 py-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF9900] tracking-wider uppercase">
                <Compass className="w-4 h-4" />
                <span>Structured Pathway</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white mt-1">
                Cloud Beginner Roadmap
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 mt-1">
                Follow these steps in order. Each stage includes direct links to official AWS resources.
              </p>
            </div>

            {/* Timeline Steps Stack with Particle Dust Assembly */}
            <div className="space-y-6">
              {ROADMAP_STEPS.map((step) => {
                const filteredLinks = searchQuery
                  ? step.links.filter((l) => isMatch(l.title) || isMatch(step.title) || isMatch(step.description))
                  : step.links;

                if (searchQuery && filteredLinks.length === 0) return null;

                return (
                  <AssemblyCard key={step.stepNumber}>
                    <div className="relative group rounded-3xl bg-[#120826]/90 border border-purple-900/40 p-6 sm:p-8 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-purple-500/50 transition-all duration-300">
                      
                      {/* Glowing Accent line top */}
                      <div 
                        className="absolute top-0 left-8 right-8 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity"
                        style={{ background: `linear-gradient(90deg, transparent, ${step.accentColor}, transparent)` }}
                      />

                      {/* Card Header */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-purple-900/30">
                        <div className="flex items-start gap-4">
                          <div 
                            className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black font-mono shadow-lg flex-shrink-0"
                            style={{ 
                              backgroundColor: `${step.accentColor}15`, 
                              color: step.accentColor, 
                              border: `1px solid ${step.accentColor}40` 
                            }}
                          >
                            {step.stepNumber}
                          </div>
                          <div>
                            <div className="flex items-center gap-3 flex-wrap">
                              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                                {step.title}
                              </h3>
                              <span className={`px-3 py-0.5 rounded-full text-xs font-mono border ${step.badgeColor}`}>
                                {step.badge}
                              </span>
                            </div>
                            <p className="text-sm sm:text-base text-zinc-300 mt-1.5 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Step Resource Links Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {filteredLinks.map((link, lIdx) => (
                          <motion.a
                            key={lIdx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center justify-between p-4 rounded-xl bg-[#1c0e3a]/60 border border-purple-900/40 hover:border-purple-500/60 hover:bg-[#25134d]/80 text-zinc-200 hover:text-white transition-all group/link cursor-pointer shadow-md"
                          >
                            <span className="font-medium text-sm line-clamp-2 leading-snug group-hover/link:text-purple-200">
                              {link.title}
                            </span>
                            <span className={`ml-3 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold whitespace-nowrap flex items-center gap-1 border transition-colors ${getActionBadgeStyle(link.actionText)}`}>
                              {link.actionText}
                            </span>
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </AssemblyCard>
                );
              })}
            </div>
          </section>
        )}

        {/* ─────────────────────────────────────────────────────────────
            SECTION 2: INTERACTIVE LEARNING (Learn by Doing)
           ───────────────────────────────────────────────────────────── */}
        {(selectedCategory === 'All' || selectedCategory === 'Interactive') && (
          <section id="interactive" className="space-y-8 scroll-mt-28">
            <div className="border-l-4 border-[#38BDF8] pl-4 py-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] tracking-wider uppercase">
                <Rocket className="w-4 h-4" />
                <span>Hands-On Experience</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white mt-1">
                Interactive Learning – Learn by Doing
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 mt-1">
                Engage with immersive games, step-by-step labs, and community-driven learning platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {INTERACTIVE_RESOURCES.map((item, idx) => (
                <AssemblyCard key={idx} className="h-full">
                  <motion.a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="relative flex flex-col justify-between p-6 rounded-3xl bg-[#14092b]/90 border border-purple-900/50 hover:border-cyan-500/60 backdrop-blur-xl group transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.4)] h-full"
                  >
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                        <GamepadIcon idx={idx} />
                      </div>
                      <h3 className="text-xl font-bold font-heading text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                        {item.title}
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-purple-900/30 flex items-center justify-between">
                      <span className="text-xs font-mono text-zinc-500">Official AWS Platform</span>
                      <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-cyan-500/20 text-[#38BDF8] border border-cyan-500/30">
                        {item.actionText}
                      </span>
                    </div>
                  </motion.a>
                </AssemblyCard>
              ))}
            </div>
          </section>
        )}

        {/* ─────────────────────────────────────────────────────────────
            SECTION 3: WEB DEVELOPMENT ON AWS
           ───────────────────────────────────────────────────────────── */}
        {(selectedCategory === 'All' || selectedCategory === 'Web Dev') && (
          <section id="webdev" className="space-y-8 scroll-mt-28">
            <div className="border-l-4 border-purple-500 pl-4 py-1">
              <div className="flex items-center gap-2 text-xs font-mono text-purple-400 tracking-wider uppercase">
                <Globe className="w-4 h-4" />
                <span>Frontend & Fullstack</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white mt-1">
                Web Development – Static Website & Web Dev on AWS
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 mt-1">
                Learn how to build, host, and scale modern web applications using AWS S3, CloudFront, and Amplify.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {WEB_DEV_RESOURCES.map((item, idx) => (
                <AssemblyCard key={idx} className="h-full">
                  <motion.a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="flex flex-col justify-between p-5 rounded-2xl bg-[#120726]/90 border border-purple-900/40 hover:border-purple-500/60 backdrop-blur-xl group transition-all shadow-md h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300">
                          <Code2 className="w-5 h-5" />
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold border ${getActionBadgeStyle(item.actionText)}`}>
                          {item.actionText}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold font-heading text-white group-hover:text-purple-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-purple-900/30 flex items-center text-xs font-mono text-purple-400 group-hover:translate-x-1 transition-transform">
                      <span>Explore tutorial</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </div>
                  </motion.a>
                </AssemblyCard>
              ))}
            </div>
          </section>
        )}

        {/* ─────────────────────────────────────────────────────────────
            SECTION 4: CERTIFICATION GUIDE
           ───────────────────────────────────────────────────────────── */}
        {(selectedCategory === 'All' || selectedCategory === 'Certification') && (
          <section id="certification" className="space-y-8 scroll-mt-28">
            <div className="border-l-4 border-amber-500 pl-4 py-1">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 tracking-wider uppercase">
                <Award className="w-4 h-4" />
                <span>Industry Recognition</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white mt-1">
                Certification Guide – AWS Certified Cloud Practitioner
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 mt-1">
                The perfect starting point. Access the official exam guide, certification hub, prep materials, and training resources directly.
              </p>
            </div>

            {/* Featured Certification Banner Card */}
            <AssemblyCard>
              <div className="relative rounded-3xl bg-gradient-to-r from-[#1b0d38] via-[#240e48] to-[#16082e] border border-amber-500/40 p-6 sm:p-8 backdrop-blur-xl shadow-[0_10px_35px_rgba(255,153,0,0.15)] overflow-hidden">
                <div className="absolute right-0 top-0 w-80 h-80 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />
                
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-3 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-[#FF9900] border border-amber-500/30 text-xs font-mono font-semibold">
                      <Award className="w-3.5 h-3.5" />
                      <span>FOUNDATIONAL LEVEL (CLF-C02)</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                      AWS Certified Cloud Practitioner
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
                      Validate your overall understanding of the AWS Cloud platform, covering basic cloud concepts, security, compliance, technology, and billing.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://aws.amazon.com/certification/certified-cloud-practitioner/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="white-pill-btn px-6 py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                      <span>View Exam Portal</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href="https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full text-sm font-semibold bg-purple-900/50 hover:bg-purple-800/60 border border-purple-500/40 text-purple-200 flex items-center justify-center gap-2 transition-all"
                    >
                      <span>Download Exam Guide</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Grid of 5 direct links */}
                <div className="mt-8 pt-6 border-t border-purple-900/40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {CERTIFICATION_RESOURCES.map((item, idx) => (
                    <motion.a
                      key={idx}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-[#120625]/80 border border-purple-900/40 hover:border-amber-500/50 hover:bg-[#1f093a] text-zinc-200 transition-all cursor-pointer"
                    >
                      <span className="text-xs sm:text-sm font-medium line-clamp-1">{item.title}</span>
                      <span className="ml-2 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-[#FF9900] border border-amber-500/30 whitespace-nowrap">
                        {item.actionText}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </AssemblyCard>
          </section>
        )}

        {/* ─────────────────────────────────────────────────────────────
            SECTION 5: DEVELOPER RESOURCES & GITHUB RESOURCES (WITH 3D FLIP CARDS)
           ───────────────────────────────────────────────────────────── */}
        {(selectedCategory === 'All' || selectedCategory === 'Developer' || selectedCategory === 'GitHub') && (
          <section id="dev-resources" className="space-y-12 scroll-mt-28">
            
            {/* Developer Resources Sub-Section with 3D Flip Cards */}
            {(selectedCategory === 'All' || selectedCategory === 'Developer') && (
              <div className="space-y-6">
                <div className="border-l-4 border-emerald-500 pl-4 py-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 tracking-wider uppercase">
                    <Terminal className="w-4 h-4" />
                    <span>Technical Hub</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white mt-1">
                    Developer Resources – Extra Dev Resources
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-400 mt-1">
                    Hover or click any card below to flip and explore official documentation & developer tools.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {DEV_EXTRA_RESOURCES.map((item, idx) => (
                    <DevResourceFlipCard
                      key={idx}
                      item={item}
                      actionStyle={getActionBadgeStyle(item.actionText)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* GitHub Resources Sub-Section with 3D Flip Cards */}
            {(selectedCategory === 'All' || selectedCategory === 'GitHub') && (
              <div className="space-y-6 pt-4">
                <div className="border-l-4 border-purple-400 pl-4 py-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-300 tracking-wider uppercase">
                    <Github className="w-4 h-4" />
                    <span>Open Source Repositories</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white mt-1">
                    GitHub Resources
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-400 mt-1">
                    Hover or click to flip the cards and access open-source repositories and sample code.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {GITHUB_RESOURCES.map((item, idx) => (
                    <GitHubResourceFlipCard key={idx} item={item} />
                  ))}
                </div>
              </div>
            )}

          </section>
        )}

      </main>

      {/* ── Spotlight Footer ── */}
      <SpotlightFooter />

    </div>
  );
}

function GamepadIcon({ idx }: { idx: number }) {
  if (idx === 0) return <Rocket className="w-6 h-6" />;
  if (idx === 1) return <Sparkles className="w-6 h-6" />;
  return <Lightbulb className="w-6 h-6" />;
}
