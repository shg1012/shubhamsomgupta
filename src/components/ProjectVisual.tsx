import { assetPath } from '../data/assets';
import type { Project } from '../types/portfolio';

interface ProjectVisualProps {
  project: Project;
}

export function ProjectVisual({ project }: ProjectVisualProps) {
  const mockup = project.deviceMockup ?? 'laptop';
  const figmaDevice =
    project.slug === 'orchestrating-healthcare-workflows'
      ? assetPath('images/figma-macbook-large.png')
      : project.deviceMockup === 'laptop' || project.deviceMockup === 'dual'
        ? assetPath('images/figma-macbook-small.png')
        : null;

  return (
    <figure className={`project-visual project-visual--${mockup}`}>
      {figmaDevice ? (
        <img className="figma-device-img" src={figmaDevice} alt={project.thumbnailAlt} loading="lazy" />
      ) : (
        <>
      <div className="device-shadow" aria-hidden="true" />
      <div className="device-frame">
        <span className="device-camera" aria-hidden="true" />
        <img src={project.thumbnail} alt={project.thumbnailAlt} loading="lazy" />
      </div>
      {mockup === 'dual' ? (
        <div className="phone-frame" aria-hidden="true">
          <span />
          <img src={project.thumbnail} alt="" loading="lazy" />
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
    </figure>
  );
}
