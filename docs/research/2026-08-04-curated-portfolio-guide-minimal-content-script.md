# Curated portfolio guide: minimal content script

- **Proposed:** 4 August 2026
- **Status:** Content design for review; no site implementation yet
- **Experience label:** Guided portfolio
- **Optional name:** Ask the Archive
- **Source boundary:** Published portfolio content only
- **Architecture:** [Conversation architecture](./2026-08-04-curated-portfolio-guide-conversation-architecture.md)

## Content direction

The guide should give the gist, then let the visitor decide whether to go deeper.

- One prepared answer per screen.
- One sentence for most answers.
- Two to four next choices.
- Exact public project status always visible.
- A source or full-project link wherever a claim is made.
- No free-text field, simulated typing, or “Ask me anything.”

The guide speaks in a neutral editorial voice. It can quote Shubham's published first-person writing, but it should not pretend to be an autonomous version of him.

## Full-project handoff and exact return state

Yes—the visitor can open the complete project without losing their place in the guide.

### Default behavior

1. The visitor selects **Open full project**.
2. The guide saves the exact current node, previous steps, selected category, project, question, tour position, scroll position, and focused control in the browser session.
3. The full case study opens in the same tab at the most relevant section.
4. The case-study page shows **Resume guide · [project]** with a smaller context line: **Return to “[question]”**.
5. Selecting it—or using browser Back—restores the same prepared answer and guide history.

If the visitor deliberately opens the case study in a new tab, the original guide tab simply remains at the same state. Cross-tab synchronization is unnecessary.

### Handoff copy

| Moment              | Copy                                                            |
| ------------------- | --------------------------------------------------------------- |
| Guide action        | **Open full project**                                           |
| Source action       | **Read the supporting section**                                 |
| Project-page return | **Resume guide · {project title}**                              |
| Return context      | **Return to “{current question}”**                              |
| Expired saved state | **The guide changed since your last visit. Choose a new path.** |
| Recovery actions    | **Guide Home** · **Browse this project**                        |

## Persistent interface copy

| Element                | Copy                                                            |
| ---------------------- | --------------------------------------------------------------- |
| New-session launcher   | **Explore with the guide**                                      |
| Saved-session launcher | **Resume your guide**                                           |
| Guide eyebrow          | **Scripted portfolio guide**                                    |
| Disclosure             | **Prepared questions and evidence-linked answers—not live AI.** |
| Back                   | **Back**                                                        |
| Main topics            | **Guide Home**                                                  |
| Reset                  | **Start over**                                                  |
| Exit                   | **Close guide**                                                 |
| About the system       | **About this guide**                                            |

### About this guide

**Prepared answer:** Every answer was written in advance from Shubham's published portfolio. Nothing is generated, and your choices are not sent to an AI service.

**Next choices:** **Continue** · **Guide Home** · **Close guide**

### Start-over confirmation

**Heading:** Start again?

**Prepared answer:** Your current guide path will be cleared in this tab.

**Actions:** **Start again** · **Keep exploring**

## Welcome and Guide Home

### Welcome

**Heading:** What would you like to understand?

**Prepared answer:** Choose a short path through the work. Every answer can lead to the complete case study.

**Choices:**

- **Give me a 3-minute tour**
- **Browse project categories**
- **Find work by capability**
- **Tell me about Shubham**
- **Browse the portfolio normally**

### Give me a 3-minute tour

**Prepared answer:** Choose a focus. Each tour contains three or four short project stops.

**Choices:**

- **Senior UX highlights**
- **Healthcare and enterprise**
- **Physical + digital range**
- **Most complete decision trails**

### Browse project categories

**Prepared answer:** Browse 14 projects by category, delivery stage, case-study depth, or comparison.

**Choices:**

- **Choose a category**
- **Choose a delivery stage**
- **Show featured case studies**
- **Compare two projects**

### Find work by capability

**Prepared answer:** Choose what you want evidence of. The guide will show the most relevant published projects.

**Choices:**

