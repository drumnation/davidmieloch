import { Text, Badge } from '@mantine/core';
import React from 'react';
import { FcBiotech, FcServices, FcIdea, FcElectronics, FcEngineering, FcTemplate } from 'react-icons/fc';

/**
 * Project Data Types
 */
export interface BadgeData {
    text: string;
    icon?: React.ElementType;
    bg: string;
    color?: string;
}

// Icon type options
export type IconType = 'image' | 'techIcon' | 'emoji';

/**
 * Project data interface for all project card displays
 */
export interface ProjectData {
    name: string;
    description: string;
    status?: 'live' | 'coming soon' | 'internal';
    link?: string;
    iconType: IconType;
    iconValue: string; // Path for image, name for techIcon, character for emoji
    iconBackgroundColor?: string; // Background for the icon container
    badges?: BadgeData[]; // Array of badges
}

/**
 * Featured Project Constants
 */
export const PROJECT_AI_CONTEXT_GENERATOR: ProjectData = {
    name: 'AI Context Generator',
    description: 'VS Code extension that generates smart summaries for codebases using GPT.',
    status: 'live',
    link: 'https://marketplace.visualstudio.com/items?itemName=drumnation.ai-context-generator',
    iconType: 'image', // Special handling in Home.tsx for this specific external image
    iconValue: 'ai-context-generator',
    iconBackgroundColor: 'white',
    badges: [
        { text: 'AI', icon: FcBiotech, bg: '#e0e7ff', color: '#3730a3' },
        { text: 'DevX', icon: FcElectronics, bg: '#fef9c3', color: '#92400e' },
    ]
};

export const PROJECT_PROMPT_FORGE: ProjectData = {
    name: 'Prompt Forge',
    description: 'Modular prompt and template engine for chaining GPT workflows and tooling.',
    status: 'live',
    link: 'https://github.com/drumnation/prompt-forge',
    iconType: 'image',
    iconValue: '/media/prompt-forge-logo.png',
    iconBackgroundColor: 'white',
    badges: [
        { text: 'PromptOps', icon: FcTemplate, bg: '#e0e7ff', color: '#3730a3' },
        { text: 'Templates', icon: FcEngineering, bg: '#fef9c3', color: '#92400e' },
    ]
};

/**
 * Carousel Project Constants
 */
export const PROJECT_BRAIN_GARDEN: ProjectData = {
    name: 'Brain Garden',
    description: 'An internal OS for managing rules, prompts, skill-jacks, and context for AI projects.',
    status: 'coming soon',
    iconType: 'image',
    iconValue: '/media/misc/brain-garden.png',
    badges: [
        { text: 'Orchestration', icon: FcBiotech, bg: '#e0e7ff', color: '#3730a3' },
        { text: 'Agent Infra', icon: FcServices, bg: '#fef9c3', color: '#92400e' },
    ],
    link: '#'
};

export const PROJECT_CURSOR_DIRECTORY_STRUCTURE: ProjectData = {
    name: 'cursor-directory-structure-ts',
    description: 'Tool that watches your project directory and updates a map of the directory structure that Cursor Agent can use to navigate your project.',
    status: 'live',
    iconType: 'image',
    iconValue: '/media/cursor.png',
    iconBackgroundColor: '#4a5568',
    link: 'https://github.com/dmieloch/cursor-directory-structure-ts',
};

export const PROJECT_TS_IMPORT_MOVE: ProjectData = {
    name: 'ts-import-move',
    description: 'Agent CLI tool that fixes the problem of broken TypeScript imports when files are moved, by automatically updating import paths.',
    status: 'live',
    iconType: 'techIcon',
    iconValue: 'typescript',
    link: 'https://github.com/dmieloch/ts-import-move',
};

export const PROJECT_BROWSER_USE_CLI: ProjectData = {
    name: 'browser-use-cli',
    description: 'CLI tool for the browser-use library, enabling Cursor Agent to generate prompts for a browser agent that can interact with the UI, see, debug, autonomously test, and provide feedback.',
    status: 'live',
    iconType: 'image',
    iconValue: '/browser-use.jpg',
    iconBackgroundColor: '#ffffff',
    link: 'https://github.com/dmieloch/browser-use-cli',
};

export const PROJECT_UNSPLASH_MCP: ProjectData = {
    name: 'unsplash-smart-mcp-server',
    description: 'Enables AI agents to seamlessly search, recommend, and deliver professional stock photos from Unsplash with intelligent context awareness and automated attribution management.',
    status: 'live',
    iconType: 'image',
    iconValue: '/unsplash-logo.png',
    iconBackgroundColor: '#ffffff',
    link: 'https://github.com/drumnation/unsplash-smart-mcp-server'
};

export const PROJECT_GRAPHITI_CLI: ProjectData = {
    name: 'graphiti-cli',
    description: 'CLI for the Graphiti library, enabling Cursor Agent to interact with the Graphiti Vectorized Knowledge Graph through CLI when the Graphiti MCP server fails.',
    status: 'live',
    iconType: 'image',
    iconValue: '/zep-logo.jpg',
    iconBackgroundColor: '#ffffff',
    link: 'https://github.com/drumnation/graphiti-cli/tree/feat/cli'
};

/**
 * Project Collections
 */
export const CAROUSEL_PROJECTS: ProjectData[] = [
    PROJECT_BRAIN_GARDEN,
    PROJECT_CURSOR_DIRECTORY_STRUCTURE,
    PROJECT_TS_IMPORT_MOVE,
    PROJECT_BROWSER_USE_CLI,
    PROJECT_UNSPLASH_MCP,
    PROJECT_GRAPHITI_CLI
]; 