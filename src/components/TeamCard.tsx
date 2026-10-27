import React, { useState } from 'react';
import { Linkedin, Mail } from 'lucide-react';

export interface TeamMember {
  department: string;
  id: string;
  name: string;
  role: string;
  bio?: string;
  skills?: string[];
  email?: string;
  linkedin?: string;
  image?: string;
}

interface TeamCardProps {
  member: TeamMember;
  index: number;
  onSelect?: (member: TeamMember) => void;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member, onSelect }) => {
  const [imgError, setImgError] = useState(false);

  // Compute initials fallback
  const initials = member.name
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <article
      onClick={() => onSelect?.(member)}
      className="
        card
        team-card
        gradient-border
        group
        relative
        rounded-2xl
        bg-[#141414]/90 border border-purple-500/20
        backdrop-blur-md
        opacity-100
        hover:border-purple-500/60
        hover:-translate-y-1.5
        hover:shadow-[0_20px_50px_rgba(139,92,246,0.35)]
        transition-all
        duration-300
        ease-out
        flex
        flex-col
        cursor-pointer
      "
      data-team-card
    >
      {/* Corner ambient glow on hover */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-purple-600/10 blur-3xl transition-all duration-500 group-hover:bg-purple-500/25" />

      {/* Diagonal Shimmer Sweep on Hover */}
      <div className="pointer-events-none absolute -inset-full top-0 z-30 bg-gradient-to-r from-transparent via-purple-300/10 to-transparent -rotate-45 translate-x-[-120%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />

      {/* ── Photo / Avatar Container ── */}
      <div className="relative aspect-[4/4.2] w-full overflow-hidden rounded-t-2xl bg-[#0e0a1a] flex items-center justify-center">
        {/* Status Chip (Top Right) */}
        <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/85 border border-purple-500/30 backdrop-blur-md shadow-md group-hover:border-purple-400/60 transition-colors pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6feb2c] shadow-[0_0_6px_#6feb2c] animate-pulse" />
          <span className="text-[9.5px] font-mono font-bold text-zinc-300 uppercase tracking-wider">
            Builder
          </span>
        </div>

        {/* Department Chip (Bottom Left) */}
        <div className="absolute bottom-2.5 left-3 z-20 pointer-events-none">
          <span className="px-2 py-0.5 rounded-md bg-black/90 border border-purple-500/35 backdrop-blur-md text-[9.5px] font-mono text-[#FF9900] font-bold tracking-wide shadow-md">
            {member.department.replace('Dept', '').trim()}
          </span>
        </div>

        {member.image && !imgError ? (
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex flex-col h-full w-full items-center justify-center bg-gradient-to-br from-[#1c0c38] via-[#141414] to-black p-4 text-center select-none relative overflow-hidden">
            <div className="absolute inset-0 bg-hero-grid opacity-30 pointer-events-none" />
            <div className="w-16 h-16 rounded-xl bg-purple-900/40 border border-purple-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.35)] mb-2 z-10 group-hover:scale-105 transition-transform">
              <span className="text-2xl font-black text-white font-mono tracking-wider">
                {initials}
              </span>
            </div>
            <div className="z-10 text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF9900]">
              {member.department.replace('Dept', '').trim()}
            </div>
            <div className="z-10 text-[11px] text-zinc-400 mt-0.5 font-medium">
              AWS Student Builder Group
            </div>
          </div>
        )}

        {/* Soft bottom vignette so image transitions into card without cutting head/body */}
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent pointer-events-none" />
      </div>

      {/* ── Card Content ── */}
      <div className="relative z-30 p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Role */}
          <p
            data-member-role
            className="mb-1 font-mono text-[11px] sm:text-[11.5px] font-bold uppercase tracking-[0.12em] text-purple-300"
          >
            {member.role}
          </p>

          {/* Name */}
          <h3
            data-member-name
            className="font-clash text-lg sm:text-xl font-semibold tracking-tight text-white transition-colors duration-200 group-hover:text-purple-100 leading-snug"
          >
            {member.name}
          </h3>

          {/* Description / Bio */}
          {member.bio && (
            <p className="mt-2 text-xs text-zinc-300/90 leading-relaxed font-normal line-clamp-2">
              {member.bio}
            </p>
          )}

          {/* Skills Badges */}
          {member.skills && member.skills.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {member.skills.slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  className="
                    rounded-md
                    border
                    border-purple-400/25
                    bg-purple-900/40
                    px-2
                    py-0.5
                    text-[10px]
                    font-semibold
                    text-purple-200
                    transition-all
                    duration-200
                    group-hover:border-purple-400/50
                    group-hover:bg-purple-800/50
                  "
                >
                  {skill}
                </span>
              ))}
              {member.skills.length > 4 && (
                <span className="rounded-md border border-purple-500/20 bg-purple-950/40 px-1.5 py-0.5 text-[9.5px] font-mono text-purple-300">
                  +{member.skills.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        <div>
          {/* Divider */}
          <div className="mt-4 h-px w-full bg-gradient-to-r from-purple-500/30 via-purple-500/10 to-transparent" />

          {/* Social Links */}
          {(member.linkedin || member.email) && (
            <div className="mt-3 flex items-center gap-2.5 relative z-30">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} LinkedIn`}
                  onClick={(e) => e.stopPropagation()}
                  className="
                    inline-flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-purple-500/25
                    bg-purple-950/40
                    text-purple-300
                    transition-all
                    duration-200
                    hover:scale-110
                    hover:border-purple-400/70
                    hover:bg-purple-600/30
                    hover:text-white
                    cursor-pointer
                    shadow-sm
                    relative
                    z-30
                  "
                >
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
              )}

              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  aria-label={`Email ${member.name}`}
                  onClick={(e) => e.stopPropagation()}
                  className="
                    inline-flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-purple-500/25
                    bg-purple-950/40
                    text-purple-300
                    transition-all
                    duration-200
                    hover:scale-110
                    hover:border-purple-400/70
                    hover:bg-purple-600/30
                    hover:text-white
                    cursor-pointer
                    shadow-sm
                    relative
                    z-30
                  "
                >
                  <Mail className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
