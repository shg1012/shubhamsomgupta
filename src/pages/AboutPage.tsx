import { Link } from 'react-router-dom';
import aboutHeroPortrait from '../assets/about-hero-portrait.webp';
import { ArrowRightIcon } from '../components/ArrowRightIcon';
import { MediumIcon } from '../components/MediumIcon';
import { photographyItems } from '../data/photography';
import { profile } from '../data/profile';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const principles = [
  {
    title: 'Listen closely',
    description: 'Start with the people doing the work: their context, constraints, workarounds, and questions.',
  },
  {
    title: 'Make it tangible',
    description: 'Turn the fuzzy parts into journeys, prototypes, and decisions a cross-functional team can use.',
  },
  {
    title: 'Carry it through',
    description: 'Stay with the details—from usability validation and design-system quality to the build itself.',
  },
];

const employmentHistory = [
  {
    period: '2021—now',
    organisation: 'Philips Healthcare India',
    roles: 'Senior UX Designer, 2025—present · UX Designer, 2021—2025',
    description:
      'Enterprise healthcare and service experiences across oncology, remote monitoring, ultrasound, and service operations.',
  },
  {
    period: '2020—2021',
    organisation: 'Visual communication & industrial design',
    roles: 'Consure Medical · Techkritiya Eduventures',
    description:
      'Medical-product communication, STEM education kits, and design leadership across physical product work.',
  },
];

const aiWorkflow = [
  {
    number: '01',
    title: 'Clear the runway',
    description:
      'I use AI to structure early requirements and surface the questions a team needs to answer before it starts making screens.',
  },
  {
    number: '02',
    title: 'Make ideas testable',
    description:
      'AI-assisted wireframes help turn a direction into something concrete enough for a fast stakeholder conversation.',
  },
  {
    number: '03',
    title: 'Keep people in the loop',
    description:
      'The output is a starting point, not a verdict. Research, clinical expertise, usability testing, and stakeholder review decide what moves forward.',
  },
];

