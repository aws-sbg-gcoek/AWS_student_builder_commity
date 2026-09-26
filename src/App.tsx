import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { RupeeGrowthIcon, HandshakeShieldIcon, TrophyPodiumIcon, GraduationCapsIcon } from './components/StatIcons';
import { ThreeCanvas } from './components/ThreeCanvas';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { StickyEventsStack } from './components/StickyEventsStack';
import { ProjectsMarquee } from './components/ProjectsMarquee';
import { SpotlightFooter } from './components/SpotlightFooter';
import { ChevronRight, Cloud, Code, Database, Sparkles, Terminal, Users, CheckCircle2, ArrowRight, Github, Linkedin, Instagram, Mail, X, Calendar, MapPin, Award } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'Home' | 'Team' | 'Events' | 'Join Us'>('Home');
  const [statMode, setStatMode] = useState<'career' | 'club'>('career');
  const [interactiveMode, setInteractiveMode] = useState<'3d' | 'cli'>('3d');
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joinSubmitted, setJoinSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', branch: 'Computer Science', year: '1st Year' });

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJoinSubmitted(true);
    setTimeout(() => {
      setJoinSubmitted(false);
      setIsJoinModalOpen(false);
    }, 2000);
  };

  const TECH_TICKER_ITEMS = [
    { name: 'AWS Lambda', color: '#FF9900' },
    { name: 'Amazon Bedrock', color: '#A855F7' },
    { name: 'DynamoDB', color: '#38BDF8' },
    { name: 'Amazon S3', color: '#22C55E' },
    { name: 'Docker & K8s', color: '#38BDF8' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'CloudFormation', color: '#EC4899' },
    { name: 'API Gateway', color: '#FF9900' },
    { name: 'Next.js 15', color: '#FFFFFF' },
    { name: 'GraphQL', color: '#E10098' },
  ];

  return (
    <div className="min-h-screen bg-[#07020E] text-white flex flex-col font-sans relative selection:bg-purple-600 selection:text-white">
      
      {/* ─── Top Navbar (Managed for Home page with Home, Team, Events, Join Us & Join Now! button) ─── */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab as any);
          if (tab === 'Home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (tab === 'Team' || tab === 'Events') {
            document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
          } else if (tab === 'Join Us') {
            setIsJoinModalOpen(true);
          }
        }}
        onJoinClick={() => setIsJoinModalOpen(true)}
      />

      {/* ─── HERO SECTION: EXACT THEME & LAYOUT FROM REFERENCE IMAGE ─── */}
      <section id="home" className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-14 overflow-hidden bg-purple-atmosphere">
        {/* Subtle Fine Grid Mesh Overlay */}
        <div className="absolute inset-0 bg-hero-grid opacity-80 pointer-events-none" />

        {/* Ambient Radial Glowing Lights */}
        <div className="absolute top-[15%] right-[10%] w-[550px] h-[450px] bg-purple-700/25 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[30%] left-[5%] w-[450px] h-[350px] bg-indigo-900/20 blur-[130px] rounded-full pointer-events-none" />

        {/* Giant Hollow Outlined Background Watermark: KODR (Exact from image) */}
        <div
          aria-hidden="true"
          className="absolute top-[35%] md:top-[36%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[19vw] md:text-[17vw] font-black tracking-widest text-transparent watermark-outline pointer-events-none select-none z-0 whitespace-nowrap opacity-25 leading-none"
        >
          KODR
        </div>

        {/* ── Main Hero Content (Centered) ── */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-1 flex flex-col justify-center items-center">
          
          {/* Main Headline with Welcome to AWS STUDENT BUILDER COMMUNITY and neon AWS */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black text-white leading-[1.08] tracking-tight max-w-5xl mx-auto mb-6">
            Welcome to{' '}
            <span className="neon-green-glow text-[#4EF35E] font-black inline-block px-1">
              AWS
            </span>{' '}
            STUDENT BUILDER COMMUNITY
          </h1>

          {/* Subtitle: enhance your skills by join our club */}
          <p className="text-base sm:text-lg md:text-xl text-[#d4cde3] max-w-2xl mx-auto mb-9 leading-relaxed font-normal">
            Enhance your skills by joining our club
          </p>

          {/* Glowing Purple Pill Action Button */}
          <div className="flex items-center justify-center mb-14">
            <button
              type="button"
              onClick={() => {
                document.getElementById('interactive-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="purple-glow-btn text-white text-sm sm:text-base font-semibold px-8 sm:px-10 py-3.5 sm:py-4 rounded-full inline-flex items-center gap-2 group cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>Explore Program</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

        {/* ── Bottom: 4 Glass Stat Cards (Exact match to reference image) ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4">
          
          {/* Toggle switcher: Placement vs Club Metrics */}
          <div className="flex justify-end items-center mb-3">
            <div className="inline-flex p-1 rounded-full bg-[#120826]/80 border border-purple-500/20 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setStatMode('career')}
                className={`text-[11px] font-medium px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                  statMode === 'career'
                    ? 'bg-purple-600/50 text-white shadow-[0_0_10px_rgba(147,51,234,0.3)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Placement Stats
              </button>
              <button
                type="button"
                onClick={() => setStatMode('club')}
                className={`text-[11px] font-medium px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                  statMode === 'club'
                    ? 'bg-purple-600/50 text-white shadow-[0_0_10px_rgba(147,51,234,0.3)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                AWS Club Stats
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">

            {/* Card 1: 7.5 Lakh / 940+ Builders */}
            <div className="stat-card-image p-6 sm:p-7 flex items-center justify-between group">
              <div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none flex items-baseline">
                  <span>{statMode === 'career' ? '7.5' : '940+'}</span>
                  <span className="text-xl sm:text-2xl font-bold text-zinc-300 ml-1.5">
                    {statMode === 'career' ? 'Lakh' : 'Builders'}
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-zinc-400 font-medium mt-2">
                  {statMode === 'career' ? 'Average Package' : 'Active Club Community'}
                </div>
              </div>
              <div className="p-2 rounded-xl bg-purple-950/30 group-hover:scale-110 transition-transform">
                <RupeeGrowthIcon className="w-12 h-12 text-zinc-300 group-hover:text-purple-300 transition-colors" />
              </div>
            </div>

            {/* Card 2: 47 Lakh / 50+ Cloud Projects */}
            <div className="stat-card-image p-6 sm:p-7 flex items-center justify-between group">
              <div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none flex items-baseline">
                  <span>{statMode === 'career' ? '47' : '50+'}</span>
                  <span className="text-xl sm:text-2xl font-bold text-zinc-300 ml-1.5">
                    {statMode === 'career' ? 'Lakh' : 'Projects'}
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-zinc-400 font-medium mt-2">
                  {statMode === 'career' ? 'Highest Package' : 'Deployed on AWS Cloud'}
                </div>
              </div>
              <div className="p-2 rounded-xl bg-purple-950/30 group-hover:scale-110 transition-transform">
                <HandshakeShieldIcon className="w-12 h-12 text-zinc-300 group-hover:text-purple-300 transition-colors" />
              </div>
            </div>

            {/* Card 3: 300+ Hiring Partners / 30+ Workshops */}
            <div className="stat-card-image p-6 sm:p-7 flex items-center justify-between group">
              <div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none flex items-baseline">
                  <span>{statMode === 'career' ? '300+' : '30+'}</span>
                </div>
                <div className="text-xs sm:text-sm text-zinc-400 font-medium mt-2">
                  {statMode === 'career' ? 'Hiring Partners' : 'Hands-on Labs Conducted'}
                </div>
              </div>
              <div className="p-2 rounded-xl bg-purple-950/30 group-hover:scale-110 transition-transform">
                <TrophyPodiumIcon className="w-12 h-12 text-zinc-300 group-hover:text-purple-300 transition-colors" />
              </div>
            </div>

            {/* Card 4: 10 M+ Tech Reach / 100% Free */}
            <div className="stat-card-image p-6 sm:p-7 flex items-center justify-between group">
              <div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none flex items-baseline">
                  <span>{statMode === 'career' ? '10' : '100%'}</span>
                  <span className="text-xl sm:text-2xl font-bold text-zinc-300 ml-1.5">
                    {statMode === 'career' ? 'M+' : 'Free'}
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-zinc-400 font-medium mt-2">
                  {statMode === 'career' ? 'Monthly Tech Reach' : 'AWS Vouchers & Credits'}
                </div>
              </div>
              <div className="p-2 rounded-xl bg-purple-950/30 group-hover:scale-110 transition-transform">
                <GraduationCapsIcon className="w-12 h-12 text-zinc-300 group-hover:text-purple-300 transition-colors" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── MARQUEE TECH TICKER ─── */}
      <div className="relative overflow-hidden py-3 bg-[#0a0316]/90 border-y border-purple-500/20 backdrop-blur-md">
        <div className="ticker-track items-center gap-8">
          {[...TECH_TICKER_ITEMS, ...TECH_TICKER_ITEMS].map((item, i) => (
            <div key={i} className="flex items-center gap-2 flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
              <span className="font-mono text-xs text-zinc-300 tracking-wider font-medium">{item.name}</span>
              <span className="mx-2 text-zinc-700">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── INTERACTIVE 3D & CLI SHOWCASE SECTION ─── */}
      <section id="interactive-section" className="py-24 relative overflow-hidden bg-[#090314]/95 border-b border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Column: Program Matrix */}
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-mono mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#4EF35E]" />
                <span>AWS STUDENT BUILDER ARCHITECTURE</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-heading font-black text-white mb-6 leading-tight">
                Architect. Build. Deploy.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300">
                  Production Cloud Skills.
                </span>
              </h2>
              <p className="text-zinc-300 leading-relaxed mb-8 max-w-xl text-base">
                Join our college developer community to master modern serverless architectures, microservices, containerization, and AWS Bedrock GenAI models. Every workshop includes hands-on labs and project reviews.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-[#120824]/90 border border-purple-500/20">
                  <div className="text-2xl font-black text-[#4EF35E] font-mono">01</div>
                  <div className="font-bold text-white text-sm mt-1">Full-Stack Cloud</div>
                  <div className="text-xs text-zinc-400 mt-1">React, Node.js, AWS Lambda & S3 pipelines</div>
                </div>
                <div className="p-4 rounded-xl bg-[#120824]/90 border border-purple-500/20">
                  <div className="text-2xl font-black text-purple-400 font-mono">02</div>
                  <div className="font-bold text-white text-sm mt-1">Free AWS Credits</div>
                  <div className="text-xs text-zinc-400 mt-1">Sponsored accounts, sandbox labs & certifications</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => setIsJoinModalOpen(true)}
                  className="purple-glow-btn text-white text-xs sm:text-sm font-semibold px-7 py-3 rounded-full inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Join The Builder Club</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: 3D / Terminal Interactive Component */}
            <div className="lg:w-1/2 w-full flex flex-col items-center">
              <div className="flex items-center gap-2 p-1.5 bg-[#120726] border border-purple-500/30 rounded-full mb-4 shadow-xl">
                <button
                  type="button"
                  onClick={() => setInteractiveMode('3d')}
                  className={`text-xs font-mono px-4 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                    interactiveMode === '3d'
                      ? 'bg-purple-600 text-white font-bold shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Cloud className="w-3.5 h-3.5" /> 3D Cloud Core
                </button>
                <button
                  type="button"
                  onClick={() => setInteractiveMode('cli')}
                  className={`text-xs font-mono px-4 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                    interactiveMode === 'cli'
                      ? 'bg-purple-600 text-white font-bold shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" /> Interactive CLI
                </button>
              </div>

              <div className="w-full max-w-lg p-2 rounded-2xl bg-[#0f0720]/80 border border-purple-500/25 backdrop-blur-md">
                {interactiveMode === '3d' ? (
                  <div>
                    <ThreeCanvas />
                    <div className="text-center text-xs font-mono text-zinc-400 pb-3">
                      ✦ Click and drag inside to rotate the 3D Cloud Core
                    </div>
                  </div>
                ) : (
                  <InteractiveTerminal />
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── STICKY STACKED CARDS EVENTS SECTION (Replaces Meet Our Student Leaders) ─── */}
      <StickyEventsStack onJoinClick={() => setIsJoinModalOpen(true)} />

      {/* ─── INFINITE HORIZONTAL MARQUEE PROJECTS CAROUSEL ─── */}
      <ProjectsMarquee />

      {/* ─── INTERACTIVE VIOLET SPOTLIGHT FOOTER ─── */}
      <SpotlightFooter />

      {/* ─── JOIN NOW POPUP MODAL ─── */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[#0f0622] border border-purple-500/40 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsJoinModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {joinSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-14 h-14 text-[#4EF35E] mx-auto mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold text-white mb-2">Welcome Aboard!</h3>
                <p className="text-sm text-zinc-300">You are now a registered member of the AWS Student Builder Group GCOEK. Check your email for next steps!</p>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#4EF35E] font-bold">AWS STUDENT BUILDER COMMUNITY</div>
                  <h3 className="text-2xl font-black text-white mt-1">Join The Club Now</h3>
                  <p className="text-xs text-zinc-400 mt-1">Free for all college students. Access workshops, cloud credits & peer labs.</p>
                </div>

                <form onSubmit={handleJoinSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Yash Sharma"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#1a0c36] border border-purple-500/30 text-white text-sm focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">College Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. yash@college.edu"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#1a0c36] border border-purple-500/30 text-white text-sm focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Branch</label>
                      <select
                        value={formData.branch}
                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg bg-[#1a0c36] border border-purple-500/30 text-white text-xs focus:outline-none focus:border-purple-400"
                      >
                        <option>Computer Science</option>
                        <option>Information Tech</option>
                        <option>AI & Data Science</option>
                        <option>Electronics</option>
                        <option>Mechanical / Civil</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Year</label>
                      <select
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg bg-[#1a0c36] border border-purple-500/30 text-white text-xs focus:outline-none focus:border-purple-400"
                      >
                        <option>1st Year (Fresher)</option>
                        <option>2nd Year</option>
                        <option>3rd Year</option>
                        <option>Final Year</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="white-pill-btn w-full py-3 rounded-full text-sm font-bold text-center mt-6 cursor-pointer"
                  >
                    Complete Registration
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
