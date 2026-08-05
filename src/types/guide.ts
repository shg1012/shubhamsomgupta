import type { Project, ProjectCategorySlug } from './portfolio';

export type GuideProjectSlug =
  | 'connection-customer-to-support'
  | 'onex-healthcare-operations'
  | 'clinical-trial-discovery'
  | 'font-readability-framework'
  | 'provider-onboarding-system'
  | 'fireflys'
  | 'zero-brush'
  | 'humanising-lt20-classic'
  | 'dudhi-planters'
  | 'philips-life-shield'
  | 'nescafe-connected-coffee-mug'
  | 'prag-marketing-posters'
  | 'prag-articove-brochure'
  | 'studio-portfolio-identity';

export type GuideSourceAnchor = `#${string}`;

export type GuideDeliveryStageId =
  'delivered-or-realized' | 'ongoing' | 'prototypes' | 'concepts-and-proposals';

export type GuideCapabilityId =
  | 'research-and-synthesis'
  | 'workflow-and-service-systems'
  | 'digital-product-and-enterprise-ux'
  | 'physical-prototyping-and-human-factors'
  | 'brand-visual-and-retail-experience'
  | 'evidence-changed-a-decision';

export type GuideTourId =
  | 'senior-ux-highlights'
  | 'healthcare-and-enterprise'
  | 'physical-and-digital-range'
  | 'most-complete-decision-trails';

export type GuideAboutAnswerId =
  'working-approach' | 'domains' | 'ai-use' | 'senior-ux-fit' | 'contact';

export interface GuideProjectContent {
  readonly slug: GuideProjectSlug;
  readonly overview: string;
  readonly problem: string;
  readonly contribution: string;
  readonly evidenceToDecision?: string;
  readonly outcome: string;
  readonly sourceAnchors: readonly [GuideSourceAnchor, ...GuideSourceAnchor[]];
}

export type GuideCanonicalProject = Project & { readonly status: string };

export interface GuideProject {
  readonly content: GuideProjectContent;
  readonly project: GuideCanonicalProject;
}

export interface GuideProjectGroup<Id extends string = string> {
  readonly id: Id;
  readonly prompt: string;
  readonly answer: string;
  readonly projectSlugs: readonly GuideProjectSlug[];
}

export interface GuideCategoryGroup {
  readonly id: ProjectCategorySlug;
  readonly prompt: string;
  readonly answer: string;
}

export type GuideDeliveryStageGroup = GuideProjectGroup<GuideDeliveryStageId>;

export type GuideCapabilityGroup = GuideProjectGroup<GuideCapabilityId>;

export interface GuideTourStop {
  readonly projectSlug: GuideProjectSlug;
  readonly reason: string;
}

export interface GuideTour {
  readonly id: GuideTourId;
  readonly prompt: string;
  readonly answer: string;
  readonly stops: readonly [GuideTourStop, GuideTourStop, GuideTourStop, ...GuideTourStop[]];
}

export interface GuideAboutAnswer {
  readonly id: GuideAboutAnswerId;
  readonly prompt: string;
  readonly answer: string;
  readonly choices: readonly [string, ...string[]];
}

export interface GuideFeaturedProjects {
  readonly answer: string;
  readonly initialProjectSlugs: readonly GuideProjectSlug[];
  readonly expandedProjectSlugs: readonly GuideProjectSlug[];
}
