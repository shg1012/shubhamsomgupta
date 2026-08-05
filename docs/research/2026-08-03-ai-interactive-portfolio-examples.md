# AI-interactive portfolio research: conversational evidence, not chatbot theatre

**Reviewed:** 3 August 2026
**Purpose:** Identify first-party examples where AI changes how visitors explore a designer’s or creative technologist’s personal portfolio, then translate the useful patterns into a safe direction for Shubham S. Gupta’s evidence-led editorial portfolio.

## Short answer

The strongest precedent is not an AI-only portfolio. It is a **hybrid conversational evidence navigator** layered over a complete, normally browsable portfolio.

Visitors should still be able to scan selected work, open a case study, use the table of contents, inspect artefacts, and verify exact project-status labels without speaking to an assistant. The AI layer should help a recruiter ask a specific question—such as “Which projects show service-system work?”—and receive a concise answer linked to the exact public case-study sections that support it.

## Verification boundary

The eight examples in the main review were checked in a live browser on **3 August 2026**. The public pages loaded, and the relevant assistant panel or interaction controls were opened or inspected where available. Browser-console errors were also checked for most examples.

No question was submitted to any third-party model API. No microphone permission was granted to Kate Evans’s voice experience. Therefore, **“live” below verifies that the public interaction surface was reachable and rendered; it does not verify model-response quality, grounding accuracy, latency, quotas, or continued backend availability**.

The four items under **Adjacent references** were not part of these live UI checks. They are summarized only from their owners’ or products’ first-party public descriptions, and any performance, accuracy, privacy, or “no hallucinations” language remains a self-description rather than an independently tested result.

## Eight verified examples

### 1. Brian Pinkney — BR(AI)N

