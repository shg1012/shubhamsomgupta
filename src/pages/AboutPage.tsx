import { Link } from 'react-router-dom';
import aboutHeroPortrait from '../assets/about-hero-portrait.webp';
import { ArrowRightIcon } from '../components/ArrowRightIcon';
import { photographyItems } from '../data/photography';
import { profile } from '../data/profile';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const principles = [
  {
    title: 'Observe',
    description: 'Find the human signal inside workflows, constraints, behaviours, and context.',
  },
  {
    title: 'Structure',
    description: 'Turn partial information into maps, models, and decisions a team can use.',
  },
  {
    title: 'Craft',
    description:
      'Give the final experience enough visual clarity and restraint to feel inevitable.',
  },
];

export function AboutPage() {
  useDocumentTitle('About');
  const practicePhoto = photographyItems.find((item) => item.id === 'kingfisher-portrait');

  return (
    <div className="page-shell about-page">
      <section className="page-hero about-hero">
        <div className="about-hero__copy">
          <p className="eyebrow">About / The person behind the process</p>
          <h1>{profile.name}</h1>
          <p>{profile.longBio}</p>
          <Link className="button-primary" to="/contact">
            Start a conversation
            <ArrowRightIcon />
          </Link>
        </div>
        <figure className="about-hero__portrait">
          <img
            src={aboutHeroPortrait}
            alt="Shubham Gupta wearing sunglasses in a snowy alpine landscape"
          />
          <figcaption>
            <span>Designer · engineer · photographer</span>
            <strong>Curiosity travels across disciplines.</strong>
          </figcaption>
        </figure>
      </section>

      <section className="about-principles" aria-labelledby="principles-title">
        <div className="about-principles__heading">
          <p className="eyebrow">Working rhythm / 01–03</p>
          <h2 id="principles-title">How I move through ambiguity.</h2>
        </div>
        <div className="about-principles__list">
          {principles.map((principle, index) => (
            <article key={principle.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-layout">
        <article className="narrative-card">
          <p className="eyebrow">The messy middle</p>
          <h2>Where systems and stories meet.</h2>
          <p>
            I am interested in systems that ask people to make decisions with incomplete
            information: clinical workflows, service operations, onboarding paths, brand systems,
            and the interfaces that hold them together.
          </p>
          <p>
            My process is research-led and artifact-driven. I like maps, prototypes, crisp language,
            visual systems, and enough restraint to let the real work breathe.
          </p>
        </article>

        <aside className="profile-card">
          <p className="eyebrow">Practice profile</p>
          <h2>{profile.role}</h2>
          <p>{profile.currentRole}</p>
          <dl className="about-facts">
            <div>
              <dt>Experience</dt>
              <dd>6+ years</dd>
            </div>
            <div>
              <dt>Recognition</dt>
              <dd>Red Dot team awardee</dd>
            </div>
          </dl>
          <div className="discipline-cloud" aria-label="Design disciplines">
            {profile.disciplines.map((discipline) => (
              <span key={discipline}>{discipline}</span>
            ))}
          </div>
        </aside>
      </section>

      {practicePhoto ? (
        <section className="about-personal">
          <div className="about-personal__copy">
            <p className="eyebrow">Outside product work / Field observation</p>
            <h2>Photography keeps me looking.</h2>
            <p>
              Photography keeps me attentive to light, behaviour, context, and the details people
              usually overlook. That habit carries back into how I observe workflows and design
              systems.
            </p>
            <Link className="text-action" to="/photography">
              Explore photography
              <ArrowRightIcon />
            </Link>
          </div>
          <figure>
            <img src={practicePhoto.src} alt={practicePhoto.alt} loading="lazy" />
            <figcaption>
              <strong>{practicePhoto.title}</strong>
              <span>{practicePhoto.caption}</span>
            </figcaption>
          </figure>
        </section>
      ) : null}
    </div>
  );
}
