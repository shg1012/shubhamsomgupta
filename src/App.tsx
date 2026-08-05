import { lazy, Suspense, useEffect, useRef } from 'react';
import { Route, Routes, useLocation, useNavigationType } from 'react-router-dom';
import { Footer } from './components/Footer';
import { GuideLauncher } from './components/GuideLauncher';
import { Header } from './components/Header';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { guideLocationPath, readGuideSession } from './guide/guideSession';

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
const GuidePage = lazy(() =>
  import('./pages/GuidePage').then(({ GuidePage }) => ({ default: GuidePage })),
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
  const { hash, pathname, search, state } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const navigationState = state as { fromGuide?: boolean } | null;
    const guideSession = readGuideSession();
    const currentPath = guideLocationPath(pathname, search) + hash;
    const returnedThroughBrowser = Boolean(
      guideSession &&
      !guideSession.isClosed &&
      navigationType === 'POP' &&
      !navigationState?.fromGuide &&
      guideSession.originPath === currentPath,
    );

    if (
      pathname.startsWith('/guide') ||
      (navigationState?.fromGuide && pathname.startsWith('/project/')) ||
      returnedThroughBrowser
    ) {
      return;
    }

    window.scrollTo({
      top: 0,
      behavior:
        navigationState?.fromGuide || window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
    });

    if (navigationState?.fromGuide) {
      window.requestAnimationFrame(() => {
        document.getElementById('main-content')?.focus({ preventScroll: true });
      });
    }
  }, [hash, navigationType, pathname, search, state]);

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
  const location = useLocation();
  const { pathname } = location;
  const isGuideRoute = pathname.startsWith('/guide');
  const underlayRef = useRef<HTMLDivElement>(null);
  const guideNavigationState = location.state as { guideBackgroundPath?: string } | null;
  const guideSession = isGuideRoute ? readGuideSession() : null;
  const backgroundPath =
    guideNavigationState?.guideBackgroundPath ?? guideSession?.originPath ?? '/';

  useEffect(() => {
    underlayRef.current?.toggleAttribute('inert', isGuideRoute);
  }, [isGuideRoute]);

  return (
    <>
      <RouteEffects />
      <div ref={underlayRef} className="portfolio-underlay" aria-hidden={isGuideRoute || undefined}>
        <Header />
        <main id="main-content" tabIndex={-1}>
          <Suspense fallback={<RouteLoadingFallback />}>
            <Routes location={isGuideRoute ? backgroundPath : location}>
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
        {!isGuideRoute ? <GuideLauncher /> : null}
        <Footer />
        {!isGuideRoute ? <ScrollToTopButton /> : null}
      </div>
      {isGuideRoute ? (
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            <Route path="/guide/*" element={<GuidePage />} />
          </Routes>
        </Suspense>
      ) : null}
    </>
  );
}
