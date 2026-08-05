import type {
  GuideAboutAnswer,
  GuideAboutAnswerId,
  GuideCanonicalProject,
  GuideCapabilityGroup,
  GuideCapabilityId,
  GuideCategoryGroup,
  GuideDeliveryStageGroup,
  GuideDeliveryStageId,
  GuideFeaturedProjects,
  GuideProject,
  GuideProjectContent,
  GuideProjectSlug,
  GuideTour,
  GuideTourId,
} from '../types/guide';
import type { Project, ProjectCategorySlug } from '../types/portfolio';
import { getProject as getCanonicalProject } from './projects';

export const GUIDE_INITIAL_PROJECT_LIMIT = 4;

export const guideProjectContentBySlug = {
  'connection-customer-to-support': {
    slug: 'connection-customer-to-support',
    overview:
      'A four-week initiative brought configurable support into a clinical platform and was validated with seven representative users.',
    problem:
      'Clinical-platform users lacked a clear route to the right support channel, and handoffs often lost useful context.',
    contribution:
      'Shubham designed user and administrator flows from research through implementation support and timed testing, then shaped a structured-email enhancement.',
    evidenceToDecision:
      'Customer correspondence exposed fragmented routes and context loss, prompting point-of-failure support, configured channels, and a structured email handoff.',
    outcome:
      'Implemented in two sprints; seven representative users averaged under one minute only in timed usability testing, and structured email followed later.',
    sourceAnchors: [
      '#overview',
      '#the-challenge',
      '#at-a-glance-title',
      '#decision-trail-title',
      '#outcome',
    ],
  },
  'onex-healthcare-operations': {
    slug: 'onex-healthcare-operations',
    overview:
      'Shared services, information architecture, and 200+ prototype iterations shaped a reusable healthcare-platform direction.',
    problem:
      'Fragmented specialised applications needed a coherent platform foundation without flattening role-specific, high-stakes workflows.',
    contribution:
      'Shubham shaped the platform vision, personas, information architecture, UX principles, shared services, global readiness, and human-centred AI direction.',
    evidenceToDecision:
      'Interviews, workshops, 200+ iterations, and repeated usability sessions supported common object-based and governed-AI platform foundations.',
    outcome:
      'The result is an ongoing reusable direction; adoption, realised revenue, and measured operational impact are not claimed.',
    sourceAnchors: [
      '#overview',
      '#the-challenge',
      '#at-a-glance-title',
      '#decision-trail-title',
      '#outcome',
    ],
  },
  'clinical-trial-discovery': {
    slug: 'clinical-trial-discovery',
    overview:
      'An eight-week guided experience helps patients and caregivers understand relevance, eligibility, and trial comparisons.',
    problem:
      'Patients and caregivers faced complex eligibility language, location constraints, medical terminology, and uncertain next steps.',
    contribution:
      'Shubham used interviews and journey mapping to shape guided matching, plain-language eligibility, and saved comparisons.',
    outcome:
      'The documented result is a 38-screen prototype; nine research sessions and 15 content patterns are project outputs, not impact evidence.',
    sourceAnchors: ['#context', '#research', '#final-solution'],
  },
  'font-readability-framework': {
    slug: 'font-readability-framework',
    overview:
      'A two-hour developer workshop turned a browser-zoom workaround into a log-reading framework deployed two sprints later.',
    problem:
      'Service engineers needed denser log scanning without shrinking navigation, tabs, buttons, or other shared controls.',
    contribution:
      'Shubham framed the observed workaround, facilitated the developer workshop, and created the reference hierarchy used for implementation.',
    evidenceToDecision:
      'Browser zoom isolated density as a log-content problem, prompting 12px and 16px modes while shared interface elements stayed unchanged.',
    outcome:
      'The option shipped after two sprints; adoption, profile persistence, and measured performance effects were not supplied.',
    sourceAnchors: [
      '#overview',
      '#the-challenge',
      '#at-a-glance-title',
      '#decision-trail-title',
      '#outcome',
    ],
  },
  'provider-onboarding-system': {
    slug: 'provider-onboarding-system',
    overview:
      'A research-led experience guides mood-based discovery, blend selection, packaging personalisation, and checkout.',
    problem:
      'Online buyers lacked sensory cues and confidence while navigating many blends and unfamiliar coffee attributes.',
    contribution:
      'Shubham structured the research, synthesised personas and journey evidence, and designed flows, storyboards, sitemap, wireframes, and high-fidelity screens.',
    evidenceToDecision:
      'A 41-participant survey exposed uncertainty, shifting selection toward mood-led recommendations while preserving customer control.',
    outcome:
      'The result is a UX design-task concept; build, usability validation, launch, and behavioural or commercial impact are not evidenced.',
    sourceAnchors: [
      '#overview',
      '#the-challenge',
      '#at-a-glance-title',
      '#decision-trail-title',
      '#outcome',
    ],
  },
  fireflys: {
    slug: 'fireflys',
    overview:
      'A stabilised sensor payload, gimbal, aircraft attachment, and ground-control concept formed one early-wildfire-detection system.',
    problem:
      'The team needed to protect and orient an airborne sensor, attach it securely, and connect it to a usable ground workflow.',
    contribution:
      'Shubham owned the payload housing, gimbal integration, drone attachment, 3D-printed iterations, testing, and supported aircraft assembly.',
    evidenceToDecision:
      'Firefighter input and physical prototypes exposed integration constraints, prompting a modular gimballed payload designed as one subsystem.',
    outcome:
      'Four payload iterations produced a flying prototype shown at the Final Gala; wildfire detection was not field-validated or deployed.',
    sourceAnchors: ['#overview', '#the-challenge', '#my-role', '#decision-trail-title', '#outcome'],
  },
  'zero-brush': {
    slug: 'zero-brush',
    overview:
      'A detachable bamboo head and visible day/night toothpaste-pellet mechanism explore replacement and brushing routines.',
    problem:
      'The team explored how a toothbrush could replace less material while making head replacement and twice-daily brushing visible.',
    contribution:
      'Shubham led product form, ergonomics, mockups, CAD, 3D modelling, rendering, print preparation, and video while contributing to research and testing.',
    evidenceToDecision:
      'Research patterns and 39 ideas moved the brief beyond waste toward a detachable head with visible day/night cues.',
    outcome:
      'The prototype refined head attachment and slider mechanics; multi-pellet dispensing and commercial, clinical, and environmental impact remained unvalidated.',
    sourceAnchors: ['#overview', '#situation', '#my-role', '#design-decision', '#outcome'],
  },
  'humanising-lt20-classic': {
    slug: 'humanising-lt20-classic',
    overview:
      'Operator evidence, ergonomics, and manufacturing constraints shaped a resolved CNC-lathe redesign.',
    problem:
      'The lathe needed to balance posture, guarding, service access, chip handling, manufacturing feasibility, and product-family identity.',
    contribution:
      'Shubham co-led research and ergonomics, owned sketching, 3D modelling, and rendering, and shared concept selection and major decisions.',
    evidenceToDecision:
      'A 14-response survey showed weaker appearance and reported strain; manufacturing constraints then favoured the retained-guard direction.',
    outcome:
      'The work produced native CAD, renders, engineering drawings, and an appearance model; production adoption and functional validation remain undocumented.',
    sourceAnchors: [
      '#overview',
      '#product-opportunity',
      '#my-role',
      '#concept-exploration-and-selection',
      '#outcome-and-reflection',
    ],
  },
  'dudhi-planters': {
    slug: 'dudhi-planters',
    overview:
      'A four-month engagement covered planter design, 3D-printed R&D, branding, manufacture, and catalogue release.',
    problem:
      'Dudhi Industries needed a distinct planter collection plus the identity and sales materials required to present it.',
    contribution:
      'As sole designer, Shubham owned product exploration, collection development, 3D-printed prototypes, brand identity, and sales materials.',
    outcome:
      'The collection was manufactured and sold with a released catalogue; sales figures and prototype counts are not documented.',
    sourceAnchors: ['#overview'],
  },
  'philips-life-shield': {
    slug: 'philips-life-shield',
    overview:
      'Emergency workflows, spatial constraints, ergonomics, and product research shaped a modular mobile-care proposal.',
    problem:
      'One mobile platform needed to bring diagnostic, monitoring, storage, and emergency-support equipment closer to patients and clinical teams.',
    contribution:
      'Shubham led research synthesis, workflow analysis, ergonomics, requirements, sketch exploration, CAD, feature definition, and final visualisation.',
    evidenceToDecision:
      'Journey maps, workflow evidence, cart observation, and measured spatial constraints drove a configurable mobile-platform concept.',
    outcome:
      'The result was a high-fidelity CAD proposal; no physical prototype, clinician evaluation, engineering validation, manufacture, or launch is evidenced.',
    sourceAnchors: [
      '#overview',
      '#design-challenge',
      '#my-role',
      '#decision-trail-title',
      '#outcome',
    ],
  },
  'nescafe-connected-coffee-mug': {
    slug: 'nescafe-connected-coffee-mug',
    overview:
      'Three sensory retail directions translated a connected mug into a tangible customer experience.',
    problem:
      'The connected mug needed a memorable retail expression joining product, identity, space, and sensory experience.',
    contribution:
      'Shubham developed three directions through mood boards, spatial and industrial-design sketches, 3D visualisation, and a five-senses framework.',
    evidenceToDecision:
      'The brief centred form, light, material, and sensory engagement, leading to three spatial directions mapped across five senses.',
    outcome:
      'The result was three visual concepts; no final design, installation, testing, approval, manufacture, rollout, or performance is documented.',
    sourceAnchors: [
      '#overview',
      '#the-retail-opportunity',
      '#my-role',
      '#decision-trail-title',
      '#outcome',
    ],
  },
  'prag-marketing-posters': {
    slug: 'prag-marketing-posters',
    overview: 'A one-month project created adaptable public-facing marketing posters for PRAG.',
    problem: 'PRAG needed posters adaptable across office walls, hoardings, and other print media.',
    contribution:
      'Shubham designed a coherent poster series, established a consistent layout, and worked with the printer to manage quality.',
    outcome:
      "Five posters were delivered and one of each installed at PRAG's office; formal client feedback is not documented.",
    sourceAnchors: ['#marketing-poster-series', '#print-production'],
  },
  'prag-articove-brochure': {
    slug: 'prag-articove-brochure',
    overview:
      'Product graphics, 3D renders, and a four-page A4 brochure were completed in one month.',
    problem:
      'PRAG needed updated graphics and marketing material for its onboard train water purifier.',
    contribution:
      'Shubham redesigned the graphics, updated the 3D model, rendered product views, designed the brochure, and prepared print files.',
    outcome:
      'The brochure was printed for PRAG marketing use; wider distribution, reception, and business impact are not documented.',
    sourceAnchors: ['#overview'],
  },
  'studio-portfolio-identity': {
    slug: 'studio-portfolio-identity',
    overview:
      'An evolving editorial system connects product design and photography without overpowering the work.',
    problem:
      'A multidisciplinary practice needed one identity for rigorous product work and expressive photography while keeping project imagery dominant.',
    contribution:
      'Shubham combined disciplined grids, compact navigation, atmospheric depth, and loose photographic gestures into one editorial system.',
    outcome:
      'The documented result is an evolving system across both disciplines; completion and audience impact are not documented.',
    sourceAnchors: ['#design-principles', '#process'],
  },
} as const satisfies Record<GuideProjectSlug, GuideProjectContent>;

