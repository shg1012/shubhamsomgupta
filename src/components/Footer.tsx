import { Link } from 'react-router-dom';
import { profile } from '../data/profile';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__lead">
        <p className="eyebrow">End note / Available for thoughtful design work</p>
        <h2>Have a complicated problem worth untangling?</h2>
        <a className="footer-email" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
      </div>
      <div className="site-footer__meta">
        <div className="footer-links">
          {profile.socials.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
          <Link to="/contact">Contact</Link>
        </div>
        <p>Designed as a working archive of systems, stories, and visual observations.</p>
      </div>
    </footer>
  );
}
