import homeHeroPortrait from '../assets/home-hero-portrait.jpg';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
          src={homeHeroPortrait}
          alt="Shubham Gupta standing in front of the Matterhorn in a snowy alpine landscape"
        />
      </figure>
    </section>
  );
}
