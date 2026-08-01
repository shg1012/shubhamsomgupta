import { useEffect } from 'react';

const defaultDescription =
  'Portfolio of Shubham S. Gupta, a senior UX designer working across research, service design, interaction design, and visual systems.';

export function useDocumentTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = `${title} | Shubham S. Gupta`;
  }, [title]);

  useEffect(() => {
    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');

    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.append(metaDescription);
    }

    metaDescription.content = description ?? defaultDescription;
  }, [description]);
}
