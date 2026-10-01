import React, { useEffect, useRef } from 'react';

import { TeamCard } from './TeamCard';

import { teamMembers } from '../data/team';

const departments = [
  {
    label: 'Leadership Department',
    value: 'Leadership Dept',
  },
  {
    label: 'Technical Department',
    value: 'Technical Dept',
  },
  {
    label: 'Events & Operations Department',
    value: 'Events & Operations Dept',
  },
  {
    label: 'Media & Content Department',
    value: 'Media & Content Dept',
  },
  {
    label: 'PR, Outreach & Corporate Department',
    value: 'PR, Outreach & Corporate Dept',
  },
  {
    label: 'Finance & Marketing Department',
    value: 'Finance & Marketing Dept',
  },
];

export const TeamSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    /* =================================
       CARD REVEAL ANIMATION
    ================================= */

    const cards =
      section.querySelectorAll<HTMLElement>(
        '[data-team-card]'
      );

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove(
              'opacity-0',
              'translate-y-10'
            );

            entry.target.classList.add(
              'opacity-100',
              'translate-y-0'
            );

            cardObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    cards.forEach((card) => {
      cardObserver.observe(card);
    });

    /* =================================
       CURSOR REACTIVE DEPARTMENT TITLES
    ================================= */

    const departmentHeadings =
      section.querySelectorAll<HTMLElement>(
        '[data-department-heading]'
      );

    const cleanupFunctions: (() => void)[] = [];

    departmentHeadings.forEach((heading) => {
      const title =
        heading.querySelector<HTMLElement>(
          '[data-department-title]'
        );

      const glow =
        heading.querySelector<HTMLElement>(
          '[data-department-glow]'
        );

      const underline =
        heading.querySelector<HTMLElement>(
          '[data-department-underline]'
        );

      if (!title || !glow || !underline) {
        return;
      }

      const handleMouseMove = (
        event: MouseEvent
      ) => {
        const rect =
          heading.getBoundingClientRect();

        const cursorX =
          event.clientX - rect.left;

        const cursorY =
          event.clientY - rect.top;

        const percentX =
          (cursorX / rect.width) * 100;

        const percentY =
          (cursorY / rect.height) * 100;

        /* Cursor-following glow */
        glow.style.left = `${percentX}%`;
        glow.style.top = `${percentY}%`;
        glow.style.opacity = '1';

        /* Subtle magnetic title movement */
        const offsetX =
          ((cursorX - rect.width / 2) /
            rect.width) *
          8;

        const offsetY =
          ((cursorY - rect.height / 2) /
            rect.height) *
          4;

        title.style.transform = `
          translate(${offsetX}px, ${offsetY}px)
        `;

        /* Underline reacts to cursor */
        const underlinePosition =
          Math.max(
            20,
            Math.min(80, percentX)
          );

        underline.style.transform = `
          translateX(-50%)
          scaleX(${0.75 + Math.abs(50 - underlinePosition) / 200})
        `;

        underline.style.opacity = '1';

        /* Dynamic glow intensity */
        title.style.textShadow = `
          0 0 14px rgba(168, 85, 247, 0.35),
          0 0 30px rgba(139, 92, 246, 0.15)
        `;
      };

      const handleMouseEnter = () => {
        glow.style.opacity = '1';
        underline.style.opacity = '1';

        title.style.textShadow = `
          0 0 14px rgba(168, 85, 247, 0.35),
          0 0 30px rgba(139, 92, 246, 0.15)
        `;
      };

      const handleMouseLeave = () => {
        /* Return smoothly to normal */
        glow.style.left = '50%';
        glow.style.top = '50%';
        glow.style.opacity = '0';

        title.style.transform =
          'translate(0px, 0px)';

        title.style.textShadow = 'none';

        underline.style.transform =
          'translateX(-50%) scaleX(0.8)';

        underline.style.opacity = '0.55';
      };

      heading.addEventListener(
        'mousemove',
        handleMouseMove
      );

      heading.addEventListener(
        'mouseenter',
        handleMouseEnter
      );

      heading.addEventListener(
        'mouseleave',
        handleMouseLeave
      );

      cleanupFunctions.push(() => {
        heading.removeEventListener(
          'mousemove',
          handleMouseMove
        );

        heading.removeEventListener(
          'mouseenter',
          handleMouseEnter
        );

        heading.removeEventListener(
          'mouseleave',
          handleMouseLeave
        );
      });
    });

    return () => {
      cardObserver.disconnect();

      cleanupFunctions.forEach(
        (cleanup) => cleanup()
      );
    };
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-[#07020E]
        py-24
        sm:py-28
      "
    >
      {/* =================================
          BACKGROUND GRID
      ================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-hero-grid
          opacity-30
        "
      />

      {/* =================================
          AMBIENT GLOWS
      ================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/4
          top-20
          h-72
          w-72
          rounded-full
          bg-purple-700/10
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-1/4
          bottom-20
          h-80
          w-80
          rounded-full
          bg-violet-700/10
          blur-[140px]
        "
      />

      {/* =================================
          ANIMATED SECTION BORDER
      ================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-4
          z-[1]
          rounded-[30px]
          sm:inset-5
          lg:inset-7
        "
      >
        {/* Static subtle border */}
        <div
          className="
            absolute
            inset-0
            rounded-[30px]
            border
            border-purple-500/15
          "
        />

        {/* Moving neon border */}
        <div
          className="
            absolute
            inset-0
            rounded-[30px]
            opacity-80
          "
          style={{
            padding: '1px',
            background:
              'linear-gradient(120deg, transparent 8%, rgba(168,85,247,0.8), transparent 28%, rgba(99,102,241,0.65), transparent 52%, rgba(168,85,247,0.8), transparent 76%, rgba(99,102,241,0.65), transparent 94%)',
            backgroundSize: '300% 300%',
            animation:
              'teamBorderFlow 8s linear infinite',
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />

        {/* Soft moving glow around border */}
        <div
          className="
            absolute
            -inset-2
            rounded-[34px]
            opacity-20
            blur-xl
          "
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(168,85,247,0.55), transparent, rgba(99,102,241,0.45), transparent)',
            backgroundSize: '250% 100%',
            animation:
              'teamBorderGlow 8s linear infinite',
          }}
        />
      </div>

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1780px]
          px-6
          sm:px-8
          lg:px-12
          xl:px-16
        "
      >
        {/* =================================
            MAIN TEAM HEADER
        ================================= */}

        <div
          className="
            mx-auto
            mb-28
            max-w-3xl
            text-center
          "
        >
          <div
            className="
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-purple-500/25
              bg-purple-900/20
              px-4
              py-1.5
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#4EF35E]
                shadow-[0_0_10px_rgba(78,243,94,0.8)]
              "
            />

            <span
              className="
                font-mono
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-purple-300
              "
            >
              AWS Student Builder Group
            </span>
          </div>

          <h2
            className="
              text-4xl
              font-black
              tracking-tight
              text-white
              sm:text-5xl
              lg:text-6xl
            "
          >
            Meet Our{' '}
            <span
              className="
                bg-gradient-to-r
                from-purple-400
                via-violet-300
                to-indigo-300
                bg-clip-text
                text-transparent
              "
            >
              Team
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-zinc-400
              sm:text-base
            "
          >
            The people behind the community — building,
            organizing, creating, and helping students grow
            through AWS and technology.
          </p>
        </div>

        {/* =================================
            DEPARTMENTS
        ================================= */}

        <div className="space-y-36">
          {departments.map(
            (department) => {
              const members =
                teamMembers.filter(
                  (member) =>
                    member.department ===
                    department.value
                );

              if (members.length === 0) {
                return null;
              }

              const isLeadership =
                department.value ===
                'Leadership Dept';

              const firstMember =
                isLeadership
                  ? members[0]
                  : null;

              const remainingMembers =
                isLeadership
                  ? members.slice(1)
                  : members;

              return (
                <div
                  key={department.value}
                >
                  {/* =================================
                      CURSOR-REACTIVE DEPARTMENT HEADING
                  ================================= */}

                  <div
                    className="
                      department-heading
                      relative
                      mb-16
                      flex
                      items-center
                      gap-5
                    "
                    data-department-heading
                  >
                    {/* Cursor glow */}
                    <div
                      data-department-glow
                      className="
                        pointer-events-none
                        absolute
                        z-0
                        h-28
                        w-28
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-purple-500/20
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

                    {/* Left line */}
                    <div
                      className="
                        department-line
                        relative
                        z-10
                        h-px
                        flex-1
                        bg-gradient-to-r
                        from-transparent
                        via-purple-500/30
                        to-purple-500/10
                      "
                    />

                    {/* Department title */}
                    <div
                      className="
                        relative
                        z-10
                        px-3
                      "
                    >
                      <h3
                        data-department-title
                        className="
                          relative
                          whitespace-nowrap
                          text-2xl
                          font-bold
                          tracking-tight
                          text-white
                          transition-all
                          duration-200
                          ease-out
                          sm:text-3xl
                          lg:text-4xl
                        "
                      >
                        {department.label}

                        {/* Cursor-reactive underline */}
                        <span
                          data-department-underline
                          className="
                            absolute
                            -bottom-2
                            left-1/2
                            h-[2px]
                            w-1/2
                            -translate-x-1/2
                            rounded-full
                            bg-gradient-to-r
                            from-transparent
                            via-purple-400
                            to-transparent
                            opacity-60
                            transition-all
                            duration-200
                            ease-out
                          "
                        />
                      </h3>
                    </div>

                    {/* Right line */}
                    <div
                      className="
                        department-line
                        relative
                        z-10
                        h-px
                        flex-1
                        bg-gradient-to-l
                        from-transparent
                        via-purple-500/30
                        to-purple-500/10
                      "
                    />
                  </div>

                  {/* =================================
                      FACULTY COORDINATOR
                  ================================= */}

                  {firstMember && (
                    <div
                      className="
                        mb-16
                        flex
                        justify-center
                      "
                    >
                      <div
                        className="
                          w-full
                          max-w-[560px]
                        "
                      >
                        <TeamCard
                          member={firstMember}
                          index={0}
                        />
                      </div>
                    </div>
                  )}

                  {/* =================================
                      MEMBER GRID
                  ================================= */}

                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-x-10
                      gap-y-14
                      sm:grid-cols-2
                      lg:grid-cols-3
                      lg:gap-x-12
                      lg:gap-y-16
                    "
                  >
                    {remainingMembers.map(
                      (
                        member,
                        index
                      ) => (
                        <TeamCard
                          key={member.id}
                          member={member}
                          index={
                            index +
                            (firstMember
                              ? 1
                              : 0)
                          }
                        />
                      )
                    )}
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* =================================
            BOTTOM DIVIDER
        ================================= */}

        <div
          className="
            mx-auto
            mt-24
            flex
            max-w-md
            items-center
            justify-center
            gap-3
          "
        >
          <div
            className="
              h-px
              flex-1
              bg-gradient-to-r
              from-transparent
              to-purple-500/30
            "
          />

          <div
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-purple-400
              shadow-[0_0_12px_rgba(168,85,247,0.8)]
            "
          />

          <div
            className="
              h-px
              flex-1
              bg-gradient-to-l
              from-transparent
              to-purple-500/30
            "
          />
        </div>
      </div>

      {/* =================================
          CURSOR EFFECT + BORDER STYLES
      ================================= */}

      <style>{`
        .department-heading {
          isolation: isolate;
        }

        .department-title {
          will-change: transform, text-shadow;
        }

        .department-underline {
          will-change: transform, width, opacity;
        }

        .department-heading:hover
          .department-line {
          opacity: 0.9;
        }

        .department-line {
          transition:
            opacity 300ms ease,
            background 300ms ease;
        }

        .department-heading:hover
          .department-line {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(139, 92, 246, 0.5),
            rgba(168, 85, 247, 0.15)
          );
        }

        @keyframes teamBorderFlow {
          0% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }

          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes teamBorderGlow {
          0% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }

          100% {
            background-position: 0% 50%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .department-title,
          .department-underline,
          [data-department-glow] {
            transition: none !important;
          }

          [style*="teamBorderFlow"],
          [style*="teamBorderGlow"] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};