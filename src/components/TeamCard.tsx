import React, { useEffect, useRef } from 'react';
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
}

export const TeamCard: React.FC<TeamCardProps> = ({
  member,
  index,
}) => {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const card = cardRef.current;

    if (!card) return;

    const name =
      card.querySelector<HTMLElement>(
        '[data-member-name]'
      );

    const role =
      card.querySelector<HTMLElement>(
        '[data-member-role]'
      );

    const glow =
      card.querySelector<HTMLElement>(
        '[data-member-glow]'
      );

    if (!name || !role || !glow) return;

    const handleMouseMove = (
      event: MouseEvent
    ) => {
      const rect =
        card.getBoundingClientRect();

      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;

      const percentX =
        (x / rect.width) * 100;

      const percentY =
        (y / rect.height) * 100;

      /* Cursor-following glow */
      glow.style.left = `${percentX}%`;
      glow.style.top = `${percentY}%`;
      glow.style.opacity = '1';

      /*
       * Subtle magnetic movement.
       * Name moves slightly more than role.
       */
      const nameX =
        ((x - rect.width / 2) /
          rect.width) *
        5;

      const nameY =
        ((y - rect.height / 2) /
          rect.height) *
        3;

      const roleX =
        ((x - rect.width / 2) /
          rect.width) *
        3;

      const roleY =
        ((y - rect.height / 2) /
          rect.height) *
        2;

      name.style.transform = `
        translate(${nameX}px, ${nameY}px)
      `;

      role.style.transform = `
        translate(${roleX}px, ${roleY}px)
      `;

      name.style.textShadow = `
        0 0 12px rgba(168, 85, 247, 0.30),
        0 0 24px rgba(139, 92, 246, 0.12)
      `;

      role.style.textShadow = `
        0 0 8px rgba(168, 85, 247, 0.25)
      `;
    };

    const handleMouseEnter = () => {
      glow.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      glow.style.left = '50%';
      glow.style.top = '50%';
      glow.style.opacity = '0';

      name.style.transform =
        'translate(0px, 0px)';

      role.style.transform =
        'translate(0px, 0px)';

      name.style.textShadow = 'none';
      role.style.textShadow = 'none';
    };

    card.addEventListener(
      'mousemove',
      handleMouseMove
    );

    card.addEventListener(
      'mouseenter',
      handleMouseEnter
    );

    card.addEventListener(
      'mouseleave',
      handleMouseLeave
    );

    return () => {
      card.removeEventListener(
        'mousemove',
        handleMouseMove
      );

      card.removeEventListener(
        'mouseenter',
        handleMouseEnter
      );

      card.removeEventListener(
        'mouseleave',
        handleMouseLeave
      );
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className="
        team-card
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-purple-500/20
        bg-[#0f0720]/90
        backdrop-blur-md
        opacity-0
        translate-y-10
        transition-all
        duration-700
        ease-out
        hover:-translate-y-2
        hover:border-purple-400/40
        hover:shadow-[0_18px_50px_rgba(139,92,246,0.18)]
      "
      style={{
        transitionDelay: `${Math.min(index, 5) * 70}ms`,
      }}
      data-team-card
    >
      {/* Cursor-following glow */}
      <div
        data-member-glow
        className="
          pointer-events-none
          absolute
          z-20
          h-40
          w-40
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-purple-500/15
          opacity-0
          blur-3xl
          transition-all
          duration-200
          ease-out
        "
        style={{
          left: '50%',
          top: '50%',
        }}
      />

      {/* Corner glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-40
          w-40
          rounded-full
          bg-purple-600/10
          blur-3xl
          transition-all
          duration-500
          group-hover:bg-purple-500/20
        "
      />

      {/* Image */}
      <div
        className="
          relative
          aspect-[6/7]
          overflow-hidden
          bg-[#120826]
        "
      >
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-105
            "
          />
        ) : (
          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
              bg-gradient-to-br
              from-purple-950
              to-[#0f0720]
            "
          >
            <span
              className="
                text-5xl
                font-black
                text-purple-300/70
              "
            >
              {member.name
                .split(' ')
                .map(
                  (word) => word[0]
                )
                .join('')
                .slice(0, 2)}
            </span>
          </div>
        )}

        {/* Image gradient */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#0f0720]
            via-transparent
            to-transparent
            opacity-80
          "
        />
      </div>

      {/* Content */}
      <div
        className="
          relative
          z-30
          p-6
          lg:p-7
        "
      >
        {/* Role */}
        <p
          data-member-role
          className="
            mb-2
            origin-center
            font-mono
            text-[13px]
            font-bold
            uppercase
            tracking-[0.12em]
            text-purple-300
            transition-all
            duration-200
            ease-out
            sm:text-sm
          "
        >
          {member.role}
        </p>

        {/* Name */}
        <h3
          data-member-name
          className="
            origin-center
            text-2xl
            font-bold
            tracking-tight
            text-white
            transition-all
            duration-200
            ease-out
            lg:text-[27px]
          "
        >
          {member.name}
        </h3>

        {/* Skills */}
        {member.skills &&
          member.skills.length > 0 && (
            <div
              className="
                mt-5
                flex
                flex-wrap
                gap-2.5
              "
            >
              {member.skills
                .slice(0, 4)
                .map((skill) => (
                  <span
                    key={skill}
                    className="
                      rounded-lg
                      border
                      border-purple-400/25
                      bg-purple-900/40
                      px-3
                      py-1.5
                      text-xs
                      font-semibold
                      text-purple-200
                      transition-all
                      duration-300
                      group-hover:border-purple-400/40
                      group-hover:bg-purple-800/40
                    "
                  >
                    {skill}
                  </span>
                ))}
            </div>
          )}

        {/* Divider */}
        <div
          className="
            mt-5
            h-px
            w-full
            bg-gradient-to-r
            from-purple-500/30
            via-purple-500/10
            to-transparent
          "
        />

        {/* Social buttons */}
        {(member.linkedin ||
          member.email) && (
          <div
            className="
              mt-5
              flex
              items-center
              gap-3
            "
          >
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} LinkedIn`}
                className="
                  inline-flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-purple-500/25
                  bg-purple-950/40
                  text-purple-300
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:border-purple-400/60
                  hover:bg-purple-600/20
                  hover:text-white
                "
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}

            {member.email && (
              <a
                href={`mailto:${member.email}`}
                aria-label={`Email ${member.name}`}
                className="
                  inline-flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-purple-500/25
                  bg-purple-950/40
                  text-purple-300
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:border-purple-400/60
                  hover:bg-purple-600/20
                  hover:text-white
                "
              >
                <Mail className="h-5 w-5" />
              </a>
            )}
          </div>
        )}
      </div>

      <style>{`
        .team-card {
          isolation: isolate;
        }

        [data-member-name],
        [data-member-role] {
          will-change:
            transform,
            text-shadow;
        }

        [data-member-glow] {
          will-change:
            left,
            top,
            opacity;
        }

        .team-card:hover
          [data-member-name] {
          color: #f5f3ff;
        }

        .team-card:hover
          [data-member-role] {
          color: #d8b4fe;
        }

        @media (prefers-reduced-motion: reduce) {
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