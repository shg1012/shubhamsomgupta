---
title: "Connection Customer to Support"
slug: "connection-customer-to-support"
category: "digital-experience"
summary: >-
  Integrating customer support into a clinical precision-medicine platform so users could find the right channel, preserve context, and begin resolving an issue without leaving their workflow.
proofLine: >-
  An implemented support workflow averaged under one minute across seven representative users.
overview: >-
  A four-week UX initiative that turned a fragmented support journey into an implemented, configurable in-product experience, validated with seven representative users.
year: "2022"
status: "Implemented"
featured: true
depth: "flagship"
theme: "cyan"
client: "IntelliSpace Precision Medicine"
role: "UX Designer"
timeline: "2 sprints · 4 weeks"
contribution: >-
  Designed the user and administrator support flows from research and prototyping through usability testing and implementation support, then shaped the later structured-email enhancement.
collaborators:
  - "Product Owner"
  - "Usability Designer"
  - "Engineering team"
methods:
  - "Stakeholder alignment"
  - "Customer-correspondence review"
  - "Heuristic and design-language review"
  - "Secondary research"
  - "Interaction design and prototyping"
  - "Timed usability testing"
evidenceToDecision:
  situation: >-
    Clinical-platform users could encounter an access issue without a clear in-product route to the right support team or channel.
  evidence: >-
    Customer correspondence, experience reviews, and support-pattern research exposed fragmented regional and product-specific routes and handoffs that lacked useful context.
  insight: >-
    Support needed to appear at the point of failure, route people to configured channels, and preserve enough product context for the receiving team to act.
  decision: >-
    Create a focused support bridge on the login and authenticated surfaces, backed by administrator-controlled contact and ticketing options, then structure the email handoff.
  artifact: >-
    Implemented login and in-product support panels, administrator configuration, and a later guided email workflow.
  outcome: >-
    The initial experience shipped in two sprints; seven representative users completed the tested workflow in under one minute on average, and the email enhancement followed approximately six months later.
tags:
  - "Customer Support"
  - "UX Design"
  - "User Research"
  - "Interaction Design"
  - "Design-System Alignment"
voiceOfCustomer:
  quote: |
    “The Doctor is unable to log in to the website. The website and log in screen opens up but continues to say is credentials are incorrect.”

    “I also called the support line number that was emailed to the group to see if they could offer any assistance. The lovely gentleman on the phone had no idea what I was speaking about.”
  source: "Customer support correspondence supplied in the project deck"
star:
  situation: >-
    Clinical-platform users could encounter an access issue without a clear in-product route to the right support team, phone number, email address, or ticketing channel.
  task: >-
    Design an in-workflow support experience for the login and application surfaces, together with administrator controls for configuring regional contact and ticketing options.
  action: >-
    Aligned the scope with stakeholders, reviewed the existing experience and design-language adoption, researched support patterns, mapped the flow, iterated from Bridge V1 to V2, and supported implementation and timed usability testing.
  result: >-
    The support experience and administrator configuration were implemented after two sprints. Seven representative users completed the support workflow in under one minute on average, and a structured email workflow was implemented approximately six months later.
hero:
  image: "./images/hero.webp"
  alt: "Conceptual illustration of customer-support paths integrated into a clinical software workspace."
metrics:
  - value: "7"
    label: "Representative users"
    qualification: "Timed usability testing"
  - value: "<1 min"
    label: "Average workflow completion"
    qualification: "Measured in user testing"
  - value: "2 sprints"
    label: "Initial delivery"
    qualification: "4 weeks"
seo:
  description: >-
    A 2022 UX case study about designing, testing, and implementing configurable in-workflow customer support for a clinical precision-medicine platform.
draft: false
order: 10
cardSize: "hero"
deviceMockup: "dashboard"
---

## Overview

IntelliSpace Precision Medicine brought several clinical applications into one platform for teams involved in cancer diagnosis, treatment planning, patient history, hospital communication, and document management. Its users included oncologists, radiologists, pathologists, and hospital administrators.

