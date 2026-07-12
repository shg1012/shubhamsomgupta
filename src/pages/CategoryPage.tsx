import { Link, useParams } from 'react-router-dom';
import { ArrowRightIcon } from '../components/ArrowRightIcon';
import { ProjectCard } from '../components/ProjectCard';
import { getCategory } from '../data/categories';
import { getProjectsByCategory } from '../data/projects';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { ProjectCategorySlug } from '../types/portfolio';
import { NotFoundPage } from './NotFoundPage';

export function CategoryPage() {
  const { categorySlug } = useParams();
  const category = getCategory(categorySlug ?? '');
  useDocumentTitle(category?.title ?? 'Page not found');

  if (!category) {
    return <NotFoundPage />;
  }

  const projects = getProjectsByCategory(category.slug as ProjectCategorySlug);

  return (
    <div className="page-shell">
      <section className="page-hero category-hero">
        <Link className="breadcrumb" to="/">
          <span className="breadcrumb-icon" aria-hidden="true">
            <ArrowRightIcon />
          </span>
          back
        </Link>
        <p className="eyebrow">{category.eyebrow}</p>
        <h1>{category.title}</h1>
        <p>{category.description}</p>
        <div className="category-meta">
          <span>{projects.length} projects</span>
          {category.capabilities.map((capability) => (
            <span key={capability}>{capability}</span>
          ))}
        </div>
      </section>

      <section className="project-grid project-grid--listing">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </div>
  );
}
