import { useEffect, useState } from 'react';
import { profile } from '../data/profile';

const visitCounterBaseUrl = 'https://page-views-api.ratneshc.com/api/v1';
const visitCounterSite = 'shubhamxdesign.in';
const visitCounterPath = '/';
const visitCounterCacheKey = 'portfolio-site-visit-count';

let visitCountRequest: Promise<number> | null = null;

function parseVisitCount(value: unknown) {
  const count = typeof value === 'string' && /^\d+$/.test(value) ? Number(value) : value;

  return typeof count === 'number' && Number.isSafeInteger(count) && count >= 0 ? count : null;
}

function readCachedVisitCount() {
  try {
    return parseVisitCount(window.localStorage.getItem(visitCounterCacheKey));
  } catch {
    return null;
  }
}

function saveVisitCount(count: number) {
  try {
    window.localStorage.setItem(visitCounterCacheKey, String(count));
  } catch {
    // The live count still renders when storage is unavailable.
  }
}

function counterUrl(endpoint: 'track' | 'views') {
  const params = new URLSearchParams({ site: visitCounterSite, path: visitCounterPath });
  return `${visitCounterBaseUrl}/${endpoint}?${params.toString()}`;
}

function isLocalPreview() {
  return ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
}

async function fetchVisitCount() {
  if (!isLocalPreview()) {
    await fetch(counterUrl('track'), { cache: 'no-store', keepalive: true }).catch(() => undefined);
  }

  const response = await fetch(counterUrl('views'), { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Visit count is unavailable.');
  }

  const payload: unknown = await response.json();
  const count =
    typeof payload === 'object' && payload !== null && 'views' in payload
      ? parseVisitCount(payload.views)
      : null;

  if (count === null) {
    throw new Error('Visit count response is invalid.');
  }

  return count;
}

function requestVisitCount() {
  if (!visitCountRequest) {
    visitCountRequest = fetchVisitCount().catch((error: unknown) => {
      visitCountRequest = null;
      throw error;
    });
  }

  return visitCountRequest;
}

export function Footer() {
  const [visitCount, setVisitCount] = useState<number | null>(readCachedVisitCount);

  useEffect(() => {
    let isCurrent = true;

    requestVisitCount()
      .then((count) => {
        saveVisitCount(count);

        if (isCurrent) {
          setVisitCount(count);
        }
      })
      .catch(() => undefined);

    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <footer className="site-footer">
      <div className="site-footer__lead">
        <p className="eyebrow">End note / Available for thoughtful design work</p>
        <h2>Have a complicated problem worth untangling?</h2>
        <a className="footer-email" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
      </div>
      <div className="site-footer__meta">
        <div className="footer-links">
          {profile.socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              {item.label}
            </a>
          ))}
          <a href={profile.phoneHref}>{profile.phone}</a>
        </div>
        <p>Designed as a working archive of systems, stories, and visual observations.</p>
        {visitCount !== null ? (
          <p className="site-footer__visit-counter">
            <span className="visually-hidden">Portfolio visits: </span>
            <span className="site-footer__visit-digits">{String(visitCount)}</span>
          </p>
        ) : null}
      </div>
    </footer>
  );
}
