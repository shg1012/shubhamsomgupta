import { Link } from 'react-router-dom';
import { ArrowRightIcon } from './ArrowRightIcon';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  actionLabel,
  actionTo,
}: SectionHeaderProps) {
  return (
    <div className="section-header">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {actionLabel && actionTo ? (
        <Link className="text-action" to={actionTo}>
          {actionLabel}
          <ArrowRightIcon />
        </Link>
      ) : null}
    </div>
  );
}
