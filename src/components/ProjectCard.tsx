import { Link } from 'react-router-dom';
import { getCategory } from '../data/categories';
import type { Project } from '../types/portfolio';
import { ArrowRightIcon } from './ArrowRightIcon';
import { ProjectVisual } from './ProjectVisual';

interface ProjectCardProps {
  project: Project;
  size?: Project['cardSize'];
}

export function ProjectCard({ project, size }: ProjectCardProps) {
  const category = getCategory(project.category);
  const cardSize = size ?? project.cardSize ?? 'medium';

  return (
    <Link
      className={`project-card project-card--${cardSize} theme-${project.theme}`}
      to={`/project/${project.slug}`}
      aria-label={`View case study: ${project.title}`}
    >
      <div className="project-card__copy">
        <div className="project-card__meta">
          <span>{category?.title ?? project.category}</span>
          {project.year ? <span>{project.year}</span> : null}
        </div>
        <h3>{project.title}</h3>
        <p>{project.shortDescription}</p>
        <div className="tag-row" aria-label="Project tags">
          {project.tags.slice(0, 2).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <span className="card-action">
          View case study
          <ArrowRightIcon />
        </span>
      </div>
      <ProjectVisual project={project} />
    </Link>
  );
}