- **Research and synthesis**
- **Workflow and service systems**
- **Digital product and enterprise UX**
- **Physical prototyping and human factors**
- **Brand, visual, and retail experience**
- **Where evidence changed a decision**

Show the first four choices, followed by **More capabilities** for the remaining two.

### Tell me about Shubham

**Prepared answer:** Choose a brief view of his practice, experience, or working approach.

**Choices:**

- **How does Shubham work?**
- **Which domains has he worked in?**
- **How does he use AI?**
- **Why might he fit a senior UX role?**
- **How can I contact him?**

### Browse the portfolio normally

This action returns directly to the page from which the guide opened. It does not need an interstitial answer, and the guide state remains available through **Resume your guide**.

## Quick-tour content

### Tour definitions

| Prompt                            | Prepared answer                                                                         | Project sequence                                                                              |
| --------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Senior UX highlights**          | Four examples of research, systems thinking, delivery, and multidisciplinary execution. | Connection Customer to Support → OneX → Font Readability Framework → FireFlys                 |
| **Healthcare and enterprise**     | Four ways complex healthcare information, workflows, and services became clearer.       | OneX → Connection Customer to Support → Font Readability Framework → Clinical Trial Discovery |
| **Physical + digital range**      | Four examples spanning hardware, interfaces, services, and spatial experience.          | FireFlys → Zero Brush → Connection Customer to Support → Nescafé Connected Coffee Mug         |
| **Most complete decision trails** | Three concise paths from evidence to a decision, with documented limits.                | Connection Customer to Support → Font Readability Framework → Zero Brush                      |

### Why each project is in a tour

| Tour                          | Project                        | Prepared answer for **Why this project?**                                                       |
| ----------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------- |
| Senior UX highlights          | Connection Customer to Support | It shows a fragmented service problem moving through testing into implementation.               |
| Senior UX highlights          | OneX                           | It shows platform-level systems thinking across complex healthcare workflows.                   |
| Senior UX highlights          | Font Readability Framework     | It shows a small observed problem becoming a shipped design-system pattern.                     |
| Senior UX highlights          | FireFlys                       | It shows research, hardware design, prototyping, and system integration in one project.         |
| Healthcare and enterprise     | OneX                           | It frames shared platform foundations without flattening specialised healthcare work.           |
| Healthcare and enterprise     | Connection Customer to Support | It connects an in-product workflow to the wider support service.                                |
| Healthcare and enterprise     | Font Readability Framework     | It turns an observed technical-workflow problem into a shipped interface pattern.               |
| Healthcare and enterprise     | Clinical Trial Discovery       | It makes complex eligibility and comparison information easier for patients and caregivers.     |
| Physical + digital range      | FireFlys                       | It joins a flying prototype, sensor payload, and ground-control concept.                        |
| Physical + digital range      | Zero Brush                     | It links behaviour, physical form, mechanism design, and formative testing.                     |
| Physical + digital range      | Connection Customer to Support | It represents implemented digital workflow and service-system design.                           |
| Physical + digital range      | Nescafé Connected Coffee Mug   | It translates a connected product into spatial and sensory retail directions.                   |
| Most complete decision trails | Connection Customer to Support | It links customer correspondence and testing to an implemented support workflow.                |
| Most complete decision trails | Font Readability Framework     | It links an observed workaround to a shipped typography framework.                              |
| Most complete decision trails | Zero Brush                     | It documents research, 39 ideas, physical prototypes, a small test, and unresolved limitations. |

### Tour controls

| Prompt                | Prepared response or behavior                                 |
| --------------------- | ------------------------------------------------------------- |
| **Why this project?** | Use the relevant one-sentence reason above.                   |
| **Next project**      | Open the next tour stop and update **2 of 4**-style progress. |
| **Previous project**  | Return to the prior stop without leaving the tour.            |
| **Open full project** | Save the current tour stop and open the complete case study.  |
| **Leave this tour**   | Return to the four quick-tour choices.                        |

### End of tour

**Heading:** That's the tour.

