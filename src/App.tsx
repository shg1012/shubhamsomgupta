import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ScrollToTopButton } from './components/ScrollToTopButton';

const AboutPage = lazy(() =>
  import('./pages/AboutPage').then(({ AboutPage }) => ({ default: AboutPage })),
);
const CategoryPage = lazy(() =>
  import('./pages/CategoryPage').then(({ CategoryPage }) => ({ default: CategoryPage })),
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then(({ ContactPage }) => ({ default: ContactPage })),
);
const HomePage = lazy(() =>
  import('./pages/HomePage').then(({ HomePage }) => ({ default: HomePage })),
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then(({ NotFoundPage }) => ({ default: NotFoundPage })),
);
const PhotographyPage = lazy(() =>
  import('./pages/PhotographyPage').then(({ PhotographyPage }) => ({ default: PhotographyPage })),
);
const ProjectPage = lazy(() =>
  import('./pages/ProjectPage').then(({ ProjectPage }) => ({ default: ProjectPage })),
);
const WritingPage = lazy(() =>
  import('./pages/WritingPage').then(({ WritingPage }) => ({ default: WritingPage })),
);

function RouteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  }, [pathname]);

  return null;
}

function RouteLoadingFallback() {
  return (
    <div className="page-shell route-loading">
      <p className="eyebrow" role="status">
        Loading page…
      </p>
    </div>
  );
}

export default function App() {
  return (
    <>
      <RouteEffects />
      <Header />
      <main id="main-content">
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/work/:categorySlug" element={<CategoryPage />} />
            <Route path="/project/:projectSlug" element={<ProjectPage />} />
            <Route path="/photography" element={<PhotographyPage />} />
            <Route path="/writing" element={<WritingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
