import { useEffect } from 'react';

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | Shubham S. Gupta`;
  }, [title]);
}
