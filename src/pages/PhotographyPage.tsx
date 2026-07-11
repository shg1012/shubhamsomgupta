import { useEffect, useMemo, useState } from 'react';
import { photographyFilters, photographyItems } from '../data/photography';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { PhotographyItem } from '../types/portfolio';

type ActiveFilter = (typeof photographyFilters)[number];

export function PhotographyPage() {
  useDocumentTitle('Photography');

  const [activeFilter, setActiveFilter] = useState<ActiveFilter>('All');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visibleItems = useMemo(() => {
    if (activeFilter === 'All') {
      return photographyItems;
    }

    return photographyItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const activeItem = activeIndex === null ? null : visibleItems[activeIndex];

  useEffect(() => {
    if (!activeItem) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null);
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex((index) => (index === null ? null : (index + 1) % visibleItems.length));
      }

      if (event.key === 'ArrowLeft') {
        setActiveIndex((index) =>
          index === null ? null : (index - 1 + visibleItems.length) % visibleItems.length,
        );
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeItem, visibleItems.length]);

  const openLightbox = (item: PhotographyItem) => {
    setActiveIndex(visibleItems.findIndex((visibleItem) => visibleItem.id === item.id));
  };

  return (
    <div className="page-shell">
      <section className="page-hero compact-hero">
        <p className="eyebrow">Photography</p>
        <h1>Observations from wetlands, streets, and machines in motion.</h1>
        <p>
          A dedicated gallery for image-making practice, built as a quiet visual stream rather than
          individual case studies.
        </p>
      </section>

      <section className="filter-bar" aria-label="Photography filters">
        {photographyFilters.map((filter) => (
          <button
            className={filter === activeFilter ? 'is-active' : ''}
            key={filter}
            type="button"
            onClick={() => {
              setActiveFilter(filter);
              setActiveIndex(null);
            }}
          >
            {filter}
          </button>
        ))}
      </section>

      <section className="photo-masonry">
        {visibleItems.map((item) => (
          <button
            className={`photo-card photo-card--${item.orientation}`}
            key={item.id}
            type="button"
            onClick={() => openLightbox(item)}
          >
            <img src={item.src} alt={item.alt} loading="lazy" />
            <span>
              <strong>{item.title}</strong>
              {item.year} / {item.location}
            </span>
          </button>
        ))}
      </section>

      {activeItem && activeIndex !== null ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={activeItem.title}>
          <button className="lightbox__close" type="button" onClick={() => setActiveIndex(null)}>
            Close
          </button>
          <button
            className="lightbox__nav lightbox__nav--prev"
            type="button"
            onClick={() =>
              setActiveIndex((activeIndex - 1 + visibleItems.length) % visibleItems.length)
            }
            aria-label="Previous photograph"
          >
            Prev
          </button>
          <figure>
            <img src={activeItem.src} alt={activeItem.alt} />
            <figcaption>
              <strong>{activeItem.title}</strong>
              <span>{activeItem.caption}</span>
              <span>
                {activeItem.year} / {activeItem.location}
              </span>
            </figcaption>
          </figure>
          <button
            className="lightbox__nav lightbox__nav--next"
            type="button"
            onClick={() => setActiveIndex((activeIndex + 1) % visibleItems.length)}
            aria-label="Next photograph"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}
