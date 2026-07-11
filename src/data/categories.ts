import type { Category } from '../types/portfolio';

export const categories: Category[] = [
  {
    slug: 'digital-experience',
    eyebrow: 'Digital experience projects',
    title: 'Digital Experience',
    shortDescription: 'Healthcare, enterprise, and patient-facing digital product work.',
    description:
      'Digital products and platforms shaped around complex workflows, sensitive decisions, and teams who need clarity under pressure.',
    capabilities: ['UX strategy', 'Research synthesis', 'Workflow design', 'Design systems'],
  },
  {
    slug: 'industrial-experience',
    eyebrow: 'Industrial experience projects',
    title: 'Industrial Experience',
    shortDescription: 'Tools, interfaces, and service experiences for operational environments.',
    description:
      'Industrial experience work focused on the bridge between physical operations, digital coordination, and resilient service delivery.',
    capabilities: ['Service design', 'Operational mapping', 'Field research', 'Interface design'],
  },
  {
    slug: 'branding-and-identity',
    eyebrow: 'Branding & identity projects',
    title: 'Branding & Identity',
    shortDescription: 'Identity systems, launch stories, and visual languages for complex offers.',
    description:
      'Brand systems that make nuanced ideas easier to recognize, navigate, and extend across digital and physical touchpoints.',
    capabilities: ['Identity design', 'Creative direction', 'Launch systems', 'Editorial design'],
  },
];

export const getCategory = (slug: string) => categories.find((category) => category.slug === slug);
