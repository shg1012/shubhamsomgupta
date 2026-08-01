import type { Project } from '../types/portfolio';

interface ProjectVisualProps {
  project: Project;
  context?: 'card' | 'hero';
}

const artifactLabels: Record<NonNullable<Project['deviceMockup']>, string> = {
  laptop: 'Interface artifact',
  phone: 'Mobile artifact',
  dual: 'Responsive system',
  dashboard: 'Workflow artifact',
  'brand-system': 'Identity system',
  product: 'Physical artifact',
};

export function ProjectVisual({ project, context = 'card' }: ProjectVisualProps) {
  const mockup = project.deviceMockup ?? 'laptop';
  const image = context === 'hero' ? (project.heroImage ?? project.thumbnail) : project.thumbnail;
  const loading = context === 'hero' ? 'eager' : 'lazy';

  return (
    <figure className={`project-visual project-visual--${mockup} project-visual--${context}`}>
      {mockup === 'product' ? (
        <img
          className="product-image"
          src={image}
          alt={project.thumbnailAlt}
          loading={loading}
          decoding="async"
        />
      ) : (
        <>
          <div className="artifact-frame">
            <span className="artifact-frame__bar" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <img src={image} alt={project.thumbnailAlt} loading={loading} decoding="async" />
          </div>
          {mockup === 'dual' ? (
            <div className="phone-frame" aria-hidden="true">
              <span />
              <img src={image} alt="" loading="lazy" decoding="async" />
            </div>
          ) : null}
          {mockup === 'brand-system' ? (
            <div className="brand-swatch-stack" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          ) : null}
        </>
      )}
      <figcaption className="project-visual__caption">
        <span>{artifactLabels[mockup]}</span>
        <span>{project.status ?? 'Case study'}</span>
      </figcaption>
    </figure>
  );
}
