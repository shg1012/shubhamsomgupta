import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import tourBossResponseAvatar from '../assets/tour-boss-response-avatar.webp';
import tourBossSticker from '../assets/tour-boss-sticker.png';
import { ArrowRightIcon } from '../components/ArrowRightIcon';
import { RefreshIcon } from '../components/RefreshIcon';
import {
  GUIDE_INITIAL_PROJECT_LIMIT,
  formatGuideProjectOverview,
  getGuideAboutAnswer,
  getGuideCapability,
  getGuideCapabilityProjects,
  getGuideDeliveryStage,
  getGuideDeliveryStageProjects,
  getGuideProject,
  getGuideProjects,
  getGuideProjectsByCategory,
  getGuideTour,
  guideAboutAnswers,
  guideCapabilities,
  guideCategories,
  guideDeliveryStages,
  guideFeaturedProjects,
  guideTours,
  hasGuideProjectEvidence,
  isGuideProjectSlug,
} from '../data/guide';
import {
  createGuideSession,
  findGuideFocusTarget,
  getActiveGuideFocusKey,
  guideLocationPath,
  readGuideSession,
  writeGuideSession,
  type GuideConversationTurn,
  type GuideSession,
  type GuideResponseLink,
  type GuideViewState,
} from '../guide/guideSession';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { profile } from '../data/profile';
import type {
  GuideAboutAnswerId,
  GuideCapabilityId,
  GuideDeliveryStageId,
  GuideProject,
  GuideProjectContent,
  GuideProjectSlug,
  GuideTourId,
} from '../types/guide';

type GuideQuestionId = 'problem' | 'contribution' | 'evidence' | 'outcome';

interface GuideNavigationState {
  fromGuide?: boolean;
  guideBackgroundPath?: string;
  guideRunId?: string;
  guideReturnPath?: string;
  guideRestoreView?: boolean;
  guideResumed?: boolean;
}

interface GuideScreenMeta {
  title: string;
  label: string;
  eyebrow: string;
  projectSlug?: string;
  projectTitle?: string;
  questionLabel?: string;
}

interface GuideChoiceProps {
  label: string;
  description?: string;
  onClick: () => void;
  focusKey?: string;
  quiet?: boolean;
}

interface GuideProjectCardProps {
  guideProject: GuideProject;
  handoffState: GuideNavigationState;
  onOpenSummary: () => void;
  onPrepareHandoff: () => void;
}

interface GuideLinkChoiceProps {
  label: string;
  to: string;
  state: GuideNavigationState;
  onClick: () => void;
  focusKey: string;
  quiet?: boolean;
}

const questionLabels: Record<GuideQuestionId, string> = {
  problem: 'What was the problem?',
  contribution: 'What did Shubham do?',
  evidence: 'What changed because of evidence?',
  outcome: 'What was the outcome?',
};

const guideAboutIntroduction =
  'Meet Shubham: a senior UX designer who voluntarily befriends messy systems. He brings research, visual craft, and a suspicious number of sticky notes. The goal: fewer confused humans and interfaces that behave themselves.';

const guideContactLinks: GuideResponseLink[] = [
  { label: `Email: ${profile.email}`, href: `mailto:${profile.email}` },
  { label: `Phone: ${profile.phone}`, href: profile.phoneHref },
  ...profile.socials
    .filter((item) => item.label !== 'Email')
    .map((item) => ({ label: item.label, href: item.href })),
];

const GuidePromptTargetContext = createContext<HTMLElement | null>(null);

const splitGuidePath = (pathname: string) => pathname.split('/').filter(Boolean).slice(1);

function getGuideScreenMeta(pathname: string): GuideScreenMeta {
  const [section, id, detail, subdetail] = splitGuidePath(pathname);

  if (!section) {
    return {
      title: 'What would you like to understand?',
      label: 'Guide Home',
      eyebrow: 'Prepared paths through the portfolio',
    };
  }

  if (section === 'tours' || (section === 'tour' && !id)) {
    return { title: 'Choose a short tour', label: 'Quick tours', eyebrow: 'Three to four stops' };
  }

  if (section === 'tour' && id) {
    const tour = guideTours.find((item) => item.id === id);

    if (detail === 'complete') {
      return {
        title: "That's the tour.",
        label: tour?.prompt ?? 'Tour complete',
        eyebrow: 'Tour complete',
      };
    }

    const stepIndex = Number(detail ?? 0);
    const stop = Number.isInteger(stepIndex) ? tour?.stops[stepIndex] : undefined;
    const guideProject = stop ? getGuideProject(stop.projectSlug) : undefined;

    return {
      title: guideProject?.project.title ?? 'Tour stop',
      label: tour?.prompt ?? 'Quick tour',
      eyebrow: tour
        ? `Tour · ${Math.min(stepIndex + 1, tour.stops.length)} of ${tour.stops.length}`
        : 'Tour',
      projectSlug: guideProject?.project.slug,
      projectTitle: guideProject?.project.title,
      questionLabel: subdetail === 'why' ? 'Why this project?' : undefined,
    };
  }

  if (section === 'projects') {
    return {
      title: 'How would you like to browse?',
      label: 'Explore projects',
      eyebrow: '14 published projects',
    };
  }

  if (section === 'categories') {
    return { title: 'Choose a category', label: 'Project categories', eyebrow: 'Three fields' };
  }

  if (section === 'category' && id) {
    const category = guideCategories.find((item) => item.id === id);
    return {
      title: category?.prompt ?? 'Project category',
      label: category?.prompt ?? 'Project category',
      eyebrow: 'Category',
    };
  }

  if (section === 'stages') {
    return {
      title: 'Choose a delivery stage',
      label: 'Delivery stage',
      eyebrow: 'Exact project status stays visible',
    };
  }

  if (section === 'stage' && id) {
    const stage = guideDeliveryStages.find((item) => item.id === id);
    return {
      title: stage?.prompt ?? 'Delivery stage',
      label: stage?.prompt ?? 'Delivery stage',
      eyebrow: 'Projects by maturity',
    };
  }

  if (section === 'featured') {
    return {
      title: 'Featured case studies',
      label: 'Featured case studies',
      eyebrow: 'Expanded public process',
    };
  }

  if (section === 'capabilities' || (section === 'capability' && !id)) {
    return {
      title: 'What would you like evidence of?',
      label: 'Capabilities',
      eyebrow: 'Find work by capability',
    };
  }

  if (section === 'capability' && id) {
    const capability = guideCapabilities.find((item) => item.id === id);
    return {
      title: capability?.prompt ?? 'Capability',
      label: capability?.prompt ?? 'Capability',
      eyebrow: 'Relevant published work',
    };
  }

  if (section === 'about-guide') {
    return {
      title: 'About this guide',
      label: 'About this guide',
      eyebrow: 'Scripted, static, and evidence-linked',
    };
  }

  if (section === 'about' && !id) {
    return {
      title: 'What would you like to know?',
      label: 'About Shubham',
      eyebrow: 'Practice and fit',
    };
  }

  if (section === 'about' && id) {
    const answer = guideAboutAnswers.find((item) => item.id === id);
    return {
      title: answer?.prompt ?? 'About Shubham',
      label: answer?.prompt ?? 'About Shubham',
      eyebrow: 'Prepared answer',
      questionLabel: answer?.prompt,
    };
  }

  if (section === 'project' && id) {
    const guideProject = getGuideProject(id);
    const questionLabel =
      detail && detail in questionLabels ? questionLabels[detail as GuideQuestionId] : undefined;

    return {
      title: questionLabel ?? guideProject?.project.title ?? 'Project summary',
      label: guideProject?.project.title ?? 'Project summary',
      eyebrow: questionLabel
        ? 'Project question'
        : (guideProject?.project.status ?? 'Project summary'),
      projectSlug: guideProject?.project.slug,
      projectTitle: guideProject?.project.title,
      questionLabel,
    };
  }

  if (section === 'compare') {
    return {
      title: 'Compare two projects',
      label: 'Project comparison',
      eyebrow: 'Status, problem, contribution, evidence, and outcome',
    };
  }

  return {
    title: 'Choose a new path',
    label: 'Guide recovery',
    eyebrow: 'This path is unavailable',
  };
}