**Prepared answer:** Open one project in full, compare two, or choose another path.

**Choices:** **Open a project** · **Compare two** · **Choose another tour** · **Guide Home**

## Project browsing content

### Choose a category

**Prepared answer:** Choose one of the portfolio's three project categories.

| Prompt                       | Prepared answer                                                                          |
| ---------------------------- | ---------------------------------------------------------------------------------------- |
| **Digital Experience**       | Healthcare, enterprise, and patient-facing product work shaped around complex workflows. |
| **Industrial Experience**    | Physical products, operational environments, ergonomics, and connected system concepts.  |
| **Brand, Identity & Retail** | Identity, print, product communication, and spatial retail concepts.                     |

After a category is selected, show its project cards using the **Overview** lines in the project answer bank below.

### Choose a delivery stage

**Prepared answer:** Choose the kind of project maturity you want to see. Exact public status remains visible on every result.

| Prompt                         | Prepared answer                                                              | Included projects                                                                                                          |
| ------------------------------ | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Delivered or realized work** | These projects reached implementation, manufacture, delivery, or print.      | Font Readability Framework; Connection Customer to Support; Dudhi Planters; PRAG Marketing Posters; PRAG Articove Brochure |
| **Ongoing work**               | These are active directions, not finished outcomes.                          | OneX; Studio Portfolio Identity                                                                                            |
| **Prototypes**                 | These projects reached prototype form; their testing limits remain explicit. | Clinical Trial Discovery; FireFlys; Zero Brush                                                                             |
| **Concepts and proposals**     | These are shown for process and design thinking, not as launched products.   | Royal Coffee; Humanising LT-20 Classic; Philips Life Shield; Nescafé Connected Coffee Mug                                  |

### Show featured case studies

**Prepared answer:** These projects contain the fullest public process and decision trails.

Show four first: **Connection Customer to Support** · **OneX** · **FireFlys** · **Zero Brush**

**Next choices:** **Show all featured case studies** · **Choose a category** · **Compare two**

The expanded set also includes Font Readability Framework, Royal Coffee, Humanising LT-20 Classic, Philips Life Shield, and Nescafé Connected Coffee Mug.

### Compare two projects

**Prepared answer:** Choose two projects. The guide will compare status, problem, contribution, evidence, and outcome without treating concepts as shipped work.

After the first choice: **Now choose a second project.**

Comparison heading: **{first project} and {second project}, side by side.**

The comparison reuses the five fields in the project answer bank. It does not require bespoke copy for every project pair.

**Next choices:** **Open first project** · **Open second project** · **Change comparison** · **Guide Home**

## Capability content

Each capability response is followed by project cards built from the shared overview lines.

| Prompt                                     | Prepared answer                                                                                                      | Initial project set                                                                                                                                                               |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Research and synthesis**                 | These projects turn interviews, observations, surveys, or journey evidence into a clearer design direction.          | OneX; Royal Coffee; Clinical Trial Discovery; Zero Brush                                                                                                                          |
| **Workflow and service systems**           | These projects connect interface decisions to wider journeys, roles, handoffs, and operational systems.              | Connection Customer to Support; OneX; Clinical Trial Discovery; Philips Life Shield                                                                                               |
| **Digital product and enterprise UX**      | These projects address complex information, shared platforms, support workflows, and reusable interface patterns.    | Connection Customer to Support; OneX; Font Readability Framework; Clinical Trial Discovery                                                                                        |
| **Physical prototyping and human factors** | These projects use ergonomics, physical modelling, CAD, mechanisms, or integration testing to make ideas tangible.   | FireFlys; Zero Brush; Humanising LT-20 Classic; Philips Life Shield                                                                                                               |
| **Brand, visual, and retail experience**   | These projects make products and practices easier to recognise through identity, print, spatial, and sensory design. | Nescafé Connected Coffee Mug; Dudhi Planters; PRAG Marketing Posters; PRAG Articove Brochure; Studio Portfolio Identity                                                           |
| **Where evidence changed a decision**      | These case studies publish a direct trail from evidence to a design decision and its limits.                         | Connection Customer to Support; OneX; Font Readability Framework; Royal Coffee; FireFlys; Zero Brush; Humanising LT-20 Classic; Philips Life Shield; Nescafé Connected Coffee Mug |

