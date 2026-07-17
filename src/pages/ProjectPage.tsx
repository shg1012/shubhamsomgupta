import { Link, useParams } from 'react-router-dom';
import { ArrowRightIcon } from '../components/ArrowRightIcon';
import { MarkdownCaseStudy } from '../components/MarkdownCaseStudy';
import { ProjectVisual } from '../components/ProjectVisual';
import { getCategory } from '../data/categories';
import { getProject, getProjectsByCategory } from '../data/projects';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { NotFoundPage } from './NotFoundPage';

export function ProjectPage() {
  const { projectSlug } = useParams();
  const project = getProject(projectSlug ?? '');
  useDocumentTitle(project?.title ?? 'Page not found', project?.seo?.description);

  if (!project) {
    return <NotFoundPage />;
  }

  const category = getCategory(project.category);
  const categoryProjects = getProjectsByCategory(project.category);
  const currentIndex = categoryProjects.findIndex((item) => item.slug === project.slug);
  const previousProject =
    categoryProjects[(currentIndex - 1 + categoryProjects.length) % categoryProjects.length];
  const nextProject = categoryProjects[(currentIndex + 1) % categoryProjects.length];

  return (
    <div className="page-shell project-page">
      <section className={`project-hero theme-${project.theme}`}>
        <div className="project-hero__copy">
          <Link className="breadcrumb" to={`/work/${project.category}`}>
            <span className="breadcrumb-icon" aria-hidden="true">
              <ArrowRightIcon />
            </span>
            back
          </Link>
          <h1>{project.title}</h1>
          <p>{project.overview ?? project.shortDescription}</p>
          <div className="tag-row">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        <ProjectVisual project={project} />
      </section>

      <section className="project-summary glass-card">
        <div>
          <span>Year</span>
          <strong>{project.year ?? 'TBD'}</strong>
        </div>
        <div>
          <span>Role</span>
          <strong>{project.role ?? 'Designer'}</strong>
        </div>
        <div>
          <span>Client / organisation</span>
          <strong>{project.client ?? 'Independent'}</strong>
        </div>
        <div>
          <span>Timeline</span>
          <strong>{project.duration ?? project.status ?? 'Ongoing'}</strong>
        </div>
      </section>

      {project.metrics ? (
        <section className="metric-row">
          {project.metrics.map((metric) => (
            <div className="glass-card metric-card" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              {metric.qualification ? <small>{metric.qualification}</small> : null}
            </div>
          ))}
        </section>
      ) : null}

      <MarkdownCaseStudy project={project} />

      {project.team?.length || project.responsibilities?.length ? (
        <section className="project-credits glass-card">
          <h2>Credits</h2>
          <dl>
            {project.team?.length ? (
              <div>
                <dt>Team</dt>
                <dd>{project.team.join(', ')}</dd>
              </div>
            ) : null}
            {project.responsibilities?.length ? (
              <div>
                <dt>Responsibilities</dt>
                <dd>{project.responsibilities.join(', ')}</dd>
              </div>
            ) : null}
          </dl>
        </section>
      ) : null}

      <nav className="project-next-nav" aria-label="Project navigation">
        <Link to={`/project/${previousProject.slug}`}>
          <span>Previous</span>
          <strong>{previousProject.title}</strong>
        </Link>
        <div>
          <span>
            {currentIndex + 1} of {categoryProjects.length}
          </span>
          <Link to={`/work/${project.category}`}>{category?.title}</Link>
        </div>
        <Link to={`/project/${nextProject.slug}`}>
          <span>Next</span>
          <strong>{nextProject.title}</strong>
        </Link>
      </nav>
    </div>
  );
}