function GuideChoice({ label, description, onClick, focusKey, quiet = false }: GuideChoiceProps) {
  return (
    <button
      className={`guide-choice${quiet ? ' guide-choice--quiet' : ''}`}
      type="button"
      data-guide-focus={focusKey ?? label}
      onClick={onClick}
    >
      <span>
        <strong>{label}</strong>
        {description ? <small>{description}</small> : null}
      </span>
      <ArrowRightIcon />
    </button>
  );
}

function GuideChoiceGrid({ children }: { children: ReactNode }) {
  const promptTarget = useContext(GuidePromptTargetContext);
  const choices = <div className="guide-choice-grid">{children}</div>;

  return promptTarget ? createPortal(choices, promptTarget) : null;
}

function GuideLinkChoice({
  label,
  to,
  state,
  onClick,
  focusKey,
  quiet = false,
}: GuideLinkChoiceProps) {
  return (
    <Link
      className={`guide-choice${quiet ? ' guide-choice--quiet' : ''}`}
      to={to}
      state={state}
      data-guide-focus={focusKey}
      onClick={onClick}
    >
      <span>
        <strong>{label}</strong>
      </span>
      <ArrowRightIcon />
    </Link>
  );
}

function PreparedAnswer({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`guide-answer${className ? ` ${className}` : ''}`}>
      <GuideResponseAvatar />
      <div className="guide-answer__label">
        <span aria-hidden="true" />
        Guide
      </div>
      <div className="guide-answer__body">{children}</div>
    </div>
  );
}

function GuideResponseAvatar() {
  return (
    <img className="guide-response-avatar" src={tourBossResponseAvatar} alt="" aria-hidden="true" />
  );
}

