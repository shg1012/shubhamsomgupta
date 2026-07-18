import { useEffect, useRef, useState } from 'react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLElement>(null);

  const closeMenu = (restoreFocus = false) => {
    setIsMenuOpen(false);

    if (restoreFocus) {
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    }
  };

  const openMenu = () => {
    setIsMenuOpen(true);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());
  };

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu(true);
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = menuPanelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );

      if (!focusableElements?.length) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

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
        <button
          ref={menuButtonRef}
          className="mobile-menu-trigger"
          type="button"
          aria-label="Open navigation menu"
          aria-controls="mobile-navigation-panel"
          aria-expanded={isMenuOpen}
          onClick={openMenu}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
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
      <button
        className={`mobile-menu-backdrop${isMenuOpen ? ' is-open' : ''}`}
        type="button"
        aria-label="Close navigation menu"
        tabIndex={-1}
        onClick={() => closeMenu(true)}
      />
      <aside
        ref={menuPanelRef}
        id="mobile-navigation-panel"
        className={`mobile-menu-panel${isMenuOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Primary navigation"
        aria-hidden={!isMenuOpen}
      >
        <div className="mobile-menu-panel__header">
          <span>Menu</span>
          <button
            ref={closeButtonRef}
            className="mobile-menu-close"
            type="button"
            aria-label="Close navigation menu"
            tabIndex={isMenuOpen ? 0 : -1}
            onClick={() => closeMenu(true)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
        <nav className="mobile-menu-links" aria-label="Mobile primary navigation">
          <NavLink
            to="/"
            end
            tabIndex={isMenuOpen ? 0 : -1}
            className={({ isActive }) => `mobile-menu-link${isActive ? ' is-active' : ''}`}
            onClick={() => closeMenu()}
          >
            Home
          </NavLink>
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              tabIndex={isMenuOpen ? 0 : -1}
              className={({ isActive }) =>
                `mobile-menu-link${
                  isActive || item.to === activeCategoryPath ? ' is-active' : ''
                }`
              }
              onClick={() => closeMenu()}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </header>
  );
}
