# Shubham S. Gupta Portfolio

First working version of a personal design portfolio built with React, TypeScript, Vite,
React Router, and plain CSS.

## Scripts

- `npm run dev` starts the local Vite server.
- `npm run build` type-checks and creates the production build in `dist`.
- `npm run preview` previews the production build locally.
- `npm run lint` runs ESLint.
- `npm run format` formats the project with Prettier.
- `npm run deploy` builds and publishes `dist` with `gh-pages`.

## GitHub Pages

The app uses `HashRouter` for reliable route handling on GitHub Pages. The Vite base path switches
to `/shubhamsomgupta/` when `GITHUB_PAGES=true`, which is set in the included Pages workflow.
