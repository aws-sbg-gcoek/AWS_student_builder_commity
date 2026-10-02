import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, MapPin, Users, Award, Sparkles, ChevronRight, 
  ExternalLink, Clock, CheckCircle2, X, Flame, ArrowUpRight,
  ShieldCheck, Layers, Gift, Terminal
} from 'lucide-react';

export interface StickyEventCard {
  id: string;
  badge: string;
  badgeColor: string;
  category: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: string;
  pricing: string; // e.g. "Free for Students" or "Sponsored ₹0"
  bgGradient: string;
  borderColor: string;
  accentColor: string;
  images: string[];
  description: string;
  highlights: string[];
  techStack: string[];
  swags: string;
  speaker: {
    name: string;
    role: string;
    company: string;
  };
  schedule: { time: string; activity: string }[];
}

const STACKED_EVENTS: StickyEventCard[] = [
  {
    id: 'event-hackathon',
    badge: 'FLAGSHIP HACKATHON',
    badgeColor: 'bg-emerald-500/20 text-[#4EF35E] border-emerald-500/40',
    category: 'Hackathon & Competitions',
    title: 'AWS Cloud Innovate: 24-Hour Collegiate Hackathon',
    date: 'Oct 14 - 15, 2026',
    time: '10:00 AM IST Onwards',
    location: 'Central Advanced Computing Lab & Hybrid Discord',
    attendees: '350+ Builders Registered',
    pricing: '100% Free Entry • ₹1,00,000 Prize Pool',
    bgGradient: 'from-[#190a30] via-[#100523] to-[#080214]',
    borderColor: 'border-purple-500/40',
    accentColor: '#4EF35E',
    images: [
      '/images/aws_hackathon.jpg',
      '/images/aws_swags.jpg',
      '/images/aws_keynote.jpg'
    ],
    description: 'Our flagship 24-hour non-stop collegiate cloud hackathon! Student teams design, architect, and deploy intelligent cloud-native applications using Amazon Bedrock, AWS Lambda, DynamoDB, and Docker.',
    highlights: [
      '₹1,00,000 cash prize pool + official AWS Certification vouchers',
      '1-on-1 mentorship from certified AWS Solutions Architects & Community Builders',
      'Midnight energy drinks, meals, and official AWS Club merchandise',
      'Direct interview fast-track opportunities with cloud partner companies'
    ],
    techStack: ['Amazon Bedrock', 'AWS Lambda', 'DynamoDB', 'Amazon S3', 'Docker'],
    swags: 'Official AWS Hackathon Hoodie, Tech Stickers, $100 Cloud Credits Voucher',
    speaker: {
      name: 'Aditya Patil',
      role: 'AWS Community Builder & Senior Cloud Architect',
      company: 'AWS User Group'
    },
    schedule: [
      { time: '10:00 AM', activity: 'Opening Keynote & Problem Statements Release' },
      { time: '12:00 PM', activity: 'Hacking Commences & Cloud Architecture Mentoring' },
      { time: '08:00 PM', activity: 'Mid-Way Architecture Evaluation & Dinner' },
      { time: '10:00 AM (Day 2)', activity: 'Code Freeze & Live Jury Pitches' }
    ]
  },
  {
    id: 'event-bedrock-masterclass',
    badge: 'LIVE WORKSHOP',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    category: 'Hands-on Cloud Lab',
    title: 'Generative AI & Amazon Bedrock Architecture Masterclass',
    date: 'Saturday • Nov 2, 2026',
    time: '2:30 PM - 6:30 PM IST',
    location: 'Seminar Auditorium 1, GCOEK',
    attendees: '250+ Seats Filled',
    pricing: 'Free Access • $50 Sandbox Credits Included',
    bgGradient: 'from-[#200d3d] via-[#14082a] to-[#0a0317]',
    borderColor: 'border-violet-500/40',
    accentColor: '#A855F7',
    images: [
      '/images/aws_keynote.jpg',
      '/images/aws_hackathon.jpg',
      '/images/aws_swags.jpg'
    ],
    description: 'A deep-dive, interactive masterclass on building enterprise Generative AI agents. Students connect Claude 3.5 Sonnet and open foundation models to private data using Retrieval-Augmented Generation (RAG) on AWS.',
    highlights: [
      'Live code walkthrough: Deploy a serverless RAG pipeline in under 45 minutes',
      'Prepaid AWS sandbox accounts provided for all attendees with zero risk',
      'Hands-on vector embeddings with AWS OpenSearch Serverless',
      'Official Certificate of Attendance accredited by AWS Student Builder Group'
    ],
    techStack: ['Claude 3.5 on Bedrock', 'LangChain', 'Python', 'AWS OpenSearch'],
    swags: 'AWS Swag Badges, Notebooks, $50 AWS Sandbox Credits',
    speaker: {
      name: 'Neha Deshmukh',
      role: 'AI/ML Cloud Engineer & Club Technical Lead',
      company: 'AWS Student Builder Club'
    },
    schedule: [
      { time: '02:30 PM', activity: 'Introduction to Generative AI on AWS & Bedrock' },
      { time: '03:30 PM', activity: 'Hands-on Lab 1: Configuring Foundation Models' },
      { time: '04:45 PM', activity: 'Hands-on Lab 2: Building your Vector RAG Knowledge Base' },
      { time: '06:00 PM', activity: 'Q&A, Quiz Competition & Swag Giveaway' }
    ]
  },
  {
    id: 'event-swag-fest',
    badge: 'ANNUAL FESTIVAL',
    badgeColor: 'bg-amber-500/20 text-[#FF9900] border-amber-500/40',
    category: 'Community Celebration',
    title: 'AWS Swag Fest & Cloud Certification Bootcamp',
    date: 'Dec 05, 2026',
    time: '1:00 PM - 5:30 PM IST',
    location: 'Open Tech Amphitheater, Campus',
    attendees: '450+ Attendees',
    pricing: 'Free For All Students • Swag Kits for Registrations',
    bgGradient: 'from-[#240d2f] via-[#160620] to-[#0c0314]',
    borderColor: 'border-amber-500/40',
    accentColor: '#FF9900',
    images: [
      '/images/aws_swags.jpg',
      '/images/aws_keynote.jpg',
      '/images/aws_hackathon.jpg'
    ],
    description: 'Celebration of AWS certified student builders! Distribution of official AWS swag kits, metal water bottles, developer t-shirts, lapel pins, stickers, and exam walkthroughs for AWS Certified Cloud Practitioner.',
    highlights: [
      'Over 250+ official AWS Developer T-Shirts, metal bottles & sticker sets distributed',
      'Exclusive 50% discount vouchers for official AWS Certification exams',
      'Fireside networking chat with alumni working at top cloud enterprises',
      'Project showcase expo with peer feedback and awards'
    ],
    techStack: ['AWS Cloud Practitioner', 'Solutions Architect', 'SkillBuilder'],
    swags: 'Official AWS Bags, T-Shirts, Metal Water Bottles, Stickers',
    speaker: {
      name: 'Rohan Kulkarni',
      role: 'President - AWS Student Builder Group',
      company: 'GCOE Kolhapur'
    },
    schedule: [
      { time: '01:00 PM', activity: 'Certification Hall of Fame & Keynote' },
      { time: '02:15 PM', activity: 'Exam Preparation Tips & Free Practice Tests' },
      { time: '03:45 PM', activity: 'Swag Kit Distribution & Stage Photo Session' },
      { time: '04:30 PM', activity: 'Networking High Tea & Project Demos' }
    ]
  },
  {
    id: 'event-devops-bootcamp',
    badge: 'INTENSIVE BOOTCAMP',
    badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/40',
    category: 'Cloud Engineering',
    title: 'Serverless DevOps & CI/CD Pipelines on AWS',
    date: 'Jan 18 - 19, 2027',
    time: '11:00 AM - 4:00 PM IST',
    location: 'Software Engineering Wing & Live Stream',
    attendees: '280+ Seats Enrolled',
    pricing: 'Free Registration • Capstone Project Included',
    bgGradient: 'from-[#0e163b] via-[#090e29] to-[#050718]',
    borderColor: 'border-sky-500/40',
    accentColor: '#38BDF8',
    images: [
      '/images/aws_hackathon.jpg',
      '/images/aws_keynote.jpg',
      '/images/aws_swags.jpg'
    ],
    description: 'Master enterprise-grade DevOps automation. Students construct end-to-end continuous integration and deployment pipelines using AWS CodePipeline, GitHub Actions, AWS CDK, and automated CloudFormation stacks.',
    highlights: [
      'Construct automated zero-downtime serverless deployment pipelines',
      'Infrastructure as Code (IaC) using AWS Cloud Development Kit (CDK) & TypeScript',
      'Deploy containerized microservices to Amazon ECS & Fargate',
      'Earn verifiable digital badge for DevOps on AWS upon capstone submission'
    ],
    techStack: ['AWS CDK', 'GitHub Actions', 'CodePipeline', 'ECS Fargate', 'TypeScript'],
    swags: 'DevOps Digital Badge, AWS Cloud Architect Desk Pad, Stickers',
    speaker: {
      name: 'Vikas Patil',
      role: 'DevOps & Infrastructure Architect',
      company: 'Cloud Native Labs'
    },
    schedule: [
      { time: '11:00 AM', activity: 'Modern DevOps Principles & Architecture on AWS' },
      { time: '12:30 PM', activity: 'Hands-on Lab 1: GitHub Actions to AWS CodeDeploy' },
      { time: '02:00 PM', activity: 'Hands-on Lab 2: Infrastructure as Code with AWS CDK' },
      { time: '03:30 PM', activity: 'Automated Testing, Production Rollouts & Q&A' }
    ]
  }
];

