import { Link, useParams } from 'react-router-dom';
import { ProjectVisual } from '../components/ProjectVisual';
import { getCategory } from '../data/categories';
import { getProject, getProjectsByCategory } from '../data/projects';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { NotFoundPage } from './NotFoundPage';

export function ProjectPage() {
  const { projectSlug } = useParams();
  const project = getProject(projectSlug ?? '');
  useDocumentTitle(project?.title ?? 'Page not found');

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
            {category?.title ?? 'Work'}
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
            </div>
          ))}
        </section>
      ) : null}

      <section className="case-study-stack">
        {project.sections?.map((section) => (
          <article className="case-study-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.body ? <p>{section.body}</p> : null}
            {section.bullets ? (
              <ul>
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.image ? <img src={section.image} alt={section.imageAlt ?? ''} /> : null}
          </article>
        ))}
      </section>

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
