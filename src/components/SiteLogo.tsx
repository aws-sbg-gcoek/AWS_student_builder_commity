interface SiteLogoProps {
  className?: string;
}

/** AWS Student Builder Group pixel logo — purple cross on black, matches public/images/logo.svg */
export function SiteLogo({ className = 'w-10 h-10' }: SiteLogoProps) {
  return (
    <svg viewBox="0 0 96 96" fill="none" className={className} role="img" aria-label="AWS Student Builder Group logo">
      <rect width="96" height="96" fill="#000000" />
      <rect x="32" y="0" width="32" height="32" fill="#9553e6" />
      <rect x="0" y="32" width="32" height="32" fill="#9553e6" />
      <rect x="64" y="32" width="32" height="32" fill="#9553e6" />
      <rect x="32" y="64" width="32" height="32" fill="#9553e6" />
      <rect x="37" y="0" width="9" height="13" fill="#000000" />
      <rect x="52" y="0" width="9" height="13" fill="#000000" />
      <rect x="0" y="37" width="13" height="9" fill="#000000" />
      <rect x="0" y="52" width="13" height="9" fill="#000000" />
      <rect x="83" y="37" width="13" height="9" fill="#000000" />
      <rect x="83" y="52" width="13" height="9" fill="#000000" />
      <rect x="37" y="83" width="9" height="13" fill="#000000" />
      <rect x="52" y="83" width="9" height="13" fill="#000000" />
    </svg>
  );
}