export const guideCategories = [
  {
    id: 'digital-experience',
    prompt: 'Digital Experience',
    answer:
      'Healthcare, enterprise, and patient-facing product work shaped around complex workflows.',
  },
  {
    id: 'industrial-experience',
    prompt: 'Industrial Experience',
    answer:
      'Physical products, operational environments, ergonomics, and connected system concepts.',
  },
  {
    id: 'branding-and-identity',
    prompt: 'Brand, Identity & Retail',
    answer: 'Identity, print, product communication, and spatial retail concepts.',
  },
] as const satisfies readonly GuideCategoryGroup[];

export const guideDeliveryStages = [
  {
    id: 'delivered-or-realized',
    prompt: 'Delivered or realized work',
    answer: 'These projects reached implementation, manufacture, delivery, or print.',
    projectSlugs: [
      'font-readability-framework',
      'connection-customer-to-support',
      'dudhi-planters',
      'prag-marketing-posters',
      'prag-articove-brochure',
    ],
  },
  {
    id: 'ongoing',
    prompt: 'Ongoing work',
    answer: 'These are active directions, not finished outcomes.',
    projectSlugs: ['onex-healthcare-operations', 'studio-portfolio-identity'],
  },
  {
    id: 'prototypes',
    prompt: 'Prototypes',
    answer: 'These projects reached prototype form; their testing limits remain explicit.',
    projectSlugs: ['clinical-trial-discovery', 'fireflys', 'zero-brush'],
  },
  {
    id: 'concepts-and-proposals',
    prompt: 'Concepts and proposals',
    answer: 'These are shown for process and design thinking, not as launched products.',
    projectSlugs: [
      'provider-onboarding-system',
      'humanising-lt20-classic',
      'philips-life-shield',
      'nescafe-connected-coffee-mug',
    ],
  },
] as const satisfies readonly GuideDeliveryStageGroup[];

