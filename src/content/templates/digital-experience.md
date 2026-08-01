---
# Duplicate this file into src/content/projects/<project-slug>/index.md.
# Keep the folder name and slug identical. Use lowercase words separated by hyphens.
title: 'Project title'
slug: 'project-slug'
category: 'digital-experience'
summary: 'Short card summary. Keep this honest and concise.'
proofLine: 'Optional proof-oriented card line: name the credible change, evidence, or project output without repeating the summary.'
overview: 'Optional longer hero summary for the project page.'
year: '2026'
status: 'Concept, Prototype, MVP, Shipped, or another accurate status'
featured: false
depth: 'compact' # flagship or compact
theme: 'cyan' # cyan, blue, violet, magenta, slate
client: 'Client or organisation'
role: 'Your role'
timeline: 'Project timeline'
# Optional flagship context. Remove any field that the source material cannot support.
contribution: 'One sentence clarifying what you personally owned or contributed.'
collaborators:
  - 'Named person, role, or clearly documented team'
methods:
  - 'Research or design method actually used'
# Optional flagship summary. If included, keep all six entries and support them in the narrative.
evidenceToDecision:
  situation: 'The user, workflow, and product context before the work began.'
  evidence: 'The research, observation, data, or review input available to the project.'
  insight: 'The meaning drawn from that evidence, with limits kept explicit.'
  decision: 'The design or product direction chosen because of the insight.'
  artifact: 'The screen, flow, service, prototype, pattern, or system produced.'
  outcome: 'The verified result or clearly qualified concept, prototype, or project output.'
tags:
  - 'UX Strategy'
  - 'Research'
voiceOfCustomer:
  quote: 'A verified, anonymised, or clearly labelled synthesised customer statement.'
  source: 'Source or context, for example: Synthesised customer need from discovery research'
star:
  situation: 'The relevant customer, workflow, and product context before the work began.'
  task: 'The specific responsibility, decision, or design objective you owned.'
  action: 'The research, design, collaboration, and validation work you performed.'
  result: 'The evidenced outcome or clearly qualified project output.'
hero:
  image: './images/hero.webp'
  alt: 'Accessible description of the hero image.'
thumbnail:
  image: './images/thumbnail.webp'
  alt: 'Accessible description if the card image differs from the hero.'
metrics:
  - value: '0'
    label: 'Metric label'
    qualification: 'Project output, Prototype, Concept, or shipped outcome context'
seo:
  description: 'Search/social description. Do not overstate the work.'
draft: true
order: 999
cardSize: 'medium' # small, medium, wide, hero
deviceMockup: 'laptop' # laptop, phone, dual, dashboard, brand-system, product
---

<!-- Keep the customer statement evidence-based. Do not present invented wording as a direct quote. -->
<!-- Optional section images can be inserted anywhere between sections. Use @placeholder/case-study while drafting, replace it with ./images/your-file.webp when ready, or remove the whole image line. The quoted title becomes the visible caption. -->
<!-- For depth: flagship, keep the Situation -> Evidence -> Insight -> Design decision -> Artifact -> Outcome spine below. For depth: compact, retain only the few sections and images needed to understand the work. -->
<!-- The evidenceToDecision frontmatter is the scannable version of the story; the body should provide its supporting detail and boundaries. -->

## Situation

Describe the user, workflow, and product context before the work began.

### Users and context

Explain who the experience served and where it was used.

### Constraints

Name material constraints such as privacy, clinical risk, data quality, platform limits, timeline, or access.

## Evidence

Summarize the research, audits, workflow mapping, analytics, or stakeholder inputs that informed the work. State evidence limitations.

![Describe the research evidence](@placeholder/case-study 'Optional research evidence')

### Key evidence

- Evidence point one.
- Evidence point two.
- Evidence point three.

## Insight

Explain the meaning drawn from the evidence. Distinguish a research finding from an assumption, requirement, or design intent.

## Design decision

State what changed because of the insight and why this direction was chosen.

### Workflow or information architecture

Describe the system shape, navigation model, service handoff, or task flow.

![Describe the workflow or architecture](@placeholder/case-study 'Optional workflow or information architecture')

### Iteration and validation

Describe prototype rounds, critique, usability testing, or review loops. Do not imply shipped impact if the work was a concept.

## Artifact

Show and explain the resulting flow, interface, service, component, or system. Make its status explicit.

![Describe the resulting experience](@placeholder/case-study 'Optional final artifact')

### Accessibility

Note decisions related to language clarity, keyboard paths, contrast, state clarity, or content hierarchy, and say when no audit or validation occurred.

### Design-system contribution

Describe tokens, components, patterns, or guidelines only when they were part of the work.

## Outcome

State the verified result. For concepts and prototypes, name the artifact or learning and explicitly separate it from shipped or measured impact.

> Example callout: Keep metrics precise and distinguish evidence from design intent.

## Reflection

Name what the project changed in your design approach.

## Credits

List collaborators, clients, source material, or project ownership when appropriate.
