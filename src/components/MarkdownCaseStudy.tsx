import { Children, isValidElement, type ReactNode } from 'react';
import ReactMarkdown, { defaultUrlTransform, type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Project } from '../types/portfolio';

interface MarkdownCaseStudyProps {
  project: Project;
}

function textFromChildren(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return String(child);
      }

      if (isValidElement<{ children?: ReactNode }>(child)) {
        return textFromChildren(child.props.children);
      }

      return '';
    })
    .join('');
}

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractHeadings(content: string) {
  return [...content.matchAll(/^##\s+(.+)$/gm)].map((match) => {
    const title = match[1].trim().replace(/#+$/, '').trim();
    return {
      title,
      id: slugifyHeading(title),
    };
  });
}

function markdownUrlTransform(url: string, key: string) {
  if (key === 'src' && (url.startsWith('data:image/') || url.startsWith('blob:'))) {
    return url;
  }

  return defaultUrlTransform(url);
}

function MarkdownImage({ src, alt, title }: { src?: string; alt?: string; title?: string }) {
  if (!src) {
    return null;
  }

  const sizeMatch = title?.match(/\s*\{size=(compact|small)\}\s*$/i);
  const size = sizeMatch?.[1].toLowerCase();
  const caption = title?.replace(/\s*\{size=(compact|small)\}\s*$/i, '').trim();

  return (
    <figure className={`case-study-figure${size ? ` case-study-figure--${size}` : ''}`}>
      <img src={src} alt={alt ?? ''} loading="lazy" decoding="async" />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

const markdownComponents: Components = {
  a({ node, href, children, ...props }) {
    void node;
    const isExternal =
      typeof href === 'string' && (/^(?:[a-z]+:)?\/\//i.test(href) || href.startsWith('mailto:'));

    return (
      <a
        href={href}
        rel={isExternal ? 'noreferrer noopener' : undefined}
        target={isExternal ? '_blank' : undefined}
        {...props}
      >
        {children}
      </a>
    );
  },
  h2({ node, children, ...props }) {
    void node;
    const headingText = textFromChildren(children);

    return (
      <h2 id={slugifyHeading(headingText)} {...props}>
        {children}
      </h2>
    );
  },
  h3({ node, children, ...props }) {
    void node;
    const headingText = textFromChildren(children);

    return (
      <h3 id={slugifyHeading(headingText)} {...props}>
        {children}
      </h3>
    );
  },
  img({ node, src, alt, title }) {
    void node;
    return <MarkdownImage src={src} alt={alt} title={title} />;
  },
  p({ node, children, ...props }) {
    const hasOnlyImage =
      node?.children.length === 1 &&
      node.children[0].type === 'element' &&
      node.children[0].tagName === 'img';

    if (hasOnlyImage) {
      return <>{children}</>;
    }

    return <p {...props}>{children}</p>;
  },
  table({ node, children, ...props }) {
    void node;
    return (
      <div className="case-study-table-wrap">
        <table {...props}>{children}</table>
      </div>
    );
  },
};

export function MarkdownCaseStudy({ project }: MarkdownCaseStudyProps) {
  const headings = project.depth === 'flagship' ? extractHeadings(project.content) : [];
  const scrollToHeading = (headingId: string) => {
    const heading = document.getElementById(headingId);

    if (!heading) {
      return;
    }

    heading.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
  };
  const starCards = [
    { letter: 'S', title: 'Situation', body: project.star.situation },
    { letter: 'T', title: 'Task', body: project.star.task },
    { letter: 'A', title: 'Action', body: project.star.action },
    { letter: 'R', title: 'Result', body: project.star.result },
  ];
  const decisionTrail = project.evidenceToDecision
    ? [
        { title: 'Situation', body: project.evidenceToDecision.situation },
        { title: 'Evidence', body: project.evidenceToDecision.evidence },
        { title: 'Insight', body: project.evidenceToDecision.insight },
        { title: 'Decision', body: project.evidenceToDecision.decision },
        { title: 'Artifact', body: project.evidenceToDecision.artifact },
        { title: 'Outcome', body: project.evidenceToDecision.outcome },
      ]
    : [];

  return (
    <section
      className={`case-study-stack markdown-case-study markdown-case-study--${project.depth}`}
    >
      {headings.length > 2 ? (
        <nav className="case-study-toc glass-card" aria-label="Case study sections">
          <span>Contents</span>
          {headings.map((heading) => (
            <a
              href={`#/project/${project.slug}#${heading.id}`}
              key={heading.id}
              onClick={(event) => {
                event.preventDefault();
                scrollToHeading(heading.id);
              }}
            >
              {heading.title}
            </a>
          ))}
        </nav>
      ) : null}
      {decisionTrail.length ? (
        <section className="decision-trail" aria-labelledby="decision-trail-title">
          <div className="decision-trail__heading">
            <h2 id="decision-trail-title">How the work moved forward</h2>
            <p className="eyebrow">Evidence to decision</p>
          </div>
          <ol>
            {decisionTrail.map((step, index) => (
              <li className="glass-card" key={step.title}>
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
      <div className="case-study-opening">
        <aside className="customer-voice glass-card" aria-label="Voice of customer">
          <blockquote>
            <p>{project.voiceOfCustomer.quote}</p>
            <footer>{project.voiceOfCustomer.source}</footer>
          </blockquote>
        </aside>
        <section className="star-summary" aria-label="STAR project summary">
          {starCards.map((card) => (
            <article className="star-card glass-card" key={card.title}>
              <div className="star-card__title">
                <span aria-hidden="true">{card.letter}</span>
                <h2>{card.title}</h2>
              </div>
              <p>{card.body}</p>
            </article>
          ))}
        </section>
      </div>
      <article className="case-study-section markdown-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
          urlTransform={markdownUrlTransform}
        >
          {project.content}
        </ReactMarkdown>
      </article>
    </section>
  );
}
