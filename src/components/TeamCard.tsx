import React, { useEffect, useRef, useState } from 'react';
import { Linkedin, Mail, Sparkles } from 'lucide-react';

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
}

const angle = 20;

const lerp = (start: number, end: number, amount: number) => {
  return (1 - amount) * start + amount * end;
};

const remap = (value: number, oldMax: number, newMax: number) => {
  const newValue = ((value + oldMax) * (newMax * 2)) / (oldMax * 2) - newMax;
  return Math.min(Math.max(newValue, -newMax), newMax);
};

export const TeamCard: React.FC<TeamCardProps> = ({ member, index }) => {
  const cardRef = useRef<HTMLElement>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    card.dataset.rotateX = '0';
    card.dataset.rotateY = '0';
    card.style.setProperty('--rotateX', '0deg');
    card.style.setProperty('--rotateY', '0deg');

    const name = card.querySelector<HTMLElement>('[data-member-name]');
    const role = card.querySelector<HTMLElement>('[data-member-role]');
    const glow = card.querySelector<HTMLElement>('[data-member-glow]');

    const handleMouseMove = (event: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = (rect.left + rect.right) / 2;
      const centerY = (rect.top + rect.bottom) / 2;
      const posX = event.clientX - centerX;
      const posY = event.clientY - centerY;
      const x = remap(posX, rect.width / 2, angle);
      const y = remap(posY, rect.height / 2, angle);
      card.dataset.rotateX = x.toString();
      card.dataset.rotateY = (-y).toString();

      // Dynamic cursor glow positioning
      if (glow) {
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const percentX = (mouseX / rect.width) * 100;
        const percentY = (mouseY / rect.height) * 100;
        glow.style.left = `${percentX}%`;
        glow.style.top = `${percentY}%`;
        glow.style.opacity = '1';
      }

      // Parallax text shadow
      if (name && role) {
        name.style.textShadow = `0 0 16px rgba(168, 85, 247, 0.4), 0 0 30px rgba(139, 92, 246, 0.2)`;
        role.style.textShadow = `0 0 10px rgba(168, 85, 247, 0.35)`;
      }
    };

    const handleMouseEnter = () => {
      if (glow) glow.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      card.dataset.rotateX = '0';
      card.dataset.rotateY = '0';

      if (glow) {
        glow.style.left = '50%';
        glow.style.top = '50%';
        glow.style.opacity = '0';
      }

      if (name && role) {
        name.style.textShadow = 'none';
        role.style.textShadow = 'none';
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    // 60FPS update loop using requestAnimationFrame with exact lerp logic
    let animationFrameId: number;
    const update = () => {
      let currentX = parseFloat(card.style.getPropertyValue('--rotateY').slice(0, -1));
      let currentY = parseFloat(card.style.getPropertyValue('--rotateX').slice(0, -1));
      if (isNaN(currentX)) currentX = 0;
      if (isNaN(currentY)) currentY = 0;

      const targetX = parseFloat(card.dataset.rotateX || '0');
      const targetY = parseFloat(card.dataset.rotateY || '0');

      const nextX = lerp(currentX, targetX, 0.05);
      const nextY = lerp(currentY, targetY, 0.05);

      card.style.setProperty('--rotateY', nextX + 'deg');
      card.style.setProperty('--rotateX', nextY + 'deg');

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

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
      ref={cardRef}
      className="
        card
        team-card
        group
        relative
        rounded-2xl
        border
        border-purple-500/20
        bg-[#0f0720]/95
        backdrop-blur-md
        opacity-100
        hover:border-purple-400/60
        hover:shadow-[0_25px_60px_rgba(139,92,246,0.3)]
        flex
        flex-col
        cursor-default
      "
      data-team-card
      data-rotate-x="0"
      data-rotate-y="0"
    >
      {/* Dynamic Cursor-following glow */}
      <div
        data-member-glow
        className="
          pointer-events-none
          absolute
          z-20
          h-48
          w-48
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-purple-500/20
          opacity-0
          blur-3xl
          transition-opacity
          duration-300
          ease-out
        "
        style={{
          left: '50%',
          top: '50%',
        }}
      />

      {/* Diagonal Shimmer Sweep on Hover */}
      <div className="pointer-events-none absolute -inset-full top-0 z-30 bg-gradient-to-r from-transparent via-purple-300/10 to-transparent -rotate-45 translate-x-[-120%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />

      {/* Corner ambient glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-purple-600/10 blur-3xl transition-all duration-500 group-hover:bg-purple-500/25" />

      {/* ── Photo / Avatar Container ── */}
      <div
        className="relative aspect-[6/7] w-full overflow-hidden rounded-t-2xl bg-[#120826]"
        style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }}
      >
        {/* Status Chip (Top Right) */}
        <div
          className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0a0316]/85 border border-purple-500/30 backdrop-blur-md shadow-lg group-hover:border-purple-400/60 transition-colors pointer-events-none"
          style={{ transform: 'translateZ(32px)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#4EF35E] shadow-[0_0_8px_#4EF35E] animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-wider">
            Builder
          </span>
        </div>

        {/* Department Chip (Bottom Left) */}
        <div
          className="absolute bottom-3.5 left-4 z-20 pointer-events-none"
          style={{ transform: 'translateZ(30px)' }}
        >
          <span className="px-2.5 py-1 rounded-lg bg-[#0e041e]/90 border border-purple-500/35 backdrop-blur-md text-[10px] font-mono text-[#FF9900] font-bold tracking-wide shadow-md">
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
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
        ) : (
          <div className="flex flex-col h-full w-full items-center justify-center bg-gradient-to-br from-[#1c0c38] via-[#110526] to-[#07020E] p-6 text-center select-none relative overflow-hidden">
            <div className="absolute inset-0 bg-hero-grid opacity-30 pointer-events-none" />
            <div className="w-20 h-20 rounded-2xl bg-purple-900/60 border border-purple-500/40 flex items-center justify-center shadow-[0_0_24px_rgba(168,85,247,0.35)] mb-3 z-10 group-hover:scale-110 transition-transform">
              <span className="text-3xl font-black text-white font-mono tracking-wider">
                {initials}
              </span>
            </div>
            <div className="z-10 text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF9900]">
              {member.department.replace('Dept', '').trim()}
            </div>
            <div className="z-10 text-xs text-zinc-400 mt-1 font-medium">
              AWS Student Builder Group
            </div>
          </div>
        )}

        {/* Gradient shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0720] via-transparent to-transparent opacity-85 pointer-events-none" />
      </div>

      {/* ── Card Content ── */}
      <div
        className="relative z-30 p-6 sm:p-7 flex-1 flex flex-col justify-between"
        style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}
      >
        <div>
          {/* Role */}
          <p
            data-member-role
            className="
              mb-1.5
              origin-center
              font-mono
              text-[12px]
              sm:text-[13px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-purple-300
              transition-all
              duration-200
              ease-out
            "
            style={{ transform: 'translateZ(10px)' }}
          >
            {member.role}
          </p>

          {/* Name */}
          <h3
            data-member-name
            className="
              origin-center
              text-xl
              sm:text-2xl
              font-bold
              tracking-tight
              text-white
              transition-all
              duration-200
              ease-out
              group-hover:text-purple-100
            "
            style={{ transform: 'translateZ(15px)' }}
          >
            {member.name}
          </h3>

          {/* Description / Bio */}
          {member.bio && (
            <p
              className="mt-3 text-xs sm:text-sm text-zinc-300/90 leading-relaxed font-normal"
              style={{ transform: 'translateZ(8px)' }}
            >
              {member.bio}
            </p>
          )}

          {/* Skills Badges */}
          {member.skills && member.skills.length > 0 && (
            <div
              className="mt-4 flex flex-wrap gap-2"
              style={{ transform: 'translateZ(12px)' }}
            >
              {member.skills.map((skill) => (
                <span
                  key={skill}
                  className="
                    rounded-lg
                    border
                    border-purple-400/25
                    bg-purple-900/40
                    px-2.5
                    py-1
                    text-[11px]
                    font-semibold
                    text-purple-200
                    transition-all
                    duration-300
                    group-hover:border-purple-400/50
                    group-hover:bg-purple-800/50
                    hover:scale-105
                  "
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          {/* Divider */}
          <div className="mt-5 h-px w-full bg-gradient-to-r from-purple-500/30 via-purple-500/10 to-transparent" />

          {/* Social Links */}
          {(member.linkedin || member.email) && (
            <div
              className="mt-4 flex items-center gap-3"
              style={{ transform: 'translateZ(18px)' }}
            >
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} LinkedIn`}
                  className="
                    inline-flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-purple-500/25
                    bg-purple-950/40
                    text-purple-300
                    transition-all
                    duration-300
                    hover:scale-110
                    hover:border-purple-400/70
                    hover:bg-purple-600/30
                    hover:text-white
                    cursor-pointer
                    shadow-sm
                  "
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}

              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  aria-label={`Email ${member.name}`}
                  className="
                    inline-flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-purple-500/25
                    bg-purple-950/40
                    text-purple-300
                    transition-all
                    duration-300
                    hover:scale-110
                    hover:border-purple-400/70
                    hover:bg-purple-600/30
                    hover:text-white
                    cursor-pointer
                    shadow-sm
                  "
                >
                  <Mail className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .card,
        .team-card {
          isolation: isolate;
          --rotateX: 0deg;
          --rotateY: 0deg;
          transform: perspective(1000px) rotateX(var(--rotateX, 0deg)) rotateY(var(--rotateY, 0deg));
          transform-style: preserve-3d;
          will-change: transform;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .card > *,
        .team-card > * {
          transform-style: preserve-3d;
        }

        [data-member-name],
        [data-member-role] {
          will-change: text-shadow;
        }

        [data-member-glow] {
          will-change: left, top, opacity;
        }

        @media (prefers-reduced-motion: reduce) {
          .card,
          .team-card {
            transform: none !important;
          }
          [data-member-name],
          [data-member-role],
          [data-member-glow] {
            transition: none !important;
          }
        }
      `}</style>
    </article>
  );
};