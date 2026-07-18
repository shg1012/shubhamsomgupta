import { ArrowUpIcon } from './ArrowUpIcon';

export function ScrollToTopButton() {
  return (
    <button
      className="scroll-top-button"
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUpIcon />
    </button>
  );
}
