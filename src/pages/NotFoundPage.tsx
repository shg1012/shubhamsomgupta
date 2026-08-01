import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function NotFoundPage() {
  useDocumentTitle('Page not found');

  return (
    <div className="page-shell not-found-page">
      <section className="page-hero not-found-hero">
        <span className="not-found-hero__number" aria-hidden="true">
          404
        </span>
        <div>
          <p className="eyebrow">Lost artifact</p>
          <h1>This page is still finding its shape.</h1>
          <p>The route does not exist yet. Return to the project index and keep exploring.</p>
          <Link className="button-primary" to="/">
            Back to home
          </Link>
        </div>
      </section>
    </div>
  );
}