export const guideFeaturedProjects = {
  answer: 'These projects contain the fullest public process and decision trails.',
  initialProjectSlugs: [
    'connection-customer-to-support',
    'onex-healthcare-operations',
    'fireflys',
    'zero-brush',
  ],
  expandedProjectSlugs: [
    'connection-customer-to-support',
    'onex-healthcare-operations',
    'fireflys',
    'zero-brush',
    'font-readability-framework',
    'provider-onboarding-system',
    'humanising-lt20-classic',
    'philips-life-shield',
    'nescafe-connected-coffee-mug',
  ],
} as const satisfies GuideFeaturedProjects;

export const guideCapabilities = [
  {
    id: 'research-and-synthesis',
    prompt: 'Research and synthesis',
    answer:
      'These projects turn interviews, observations, surveys, or journey evidence into a clearer design direction.',
    projectSlugs: [
      'onex-healthcare-operations',
      'provider-onboarding-system',
      'clinical-trial-discovery',
      'zero-brush',
    ],
  },
  {
    id: 'workflow-and-service-systems',
    prompt: 'Workflow and service systems',
    answer:
      'These projects connect interface decisions to wider journeys, roles, handoffs, and operational systems.',
    projectSlugs: [
      'connection-customer-to-support',
      'onex-healthcare-operations',
      'clinical-trial-discovery',
      'philips-life-shield',
    ],
  },
  {
    id: 'digital-product-and-enterprise-ux',
    prompt: 'Digital product and enterprise UX',
    answer:
      'These projects address complex information, shared platforms, support workflows, and reusable interface patterns.',
    projectSlugs: [
      'connection-customer-to-support',
      'onex-healthcare-operations',
      'font-readability-framework',
      'clinical-trial-discovery',
    ],
  },
  {
    id: 'physical-prototyping-and-human-factors',
    prompt: 'Physical prototyping and human factors',
    answer:
      'These projects use ergonomics, physical modelling, CAD, mechanisms, or integration testing to make ideas tangible.',
    projectSlugs: ['fireflys', 'zero-brush', 'humanising-lt20-classic', 'philips-life-shield'],
  },
  {
    id: 'brand-visual-and-retail-experience',
    prompt: 'Brand, visual, and retail experience',
    answer:
      'These projects make products and practices easier to recognise through identity, print, spatial, and sensory design.',
    projectSlugs: [
      'nescafe-connected-coffee-mug',
      'dudhi-planters',
      'prag-marketing-posters',
      'prag-articove-brochure',
      'studio-portfolio-identity',
    ],
  },
  {
    id: 'evidence-changed-a-decision',
    prompt: 'Where evidence changed a decision',
    answer:
      'These case studies publish a direct trail from evidence to a design decision and its limits.',
    projectSlugs: [
      'connection-customer-to-support',
      'onex-healthcare-operations',
      'font-readability-framework',
      'provider-onboarding-system',
      'fireflys',
      'zero-brush',
      'humanising-lt20-classic',
      'philips-life-shield',
      'nescafe-connected-coffee-mug',
    ],
  },
] as const satisfies readonly GuideCapabilityGroup[];