interface StickyEventsStackProps {
  onJoinClick?: () => void;
}

export function StickyEventsStack({ onJoinClick }: StickyEventsStackProps) {
  // Modal details state
  const [selectedEvent, setSelectedEvent] = useState<StickyEventCard | null>(null);
  const [activeModalImage, setActiveModalImage] = useState<string>('');
  const [selectedImagePerCard, setSelectedImagePerCard] = useState<Record<string, number>>({});
  const [isRsvpd, setIsRsvpd] = useState<boolean>(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  const [isMobile, setIsMobile] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── High-Performance Scroll-Driven Dynamic Stacking Animation ──
  // As subsequent cards slide up over previous ones, the cards underneath smoothly scale down,
  // shift slightly, and apply a subtle depth shading.
  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      const windowH = window.innerHeight;
      const cards = cardRefs.current;
      if (!cards || cards.length === 0) return;

      const stickyBase = isMobile ? 68 : 84;
      const stickyStep = isMobile ? 18 : 28;

      // Calculate the progress of each card reaching its sticky position
      const progresses = cards.map((card, idx) => {
        if (!card) return 0;
        const rect = card.getBoundingClientRect();
        const stickyTop = stickyBase + idx * stickyStep;
        
        // Progress from when card enters viewport up to when it hits its sticky pinned top
        const startDistance = windowH * 0.75;
        const currentDistance = rect.top - stickyTop;
        const progress = Math.max(0, Math.min(1, 1 - (currentDistance / startDistance)));
        return progress;
      });

      // Find which card is currently highest in focus
      let highestActive = 0;
      cards.forEach((card, idx) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const stickyTop = stickyBase + idx * stickyStep;
        if (rect.top <= stickyTop + 40) {
          highestActive = idx;
        }
      });
      setActiveCardIndex(highestActive);

      // Apply dynamic scale-down & top-offset stacking effect to cards underneath
      cards.forEach((card, i) => {
        if (!card) return;
        let overlap = 0;
        for (let j = i + 1; j < cards.length; j++) {
          overlap += progresses[j];
        }

        // Slight scale down: ~3.5% per subsequent card stacked on top
        const scale = Math.max(0.86, 1 - overlap * 0.038);
        // Subtle brightness dimming for authentic depth
        const dim = Math.min(0.24, overlap * 0.07);
        // Subtle top offset adjust
        const translateY = overlap * (isMobile ? 2 : 4);

        const innerMotion = card.querySelector<HTMLElement>('.card-inner-motion');
        if (innerMotion) {
          innerMotion.style.transform = `scale(${scale}) translateY(${translateY}px)`;
          innerMotion.style.filter = `brightness(${1 - dim})`;
        }
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isMobile]);

  const handleCardImageSelect = (cardId: string, imgIdx: number) => {
    setSelectedImagePerCard(prev => ({ ...prev, [cardId]: imgIdx }));
  };

  const openModal = (event: StickyEventCard) => {
    setSelectedEvent(event);
    const currentIdx = selectedImagePerCard[event.id] || 0;
    setActiveModalImage(event.images[currentIdx]);
    setIsRsvpd(false);
  };

  const scrollToCard = (index: number) => {
    const card = cardRefs.current[index];
    if (card) {
      const stickyBase = isMobile ? 68 : 84;
      const stickyStep = isMobile ? 18 : 28;
      const targetTop = card.getBoundingClientRect().top + window.scrollY - (stickyBase + index * stickyStep);
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="events" 
      className="relative py-20 sm:py-28 bg-[#07020E] border-b border-purple-900/30 overflow-visible"
    >
      <div id="team" className="absolute -top-20" />
      {/* Background Ambience and Fine Grid */}
      <div className="absolute inset-0 bg-hero-grid opacity-30 pointer-events-none" />
      <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-purple-900/15 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[550px] h-[550px] bg-indigo-900/15 blur-[160px] rounded-full pointer-events-none" />

      {/* ── Section Title & Introduction ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 sm:mb-14 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-mono mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.25)]"
        >
          <Flame className="w-3.5 h-3.5 text-[#4EF35E] animate-pulse" />
          <span>UPCOMING SESSIONS • HACKATHONS • SWAG FESTS</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4 sm:mb-5"
        >
          Our Events &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-[#4EF35E]">
            Hands-on Experiences
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-zinc-300 text-xs sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2"
        >
          Scroll down to explore our student events, photo galleries, prize pools, and hands-on workshops. Cards stack seamlessly as you scroll!
        </motion.p>

        {/* Quick event stats pill strip */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 sm:mt-8 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-6 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#130728]/80 border border-purple-500/20 backdrop-blur-md"
        >
          <span className="text-[11px] sm:text-xs font-mono text-zinc-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4EF35E]" />
            <strong>4 Major Events</strong>
          </span>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span className="text-[11px] sm:text-xs font-mono text-zinc-300 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <strong>1,200+ Student Builders</strong>
          </span>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span className="text-[11px] sm:text-xs font-mono text-zinc-300 flex items-center gap-1.5">
            <Gift className="w-3.5 h-3.5 text-[#FF9900]" />
            <strong>₹5L+ Swags & Credits</strong>
          </span>
        </motion.div>

        {/* ── Interactive Card Stack Step Navigation Bar ── */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
          {STACKED_EVENTS.map((event, idx) => {
            const isActive = activeCardIndex === idx;
            return (
              <button
                key={event.id}
                type="button"
                onClick={() => scrollToCard(idx)}
                className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-purple-600/30 text-white border border-purple-400/60 shadow-[0_0_15px_rgba(168,85,247,0.35)] scale-105'
                    : 'bg-black/40 text-zinc-400 border border-white/10 hover:border-purple-500/30 hover:text-zinc-200'
                }`}
              >
                <span 
                  className="w-1.5 h-1.5 rounded-full" 
                  style={{ backgroundColor: event.accentColor }} 
                />
                <span className="font-semibold">0{idx + 1}</span>
                <span className="hidden sm:inline text-zinc-300">
                  {event.title.split(':')[0].replace('AWS ', '')}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── STICKY STACKED CARDS CONTAINER ── */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 relative">
        <div className="space-y-16 sm:space-y-24 pb-28 sm:pb-44">
          {STACKED_EVENTS.map((event, index) => {
            // Incremental sticky top offsets:
            // Desktop: 84px + index * 28px (84px, 112px, 140px, 168px)
            // Mobile: 68px + index * 18px (68px, 86px, 104px, 122px)
            const stickyTop = isMobile ? (68 + index * 18) : (84 + index * 28);
            const currentImgIdx = selectedImagePerCard[event.id] || 0;
            const currentImg = event.images[currentImgIdx] || event.images[0];

            return (
              <div
                key={event.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                style={{
                  top: `${stickyTop}px`,
                  zIndex: 10 + index * 2,
                }}
                className="sticky will-change-transform"
              >
                {/* Colored ambient glow behind each card matching its accentColor */}
                <div 
                  aria-hidden="true"
                  className="absolute -inset-1 sm:-inset-2 rounded-3xl blur-xl opacity-25 pointer-events-none transition-opacity duration-500"
                  style={{ backgroundColor: event.accentColor }}
                />

                {/* ── Inner Animated Card with Scale-Down & Drop-Shadow Stacking ── */}
                <div 
                  className={`card-inner-motion relative rounded-2xl sm:rounded-3xl lg:rounded-[32px] bg-gradient-to-br ${event.bgGradient} border ${event.borderColor} shadow-[0_-18px_45px_rgba(0,0,0,0.95),0_10px_30px_rgba(0,0,0,0.8)] p-4 sm:p-7 lg:p-9 backdrop-blur-2xl transition-all duration-150 ease-out overflow-hidden group origin-top`}
                >
                  {/* Glowing top line accent with individual event color */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1.5 opacity-90 transition-opacity"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${event.accentColor}, #A855F7, transparent)`
                    }}
                  />

                  {/* Subtle watermark background number (01, 02, 03, 04) */}
                  <div 
                    aria-hidden="true" 
                    className="absolute right-3 bottom-2 text-5xl sm:text-8xl lg:text-9xl font-black text-white/[0.03] select-none pointer-events-none font-mono"
                  >
                    0{index + 1}
                  </div>

                  {/* 2-COLUMN CONTENT: Image + Details/Pricing */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center relative z-10">
                    
                    {/* ── LEFT COLUMN: Image Showcase with interactive thumbnails & photo indicators ── */}
                    <div className="lg:col-span-6 flex flex-col justify-between">
                      <div 
                        className="relative aspect-video sm:aspect-[16/10] max-h-[175px] sm:max-h-none rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-2xl group/img cursor-pointer bg-black/40"
                        onClick={() => openModal(event)}
                      >
                        <img
                          src={currentImg}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                        {/* Top status badges */}
                        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-wrap gap-1.5 sm:gap-2">
                          <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold border backdrop-blur-md shadow-md ${event.badgeColor}`}>
                            {event.badge}
                          </span>
                          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono bg-black/60 text-purple-200 border border-purple-500/30 backdrop-blur-md">
                            {event.category}
                          </span>
                        </div>

                        {/* Bottom Image Caption & Click Hint */}
                        <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between text-xs text-white bg-black/70 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl border border-white/10">
                          <span className="flex items-center gap-1 font-medium text-[10px] sm:text-[11px]">
                            <Sparkles className="w-3 h-3 text-[#4EF35E]" />
                            Photo {currentImgIdx + 1} of {event.images.length}
                          </span>
                          <span className="text-purple-300 font-mono text-[10px] sm:text-[11px] underline flex items-center gap-1 group-hover/img:text-white">
                            Details <ArrowUpRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>

                      {/* Interactive Thumbnail Gallery Strip */}
                      <div className="flex items-center gap-2 mt-2 sm:mt-3">
                        {event.images.map((img, imgIdx) => (
                          <button
                            key={imgIdx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCardImageSelect(event.id, imgIdx);
                            }}
                            className={`relative flex-1 h-9 sm:h-13 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                              currentImgIdx === imgIdx
                                ? 'border-[#4EF35E] scale-102 shadow-[0_0_12px_rgba(78,243,94,0.4)]'
                                : 'border-white/10 opacity-60 hover:opacity-100'
                            }`}
                          >
                            <img src={img} alt={`${event.title} preview ${imgIdx}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* ── RIGHT COLUMN: Event Details, Pricing, Swags & Actions ── */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-3 sm:space-y-4">
                      
                      {/* Date, Time & Venue */}
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-mono text-purple-300 mb-1.5 sm:mb-2">
                          <span className="inline-flex items-center gap-1 text-[#4EF35E] font-semibold">
                            <Calendar className="w-3.5 h-3.5" />
                            {event.date}
                          </span>
                          <span className="text-zinc-600">•</span>
                          <span className="inline-flex items-center gap-1 text-zinc-300">
                            <Clock className="w-3.5 h-3.5 text-zinc-400" />
                            {event.time}
                          </span>
                        </div>

                        {/* Main Title */}
                        <h3 
                          onClick={() => openModal(event)}
                          className="text-lg sm:text-2xl lg:text-3xl font-black text-white leading-snug mb-1.5 sm:mb-2 group-hover:text-purple-200 transition-colors cursor-pointer"
                        >
                          {event.title}
                        </h3>

                        {/* Location & Attendance */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-zinc-400 font-medium mb-2 sm:mb-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                            {event.location}
                          </span>
                          <span className="text-zinc-600">•</span>
                          <span className="flex items-center gap-1 text-zinc-300">
                            <Users className="w-3.5 h-3.5 text-[#4EF35E] flex-shrink-0" />
                            {event.attendees}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-3 line-clamp-2">
                          {event.description}
                        </p>

                        {/* Key Highlights list (visible on tablet & desktop, condensed on small mobile) */}
                        <div className="space-y-1.5 mb-3 hidden sm:block">
                          {event.highlights.slice(0, 2).map((item, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#4EF35E] flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        {/* Pricing & Free Access Strip */}
                        <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10 flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-4">
                          <div className="flex items-center gap-2">
                            <div className="p-1 rounded-lg bg-emerald-500/20 text-[#4EF35E]">
                              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </div>
                            <div>
                              <div className="text-[9px] sm:text-[10px] font-mono text-zinc-400 uppercase">Pricing & Access</div>
                              <div className="text-xs sm:text-sm font-bold text-white">{event.pricing}</div>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-200">
                              🎁 {event.swags.split(',')[0]}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => openModal(event)}
                          className="purple-glow-btn text-white text-xs sm:text-sm font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-full inline-flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                        >
                          <span>View Details</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={onJoinClick}
                          className="white-pill-btn text-xs sm:text-sm font-bold px-4 sm:px-6 py-2 sm:py-2.5 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                        >
                          RSVP Free Seat
                        </button>
                      </div>

                    </div>

                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* ─── FULL-SCREEN EVENT DETAILS & PHOTO LIGHTBOX MODAL ─── */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0c031c] border border-purple-500/40 shadow-2xl p-6 sm:p-8 text-white">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6 pr-8">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`px-3 py-0.5 rounded-full text-xs font-mono font-bold border ${selectedEvent.badgeColor}`}>
                  {selectedEvent.badge}
                </span>
                <span className="px-3 py-0.5 rounded-full text-xs font-mono text-purple-200 bg-purple-950/60 border border-purple-500/30">
                  {selectedEvent.category}
                </span>
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#4EF35E]" /> {selectedEvent.date}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {selectedEvent.title}
              </h3>
            </div>

            {/* Large Lightbox Image with Thumbnail Selector */}
            <div className="mb-8">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-purple-500/30 shadow-2xl bg-black">
                <img
                  src={activeModalImage || selectedEvent.images[0]}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>

              {/* Thumbnail Strip inside Modal */}
              <div className="flex items-center gap-3 mt-3 overflow-x-auto pb-1">
                {selectedEvent.images.map((imgUrl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveModalImage(imgUrl)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                      activeModalImage === imgUrl
                        ? 'border-[#4EF35E] scale-105 shadow-[0_0_12px_rgba(78,243,94,0.4)]'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left 2 Cols: Description, Agenda & Highlights */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h4 className="text-xs font-mono text-purple-300 uppercase tracking-wider mb-2 font-bold">
                    Event Overview
                  </h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* What You Will Gain */}
                <div>
                  <h4 className="text-xs font-mono text-purple-300 uppercase tracking-wider mb-3 font-bold">
                    Highlights & Learning Takeaways
                  </h4>
                  <div className="space-y-2">
                    {selectedEvent.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-[#4EF35E] flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timetable / Agenda */}
                <div>
                  <h4 className="text-xs font-mono text-purple-300 uppercase tracking-wider mb-3 font-bold">
                    Schedule & Timeline
                  </h4>
                  <div className="space-y-2 border-l-2 border-purple-500/30 pl-4 ml-1">
                    {selectedEvent.schedule.map((slot, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-500 border border-white" />
                        <div className="text-xs font-mono text-[#4EF35E] font-bold">{slot.time}</div>
                        <div className="text-xs sm:text-sm text-white font-medium">{slot.activity}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Col: Speaker, Swags, RSVP Box */}
              <div className="space-y-6">
                
                {/* Speaker Card */}
                <div className="p-4 rounded-2xl bg-[#170a30] border border-purple-500/20">
                  <div className="text-[10px] font-mono text-zinc-400 mb-2">SESSION MENTOR / SPEAKER</div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-700/40 border border-purple-400 flex items-center justify-center font-bold text-white font-mono">
                      {selectedEvent.speaker.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{selectedEvent.speaker.name}</div>
                      <div className="text-xs text-purple-300">{selectedEvent.speaker.role}</div>
                      <div className="text-[11px] text-zinc-400">{selectedEvent.speaker.company}</div>
                    </div>
                  </div>
                </div>

                {/* Swags Box */}
                <div className="p-4 rounded-2xl bg-[#170a30] border border-purple-500/20">
                  <div className="text-[10px] font-mono text-zinc-400 mb-1">OFFICIAL SWAGS & PERKS</div>
                  <div className="flex items-start gap-2">
                    <Award className="w-5 h-5 text-[#FF9900] flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-zinc-200">{selectedEvent.swags}</span>
                  </div>
                </div>

                {/* RSVP Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-500/40 text-center">
                  <div className="text-xs font-mono text-[#4EF35E] font-bold mb-1">
                    {selectedEvent.pricing}
                  </div>
                  <div className="text-xs text-zinc-300 mb-4">
                    Instant confirmation & access to workshop repositories.
                  </div>

                  {isRsvpd ? (
                    <div className="py-2.5 px-4 rounded-full bg-emerald-500/20 border border-emerald-400 text-[#4EF35E] text-xs font-bold flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>RSVP Confirmed! See you there!</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setIsRsvpd(true);
                        setTimeout(() => onJoinClick?.(), 600);
                      }}
                      className="white-pill-btn w-full py-3 rounded-full text-xs sm:text-sm font-bold cursor-pointer hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                    >
                      Confirm Free Registration
                    </button>
                  )}
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}