The product experience, however, did not provide a reliable route from a problem to the right support channel. This project introduced customer support at the points where users needed it, while giving administrators control over the contact information shown for each region and organisation.

## The challenge

A doctor opened the platform but could not log in. The interface offered no clear support path, so the doctor called a number shared with the wider group. The person who answered did not understand which product the doctor meant.

What looked like a login problem exposed a broader service gap: support information lived outside the workflow, routes varied by market and product, and the handoff did not consistently preserve enough context for the next team to act.

![Early product-team reference showing support entry points on the login and application surfaces.](./images/source-evidence/stakeholder-reference.webp "Stakeholder starting point: support needed to be accessible from both login and in-product contexts")

## My role

As the UX Designer, I worked across the initial two-sprint delivery and the later email enhancement.

- Conducted and documented research.
- Designed interactions, wireframes, flows, and prototypes.
- Reviewed the experience for heuristic and design-language alignment.
- Supported usability testing and implementation with the wider team.
- Supplied design assets and rationale for engineering delivery.

## Users and context

The experience served clinical specialists and hospital administrators working across a SaaS platform of connected applications. A support route needed to work both before sign-in and inside the authenticated product because an access issue could prevent users from reaching in-product help.

The solution also had two audiences: clinical-platform users seeking help and administrators maintaining the correct regional email addresses, phone numbers, and external ticketing channels.

## Constraints

- Deliver the initial experience in two sprints, or four weeks.
- Use established platform and design-language foundations rather than introduce a separate support product.
- Accommodate support channels that differed by market, region, and product.
- Make contact content configurable through the administrator experience.
- Adjust interaction details when technical feasibility or the delivery timeline changed.

![Scope organised across the two initial delivery sprints.](./images/source-evidence/sprint-scope.webp "Two-sprint scope covering user-facing support and administrator configuration")

## Discovery

I aligned the scope with stakeholders, reviewed the existing product experience, and examined how comparable software made help discoverable. The work combined customer correspondence, a heuristic review, design-language assessment, and secondary research into support placement and channel selection.

The review showed that users could face several possible contact routes, including region-specific phone support and separate ticketing channels. Without product-aware guidance inside the application, they could reach the wrong team or begin a support request without the context needed to resolve it.

![Research notes describing fragmented support channels and difficulty reaching the correct team.](./images/source-evidence/support-findings.webp "Support-channel findings used to define the problem")

![Examples reviewed to understand discoverability, placement, and different models for in-product help.](./images/source-evidence/secondary-research.webp "Secondary research into customer-support patterns")

## Key findings

- The platform did not expose support contact information or a clear way to begin creating a ticket.
- Available phone, email, and ticketing routes varied by region and product.
- Users could reach a general support line that lacked the necessary product context.
- Help needed to remain easy to find at the point of failure rather than become a full-screen interruption.
- A support handoff needed to carry structured product and system context, particularly when initiated through email.

## Workflow or information architecture

The information architecture separated self-help content from direct contact and ticketing routes. A persistent Help & Support entry point opened a focused panel, allowing users to review contact information, select the relevant region, or continue to a configured external support channel.

For the first release, the workflow was deliberately narrower than the long-term concept. It prioritised direct access to the right email address, regional phone number, and available ticketing channel.

![Early information architecture connecting help topics, direct contact, and ticketing routes.](./images/source-evidence/support-flow.webp "Support information architecture and channel routing")

![Help-menu exploration used to define the broader long-term structure.](./images/source-evidence/help-menu.webp "Exploration of a broader Help & Support menu {size=compact}")

## Design principles

- **Keep support in context.** Make help available from login and inside the platform.
- **Route instead of overwhelm.** Show only contact and ticketing options configured for the user’s context.
- **Preserve the handoff.** Carry enough product and system information for the receiving team to begin acting.
- **Build on familiar foundations.** Use established placement, interaction, and visual patterns to accelerate comprehension and delivery.