export function AboutPage() {
  useDocumentTitle('About');
  const practicePhoto = photographyItems.find((item) => item.id === 'kingfisher-portrait');
  const flightPhoto = photographyItems.find((item) => item.id === 'distant-flight');
  const automotivePhoto = photographyItems.find((item) => item.id === 'blue-porsche');

  return (
    <div className="page-shell about-page">
      <section className="page-hero about-hero">
        <div className="about-hero__copy">
          <Link className="breadcrumb about-hero__breadcrumb" to="/">
            <span className="breadcrumb-icon" aria-hidden="true">
              <ArrowRightIcon />
            </span>
            Back to home
          </Link>
          <p className="eyebrow">About / Designer, engineer, field observer</p>
          <h1>I make complex work feel more human.</h1>
          <p>
            I am Shubham Som Gupta, a Senior UX Designer working on enterprise healthcare and
            service experiences. I bring research, systems thinking, and visual craft together so
            teams can move from a complicated reality to a clear next step.
          </p>
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
            <span>7+ years across UX and multidisciplinary design</span>
            <strong>Curiosity travels across disciplines.</strong>
          </figcaption>
        </figure>
      </section>

      <section className="about-origin" aria-labelledby="origin-title">
        <div className="about-origin__intro">
          <p className="eyebrow">A route, not a straight line</p>
          <h2 id="origin-title">I learned to see systems by first learning to make things.</h2>
        </div>
        <div className="about-origin__story">
          <p>
            My route into digital product design began with mechanical engineering, then moved
            through transportation design and product development. Those disciplines taught me to
            notice form, movement, constraints, and the practical reality behind every elegant
            idea.
          </p>
          <p>
            Today, that grounding helps me work across clinical workflows, service operations,
            remote monitoring, and design systems—where a good interface is only one part of a
            much larger experience.
          </p>
          <div className="about-origin__actions">
            <a
              className="text-action about-origin__writing-link"
              href="https://medium.com/@shg1012"
              target="_blank"
              rel="noreferrer"
            >
              <MediumIcon />
              <span>Explore Medium articles</span>
              <ArrowRightIcon />
            </a>
            <Link className="text-action about-origin__writing-list-link" to="/writing">
              View list
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
        <ol className="about-origin__timeline" aria-label="Design journey">
          <li>
            <span>01</span>
            <strong>Mechanical engineering</strong>
            <p>Amity University, Noida</p>
          </li>
          <li>
            <span>02</span>
            <strong>Transportation design</strong>
            <p>School of Design Studies, UPES</p>
          </li>
          <li>
            <span>03</span>
            <strong>Product &amp; service experiences</strong>
            <p>Enterprise healthcare today</p>
          </li>
        </ol>
      </section>

      <section className="about-principles" aria-labelledby="principles-title">
        <div className="about-principles__heading">
          <p className="eyebrow">Working rhythm / 01–03</p>
          <h2 id="principles-title">A practice built for the in-between.</h2>
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
          <p className="eyebrow">The work now</p>
          <h2>From the clinical floor to the product team.</h2>
          <p>
            At Philips, I design digital experiences across oncology, service, remote monitoring,
            and ultrasound. The work spans the full arc: discovery, service journeys, interface
            design, prototyping, usability validation, and implementation with agile teams.
          </p>
          <p>
            I enjoy the useful tension between a person trying to complete a task and the complex
            organisation that has to support them. That is where maps, prototypes, clear language,
            and well-made systems earn their place.
          </p>
        </article>

        <aside className="profile-card">
          <p className="eyebrow">Practice profile</p>
          <h2>{profile.role}</h2>
          <p>{profile.currentRole}</p>
          <dl className="about-facts">
            <div>
              <dt>Experience</dt>
              <dd>7+ years</dd>
            </div>
            <div>
              <dt>Recognition</dt>
              <dd>Red Dot Team of the Year, 2022</dd>
            </div>
          </dl>
          <div className="discipline-cloud" aria-label="Design disciplines">
            {profile.disciplines.map((discipline) => (
              <span key={discipline}>{discipline}</span>
            ))}
          </div>
        </aside>
      </section>

      <section className="about-employment" aria-labelledby="employment-title">
        <div className="about-employment__heading">
          <p className="eyebrow">Employment history</p>
          <h2 id="employment-title">The places where the practice took shape.</h2>
        </div>
        <ol className="about-employment__timeline">
          {employmentHistory.map((role) => (
            <li key={role.organisation}>
              <span>{role.period}</span>
              <div>
                <h3>{role.organisation}</h3>
                <strong>{role.roles}</strong>
                <p>{role.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-ai" aria-labelledby="ai-title">
        <div className="about-ai__intro">
          <p className="eyebrow">AI in practice / Assist, test, decide</p>
          <h2 id="ai-title">AI clears the hay. People find the signal.</h2>
          <p>
            I use AI to accelerate the early, repeatable parts of design—requirements drafting,
            concept exploration, and AI-enabled workflow prototypes—so more attention can go to
            the decisions that need human context.
          </p>
          <small>
            In recent scoping work, requirements automation and AI-assisted ideation wireframes
            saved 3–4 hours per feature.
          </small>
        </div>
        <div className="about-ai__workflow">
          {aiWorkflow.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-credentials" aria-labelledby="credentials-title">
        <div>
          <p className="eyebrow">Selected foundations</p>
          <h2 id="credentials-title">A few places that shaped the way I work.</h2>
        </div>
        <div className="about-credentials__lists">
          <article>
            <p className="eyebrow">Learning</p>
            <ul>
              <li>Diploma, Product Development Project — Aalto Design Factory, Helsinki</li>
              <li>Postgraduate programme, Design &amp; Innovation — ISDI, Mumbai</li>
              <li>Master’s, Transportation Design — School of Design Studies, UPES</li>
            </ul>
          </article>
          <article>
            <p className="eyebrow">Recognition</p>
            <ul>
              <li>Red Dot Design Team of the Year — 2022</li>
              <li>Aalto Product Development Project winner — 2019</li>
              <li>Vehicle Design Gold Awardee — 2019</li>
            </ul>
          </article>
        </div>
      </section>

      {practicePhoto ? (
        <section className="about-personal">
          <div className="about-personal__copy">
            <p className="eyebrow">Outside product work / Field observation</p>
            <h2>The other side of the practice.</h2>
            <p>
              Photography is where I keep practicing attention: light, behaviour, movement, and
              the small details that make a scene feel alive. Automotive design and physical form
              still pull me in for the same reason. Both are reminders to look beyond the screen.
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

      {flightPhoto && automotivePhoto ? (
        <section className="about-observations" aria-label="Selected personal observations">
          <figure className="about-observations__flight">
            <img src={flightPhoto.src} alt={flightPhoto.alt} loading="lazy" />
            <figcaption>{flightPhoto.caption}</figcaption>
          </figure>
          <div className="about-observations__note">
            <p className="eyebrow">A few recurring subjects</p>
            <p>
              Birds in motion. Machines with a point of view. The way people make a place their
              own. These are all small studies in context.
            </p>
          </div>
          <figure className="about-observations__auto">
            <img src={automotivePhoto.src} alt={automotivePhoto.alt} loading="lazy" />
            <figcaption>{automotivePhoto.caption}</figcaption>
          </figure>
        </section>
      ) : null}
    </div>
  );
}