export const guideTours = [
  {
    id: 'senior-ux-highlights',
    prompt: 'Senior UX highlights',
    answer:
      'Four examples of research, systems thinking, delivery, and multidisciplinary execution.',
    stops: [
      {
        projectSlug: 'connection-customer-to-support',
        reason: 'It shows a fragmented service problem moving through testing into implementation.',
      },
      {
        projectSlug: 'onex-healthcare-operations',
        reason: 'It shows platform-level systems thinking across complex healthcare workflows.',
      },
      {
        projectSlug: 'font-readability-framework',
        reason: 'It shows a small observed problem becoming a shipped design-system pattern.',
      },
      {
        projectSlug: 'fireflys',
        reason:
          'It shows research, hardware design, prototyping, and system integration in one project.',
      },
    ],
  },
  {
    id: 'healthcare-and-enterprise',
    prompt: 'Healthcare and enterprise',
    answer: 'Four ways complex healthcare information, workflows, and services became clearer.',
    stops: [
      {
        projectSlug: 'onex-healthcare-operations',
        reason:
          'It frames shared platform foundations without flattening specialised healthcare work.',
      },
      {
        projectSlug: 'connection-customer-to-support',
        reason: 'It connects an in-product workflow to the wider support service.',
      },
      {
        projectSlug: 'font-readability-framework',
        reason: 'It turns an observed technical-workflow problem into a shipped interface pattern.',
      },
      {
        projectSlug: 'clinical-trial-discovery',
        reason:
          'It makes complex eligibility and comparison information easier for patients and caregivers.',
      },
    ],
  },
  {
    id: 'physical-and-digital-range',
    prompt: 'Physical + digital range',
    answer: 'Four examples spanning hardware, interfaces, services, and spatial experience.',
    stops: [
      {
        projectSlug: 'fireflys',
        reason: 'It joins a flying prototype, sensor payload, and ground-control concept.',
      },
      {
        projectSlug: 'zero-brush',
        reason: 'It links behaviour, physical form, mechanism design, and formative testing.',
      },
      {
        projectSlug: 'connection-customer-to-support',
        reason: 'It represents implemented digital workflow and service-system design.',
      },
      {
        projectSlug: 'nescafe-connected-coffee-mug',
        reason: 'It translates a connected product into spatial and sensory retail directions.',
      },
    ],
  },
  {
    id: 'most-complete-decision-trails',
    prompt: 'Most complete decision trails',
    answer: 'Three concise paths from evidence to a decision, with documented limits.',
    stops: [
      {
        projectSlug: 'connection-customer-to-support',
        reason: 'It links customer correspondence and testing to an implemented support workflow.',
      },
      {
        projectSlug: 'font-readability-framework',
        reason: 'It links an observed workaround to a shipped typography framework.',
      },
      {
        projectSlug: 'zero-brush',
        reason:
          'It documents research, 39 ideas, physical prototypes, a small test, and unresolved limitations.',
      },
    ],
  },
] as const satisfies readonly GuideTour[];