function GuideResponseLinks({ links }: { links: readonly GuideResponseLink[] }) {
  return (
    <ul className="guide-response-links" data-guide-response-links>
      {links.map((link) => {
        const opensNewTab = link.href.startsWith('http');

        return (
          <li key={`${link.label}-${link.href}`}>
            <a
              href={link.href}
              target={opensNewTab ? '_blank' : undefined}
              rel={opensNewTab ? 'noreferrer' : undefined}
            >
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function GuideTourProjectMessage({
  guideProject,
  message,
  tourPrompt,
  stepIndex,
  stopCount,
  handoffState,
  focusKey,
  onProjectOpen,
  showProjectImage = true,
  eager = false,
}: {
  guideProject: GuideProject;
  message: string;
  tourPrompt: string;
  stepIndex: number;
  stopCount: number;
  handoffState: GuideNavigationState;
  focusKey: string;
  onProjectOpen: () => void;
  showProjectImage?: boolean;
  eager?: boolean;
}) {
  return (
    <div className="guide-tour-message">
      <div className="guide-tour-message__heading">
        <span className="guide-status">{guideProject.project.status}</span>
        <h2>{guideProject.project.title}</h2>
      </div>
      <p>{message}</p>
      {showProjectImage ? (
        <Link
          className="guide-tour-message__project-link"
          to={`/project/${guideProject.content.slug}`}
          state={handoffState}
          data-guide-focus={focusKey}
          aria-label={`Open full project: ${guideProject.project.title}`}
          onClick={onProjectOpen}
        >
          <figure>
            <img
              src={guideProject.project.thumbnail}
              alt={guideProject.project.thumbnailAlt}
              loading={eager ? 'eager' : 'lazy'}
            />
          </figure>
          <span className="guide-tour-message__image-action" aria-hidden="true">
            View project
            <ArrowRightIcon />
          </span>
        </Link>
      ) : null}
      <p className="guide-tour-message__proof">{guideProject.project.proofLine}</p>
      <small>
        {tourPrompt} · Project {stepIndex + 1} of {stopCount}
      </small>
    </div>
  );
}

function getTourProjectMessage(path: string) {
  const [section, tourId, detail, subdetail] = parseGuidePath(path).parts;

  if (section !== 'tour' || !tourId || !detail || detail === 'complete') {
    return null;
  }

  const tour = getGuideTour(tourId as GuideTourId);
  const stepIndex = Number(detail);
  const stop = tour && Number.isInteger(stepIndex) ? tour.stops[stepIndex] : undefined;
  const guideProject = stop ? getGuideProject(stop.projectSlug) : undefined;

  if (!tour || !stop || !guideProject) {
    return null;
  }

  return {
    guideProject,
    message: subdetail === 'why' ? stop.reason : guideProject.content.overview,
    tourPrompt: tour.prompt,
    stepIndex,
    stopCount: tour.stops.length,
    showProjectImage: subdetail !== 'why',
  };
}

function GuideProjectCard({
  guideProject,
  handoffState,
  onOpenSummary,
  onPrepareHandoff,
}: GuideProjectCardProps) {
  const { content, project } = guideProject;

  return (
    <article className="guide-project-card">
      <figure>
        <img src={project.thumbnail} alt={project.thumbnailAlt} loading="lazy" decoding="async" />
        <figcaption>{project.category.replaceAll('-', ' ')}</figcaption>
      </figure>
      <div className="guide-project-card__copy">
        <span className="guide-status">{project.status}</span>
        <h2>{project.title}</h2>
        <p>{content.overview}</p>
      </div>
      <div className="guide-project-card__actions">
        <button
          type="button"
          className="guide-inline-action"
          aria-label={`Open ${project.title} summary`}
          data-guide-focus={`summary-${project.slug}`}
          onClick={onOpenSummary}
        >
          Open summary
        </button>
        <Link
          className="guide-inline-action"
          aria-label={`Open full project: ${project.title}`}
          to={`/project/${project.slug}`}
          state={handoffState}
          data-guide-focus={`full-${project.slug}`}
          onClick={onPrepareHandoff}
        >
          Full project
          <ArrowRightIcon />
        </Link>
      </div>
    </article>
  );
}

function getQuestionAnswer(content: GuideProjectContent, questionId: GuideQuestionId) {
  if (questionId === 'problem') {
    return content.problem;
  }

  if (questionId === 'contribution') {
    return content.contribution;
  }

  if (questionId === 'evidence') {
    return content.evidenceToDecision;
  }

  return content.outcome;
}

function getQuestionSourceAnchor(content: GuideProjectContent, questionId: GuideQuestionId) {
  const compactProjectAnchors: Partial<
    Record<GuideProjectSlug, Partial<Record<GuideQuestionId, string>>>
  > = {
    'clinical-trial-discovery': {
      problem: '#context',
      contribution: '#research',
      outcome: '#final-solution',
    },
    'dudhi-planters': {
      problem: '#overview',
      contribution: '#overview',
      outcome: '#overview',
    },
    'prag-marketing-posters': {
      problem: '#marketing-poster-series',
      contribution: '#marketing-poster-series',
      outcome: '#print-production',
    },
    'prag-articove-brochure': {
      problem: '#overview',
      contribution: '#overview',
      outcome: '#overview',
    },
    'studio-portfolio-identity': {
      problem: '#design-principles',
      contribution: '#process',
      outcome: '#process',
    },
  };
  const compactAnchor = compactProjectAnchors[content.slug]?.[questionId];

  if (compactAnchor) {
    return compactAnchor;
  }

  if (questionId === 'problem') {
    return content.sourceAnchors[1] ?? content.sourceAnchors[0];
  }

  if (questionId === 'contribution') {
    return content.sourceAnchors[2] ?? content.sourceAnchors[0];
  }

  if (questionId === 'evidence') {
    return (
      content.sourceAnchors.find((anchor) => anchor === '#decision-trail-title') ??
      content.sourceAnchors[3] ??
      content.sourceAnchors[0]
    );
  }

  return content.sourceAnchors[content.sourceAnchors.length - 1];
}

function parseGuidePath(path: string) {
  const parsed = new URL(path, 'https://portfolio.guide');
  return {
    pathname: parsed.pathname,
    search: parsed.search,
    parts: splitGuidePath(parsed.pathname),
  };
}

function getPromptLabel(focusKey: string | undefined, targetPath: string) {
  if (focusKey && !/^(utility|summary|full|source|compare)-/.test(focusKey)) {
    return focusKey;
  }

  if (focusKey === 'utility-back') return 'Go back';
  if (focusKey === 'utility-guide-home') return 'Guide Home';
  if (focusKey === 'utility-start-over') return 'Start over';
  if (focusKey === 'about-this-guide') return 'How does this guide work?';

  const project = getGuideProjects(
    guideCategories.flatMap((category) =>
      getGuideProjectsByCategory(category.id).map(({ content }) => content.slug),
    ),
  ).find(({ project: candidate }) => focusKey?.includes(candidate.slug));

  if (project) {
    if (focusKey?.startsWith('summary-')) return `Show me ${project.project.title}`;
    if (focusKey?.startsWith('full-') || focusKey?.startsWith('source-')) {
      return `Open the full ${project.project.title} project`;
    }
    if (focusKey?.startsWith('compare-')) return `Compare ${project.project.title}`;
  }

  return getGuideScreenMeta(parseGuidePath(targetPath).pathname).title;
}

function getTranscriptAnswer(path: string) {
  const { parts } = parseGuidePath(path);
  const [section, id, detail, subdetail] = parts;

  if (!section) {
    return 'I can guide you through selected projects, capabilities, and Shubham’s practice.';
  }

  if (section === 'tours') return 'Here are four short, curated routes through the portfolio.';
  if (section === 'projects') return 'You can browse by category, maturity, or featured depth.';
  if (section === 'categories') return 'The work spans digital, industrial, and brand experiences.';
  if (section === 'stages') return 'Each project keeps its documented maturity visible.';
  if (section === 'featured') return guideFeaturedProjects.answer;
  if (section === 'capabilities')
    return 'Choose a capability to see the strongest published evidence.';
  if (section === 'about') {
    if (!id) return guideAboutIntroduction;
    return getGuideAboutAnswer(id as GuideAboutAnswerId)?.answer ?? 'That answer is unavailable.';
  }
  if (section === 'about-guide') {
    return 'This is a static, scripted guide. No response is generated or sent to an AI service.';
  }
  if (section === 'category' && id) {
    return (
      guideCategories.find((category) => category.id === id)?.answer ?? 'Category unavailable.'
    );
  }
  if (section === 'stage' && id) {
    return getGuideDeliveryStage(id as GuideDeliveryStageId)?.answer ?? 'Stage unavailable.';
  }
  if (section === 'capability' && id) {
    return getGuideCapability(id as GuideCapabilityId)?.answer ?? 'Capability unavailable.';
  }
  if (section === 'tour' && id) {
    const tour = getGuideTour(id as GuideTourId);
    if (detail === 'complete') return 'That completes this curated route.';
    const stop = tour?.stops[Number(detail ?? 0)];
    const project = stop ? getGuideProject(stop.projectSlug) : undefined;
    if (subdetail === 'why') return stop?.reason ?? 'This stop is unavailable.';
    return project
      ? formatGuideProjectOverview(project)
      : (tour?.answer ?? 'Tour stop unavailable.');
  }
  if (section === 'project' && id) {
    const project = getGuideProject(id);
    if (!project) return 'Project unavailable.';
    if (detail && detail in questionLabels) {
      return (
        getQuestionAnswer(project.content, detail as GuideQuestionId) ??
        'That detail is not documented for this project.'
      );
    }
    return formatGuideProjectOverview(project);
  }
  if (section === 'compare')
    return 'The selected projects are compared using the same evidence fields.';

  return 'Choose another prepared path to continue.';
}

function getDisplayedGuideResponse(container: HTMLElement | null) {
  if (!container) {
    return {};
  }

  const responseBodies = Array.from(
    container.querySelectorAll<HTMLElement>('.guide-step__content .guide-answer__body'),
  );
  const responseText = responseBodies
    .map((answer) => {
      const summary = answer.querySelector<HTMLElement>('[data-guide-response-summary]');
      return (summary ?? answer).innerText.trim();
    })
    .filter(Boolean)
    .join('\n\n');
  const responseLinks = responseBodies.flatMap((answer) =>
    Array.from(
      answer.querySelectorAll<HTMLAnchorElement>('[data-guide-response-links] a[href]'),
    ).map((link) => ({
      label: link.innerText.trim(),
      href: link.getAttribute('href') ?? '',
    })),
  );

  return {
    responseText: responseText || undefined,
    responseLinks: responseLinks.length > 0 ? responseLinks : undefined,
  };
}

export function GuidePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const pageKey = guideLocationPath(location.pathname, location.search);
  const navigationState = location.state as GuideNavigationState | null;
  const screenMeta = useMemo(() => getGuideScreenMeta(location.pathname), [location.pathname]);
  const panelRef = useRef<HTMLElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const startOverButtonRef = useRef<HTMLButtonElement>(null);
  const resetHeadingRef = useRef<HTMLHeadingElement>(null);
  const [promptTarget, setPromptTarget] = useState<HTMLDivElement | null>(null);
  const [isResetPending, setIsResetPending] = useState(false);
  const initialSessionRef = useRef<GuideSession | null>(null);

  if (!initialSessionRef.current) {
    initialSessionRef.current =
      readGuideSession() ??
      createGuideSession('/', 0, pageKey.startsWith('/guide') ? pageKey : '/guide');
  }

  const [session, setSession] = useState<GuideSession>(initialSessionRef.current);
  const sessionRef = useRef(session);
  const guideBackgroundPath = navigationState?.guideBackgroundPath ?? session.originPath;

  const commitSession = useCallback((nextSession: GuideSession) => {
    sessionRef.current = nextSession;
    writeGuideSession(nextSession);
    setSession(nextSession);
  }, []);

  useDocumentTitle(`${screenMeta.title} — Guided Portfolio`);

  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  useEffect(() => {
    if (!readGuideSession()) {
      writeGuideSession(sessionRef.current);
    }
  }, []);

  useEffect(() => {
    const currentSession = sessionRef.current;

    if (navigationState?.guideRunId && navigationState.guideRunId !== currentSession.runId) {
      navigate('/guide', {
        replace: true,
        state: {
          guideRunId: currentSession.runId,
          guideBackgroundPath,
        },
      });
      return;
    }

    if (currentSession.currentPath === pageKey && !currentSession.isClosed) {
      return;
    }

    const previousIndex = currentSession.trail.lastIndexOf(pageKey);
    const nextTrail =
      previousIndex >= 0
        ? currentSession.trail.slice(0, previousIndex + 1)
        : [...currentSession.trail, pageKey];

    commitSession({
      ...currentSession,
      currentPath: pageKey,
      trail: nextTrail,
      isClosed: false,
    });
  }, [commitSession, guideBackgroundPath, navigate, navigationState?.guideRunId, pageKey]);

  useEffect(() => {
    const currentSession = sessionRef.current;
    const existingView = currentSession.views[pageKey];
    const nextView: GuideViewState = {
      ...existingView,
      scrollY: existingView?.scrollY ?? 0,
      label: screenMeta.label,
      projectSlug: screenMeta.projectSlug,
      projectTitle: screenMeta.projectTitle,
      questionLabel: screenMeta.questionLabel,
    };

    if (
      existingView?.label === nextView.label &&
      existingView?.projectSlug === nextView.projectSlug &&
      existingView?.questionLabel === nextView.questionLabel
    ) {
      return;
    }

    commitSession({
      ...currentSession,
      views: { ...currentSession.views, [pageKey]: nextView },
    });
  }, [commitSession, pageKey, screenMeta]);

  useEffect(() => {
    if (isResetPending) {
      resetHeadingRef.current?.focus({ preventScroll: true });
      return;
    }

    const restoreSavedView =
      navigationType === 'POP' ||
      navigationState?.guideRestoreView ||
      navigationState?.guideResumed;

    window.requestAnimationFrame(() => {
      const currentSession = readGuideSession() ?? sessionRef.current;
      const savedView = currentSession.views[pageKey];
      const chatScroll = chatScrollRef.current;

      if (restoreSavedView && savedView) {
        if (chatScroll) chatScroll.scrollTop = savedView.scrollY;
        const savedTarget = savedView.focusKey
          ? findGuideFocusTarget(savedView.focusKey)
          : undefined;
        (savedTarget ?? headingRef.current)?.focus({ preventScroll: true });
        return;
      }

      const currentMessage = headingRef.current?.closest<HTMLElement>('.guide-current-message');
      if (chatScroll) chatScroll.scrollTop = Math.max(0, (currentMessage?.offsetTop ?? 0) - 20);
      headingRef.current?.focus({ preventScroll: true });
    });
  }, [isResetPending, location.key, navigationState, navigationType, pageKey]);

  const captureCurrentView = useCallback(() => {
    const currentSession = readGuideSession() ?? sessionRef.current;
    const existingView = currentSession.views[pageKey];
    const activeFocusKey = getActiveGuideFocusKey();
    const { responseText, responseLinks } = getDisplayedGuideResponse(chatScrollRef.current);
    const nextSession: GuideSession = {
      ...currentSession,
      currentPath: pageKey,
      views: {
        ...currentSession.views,
        [pageKey]: {
          ...existingView,
          scrollY: chatScrollRef.current?.scrollTop ?? 0,
          focusKey: activeFocusKey === 'utility-close' ? existingView?.focusKey : activeFocusKey,
          label: screenMeta.label,
          projectSlug: screenMeta.projectSlug,
          projectTitle: screenMeta.projectTitle,
          questionLabel: screenMeta.questionLabel,
          responseText: responseText ?? existingView?.responseText,
          responseLinks: responseLinks ?? existingView?.responseLinks,
        },
      },
    };

    commitSession(nextSession);
    return nextSession;
  }, [commitSession, pageKey, screenMeta]);

  const appendCurrentConversationTurn = useCallback(
    (capturedSession: GuideSession) => {
      const currentIndex = capturedSession.trail.lastIndexOf(pageKey);
      const activeTrail =
        currentIndex >= 0
          ? capturedSession.trail.slice(0, currentIndex + 1)
          : capturedSession.trail;
      const previousPath = activeTrail[activeTrail.length - 2];
      const prompt = previousPath
        ? getPromptLabel(capturedSession.views[previousPath]?.focusKey, pageKey)
        : screenMeta.title;
      const response = capturedSession.views[pageKey]?.responseText ?? getTranscriptAnswer(pageKey);

      return {
        ...capturedSession,
        conversation: [
          ...capturedSession.conversation,
          {
            path: pageKey,
            promptRole: previousPath ? ('user' as const) : ('assistant' as const),
            prompt,
            promptEyebrow: screenMeta.eyebrow,
            response,
            responseLinks: capturedSession.views[pageKey]?.responseLinks,
          },
        ],
      };
    },
    [pageKey, screenMeta],
  );

  const navigateGuide = useCallback(
    (targetPath: string) => {
      if (targetPath === pageKey) {
        return;
      }

      const capturedSession = appendCurrentConversationTurn(captureCurrentView());
      const nextSession: GuideSession = {
        ...capturedSession,
        currentPath: targetPath,
        trail: [...capturedSession.trail, targetPath],
        isClosed: false,
      };

      commitSession(nextSession);
      navigate(targetPath, {
        state: { guideRunId: nextSession.runId, guideBackgroundPath },
      });
    },
    [
      appendCurrentConversationTurn,
      captureCurrentView,
      commitSession,
      guideBackgroundPath,
      navigate,
      pageKey,
    ],
  );

  const goBack = () => {
    const capturedView = captureCurrentView();

    if (capturedView.trail.length <= 1) {
      return;
    }

    const capturedSession = appendCurrentConversationTurn(capturedView);

    const nextTrail = capturedSession.trail.slice(0, -1);
    const targetPath = nextTrail[nextTrail.length - 1];
    const nextSession = {
      ...capturedSession,
      currentPath: targetPath,
      trail: nextTrail,
    };

    commitSession(nextSession);
    navigate(targetPath, {
      replace: true,
      state: {
        guideRunId: nextSession.runId,
        guideRestoreView: true,
        guideBackgroundPath,
      },
    });
  };

  const closeGuide = useCallback(() => {
    const capturedSession = captureCurrentView();
    const nextSession = { ...capturedSession, isClosed: true };
    commitSession(nextSession);
    navigate(guideBackgroundPath || nextSession.originPath || '/', {
      state: { guideClosed: true },
    });
  }, [captureCurrentView, commitSession, guideBackgroundPath, navigate]);

  useEffect(() => {
    document.body.classList.add('guide-panel-open');

    const handlePanelKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeGuide();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute('hidden'));

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handlePanelKeyboard);

    return () => {
      document.body.classList.remove('guide-panel-open');
      document.removeEventListener('keydown', handlePanelKeyboard);
    };
  }, [closeGuide]);

  const confirmStartOver = () => {
    const currentSession = sessionRef.current;
    const nextSession = createGuideSession(
      currentSession.originPath,
      currentSession.originScrollY,
      '/guide',
    );

    commitSession(nextSession);
    setIsResetPending(false);
    navigate('/guide', {
      replace: true,
      state: { guideRunId: nextSession.runId, guideBackgroundPath },
    });
  };

  const cancelStartOver = () => {
    setIsResetPending(false);
    window.requestAnimationFrame(() => startOverButtonRef.current?.focus());
  };

  const preparePortfolioHandoff = () => {
    const capturedSession = captureCurrentView();
    commitSession({ ...capturedSession, isClosed: false });
    return capturedSession;
  };

  const openPortfolioPath = (targetPath: string) => {
    const capturedSession = preparePortfolioHandoff();
    navigate(targetPath, {
      state: {
        fromGuide: true,
        guideRunId: capturedSession.runId,
        guideReturnPath: pageKey,
      },
    });
  };

  const getProjectHandoffState = (): GuideNavigationState => {
    return {
      fromGuide: true,
      guideRunId: session.runId,
      guideReturnPath: pageKey,
    };
  };

  const skipToGuideContent = () => {
    const target = isResetPending ? resetHeadingRef.current : headingRef.current;

    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ behavior: 'auto', block: 'start' });
  };

  const renderProjectGrid = (projects: GuideProject[], allResultsPath?: string) => {
    const visibleProjects = allResultsPath
      ? projects.slice(0, GUIDE_INITIAL_PROJECT_LIMIT)
      : projects;

    return (
      <>
        <div className="guide-project-grid">
          {visibleProjects.map((guideProject) => (
            <GuideProjectCard
              key={guideProject.project.slug}
              guideProject={guideProject}
              handoffState={getProjectHandoffState()}
              onOpenSummary={() => navigateGuide(`/guide/project/${guideProject.project.slug}`)}
              onPrepareHandoff={preparePortfolioHandoff}
            />
          ))}
        </div>
        {allResultsPath && projects.length > GUIDE_INITIAL_PROJECT_LIMIT ? (
          <button
            className="guide-show-all"
            type="button"
            data-guide-focus="show-all-projects"
            onClick={() => navigateGuide(allResultsPath)}
          >
            Show all {projects.length} projects
            <ArrowRightIcon />
          </button>
        ) : null}
      </>
    );
  };

  const renderHome = () => (
    <>
      <PreparedAnswer>
        <p>
          Choose a short path through the work. Every answer can lead to the complete case study.
        </p>
      </PreparedAnswer>
      <GuideChoiceGrid>
        <GuideChoice
          label="Give me a 3-minute tour"
          description="Three or four short project stops."
          onClick={() => navigateGuide('/guide/tours')}
        />
        <GuideChoice
          label="Browse project categories"
          description="Digital, industrial, and brand work."
          onClick={() => navigateGuide('/guide/projects')}
        />
        <GuideChoice
          label="Find work by capability"
          description="Start with the evidence you want to see."
          onClick={() => navigateGuide('/guide/capabilities')}
        />
        <GuideChoice
          label="Tell me about Shubham"
          description="Practice, domains, AI, and senior UX fit."
          onClick={() => navigateGuide('/guide/about')}
        />
        <GuideChoice label="Browse the portfolio normally" quiet onClick={closeGuide} />
      </GuideChoiceGrid>
    </>
  );

  const renderTours = () => (
    <>
      <PreparedAnswer>
        <p>Choose a focus. Each tour contains three or four short project stops.</p>
      </PreparedAnswer>
      <GuideChoiceGrid>
        {guideTours.map((tour) => (
          <GuideChoice
            key={tour.id}
            label={tour.prompt}
            description={tour.answer}
            onClick={() => navigateGuide(`/guide/tour/${tour.id}/0`)}
          />
        ))}
      </GuideChoiceGrid>
    </>
  );

  const renderTour = (tourId: string, detail?: string, subdetail?: string) => {
    const tour = getGuideTour(tourId as GuideTourId);

    if (!tour) {
      return null;
    }

    if (detail === 'complete') {
      return (
        <>
          <PreparedAnswer>
            <p>Open one project in full, compare two, or choose another path.</p>
          </PreparedAnswer>
          <GuideChoiceGrid>
            <GuideChoice label="Open a project" onClick={() => navigateGuide('/guide/projects')} />
            <GuideChoice label="Compare two" onClick={() => navigateGuide('/guide/compare')} />
            <GuideChoice
              label="Choose another tour"
              onClick={() => navigateGuide('/guide/tours')}
            />
            <GuideChoice label="Guide Home" quiet onClick={() => navigateGuide('/guide')} />
          </GuideChoiceGrid>
        </>
      );
    }

    const stepIndex = Number(detail ?? 0);
    const stop = Number.isInteger(stepIndex) ? tour.stops[stepIndex] : undefined;
    const guideProject = stop ? getGuideProject(stop.projectSlug) : undefined;

    if (!stop || !guideProject) {
      return null;
    }

    const isWhy = subdetail === 'why';
    const isLast = stepIndex === tour.stops.length - 1;

    return (
      <>
        <PreparedAnswer className="guide-answer--tour-project">
          <GuideTourProjectMessage
            guideProject={guideProject}
            message={isWhy ? stop.reason : guideProject.content.overview}
            tourPrompt={tour.prompt}
            stepIndex={stepIndex}
            stopCount={tour.stops.length}
            handoffState={getProjectHandoffState()}
            focusKey={`tour-image-${tour.id}-${stepIndex}`}
            onProjectOpen={preparePortfolioHandoff}
            showProjectImage={!isWhy}
            eager
          />
        </PreparedAnswer>
        <GuideChoiceGrid>
          {isWhy ? (
            <GuideChoice
              label="Back to project"
              onClick={() => navigateGuide(`/guide/tour/${tour.id}/${stepIndex}`)}
            />
          ) : (
            <GuideChoice
              label="Why this project?"
              onClick={() => navigateGuide(`/guide/tour/${tour.id}/${stepIndex}/why`)}
            />
          )}
          {stepIndex > 0 ? (
            <GuideChoice
              label="Previous project"
              onClick={() => navigateGuide(`/guide/tour/${tour.id}/${stepIndex - 1}`)}
            />
          ) : null}
          <GuideChoice
            label={isLast ? 'Finish tour' : 'Next project'}
            onClick={() =>
              navigateGuide(
                isLast
                  ? `/guide/tour/${tour.id}/complete`
                  : `/guide/tour/${tour.id}/${stepIndex + 1}`,
              )
            }
          />
          <GuideLinkChoice
            label="Open full project"
            to={`/project/${stop.projectSlug}`}
            state={getProjectHandoffState()}
            focusKey={`tour-full-${tour.id}-${stepIndex}`}
            onClick={preparePortfolioHandoff}
          />
          <GuideChoice
            label="Leave this tour"
            quiet
            onClick={() => navigateGuide('/guide/tours')}
          />
        </GuideChoiceGrid>
      </>
    );
  };

  const renderProjectsMenu = () => (
    <>
      <PreparedAnswer>
        <p>Browse 14 projects by category, delivery stage, case-study depth, or comparison.</p>
      </PreparedAnswer>
      <GuideChoiceGrid>
        <GuideChoice label="Choose a category" onClick={() => navigateGuide('/guide/categories')} />
        <GuideChoice
          label="Choose a delivery stage"
          onClick={() => navigateGuide('/guide/stages')}
        />
        <GuideChoice
          label="Show featured case studies"
          onClick={() => navigateGuide('/guide/featured')}
        />
        <GuideChoice label="Compare two projects" onClick={() => navigateGuide('/guide/compare')} />
      </GuideChoiceGrid>
    </>
  );

  const renderCategories = () => (
    <>
      <PreparedAnswer>
        <p>Choose one of the portfolio's three project categories.</p>
      </PreparedAnswer>
      <GuideChoiceGrid>
        {guideCategories.map((category) => (
          <GuideChoice
            key={category.id}
            label={category.prompt}
            description={category.answer}
            onClick={() => navigateGuide(`/guide/category/${category.id}`)}
          />
        ))}
      </GuideChoiceGrid>
    </>
  );

  const renderCategory = (categoryId: string) => {
    const category = guideCategories.find((item) => item.id === categoryId);

    if (!category) {
      return null;
    }

    const projects = getGuideProjectsByCategory(category.id);
    const showAll = new URLSearchParams(location.search).get('all') === '1';

    return (
      <>
        <PreparedAnswer>
          <p>{category.answer}</p>
        </PreparedAnswer>
        {renderProjectGrid(projects, showAll ? undefined : `${location.pathname}?all=1`)}
        <GuideChoiceGrid>
          <GuideChoice
            label="Choose another category"
            quiet
            onClick={() => navigateGuide('/guide/categories')}
          />
          <GuideChoice
            label="Browse this category normally"
            quiet
            onClick={() => openPortfolioPath(`/work/${category.id}`)}
          />
        </GuideChoiceGrid>
      </>
    );
  };

  const renderStages = () => (
    <>
      <PreparedAnswer>
        <p>Choose the kind of project maturity you want to see.</p>
      </PreparedAnswer>
      <GuideChoiceGrid>
        {guideDeliveryStages.map((stage) => (
          <GuideChoice
            key={stage.id}
            label={stage.prompt}
            description={stage.answer}
            onClick={() => navigateGuide(`/guide/stage/${stage.id}`)}
          />
        ))}
      </GuideChoiceGrid>
    </>
  );

  const renderStage = (stageId: string) => {
    const stage = getGuideDeliveryStage(stageId as GuideDeliveryStageId);

    if (!stage) {
      return null;
    }

    const projects = getGuideDeliveryStageProjects(stage.id);
    const showAll = new URLSearchParams(location.search).get('all') === '1';

    return (
      <>
        <PreparedAnswer>
          <p>{stage.answer} Exact public status remains visible on every result.</p>
        </PreparedAnswer>
        {renderProjectGrid(projects, showAll ? undefined : `${location.pathname}?all=1`)}
        <GuideChoiceGrid>
          <GuideChoice
            label="Choose another stage"
            quiet
            onClick={() => navigateGuide('/guide/stages')}
          />
        </GuideChoiceGrid>
      </>
    );
  };

  const renderFeatured = () => {
    const showAll = new URLSearchParams(location.search).get('all') === '1';
    const projects = getGuideProjects(
      showAll
        ? guideFeaturedProjects.expandedProjectSlugs
        : guideFeaturedProjects.initialProjectSlugs,
    );

    return (
      <>
        <PreparedAnswer>
          <p>{guideFeaturedProjects.answer}</p>
        </PreparedAnswer>
        {renderProjectGrid(projects)}
        <GuideChoiceGrid>
          {!showAll ? (
            <GuideChoice
              label="Show all featured case studies"
              onClick={() => navigateGuide('/guide/featured?all=1')}
            />
          ) : null}
          <GuideChoice
            label="Choose a category"
            onClick={() => navigateGuide('/guide/categories')}
          />
          <GuideChoice label="Compare two" onClick={() => navigateGuide('/guide/compare')} />
        </GuideChoiceGrid>
      </>
    );
  };

  const renderCapabilities = () => {
    const showMore = new URLSearchParams(location.search).get('more') === '1';
    const visibleCapabilities = showMore ? guideCapabilities : guideCapabilities.slice(0, 4);

    return (
      <>
        <PreparedAnswer>
          <p>Choose what you want evidence of. The guide will show relevant published projects.</p>
        </PreparedAnswer>
        <GuideChoiceGrid>
          {visibleCapabilities.map((capability) => (
            <GuideChoice
              key={capability.id}
              label={capability.prompt}
              description={capability.answer}
              onClick={() => navigateGuide(`/guide/capability/${capability.id}`)}
            />
          ))}
          {!showMore ? (
            <GuideChoice
              label="More capabilities"
              quiet
              onClick={() => navigateGuide('/guide/capabilities?more=1')}
            />
          ) : null}
        </GuideChoiceGrid>
      </>
    );
  };

  const renderCapability = (capabilityId: string) => {
    const capability = getGuideCapability(capabilityId as GuideCapabilityId);

    if (!capability) {
      return null;
    }

    const params = new URLSearchParams(location.search);
    const showAll = params.get('all') === '1';
    const deliveredOnly = params.get('delivered') === '1';
    const deliveredSlugs = new Set(
      getGuideDeliveryStageProjects('delivered-or-realized').map(({ project }) => project.slug),
    );
    const matchingProjects = getGuideCapabilityProjects(capability.id).filter(
      ({ project }) => !deliveredOnly || deliveredSlugs.has(project.slug),
    );
    const allPath = `${location.pathname}?${deliveredOnly ? 'delivered=1&' : ''}all=1`;

    return (
      <>
        <PreparedAnswer>
          <p>
            {capability.answer}
            {deliveredOnly ? ' Only delivered or realized work is shown.' : ''}
          </p>
        </PreparedAnswer>
        {matchingProjects.length ? (
          renderProjectGrid(matchingProjects, showAll ? undefined : allPath)
        ) : (
          <div className="guide-empty-state">
            <strong>No published project matches both choices.</strong>
            <p>Remove the delivery filter or choose another capability.</p>
          </div>
        )}
        <GuideChoiceGrid>
          {capability.id !== 'evidence-changed-a-decision' ? (
            <GuideChoice
              label="Show evidence-to-decision cases"
              onClick={() => navigateGuide('/guide/capability/evidence-changed-a-decision')}
            />
          ) : null}
          {!deliveredOnly ? (
            <GuideChoice
              label="Only show delivered work"
              onClick={() => navigateGuide(`${location.pathname}?delivered=1`)}
            />
          ) : (
            <GuideChoice
              label="Show every maturity"
              onClick={() => navigateGuide(location.pathname)}
            />
          )}
          <GuideChoice
            label="Compare two examples"
            onClick={() => navigateGuide(`/guide/compare?capability=${capability.id}`)}
          />
          <GuideChoice
            label="Choose another capability"
            quiet
            onClick={() => navigateGuide('/guide/capabilities')}
          />
        </GuideChoiceGrid>
      </>
    );
  };

  const renderAboutMenu = () => (
    <>
      <PreparedAnswer>
        <p>{guideAboutIntroduction}</p>
      </PreparedAnswer>
      <GuideChoiceGrid>
        {guideAboutAnswers.map((answer) => (
          <GuideChoice
            key={answer.id}
            label={answer.prompt}
            onClick={() => navigateGuide(`/guide/about/${answer.id}`)}
          />
        ))}
      </GuideChoiceGrid>
    </>
  );

  const renderAboutAnswer = (answerId: string) => {
    const answer = getGuideAboutAnswer(answerId as GuideAboutAnswerId);

    if (!answer) {
      return null;
    }

    const choices: Record<GuideAboutAnswerId, ReactNode> = {
      'working-approach': (
        <>
          <GuideChoice
            label="See projects that show this"
            onClick={() => navigateGuide('/guide/tour/senior-ux-highlights/0')}
          />
          <GuideChoice label="Open About" onClick={() => openPortfolioPath('/about')} />
          <GuideChoice
            label="Another question"
            quiet
            onClick={() => navigateGuide('/guide/about')}
          />
        </>
      ),
      domains: (
        <>
          <GuideChoice
            label="Healthcare work"
            onClick={() => navigateGuide('/guide/tour/healthcare-and-enterprise/0')}
          />
          <GuideChoice
            label="Physical product work"
            onClick={() =>
              navigateGuide('/guide/capability/physical-prototyping-and-human-factors')
            }
          />
          <GuideChoice
            label="Brand and retail work"
            onClick={() => navigateGuide('/guide/capability/brand-visual-and-retail-experience')}
          />
          <GuideChoice label="Open About" quiet onClick={() => openPortfolioPath('/about')} />
        </>
      ),
      'ai-use': (
        <>
          <GuideChoice label="Open About" onClick={() => openPortfolioPath('/about')} />
          <GuideChoice
            label="See digital work"
            onClick={() => navigateGuide('/guide/category/digital-experience')}
          />
          <GuideChoice
            label="Another question"
            quiet
            onClick={() => navigateGuide('/guide/about')}
          />
        </>
      ),
      'senior-ux-fit': (
        <>
          <GuideChoice
            label="See Senior UX highlights"
            onClick={() => navigateGuide('/guide/tour/senior-ux-highlights/0')}
          />
          <GuideChoice label="Open About" onClick={() => openPortfolioPath('/about')} />
          <GuideChoice label="Contact Shubham" onClick={() => openPortfolioPath('/contact')} />
        </>
      ),
      contact: (
        <>
          <GuideChoice label="Open Contact" onClick={() => openPortfolioPath('/contact')} />
          <GuideChoice label="Open About" onClick={() => openPortfolioPath('/about')} />
          <GuideChoice label="Keep exploring" quiet onClick={() => navigateGuide('/guide')} />
        </>
      ),
    };

    return (
      <>
        <PreparedAnswer>
          {answer.id === 'contact' ? (
            <>
              <p data-guide-response-summary>Reach Shubham directly:</p>
              <GuideResponseLinks links={guideContactLinks} />
            </>
          ) : (
            <p>{answer.answer}</p>
          )}
        </PreparedAnswer>
        <GuideChoiceGrid>{choices[answer.id]}</GuideChoiceGrid>
      </>
    );
  };

  const renderProjectSummary = (slug: string) => {
    const guideProject = getGuideProject(slug);

    if (!guideProject) {
      return null;
    }

    const { content, project } = guideProject;

    return (
      <>
        <PreparedAnswer>
          <p>{formatGuideProjectOverview(guideProject)}</p>
        </PreparedAnswer>
        <article className="guide-project-feature">
          <figure>
            <img src={project.thumbnail} alt={project.thumbnailAlt} />
          </figure>
          <div>
            <span className="guide-status">{project.status}</span>
            <p>{project.proofLine}</p>
          </div>
        </article>
        <GuideChoiceGrid>
          <GuideChoice
            label={questionLabels.problem}
            onClick={() => navigateGuide(`/guide/project/${slug}/problem`)}
          />
          <GuideChoice
            label={questionLabels.contribution}
            onClick={() => navigateGuide(`/guide/project/${slug}/contribution`)}
          />
          {hasGuideProjectEvidence(content) ? (
            <GuideChoice
              label={questionLabels.evidence}
              onClick={() => navigateGuide(`/guide/project/${slug}/evidence`)}
            />
          ) : null}
          <GuideChoice
            label={questionLabels.outcome}
            onClick={() => navigateGuide(`/guide/project/${slug}/outcome`)}
          />
          <GuideLinkChoice
            label="Open full project"
            to={`/project/${content.slug}`}
            state={getProjectHandoffState()}
            focusKey={`full-${content.slug}`}
            onClick={preparePortfolioHandoff}
          />
          <GuideChoice
            label="See other projects in this category"
            quiet
            onClick={() => navigateGuide(`/guide/category/${project.category}`)}
          />
          <GuideChoice
            label="Compare with another project"
            quiet
            onClick={() => navigateGuide(`/guide/compare?first=${content.slug}`)}
          />
        </GuideChoiceGrid>
      </>
    );
  };

  const renderProjectQuestion = (slug: string, questionId: string) => {
    const guideProject = getGuideProject(slug);
    const isQuestion = questionId in questionLabels;

    if (!guideProject || !isQuestion) {
      return null;
    }

    const typedQuestionId = questionId as GuideQuestionId;
    const answer = getQuestionAnswer(guideProject.content, typedQuestionId);

    if (!answer) {
      return (
        <>
          <PreparedAnswer>
            <p>That detail is not documented publicly.</p>
          </PreparedAnswer>
          <GuideChoiceGrid>
            <GuideLinkChoice
              label="Open full project"
              to={`/project/${guideProject.content.slug}`}
              state={getProjectHandoffState()}
              focusKey={`full-${guideProject.content.slug}-${typedQuestionId}`}
              onClick={preparePortfolioHandoff}
            />
            <GuideChoice
              label="Ask another question"
              onClick={() => navigateGuide(`/guide/project/${slug}`)}
            />
          </GuideChoiceGrid>
        </>
      );
    }

    const sourceAnchor = getQuestionSourceAnchor(guideProject.content, typedQuestionId);

    return (
      <>
        <PreparedAnswer>
          <p>{answer}</p>
        </PreparedAnswer>
        <div className="guide-source-note">
          <span>Source</span>
          <strong>{guideProject.project.title}</strong>
          <Link
            className="guide-source-link"
            to={`/project/${guideProject.content.slug}${sourceAnchor}`}
            state={getProjectHandoffState()}
            data-guide-focus={`source-${guideProject.content.slug}-${typedQuestionId}`}
            onClick={preparePortfolioHandoff}
          >
            Read the supporting section
            <ArrowRightIcon />
          </Link>
        </div>
        <GuideChoiceGrid>
          <GuideChoice
            label="Back to project summary"
            onClick={() => navigateGuide(`/guide/project/${slug}`)}
          />
          <GuideLinkChoice
            label="Open full project"
            to={`/project/${guideProject.content.slug}`}
            state={getProjectHandoffState()}
            focusKey={`full-${guideProject.content.slug}-${typedQuestionId}`}
            onClick={preparePortfolioHandoff}
          />
          <GuideChoice
            label="Compare with another project"
            quiet
            onClick={() => navigateGuide(`/guide/compare?first=${guideProject.content.slug}`)}
          />
        </GuideChoiceGrid>
      </>
    );
  };

  const renderCompare = () => {
    const params = new URLSearchParams(location.search);
    const firstSlug = params.get('first') ?? '';
    const secondSlug = params.get('second') ?? '';
    const capabilityId = params.get('capability') ?? '';
    const capability = getGuideCapability(capabilityId as GuideCapabilityId);
    const candidates = capability
      ? getGuideCapabilityProjects(capability.id)
      : getGuideProjects(
          guideCategories.flatMap((category) =>
            getGuideProjectsByCategory(category.id).map(({ content }) => content.slug),
          ),
        );
    const firstProject = isGuideProjectSlug(firstSlug) ? getGuideProject(firstSlug) : undefined;
    const secondProject = isGuideProjectSlug(secondSlug) ? getGuideProject(secondSlug) : undefined;
    const baseParams = capability ? `capability=${capability.id}&` : '';

    if (!firstProject) {
      return (
        <>
          <PreparedAnswer>
            <p>
              Choose two projects. The guide will compare status, problem, contribution, evidence,
              and outcome.
            </p>
          </PreparedAnswer>
          <div className="guide-selector-list" aria-label="Choose the first project">
            {candidates.map(({ project }) => (
              <button
                key={project.slug}
                type="button"
                data-guide-focus={`compare-first-${project.slug}`}
                onClick={() => navigateGuide(`/guide/compare?${baseParams}first=${project.slug}`)}
              >
                <span>{project.status}</span>
                <strong>{project.title}</strong>
              </button>
            ))}
          </div>
        </>
      );
    }

    if (!secondProject) {
      return (
        <>
          <PreparedAnswer>
            <p>Now choose a second project.</p>
          </PreparedAnswer>
          <div className="guide-selected-project">
            <span>First project</span>
            <strong>{firstProject.project.title}</strong>
          </div>
          <div className="guide-selector-list" aria-label="Choose the second project">
            {candidates
              .filter(({ project }) => project.slug !== firstProject.project.slug)
              .map(({ project }) => (
                <button
                  key={project.slug}
                  type="button"
                  data-guide-focus={`compare-second-${project.slug}`}
                  onClick={() =>
                    navigateGuide(
                      `/guide/compare?${baseParams}first=${firstProject.content.slug}&second=${project.slug}`,
                    )
                  }
                >
                  <span>{project.status}</span>
                  <strong>{project.title}</strong>
                </button>
              ))}
          </div>
        </>
      );
    }

    return (
      <>
        <PreparedAnswer>
          <p>
            {firstProject.project.title} and {secondProject.project.title}, side by side.
          </p>
        </PreparedAnswer>
        <div className="guide-comparison">
          {[firstProject, secondProject].map(({ content, project }) => (
            <article key={project.slug}>
              <span className="guide-status">{project.status}</span>
              <h2>{project.title}</h2>
              <dl>
                <div>
                  <dt>Problem</dt>
                  <dd>{content.problem}</dd>
                </div>
                <div>
                  <dt>Contribution</dt>
                  <dd>{content.contribution}</dd>
                </div>
                {content.evidenceToDecision ? (
                  <div>
                    <dt>Evidence → decision</dt>
                    <dd>{content.evidenceToDecision}</dd>
                  </div>
                ) : null}
                <div>
                  <dt>Outcome</dt>
                  <dd>{content.outcome}</dd>
                </div>
              </dl>
              <Link
                className="guide-comparison__project-link"
                aria-label={`Open full project: ${project.title}`}
                to={`/project/${content.slug}`}
                state={getProjectHandoffState()}
                data-guide-focus={`compare-full-${content.slug}`}
                onClick={preparePortfolioHandoff}
              >
                Open full project
                <ArrowRightIcon />
              </Link>
            </article>
          ))}
        </div>
        <GuideChoiceGrid>
          <GuideChoice
            label="Change comparison"
            onClick={() =>
              navigateGuide(`/guide/compare${capability ? `?capability=${capability.id}` : ''}`)
            }
          />
          <GuideChoice label="Guide Home" quiet onClick={() => navigateGuide('/guide')} />
        </GuideChoiceGrid>
      </>
    );
  };

  const renderAboutGuide = () => (
    <>
      <PreparedAnswer>
        <p>
          Every answer was written in advance from Shubham's published portfolio. Nothing is
          generated, and your choices are not sent to an AI service.
        </p>
      </PreparedAnswer>
      <GuideChoiceGrid>
        <GuideChoice
          label="Continue"
          onClick={canGoBack ? goBack : () => navigateGuide('/guide')}
        />
        <GuideChoice label="Guide Home" onClick={() => navigateGuide('/guide')} />
        <GuideChoice label="Close guide" quiet onClick={closeGuide} />
      </GuideChoiceGrid>
    </>
  );

  const renderFallback = () => (
    <>
      <PreparedAnswer>
        <p>This path could not be restored. Your previous valid steps are still available.</p>
      </PreparedAnswer>
      <GuideChoiceGrid>
        <GuideChoice label="Back" onClick={goBack} />
        <GuideChoice label="Guide Home" onClick={() => navigateGuide('/guide')} />
        <GuideChoice label="Browse normally" quiet onClick={closeGuide} />
      </GuideChoiceGrid>
    </>
  );

  const activeTrail = useMemo(() => {
    const currentIndex = session.trail.lastIndexOf(pageKey);
    return currentIndex >= 0 ? session.trail.slice(0, currentIndex + 1) : session.trail;
  }, [pageKey, session.trail]);
  const transcriptEntries = session.conversation;
  const renderTranscriptAnswer = (entry: GuideConversationTurn, index: number) => {
    const tourProjectMessage = getTourProjectMessage(entry.path);

    return (
      <>
        {tourProjectMessage ? (
          <GuideTourProjectMessage
            {...tourProjectMessage}
            handoffState={getProjectHandoffState()}
            focusKey={`tour-image-history-${index}-${tourProjectMessage.guideProject.content.slug}`}
            onProjectOpen={preparePortfolioHandoff}
          />
        ) : (
          <p>{entry.response}</p>
        )}
        {entry.responseLinks ? <GuideResponseLinks links={entry.responseLinks} /> : null}
      </>
    );
  };
  const currentPrompt =
    activeTrail.length > 1
      ? getPromptLabel(session.views[activeTrail[activeTrail.length - 2]]?.focusKey, pageKey)
      : undefined;

  const renderScreen = () => {
    const [section, id, detail, subdetail] = splitGuidePath(location.pathname);

    if (!section) return renderHome();
    if (section === 'tours') return renderTours();
    if (section === 'tour' && id) return renderTour(id, detail, subdetail) ?? renderFallback();
    if (section === 'projects') return renderProjectsMenu();
    if (section === 'categories') return renderCategories();
    if (section === 'category' && id) return renderCategory(id) ?? renderFallback();
    if (section === 'stages') return renderStages();
    if (section === 'stage' && id) return renderStage(id) ?? renderFallback();
    if (section === 'featured') return renderFeatured();
    if (section === 'capabilities') return renderCapabilities();
    if (section === 'capability' && id) return renderCapability(id) ?? renderFallback();
    if (section === 'about-guide') return renderAboutGuide();
    if (section === 'about' && !id) return renderAboutMenu();
    if (section === 'about' && id) return renderAboutAnswer(id) ?? renderFallback();
    if (section === 'project' && id && detail)
      return renderProjectQuestion(id, detail) ?? renderFallback();
    if (section === 'project' && id) return renderProjectSummary(id) ?? renderFallback();
    if (section === 'compare') return renderCompare();
    return renderFallback();
  };

  const canGoBack = session.trail.length > 1;

  return (
    <div className="guide-overlay">
      <div className="guide-overlay__backdrop" aria-hidden="true" onMouseDown={closeGuide} />
      <aside
        ref={panelRef}
        className="guided-portfolio guide-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-panel-title"
        aria-describedby="guide-disclosure"
      >
        <a
          className="skip-link"
          href="#guide-step"
          onClick={(event) => {
            event.preventDefault();
            skipToGuideContent();
          }}
        >
          Skip to conversation
        </a>
        <header className="guide-header">
          <div className="guide-brand" aria-label="Guided portfolio">
            <img
              className="guide-brand__sticker"
              src={tourBossSticker}
              alt=""
              aria-hidden="true"
              draggable="false"
            />
            <div>
              <strong id="guide-panel-title">Portfolio guide</strong>
              <small>Scripted conversation</small>
            </div>
          </div>
          <nav className="guide-utilities" aria-label="Conversation controls">
            <button
              className="guide-start-over-button"
              ref={startOverButtonRef}
              type="button"
              data-guide-focus="utility-start-over"
              onClick={() => setIsResetPending(true)}
            >
              <RefreshIcon />
              Start over
            </button>
            <button
              className="guide-close-button"
              type="button"
              aria-label="Close guide"
              data-guide-focus="utility-close"
              onClick={closeGuide}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </nav>
          <p className="guide-location" aria-label="Current conversation topic">
            <span>{screenMeta.eyebrow}</span>
            <strong>{screenMeta.label}</strong>
          </p>
        </header>

        <GuidePromptTargetContext.Provider value={promptTarget}>
          <div ref={chatScrollRef} className="guide-chat-scroll">
            <section id="guide-step" className="guide-step" aria-labelledby="guide-step-title">
              {transcriptEntries.length > 0 ? (
                <ol className="guide-transcript" aria-label="Earlier conversation">
                  {transcriptEntries.map((entry, index) => (
                    <li key={`${entry.path}-${index}`}>
                      <div
                        className={`guide-message guide-message--${entry.promptRole === 'user' ? 'user' : 'assistant'}`}
                      >
                        {entry.promptRole === 'assistant' ? <GuideResponseAvatar /> : null}
                        <span className="guide-message__speaker">
                          {entry.promptRole === 'user' ? 'You' : 'Guide'}
                        </span>
                        {entry.promptEyebrow ? (
                          <p className="eyebrow">{entry.promptEyebrow}</p>
                        ) : null}
                        <p>{entry.prompt}</p>
                      </div>
                      <div className="guide-message guide-message--assistant">
                        <GuideResponseAvatar />
                        <span className="guide-message__speaker">Guide</span>
                        {renderTranscriptAnswer(entry, index)}
                      </div>
                    </li>
                  ))}
                </ol>
              ) : null}

              {isResetPending ? (
                <div className="guide-reset">
                  <div className="guide-current-message guide-message guide-message--assistant">
                    <GuideResponseAvatar />
                    <span className="guide-message__speaker">Guide</span>
                    <h1 ref={resetHeadingRef} id="guide-step-title" tabIndex={-1}>
                      Start this conversation again?
                    </h1>
                  </div>
                  <PreparedAnswer>
                    <p>Your current path will be cleared in this tab.</p>
                  </PreparedAnswer>
                  <GuideChoiceGrid>
                    <GuideChoice label="Start again" onClick={confirmStartOver} />
                    <GuideChoice label="Keep exploring" quiet onClick={cancelStartOver} />
                  </GuideChoiceGrid>
                </div>
              ) : (
                <>
                  <div
                    className={`guide-current-message guide-message guide-message--${currentPrompt ? 'user' : 'assistant'}`}
                  >
                    {!currentPrompt ? <GuideResponseAvatar /> : null}
                    <span className="guide-message__speaker">
                      {currentPrompt ? 'You' : 'Guide'}
                    </span>
                    <p className="eyebrow">{screenMeta.eyebrow}</p>
                    <h1 ref={headingRef} id="guide-step-title" tabIndex={-1}>
                      {currentPrompt ?? screenMeta.title}
                    </h1>
                  </div>
                  <div className="guide-step__content">{renderScreen()}</div>
                </>
              )}
            </section>
          </div>

          <div className="guide-prompt-composer" role="group" aria-label="Suggested replies">
            <div ref={setPromptTarget} className="guide-prompt-target">
              {canGoBack ? (
                <GuideChoice label="Back" focusKey="utility-back" quiet onClick={goBack} />
              ) : null}
            </div>
            <footer className="guide-footer">
              <p id="guide-disclosure">
                Prepared answers—<strong>not live AI.</strong>
              </p>
              <div>
                <button
                  type="button"
                  data-guide-focus="about-this-guide"
                  onClick={() => navigateGuide('/guide/about-guide')}
                >
                  About
                </button>
              </div>
            </footer>
          </div>
        </GuidePromptTargetContext.Provider>
      </aside>
    </div>
  );
}