For sets longer than four projects, show four first and add **Show all matching projects**.

### Capability-result refinements

| Prompt                              | Prepared answer or behavior                                                                |
| ----------------------------------- | ------------------------------------------------------------------------------------------ |
| **Show evidence-to-decision cases** | Keep only projects with a published evidence-to-decision trail.                            |
| **Only show delivered work**        | Keep only matching projects whose exact status belongs to the delivered-or-realized group. |
| **Compare two examples**            | Open the comparison selector with the current capability already applied.                  |
| **Choose another capability**       | Return to the capability menu.                                                             |

## About-and-fit content

### How does Shubham work?

**Prepared answer:** He starts with people's contexts and constraints, makes ambiguity tangible through journeys and prototypes, then carries decisions through validation and implementation.

**Next choices:** **See projects that show this** · **Open About** · **Another question**

### Which domains has he worked in?

**Prepared answer:** Healthcare and enterprise UX, service operations, design systems, physical products, brand identity, retail concepts, and visual storytelling.

**Next choices:** **Healthcare work** · **Physical product work** · **Brand and retail work** · **Open About**

### How does he use AI?

**Prepared answer:** He uses AI for requirements, concept exploration, and workflow prototypes; research, clinical expertise, testing, and stakeholder review decide what advances.

**Next choices:** **Open About: AI in practice** · **See digital work** · **Another question**

### Why might he fit a senior UX role?

**Prepared answer:** He brings 7+ years of experience across research, systems thinking, visual craft, validation, and implementation, with current senior-level healthcare work.

**Next choices:** **See Senior UX highlights** · **Open About** · **Contact Shubham**

### How can I contact him?

**Prepared answer:** The Contact page includes email and links to LinkedIn, Behance, Medium, and Instagram.

**Next choices:** **Open Contact** · **Open About** · **Keep exploring**

There is no public resume route in the current portfolio. Do not show a resume prompt unless an approved resume asset or page is added.

## Shared project follow-up prompts

Every project overview can offer the following questions:

- **What was the problem?**
- **What did Shubham do?**
- **What changed because of evidence?** — show only for projects with a published evidence-to-decision record
- **What was the outcome?**
- **Open full project**
- **See other projects in this category**
- **Compare with another project**

The prepared answers below are the reusable content bank for category results, tours, capabilities, project questions, and comparisons.

## Digital Experience project answer bank

### Connection Customer to Support

- **Slug:** `connection-customer-to-support`
- **Overview:** **Implemented** — A four-week initiative brought configurable support into a clinical platform and was validated with seven representative users.
- **Problem:** Clinical-platform users lacked a clear route to the right support channel, and handoffs often lost useful context.
- **Contribution:** Shubham designed user and administrator flows from research through implementation support and timed testing, then shaped a structured-email enhancement.
- **Evidence → decision:** Customer correspondence exposed fragmented routes and context loss, prompting point-of-failure support, configured channels, and a structured email handoff.
- **Outcome:** Implemented in two sprints; seven representative users averaged under one minute only in timed usability testing, and structured email followed later.
- **Source sections:** `#overview` · `#the-challenge` · `#at-a-glance-title` · `#decision-trail-title` · `#outcome`

### OneX: Unifying Healthcare

- **Slug:** `onex-healthcare-operations`
- **Overview:** **Ongoing platform design** — Shared services, information architecture, and 200+ prototype iterations shaped a reusable healthcare-platform direction.
- **Problem:** Fragmented specialised applications needed a coherent platform foundation without flattening role-specific, high-stakes workflows.
- **Contribution:** Shubham shaped the platform vision, personas, information architecture, UX principles, shared services, global readiness, and human-centred AI direction.
- **Evidence → decision:** Interviews, workshops, 200+ iterations, and repeated usability sessions supported common object-based and governed-AI platform foundations.
- **Outcome:** The result is an ongoing reusable direction; adoption, realised revenue, and measured operational impact are not claimed.
- **Source sections:** `#overview` · `#the-challenge` · `#at-a-glance-title` · `#decision-trail-title` · `#outcome`

