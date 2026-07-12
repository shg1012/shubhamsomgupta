import type { SVGProps } from 'react';

interface HomeIconProps extends SVGProps<SVGSVGElement> {
  title?: string;
}

export function HomeIcon({ title, ...props }: HomeIconProps) {
  return (
    <svg
      className="home-icon"
      viewBox="0 0 16 16"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="M2.5 7.4 8 2.9l5.5 4.5" />
      <path d="M4.1 6.6v6.2h7.8V6.6" />
      <path d="M6.8 12.8V9.1h2.4v3.7" />
    </svg>
  );
}
