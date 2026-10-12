import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TeamPage } from './components/TeamPage';
import { ProjectsPage } from './components/ProjectsPage';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { EventsPage } from './components/EventsPage';
import { ResourcesPage } from './components/ResourcesPage';
import { JoinUsPage } from './components/JoinUsPage';
import { RupeeGrowthIcon, HandshakeShieldIcon, TrophyPodiumIcon, GraduationCapsIcon } from './components/StatIcons';
import { teamMembers } from './data/team';
import { eventsData } from './data/events';
import { projectsData } from './data/projects';
import UniverseLoader from './components/CloudUniverse/UniverseLoader';
import { StickyEventsStack } from './components/StickyEventsStack';
import { JourneySection } from './components/JourneySection';
import { ProjectsMarquee } from './components/ProjectsMarquee';
import { SpotlightFooter } from './components/SpotlightFooter';
import { CursorGlow } from './components/CursorGlow';
import { SiteVideoBackground } from './components/SiteVideoBackground';
import { ChevronRight, Sparkles, CheckCircle2, ArrowRight, X, Users } from 'lucide-react';

function CloudUniverseFallback() {
  return (
    <div className="flex h-full min-h-[240px] w-full flex-col items-center justify-center gap-4 rounded-2xl border border-purple-500/30 bg-[#0b0b14] p-6">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-600/30" />
        <span className="relative inline-flex h-12 w-12 rounded-full bg-gradient-to-br from-[#9553e6] to-[#c4b5fd] shadow-[0_0_40px_rgba(149,83,230,0.8)]" />
      </div>
      <span className="font-mono text-[11px] font-medium text-purple-300/80">
        aws-mesh://cloud-core-v3
      </span>
    </div>
  );
}

