import type { SVGProps } from 'react';

interface RefreshIconProps extends SVGProps<SVGSVGElement> {
  title?: string;
}

export function RefreshIcon({ title, ...props }: RefreshIconProps) {
  return (
    <svg
      className="refresh-icon"
      viewBox="0 0 16 16"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="M3.1 6.3A5.2 5.2 0 1 1 3.5 11" />
      <path d="M3.1 2.9v3.5h3.5" />
    </svg>
  );
}
