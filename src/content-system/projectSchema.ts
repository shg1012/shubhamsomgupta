import { z } from 'zod';

export const PROJECT_CATEGORY_VALUES = [
  'digital-experience',
  'industrial-experience',
  'branding-and-identity',
] as const;

export const PROJECT_DEPTH_VALUES = ['flagship', 'compact'] as const;

export const PROJECT_THEME_VALUES = ['cyan', 'blue', 'violet', 'magenta', 'slate'] as const;

export const PROJECT_CARD_SIZE_VALUES = ['small', 'medium', 'wide', 'hero'] as const;

export const DEVICE_MOCKUP_VALUES = ['laptop', 'phone', 'dual', 'dashboard', 'brand-system'] as const;

const requiredString = z.string().trim().min(1);

const imageSchema = z
  .object({
    image: requiredString,
    alt: requiredString,
  })
  .strict();

const metricSchema = z
  .object({
    value: requiredString,
    label: requiredString,
    qualification: requiredString.optional(),
  })
  .strict();

export const projectFrontmatterSchema = z
  .object({
    title: requiredString,
    slug: requiredString.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: 'Use lowercase letters, numbers, and hyphens only.',
    }),
    category: z.enum(PROJECT_CATEGORY_VALUES),
    summary: requiredString,
    overview: requiredString.optional(),
    year: z.union([z.string(), z.number()]).transform(String),
    status: requiredString,
    featured: z.boolean(),
    depth: z.enum(PROJECT_DEPTH_VALUES),
    theme: z.enum(PROJECT_THEME_VALUES),
    client: requiredString,
    role: requiredString,
    timeline: requiredString,
    team: z.array(requiredString).optional(),
    responsibilities: z.array(requiredString).optional(),
    tags: z.array(requiredString).min(1),
    hero: imageSchema,
    thumbnail: imageSchema.optional(),
    metrics: z.array(metricSchema).optional(),
    seo: z
      .object({
        description: requiredString,
      })
      .strict(),
    draft: z.boolean(),
    order: z.number().int(),
    cardSize: z.enum(PROJECT_CARD_SIZE_VALUES).optional(),
    deviceMockup: z.enum(DEVICE_MOCKUP_VALUES).optional(),
  })
  .strict();

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;

export function parseProjectFrontmatter(data: unknown, sourcePath: string) {
  const parsed = projectFrontmatterSchema.safeParse(data);

  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => {
        const fieldPath = issue.path.length > 0 ? issue.path.join('.') : 'frontmatter';
        return `${fieldPath}: ${issue.message}`;
      })
      .join('; ');

    throw new Error(`${sourcePath}: invalid project frontmatter. ${details}`);
  }

  return parsed.data;
}
