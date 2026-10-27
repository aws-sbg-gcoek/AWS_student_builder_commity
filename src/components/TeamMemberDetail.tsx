import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Code2, Linkedin, Mail, Briefcase } from 'lucide-react';
import { TeamMember } from '../data/team';

interface TeamMemberDetailProps {
  member: TeamMember;
  onBack: () => void;
}

export const TeamMemberDetail: React.FC<TeamMemberDetailProps> = ({ member, onBack }) => {
  const [imgError, setImgError] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  // Compute initials fallback
  const initials = member.name
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 animate-card-entrance">
      {/* ── Top Back Button ── */}
      <div className="mb-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors cursor-pointer group py-2 px-3 rounded-lg hover:bg-white/5"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Team</span>
        </button>
      </div>

      {/* ── Main Detail Card ── */}
      <div className="relative rounded-2xl bg-[#0c0d14]/90 border border-purple-500/25 p-6 sm:p-10 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden">
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-hero-grid opacity-30 pointer-events-none" />

        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

        {/* ── Member Header Row ── */}
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-6 sm:gap-8 pb-8 border-b border-purple-500/20">
          {/* Avatar / Photo Container */}
          <div className="relative flex-shrink-0">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-xl overflow-hidden bg-black/60 border border-purple-500/30 shadow-xl relative">
              {member.image && !imgError ? (
                <img
                  src={member.image}
                  alt={member.name}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1c0c38] via-[#141414] to-black p-4 text-center">
                  <span className="text-4xl font-black text-white font-mono">{initials}</span>
                  <span className="text-[10px] font-mono text-[#FF9900] mt-2 font-bold tracking-wider">
                    {member.department.replace('Dept', '').trim()}
                  </span>
                </div>
              )}
            </div>
            {/* Glowing Accent Underline */}
            <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-b-md shadow-[0_0_12px_rgba(168,85,247,0.7)] mt-[-2px]" />
          </div>

          {/* Member Meta */}
          <div className="flex-1 text-center md:text-left">
            {/* Department Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-950/40 border border-purple-500/40 text-purple-300 font-mono text-xs font-bold tracking-wide mb-3 shadow-sm">
              <Briefcase className="w-3.5 h-3.5 text-purple-400" />
              <span>{member.department}</span>
            </div>

            {/* Member Name */}
            <h1 className="font-clash text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              {member.name}
            </h1>

            {/* Member Role */}
            <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-purple-300/90 mt-2">
              {member.role}
            </p>
          </div>
        </div>

        {/* ── Two Column Content Grid ── */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 pt-8">
          {/* Left Column (2 Cols): About & Skills */}
          <div className="lg:col-span-2 space-y-6">
            {/* About / Bio Card */}
            <div className="rounded-xl bg-[#141419]/90 border border-purple-500/20 p-6 sm:p-7 relative overflow-hidden group hover:border-purple-500/40 transition-colors">
              <div className="flex items-center gap-1.5 text-[#FF9900] font-mono text-[11px] font-bold tracking-widest uppercase mb-2">
                <span>—</span>
                <span>BIO</span>
              </div>
              <div className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold text-white font-clash">
                <User className="w-5 h-5 text-purple-400" />
                <span>About</span>
              </div>
              <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                {member.bio || 'Active contributor and core member of AWS Student Builder Group at GCOEK.'}
              </p>
            </div>

            {/* Skills Card */}
            {member.skills && member.skills.length > 0 && (
              <div className="rounded-xl bg-[#141419]/90 border border-purple-500/20 p-6 sm:p-7 relative overflow-hidden group hover:border-purple-500/40 transition-colors">
                <div className="flex items-center gap-1.5 text-[#FF9900] font-mono text-[11px] font-bold tracking-widest uppercase mb-2">
                  <span>—</span>
                  <span>EXPERTISE</span>
                </div>
                <div className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold text-white font-clash">
                  <Code2 className="w-5 h-5 text-purple-400" />
                  <span>Skills</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-black/60 border border-purple-500/25 text-xs font-mono font-medium text-zinc-200 shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (1 Col): Connect / Social Links */}
          <div className="lg:col-span-1">
            <div className="rounded-xl bg-[#141419]/90 border border-purple-500/20 p-6 sm:p-7 h-full flex flex-col justify-between group hover:border-purple-500/40 transition-colors">
              <div>
                <div className="flex items-center gap-1.5 text-[#FF9900] font-mono text-[11px] font-bold tracking-widest uppercase mb-2">
                  <span>—</span>
                  <span>CONNECT</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-clash mb-5">
                  Social Links
                </h2>

                <div className="space-y-3">
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3.5 p-3.5 rounded-xl bg-black/60 border border-purple-500/25 hover:border-purple-400 hover:bg-purple-900/20 transition-all group/item"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#0077b5]/15 border border-[#0077b5]/30 flex items-center justify-center text-[#38bdf8] group-hover/item:scale-110 transition-transform flex-shrink-0">
                        <Linkedin className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white text-sm">LinkedIn</div>
                        <div className="text-xs font-mono text-zinc-400 group-hover/item:text-purple-300 truncate">
                          View Profile
                        </div>
                      </div>
                    </a>
                  ) : null}

                  {member.email ? (
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-3.5 p-3.5 rounded-xl bg-black/60 border border-purple-500/25 hover:border-purple-400 hover:bg-purple-900/20 transition-all group/item"
                    >
                      <div className="w-10 h-10 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover/item:scale-110 transition-transform flex-shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white text-sm">Email</div>
                        <div className="text-xs font-mono text-zinc-400 group-hover/item:text-purple-300 truncate">
                          Send Message
                        </div>
                      </div>
                    </a>
                  ) : null}
                </div>
              </div>

              {/* Status footer chip */}
              <div className="mt-8 pt-4 border-t border-purple-500/15 text-[11px] font-mono text-zinc-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6feb2c] shadow-[0_0_8px_#6feb2c]" />
                <span>AWS Student Builder</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
