import type { SVGProps } from 'react';

interface ArrowRightIconProps extends SVGProps<SVGSVGElement> {
  title?: string;
}

export function ArrowRightIcon({ title, ...props }: ArrowRightIconProps) {
  return (
    <svg
      className="arrow-right-icon"
      viewBox="0 0 16 16"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="M3 8h10" />
      <path d="M9 4l4 4-4 4" />
    </svg>
  );
}
