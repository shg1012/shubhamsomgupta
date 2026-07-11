import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function AboutPage() {
  useDocumentTitle('About');

  return (
    <div className="page-shell">
      <section className="page-hero compact-hero">
        <p className="eyebrow">About</p>
        <h1>{profile.name}</h1>
        <p>{profile.longBio}</p>
      </section>

      <section className="about-layout">
        <article className="glass-card narrative-card">
          <h2>Designing for the messy middle</h2>
          <p>
            I am interested in systems that ask people to make decisions with incomplete
            information: clinical workflows, service operations, onboarding paths, brand systems,
            and the interfaces that hold them together.
          </p>
          <p>
            My process is research-led and artifact-driven. I like maps, prototypes, crisp
            language, visual systems, and enough restraint to let the real work breathe.
          </p>
          <Link className="button-secondary" to="/contact">
            Start a conversation
          </Link>
        </article>

        <aside className="glass-card profile-card">
          <p className="eyebrow">Current role</p>
          <h2>{profile.role}</h2>
          <p>{profile.currentRole}</p>
          <div className="discipline-cloud">
            {profile.disciplines.map((discipline) => (
              <span key={discipline}>{discipline}</span>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
