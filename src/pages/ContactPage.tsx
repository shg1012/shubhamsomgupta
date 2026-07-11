import { profile } from '../data/profile';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function ContactPage() {
  useDocumentTitle('Contact');

  return (
    <div className="page-shell">
      <section className="page-hero compact-hero">
        <p className="eyebrow">Contact</p>
        <h1>For product work, identity systems, or a good design problem.</h1>
        <p>
          Reach out for portfolio reviews, consulting, healthcare UX projects, brand systems, or
          collaborations that need calm structure and strong visual judgment.
        </p>
      </section>

      <section className="contact-grid">
        <a className="glass-card contact-card" href={`mailto:${profile.email}`}>
          <span>Email</span>
          <strong>{profile.email}</strong>
        </a>
        {profile.socials
          .filter((item) => item.label !== 'Email')
          .map((item) => (
            <a className="glass-card contact-card" href={item.href} key={item.label}>
              <span>{item.label}</span>
              <strong>Open profile</strong>
            </a>
          ))}
      </section>
    </div>
  );
}
