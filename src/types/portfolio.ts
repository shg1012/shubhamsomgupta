export type ProjectCategorySlug =
  | 'digital-experience'
  | 'industrial-experience'
  | 'branding-and-identity';

export type ProjectCardSize = 'small' | 'medium' | 'wide' | 'hero';

export type ProjectTheme = 'cyan' | 'blue' | 'violet' | 'magenta' | 'slate';

export type DeviceMockup = 'laptop' | 'phone' | 'dual' | 'dashboard' | 'brand-system';

export type ProjectDepth = 'flagship' | 'compact';

export interface ProjectTag {
  label: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  qualification?: string;
}

export interface ProjectCustomerVoice {
  quote: string;
  source: string;
}

export interface ProjectStarSummary {
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface ProjectSection {
  title: string;
  body?: string;
  bullets?: string[];
  image?: string;
  imageAlt?: string;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategorySlug;
  shortDescription: string;
  overview?: string;
  content: string;
  tags: string[];
  voiceOfCustomer: ProjectCustomerVoice;
  star: ProjectStarSummary;
  year?: string;
  role?: string;
  client?: string;
  duration?: string;
  status?: string;
  depth: ProjectDepth;
  thumbnail: string;
  thumbnailAlt: string;
  heroImage?: string;
  featured?: boolean;
  cardSize?: ProjectCardSize;
  theme: ProjectTheme;
  secondaryImage?: string;
  deviceMockup?: DeviceMockup;
  metrics?: ProjectMetric[];
  sections?: ProjectSection[];
  seo?: {
    description?: string;
  };
  draft?: boolean;
  order?: number;
  sourcePath?: string;
}

export interface Category {
  slug: ProjectCategorySlug;
  title: string;
  eyebrow: string;
  shortDescription: string;
  description: string;
  capabilities: string[];
}

export type PhotographyCategory = 'Nature' | 'Street' | 'People' | 'Automotive' | 'Black & White';

export interface PhotographyItem {
  id: string;
  title: string;
  src: string;
  alt: string;
  caption: string;
  category: PhotographyCategory;
  location?: string;
  year?: string;
  orientation: 'portrait' | 'landscape' | 'wide' | 'square';
}

export interface NavigationItem {
  label: string;
  to: string;
}
