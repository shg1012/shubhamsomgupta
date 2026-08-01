---
# Duplicate this file into src/content/projects/<project-slug>/index.md.
title: 'Project title'
slug: 'project-slug'
category: 'industrial-experience'
summary: 'Short card summary.'
proofLine: 'Optional proof-oriented card line naming the credible prototype, design resolution, test result, or qualified output.'
overview: 'Optional longer hero summary.'
year: '2026'
status: 'Concept, Prototype, Pilot, or Shipped'
featured: false
depth: 'compact'
theme: 'blue'
client: 'Client or organisation'
role: 'Your role'
timeline: 'Project timeline'
# Optional flagship context. Remove any field that the source material cannot support.
contribution: 'One sentence clarifying what you personally owned or contributed.'
collaborators:
  - 'Named person, role, or clearly documented team'
methods:
  - 'Research, design, engineering, or validation method actually used'
# Optional flagship summary. If included, keep all six entries and support them in the narrative.
evidenceToDecision:
  situation: 'The operational environment, workflow, and physical constraints before the work began.'
  evidence: 'The field research, product analysis, measurement, test, or stakeholder input available.'
  insight: 'The human-factor, system, or engineering meaning drawn from the evidence.'
  decision: 'The industrial-design direction chosen because of the insight and constraints.'
  artifact: 'The sketch, CAD model, mock-up, prototype, specification, or product produced.'
  outcome: 'The verified result or clearly qualified concept, prototype, or project output.'
tags:
  - 'Industrial UX'
  - 'Field Research'
voiceOfCustomer:
  quote: 'A verified, anonymised, or clearly labelled synthesised customer statement.'
  source: 'Source or context, for example: Synthesised operator need from field research'
star:
  situation: 'The operational environment, workflow, and constraints before the work began.'
  task: 'The specific industrial-design or experience objective you owned.'
  action: 'The field research, design, prototyping, and validation work you performed.'
  result: 'The evidenced outcome or clearly qualified concept or prototype output.'
hero:
  image: './images/hero.webp'
  alt: 'Accessible description of the hero image.'
metrics:
  - value: '0'
    label: 'Metric label'
    qualification: 'Project output, Prototype, Concept, or shipped outcome context'
seo:
  description: 'Search/social description.'
draft: true
order: 999
cardSize: 'medium'
deviceMockup: 'dashboard'
---

<!-- Keep the customer statement evidence-based. Do not present invented wording as a direct quote. -->
<!-- Optional section images can be inserted anywhere between sections. Use @placeholder/case-study while drafting, replace it with ./images/your-file.webp when ready, or remove the whole image line. The quoted title becomes the visible caption. -->
<!-- For depth: flagship, keep the Situation -> Evidence -> Insight -> Design decision -> Artifact -> Outcome spine below. For depth: compact, retain only the few sections and images needed to understand the work. -->
<!-- The evidenceToDecision frontmatter is the scannable version of the story; the body should provide its supporting detail and validation boundaries. -->

## Situation

Describe the operational environment, workflow, product baseline, and physical opportunity.

### Users, environment, and constraints

Describe operators, technicians, service teams, facilities, or other users. Include realities such as reach, posture, glare, noise, gloves, interruption, connectivity, safety, manufacturing, and service access.

## Evidence

Summarize observed workflows, interviews, audits, measurements, product analysis, tests, or site inputs. State evidence limitations.

![Describe the field evidence](@placeholder/case-study 'Optional field-research or product-analysis visual')

### Human factors and ergonomics

Explain what the evidence established about visibility, reach, posture, cognitive load, physical context, or maintenance.

## Insight

State the design meaning drawn from the field, human-factor, system, and engineering evidence.

## Design decision

Explain which direction moved forward, why it fit the evidence and constraints, and what remains an assumption.

### Concept exploration and selection

Show the alternatives and the rationale for choosing or developing one direction.

![Describe the concept exploration](@placeholder/case-study 'Optional concept exploration')

### Physical and digital interaction

Describe how interfaces, controls, feedback, and physical work relate.

### Materials and manufacturing

Use only when relevant. Explain material, assembly, fabrication, service, transport, or cost decisions without overstating feasibility.

## Artifact

Describe and show the resulting model, prototype, product, specification, or service artifact. Make its fidelity and status explicit.

![Describe the resulting artifact](@placeholder/case-study 'Optional final product or prototype')

### Prototyping and validation

Describe fidelity, what was tested, how it was evaluated, and which claims remain unvalidated.

## Outcome

State the verified result. Label project outputs, prototype results, concepts, pilots, and shipped outcomes precisely; do not infer safety, ergonomic, manufacturing, clinical, or commercial impact.

> Example callout: A useful constraint often becomes a design principle.

## Reflection

Name what you learned from the environment, users, or system.

## Credits

List collaborators, source material, or project ownership.