function CloudUniverseSection({ onJoin }: { onJoin: () => void }) {
  return (
    <section
      id="interactive-section"
      className="relative overflow-hidden border-b border-purple-900/30 bg-transparent"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-12 lg:px-8">

        {/* Canvas — top on mobile, right on desktop */}
        <div className="order-1 h-[320px] w-full sm:h-[420px] lg:order-2 lg:h-[560px]">
          <UniverseLoader fallback={<CloudUniverseFallback />} />
        </div>

        {/* Copy — badge, headline, description, cards, CTA */}
        <div className="order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#6feb2c]" />
            <span>AWS STUDENT BUILDER ARCHITECTURE</span>
          </div>

          <h2 className="font-clash text-3xl sm:text-5xl font-semibold text-white mb-6 leading-tight">
            Architect. Build. Deploy.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300">
              Production Cloud Skills.
            </span>
          </h2>

          <p className="text-zinc-300 leading-relaxed mb-8 max-w-xl text-base">
            Join our college developer community to master modern serverless architectures, microservices, containerization, and AWS Bedrock GenAI models. Every workshop includes hands-on labs and project reviews.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-[#141414]/90 border border-purple-500/20 gradient-border">
              <div className="text-2xl font-black text-[#6feb2c] font-mono">
                01
              </div>
              <div className="font-bold text-white text-sm mt-1">
                Full-Stack Cloud
              </div>
              <div className="text-xs text-zinc-400 mt-1">
                React, Node.js, AWS Lambda & S3 pipelines
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#141414]/90 border border-purple-500/20 gradient-border">
              <div className="text-2xl font-black text-purple-400 font-mono">
                02
              </div>
              <div className="font-bold text-white text-sm mt-1">
                Free AWS Credits
              </div>
              <div className="text-xs text-zinc-400 mt-1">
                Sponsored accounts, sandbox labs & certifications
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={onJoin}
              className="purple-glow-btn button-bordercolor text-white text-xs sm:text-sm font-semibold px-7 py-3 rounded-full inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Join The Builder Club</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'team' | 'projects' | 'project-detail' | 'events' | 'resources' | 'join'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#team' || hash === '#/team') return 'team';
      if (hash === '#projects' || hash === '#/projects') return 'projects';
      if (hash.startsWith('#/projects/')) return 'project-detail';
      if (hash === '#events' || hash === '#/events') return 'events';
      if (hash === '#resources' || hash === '#/resources') return 'resources';
      if (hash === '#join' || hash === '#/join' || hash === '#join-us' || hash === '#/join-us') return 'join';
    }
    return 'home';
  });

  const [currentProjectId, setCurrentProjectId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash.startsWith('#/projects/')) return hash.replace('#/projects/', '');
    }
    return null;
  });

  const [activeTab, setActiveTab] = useState<'Home' | 'Team' | 'Events' | 'Join Us' | 'Projects' | 'Resources'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#team' || hash === '#/team') return 'Team';
      if (hash === '#projects' || hash === '#/projects' || hash.startsWith('#/projects/')) return 'Projects';
      if (hash === '#events' || hash === '#/events') return 'Events';
      if (hash === '#resources' || hash === '#/resources') return 'Resources';
      if (hash === '#join' || hash === '#/join' || hash === '#join-us' || hash === '#/join-us') return 'Join Us';
    }
    return 'Home';
  });

  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joinSubmitted, setJoinSubmitted] = useState(false);

  // Synchronize browser history and hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#team' || hash === '#/team') {
        setCurrentPage('team'); setActiveTab('Team');
      } else if (hash === '#projects' || hash === '#/projects') {
        setCurrentPage('projects'); setActiveTab('Projects');
      } else if (hash.startsWith('#/projects/')) {
        setCurrentPage('project-detail');
        setCurrentProjectId(hash.replace('#/projects/', ''));
        setActiveTab('Projects');
      } else if (hash === '#events' || hash === '#/events') {
        setCurrentPage('events'); setActiveTab('Events');
      } else if (hash === '#resources' || hash === '#/resources') {
        setCurrentPage('resources'); setActiveTab('Resources');
      } else if (hash === '#join' || hash === '#/join' || hash === '#join-us' || hash === '#/join-us') {
        setCurrentPage('join'); setActiveTab('Join Us');
      } else {
        setCurrentPage('home');
        setActiveTab('Home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: 'home' | 'team' | 'projects' | 'events' | 'resources' | 'join', sectionId?: string) => {
    if (page === 'team') {
      setCurrentPage('team'); setActiveTab('Team');
      window.location.hash = '#team';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'projects') {
      setCurrentPage('projects'); setActiveTab('Projects');
      window.location.hash = '#projects';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'events') {
      setCurrentPage('events'); setActiveTab('Events');
      window.location.hash = '#events';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'resources') {
      setCurrentPage('resources'); setActiveTab('Resources');
      window.location.hash = '#resources';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'join') {
      setCurrentPage('join'); setActiveTab('Join Us');
      window.location.hash = '#join';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('home'); setActiveTab('Home');
      if (sectionId) {
        window.location.hash = `#${sectionId}`;
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.location.hash = '#home';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const navigateToProject = (projectId: string) => {
    setCurrentPage('project-detail');
    setCurrentProjectId(projectId);
    setActiveTab('Projects');
    window.location.hash = `#/projects/${projectId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branch: 'Computer Science',
    year: '1st Year'
  });

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
    { name: 'Amazon S3', color: '#22C55E' },
    { name: 'DynamoDB', color: '#38BDF8' },
    { name: 'Amazon EC2', color: '#FF9900' },
    { name: 'CloudFormation', color: '#EC4899' },
    { name: 'Rekognition', color: '#9553e6' },
    { name: 'Amplify', color: '#FF9900' },
    { name: 'API Gateway', color: '#38BDF8' },
    { name: 'IoT Core', color: '#6feb2c' },
    { name: 'AWS CDK', color: '#22C55E' },
    { name: 'Cognito', color: '#E10098' },
    { name: 'CloudWatch', color: '#3178C6' },
  ];

  const WHAT_WE_DO = [
    {
      title: 'Hands-on Workshops',
      desc: 'Weekly peer-led labs on Lambda, S3, Amplify and GenAI — build live, not just watch slides.',
    },
    {
      title: 'Cloud Certifications',
      desc: 'Guided prep paths for Cloud Practitioner and Solutions Architect with free vouchers.',
    },
    {
      title: 'Hackathons & Build Days',
      desc: 'Ship serverless prototypes in 24–48 hours with mentors, credits and swag on the line.',
    },
    {
      title: 'Peer Learning Circles',
      desc: 'Small study squads across all branches — seniors mentor freshers from Class of 2029 up.',
    },
    {
      title: 'Open-Source Projects',
      desc: 'Contribute to real club repos deployed on AWS, and graduate with a public portfolio.',
    },
    {
      title: 'Industry Talks',
      desc: 'Engineers from the field break down production architectures, DevOps and career maps.',
    },
  ];

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col font-sans relative z-[1] selection:bg-[#9553e6] selection:text-white overflow-x-clip">
      {/* ─── Fixed Mux stream behind every route — content scrolls above it ─── */}
      <SiteVideoBackground />
      {/* ─── Smooth Flowing Light Purple Cursor Glow ─── */}
      <CursorGlow />

      {/* ─── Top Navbar ─── */}
      <Navbar
        activeTab={
          currentPage === 'team' ? 'Team' :
          currentPage === 'projects' || currentPage === 'project-detail' ? 'Projects' :
          currentPage === 'events' ? 'Events' :
          currentPage === 'resources' ? 'Resources' :
          currentPage === 'join' ? 'Join Us' :
          activeTab
        }
        onTabChange={(tab) => {
          if (tab === 'Home') navigateTo('home');
          else if (tab === 'Projects') navigateTo('projects');
          else if (tab === 'Team') navigateTo('team');
          else if (tab === 'Events') navigateTo('events');
          else if (tab === 'Resources') navigateTo('resources');
          else if (tab === 'Join Us') navigateTo('join');
        }}
        onJoinClick={() => navigateTo('join')}
      />

      {currentPage === 'team' ? (
        <TeamPage
          onNavigateHome={() => navigateTo('home')}
          onJoinClick={() => navigateTo('join')}
        />
      ) : currentPage === 'projects' ? (
        <ProjectsPage
          onNavigateHome={() => navigateTo('home')}
          onNavigateToProject={navigateToProject}
          onJoinClick={() => navigateTo('join')}
        />
      ) : currentPage === 'project-detail' && currentProjectId ? (
        <ProjectDetailPage
          projectId={currentProjectId}
          onNavigateProjects={() => navigateTo('projects')}
          onJoinClick={() => navigateTo('join')}
        />
      ) : currentPage === 'events' ? (
        <EventsPage
          onNavigateHome={() => navigateTo('home')}
          onJoinClick={() => navigateTo('join')}
        />
      ) : currentPage === 'resources' ? (
        <ResourcesPage
          onNavigateHome={() => navigateTo('home')}
          onJoinClick={() => navigateTo('join')}
        />
      ) : currentPage === 'join' ? (
        <JoinUsPage
          onNavigateHome={() => navigateTo('home')}
        />
      ) : (
        <>
          {/* ─── HERO SECTION ─── */}
          <section
            id="home"
        className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-14 overflow-hidden bg-transparent"
      >
        {/* Subtle Fine Grid Mesh Overlay */}
        <div className="absolute inset-0 bg-hero-grid opacity-80 pointer-events-none" />

        {/* Ambient Radial Glowing Lights */}
        <div className="absolute top-[15%] right-[10%] w-[550px] h-[450px] bg-purple-700/25 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[30%] left-[5%] w-[450px] h-[350px] bg-indigo-900/20 blur-[130px] rounded-full pointer-events-none" />

        {/* Giant Hollow Outlined Background Watermark */}
        <div
          aria-hidden="true"
          className="absolute top-[35%] md:top-[36%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[19vw] md:text-[17vw] font-black tracking-widest text-transparent watermark-outline pointer-events-none select-none z-0 whitespace-nowrap opacity-25 leading-none"
        >
          AWS
        </div>

        {/* Floating Mini Highlight Badges on Desktop */}
        <div className="hidden lg:flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#141414]/85 border border-purple-500/30 backdrop-blur-md text-xs font-mono text-purple-200 absolute left-8 top-1/2 -translate-y-8 animate-float-slow shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-20">
          <span className="flex h-2 w-2 rounded-full bg-[#6feb2c] shadow-[0_0_8px_#6feb2c]" />
          <span>940+ Members</span>
        </div>

        <div className="hidden lg:flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#141414]/85 border border-purple-500/30 backdrop-blur-md text-xs font-mono text-purple-200 absolute right-8 top-1/2 -translate-y-16 animate-float-slow shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-20" style={{ animationDelay: '-3.5s' }}>
          <span className="text-[#FF9900]">☁️</span>
          <span>100% Free To Join</span>
        </div>

        {/* ── Main Hero Content ── */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-1 flex flex-col justify-center items-center">

          {/* Eyebrow pill — Freshers Welcome */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#141414]/90 border border-purple-500/35 shadow-[0_0_24px_rgba(168,85,247,0.3)] mb-6 hover:border-purple-400/70 transition-all duration-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6feb2c] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6feb2c] shadow-[0_0_8px_#6feb2c]" />
            </span>
            <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#FF9900]">
              Freshers Welcome • Class of 2029 • Official AWS Student Builder Chapter GCOEK
            </span>
          </div>

          <h1 className="font-clash text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-semibold text-white leading-[1.08] tracking-tight max-w-5xl mx-auto mb-6">
            Welcome to{' '}
            <span className="neon-green-glow text-shadow-glow text-[#6feb2c] font-semibold inline-block px-1">
              AWS
            </span>{' '}
            <span className="block mt-1 bg-gradient-to-r from-white via-purple-100 to-indigo-200 bg-clip-text text-transparent">
              STUDENT BUILDER GROUP
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-9 leading-relaxed font-normal">
            Architect scalable cloud solutions, build modern serverless systems, and accelerate your career with hands-on peer workshops.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <button
              type="button"
              onClick={() => {
                document
                  .getElementById('interactive-section')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="purple-glow-btn button-bordercolor text-white text-sm sm:text-base font-semibold px-8 sm:px-10 py-3.5 sm:py-4 rounded-full inline-flex items-center justify-center whitespace-nowrap gap-2 group cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>Explore Program</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => navigateTo('team')}
              className="px-7 py-3.5 sm:py-4 rounded-full bg-transparent text-white/80 border border-white/15 hover:bg-white/5 hover:text-white text-sm sm:text-base font-semibold inline-flex items-center justify-center whitespace-nowrap gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              <Users className="w-4 h-4 text-[#FF9900]" />
              <span>Meet The Team</span>
            </button>
          </div>
        </div>

        {/* ── Bottom: 4 Glass Stat Cards ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4">

          <div className="flex justify-start items-center mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212]/80 border border-purple-500/20 backdrop-blur-md">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#6feb2c] shadow-[0_0_8px_#6feb2c]" />
              <span className="font-mono text-[11px] font-medium tracking-widest text-zinc-400 uppercase">
                Club at a glance
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">

            {/* Card 1 — members (live-site count) */}
            <div className="stat-card-image gradient-border p-6 xl:p-7 group">
              <div className="mb-4 inline-flex rounded-xl bg-purple-950/30 p-2 transition-transform group-hover:scale-110">
                <GraduationCapsIcon className="h-9 w-9 text-zinc-300 transition-colors group-hover:text-purple-300" />
              </div>
              <div>
                <div className="text-4xl xl:text-5xl font-black text-white tracking-tight leading-none flex items-baseline">
                  <span>940+</span>
                  <span className="text-xl xl:text-2xl font-bold text-zinc-300 ml-2 whitespace-nowrap">
                    Members
                  </span>
                </div>

                <div className="text-xs sm:text-sm text-zinc-400 font-medium mt-2">
                  Across all branches
                </div>
              </div>
            </div>

            {/* Card 2 — projects shipped */}
            <div className="stat-card-image gradient-border p-6 xl:p-7 group">
              <div className="mb-4 inline-flex rounded-xl bg-purple-950/30 p-2 transition-transform group-hover:scale-110">
                <TrophyPodiumIcon className="h-9 w-9 text-zinc-300 transition-colors group-hover:text-purple-300" />
              </div>
              <div>
                <div className="text-4xl xl:text-5xl font-black text-white tracking-tight leading-none flex items-baseline">
                  <span>{projectsData.length}</span>
                  <span className="text-xl xl:text-2xl font-bold text-zinc-300 ml-2 whitespace-nowrap">
                    Projects
                  </span>
                </div>

                <div className="text-xs sm:text-sm text-zinc-400 font-medium mt-2">
                  Shipped on AWS Cloud
                </div>
              </div>
            </div>

            {/* Card 3 — events */}
            <div className="stat-card-image gradient-border p-6 xl:p-7 group">
              <div className="mb-4 inline-flex rounded-xl bg-purple-950/30 p-2 transition-transform group-hover:scale-110">
                <HandshakeShieldIcon className="h-9 w-9 text-zinc-300 transition-colors group-hover:text-purple-300" />
              </div>
              <div>
                <div className="text-4xl xl:text-5xl font-black text-white tracking-tight leading-none flex items-baseline">
                  <span>{eventsData.length}</span>
                  <span className="text-xl xl:text-2xl font-bold text-zinc-300 ml-2 whitespace-nowrap">
                    Events
                  </span>
                </div>

                <div className="text-xs sm:text-sm text-zinc-400 font-medium mt-2">
                  Workshops & meetups
                </div>
              </div>
            </div>

            {/* Card 4 — core team + free */}
            <div className="stat-card-image gradient-border p-6 xl:p-7 group">
              <div className="mb-4 inline-flex rounded-xl bg-purple-950/30 p-2 transition-transform group-hover:scale-110">
                <RupeeGrowthIcon className="h-9 w-9 text-zinc-300 transition-colors group-hover:text-purple-300" />
              </div>
              <div>
                <div className="text-4xl xl:text-5xl font-black text-white tracking-tight leading-none flex items-baseline">
                  <span>{teamMembers.length}</span>
                  <span className="text-xl xl:text-2xl font-bold text-zinc-300 ml-2 whitespace-nowrap">
                    Core team
                  </span>
                </div>

                <div className="text-xs sm:text-sm text-zinc-400 font-medium mt-2">
                  100% free for every student
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── MARQUEE TECH TICKER ─── */}
      <div className="relative overflow-hidden py-3 bg-black/40 border-y border-purple-500/20 backdrop-blur-md">
        {[0, 1].map((row) => (
          <div key={row} aria-hidden={row === 1} className="ticker-track items-center gap-8">
            {TECH_TICKER_ITEMS.map((item, i) => (
              <div key={i} className="flex items-center gap-2 flex-shrink-0">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: item.color }}
                />
                <span className="font-mono text-xs text-zinc-300 tracking-wider font-medium">
                  {item.name}
                </span>
                <span className="mx-2 text-zinc-700">✦</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ─── WHAT WE DO ─── */}
      <section id="what-we-do" className="bg-transparent py-20 sm:py-24 relative overflow-hidden border-b border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#6feb2c]" />
              <span>WHAT WE DO</span>
            </div>
            <h2 className="font-clash text-3xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight leading-tight mb-4">
              Learn. Build.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300">
                Ship to Cloud.
              </span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Six tracks, one community — every member finds a lane from fresher year to final year.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {WHAT_WE_DO.map((card, i) => (
              <div key={card.title} className="stat-card-image gradient-border p-6 sm:p-7 group">
                <div className="text-2xl font-black text-[#6feb2c] font-mono mb-2">
                  0{i + 1}
                </div>
                <div className="font-bold text-white text-base mt-1">{card.title}</div>
                <div className="text-sm text-white/60 mt-2 leading-relaxed">{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CLOUD UNIVERSE (sticky 300vh scroll journey) ─── */}
      <CloudUniverseSection onJoin={() => setIsJoinModalOpen(true)} />

      {/* ─── BUILDER JOURNEY (hands tableau + track timeline) ─── */}
      <JourneySection />

      {/* ─── EVENTS SECTION ─── */}
      <StickyEventsStack
        onJoinClick={() => navigateTo('join')}
      />

      {/* ─── PROJECTS ─── */}
      <ProjectsMarquee onViewAllProjects={() => navigateTo('projects')} />

      {/* ─── FOOTER ─── */}
      <SpotlightFooter onJoinClick={() => navigateTo('join')} />

      {/* ─── MOBILE STICKY CTA (Kodr-style bottom bar, home only) ─── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#121212]/95 backdrop-blur-md border-t border-white/10 px-5 py-4 sm:hidden">
        <button
          type="button"
          onClick={() => navigateTo('join')}
          className="purple-glow-btn button-bordercolor w-full py-3.5 rounded-xl text-base font-semibold text-white flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] transition-all"
        >
          <span>Join the Club — It&apos;s Free</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
      {/* Spacer so the sticky CTA never covers footer content on mobile */}
      <div aria-hidden="true" className="h-[84px] sm:hidden" />
        </>
      )}

      {/* ─── JOIN NOW POPUP MODAL ─── */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">

          <div className="relative w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[#141414] border border-purple-500/40 shadow-2xl animate-card-entrance">

            <button
              type="button"
              onClick={() => setIsJoinModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {joinSubmitted ? (

              <div className="text-center py-8">
                <CheckCircle2 className="w-14 h-14 text-[#6feb2c] mx-auto mb-4 animate-bounce" />

                <h3 className="text-2xl font-bold text-white mb-2">
                  Welcome Aboard!
                </h3>

                <p className="text-sm text-zinc-300">
                  You are now a registered member of the AWS Student Builder Group GCOEK. Check your email for next steps!
                </p>
              </div>

            ) : (

              <div>

                <div className="mb-6">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#6feb2c] font-bold">
                    AWS STUDENT BUILDER GROUP
                  </div>

                  <h3 className="text-2xl font-black text-white mt-1">
                    Join The Club Now
                  </h3>

                  <p className="text-xs text-zinc-400 mt-1">
                    Free for all college students. Access workshops, cloud credits & peer labs.
                  </p>
                </div>

                <form
                  onSubmit={handleJoinSubmit}
                  className="space-y-4"
                >

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Full Name
                    </label>

                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value
                        })
                      }
                      placeholder="e.g. Yash Sharma"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-purple-500/30 text-white text-sm focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      College Email Address
                    </label>

                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value
                        })
                      }
                      placeholder="e.g. yash@college.edu"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-purple-500/30 text-white text-sm focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">
                        Branch
                      </label>

                      <select
                        value={formData.branch}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            branch: e.target.value
                          })
                        }
                        className="w-full px-3 py-2.5 rounded-lg bg-[#141414] border border-purple-500/30 text-white text-xs focus:outline-none focus:border-purple-400"
                      >
                        <option>Computer Science</option>
                        <option>Information Tech</option>
                        <option>AI & Data Science</option>
                        <option>Electronics</option>
                        <option>Mechanical / Civil</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">
                        Year
                      </label>

                      <select
                        value={formData.year}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            year: e.target.value
                          })
                        }
                        className="w-full px-3 py-2.5 rounded-lg bg-[#141414] border border-purple-500/30 text-white text-xs focus:outline-none focus:border-purple-400"
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
                    className="purple-glow-btn button-bordercolor w-full py-3 rounded-full text-sm font-bold text-center mt-6 cursor-pointer"
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