export const guideAboutAnswers = [
  {
    id: 'working-approach',
    prompt: 'How does Shubham work?',
    answer:
      "He starts with people's contexts and constraints, makes ambiguity tangible through journeys and prototypes, then carries decisions through validation and implementation.",
    choices: ['See projects that show this', 'Open About', 'Another question'],
  },
  {
    id: 'domains',
    prompt: 'Which domains has he worked in?',
    answer:
      'Healthcare and enterprise UX, service operations, design systems, physical products, brand identity, retail concepts, and visual storytelling.',
    choices: ['Healthcare work', 'Physical product work', 'Brand and retail work', 'Open About'],
  },
  {
    id: 'ai-use',
    prompt: 'How does he use AI?',
    answer:
      'He uses AI for requirements, concept exploration, and workflow prototypes; research, clinical expertise, testing, and stakeholder review decide what advances.',
    choices: ['Open About: AI in practice', 'See digital work', 'Another question'],
  },
  {
    id: 'senior-ux-fit',
    prompt: 'Why might he fit a senior UX role?',
    answer:
      'He brings 7+ years of experience across research, systems thinking, visual craft, validation, and implementation, with current senior-level healthcare work.',
    choices: ['See Senior UX highlights', 'Open About', 'Contact Shubham'],
  },
  {
    id: 'contact',
    prompt: 'How can I contact him?',
    answer: 'Reach Shubham by email or phone, or through LinkedIn, Behance, Medium, and Instagram.',
    choices: ['Open Contact', 'Open About', 'Keep exploring'],
  },
] as const satisfies readonly GuideAboutAnswer[];