## Iterations and validation

The long-term proposal combined getting-started guidance, frequently asked questions, product information, direct contact, and ticketing routes in one Help & Support menu. The four-week implementation focused first on the smallest useful bridge between the user and the correct support channel.

![Long-term proposal combining self-help content and direct contact options.](./images/source-evidence/proposed-help-contact.webp "Proposed Help & Support structure for a future expanded experience")

Bridge V1 introduced an email link, a copy action, regional phone selection, and configured external ticketing links. It established the necessary hierarchy but carried more interaction detail than the delivery window could support.

![Annotated Bridge V1 exploration with email, regional phone, and ticket-channel behaviour.](./images/source-evidence/bridge-v1.webp "Bridge V1 interaction exploration")

Bridge V2 removed the copy control because of technical and timeline constraints, supported more than one configured email address, and retained the region and ticket-channel logic. This version moved into implementation.

![Annotated Bridge V2 showing the simplified implemented direction.](./images/source-evidence/bridge-v2.webp "Bridge V2 simplified after feasibility review")

Timed usability testing with seven representative clinical-platform users measured how quickly they could complete the support workflow. Average completion was under one minute.

## Final experience

The implemented support panel was available from both the login experience and the authenticated administrator portal. Users could see the relevant email address, select an available region to reveal the correct phone number, and continue to configured ticketing channels without first searching outside the product.

![Implemented support panel available from the login experience.](./images/source-evidence/implemented-login-support.webp "Implemented login-surface support experience")

![Implemented support panel within the administrator portal.](./images/source-evidence/implemented-admin-support.webp "Implemented in-product support experience")

Administrators could enable, add, remove, and edit support email addresses, regional phone numbers, defaults, and external ticketing channels. That configuration controlled which options appeared in the user-facing panel.

![Administrator controls for email, regional phone, and external ticket-channel configuration.](./images/source-evidence/support-configuration.webp "Implemented administrator configuration")

## Design-system alignment

The existing product screens reflected an earlier visual language. I reviewed the experience against the current design guidance and adapted the support interaction to established colour, typography, layout, and graphic-element foundations.

This was an alignment exercise rather than a claim of creating a new design system. Reusing existing patterns reduced design and engineering ambiguity while keeping the support experience consistent with the wider platform.

![Review of the existing interface against current design-language foundations.](./images/source-evidence/design-language-alignment.webp "Design-language assessment and alignment")

## Follow-up enhancement

Reviewing the end-to-end journey uncovered another gap: selecting an email address opened an unstructured message. Support teams received many emails each day, and inconsistent problem descriptions made requests harder to triage.

The follow-up solution introduced a defined email format with guided questions and automatically supplied system context. This workflow was implemented approximately six months after the initial in-product support release.

![Workflow findings that led to a structured support-email format.](./images/source-evidence/email-workflow-findings.webp "Gap identified after reviewing the email handoff")

![Implemented structured email workflow with guided and automatically supplied information.](./images/source-evidence/implemented-email-workflow.webp "Structured email workflow implemented as a follow-up enhancement")

## Outcome

The initial support experience and administrator configuration were implemented within two sprints. In timed usability testing, seven representative users completed the workflow in under one minute on average.

Approximately six months later, the structured email workflow was also implemented, extending the original experience from finding the correct channel to sending a more actionable request.

> Measured result: under one minute average completion across seven representative users during timed usability testing.

## Reflection

The project reinforced that a support entry point is only one part of the experience. Following the journey through contact selection, regional routing, ticket creation, and email handoff revealed issues that were invisible when each screen was reviewed in isolation.

It also showed the value of separating the long-term concept from the smallest useful implementation. The two-sprint bridge resolved the immediate access problem, while the later email enhancement improved the quality of the handoff without blocking the initial release.

## Credits

- Product Owner
- Usability Designer
- Engineering team