### Helping Patients Find Right Clinical Trials

- **Slug:** `clinical-trial-discovery`
- **Overview:** **Prototype** — An eight-week guided experience helps patients and caregivers understand relevance, eligibility, and trial comparisons.
- **Problem:** Patients and caregivers faced complex eligibility language, location constraints, medical terminology, and uncertain next steps.
- **Contribution:** Shubham used interviews and journey mapping to shape guided matching, plain-language eligibility, and saved comparisons.
- **Evidence prompt:** Hidden; no public structured evidence-to-decision record.
- **Outcome:** The documented result is a 38-screen prototype; nine research sessions and 15 content patterns are project outputs, not impact evidence.
- **Source sections:** `#context` · `#research` · `#final-solution`

### Font Readability Framework

- **Slug:** `font-readability-framework`
- **Overview:** **Shipped** — A two-hour developer workshop turned a browser-zoom workaround into a log-reading framework deployed two sprints later.
- **Problem:** Service engineers needed denser log scanning without shrinking navigation, tabs, buttons, or other shared controls.
- **Contribution:** Shubham framed the observed workaround, facilitated the developer workshop, and created the reference hierarchy used for implementation.
- **Evidence → decision:** Browser zoom isolated density as a log-content problem, prompting 12px and 16px modes while shared interface elements stayed unchanged.
- **Outcome:** The option shipped after two sprints; adoption, profile persistence, and measured performance effects were not supplied.
- **Source sections:** `#overview` · `#the-challenge` · `#at-a-glance-title` · `#decision-trail-title` · `#outcome`

### Royal Coffee: Personalised Coffee Experience

- **Slug:** `provider-onboarding-system`
- **Overview:** **Design-task concept** — A research-led experience guides mood-based discovery, blend selection, packaging personalisation, and checkout.
- **Problem:** Online buyers lacked sensory cues and confidence while navigating many blends and unfamiliar coffee attributes.
- **Contribution:** Shubham structured the research, synthesised personas and journey evidence, and designed flows, storyboards, sitemap, wireframes, and high-fidelity screens.
- **Evidence → decision:** A 41-participant survey exposed uncertainty, shifting selection toward mood-led recommendations while preserving customer control.
- **Outcome:** The result is a UX design-task concept; build, usability validation, launch, and behavioural or commercial impact are not evidenced.
- **Source sections:** `#overview` · `#the-challenge` · `#at-a-glance-title` · `#decision-trail-title` · `#outcome`

## Industrial Experience project answer bank

### FireFlys — Early Wildfire Detection Drone

- **Slug:** `fireflys`
- **Overview:** **Working prototype** — A stabilised sensor payload, gimbal, aircraft attachment, and ground-control concept formed one early-wildfire-detection system.
- **Problem:** The team needed to protect and orient an airborne sensor, attach it securely, and connect it to a usable ground workflow.
- **Contribution:** Shubham owned the payload housing, gimbal integration, drone attachment, 3D-printed iterations, testing, and supported aircraft assembly.
- **Evidence → decision:** Firefighter input and physical prototypes exposed integration constraints, prompting a modular gimballed payload designed as one subsystem.
- **Outcome:** Four payload iterations produced a flying prototype shown at the Final Gala; wildfire detection was not field-validated or deployed.
- **Source sections:** `#overview` · `#the-challenge` · `#my-role` · `#decision-trail-title` · `#outcome`

### Zero Brush

