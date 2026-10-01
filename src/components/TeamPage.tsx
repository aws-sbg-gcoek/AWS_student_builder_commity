import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, Users, Sparkles, ArrowLeft, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { TeamCard } from './TeamCard';
import { teamMembers } from '../data/team';
import { SpotlightFooter } from './SpotlightFooter';

interface TeamPageProps {
  onNavigateHome: () => void;
  onJoinClick: () => void;
}

const DEPARTMENTS = [
  { label: 'All Departments', value: 'all' },
  { label: 'Leadership', value: 'Leadership Dept' },
  { label: 'Technical', value: 'Technical Dept' },
  { label: 'Events & Operations', value: 'Events & Operations Dept' },
  { label: 'Media & Content', value: 'Media & Content Dept' },
  { label: 'PR & Outreach', value: 'PR, Outreach & Corporate Dept' },
  { label: 'Finance & Marketing', value: 'Finance & Marketing Dept' },
];

export function TeamPage({ onNavigateHome, onJoinClick }: TeamPageProps) {
  const [selectedDept, setSelectedDept] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const pageRef = useRef<HTMLDivElement>(null);

  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Department counts
  const deptCounts = useMemo(() => {
    const counts: Record<string, number> = { all: teamMembers.length };
    teamMembers.forEach((member) => {
      counts[member.department] = (counts[member.department] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered members based on selected department and search query
  const filteredDepartments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return DEPARTMENTS.filter((d) => d.value !== 'all')
      .map((dept) => {
        let members = teamMembers.filter((m) => m.department === dept.value);

        if (selectedDept !== 'all' && selectedDept !== dept.value) {
          return null;
        }

        if (query) {
          members = members.filter(
            (m) =>
              m.name.toLowerCase().includes(query) ||
              m.role.toLowerCase().includes(query) ||
              (m.skills && m.skills.some((s) => s.toLowerCase().includes(query))) ||
              (m.bio && m.bio.toLowerCase().includes(query))
          );
        }

        if (members.length === 0) return null;

        return {
          ...dept,
          members,
        };
      })
      .filter(Boolean) as Array<{
      label: string;
      value: string;
      members: typeof teamMembers;
    }>;
  }, [selectedDept, searchQuery]);

  const totalVisibleCount = useMemo(() => {
    return filteredDepartments.reduce((acc, curr) => acc + curr.members.length, 0);
  }, [filteredDepartments]);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#07020E] text-white flex flex-col font-sans relative selection:bg-purple-600 selection:text-white pt-24 overflow-x-hidden">
      {/* ─── Background Watermarks & Checks Overlay ─── */}
      <div className="fixed inset-0 pointer-events-none bg-hero-grid opacity-35 z-0" />

      {/* Giant floating AWS typography behind the grid lines */}
      <div
        aria-hidden="true"
        className="fixed top-[18%] left-1/2 -translate-x-1/2 text-[26vw] font-black tracking-widest text-transparent watermark-outline pointer-events-none select-none z-0 whitespace-nowrap opacity-[0.06] leading-none animate-float-slow"
      >
        AWS
      </div>
      <div
        aria-hidden="true"
        className="fixed bottom-[10%] right-[-5%] text-[18vw] font-black tracking-widest text-transparent watermark-outline pointer-events-none select-none z-0 whitespace-nowrap opacity-[0.035] leading-none animate-float-slow"
        style={{ animationDelay: '-3.5s' }}
      >
        BUILDERS
      </div>

      {/* Ambient Pulsing Lighting Orbs */}
      <div className="fixed top-24 left-1/4 w-96 h-96 bg-purple-700/20 blur-[160px] rounded-full pointer-events-none z-0 animate-pulse-glow" />
      <div className="fixed bottom-32 right-1/4 w-[480px] h-[480px] bg-indigo-900/20 blur-[170px] rounded-full pointer-events-none z-0 animate-pulse-glow" style={{ animationDelay: '-2.5s' }} />

      {/* ─── HERO HEADER SECTION ─── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 text-center">
        {/* Navigation Breadcrumb / Back button */}
        <div className="flex items-center justify-center sm:justify-start mb-8">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#160c2b] border border-purple-500/20 text-xs sm:text-sm text-purple-300 hover:text-white hover:border-purple-400 hover:bg-purple-900/30 transition-all cursor-pointer group shadow-sm hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Badge with pulsing live dot */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#180d2f]/90 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.25)] mb-5 hover:border-purple-400 transition-colors">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4EF35E] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4EF35E] shadow-[0_0_8px_#4EF35E]" />
          </span>
          <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#FF9900]">
            AWS STUDENT BUILDER GROUP – GCOEK
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6">
          Meet Our{' '}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 via-violet-300 to-indigo-300 bg-clip-text text-transparent animate-gradient-text">
            Core Team
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 leading-relaxed mb-10">
          The developers, community architects, event coordinators, and leaders powering student cloud innovations at Government College of Engineering, Kolhapur.
        </p>

        {/* Quick Highlights Bar with Interactive Micro-Animations */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-3xl mx-auto mb-12">
          <div className="p-3.5 rounded-2xl bg-[#120726]/80 border border-purple-500/20 backdrop-blur-md text-center hover:border-purple-400/50 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(147,51,234,0.2)] transition-all duration-300 cursor-default">
            <div className="text-xl sm:text-2xl font-black text-purple-300 font-mono">6</div>
            <div className="text-xs text-zinc-400 font-medium mt-0.5">Departments</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#120726]/80 border border-purple-500/20 backdrop-blur-md text-center hover:border-[#4EF35E]/50 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(78,243,94,0.15)] transition-all duration-300 cursor-default">
            <div className="text-xl sm:text-2xl font-black text-[#4EF35E] font-mono">20+</div>
            <div className="text-xs text-zinc-400 font-medium mt-0.5">Active Builders</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#120726]/80 border border-purple-500/20 backdrop-blur-md text-center hover:border-[#FF9900]/50 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(255,153,0,0.15)] transition-all duration-300 cursor-default">
            <div className="text-xl sm:text-2xl font-black text-[#FF9900] font-mono">100%</div>
            <div className="text-xs text-zinc-400 font-medium mt-0.5">Student Driven</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#120726]/80 border border-purple-500/20 backdrop-blur-md text-center hover:border-sky-400/50 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(56,189,248,0.15)] transition-all duration-300 cursor-default">
            <div className="text-xl sm:text-2xl font-black text-sky-400 font-mono">AWS</div>
            <div className="text-xs text-zinc-400 font-medium mt-0.5">Community Club</div>
          </div>
        </div>

        {/* ── Search & Filter Controls ── */}
        <div className="max-w-4xl mx-auto space-y-5">
          {/* Search Input with Focus Glow Animation */}
          <div className="relative max-w-lg mx-auto group">
            <Search className="w-4 h-4 text-purple-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-purple-300 transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, role, or skill (e.g. Palak, AWS, Docker)..."
              className="w-full pl-11 pr-10 py-3 rounded-full bg-[#120726]/90 border border-purple-500/30 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-400 focus:shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white px-2 py-1 rounded-md bg-white/10 transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {DEPARTMENTS.map((dept) => {
              const isActive = selectedDept === dept.value;
              const count = dept.value === 'all' ? deptCounts.all : deptCounts[dept.value] || 0;

              return (
                <button
                  key={dept.value}
                  type="button"
                  onClick={() => setSelectedDept(dept.value)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-purple-600 text-white border border-purple-400 shadow-[0_0_15px_rgba(147,51,234,0.4)] scale-105'
                      : 'bg-[#150a2c]/80 text-zinc-400 border border-purple-500/20 hover:text-white hover:bg-purple-900/30 hover:scale-102'
                  }`}
                >
                  <span>{dept.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono transition-colors ${
                      isActive ? 'bg-purple-800 text-purple-200' : 'bg-white/10 text-zinc-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TEAM MEMBERS DIRECTORY ─── */}
      <section className="relative z-10 max-w-[1780px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pb-24 flex-1 w-full">
        {totalVisibleCount === 0 ? (
          <div className="text-center py-20 bg-[#120726]/40 rounded-3xl border border-purple-500/20 max-w-xl mx-auto p-8 animate-card-entrance">
            <Users className="w-12 h-12 text-purple-400/50 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-1">No Members Found</h3>
            <p className="text-xs sm:text-sm text-zinc-400 mb-6">
              No matching team members found for "{searchQuery}". Try searching for another name or clearing the filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedDept('all');
              }}
              className="px-5 py-2 rounded-full bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition-colors shadow-[0_0_15px_rgba(147,51,234,0.3)]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-32">
            {filteredDepartments.map((dept) => {
              const isLeadership = dept.value === 'Leadership Dept';
              const facultyCoordinator =
                isLeadership && !searchQuery
                  ? dept.members.find((m) =>
                      m.role.toLowerCase().includes('faculty')
                    )
                  : null;
              const remainingMembers = facultyCoordinator
                ? dept.members.filter((m) => m.id !== facultyCoordinator.id)
                : dept.members;

              return (
                <div key={dept.value} id={dept.value.toLowerCase().replace(/\s+/g, '-')}>
                  {/* Department Heading with Glow, Shimmer Beam, and Lines */}
                  <div className="department-heading relative mb-14 flex items-center gap-5">
                    {/* Left Line with animated shimmer beam */}
                    <div className="relative h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-purple-500/10 overflow-hidden">
                      <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-purple-300/50 to-transparent animate-shimmer-beam" />
                    </div>

                    {/* Department Title */}
                    <div className="relative z-10 px-3 text-center">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white flex items-center justify-center gap-3">
                        <span>{dept.label}</span>
                        <span className="text-xs sm:text-sm font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                          {dept.members.length}
                        </span>
                      </h2>
                      <div className="h-[2px] w-24 mx-auto mt-2 rounded-full bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
                    </div>

                    {/* Right Line with animated shimmer beam */}
                    <div className="relative h-px flex-1 bg-gradient-to-l from-transparent via-purple-500/30 to-purple-500/10 overflow-hidden">
                      <div className="absolute inset-0 w-1/2 bg-gradient-to-l from-transparent via-purple-300/50 to-transparent animate-shimmer-beam" />
                    </div>
                  </div>

                  {/* Faculty Coordinator in Leadership */}
                  {facultyCoordinator && (
                    <div className="mb-14 flex justify-center animate-card-entrance">
                      <div className="w-full max-w-[560px]">
                        <TeamCard member={facultyCoordinator} index={0} />
                      </div>
                    </div>
                  )}

                  {/* Grid of Members with Staggered Entrance Animations */}
                  <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16">
                    {remainingMembers.map((member, index) => (
                      <div
                        key={member.id}
                        className="animate-card-entrance"
                        style={{
                          animationDelay: `${Math.min(index, 8) * 60}ms`,
                        }}
                      >
                        <TeamCard
                          member={member}
                          index={index + (facultyCoordinator ? 1 : 0)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Call to Action Banner ── */}
        <div className="mt-32 max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-[#180a36] to-[#0d041c] border border-purple-500/30 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/15 blur-3xl rounded-full pointer-events-none" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#4EF35E]" />
              PASSIONATE ABOUT AWS & CLOUD?
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white mb-3">
              Want to join our builder team?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto mb-8">
              We are constantly welcoming energetic creators, developers, designers, and event managers to collaborate and build.
            </p>
            <button
              type="button"
              onClick={onJoinClick}
              className="white-pill-btn px-8 py-3.5 rounded-full text-sm font-bold tracking-wide inline-flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_25px_rgba(255,255,255,0.3)]"
            >
              <span>Apply to Join Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <SpotlightFooter />
    </div>
  );
}
