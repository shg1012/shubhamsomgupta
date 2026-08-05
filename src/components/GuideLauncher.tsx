import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import {
  createGuideSession,
  GUIDE_SESSION_EVENT,
  guideLocationPath,
  readGuideSession,
  writeGuideSession,
  type GuideSession,
} from '../guide/guideSession';
import tourBossSticker from '../assets/tour-boss-sticker.png';

interface GuideNavigationState {
  fromGuide?: boolean;
  guideClosed?: boolean;
  guideBackgroundPath?: string;
  guideReturnPath?: string;
}

function getContextualGuidePath(pathname: string) {
  const categorySlug = pathname.match(/^\/work\/([^/]+)/)?.[1];
  const projectSlug = pathname.match(/^\/project\/([^/]+)/)?.[1];

  if (categorySlug) {
    return `/guide/category/${categorySlug}`;
  }

  if (projectSlug) {
    return `/guide/project/${projectSlug}`;
  }

  if (pathname === '/about') {
    return '/guide/about';
  }

  if (pathname === '/contact') {
    return '/guide/about/contact';
  }

  return '/guide';
}

export function GuideLauncher() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const [session, setSession] = useState<GuideSession | null>(() => readGuideSession());
  const navigationState = location.state as GuideNavigationState | null;

  useEffect(() => {
    setSession(readGuideSession());

    const updateSession = () => setSession(readGuideSession());
    window.addEventListener(GUIDE_SESSION_EVENT, updateSession);

    return () => window.removeEventListener(GUIDE_SESSION_EVENT, updateSession);
  }, [location.key]);

  useEffect(() => {
    const locationPath = guideLocationPath(location.pathname, location.search) + location.hash;
    const returnedThroughBrowser = Boolean(
      session &&
      !session.isClosed &&
      navigationType === 'POP' &&
      !navigationState?.fromGuide &&
      locationPath === session.originPath,
    );

    if ((!navigationState?.guideClosed && !returnedThroughBrowser) || !session) {
      return;
    }

    if (returnedThroughBrowser) {
      const closedSession = { ...session, isClosed: true };
      writeGuideSession(closedSession);
      setSession(closedSession);
    }

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: session.originScrollY, behavior: 'auto' });
      launcherRef.current?.focus({ preventScroll: true });
    });
  }, [
    location.hash,
    location.key,
    location.pathname,
    location.search,
    navigationState,
    navigationType,
    session,
  ]);

  const openGuide = () => {
    const currentPortfolioPath =
      guideLocationPath(location.pathname, location.search) + location.hash;
    const nextSession = session
      ? {
          ...session,
          originPath: session.isClosed ? currentPortfolioPath : session.originPath,
          originScrollY: session.isClosed ? window.scrollY : session.originScrollY,
          isClosed: false,
        }
      : createGuideSession(
          currentPortfolioPath,
          window.scrollY,
          getContextualGuidePath(location.pathname),
        );

    writeGuideSession(nextSession);
    setSession(nextSession);

    navigate(nextSession.currentPath, {
      state: {
        guideRunId: nextSession.runId,
        guideResumed: Boolean(session),
        guideBackgroundPath: currentPortfolioPath,
      },
    });
  };

  const resumeContext = session?.views[session.currentPath];
  const contextLabel = resumeContext?.projectTitle ?? resumeContext?.label;
  const questionLabel = resumeContext?.questionLabel;
  const returnLabel = questionLabel ? `Return to “${questionLabel}”` : contextLabel;
  const visibleLabel = session ? 'Resume your guide' : 'Explore with the guide';
  const accessibleLabel = contextLabel
    ? `${visibleLabel}: ${contextLabel}${questionLabel ? `. ${returnLabel}` : ''}`
    : visibleLabel;

  return (
    <button
      ref={launcherRef}
      className="guide-launcher"
      type="button"
      aria-label={accessibleLabel}
      title={accessibleLabel}
      data-guide-launcher
      onClick={openGuide}
    >
      <img
        className="guide-launcher__sticker"
        src={tourBossSticker}
        alt=""
        aria-hidden="true"
        draggable="false"
      />
    </button>
  );
}
