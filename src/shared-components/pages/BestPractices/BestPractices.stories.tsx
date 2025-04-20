import React from 'react';
import { Meta, StoryObj, StoryFn } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { BestPractices } from './BestPractices';
import { SubNavController } from '@shared-components/navigation/PageSubNav';
import { SubNavItem } from '@shared-components/navigation/PageSubNav/PageSubNav.types';
import {
  IconInfoCircle, IconBrandReact, IconSpeedboat, IconComponents,
  IconBrandTypescript, IconFlask, IconBrandStorybook, IconPlugConnected,
  IconCircleCheck, IconToolsKitchen2, IconReportAnalytics, IconPackage,
  IconNotes, IconChecklist, IconLayoutGrid, IconGitBranch, IconTool,
  IconRocket, IconTrendingUp, IconFlag3, IconZoomCode, IconTargetArrow,
  IconUsersGroup
} from '@tabler/icons-react';

// Define Navigation Items (same as in BestPractices.tsx)
const bestPracticesNavItems: SubNavItem[] = [
  {
    id: 'bp-detailed-content', title: 'Introduction & Overview', level: 0, icon: <IconInfoCircle size={18} />,
  },
  { id: 'bp-intro-modern', title: 'Modern Practices', level: 1, icon: <IconBrandReact size={16} /> },
  { id: 'bp-intro-enterprise', title: 'Enterprise Acceleration', level: 1, icon: <IconSpeedboat size={16} /> },
  { id: 'bp-intro-components', title: 'Component Architecture', level: 1, icon: <IconComponents size={16} /> },
  { id: 'bp-intro-typescript', title: 'TypeScript Practices', level: 1, icon: <IconBrandTypescript size={16} /> },
  { id: 'bp-intro-testing', title: 'Testing Strategy', level: 1, icon: <IconFlask size={16} /> },
  { id: 'bp-intro-storybook', title: 'Storybook Documentation', level: 1, icon: <IconBrandStorybook size={16} /> },
  { id: 'bp-intro-bottleneck', title: 'Shared Library Bottleneck', level: 1, icon: <IconPlugConnected size={16} /> },
  { id: 'bp-intro-quality', title: 'Code Quality', level: 1, icon: <IconCircleCheck size={16} /> },
  { id: 'bp-intro-dev-env', title: 'Development Environment', level: 1, icon: <IconToolsKitchen2 size={16} /> },
  { id: 'bp-intro-performance', title: 'Performance Optimization', level: 1, icon: <IconReportAnalytics size={16} /> },
  { id: 'bp-intro-deps', title: 'Dependency Management', level: 1, icon: <IconPackage size={16} /> },
  { id: 'bp-intro-summary', title: 'Summary', level: 1, icon: <IconNotes size={16} /> },
  {
    id: 'bp-key-practices', title: 'Key Practice Areas', level: 0, icon: <IconChecklist size={18} />,
  },
  { id: 'component-architecture', title: 'Component Architecture', level: 1, icon: <IconLayoutGrid size={16} /> },
  { id: 'monorepo-architecture', title: 'Monorepo Architecture', level: 1, icon: <IconGitBranch size={16} /> },
  { id: 'modern-tooling', title: 'Modern Tooling', level: 1, icon: <IconTool size={16} /> },
  { id: 'comprehensive-testing', title: 'Comprehensive Testing', level: 1, icon: <IconFlask size={16} /> },
  { id: 'ci-cd-pipeline', title: 'CI/CD Pipeline', level: 1, icon: <IconRocket size={16} /> },
  { id: 'incremental-adoption', title: 'Incremental Adoption', level: 1, icon: <IconTrendingUp size={16} /> },
  {
    id: 'bp-conclusion', title: 'Conclusion', level: 0, icon: <IconFlag3 size={18} />,
  },
  { id: 'bp-conclusion-synergy', title: 'AI Synergy', level: 1, icon: <IconZoomCode size={16} /> },
  { id: 'bp-conclusion-future', title: 'Building for the Future', level: 1, icon: <IconTargetArrow size={16} /> },
  {
    id: 'lets-work-together', title: "Let's Work Together", level: 0, icon: <IconUsersGroup size={18} />
  },
];

const meta: Meta<typeof BestPractices> = {
  title: 'Pages/02-BestPractices/Section',
  component: BestPractices,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        component: 'A section component that showcases modern development best practices with detailed content, categories, and conclusions. Includes page sub-navigation.'
      }
    },
  },
} satisfies Meta<typeof BestPractices>;

export default meta;
type Story = StoryObj<typeof BestPractices>;

/**
 * The default story shows the BestPractices section with its embedded content.
 * This is exactly how it will appear in the actual application.
 */
export const Default: Story = {
  args: {
    id: 'best-practices',
  },
};

/**
 * Desktop view of the BestPractices section.
 */
export const Desktop: Story = {
  args: {
    id: 'best-practices',
  },
  name: 'Desktop (Default)',
};

/**
 * Mobile view of the BestPractices section.
 */
export const Mobile: Story = {
  args: {
    id: 'best-practices',
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
    docs: { disable: true },
  },
  name: 'Mobile (iPhone X)',
};

/**
 * Tablet view of the BestPractices section.
 */
export const Tablet: Story = {
  args: {
    id: 'best-practices',
  },
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
    docs: { disable: true },
  },
  name: 'Tablet (iPad)',
}; 