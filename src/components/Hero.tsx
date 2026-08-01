import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { assetPath } from '../data/assets';
import { profile } from '../data/profile';
import { ArrowRightIcon } from './ArrowRightIcon';

let hasPlayedHeroIntro = false;

export function Hero() {
  const [playIntro] = useState(() => !hasPlayedHeroIntro);

  useEffect(() => {
    if (!playIntro) {
      return;
    }

    hasPlayedHeroIntro = true;
  }, [playIntro]);

  const scrollToSelectedWork = () => {
    document.getElementById('selected-work')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <section className={`hero-section${playIntro ? ' hero-section--intro' : ''}`}>
      <div className="hero-copy">
        <p className="hero-kicker">
          <span>{profile.role}</span>
          <span>Research · systems · interaction</span>
        </p>
        <h1 aria-label="Complex systems, made clear.">
          <span>Complex systems,</span>
          <strong>made clear.</strong>
        </h1>
        <p className="hero-positioning">{profile.intro}</p>
        <div className="hero-actions">
          <button className="button-primary" type="button" onClick={scrollToSelectedWork}>
            Explore selected work
            <ArrowRightIcon />
          </button>
          <Link className="button-secondary" to="/about">
            About my practice
          </Link>
        </div>
      </div>

      <figure className="hero-portrait">
        <img
          src={assetPath('images/home-shubham-matterhorn.webp')}
          alt="Shubham Gupta standing in front of the Matterhorn in a snowy alpine landscape"
        />
        <figcaption>
          <span>Outside the interface</span>
          <strong>Observation keeps the work human.</strong>
        </figcaption>
      </figure>

      <aside className="hero-note">
        <span>Practice / 01</span>
        <p>Research-led, artifact-driven, and comfortable in the messy middle.</p>
      </aside>

      <div className="hero-art" aria-hidden="true">
        <img src={assetPath('images/figma-hero.png')} alt="" />
      </div>

      <a
        className="hero-source"
        href="https://revisionlab.wordpress.com/that-squiggle-of-the-design-process/"
        target="_blank"
        rel="noreferrer"
      >
        Process squiggle / Damien Newman
      </a>
    </section>
  );
}
