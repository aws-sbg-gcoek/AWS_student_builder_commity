import React, { useState, useEffect } from 'react';
import { 
  Calendar, MapPin, Users, Award, Sparkles, ChevronRight, ChevronLeft, 
  ExternalLink, Clock, Tag, CheckCircle2, X, Filter, Flame, ArrowUpRight
} from 'lucide-react';

export interface EventItem {
  id: string;
  title: string;
  category: 'Workshop' | 'Hackathon' | 'Bootcamp' | 'Certification' | 'Swag & Perks';
  status: 'Upcoming' | 'Registration Open' | 'Completed';
  date: string;
  time: string;
  location: string;
  attendees: string;
  coverImage: string;
  gallery: string[];
  description: string;
  highlights: string[];
  tools: string[];
  swags: string;
  speaker: {
    name: string;
    role: string;
    avatar: string;
  };
  agenda: { time: string; session: string }[];
}

const EVENTS_DATA: EventItem[] = [
  {
    id: 'aws-innovate-hackathon',
    title: 'AWS Cloud Innovate: 24-Hour Collegiate Hackathon',
    category: 'Hackathon',
    status: 'Registration Open',
    date: 'Oct 14 - 15, 2026',
    time: '10:00 AM IST onwards',
    location: 'Central Computing Lab & Virtual Discord',
    attendees: '320+ Builders Registered',
    coverImage: '/images/aws_hackathon.jpg',
    gallery: [
      '/images/aws_hackathon.jpg',
      '/images/aws_swags.jpg',
      '/images/aws_keynote.jpg'
    ],
    description: 'Our flagship 24-hour collegiate cloud hackathon where student teams design, architect, and deploy intelligent cloud-native solutions using Amazon Bedrock, AWS Lambda, and DynamoDB.',
    highlights: [
      'Over ₹1,00,000 in cash prizes & official AWS certification vouchers',
      'Direct 1-on-1 mentorship from certified AWS Solutions Architects',
      'Free meals, midnight snacks, RedBull, and official AWS Club merchandise',
      'Top 3 teams receive fast-track interview consideration with cloud sponsors'
    ],
    tools: ['Amazon Bedrock', 'AWS Lambda', 'DynamoDB', 'Amazon S3', 'Docker'],
    swags: 'AWS Hackathon Hoodie, Tech Stickers, $100 Cloud Credits Voucher',
    speaker: {
      name: 'Aditya Patil',
      role: 'AWS Community Builder & Cloud Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    agenda: [
      { time: '10:00 AM', session: 'Opening Keynote & Problem Statements Release' },
      { time: '12:00 PM', session: 'Hacking Begins & Cloud Architecture Mentoring' },
      { time: '08:00 PM', session: 'Mid-Way Architecture Evaluation & Dinner' },
      { time: '10:00 AM (Day 2)', session: 'Code Freeze & Live Jury Pitches' }
    ]
  },
  {
    id: 'aws-bedrock-masterclass',
    title: 'Generative AI & Bedrock Architecture Masterclass',
    category: 'Workshop',
    status: 'Upcoming',
    date: 'Next Saturday • Nov 2, 2026',
    time: '3:00 PM - 6:30 PM IST',
    location: 'Seminar Auditorium 1, GCOEK',
    attendees: '240+ Seats Filled',
    coverImage: '/images/aws_keynote.jpg',
    gallery: [
      '/images/aws_keynote.jpg',
      '/images/aws_hackathon.jpg',
      '/images/aws_swags.jpg'
    ],
    description: 'A deep-dive, interactive workshop on building production-grade Generative AI agents. Students connect Claude 3.5 Sonnet and Llama models to private data using Retrieval-Augmented Generation (RAG) on AWS.',
    highlights: [
      'Live code walkthrough: Deploy a serverless RAG pipeline in under 45 minutes',
      'Free sandbox AWS accounts provided with prepaid credits for every attendee',
      'Step-by-step guidance on vector embeddings with OpenSearch Serverless',
      'Certificate of Attendance accredited by AWS Student Builder Group'
    ],
    tools: ['Claude 3.5 on Bedrock', 'LangChain', 'Python', 'AWS OpenSearch'],
    swags: 'AWS Swag Badges, Notebooks, $50 AWS Sandbox Credits',
    speaker: {
      name: 'Neha Deshmukh',
      role: 'AI/ML Cloud Engineer & Club Technical Lead',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    agenda: [
      { time: '03:00 PM', session: 'Welcome & Introduction to Amazon Bedrock Ecosystem' },
      { time: '03:45 PM', session: 'Hands-on Lab 1: Configuring Foundation Models' },
      { time: '04:45 PM', session: 'Hands-on Lab 2: Building your Vector RAG Knowledge Base' },
      { time: '06:00 PM', session: 'Q&A, Quiz Competition & Swag Giveaway' }
    ]
  },
  {
    id: 'aws-swag-and-cloud-day',
    title: 'AWS Community Swag Fest & Certification Bootcamp',
    category: 'Swag & Perks',
    status: 'Completed',
    date: 'Past Event • Sep 2026',
    time: '2:00 PM - 5:00 PM IST',
    location: 'Tech Innovation Amphitheater',
    attendees: '400+ Attended',
    coverImage: '/images/aws_swags.jpg',
    gallery: [
      '/images/aws_swags.jpg',
      '/images/aws_keynote.jpg',
      '/images/aws_hackathon.jpg'
    ],
    description: 'Celebration of AWS certified student builders! Distribution of exclusive AWS swag gear, bottles, lapel pins, stickers, and hands-on guidance on clearing the AWS Certified Cloud Practitioner exam.',
    highlights: [
      'Over 200+ exclusive AWS T-shirts, bottles, and sticker packs distributed',
      '30+ students cleared their official AWS Cloud Practitioner exam',
      'Fireside chat with alumni working at top cloud consulting firms',
      'Networking and project show-and-tell mixer'
    ],
    tools: ['AWS Cloud Practitioner', 'Solutions Architect', 'SkillBuilder'],
    swags: 'Official AWS Bags, T-Shirts, Metal Water Bottles, Stickers',
    speaker: {
      name: 'Rohan Kulkarni',
      role: 'President - AWS Student Builder Group',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    agenda: [
      { time: '02:00 PM', session: 'Celebration & Certification Hall of Fame' },
      { time: '02:45 PM', session: 'Exam Preparation Tips & Free Practice Tests' },
      { time: '03:45 PM', session: 'Swag Kit Distribution & Photo Session' },
      { time: '04:30 PM', session: 'High Tea & Peer Networking' }
    ]
  }
];

interface EventsShowcaseProps {
  onJoinClick?: () => void;
}

export function EventsShowcase({ onJoinClick }: EventsShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeEventIndex, setActiveEventIndex] = useState<number>(0);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [modalActiveImage, setModalActiveImage] = useState<string>('');
  const [isRsvpd, setIsRsvpd] = useState<boolean>(false);

  const categories = ['All', 'Hackathon', 'Workshop', 'Swag & Perks'];

  const filteredEvents = activeCategory === 'All' 
    ? EVENTS_DATA 
    : EVENTS_DATA.filter(ev => ev.category === activeCategory || (activeCategory === 'Swag & Perks' && ev.category === 'Swag & Perks'));

  const featuredEvent = EVENTS_DATA[activeEventIndex] || EVENTS_DATA[0];

  // Auto carousel rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveEventIndex(prev => (prev + 1) % EVENTS_DATA.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const openEventDetails = (event: EventItem) => {
    setSelectedEvent(event);
    setModalActiveImage(event.coverImage);
    setIsRsvpd(false);
  };

  return (
    <section id="events" className="py-24 relative overflow-hidden bg-[#07020E] border-b border-purple-900/30">
      {/* Background glow effects */}
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-purple-900/15 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] bg-indigo-900/15 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-hero-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-mono mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Flame className="w-3.5 h-3.5 text-[#4EF35E] animate-pulse" />
            <span>CAMPUS WORKSHOPS, HACKATHONS & SWAG FESTS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-5">
            Explore Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-[#4EF35E]">
              AWS Events
            </span>
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Get hands-on with real cloud infrastructure, compete in hackathons, win exclusive AWS swags, and level up alongside passionate collegiate developers.
          </p>
        </div>

        {/* ── Featured Spotlight Animated Hero Card ── */}
        <div className="mb-16">
          <div className="relative rounded-3xl bg-gradient-to-b from-[#170a30]/90 to-[#0c041b]/95 border border-purple-500/30 p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden group">
            
            {/* Top glowing ambient line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-[#4EF35E] to-indigo-500 opacity-80" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Interactive Image Frame with overlay badges */}
              <div className="lg:col-span-7 relative">
                <div 
                  className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-purple-500/30 shadow-2xl cursor-pointer group/img"
                  onClick={() => openEventDetails(featuredEvent)}
                >
                  <img
                    src={featuredEvent.coverImage}
                    alt={featuredEvent.title}
                    className="w-full h-full object-cover transform group-hover/img:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07020E] via-transparent to-black/20" />

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#110524]/90 backdrop-blur-md text-[#4EF35E] border border-[#4EF35E]/40 flex items-center gap-1.5 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-[#4EF35E] animate-ping" />
                      {featuredEvent.status}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-purple-950/80 backdrop-blur-md text-purple-200 border border-purple-500/30">
                      {featuredEvent.category}
                    </span>
                  </div>

                  {/* Bottom click overlay hint */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-zinc-300 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 opacity-90 group-hover/img:opacity-100 transition-opacity">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-[#4EF35E]" />
                      Click photo to open full gallery & details
                    </span>
                    <span className="text-purple-300 font-mono text-[11px] underline flex items-center gap-1">
                      View details <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Thumbnails to switch featured event */}
                <div className="flex items-center gap-3 mt-4">
                  {EVENTS_DATA.map((ev, idx) => (
                    <button
                      key={ev.id}
                      type="button"
                      onClick={() => setActiveEventIndex(idx)}
                      className={`relative flex-1 h-14 rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                        activeEventIndex === idx
                          ? 'border-[#4EF35E] scale-102 shadow-[0_0_15px_rgba(78,243,94,0.3)]'
                          : 'border-purple-500/20 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={ev.coverImage} alt={ev.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-1">
                        <span className="text-[10px] font-bold text-white line-clamp-1 text-center font-mono">
                          {ev.category}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Event Info & RSVP */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-300 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-[#4EF35E]" />
                    <span>{featuredEvent.date}</span>
                    <span className="text-zinc-600">•</span>
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{featuredEvent.time}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3">
                    {featuredEvent.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium mb-4">
                    <MapPin className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                    <span>{featuredEvent.location}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5 line-clamp-3">
                    {featuredEvent.description}
                  </p>

                  {/* Highlights Pill list */}
                  <div className="space-y-2 mb-6">
                    {featuredEvent.highlights.slice(0, 2).map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-[#4EF35E] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Swag perk alert */}
                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center gap-2.5 mb-6">
                    <Award className="w-5 h-5 text-[#FF9900] flex-shrink-0" />
                    <div className="text-xs">
                      <span className="font-bold text-white">Event Swag: </span>
                      <span className="text-purple-200">{featuredEvent.swags}</span>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => openEventDetails(featuredEvent)}
                    className="purple-glow-btn text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>View Event Details & Photos</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={onJoinClick}
                    className="white-pill-btn text-xs sm:text-sm font-bold px-6 py-3 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    Register RSVP Free
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* ── Category Filter Bar ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>All Event Showcases</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-purple-900/50 text-purple-300 border border-purple-500/20">
                {filteredEvents.length} Events
              </span>
            </h3>
            <p className="text-xs text-zinc-400 mt-1">Browse photos, workshops, bootcamps and past gatherings.</p>
          </div>

          <div className="inline-flex p-1 rounded-full bg-[#120826]/90 border border-purple-500/20 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-medium px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-purple-600 text-white font-bold shadow-[0_0_12px_rgba(147,51,234,0.4)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Grid of All Event Cards with Animated Hover & Details ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="stat-card-image flex flex-col justify-between group overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
            >
              <div>
                {/* Image container with hover zoom */}
                <div 
                  className="relative aspect-video rounded-xl overflow-hidden mb-4 border border-purple-500/20 cursor-pointer"
                  onClick={() => openEventDetails(event)}
                >
                  <img
                    src={event.coverImage}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0520] via-transparent to-black/20" />
                  
                  {/* Status tag */}
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#110524]/90 backdrop-blur-md text-[#4EF35E] border border-[#4EF35E]/40">
                    {event.status}
                  </span>

                  {/* Category tag */}
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-purple-950/80 backdrop-blur-md text-purple-200 border border-purple-500/30">
                    {event.category}
                  </span>

                  {/* Photo count indicator */}
                  <span className="absolute bottom-2.5 right-3 text-[11px] font-mono px-2 py-0.5 rounded-md bg-black/70 text-zinc-300 flex items-center gap-1">
                    📷 {event.gallery.length} Photos
                  </span>
                </div>

                {/* Event Date & Location */}
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-2">
                  <span className="text-[#4EF35E] font-semibold flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1 truncate max-w-[140px]">
                    <MapPin className="w-3 h-3 text-purple-400" />
                    {event.location.split(',')[0]}
                  </span>
                </div>

                {/* Event Title */}
                <h4 
                  onClick={() => openEventDetails(event)}
                  className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-purple-300 transition-colors cursor-pointer"
                >
                  {event.title}
                </h4>

                {/* Description */}
                <p className="text-xs text-zinc-300 leading-relaxed mb-4 line-clamp-2">
                  {event.description}
                </p>

                {/* Tools/Tech covered */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {event.tools.slice(0, 3).map((tool, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/50 text-purple-200 border border-purple-500/20">
                      {tool}
                    </span>
                  ))}
                  {event.tools.length > 3 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-900/30 text-zinc-400">
                      +{event.tools.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Card Footer with Actions */}
              <div className="pt-4 border-t border-purple-500/20 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => openEventDetails(event)}
                  className="text-xs font-semibold text-purple-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Explore & Photos</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={onJoinClick}
                  className="text-[11px] font-bold px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all cursor-pointer"
                >
                  RSVP
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* ── Community Numbers Strip ── */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-[#120726]/80 border border-purple-500/20 backdrop-blur-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-purple-500/20">
            <div className="pt-2 md:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-white font-mono">18+</div>
              <div className="text-xs text-zinc-400 mt-1">Workshops & Labs Hosted</div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-[#4EF35E] font-mono">1,200+</div>
              <div className="text-xs text-zinc-400 mt-1">Student Participants</div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-purple-400 font-mono">₹5,00,000+</div>
              <div className="text-xs text-zinc-400 mt-1">Cloud Credits Sponsored</div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-[#FF9900] font-mono">100%</div>
              <div className="text-xs text-zinc-400 mt-1">Free For All Students</div>
            </div>
          </div>
        </div>

      </div>

      {/* ─── INTERACTIVE EVENT DETAILS & PHOTO LIGHTBOX MODAL ─── */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0e041d] border border-purple-500/40 shadow-2xl p-6 sm:p-8 text-white">
            
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
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#110524] text-[#4EF35E] border border-[#4EF35E]/40">
                  {selectedEvent.status}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-500/30">
                  {selectedEvent.category}
                </span>
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#4EF35E]" /> {selectedEvent.date}
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                {selectedEvent.title}
              </h3>
            </div>

            {/* Interactive Image Gallery Carousel inside Modal */}
            <div className="mb-8">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-purple-500/30 shadow-2xl bg-black">
                <img
                  src={modalActiveImage}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>

              {/* Thumbnail Selector */}
              <div className="flex items-center gap-3 mt-3 overflow-x-auto pb-2">
                {selectedEvent.gallery.map((imgUrl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setModalActiveImage(imgUrl)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                      modalActiveImage === imgUrl
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
              
              {/* Left 2 Cols: Description & Agenda */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h4 className="text-sm font-mono text-purple-300 uppercase tracking-wider mb-2 font-bold">
                    Event Overview
                  </h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Key Highlights */}
                <div>
                  <h4 className="text-sm font-mono text-purple-300 uppercase tracking-wider mb-3 font-bold">
                    What You Will Gain
                  </h4>
                  <div className="space-y-2.5">
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
                  <h4 className="text-sm font-mono text-purple-300 uppercase tracking-wider mb-3 font-bold">
                    Event Schedule
                  </h4>
                  <div className="space-y-2 border-l-2 border-purple-500/30 pl-4 ml-1">
                    {selectedEvent.agenda.map((ag, i) => (
                      <div key={i} className="relative group">
                        <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-500 border border-white" />
                        <div className="text-xs font-mono text-[#4EF35E] font-bold">{ag.time}</div>
                        <div className="text-xs sm:text-sm text-white font-medium">{ag.session}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Col: Speaker, Swags, RSVP action */}
              <div className="space-y-6">
                
                {/* Speaker Card */}
                <div className="p-4 rounded-2xl bg-[#180b33] border border-purple-500/20">
                  <div className="text-[11px] font-mono text-zinc-400 mb-3">KEYNOTE SPEAKER</div>
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedEvent.speaker.avatar}
                      alt={selectedEvent.speaker.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-purple-400"
                    />
                    <div>
                      <div className="text-sm font-bold text-white">{selectedEvent.speaker.name}</div>
                      <div className="text-xs text-purple-300">{selectedEvent.speaker.role}</div>
                    </div>
                  </div>
                </div>

                {/* Swags Box */}
                <div className="p-4 rounded-2xl bg-[#180b33] border border-purple-500/20">
                  <div className="text-[11px] font-mono text-zinc-400 mb-2">OFFICIAL SWAGS & REWARDS</div>
                  <div className="flex items-start gap-2.5">
                    <Award className="w-5 h-5 text-[#FF9900] flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-zinc-200">{selectedEvent.swags}</span>
                  </div>
                </div>

                {/* RSVP Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-500/40 text-center">
                  <div className="text-xs font-mono text-[#4EF35E] font-bold mb-1">
                    FREE ATTENDANCE
                  </div>
                  <div className="text-sm text-zinc-300 mb-4">
                    Instant confirmation & access to workshop repository.
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
