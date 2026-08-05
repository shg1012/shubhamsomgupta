export const GUIDE_CONTENT_VERSION = '2026-08-04-v2';
export const GUIDE_SESSION_KEY = 'portfolio-guide-session';
export const GUIDE_SESSION_EVENT = 'portfolio-guide-session-change';

export interface GuideResponseLink {
  label: string;
  href: string;
}

export interface GuideConversationTurn {
  path: string;
  promptRole: 'assistant' | 'user';
  prompt: string;
  promptEyebrow?: string;
  response: string;
  responseLinks?: GuideResponseLink[];
}

export interface GuideViewState {
  scrollY: number;
  focusKey?: string;
  label?: string;
  projectSlug?: string;
  projectTitle?: string;
  questionLabel?: string;
  responseText?: string;
  responseLinks?: GuideResponseLink[];
}

export interface GuideSession {
  contentVersion: string;
  runId: string;
  originPath: string;
  originScrollY: number;
  currentPath: string;
  trail: string[];
  conversation: GuideConversationTurn[];
  views: Record<string, GuideViewState>;
  isClosed: boolean;
}

let memorySession: GuideSession | null = null;

const createRunId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;

const isGuideResponseLink = (value: unknown): value is GuideResponseLink => {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<GuideResponseLink>;
  return (
    typeof candidate.label === 'string' &&
    typeof candidate.href === 'string' &&
    /^(https?:|mailto:|tel:)/.test(candidate.href)
  );
};

const isGuideSession = (value: unknown): value is GuideSession => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<GuideSession>;

  return (
    candidate.contentVersion === GUIDE_CONTENT_VERSION &&
    typeof candidate.runId === 'string' &&
    typeof candidate.originPath === 'string' &&
    typeof candidate.originScrollY === 'number' &&
    typeof candidate.currentPath === 'string' &&
    candidate.currentPath.startsWith('/guide') &&
    Array.isArray(candidate.trail) &&
    candidate.trail.every((path) => typeof path === 'string' && path.startsWith('/guide')) &&
    Array.isArray(candidate.conversation) &&
    candidate.conversation.every((turn) => {
      if (!turn || typeof turn !== 'object') return false;
      const candidateTurn = turn as Partial<GuideConversationTurn>;
      return (
        typeof candidateTurn.path === 'string' &&
        candidateTurn.path.startsWith('/guide') &&
        (candidateTurn.promptRole === 'assistant' || candidateTurn.promptRole === 'user') &&
        typeof candidateTurn.prompt === 'string' &&
        typeof candidateTurn.response === 'string' &&
        (candidateTurn.promptEyebrow === undefined ||
          typeof candidateTurn.promptEyebrow === 'string') &&
        (candidateTurn.responseLinks === undefined ||
          (Array.isArray(candidateTurn.responseLinks) &&
            candidateTurn.responseLinks.every(isGuideResponseLink)))
      );
    }) &&
    Boolean(candidate.views && typeof candidate.views === 'object') &&
    typeof candidate.isClosed === 'boolean'
  );
};

export function createGuideSession(
  originPath: string,
  originScrollY: number,
  currentPath = '/guide',
): GuideSession {
  return {
    contentVersion: GUIDE_CONTENT_VERSION,
    runId: createRunId(),
    originPath,
    originScrollY,
    currentPath,
    trail: [currentPath],
    conversation: [],
    views: {},
    isClosed: false,
  };
}

export function readGuideSession(): GuideSession | null {
  try {
    const storedSession = window.sessionStorage.getItem(GUIDE_SESSION_KEY);

    if (!storedSession) {
      return memorySession;
    }

    const parsedSession: unknown = JSON.parse(storedSession);

    if (!isGuideSession(parsedSession)) {
      window.sessionStorage.removeItem(GUIDE_SESSION_KEY);
      return memorySession;
    }

    memorySession = parsedSession;
    return parsedSession;
  } catch {
    return memorySession;
  }
}

export function writeGuideSession(session: GuideSession) {
  memorySession = session;

  try {
    window.sessionStorage.setItem(GUIDE_SESSION_KEY, JSON.stringify(session));
  } catch {
    // The in-memory copy keeps navigation working when browser storage is unavailable.
  }

  window.dispatchEvent(new CustomEvent(GUIDE_SESSION_EVENT, { detail: session }));
}

export function guideLocationPath(pathname: string, search = '') {
  return `${pathname}${search}`;
}

export function getActiveGuideFocusKey() {
  const activeElement = document.activeElement;

  if (!(activeElement instanceof HTMLElement)) {
    return undefined;
  }

  return activeElement.dataset.guideFocus || activeElement.id || undefined;
}

export function findGuideFocusTarget(focusKey: string) {
  const elements = document.querySelectorAll<HTMLElement>('[data-guide-focus], [id]');

  return Array.from(elements).find(
    (element) => element.dataset.guideFocus === focusKey || element.id === focusKey,
  );
}
