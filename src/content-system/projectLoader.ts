import type { Project, ProjectCategorySlug } from '../types/portfolio';
import { parseMarkdownFrontmatter } from './frontmatterParser';
import { resolveMarkdownImagePaths, resolveProjectAsset } from './imageResolver';
import { parseProjectFrontmatter } from './projectSchema';

const projectMarkdownModules = import.meta.glob('../content/projects/*/index.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>;

function getProjectFolder(sourcePath: string) {
  const match = sourcePath.match(/\/content\/projects\/([^/]+)\/index\.md$/);

  if (!match) {
    throw new Error(`${sourcePath}: could not determine project folder.`);
  }

  return match[1];
}

function toProject(sourcePath: string, rawSource: string): Project {
  const folderSlug = getProjectFolder(sourcePath);
  const parsedMarkdown = parseMarkdownFrontmatter(rawSource, sourcePath);
  const frontmatter = parseProjectFrontmatter(parsedMarkdown.data, sourcePath);

  if (frontmatter.slug !== folderSlug) {
    throw new Error(
      `${sourcePath}: folder name "${folderSlug}" must match frontmatter slug "${frontmatter.slug}".`,
    );
  }

  const heroImage = resolveProjectAsset(folderSlug, frontmatter.hero.image, sourcePath);
  const thumbnailSource = frontmatter.thumbnail ?? frontmatter.hero;
  const thumbnail = resolveProjectAsset(folderSlug, thumbnailSource.image, sourcePath);
  const content = resolveMarkdownImagePaths(parsedMarkdown.content.trim(), folderSlug, sourcePath);

  return {
    slug: frontmatter.slug,
    title: frontmatter.title,
    category: frontmatter.category,
    shortDescription: frontmatter.summary,
    overview: frontmatter.overview,
    content,
    tags: frontmatter.tags,
    voiceOfCustomer: frontmatter.voiceOfCustomer,
    star: frontmatter.star,
    year: frontmatter.year,
    role: frontmatter.role,
    client: frontmatter.client,
    duration: frontmatter.timeline,
    status: frontmatter.status,
    depth: frontmatter.depth,
    thumbnail,
    thumbnailAlt: thumbnailSource.alt,
    heroImage,
    featured: frontmatter.featured,
    cardSize: frontmatter.cardSize,
    theme: frontmatter.theme,
    deviceMockup: frontmatter.deviceMockup,
    metrics: frontmatter.metrics,
    seo: frontmatter.seo,
    draft: frontmatter.draft,
    order: frontmatter.order,
    sourcePath,
  };
}

function loadProjects() {
  const loadedProjects = Object.entries(projectMarkdownModules).map(([sourcePath, rawSource]) =>
    toProject(sourcePath, rawSource),
  );

  const seenSlugs = new Map<string, string>();

  for (const project of loadedProjects) {
    const existingPath = seenSlugs.get(project.slug);

    if (existingPath) {
      throw new Error(
        `${project.sourcePath}: duplicate project slug "${project.slug}" also found in ${existingPath}.`,
      );
    }

    seenSlugs.set(project.slug, project.sourcePath ?? project.slug);
  }

  return loadedProjects
    .filter((project) => !(import.meta.env.PROD && project.draft))
    .sort((a, b) => {
      const orderDifference = (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER);
      return orderDifference === 0 ? a.title.localeCompare(b.title) : orderDifference;
    });
}

export const projects = loadProjects();

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

export const getProjectsByCategory = (category: ProjectCategorySlug) =>
  projects.filter((project) => project.category === category);

export const getFeaturedProject = () => projects.find((project) => project.cardSize === 'hero');

export const getSecondaryFeaturedProject = () =>
  projects.find((project) => project.slug === 'clinical-trial-discovery');
