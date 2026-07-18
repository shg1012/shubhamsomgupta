import type { SVGProps } from 'react';

interface ArrowUpIconProps extends SVGProps<SVGSVGElement> {
  title?: string;
}

export function ArrowUpIcon({ title, ...props }: ArrowUpIconProps) {
  return (
    <svg
      className="arrow-up-icon"
      viewBox="0 0 16 16"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="M8 13V3" />
      <path d="M4 7l4-4 4 4" />
    </svg>
  );
}
