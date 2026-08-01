# Andrew Arquines portfolio review

**Reviewed:** 28 July 2026
**Purpose:** Identify original, evidence-based improvements for Shubham S. Gupta's design portfolio. This is a structural and content-pattern review, not a request to copy visual styling, wording, metrics, or case-study claims.

## Executive takeaways

Andrew Arquines' portfolio is most persuasive when it quickly establishes three things: the type of designer he is, the outcomes attached to selected work, and the evidence behind a featured case study. Its strongest transferable pattern is a tight sequence of **positioning -> selected work -> evidence-led case study**.

Shubham's site already has a stronger content foundation for responsible portfolio publishing: category-led work streams, confidentiality-aware case studies, qualified metrics, Markdown-authored long-form pages, and previous/next project navigation. The highest-value improvement is therefore not a visual overhaul. It is to make the homepage's first screen and the flagship-project cards communicate the work's *decision, contribution, and credible outcome* more immediately.

## First-party page inventory

The site was crawled by following public first-party links from the home page and discovered case-study navigation. The rendering service could not retrieve every route directly, so the inventory distinguishes inspected pages from linked-but-not-inspected routes. No authentication was used.

| Route | Status | Observed purpose and pattern |
| --- | --- | --- |
| [Home](https://www.andrewarquines.com/) | Inspected | A personal positioning statement, four selected-work previews, an impact strip, responsibilities/skills, employment history, a testimonial, and a contact prompt. Current copy positions Andrew as a senior product/UX designer and labels work previews with outcome-oriented phrases such as “Data-based UX” and “0-1 Design System.” |
| [About](https://www.andrewarquines.com/about) | Inspected | Personal narrative with career-interest statement, availability cue, personal photographs, short “fun facts,” and interests. It deliberately humanises the professional profile. |
| [Cirkul Homepage](https://www.andrewarquines.com/cirkul-homepage) | Inspected | A compact commerce-redesign case study: scope/client/duration/year, overview, challenge, solution, conclusion, result metrics, live-site link, and enquiry form. |
| [PODS pre-quote UX](https://www.andrewarquines.com/pods-prequote-ux) | Inspected | A deep research case study organised around context, brief, design, results, and outcomes. It exposes role/duration/tools/team, strategic questions, approach, insights, design shifts, artifacts, and links to adjacent case studies. |
| [SKILLZ](https://www.andrewarquines.com/skillz) | Inspected | A platform-redesign case study with role, duration, tools, collaborators, outcome metrics, project brief, research/design narrative, and section navigation. |
| [Cirkul design system](https://www.andrewarquines.com/cirkul-design-system) | Publicly linked, not retrieved | Presented from the home-page work grid as a “0-1 Design System” project. The route was linked but the renderer returned a cache-miss error. |
| [Work](https://www.andrewarquines.com/work) | Publicly linked, not retrieved | Global navigation route; the renderer could not retrieve it separately. |
| [Contact](https://www.andrewarquines.com/contact) | Publicly linked, not retrieved | Global navigation route; the renderer could not retrieve it separately. |
| [Andrew](https://www.andrewarquines.com/andrew) | Publicly linked, not retrieved | Appears in a case-study navigation state; the renderer could not retrieve it separately. |

## What works well

### 1. The work labels combine a design problem with a consequence

The home page does not merely title cards “Project A” or “Website redesign.” Its preview labels indicate the type of intervention and why it mattered (for example, data-based UX, a new design system, or reduced cognitive load). This gives a recruiter a reason to open a case study before reading the body copy. [Home](https://www.andrewarquines.com/)

**Implication for Shubham:** Keep the existing project names, but add one short, truthful proof-oriented subline on the primary two cards. For example: “OneX — making high-stakes operations easier to coordinate” or “Provider onboarding — reducing ambiguity across a complex service handoff.” Use only language that is supported by the case study; do not manufacture outcome claims.

### 2. The featured work makes the author’s contribution and context scannable

The Cirkul page places scope, client, duration, and year before the narrative. The PODS and SKILLZ pages additionally identify role, collaborators, and tools. This reduces the common reviewer question: “What did this designer personally own?” [Cirkul Homepage](https://www.andrewarquines.com/cirkul-homepage), [PODS pre-quote UX](https://www.andrewarquines.com/pods-prequote-ux), [SKILLZ](https://www.andrewarquines.com/skillz)

**Implication for Shubham:** The existing project summary already has year, role, organisation, and timeline. Add a concise **Contribution** field or a one-sentence “I led / I contributed” statement, plus a conditional **Collaborators** or **Methods** field for flagship studies. Keep it optional so confidential or compact projects remain honest and uncluttered.

### 3. Its strongest case study exposes the chain from evidence to decision

The PODS study frames a research question, describes its behavioural and qualitative inputs, draws out named insights, and then shows the strategic direction and artifacts. That makes the work legible as reasoning, rather than a gallery of polished screens. [PODS pre-quote UX](https://www.andrewarquines.com/pods-prequote-ux)

**Implication for Shubham:** Make this evidence-to-decision chain the standard for the existing `depth: flagship` template: **situation -> evidence -> insight -> design decision -> artifact/outcome**. Shubham's healthcare and service-systems work is particularly well suited to this approach. Preserve the distinction between research findings, prototype evidence, launch outcomes, and concept work.

### 4. A small amount of personal material makes the About page memorable

Andrew pairs professional positioning with photographs and interests. The content creates a person behind the role without replacing the work. [About](https://www.andrewarquines.com/about)

**Implication for Shubham:** The existing photography section is a more distinctive and portfolio-relevant version of this idea. Bring one image or a restrained “outside work” cue closer to the About-page introduction, while keeping the page centred on systems thinking, healthcare, and design practice.

### 5. Adjacent-project links encourage a deliberate review path

The PODS page links to its previous and next projects. Shubham already has this, including a project count and return path to the category; retain it and ensure all case-study pages have useful adjacent projects. [PODS pre-quote UX](https://www.andrewarquines.com/pods-prequote-ux)

## What to avoid copying

- **Unqualified aggregate metrics.** Andrew's home and Cirkul pages foreground large session, revenue, and sales figures. For Shubham, display a metric only when its unit, attribution, time frame, and confidentiality status are clear. Existing qualified metrics are a strength to protect.
- **A long lead-in before the evidence.** The most effective source page reaches the brief and core insights early. Flagship pages should give the reader a short executive summary and a clear table of contents before detailed process material.
- **Visual repetition that becomes content repetition.** Several source pages expose duplicated text/content in the rendered document. Even if caused by animation or responsive layers, this is a reminder to validate semantic output, keyboard navigation, and reduced-motion behaviour—not just screenshots.
- **A sales-agency contact form by default.** The reference site asks for service type and budget. Shubham's portfolio is better served by a low-friction recruiter/collaborator contact path, unless offering consulting is an explicit goal.

## Recommended backlog for Shubham's portfolio

1. **Homepage, high impact:** Add a one-line proof-oriented descriptor below each of the two featured-project titles. Keep it evidence-backed and confidentiality-safe.
2. **Flagship case-study template, high impact:** Add optional frontmatter and rendering for contribution, collaborators/methods, and an “evidence to decision” summary near the hero.
3. **Flagship reading experience, medium impact:** Provide a concise “At a glance” block and ensure the existing table of contents follows the substantive story sections, not decorative headings.
4. **About page, medium impact:** Integrate a restrained photography or personal-practice cue alongside the current professional narrative, with accessible alt text.
5. **Quality guardrail, medium impact:** Before publishing, test long case studies at mobile width, by keyboard, and with reduced motion; verify no duplicated content is exposed to assistive technology.

## Source notes

All competitor observations above come from the portfolio owner's public first-party site, reviewed 28 July 2026:

- [Andrew Arquines home](https://www.andrewarquines.com/)
- [Andrew Arquines about](https://www.andrewarquines.com/about)
- [Cirkul Homepage case study](https://www.andrewarquines.com/cirkul-homepage)
- [PODS pre-quote UX case study](https://www.andrewarquines.com/pods-prequote-ux)
- [SKILLZ case study](https://www.andrewarquines.com/skillz)
- [Cirkul design-system route](https://www.andrewarquines.com/cirkul-design-system) (linked but not retrieved during this review)
