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
  const hasProjectContext = Boolean(
    project.contribution || project.methods?.length || project.collaborators?.length,
  );
  const currentIndex = categoryProjects.findIndex((item) => item.slug === project.slug);
  const previousProject =
    categoryProjects[(currentIndex - 1 + categoryProjects.length) % categoryProjects.length];
  const nextProject = categoryProjects[(currentIndex + 1) % categoryProjects.length];

  return (
    <div
      className={`page-shell project-page project-page--${project.category} project-page--${project.depth}`}
    >
      <section className={`project-hero theme-${project.theme}`}>
        <span className="project-hero__number" aria-hidden="true">
          {String(currentIndex + 1).padStart(2, '0')}
        </span>
        <div className="project-hero__copy">
          <Link className="breadcrumb" to={`/work/${project.category}`}>
            <span className="breadcrumb-icon" aria-hidden="true">
              <ArrowRightIcon />
            </span>
            {category?.title ?? 'Back to work'}
          </Link>
          <p className="eyebrow">
            Case study / {String(currentIndex + 1).padStart(2, '0')} ·{' '}
            {project.status ?? project.depth}
          </p>
          <h1>{project.title}</h1>
          <p>{project.overview ?? project.shortDescription}</p>
          {project.proofLine ? (
            <strong className="project-hero__proof">{project.proofLine}</strong>
          ) : null}
          <div className="tag-row">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        <ProjectVisual project={project} context="hero" />
      </section>

      <section className="project-summary" aria-label="Project facts">
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
          <strong>{project.duration ?? 'Ongoing'}</strong>
        </div>
        <div>
          <span>Status</span>
          <strong>{project.status ?? 'Case study'}</strong>
        </div>
      </section>

      {hasProjectContext ? (
        <section className="project-at-a-glance" aria-labelledby="at-a-glance-title">
          <div className="project-at-a-glance__heading">
            <p className="eyebrow">At a glance</p>
            <h2 id="at-a-glance-title">What I brought to the work</h2>
          </div>
          <dl>
            {project.contribution ? (
              <div>
                <dt>Contribution</dt>
                <dd>{project.contribution}</dd>
              </div>
            ) : null}
            {project.methods?.length ? (
              <div>
                <dt>Methods</dt>
                <dd>{project.methods.join(' · ')}</dd>
              </div>
            ) : null}
            {project.collaborators?.length ? (
              <div>
                <dt>Collaboration</dt>
                <dd>{project.collaborators.join(' · ')}</dd>
              </div>
            ) : null}
          </dl>
        </section>
      ) : null}

      {project.metrics ? (
        <section className="metric-panel" aria-label="Project metrics">
          {project.metrics.map((metric) => (
            <div className="metric-card" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              {metric.qualification ? <small>{metric.qualification}</small> : null}
            </div>
          ))}
        </section>
      ) : null}

      <MarkdownCaseStudy project={project} />

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
