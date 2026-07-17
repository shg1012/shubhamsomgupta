import { assetPath } from '../data/assets';

const projectImageModules = import.meta.glob('../content/projects/*/images/**/*', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>;

const externalUrlPattern = /^(?:[a-z]+:)?\/\//i;

export function isExternalUrl(value: string) {
  return externalUrlPattern.test(value) || value.startsWith('mailto:') || value.startsWith('tel:');
}

function normalizeRelativeAssetPath(value: string) {
  return value.replace(/^\.?\//, '').replace(/\\/g, '/');
}

export function resolveProjectAsset(projectFolder: string, value: string, sourcePath: string) {
  if (isExternalUrl(value) || value.startsWith('data:')) {
    return value;
  }

  if (value.startsWith('/')) {
    return assetPath(value);
  }

  const normalizedAssetPath = normalizeRelativeAssetPath(value);
  const moduleKey = `../content/projects/${projectFolder}/${normalizedAssetPath}`;
  const resolvedUrl = projectImageModules[moduleKey];

  if (!resolvedUrl) {
    throw new Error(`${sourcePath}: referenced asset "${value}" was not found.`);
  }

  return resolvedUrl;
}

export function resolveMarkdownImagePaths(content: string, projectFolder: string, sourcePath: string) {
  return content.replace(
    /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g,
    (match, alt: string, imagePath: string, title?: string) => {
      if (imagePath.startsWith('#')) {
        return match;
      }

      const resolvedImagePath = resolveProjectAsset(projectFolder, imagePath, sourcePath);
      const titlePart = title ? ` "${title}"` : '';
      return `![${alt}](${resolvedImagePath}${titlePart})`;
    },
  );
}
