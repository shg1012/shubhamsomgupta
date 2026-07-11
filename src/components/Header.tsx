import { NavLink, Link } from 'react-router-dom';
import { navigationItems } from '../data/navigation';

export function Header() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="nav-shell" aria-label="Primary">
        <Link className="brand-mark" to="/" aria-label="Shubham S. Gupta home">
          <span>designer, engineer, photographer</span>
        </Link>
        <nav className="nav-pills">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-pill${isActive ? ' is-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <a className="email-pill" href="mailto:shubham@ssgupta.in" aria-label="Email Shubham">
          <span>shubham</span>
          <span className="email-pill__x">x</span>
          <span>gupta.in</span>
        </a>
      </div>
    </header>
  );
}
