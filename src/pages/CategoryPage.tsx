import { Link, useParams } from 'react-router-dom';
import { ArrowRightIcon } from '../components/ArrowRightIcon';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectVisual } from '../components/ProjectVisual';
import { SectionHeader } from '../components/SectionHeader';
import { categories, getCategory } from '../data/categories';
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
  const categoryIndex = categories.findIndex((item) => item.slug === category.slug);
  const leadProject = projects[0];
  const cardSizes = ['wide', 'small', 'medium', 'small'] as const;

  return (
    <div className={`page-shell category-page category-page--${category.slug}`}>
      <section className="page-hero category-hero">
        <span className="category-hero__number" aria-hidden="true">
          {String(categoryIndex + 1).padStart(2, '0')}
        </span>
        <div className="category-hero__copy">
          <Link className="breadcrumb" to="/">
            <span className="breadcrumb-icon" aria-hidden="true">
              <ArrowRightIcon />
            </span>
            Portfolio index
          </Link>
          <p className="eyebrow">Practice area / {String(categoryIndex + 1).padStart(2, '0')}</p>
          <h1>{category.title}</h1>
          <p>{category.description}</p>
          <div className="category-meta">
            <span>{projects.length} projects</span>
            {category.capabilities.map((capability) => (
              <span key={capability}>{capability}</span>
            ))}
          </div>
        </div>
        {leadProject ? (
          <div className="category-hero__visual">
            <ProjectVisual project={leadProject} context="hero" />
          </div>
        ) : null}
      </section>

      <section className="category-projects">
        <SectionHeader
          eyebrow="Project index"
          title="Selected artifacts and case studies."
          description="Each project is labelled by its actual status so shipped work, prototypes, and concepts stay distinct."
        />
        <div className="project-grid project-grid--listing">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              size={cardSizes[index % cardSizes.length]}
              presentation={index % 3 === 1 ? 'editorial' : index % 3 === 2 ? 'evidence' : 'image'}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
