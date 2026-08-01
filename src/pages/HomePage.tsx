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

const workStreamCardPattern: ProjectCardSize[] = ['wide', 'small', 'medium', 'small'];

const fieldNotes = [
  {
    status: 'Shipped',
    title: 'Making type more readable in clinical interfaces',
    description: 'A framework shaped through usability observation and workshop synthesis.',
    to: '/project/font-readability-framework',
  },
  {
    status: 'Working prototype',
    title: 'A drone system for earlier wildfire signals',
    description: 'Physical design, sensing, ground-control workflow, and iterative prototyping.',
    to: '/project/fireflys',
  },
  {
    status: 'Functioning academic concept prototype',
    title: 'Brushing as a medication-delivery moment',
    description: 'A product concept explored through form, mechanism, and physical testing.',
    to: '/project/zero-brush',
  },
  {
    status: 'Photography practice',
    title: 'Light, motion, and texture outside the interface',
    description: 'A visual practice built around attention, context, and small observations.',
    to: '/photography',
  },
];

export function HomePage() {
  useDocumentTitle('Design Portfolio');

  const featuredProject = getFeaturedProject();
  const secondaryProject = getSecondaryFeaturedProject();
  const observationPhoto = photographyItems.find((item) => item.id === 'street-bubbles');

  return (
    <div className="page-shell home-page">
      <Hero />

      <section className="selected-work" id="selected-work">
        <SectionHeader
          eyebrow="Selected work / 01"
          title="A few ways complexity became actionable."
          description="Research, systems thinking, and visual craft applied across healthcare, operations, and service experiences."
        />
        <div className="selected-work__grid">
          {featuredProject ? (
            <ProjectCard project={featuredProject} size="hero" index={0} presentation="image" />
          ) : null}
          <article className="practice-card">
            <p className="eyebrow">Practice note</p>
            <h2>Research-led. Artifact-driven. Built for the messy middle.</h2>
            <p>
              I turn observations, workflows, constraints, and partial signals into structures a
              team can discuss, test, and build.
            </p>
            <dl>
              <div>
                <dt>Experience</dt>
                <dd>6+ years</dd>
              </div>
              <div>
                <dt>Recognition</dt>
                <dd>Red Dot team awardee</dd>
              </div>
            </dl>
            <Link className="text-action" to="/about">
              Read about my practice
              <ArrowRightIcon />
            </Link>
          </article>
          {secondaryProject ? (
            <ProjectCard project={secondaryProject} size="wide" index={1} presentation="evidence" />
          ) : null}
        </div>
      </section>

      {categories.map((category, categoryIndex) => {
        const categoryProjects = getProjectsByCategory(category.slug).slice(0, 4);

        return (
          <div className="home-stream-group" key={category.slug}>
            <section className={`work-stream work-stream--${category.slug}`}>
              <SectionHeader
                eyebrow={`${String(categoryIndex + 2).padStart(2, '0')} / ${category.eyebrow}`}
                title={category.title}
                description={category.description}
                actionLabel="View all projects"
                actionTo={`/work/${category.slug}`}
              />
              <div className={`project-grid project-grid--${category.slug}`}>
                {categoryProjects.map((project, index) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    size={workStreamCardPattern[index] ?? 'small'}
                    index={index}
                    presentation={index === 1 ? 'editorial' : index === 2 ? 'evidence' : 'image'}
                  />
                ))}
              </div>
            </section>

            {categoryIndex === 0 && observationPhoto ? (
              <aside className="observation-break">
                <figure>
                  <img src={observationPhoto.src} alt={observationPhoto.alt} loading="lazy" />
                  <figcaption>
                    <span>Field observation / Photography</span>
                    <strong>{observationPhoto.caption}</strong>
                  </figcaption>
                </figure>
                <blockquote>
                  <p>“Attention is a design tool.”</p>
                  <footer>Looking beyond the screen changes what makes it onto the screen.</footer>
                </blockquote>
              </aside>
            ) : null}
          </div>
        );
      })}

      <section className="field-notes">
        <SectionHeader
          eyebrow="Field notes / 05"
          title="Experiments, methods, and work in motion."
          description="A bounded set of studies and artifacts—each labelled by its real project status."
        />
        <div className="field-notes__list">
          {fieldNotes.map((note, index) => (
            <Link to={note.to} key={note.title}>
              <span className="field-note__index">{String(index + 1).padStart(2, '0')}</span>
              <span className="field-note__status">{note.status}</span>
              <span className="field-note__copy">
                <strong>{note.title}</strong>
                <small>{note.description}</small>
              </span>
              <ArrowRightIcon />
            </Link>
          ))}
        </div>
      </section>

      <section className="photography-preview">
        <SectionHeader
          eyebrow="Visual observations / 06"
          title="Field notes in light, motion, and texture."
          description="Photography is the counterpoint to the systems work—and part of how I keep looking closely."
          actionLabel="Open the gallery"
          actionTo="/photography"
        />
        <div className="photo-strip">
          {photographyItems.slice(0, 4).map((item, index) => (
            <figure className={`photo-tile photo-tile--${item.orientation}`} key={item.id}>
              <img src={item.src} alt={item.alt} loading="lazy" />
              <figcaption>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.title}</strong>
                <small>
                  {item.year} / {item.location}
                </small>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