- **Slug:** `zero-brush`
- **Overview:** **Functioning academic concept prototype** — A detachable bamboo head and visible day/night toothpaste-pellet mechanism explore replacement and brushing routines.
- **Problem:** The team explored how a toothbrush could replace less material while making head replacement and twice-daily brushing visible.
- **Contribution:** Shubham led product form, ergonomics, mockups, CAD, 3D modelling, rendering, print preparation, and video while contributing to research and testing.
- **Evidence → decision:** Research patterns and 39 ideas moved the brief beyond waste toward a detachable head with visible day/night cues.
- **Outcome:** The prototype refined head attachment and slider mechanics; multi-pellet dispensing and commercial, clinical, and environmental impact remained unvalidated.
- **Source sections:** `#overview` · `#situation` · `#my-role` · `#design-decision` · `#outcome`

### Humanising LT-20 Classic

- **Slug:** `humanising-lt20-classic`
- **Overview:** **Concept** — Operator evidence, ergonomics, and manufacturing constraints shaped a resolved CNC-lathe redesign.
- **Problem:** The lathe needed to balance posture, guarding, service access, chip handling, manufacturing feasibility, and product-family identity.
- **Contribution:** Shubham co-led research and ergonomics, owned sketching, 3D modelling, and rendering, and shared concept selection and major decisions.
- **Evidence → decision:** A 14-response survey showed weaker appearance and reported strain; manufacturing constraints then favoured the retained-guard direction.
- **Outcome:** The work produced native CAD, renders, engineering drawings, and an appearance model; production adoption and functional validation remain undocumented.
- **Source sections:** `#overview` · `#product-opportunity` · `#my-role` · `#concept-exploration-and-selection` · `#outcome-and-reflection`

### Planter Design: Dudhi Industries

- **Slug:** `dudhi-planters`
- **Overview:** **Manufactured and sold** — A four-month engagement covered planter design, 3D-printed R&D, branding, manufacture, and catalogue release.
- **Problem:** Dudhi Industries needed a distinct planter collection plus the identity and sales materials required to present it.
- **Contribution:** As sole designer, Shubham owned product exploration, collection development, 3D-printed prototypes, brand identity, and sales materials.
- **Evidence prompt:** Hidden; no public structured evidence-to-decision record.
- **Outcome:** The collection was manufactured and sold with a released catalogue; sales figures and prototype counts are not documented.
- **Source section:** `#overview`

### Philips Life Shield

- **Slug:** `philips-life-shield`
- **Overview:** **Internship concept** — Emergency workflows, spatial constraints, ergonomics, and product research shaped a modular mobile-care proposal.
- **Problem:** One mobile platform needed to bring diagnostic, monitoring, storage, and emergency-support equipment closer to patients and clinical teams.
- **Contribution:** Shubham led research synthesis, workflow analysis, ergonomics, requirements, sketch exploration, CAD, feature definition, and final visualisation.
- **Evidence → decision:** Journey maps, workflow evidence, cart observation, and measured spatial constraints drove a configurable mobile-platform concept.
- **Outcome:** The result was a high-fidelity CAD proposal; no physical prototype, clinician evaluation, engineering validation, manufacture, or launch is evidenced.
- **Source sections:** `#overview` · `#design-challenge` · `#my-role` · `#decision-trail-title` · `#outcome`

## Brand, Identity & Retail project answer bank

### Nescafé Connected Coffee Mug

- **Slug:** `nescafe-connected-coffee-mug`
- **Overview:** **Concept Proposal** — Three sensory retail directions translated a connected mug into a tangible customer experience.
- **Problem:** The connected mug needed a memorable retail expression joining product, identity, space, and sensory experience.
- **Contribution:** Shubham developed three directions through mood boards, spatial and industrial-design sketches, 3D visualisation, and a five-senses framework.
- **Evidence → decision:** The brief centred form, light, material, and sensory engagement, leading to three spatial directions mapped across five senses.
- **Outcome:** The result was three visual concepts; no final design, installation, testing, approval, manufacture, rollout, or performance is documented.
- **Source sections:** `#overview` · `#the-retail-opportunity` · `#my-role` · `#decision-trail-title` · `#outcome`

