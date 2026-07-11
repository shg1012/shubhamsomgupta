import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '../components/ArrowRightIcon';
import { Hero } from '../components/Hero';
import { ProjectCard } from '../components/ProjectCard';
import { SectionHeader } from '../components/SectionHeader';
import { categories } from '../data/categories';
import { photographyItems } from '../data/photography';
import {
  getFeaturedProject,
  getProjectsByCategory,
  getSecondaryFeaturedProject,
} from '../data/projects';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { ProjectCardSize } from '../types/portfolio';

const workStreamCardPattern: ProjectCardSize[] = ['small', 'medium', 'small', 'wide'];

export function HomePage() {
  useDocumentTitle('Design Portfolio');

  const featuredProject = getFeaturedProject();
  const secondaryProject = getSecondaryFeaturedProject();

  return (
    <div className="page-shell home-page">
      <Hero />

      <section className="two-column-feature">
        <article className="glass-card about-preview">
          <div className="figma-card-topline">
            <div className="figma-card-tags" aria-label="Profile highlights">
              <span>6+ years of experience</span>
              <span>Red Dot Team Awardee</span>
            </div>
            <Link className="card-icon-link" to="/about" aria-label="Read more about Shubham">
              <ArrowRightIcon />
            </Link>
          </div>
          <h2>about me..</h2>
          <p>
            I design digital experiences where clarity matters most.
            <br />
            <br />
            My work focuses on simplifying complex systems, especially in healthcare, by balancing
            user needs, business goals, and real-world constraints.
          </p>
          <Link className="text-action" to="/about">
            Read the full profile <ArrowRightIcon />
          </Link>
        </article>

        {featuredProject ? <ProjectCard project={featuredProject} size="hero" /> : null}
      </section>

      {secondaryProject ? (
        <section className="highlight-row">
          <ProjectCard project={secondaryProject} size="wide" />
        </section>
      ) : null}

      {categories.map((category) => {
        const categoryProjects = getProjectsByCategory(category.slug).slice(0, 4);

        return (
          <section className="work-stream" key={category.slug}>
            <SectionHeader
              eyebrow={category.eyebrow}
              title={`${category.title} projects`}
              description={category.shortDescription}
              actionLabel="view more"
              actionTo={`/work/${category.slug}`}
            />
            <div className={`project-grid project-grid--${category.slug}`}>
              {categoryProjects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  size={workStreamCardPattern[index] ?? 'small'}
                />
              ))}
            </div>
          </section>
        );
      })}

      <section className="photography-preview">
        <SectionHeader
          eyebrow="Photography"
          title="Field notes in light, motion, and texture"
          description="A visual counterpoint to the product work: birds, streets, automotive frames, and small moments of attention."
          actionLabel="View gallery"
          actionTo="/photography"
        />
        <div className="photo-strip">
          {photographyItems.slice(0, 4).map((item) => (
            <figure className={`photo-tile photo-tile--${item.orientation}`} key={item.id}>
              <img src={item.src} alt={item.alt} loading="lazy" />
              <figcaption>
                {item.year} / {item.location}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
