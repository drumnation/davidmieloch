import React from 'react';
import { PracticeCategory, PracticeItem } from './BestPractices.types';
import { 
  IconAtom,
  IconHierarchy2,
  IconComponents,
  IconSettings,
  IconGitPullRequest,
  IconGitBranch,
  IconListCheck,
  IconArrowMoveRight,
  IconArrowsRightLeft
} from '@tabler/icons-react';

// Custom styled icons with brand colors
const ReactIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
    <path d="M12 21.5c-3.04 0-5.952-1.064-8.055-2.966-2.103-1.902-3.276-4.481-3.276-7.172 0-5.592 5.063-10.138 11.331-10.138 6.268 0 11.331 4.546 11.331 10.138 0 5.591-5.063 10.138-11.331 10.138z" strokeOpacity="0.5" />
    <path d="M12 2.5c3.04 0 5.952 1.064 8.055 2.966 2.103 1.902 3.276 4.481 3.276 7.172 0 5.592-5.063 10.138-11.331 10.138-6.268 0-11.331-4.546-11.331-10.138 0-5.591 5.063-10.138 11.331-10.138z" strokeOpacity="0.5" />
  </svg>
);

const TypeScriptIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect width="20" height="20" x="2" y="2" rx="2" fill="#3178C6" />
    <path d="M14.5 11.5v2.5c0 .5-.5 1-1 1h-1c-.5 0-1-.5-1-1v-2.5" stroke="white" strokeWidth="1.5" />
    <path d="M9 11.5h4" stroke="white" strokeWidth="1.5" />
    <path d="M9 16.5v-5" stroke="white" strokeWidth="1.5" />
  </svg>
);

const NxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L2 19.5h20L12 2z" fill="#143055" />
    <path d="M12 2l10 17.5h-20L12 2z" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 9l-4 7h8l-4-7z" fill="white" />
  </svg>
);

const TurborepoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#EF4444" />
    <circle cx="12" cy="12" r="5" fill="white" />
    <path d="M12 7v10" stroke="#EF4444" strokeWidth="1.5" />
    <path d="M7 12h10" stroke="#EF4444" strokeWidth="1.5" />
  </svg>
);

const PnpmIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="6" height="6" fill="#F9AD00" />
    <rect x="9" y="3" width="6" height="6" fill="#4E4E4E" />
    <rect x="15" y="3" width="6" height="6" fill="#F9AD00" />
    <rect x="3" y="9" width="6" height="6" fill="#4E4E4E" />
    <rect x="9" y="9" width="6" height="6" fill="#F9AD00" />
    <rect x="15" y="9" width="6" height="6" fill="#4E4E4E" />
    <rect x="3" y="15" width="6" height="6" fill="#F9AD00" />
    <rect x="9" y="15" width="6" height="6" fill="#4E4E4E" />
    <rect x="15" y="15" width="6" height="6" fill="#F9AD00" />
  </svg>
);

const ViteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L3 7.5L4.5 18L12 22L19.5 18L21 7.5L12 2Z" fill="#646CFF" />
    <path d="M16.5 5L8 17.5" stroke="white" strokeWidth="1.5" />
    <path d="M15 9L18 5.5L19 9L15 9Z" fill="#FFDD35" />
    <path d="M15 9L12 17L9 9H15Z" fill="white" />
  </svg>
);

const ESLintIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L3 7.5L4.5 18L12 22L19.5 18L21 7.5L12 2Z" fill="#4B32C3" />
    <path d="M8 9L12 5L16 9L16 15L12 19L8 15L8 9Z" fill="white" />
  </svg>
);

const StorybookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M5 3L6 21L19 21L20 3L5 3Z" fill="#FF4785" />
    <path d="M15 10C15 8.34 13.66 7 12 7C10.34 7 9 8.34 9 10C9 11.66 10.34 13 12 13C13.66 13 15 11.66 15 10Z" fill="white" />
    <path d="M12 13L12 17" stroke="white" strokeWidth="1.5" />
  </svg>
);

const PlaywrightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect width="20" height="20" x="2" y="2" rx="2" fill="#2D4857" />
    <path d="M7 12L12 7L17 12L12 17L7 12Z" fill="#16C172" />
  </svg>
);

const VitestIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect width="20" height="20" x="2" y="2" rx="2" fill="#729B1B" />
    <path d="M7 12L10 15L17 8" stroke="white" strokeWidth="2" />
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 16.42 5.36 20.12 9.6 21.42C10.08 21.52 10.26 21.22 10.26 20.96C10.26 20.72 10.26 20.04 10.24 19.22C7.12 19.82 6.48 17.86 6.48 17.86C6 16.72 5.32 16.42 5.32 16.42C4.44 15.82 5.38 15.82 5.38 15.82C6.34 15.9 6.9 16.8 6.9 16.8C7.76 18.3 9.28 17.9 10.28 17.64C10.38 17 10.68 16.58 11 16.34C8.56 16.1 6 15.28 6 11.48C6 10.38 6.42 9.48 7.08 8.76C6.96 8.52 6.6 7.48 7.18 6.12C7.18 6.12 8.1 5.86 10.24 7.14C11.14 6.92 12.1 6.82 13.06 6.82C14.02 6.82 14.98 6.92 15.88 7.14C18.02 5.86 18.94 6.12 18.94 6.12C19.52 7.48 19.16 8.52 19.04 8.76C19.7 9.48 20.12 10.38 20.12 11.48C20.12 15.28 17.56 16.08 15.1 16.32C15.5 16.62 15.86 17.22 15.86 18.12C15.86 19.42 15.84 20.64 15.84 20.96C15.84 21.22 16.02 21.52 16.5 21.42C20.74 20.12 24.1 16.42 24.1 12C24.1 6.48 19.62 2 14.1 2H12Z" fill="#24292E" />
  </svg>
);

// Map of icon names to icon components
const iconMap: Record<string, React.ReactNode> = {
  'atom': <IconAtom size={20} stroke="#61DAFB" />,
  'hierarchy': <IconHierarchy2 size={20} stroke="#FF6B6B" />,
  'components': <IconComponents size={20} stroke="#6A0DAD" />,
  'nx': <NxIcon />,
  'turborepo': <TurborepoIcon />,
  'pnpm': <PnpmIcon />,
  'typescript': <TypeScriptIcon />,
  'react': <ReactIcon />,
  'vite': <ViteIcon />,
  'eslint': <ESLintIcon />,
  'config': <IconSettings size={20} stroke="#F97316" />,
  'vitest': <VitestIcon />,
  'playwright': <PlaywrightIcon />,
  'storybook': <StorybookIcon />,
  'github': <GitHubIcon />,
  'husky': <IconGitBranch size={20} stroke="#E44D26" />,
  'review': <IconGitPullRequest size={20} stroke="#0366D6" />,
  'priority': <IconListCheck size={20} stroke="#38B2AC" />,
  'migration': <IconArrowMoveRight size={20} stroke="#805AD5" />,
  'workflow': <IconArrowsRightLeft size={20} stroke="#3182CE" />,
};

export const getIconForPractice = (iconName?: string): React.ReactNode => {
  if (!iconName || !iconMap[iconName]) {
    return <IconComponents size={20} stroke="#6A0DAD" />; // Default icon
  }
  
  return iconMap[iconName];
};

export const renderPracticeItem = (item: PracticeItem, index: number) => {
  return {
    icon: getIconForPractice(item.icon),
    title: item.title,
    description: item.description,
    key: `practice-item-${index}`,
  };
};

export const renderCategory = (category: PracticeCategory, index: number) => {
  return {
    title: category.title,
    description: category.description,
    items: category.items.map((item, itemIndex) => renderPracticeItem(item, itemIndex)),
    key: `category-${index}`,
  };
}; 