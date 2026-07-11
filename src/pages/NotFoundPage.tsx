import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function NotFoundPage() {
  useDocumentTitle('Page not found');

  return (
    <div className="page-shell">
      <section className="page-hero compact-hero">
        <p className="eyebrow">404</p>
        <h1>This page is still finding its shape.</h1>
        <p>The route does not exist yet. Head back to the portfolio home and keep exploring.</p>
        <Link className="button-primary" to="/">
          Back to home
        </Link>
      </section>
    </div>
  );
}
