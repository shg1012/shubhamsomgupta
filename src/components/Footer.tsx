import { Link } from 'react-router-dom';
import { profile } from '../data/profile';

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <p className="eyebrow">Available for thoughtful product and identity work</p>
        <h2>Let clarity do more of the heavy lifting.</h2>
      </div>
      <div className="footer-links">
        {profile.socials.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
        <Link to="/contact">Contact</Link>
      </div>
    </footer>
  );
}
