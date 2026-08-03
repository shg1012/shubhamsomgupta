import { ArrowRightIcon } from '../components/ArrowRightIcon';
import { profile } from '../data/profile';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function ContactPage() {
  useDocumentTitle('Contact');
  const socialLinks = profile.socials.filter((item) => item.label !== 'Email');

  return (
    <div className="page-shell contact-page">
      <section className="page-hero contact-hero">
        <p className="eyebrow">Contact / Start with the complicated part</p>
        <h1>Let&apos;s make a complex problem easier to understand.</h1>
        <p>
          Reach out for healthcare UX, service and workflow design, product strategy, identity
          systems, or a thoughtful portfolio conversation.
        </p>
        <a className="contact-email-hero" href={`mailto:${profile.email}`}>
          <span>Email me</span>
          <strong>{profile.email}</strong>
          <ArrowRightIcon />
        </a>
      </section>

      <section className="contact-directory" aria-labelledby="contact-directory-title">
        <div className="contact-directory__heading">
          <p className="eyebrow">Elsewhere / 01–{String(socialLinks.length).padStart(2, '0')}</p>
          <h2 id="contact-directory-title">Find the work in other places.</h2>
        </div>
        <div className="contact-grid">
          {socialLinks.map((item, index) => (
            <a
              className="contact-card"
              href={item.href}
              key={item.label}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item.label}</strong>
              <small>Open profile</small>
              <ArrowRightIcon />
            </a>
          ))}
        </div>
      </section>

      <aside className="contact-note">
        <span>Good starting material</span>
        <p>A problem, a constraint, a rough brief—or simply the part that still feels unclear.</p>
      </aside>
    </div>
  );
}