const findById = <Item extends { readonly id: string }>(items: readonly Item[], id: string) =>
  items.find((item) => item.id === id);

export const isGuideProjectSlug = (slug: string): slug is GuideProjectSlug =>
  Object.hasOwn(guideProjectContentBySlug, slug);

const hasCanonicalStatus = (project: Project): project is GuideCanonicalProject =>
  typeof project.status === 'string' && project.status.length > 0;

const resolveGuideProject = (content: GuideProjectContent): GuideProject => {
  const project = getCanonicalProject(content.slug);

  if (!project) {
    throw new Error(`Guide content references missing project "${content.slug}".`);
  }

  if (!hasCanonicalStatus(project)) {
    throw new Error(`Guide project "${content.slug}" must have a canonical public status.`);
  }

  return { content, project };
};

export const guideProjectsBySlug = Object.fromEntries(
  Object.values(guideProjectContentBySlug).map((content) => [
    content.slug,
    resolveGuideProject(content),
  ]),
) as Record<GuideProjectSlug, GuideProject>;

export const guideProjects = Object.values(guideProjectsBySlug);

export const getGuideProjectContent = (slug: string): GuideProjectContent | undefined =>
  isGuideProjectSlug(slug) ? guideProjectContentBySlug[slug] : undefined;

export const getGuideProject = (slug: string): GuideProject | undefined =>
  isGuideProjectSlug(slug) ? guideProjectsBySlug[slug] : undefined;

export const getGuideProjects = (slugs: readonly GuideProjectSlug[]): GuideProject[] =>
  slugs.map((slug) => guideProjectsBySlug[slug]);

export const getGuideProjectsByCategory = (category: ProjectCategorySlug): GuideProject[] =>
  guideProjects.filter(({ project }) => project.category === category);

export const getGuideCategory = (id: ProjectCategorySlug): GuideCategoryGroup | undefined =>
  findById(guideCategories, id);

export const getGuideDeliveryStage = (
  id: GuideDeliveryStageId,
): GuideDeliveryStageGroup | undefined => findById(guideDeliveryStages, id);

export const getGuideDeliveryStageProjects = (id: GuideDeliveryStageId): GuideProject[] => {
  const stage = getGuideDeliveryStage(id);
  return stage ? getGuideProjects(stage.projectSlugs) : [];
};

export const getGuideCapability = (id: GuideCapabilityId): GuideCapabilityGroup | undefined =>
  findById(guideCapabilities, id);

export const getGuideCapabilityProjects = (id: GuideCapabilityId): GuideProject[] => {
  const capability = getGuideCapability(id);
  return capability ? getGuideProjects(capability.projectSlugs) : [];
};

export const getGuideTour = (id: GuideTourId): GuideTour | undefined => findById(guideTours, id);

export const getGuideAboutAnswer = (id: GuideAboutAnswerId): GuideAboutAnswer | undefined =>
  findById(guideAboutAnswers, id);

export const getInitialGuideProjects = (slugs: readonly GuideProjectSlug[]): GuideProject[] =>
  getGuideProjects(slugs.slice(0, GUIDE_INITIAL_PROJECT_LIMIT));

export const formatGuideProjectOverview = ({ content, project }: GuideProject): string =>
  `${project.status} — ${content.overview}`;

export const hasGuideProjectEvidence = (
  content: GuideProjectContent,
): content is GuideProjectContent & { readonly evidenceToDecision: string } =>
  content.evidenceToDecision !== undefined;
