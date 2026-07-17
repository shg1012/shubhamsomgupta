import type { Project, ProjectDepth } from '../types/portfolio';
import type { ProjectFrontmatter } from './projectSchema';

export type LoadedProject = Project;

export type LoadedProjectDepth = ProjectDepth;

export interface ParsedProjectContent {
  frontmatter: ProjectFrontmatter;
  content: string;
}
