import { assetPath } from './assets';
import type { Project, ProjectCategorySlug } from '../types/portfolio';

export const projects: Project[] = [
  {
    slug: 'orchestrating-healthcare-workflows',
    title: 'Orchestrating Healthcare Workflows at Scale',
    category: 'digital-experience',
    shortDescription:
      'A connected digital experience that helps healthcare teams coordinate complex workflows, make informed decisions, and reduce operational friction.',
    overview:
      'A platform concept for making clinical operations more legible across teams, queues, priorities, and handoffs.',
    tags: ['Product Design', 'UX Strategy', 'Healthcare', 'Design Systems'],
    year: '2025',
    role: 'Lead UX Designer',
    client: 'Healthcare operations platform',
    duration: '12 weeks',
    status: 'Concept case study',
    thumbnail: assetPath('images/project-healthcare.svg'),
    thumbnailAlt: 'Dashboard mockup for a healthcare workflow platform.',
    heroImage: assetPath('images/project-healthcare.svg'),
    featured: true,
    cardSize: 'hero',
    theme: 'cyan',
    deviceMockup: 'dual',
    metrics: [
      { label: 'Workflow maps', value: '18' },
      { label: 'Prototype tasks', value: '42' },
      { label: 'Design system components', value: '64' },
    ],
    sections: [
      {
        title: 'Summary',
        body: 'The work explored how care teams could coordinate high-volume clinical operations without losing context between people, systems, and decisions.',
      },
      {
        title: 'Role and responsibilities',
        bullets: [
          'Led workflow discovery and translated operational findings into product principles.',
          'Designed the interaction model for queues, timeline states, and high-risk handoffs.',
          'Built a reusable component language for dense clinical information surfaces.',
        ],
      },
      {
        title: 'Problem or opportunity',
        body: 'Teams were switching between disconnected sources of truth, which made prioritisation and escalation feel reactive rather than deliberate.',
      },
      {
        title: 'Design principles',
        bullets: [
          'Make status visible before requiring investigation.',
          'Preserve context when moving between patient, task, and team views.',
          'Create calm density instead of hiding operational complexity.',
        ],
      },
      {
        title: 'Final solution',
        body: 'The proposed experience combined queue health, patient context, workflow timelines, and embedded decision support into one connected command surface.',
      },
      {
        title: 'Reflection',
        body: 'The most valuable design move was treating workflow transparency as a care quality feature, not only an operational efficiency feature.',
      },
    ],
  },
  {
    slug: 'clinical-trial-discovery',
    title: 'Helping Patients Find the Right Clinical Trials',
    category: 'digital-experience',
    shortDescription:
      'A patient-centred discovery experience designed to make complex eligibility information easier to understand.',
    overview:
      'A guided exploration pattern for patients and caregivers comparing clinical trial options.',
    tags: ['UX Research', 'Service Design', 'Clinical Trials', 'Accessibility'],
    year: '2025',
    role: 'Product Designer',
    client: 'Clinical research group',
    duration: '8 weeks',
    status: 'Prototype',
    thumbnail: assetPath('images/project-trials.svg'),
    thumbnailAlt: 'Laptop mockup showing a clinical trial discovery interface.',
    heroImage: assetPath('images/project-trials.svg'),
    featured: true,
    cardSize: 'wide',
    theme: 'magenta',
    deviceMockup: 'laptop',
    metrics: [
      { label: 'Research sessions', value: '9' },
      { label: 'Content patterns', value: '15' },
      { label: 'Prototype screens', value: '38' },
    ],
    sections: [
      {
        title: 'Context',
        body: 'Eligibility criteria, location constraints, and medical language can make trial discovery feel inaccessible at the exact moment people need reassurance.',
      },
      {
        title: 'Research',
        body: 'Interviews and journey mapping highlighted that patients wanted plain-language confidence before they were ready to compare technical protocol details.',
      },
      {
        title: 'Key insights',
        bullets: [
          'People need to understand why a trial may be relevant before they compare logistics.',
          'Eligibility should read like a conversation, not a legal filter.',
          'Caregivers often use the product differently than patients do.',
        ],
      },
      {
        title: 'Final solution',
        body: 'The experience paired guided matching, readable eligibility explanations, and saved comparison views to support a calmer decision journey.',
      },
    ],
  },
  {
    slug: 'care-operations-dashboard',
    title: 'Care Operations Command Center',
    category: 'digital-experience',
    shortDescription:
      'A dashboard system for monitoring care-team capacity, task risk, and service-level health.',
    overview:
      'A dense but readable command center designed for managers coordinating patient operations.',
    tags: ['Dashboard UX', 'Analytics', 'Operations', 'Healthcare'],
    year: '2024',
    role: 'UX Designer',
    client: 'Care delivery team',
    duration: '6 weeks',
    status: 'MVP',
    thumbnail: assetPath('images/project-command.svg'),
    thumbnailAlt: 'Analytics dashboard interface mockup.',
    heroImage: assetPath('images/project-command.svg'),
    cardSize: 'medium',
    theme: 'blue',
    deviceMockup: 'dashboard',
    sections: [
      {
        title: 'Opportunity',
        body: 'Operational leaders needed a faster way to see queue pressure, staff load, and intervention points before backlogs escalated.',
      },
      {
        title: 'Process',
        body: 'The concept was built from task audits, alert taxonomy work, and lightweight prototype reviews with operational stakeholders.',
      },
      {
        title: 'Outcomes or metrics',
        bullets: [
          'Reduced dashboard scanning paths from five views to two primary views.',
          'Introduced risk tiers for overdue and blocked tasks.',
        ],
      },
    ],
  },
  {
    slug: 'provider-onboarding-system',
    title: 'Provider Onboarding System',
    category: 'digital-experience',
    shortDescription:
      'A modular onboarding flow that helps providers complete setup while support teams track readiness.',
    tags: ['Onboarding', 'Information Architecture', 'Design Systems', 'SaaS'],
    year: '2024',
    role: 'UX Designer',
    client: 'Provider network',
    status: 'Pilot',
    thumbnail: assetPath('images/project-onboarding.svg'),
    thumbnailAlt: 'Provider onboarding product interface mockup.',
    heroImage: assetPath('images/project-onboarding.svg'),
    cardSize: 'small',
    theme: 'violet',
    deviceMockup: 'laptop',
    sections: [
      {
        title: 'Problem',
        body: 'A linear onboarding flow could not represent real setup work, where credentialing, training, integrations, and approvals move at different speeds.',
      },
      {
        title: 'Information architecture or workflow',
        body: 'The redesigned flow separated requirements into trackable workstreams with clear ownership, due dates, and support escalation.',
      },
    ],
  },
  {
    slug: 'factory-service-console',
    title: 'Factory Service Console',
    category: 'industrial-experience',
    shortDescription:
      'A tablet-first service console for technicians diagnosing equipment issues across noisy shop-floor conditions.',
    overview:
      'A service experience for triage, diagnostic guidance, and field documentation in industrial environments.',
    tags: ['Industrial UX', 'Field Research', 'Tablet UI', 'Service Design'],
    year: '2025',
    role: 'Experience Designer',
    client: 'Industrial equipment team',
    duration: '10 weeks',
    status: 'Prototype',
    thumbnail: assetPath('images/project-factory.svg'),
    thumbnailAlt: 'Industrial service tablet interface mockup.',
    heroImage: assetPath('images/project-factory.svg'),
    cardSize: 'wide',
    theme: 'cyan',
    deviceMockup: 'dashboard',
    metrics: [
      { label: 'Technician interviews', value: '11' },
      { label: 'Diagnostic paths', value: '24' },
      { label: 'Prototype rounds', value: '3' },
    ],
    sections: [
      {
        title: 'Context',
        body: 'Technicians needed diagnostic support that could survive glare, interruption, gloves, and incomplete equipment history.',
      },
      {
        title: 'Design principles',
        bullets: [
          'Prioritise glanceable system status.',
          'Make the next physical action unmistakable.',
          'Allow documentation to happen in fragments.',
        ],
      },
      {
        title: 'Final solution',
        body: 'The console combined fault timelines, guided checks, capture tools, and escalation notes in a tablet layout tuned for field use.',
      },
    ],
  },
  {
    slug: 'inspection-planning-toolkit',
    title: 'Inspection Planning Toolkit',
    category: 'industrial-experience',
    shortDescription:
      'A planning and reporting tool for teams preparing site inspections, issue logs, and follow-up actions.',
    tags: ['Workflow Design', 'Planning', 'Reporting', 'Operations'],
    year: '2024',
    role: 'UX Designer',
    client: 'Facilities operations',
    status: 'Concept',
    thumbnail: assetPath('images/project-inspection.svg'),
    thumbnailAlt: 'Inspection planning interface mockup.',
    heroImage: assetPath('images/project-inspection.svg'),
    cardSize: 'medium',
    theme: 'blue',
    deviceMockup: 'laptop',
    sections: [
      {
        title: 'Problem or opportunity',
        body: 'Inspection teams were using separate spreadsheets, photo folders, and emails to prepare visits and track unresolved findings.',
      },
      {
        title: 'Final solution',
        body: 'A unified planning board connected checklists, site context, capture templates, and follow-up status into one repeatable system.',
      },
    ],
  },
  {
    slug: 'connected-maintenance-map',
    title: 'Connected Maintenance Map',
    category: 'industrial-experience',
    shortDescription:
      'A spatial planning concept for understanding assets, recurring faults, and maintenance priority across facilities.',
    tags: ['Spatial UX', 'Asset Mapping', 'Systems Design', 'Prototype'],
    year: '2023',
    role: 'Product Designer',
    client: 'Maintenance operations',
    status: 'Exploration',
    thumbnail: assetPath('images/project-maintenance.svg'),
    thumbnailAlt: 'Maintenance mapping interface mockup.',
    heroImage: assetPath('images/project-maintenance.svg'),
    cardSize: 'small',
    theme: 'slate',
    deviceMockup: 'dashboard',
    sections: [
      {
        title: 'Research',
        body: 'Stakeholder sessions showed that location, recurrence, and severity needed to be understood together rather than as separate reports.',
      },
      {
        title: 'Concepts and iterations',
        body: 'Early iterations tested map-first, list-first, and split-pane models before landing on a layered planning interface.',
      },
    ],
  },
  {
    slug: 'adaptive-care-identity',
    title: 'Adaptive Care Identity System',
    category: 'branding-and-identity',
    shortDescription:
      'A flexible identity system for a healthcare product suite spanning patient, provider, and operations touchpoints.',
    overview:
      'A brand language that balances clinical trust, digital clarity, and enough warmth for patient-facing moments.',
    tags: ['Brand Strategy', 'Identity Design', 'Healthcare', 'Guidelines'],
    year: '2025',
    role: 'Design Lead',
    client: 'Healthcare product suite',
    duration: '7 weeks',
    status: 'Guidelines',
    thumbnail: assetPath('images/project-identity.svg'),
    thumbnailAlt: 'Brand identity system boards and interface mockups.',
    heroImage: assetPath('images/project-identity.svg'),
    cardSize: 'wide',
    theme: 'magenta',
    deviceMockup: 'brand-system',
    metrics: [
      { label: 'Core tokens', value: '32' },
      { label: 'Templates', value: '14' },
      { label: 'Launch channels', value: '6' },
    ],
    sections: [
      {
        title: 'Summary',
        body: 'The system gave product, marketing, and clinical communications a shared visual grammar while preserving room for context-specific tone.',
      },
      {
        title: 'Design-system contribution',
        body: 'Colour roles, type hierarchy, illustration rules, and layout templates were translated into reusable design tokens and starter files.',
      },
      {
        title: 'Reflection',
        body: 'The strongest identity systems are not just recognizable; they make future decisions easier for every team that touches them.',
      },
    ],
  },
  {
    slug: 'clinical-launch-system',
    title: 'Clinical Launch System',
    category: 'branding-and-identity',
    shortDescription:
      'A launch toolkit for a clinical service, including messaging hierarchy, presentation patterns, and digital assets.',
    tags: ['Creative Direction', 'Launch Design', 'Content Systems', 'Healthcare'],
    year: '2024',
    role: 'Visual Designer',
    client: 'Clinical services team',
    status: 'Launch toolkit',
    thumbnail: assetPath('images/project-launch.svg'),
    thumbnailAlt: 'Clinical launch campaign identity mockup.',
    heroImage: assetPath('images/project-launch.svg'),
    cardSize: 'medium',
    theme: 'violet',
    deviceMockup: 'brand-system',
    sections: [
      {
        title: 'Context',
        body: 'The launch needed to explain a nuanced service clearly to internal teams, partners, and patient-facing support groups.',
      },
      {
        title: 'Final solution',
        body: 'A modular messaging and visual system helped teams build consistent decks, one-pagers, social assets, and service explainers.',
      },
    ],
  },
  {
    slug: 'studio-portfolio-identity',
    title: 'Studio Portfolio Identity',
    category: 'branding-and-identity',
    shortDescription:
      'An editorial identity direction for a multidisciplinary creative practice balancing product work and photography.',
    tags: ['Editorial Design', 'Art Direction', 'Portfolio Systems', 'Web'],
    year: '2023',
    role: 'Independent Designer',
    client: 'Personal system',
    status: 'In progress',
    thumbnail: assetPath('images/project-studio.svg'),
    thumbnailAlt: 'Editorial portfolio identity mockup.',
    heroImage: assetPath('images/project-studio.svg'),
    cardSize: 'small',
    theme: 'slate',
    deviceMockup: 'brand-system',
    sections: [
      {
        title: 'Design principles',
        bullets: [
          'Let project imagery carry the voice.',
          'Use atmospheric depth without reducing readability.',
          'Keep navigation compact and always close at hand.',
        ],
      },
      {
        title: 'Process',
        body: 'The system began as a visual exploration of contrast: rigorous interface grids against loose photographic and hand-drawn gestures.',
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

export const getProjectsByCategory = (category: ProjectCategorySlug) =>
  projects.filter((project) => project.category === category);

export const getFeaturedProject = () => projects.find((project) => project.cardSize === 'hero');

export const getSecondaryFeaturedProject = () =>
  projects.find((project) => project.slug === 'clinical-trial-discovery');