- **Live portfolio and creator case study:** [BR(AI)N — Designing an AI Persona for a Portfolio That Talks Back](https://www.brianpinkneyux.com/case/brain)
- **Owner:** Experience strategist, design leader, and service designer.
- **Interaction model:** A branded portfolio persona trained on Brian’s body of work. Visitors can ask about leadership, process, industries, and projects, or begin with deliberately designed quick prompts.
- **Why it is strong:** Brian treats conversation design, personality, guardrails, and the system prompt as design artefacts rather than presenting the assistant as a generic plug-in. His first-party case study documents a Gemini-backed implementation, knowledge architecture covering 10+ case studies and client history, six system-prompt iterations, preset prompts, and engagement tracking.
- **Live check:** The case study loaded and `ASK THE AI` opened a dialog titled `Brian’s Br(AI)n`, with a guardrail statement, AI disclosure, quick-prompt area, and conversation surface. No browser-console errors were observed. No model response was requested.

### 2. Xuejian “Aiden” Yang — This Portfolio

- **Live portfolio:** [Aiden Yang](https://aidenyang.me/)
- **Creator architecture case:** [This Portfolio — A Vibecoded AI Site](https://aidenyang.me/projects/this-site.html)
- **Owner:** Design engineer, interaction-design student, and AIGC creator.
- **Interaction model:** A persistent `AI Aiden` conversation layer on the main portfolio and project pages. The portfolio describes a static GitHub Pages front end, an AI chat running at Cloudflare’s edge, D1 storage, and real-time signal detection in an admin surface.
- **Why it is strong:** The portfolio presents its own technical and design architecture as a case study. Its architecture diagram is also interactive, allowing visitors to inspect the purpose and trade-offs of individual blocks.
- **Live check:** The homepage and architecture case loaded. The AI panel, text input, and send control rendered on both surfaces, and no browser-console errors were observed. No model response was requested.

### 3. Nishad Patne — this Portfolio AI

- **Live portfolio:** [Nishad Patne](https://www.nishadpatne.com/)
- **Creator technical case:** [this Portfolio AI](https://www.nishadpatne.com/projects/meta-portfolio)
- **Owner:** UX designer and engineer.
- **Interaction model:** A persistent RAG assistant with `General` and `Project Deepdive` modes. Case-study sections add contextual actions such as `Ask AI about TL;DR`, `Ask AI about Challenge`, and `Ask AI about Process`.
- **Why it is strong:** The AI is connected to where evidence already lives. Nishad’s case study documents Gemini Flash, Qdrant, Haystack, an Oracle Cloud backend, a Next.js front end, health checks, session cleanup, and a stated concurrency target. The interface also warns that the experimental assistant may hallucinate or respond slowly.
- **Live check:** The homepage assistant and technical case loaded. Prompt chips, text input, project-mode controls, and section-specific `Ask AI about…` actions rendered without browser-console errors. No model response was requested.

### 4. Kate Evans — Ask Kate

- **Live portfolio:** [Kate Evans](https://www.kateevans.design/)
- **Voice experience:** [Ask Kate](https://ask.kateevans.design/)
- **Owner:** Product designer with 13+ years of experience.
- **Interaction model:** The main portfolio promotes `ASK MY AI`, which opens a separate, highly reduced voice interface. Its visible states include `Tap to ask me a question`, `Listening…`, `Stop`, and `Kate says`.
- **Why it is strong:** It treats voice as the primary interaction rather than adding a small text chatbot to a conventional page.
- **Live check:** The main portfolio and `Ask Kate` subdomain loaded, and the listening/speaking controls rendered. Microphone permission was not granted, so speech recognition and model-response behaviour were not tested.

### 5. Taha Azhar — Ask My AI

- **Live page:** [Ask My AI — Taha Azhar](https://tahazhar.com/ai.html)
- **Owner:** Senior product designer specializing in fintech, payments, and Web3.
- **Interaction model:** A dedicated `Get To Know Me` page with `Chat` and `Speak` modes, new-conversation control, open text input, and prompts about projects, design process, availability, and differentiation.
- **Why it is strong:** The assistant is positioned as a recruiter-facing interview layer rather than only a floating support widget.
- **Live check:** The page loaded with enabled input and send controls, working Chat/Speak selectors, and no browser-console errors. No model response was requested.

### 6. Gerardo Vinces — Ask Gerardo’s AI

- **Live portfolio:** [Gerardo Vinces](https://www.davinces.design/)
- **Owner:** Senior product designer and design lead.
- **Interaction model:** A floating assistant framed as an example of Gerardo’s AI-product work. Its suggested prompts cover his specialty, an agentic-AI project, AI use in his process, design-system experience, and fit for an AI-native team.
- **Why it is strong:** The site explicitly presents itself as a working artefact designed in Figma and built with Claude Code. The assistant is connected to that positioning and labels itself `designed & built by Gerardo`.
- **Live check:** The portfolio loaded and the assistant panel opened successfully with prompt chips, input, and send control. No browser-console errors were observed. No model response was requested.

### 7. Matthew Burd — ANDRÉA 3000

- **Live portfolio:** [Matthew Burd](https://mattburd.com/)
- **Assistant:** [Ask ANDRÉA 3000](https://mattburd.com/chatbot/)
- **Creator disclosure:** [AI Disclosure](https://mattburd.com/ai-disclosure.php)
- **Owner:** AI creative technologist.
- **Interaction model:** A branded assistant trained on Matthew’s background and creative work across imagery, motion, music, code, writing, and experiments. The wider site also lets visitors adjust visual effects.
- **Why it is strong:** It combines an authored persona with unusually explicit first-party disclosure. The disclosure distinguishes human vision, prompting, curation, editing, quality control, and ethics from AI execution, then names the tools used by medium.
- **Live check:** The portfolio, chatbot page, and disclosure loaded. `Start Chatting` opened the ANDRÉA 3000 dialog with a greeting, text input, send control, and visible question quota. No browser-console errors were observed. No model response was requested.

### 8. Chris Michalak — Ask My AI Assistant

- **Live portfolio:** [Chris Michalak](https://www.chrismichalak.com/)
- **Owner:** Senior UX designer and researcher.
- **Interaction model:** An assistant embedded inside the homepage rather than replacing it. The site says it is powered by Claude and trained on the complete portfolio, resume, and work samples. Suggested prompts address enterprise UX, AI-enhanced workflow, the most impactful project, and role fit.
- **Why it is useful:** This is the safest baseline pattern: keep the full portfolio, then add an evidence-discovery layer for visitors who prefer questions over navigation.
- **Live check:** The redesigned portfolio and assistant section loaded with suggested prompts, text input, and an expected disabled send state while the input was empty. No browser-console errors were observed. No model response was requested.

## Pattern synthesis

Across the strongest examples, five patterns recur:

1. **Normal browsing remains available.** The AI augments a project index and case studies; it does not become the only information architecture.
2. **Designed prompts reduce blank-page anxiety.** Useful starters reflect recruiter questions, not generic chatbot demonstrations.
3. **Context improves trust.** Nishad’s section-level actions and Brian’s bounded knowledge architecture make the assistant feel connected to visible evidence.
4. **Personality helps only after scope is clear.** BR(AI)N and ANDRÉA 3000 are memorable because their personas sit on top of explicit sources, guardrails, and disclosures.
5. **Voice is an enhancement, not a foundation.** Kate and Taha show its expressive potential, but voice adds permissions and accessibility constraints that a public hiring portfolio cannot ignore.

The most transferable direction is therefore **not** “turn every page into chat.” It is “let visitors ask across the public portfolio, receive a concise synthesis, and jump directly to the evidence.”

## Recommendation for Shubham’s portfolio

### Build a hybrid conversational evidence navigator

Preserve the current evidence-led editorial website as the canonical experience. Add an optional assistant—working title `Ask the portfolio`—that can answer bounded questions such as:

- Which projects show service-design and systems-thinking experience?
- Where did Shubham work across physical and digital touchpoints?
- Which examples are shipped, working prototypes, concepts, or studies?
- What evidence supports a stated outcome?
- Which projects best match a senior UX role in healthcare or enterprise systems?

The response should be short, qualified, and followed by **section-level source links**. A useful answer is not “Shubham is an expert in systems thinking”; it is a synthesis with links such as `OneX — Decision`, `Zero Brush — Prototype and testing`, or another exact public section that supports the statement.

### Preserve the normal browse path

- Keep navigation, selected-work cards, categories, case-study tables of contents, previous/next links, and normal search-engine-readable content.
- Make the assistant optional and dismissible; do not gate case studies behind chat.
- Provide keyboard-operable prompt chips, a visible text fallback, focus management, status announcements, reduced-motion support, and a clear way to stop or reset a conversation.
- If voice is explored later, treat it as an opt-in enhancement after a complete text and browse experience exists.

### Use only the sanitized public corpus

- Index only each published project’s public `src/content/projects/<slug>/index.md` content.
- Do **not** ingest, upload, retrieve, summarize, or expose any raw `SOURCE-NOTES.md`, source archives, private documents, hidden drafts, internal screenshots, unpublished metrics, or confidential client material.
- Keep the public Markdown as the source of truth. Regenerate the assistant’s retrieval index when approved public Markdown changes rather than maintaining a separate, drifting set of AI claims.
- Apply the same confidentiality and evidence rules to generated answers that the visible case studies already use.

### Preserve exact maturity and evidence language

- Return the exact public maturity label—such as `Shipped`, `Working prototype`, `Concept`, `Study`, `Internal`, or the project’s existing qualified wording—rather than allowing the model to paraphrase a concept into a launch.
- Never convert estimates, directional outcomes, prototypes, or anonymized work into realized business impact.
- Repeat important qualifiers in the answer and source card; do not rely on colour alone.
- If the indexed public Markdown does not support an answer, say so and link to the closest relevant material rather than inferring.

### Require a secure backend

The portfolio is a static GitHub Pages site, so a production assistant cannot safely call a model provider directly from browser code. A separate server-side or edge backend is required.

At minimum, it should:

- keep provider credentials in server-side secrets, never in the repository, generated data, client bundle, or browser storage;
- accept questions only against an allowlisted, versioned public-content index built from the approved `index.md` files;
- return source identifiers that the client converts into exact project-and-section links;
- enforce request-size limits, rate limits, timeouts, origin rules, abuse protection, and cost ceilings;
- avoid retaining conversation content by default, or publish a clear retention/privacy notice if operational logs are necessary;
- provide graceful failure states so the portfolio remains fully usable if the AI service is slow, unavailable, or over quota;
- log corpus/version and citation coverage for quality review without logging confidential source material.

### Prototype the trust model before the personality

The first prototype should test three things:

1. Can it answer from the public Markdown without changing maturity or confidentiality labels?
2. Can every substantive answer show one or more exact section-level citations?
3. Can a recruiter reach the same evidence through normal browsing when the assistant is unavailable?

Only after those pass should the experience add a stronger persona, voice, animated states, or broader conversational scope.

## Adjacent references — first-party descriptions only, not live UI verified in this review

### Esam Jaafar

[Esam Jaafar’s AI Portfolio](https://www.jfr3sam.com/) describes a full-screen, bilingual conversational portfolio. Its first-party page says the assistant answers in the first person from a curated RAG knowledge base, provides sources, suggests questions, and uses Next.js, LangChain.js, Supabase/pgvector, and OpenRouter. This is a useful reference for making citations visible inside the conversation, but it was not included in the live-browser interaction checks above.

### Semaa Amin

[Semaa Amin’s AI Portfolio](https://semaa.dev/) describes `Mr. Darcy`, a Google Gemini and RAG assistant with a deliberately authored literary persona. The public page says it can answer across experience and projects, guide visitors to portfolio sections, remember conversation context, accept voice input, and switch between detailed `Eloquent` and concise `Brief` modes. It is a useful reference for adjustable answer depth and memorable conversation design; these behaviours were not independently exercised here.

### Yanqing Jiang

[Yanqing Jiang’s AI Portfolio](https://yanqing.app/) publicly describes several AI-native exploration paths rather than one general portfolio chatbot: a live `Homer` personal-AI console on the landing page, a generative `Agent to UI` dashboard, a cited `Ask My Resume` RAG project, voice-agent experiments, and links that ask a visitor’s preferred AI to analyze the portfolio. It is a useful reference for exposing multiple AI interaction models and citation-led resume answers. Only the public descriptions were reviewed for this note.

### Alloquy

[Alloquy](https://alloquy.app/) is a portfolio product rather than one designer’s personal site. Its first-party page describes read-only document connection, vector indexing, a recruiter-facing RAG assistant, linked evidence documents, and answers that expose where a fact was retrieved. This is the closest adjacent reference for an evidence-grounded hiring experience. Claims such as `No hallucinations`, privacy guarantees, and instant verified answers are product marketing statements and were not independently tested in this review.

## Decision

Prototype a small, citation-first assistant over two public flagship case studies before considering a portfolio-wide release. Preserve the existing editorial interface as the primary experience, retrieve only from approved public `index.md` content, surface exact maturity labels, and require every substantive answer to link back to visible evidence. Treat personality and voice as optional later layers—not as substitutes for trust, accessibility, or a secure backend.
