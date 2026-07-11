import { useEffect, useState } from 'react';
import { assetPath } from '../data/assets';
import { profile } from '../data/profile';

const HERO_INTRO_STORAGE_KEY = 'ssg-hero-intro-played';

function shouldPlayHeroIntro() {
  if (typeof window === 'undefined') {
    return true;
  }

  try {
    return window.localStorage.getItem(HERO_INTRO_STORAGE_KEY) !== 'true';
  } catch {
    return true;
  }
}

export function Hero() {
  const [playIntro] = useState(shouldPlayHeroIntro);

  useEffect(() => {
    if (!playIntro) {
      return;
    }

    try {
      window.localStorage.setItem(HERO_INTRO_STORAGE_KEY, 'true');
    } catch {
      // Storage can be unavailable in stricter browser modes; the animation remains harmless.
    }
  }, [playIntro]);

  return (
    <section className={`hero-section${playIntro ? ' hero-section--intro' : ''}`}>
      <div className="hero-art" aria-hidden="true">
        <img src={assetPath('images/figma-hero.png')} alt="" />
      </div>
      <div className="hero-copy">
        <p className="intro-line">
          I am <strong>{profile.name}</strong>, and
        </p>
        <h1>{profile.headline}</h1>
      </div>
      <a
        className="hero-source"
        href="https://revisionlab.wordpress.com/that-squiggle-of-the-design-process/"
        target="_blank"
        rel="noreferrer"
      >
        The Squiggle of Design Process by Damien Newman
      </a>
    </section>
  );
}
