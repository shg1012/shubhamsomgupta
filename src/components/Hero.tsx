import { assetPath } from '../data/assets';
import { profile } from '../data/profile';

export function Hero() {
  return (
    <section className="hero-section">
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
