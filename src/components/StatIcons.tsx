import React from 'react';

// 1. Rupee + Rising Bar Chart (Average Package)
export function RupeeGrowthIcon({ className = "w-12 h-12 text-zinc-300" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={className}>
      <circle cx="20" cy="22" r="14" fill="currentColor" fillOpacity="0.15" />
      <circle cx="20" cy="22" r="13" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6" />
      <path
        d="M16 16h8m-8 3.5h8m-8 0c2 0 4 1 4 3s-2 3-4 3h2l5 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M26 15l16-7m0 0h-7m7 0v7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.8"
      />
      <rect x="22" y="44" width="7" height="12" rx="1.5" fill="currentColor" fillOpacity="0.3" />
      <rect x="32" y="36" width="7" height="20" rx="1.5" fill="currentColor" fillOpacity="0.5" />
      <rect x="42" y="27" width="7" height="29" rx="1.5" fill="currentColor" fillOpacity="0.75" />
      <rect x="52" y="18" width="7" height="38" rx="1.5" fill="currentColor" />
    </svg>
  );
}

// 2. Handshake + Verified Shield (Highest Package)
export function HandshakeShieldIcon({ className = "w-12 h-12 text-zinc-300" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={className}>
      <path
        d="M32 6l10 4v10c0 8-5 14-10 16-5-2-10-8-10-16V10l10-4z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M27 19l3.5 3.5 6.5-6.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M10 44l12-10 7 6-6 6-6-2-7 6v-6z"
        fill="currentColor"
        fillOpacity="0.4"
      />
      <path
        d="M54 44l-12-10-7 6 6 6 6-2 7 6v-6z"
        fill="currentColor"
        fillOpacity="0.4"
      />
      <path
        d="M22 34l7 6 6-6-7-6-6 6zm10 8l-4 4 4 4 4-4-4-4z"
        fill="currentColor"
        fillOpacity="0.8"
      />
      <path
        d="M6 38l12-8 4 4-12 8H6v-4zm52 0l-12-8-4 4 12 8h4v-4z"
        fill="currentColor"
        fillOpacity="0.25"
      />
    </svg>
  );
}

// 3. Podium + Trophy + Victory Flag (Hiring Partners)
export function TrophyPodiumIcon({ className = "w-12 h-12 text-zinc-300" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={className}>
      <path
        d="M25 15h14v10c0 4.5-3 8-7 8s-7-3.5-7-8V15z"
        fill="currentColor"
        fillOpacity="0.85"
      />
      <path
        d="M25 18h-4c-2 0-3 1.5-3 3.5S19.5 25 22 25h3m17-7h4c2 0 3 1.5 3 3.5S44.5 25 42 25h-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M30 33h4v5h-4z" fill="currentColor" />
      <path d="M26 38h12v3H26z" fill="currentColor" />
      <path d="M37 6v8h7l-2-4 2-4h-7z" fill="currentColor" fillOpacity="0.9" />
      <line x1="37" y1="5" x2="37" y2="15" stroke="currentColor" strokeWidth="1.5" />
      <rect x="23" y="44" width="18" height="16" rx="1.5" fill="currentColor" fillOpacity="0.7" />
      <rect x="7" y="49" width="16" height="11" rx="1.5" fill="currentColor" fillOpacity="0.35" />
      <rect x="41" y="52" width="16" height="8" rx="1.5" fill="currentColor" fillOpacity="0.45" />
      <circle cx="32" cy="50" r="1.8" fill="#07020E" />
    </svg>
  );
}

// 4. Students Graduation Mortarboard Caps (Monthly Reach)
export function GraduationCapsIcon({ className = "w-12 h-12 text-zinc-300" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={className}>
      <g opacity="0.45" transform="translate(14, -8) scale(0.85)">
        <polygon points="32,16 54,26 32,36 10,26" fill="currentColor" />
        <path d="M19 32v10c0 5 6 9 13 9s13-4 13-9V32" fill="currentColor" fillOpacity="0.5" />
      </g>
      <g transform="translate(0, 4)">
        <polygon points="32,14 56,25 32,36 8,25" fill="currentColor" fillOpacity="0.9" />
        <path
          d="M17 31v9c0 6 7 11 15 11s15-5 15-11v-9"
          fill="currentColor"
          fillOpacity="0.45"
        />
        <path
          d="M48 27v14m-1.5 0h3v4h-3z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="currentColor"
        />
        <circle cx="32" cy="14" r="2" fill="currentColor" />
      </g>
      <circle cx="32" cy="46" r="3.5" fill="currentColor" fillOpacity="0.6" />
      <path d="M22 58c0-5 4.5-8 10-8s10 3 10 8" fill="currentColor" fillOpacity="0.4" />
    </svg>
  );
}
