const LOGO_URL =
  'https://i.ibb.co/mCTP8GRn/AWS-Student-Builder-Group-RGB-Program-Icon-Purple.png';

interface SiteLogoProps {
  className?: string;
}

/** AWS Student Builder Group logo — served from the shared image link */
export function SiteLogo({ className = 'w-10 h-10' }: SiteLogoProps) {
  return (
    <img
      src={LOGO_URL}
      alt="AWS Student Builder Group logo"
      className={`${className} object-contain`}
      loading="eager"
    />
  );
}
