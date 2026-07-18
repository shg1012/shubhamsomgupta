import { NavLink, Link, useLocation } from 'react-router-dom';
import { navigationItems } from '../data/navigation';
import { getProject } from '../data/projects';
import { HomeIcon } from './HomeIcon';

export function Header() {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';
  const projectSlug = pathname.match(/^\/project\/([^/]+)/)?.[1];
  const activeProject = projectSlug ? getProject(decodeURIComponent(projectSlug)) : undefined;
  const activeCategoryPath = activeProject ? `/work/${activeProject.category}` : undefined;

  return (
    <header className={`site-header${isHomePage ? '' : ' site-header--compact-home'}`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="nav-shell" aria-label="Primary">
        <Link
          className={`brand-mark${isHomePage ? '' : ' brand-mark--icon'}`}
          to="/"
          aria-label="Shubham S. Gupta home"
        >
          {isHomePage ? <span>designer, engineer, photographer</span> : <HomeIcon />}
        </Link>
        <nav className="nav-pills">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-pill${isActive || item.to === activeCategoryPath ? ' is-active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Link className="email-pill" to="/" aria-label="Shubham S. Gupta home">
          <span>shubham</span>
          <span className="email-pill__x">x</span>
          <span>gupta.in</span>
        </Link>
      </div>
    </header>
  );
}
