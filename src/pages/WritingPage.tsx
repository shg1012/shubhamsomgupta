import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from '../components/ArrowRightIcon';
import { writingArticles } from '../data/writing';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function WritingPage() {
  useDocumentTitle('Writing');
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate('/about');
  };

  return (
    <div className="page-shell writing-page">
      <section className="page-hero writing-hero">
        <button className="breadcrumb writing-hero__back" type="button" onClick={goBack}>
          <span className="breadcrumb-icon" aria-hidden="true">
            <ArrowRightIcon />
          </span>
          Back
        </button>
        <p className="eyebrow">Field notes / Essays</p>
        <h1>Notes on systems, craft, and design.</h1>
        <p>
          Longer-form thoughts on healthcare UX, research practice, interaction craft, and the
          routes that brought me into design. Each essay lives on Medium and opens in a new tab.
        </p>
      </section>

      <section className="writing-index" aria-labelledby="writing-index-title">
        <div className="writing-index__heading">
          <p className="eyebrow">Writing / 01–{String(writingArticles.length).padStart(2, '0')}</p>
          <h2 id="writing-index-title">Published on Medium</h2>
        </div>
        <div className="writing-index__list">
          {writingArticles.map((article, index) => (
            <article className="writing-entry" key={article.id}>
              <span className="writing-entry__index">{String(index + 1).padStart(2, '0')}</span>
              <div className="writing-entry__meta">
                <span>{article.theme}</span>
                <small>{article.date}</small>
              </div>
              <div className="writing-entry__copy">
                <h2>{article.title}</h2>
                <p>{article.description}</p>
              </div>
              <a href={article.href} target="_blank" rel="noreferrer">
                <span>Read on Medium</span>
                <ArrowRightIcon />
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
