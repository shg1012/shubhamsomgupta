export interface WritingArticle {
  id: string;
  title: string;
  date: string;
  publication: string;
  theme: string;
  description: string;
  href: string;
  featured?: boolean;
}

export const writingArticles: WritingArticle[] = [
  {
    id: 'hci-and-ux',
    title: 'Human-Computer Interaction & (not vs.) User Experience Design',
    date: 'Jun 2023',
    publication: 'Bootcamp',
    theme: 'Point of view',
    description: 'A perspective on the relationship between HCI and the practice of UX design.',
    href: 'https://medium.com/design-bootcamp/human-computer-interaction-not-vs-user-experience-design-a893caa5d134',
    featured: true,
  },
  {
    id: 'healthcare-components',
    title: 'Healthcare UX Scales When Components and Patterns Are Clear',
    date: 'Dec 2025',
    publication: 'Bootcamp',
    theme: 'Healthcare systems',
    description: 'Why shared components and patterns matter in complex healthcare products.',
    href: 'https://medium.com/design-bootcamp/healthcare-ux-scales-when-components-and-patterns-are-clear-10e06e41034d',
    featured: true,
  },
  {
    id: 'ux-writing',
    title: 'UX Writing: The Invisible Design That Shapes Every Click',
    date: 'May 2025',
    publication: 'Bootcamp',
    theme: 'Interaction craft',
    description: 'A note on how language guides decisions within an interface.',
    href: 'https://medium.com/design-bootcamp/ux-writing-the-invisible-design-that-shapes-every-click-3bd161cbb2a3',
    featured: true,
  },
  {
    id: 'art-with-constraints',
    title: 'Redefining Design: Art with Constraints',
    date: 'Sep 2024',
    publication: 'Bootcamp',
    theme: 'Design practice',
    description: 'A reflection on what separates design from art while keeping their shared craft in view.',
    href: 'https://medium.com/design-bootcamp/redefining-design-art-with-constraints-8f117eebaab9',
  },
  {
    id: 'usability-testing',
    title: 'Usability Testing for beginners',
    date: 'May 2024',
    publication: 'Bootcamp',
    theme: 'Research practice',
    description: 'Notes and observations on beginning a usability-testing practice.',
    href: 'https://medium.com/design-bootcamp/usability-testing-for-beginners-49e271fef1d1',
    featured: true,
  },
  {
    id: 'transitioning-into-design',
    title: 'Transitioning into Design: A Perspective of Mechanical Engineer',
    date: 'Oct 2020',
    publication: 'Bootcamp',
    theme: 'Design journey',
    description: 'A personal perspective on moving from mechanical engineering into design.',
    href: 'https://medium.com/design-bootcamp/transitioning-into-design-a-perspective-of-mechanical-engineer-a2e386e83f1e',
  },
  {
    id: 'zero-brush',
    title: 'ZERO Brush',
    date: 'Jul 2020',
    publication: 'Design and Innovation at ISDI',
    theme: 'Industrial design',
    description: 'An earlier project write-up of the academic product concept, co-authored with the project team.',
    href: 'https://medium.com/di-lab-2017-18/zero-brush-46d77e83598a',
  },
  {
    id: 'groot',
    title: 'Groot — An Ecosystem Design for Post Fall Emergency for Elderly People in India',
    date: 'Jun 2020',
    publication: 'Design and Innovation at ISDI',
    theme: 'Service design',
    description: 'A co-authored ecosystem-design concept for post-fall emergency support.',
    href: 'https://medium.com/di-lab-2017-18/groot-an-ecosystem-design-for-post-fall-emergency-for-elderly-people-in-india-b2c5b7647e77',
  },
];

export const featuredWriting = writingArticles.filter((article) => article.featured);

export const getWritingArticle = (id: string) => writingArticles.find((article) => article.id === id);