### PRAG Marketing Posters

- **Slug:** `prag-marketing-posters`
- **Overview:** **Delivered** — A one-month project created adaptable public-facing marketing posters for PRAG.
- **Problem:** PRAG needed posters adaptable across office walls, hoardings, and other print media.
- **Contribution:** Shubham designed a coherent poster series, established a consistent layout, and worked with the printer to manage quality.
- **Evidence prompt:** Hidden; no public structured evidence-to-decision record.
- **Outcome:** Five posters were delivered and one of each installed at PRAG's office; formal client feedback is not documented.
- **Source sections:** `#marketing-poster-series` · `#print-production`

### PRAG Articove Brochure

- **Slug:** `prag-articove-brochure`
- **Overview:** **Delivered and printed** — Product graphics, 3D renders, and a four-page A4 brochure were completed in one month.
- **Problem:** PRAG needed updated graphics and marketing material for its onboard train water purifier.
- **Contribution:** Shubham redesigned the graphics, updated the 3D model, rendered product views, designed the brochure, and prepared print files.
- **Evidence prompt:** Hidden; no public structured evidence-to-decision record.
- **Outcome:** The brochure was printed for PRAG marketing use; wider distribution, reception, and business impact are not documented.
- **Source section:** `#overview`

### Studio Portfolio Identity

- **Slug:** `studio-portfolio-identity`
- **Overview:** **In progress** — An evolving editorial system connects product design and photography without overpowering the work.
- **Problem:** A multidisciplinary practice needed one identity for rigorous product work and expressive photography while keeping project imagery dominant.
- **Contribution:** Shubham combined disciplined grids, compact navigation, atmospheric depth, and loose photographic gestures into one editorial system.
- **Evidence prompt:** Hidden; no public structured evidence-to-decision record.
- **Outcome:** The documented result is an evolving system across both disciplines; completion and audience impact are not documented.
- **Source sections:** `#design-principles` · `#process`

## Shared fallback content

| Situation               | Prepared answer                                                                     | Choices                                                        |
| ----------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Unsupported detail      | **That detail is not documented publicly.**                                         | **Open full project** · **Ask another question** · **Back**    |
| No filter matches       | **No published project matches every selected filter.**                             | **Remove one filter** · **Choose a category** · **Guide Home** |
| Project route changed   | **This project link is no longer available.**                                       | **Browse this category** · **Guide Home** · **Close guide**    |
| Saved state is outdated | **The guide changed since your last visit. Choose a new path.**                     | **Guide Home** · **Browse normally**                           |
| Unexpected node         | **This path could not be restored. Your previous valid steps are still available.** | **Back** · **Guide Home** · **Start over**                     |

## Content assembly rules

- Reuse each project's Overview line in tours, category lists, capability results, and selectors.
- Reuse the four prepared answers in project views and comparisons; do not write parallel versions that can drift.
- Hide **What changed because of evidence?** for Clinical Trial Discovery, Dudhi Planters, PRAG Marketing Posters, PRAG Articove Brochure, and Studio Portfolio Identity.
- Show no more than four project cards initially; use **Show all matching projects** when needed.
- Every project card offers **Open project summary** and **Open full project**.
- Every prepared project answer offers **Read the supporting section**.
- Preserve exact status text in the answer and card, even when a broad filter such as Prototypes was used.
- If public source content changes, invalidate the saved guide version and regenerate this content bank before release.

## Content-validation checklist

- All 14 public projects appear once in the answer bank.
- All three category titles match the live portfolio.
- Project titles, slugs, and statuses match published content.
- No concept, proposal, prototype, or ongoing direction is described as shipped.
- OneX remains anonymized and does not imply adoption or realised revenue.
- Quantified evidence retains its unit and limitation.
- Evidence prompts exist only for the nine projects with a public evidence-to-decision record.
- Every answer has a next choice or normal-browse handoff.
- Open full project and Resume guide restore the same guide node and history.
- No prompt requires generated content, a network request, or a secret.
