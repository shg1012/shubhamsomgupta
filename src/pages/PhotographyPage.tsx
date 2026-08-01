import { useEffect, useMemo, useRef, useState } from 'react';
import { photographyFilters, photographyItems } from '../data/photography';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { PhotographyItem } from '../types/portfolio';

type ActiveFilter = (typeof photographyFilters)[number];

export function PhotographyPage() {
  useDocumentTitle('Photography');

  const [activeFilter, setActiveFilter] = useState<ActiveFilter>('All');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const visibleItems = useMemo(() => {
    if (activeFilter === 'All') {
      return photographyItems;
    }

    return photographyItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const activeItem = activeIndex === null ? null : visibleItems[activeIndex];
  const isLightboxOpen = activeIndex !== null && Boolean(activeItem);

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    if (!isLightboxOpen) {
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

      if (event.key === 'Tab') {
        const focusableElements =
          lightboxRef.current?.querySelectorAll<HTMLElement>('button:not([disabled])');

        if (!focusableElements?.length) {
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isLightboxOpen, visibleItems.length]);

  const openLightbox = (item: PhotographyItem, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setActiveIndex(visibleItems.findIndex((visibleItem) => visibleItem.id === item.id));
  };

  const heroImages = [photographyItems[0], photographyItems[1], photographyItems[5]].filter(
    Boolean,
  );

  return (
    <div className="page-shell photography-page">
      <section className="page-hero photography-hero">
        <div className="photography-hero__copy">
          <p className="eyebrow">Photography / Visual field notes</p>
          <h1>Looking closely is part of the practice.</h1>
          <p>
            Wetlands, streets, machines, and brief moments of attention—kept as a visual stream
            rather than turned into case studies.
          </p>
        </div>
        <div className="photography-hero__collage" aria-label="Selected photography">
          {heroImages.map((item, index) => (
            <figure key={item.id}>
              <img src={item.src} alt={item.alt} />
              <figcaption>{String(index + 1).padStart(2, '0')}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="photography-index" aria-labelledby="photography-index-title">
        <div className="photography-index__heading">
          <p className="eyebrow">Image index / {String(visibleItems.length).padStart(2, '0')}</p>
          <h2 id="photography-index-title">Observations in light, motion, and texture.</h2>
        </div>
        <div className="filter-bar" aria-label="Photography filters">
          {photographyFilters.map((filter) => (
            <button
              className={filter === activeFilter ? 'is-active' : ''}
              key={filter}
              type="button"
              aria-pressed={filter === activeFilter}
              onClick={() => {
                setActiveFilter(filter);
                setActiveIndex(null);
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="photo-masonry" aria-live="polite">
        {visibleItems.map((item, index) => (
          <button
            className={`photo-card photo-card--${item.orientation}`}
            key={item.id}
            type="button"
            onClick={(event) => openLightbox(item, event.currentTarget)}
          >
            <img src={item.src} alt={item.alt} loading="lazy" />
            <span>
              <small>{String(index + 1).padStart(2, '0')}</small>
              <strong>{item.title}</strong>
              <em>
                {item.year} / {item.location}
              </em>
            </span>
          </button>
        ))}
      </section>

      {activeItem && activeIndex !== null ? (
        <div
          ref={lightboxRef}
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          aria-describedby="lightbox-caption"
        >
          <button
            ref={closeButtonRef}
            className="lightbox__close"
            type="button"
            onClick={() => setActiveIndex(null)}
          >
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
              <strong id="lightbox-title">{activeItem.title}</strong>
              <span id="lightbox-caption">{activeItem.caption}</span>
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
