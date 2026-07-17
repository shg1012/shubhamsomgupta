import { useEffect } from 'react';

export function useDocumentTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = `${title} | Shubham S. Gupta`;
  }, [title]);

  useEffect(() => {
    if (!description) {
      return;
    }

    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');

    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.append(metaDescription);
    }

    metaDescription.content = description;
  }, [description]);
}
