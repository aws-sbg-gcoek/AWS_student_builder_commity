import React, { useEffect, useState } from 'react';
import { X, Linkedin, Mail, Code2, User, Wifi } from 'lucide-react';
import type { TeamMember } from './TeamCard';

interface TeamMemberModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

export const TeamMemberModal: React.FC<TeamMemberModalProps> = ({ member, onClose }) => {
  const [imgError, setImgError] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [member?.id]);

  useEffect(() => {
    if (member) {
      const t = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [member]);

  // Lock body scroll and pause Lenis smooth scroll while modal is open
  useEffect(() => {
    if (member) {
      document.body.style.overflow = 'hidden';
      const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
      if (lenis && typeof lenis.stop === 'function') {
        lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
      if (lenis && typeof lenis.start === 'function') {
        lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = '';
      const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
      if (lenis && typeof lenis.start === 'function') {
        lenis.start();
      }
    };
  }, [member]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!member) return null;

  const initials = member.name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      style={{
        background: 'rgba(7, 2, 14, 0.85)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.25s ease',
      }}
      onClick={onClose}
      data-lenis-prevent="true"
      role="dialog"
      aria-modal="true"
      aria-label={`${member.name} profile`}
    >
      <div
        className="relative w-full max-w-3xl rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(139,92,246,0.35),0_0_0_1px_rgba(168,85,247,0.25)] bg-[#0e0a1a] flex flex-col border border-purple-500/20"
        style={{
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
          transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
          maxHeight: 'min(90vh, 820px)',
        }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
      >
        {/* Background ambient lighting */}
        <div className="pointer-events-none absolute -top-32 -right-32 w-64 h-64 rounded-full bg-purple-700/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-indigo-700/15 blur-3xl" />

        {/* Top glowing line (pinned) */}
        <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-80 flex-shrink-0" />

        {/* Pinned Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-40 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-purple-500/50 transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-sm"
        >
          <X className="h-4 w-4" />
        </button>

        {/* ─── SCROLLABLE MODAL BODY ─── */}
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden custom-modal-scrollbar p-6 sm:p-8"
          data-lenis-prevent="true"
          style={{
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
          }}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Header section: Avatar + Info */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex-shrink-0">
              <div className="relative w-[120px] sm:w-[130px] h-[150px] sm:h-[160px] rounded-2xl overflow-hidden border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.25)] bg-[#141414]">
                {member.image && !imgError ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="flex flex-col h-full w-full items-center justify-center bg-gradient-to-br from-[#1c0c38] via-[#141414] to-black">
                    <div className="w-16 h-16 rounded-xl bg-purple-900/50 border border-purple-500/40 flex items-center justify-center shadow-[0_0_24px_rgba(168,85,247,0.35)]">
                      <span className="text-2xl font-black text-white font-mono">{initials}</span>
                    </div>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col justify-end flex-1 pr-8">
              <div className="mb-2.5 inline-flex items-center gap-1.5 self-start">
                <span className="px-2.5 py-0.5 rounded-md bg-black/60 border border-purple-500/35 text-[11px] font-mono font-bold text-[#FF9900] tracking-wide">
                  {member.department}
                </span>
              </div>
              <h2 className="font-clash text-2xl sm:text-4xl font-semibold tracking-tight text-white leading-tight mb-1">
                {member.name}
              </h2>
              <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-purple-300">
                {member.role}
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-black/60 border border-purple-500/25">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6feb2c] shadow-[0_0_6px_#6feb2c] animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-wider">
                  Active Builder
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

          {/* Main content grid: Bio & Skills on left, Connect links on right */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_210px] gap-5">
            <div className="space-y-5">
              {/* Bio card */}
              {member.bio && (
                <div className="rounded-2xl bg-white/[0.03] border border-purple-500/15 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-4 h-[2px] rounded-full bg-[#FF9900]" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#FF9900]">
                      Bio
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-purple-400" />
                    <span className="font-clash text-lg font-semibold text-white">About</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300/90 leading-relaxed font-normal">
                    {member.bio}
                  </p>
                </div>
              )}

              {/* Skills card */}
              {member.skills && member.skills.length > 0 && (
                <div className="rounded-2xl bg-white/[0.03] border border-purple-500/15 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-4 h-[2px] rounded-full bg-[#FF9900]" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#FF9900]">
                      Expertise
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Code2 className="h-4 w-4 text-purple-400" />
                    <span className="font-clash text-lg font-semibold text-white">Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-purple-400/25 bg-purple-900/40 px-3 py-1.5 text-[11px] sm:text-[12px] font-semibold text-purple-200 hover:border-purple-400/60 hover:bg-purple-800/50 transition-all duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Connect / Social Links */}
            {(member.linkedin || member.email) && (
              <div>
                <div className="rounded-2xl bg-white/[0.03] border border-purple-500/15 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-4 h-[2px] rounded-full bg-[#FF9900]" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#FF9900]">
                      Connect
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Wifi className="h-4 w-4 text-purple-400" />
                    <span className="font-clash text-lg font-semibold text-white">Social Links</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on LinkedIn`}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-900/30 border border-purple-500/25 text-purple-200 hover:bg-purple-800/50 hover:border-purple-400/60 hover:text-white transition-all duration-200 group cursor-pointer shadow-sm"
                      >
                        <Linkedin className="h-4 w-4 flex-shrink-0 text-purple-300 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="text-xs font-bold text-white">LinkedIn</div>
                          <div className="text-[10px] text-zinc-400">View Profile</div>
                        </div>
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        aria-label={`Email ${member.name}`}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-900/30 border border-purple-500/25 text-purple-200 hover:bg-purple-800/50 hover:border-purple-400/60 hover:text-white transition-all duration-200 group cursor-pointer shadow-sm"
                      >
                        <Mail className="h-4 w-4 flex-shrink-0 text-purple-300 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="text-xs font-bold text-white">Email</div>
                          <div className="text-[10px] text-zinc-400">Send Message</div>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom subtle glow accent (pinned) */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-60 flex-shrink-0" />
      </div>
    </div>
  );
};
