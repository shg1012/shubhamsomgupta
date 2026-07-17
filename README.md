# Shubham S. Gupta Portfolio

First working version of a personal design portfolio built with React, TypeScript, Vite,
React Router, and plain CSS.

## Scripts

- `npm run dev` starts the local Vite server.
- `npm run content:validate` checks project Markdown frontmatter, slugs, and asset references.
- `npm run build` type-checks and creates the production build in `dist`.
- `npm run preview` previews the production build locally.
- `npm run lint` runs ESLint.
- `npm run format` formats the project with Prettier.
- `npm run deploy` builds and publishes `dist` with `gh-pages`.

## GitHub Pages

The app uses `HashRouter` for reliable route handling on GitHub Pages. The Vite base path switches
to `/shubhamsomgupta/` when `GITHUB_PAGES=true`, which is set in the included Pages workflow.

## Managing Project Content

Project pages are powered by Markdown files in `src/content/projects`. To create a project, duplicate
the matching template from `src/content/templates` into `src/content/projects/<project-slug>/index.md`
and add an `images` folder next to it.

The folder name and frontmatter `slug` must match, for example:

```text
src/content/projects/factory-service-console/
├── index.md
└── images/
    └── hero.webp
```

Use the category template that matches the work:

- `digital-experience.md`
- `industrial-experience.md`
- `branding-and-identity.md`

Images can be referenced relative to the project folder in frontmatter or Markdown:

```yaml
hero:
  image: "./images/hero.webp"
  alt: "Accessible description of the hero image."
```

```markdown
![Accessible alt text](./images/workflow.webp "Visible caption text")
```

The image alt text remains the accessible description. The optional Markdown title becomes the visible
caption.

Set `featured: true` for projects that should be eligible for featured homepage treatment, and use
`cardSize` to preserve the intended card layout. Set `draft: true` to hide the project from production
builds while keeping it available in local development. Use `depth: flagship` for fuller case studies
with a table of contents; use `depth: compact` for shorter, honest project entries.

Run validation before publishing:

```bash
npm run content:validate
npm run build
npm run preview
```

Publish through the existing GitHub Pages workflow:

```bash
npm run deploy
```

Common validation errors include missing required frontmatter, duplicate slugs, folder/slug mismatch,
invalid category/depth/theme values, malformed metrics, and missing referenced assets.

Authoring checklist:

- Keep the folder name and slug identical.
- Use one of the three allowed categories.
- Add descriptive alt text for every hero or thumbnail image.
- Keep metrics factual and qualify concepts, prototypes, and project outputs.
- Remove unused template sections instead of filling them with placeholder claims.
- Run `npm run content:validate` before committing.
