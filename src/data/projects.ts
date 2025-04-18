import { Text, Badge } from '@mantine/core';

export interface BadgeData {
  text: string;
  bg: string;
  color?: string;
}

export interface ProjectData {
  name: string;
  description: string;
  status?: 'live' | 'coming soon' | 'internal';
  link?: string;
  icon?: string; // Emoji or identifier
  iconBackgroundColor?: string; // Background for the icon container
  badges?: BadgeData[]; // Array of badges
}

export const aiContextGenerator: ProjectData = {
  name: 'ai-context-generator',
  description: 'VS Code extension that generates smart summaries for codebases using GPT.',
  status: 'live',
  link: 'https://marketplace.visualstudio.com/items?itemName=drumnation.ai-context-generator',
  icon: 'ai-context-generator', // Use name as identifier
  iconBackgroundColor: 'white',
  badges: [
    { text: '🧠 AI', bg: '#e0e7ff', color: '#3730a3' },
    { text: '⚡️ DevX', bg: '#fef9c3', color: '#92400e' },
  ],
};

export const promptForge: ProjectData = {
  name: 'prompt-forge',
  description: 'Modular prompt and template engine for chaining GPT workflows and tooling.',
  status: 'live',
  link: 'https://github.com/dmieloch/prompt-forge', 
  icon: 'prompt-forge', // Use name as identifier
  iconBackgroundColor: 'white',
  badges: [
    { text: '🧩 PromptOps', bg: '#e0e7ff', color: '#3730a3' },
    { text: '⚙️ Templates', bg: '#fef9c3', color: '#92400e' },
  ],
};

export const brainGarden: ProjectData = {
  name: 'Brain Garden',
  description: 'An internal OS for managing rules, prompts, skill-jacks, and context for AI projects.',
  status: 'coming soon',
  icon: 'brain-garden', // Use name as identifier
  badges: [
    { text: '🧠 Orchestration', bg: '#e0e7ff', color: '#3730a3' },
    { text: '🛠️ Agent Infra', bg: '#fef9c3', color: '#92400e' },
  ],
  link: '#' 
};

export const cursorDirectoryStructure: ProjectData = {
  name: 'cursor-directory-structure',
  description: 'Tool to analyze and visualize project directory structures.',
  status: 'internal',
  icon: '📂', // Fallback emoji
};

export const tsImportMove: ProjectData = {
  name: 'ts-import-move',
  description: 'Utility to automatically update TypeScript imports on file moves.',
  status: 'internal',
  icon: '🗂️', // Fallback emoji
};

export const browserUseCli: ProjectData = {
  name: 'browser-use-cli',
  description: 'CLI tool for browser automation tasks.',
  status: 'internal',
  icon: '🧪', // Fallback emoji
};

export const carouselProjects: ProjectData[] = [
  brainGarden,
  cursorDirectoryStructure,
  tsImportMove,
  browserUseCli,
]; 