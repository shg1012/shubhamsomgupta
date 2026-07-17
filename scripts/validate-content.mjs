import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { z } from 'zod';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const projectsRoot = path.join(repoRoot, 'src/content/projects');

const requiredString = z.string().trim().min(1);

const imageSchema = z
  .object({
    image: requiredString,
    alt: requiredString,
  })
  .strict();

const projectSchema = z
  .object({
    title: requiredString,
    slug: requiredString.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: 'Use lowercase letters, numbers, and hyphens only.',
    }),
    category: z.enum(['digital-experience', 'industrial-experience', 'branding-and-identity']),
    summary: requiredString,
    overview: requiredString.optional(),
    year: z.union([z.string(), z.number()]).transform(String),
    status: requiredString,
    featured: z.boolean(),
    depth: z.enum(['flagship', 'compact']),
    theme: z.enum(['cyan', 'blue', 'violet', 'magenta', 'slate']),
    client: requiredString,
    role: requiredString,
    timeline: requiredString,
    team: z.array(requiredString).optional(),
    responsibilities: z.array(requiredString).optional(),
    tags: z.array(requiredString).min(1),
    hero: imageSchema,
    thumbnail: imageSchema.optional(),
    metrics: z
      .array(
        z
          .object({
            value: requiredString,
            label: requiredString,
            qualification: requiredString.optional(),
          })
          .strict(),
      )
      .optional(),
    seo: z
      .object({
        description: requiredString,
      })
      .strict(),
    draft: z.boolean(),
    order: z.number().int(),
    cardSize: z.enum(['small', 'medium', 'wide', 'hero']).optional(),
    deviceMockup: z.enum(['laptop', 'phone', 'dual', 'dashboard', 'brand-system']).optional(),
  })
  .strict();

function toRelative(filePath) {
  return path.relative(repoRoot, filePath);
}

function validateFrontmatter(data, filePath) {
  const parsed = projectSchema.safeParse(data);

  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => {
        const fieldPath = issue.path.length > 0 ? issue.path.join('.') : 'frontmatter';
        return `${fieldPath}: ${issue.message}`;
      })
      .join('; ');

    throw new Error(`${toRelative(filePath)}: invalid project frontmatter. ${details}`);
  }

  return parsed.data;
}

function isExternalUrl(value) {
  return /^(?:[a-z]+:)?\/\//i.test(value) || value.startsWith('mailto:') || value.startsWith('tel:');
}

function validateProjectAsset(projectFolder, value, filePath) {
  if (isExternalUrl(value) || value.startsWith('data:') || value.startsWith('/')) {
    return;
  }

  const normalizedAssetPath = value.replace(/^\.?\//, '').replace(/\\/g, '/');
  const resolvedPath = path.join(projectsRoot, projectFolder, normalizedAssetPath);

  if (!existsSync(resolvedPath)) {
    throw new Error(`${toRelative(filePath)}: referenced asset "${value}" was not found.`);
  }
}

function validateMarkdownAssets(projectFolder, content, filePath) {
  for (const match of content.matchAll(/!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const imagePath = match[1];

    if (!imagePath.startsWith('#')) {
      validateProjectAsset(projectFolder, imagePath, filePath);
    }
  }
}

async function getProjectFiles() {
  const projectFolders = await readdir(projectsRoot, { withFileTypes: true });

  return projectFolders
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(projectsRoot, entry.name, 'index.md'))
    .filter((filePath) => existsSync(filePath))
    .sort();
}

async function main() {
  const projectFiles = await getProjectFiles();
  const seenSlugs = new Map();
  const errors = [];

  for (const filePath of projectFiles) {
    try {
      const raw = await readFile(filePath, 'utf8');
      const parsed = matter(raw);
      const frontmatter = validateFrontmatter(parsed.data, filePath);
      const folderSlug = path.basename(path.dirname(filePath));

      if (frontmatter.slug !== folderSlug) {
        throw new Error(
          `${toRelative(filePath)}: folder name "${folderSlug}" must match frontmatter slug "${frontmatter.slug}".`,
        );
      }

      const existingSlugPath = seenSlugs.get(frontmatter.slug);

      if (existingSlugPath) {
        throw new Error(
          `${toRelative(filePath)}: duplicate project slug "${frontmatter.slug}" also found in ${existingSlugPath}.`,
        );
      }

      seenSlugs.set(frontmatter.slug, toRelative(filePath));
      validateProjectAsset(folderSlug, frontmatter.hero.image, filePath);

      if (frontmatter.thumbnail) {
        validateProjectAsset(folderSlug, frontmatter.thumbnail.image, filePath);
      }

      validateMarkdownAssets(folderSlug, parsed.content, filePath);
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }
  }

  if (errors.length > 0) {
    console.error('Content validation failed:');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(`Content validation passed for ${projectFiles.length} project files.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
