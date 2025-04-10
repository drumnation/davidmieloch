import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { SideNavigation } from './SideNavigation';
import { SideNavigationProps } from './SideNavigation.types';
import { 
  IconBrain, 
  IconCode, 
  IconGitPullRequest, 
  IconTestPipe, 
  IconComponents 
} from '@tabler/icons-react';

const meta: Meta<typeof SideNavigation> = {
  title: 'Organisms/SideNavigation',
  component: SideNavigation,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Side navigation component with mobile-first design that adapts to different screen sizes. Provides hierarchical navigation with collapsible sections.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SideNavigation>;

// Mock navigation items
const navigationItems = [
  {
    id: 'section-1',
    title: 'From AI Skeptic to Expert',
    icon: <IconBrain size={18} />,
  },
  {
    id: 'section-2',
    title: 'AI Autopilot Analogy',
    icon: <IconCode size={18} />,
  },
  {
    id: 'section-3',
    title: 'Brain Garden Overview',
    icon: <IconComponents size={18} />,
    subsections: [
      {
        id: 'section-3-1',
        title: 'Core Teams',
      },
      {
        id: 'section-3-2',
        title: 'Documentation Force Multiplier',
      },
      {
        id: 'section-3-3',
        title: 'Git Force Multiplier',
        icon: <IconGitPullRequest size={16} />,
      },
      {
        id: 'section-3-4',
        title: 'Knowledge Management',
      },
      {
        id: 'section-3-5',
        title: 'Parallel Development',
      },
      {
        id: 'section-3-6',
        title: 'Team Customization',
      },
      {
        id: 'section-3-7',
        title: 'Test Force Multiplier',
        icon: <IconTestPipe size={16} />,
      },
    ],
  },
  {
    id: 'section-4',
    title: 'System Architecture',
    subsections: [
      {
        id: 'section-4-1',
        title: 'Agent System',
      },
      {
        id: 'section-4-2',
        title: 'Integration System',
      },
      {
        id: 'section-4-3',
        title: 'Knowledge System',
      },
    ],
  },
  {
    id: 'section-5',
    title: 'Enterprise Journey',
    subsections: [
      {
        id: 'section-5-1',
        title: 'Core Problems',
      },
      {
        id: 'section-5-2',
        title: 'Enterprise Journey',
      },
      {
        id: 'section-5-3',
        title: 'Solutions Impact',
      },
    ],
  },
];

// Template for all stories
const Template = (args: SideNavigationProps) => (
  <div style={{ 
    padding: '20px', 
    backgroundColor: args.style === 'dark' ? '#1A1B1E' : '#ffffff',
    height: '600px',
    width: '300px',
  }}>
    <SideNavigation {...args} />
  </div>
);

// Template for mobile stories
const MobileTemplate = (args: SideNavigationProps) => (
  <div style={{ 
    padding: '20px', 
    backgroundColor: args.style === 'dark' ? '#1A1B1E' : '#ffffff',
    height: '600px',
    // The width here is restricted to simulate a mobile device width
    width: '100%',
    maxWidth: '320px',
  }}>
    <SideNavigation {...args} />
  </div>
);

export const Light: Story = {
  render: (args) => Template({ ...args, style: 'light' }),
  args: {
    items: navigationItems,
    activeId: 'section-1',
    style: 'light',
  },
};

/**
 * Mobile view of light side navigation
 */
export const LightMobile: Story = {
  render: (args) => MobileTemplate({ ...args, style: 'light' }),
  args: {
    items: navigationItems,
    activeId: 'section-1',
    style: 'light',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Light theme side navigation as viewed on mobile devices. The navigation adapts to the narrower screen width with optimized touch targets.',
      },
    },
  },
};

export const Dark: Story = {
  render: (args) => Template({ ...args, style: 'dark' }),
  args: {
    items: navigationItems,
    activeId: 'section-3-3',
    style: 'dark',
  },
};

/**
 * Mobile view of dark side navigation
 */
export const DarkMobile: Story = {
  render: (args) => MobileTemplate({ ...args, style: 'dark' }),
  args: {
    items: navigationItems,
    activeId: 'section-3-3',
    style: 'dark',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Dark theme side navigation as viewed on mobile devices.',
      },
    },
  },
};

export const WithActiveSubsection: Story = {
  render: (args) => Template(args),
  args: {
    items: navigationItems,
    activeId: 'section-3-3',
    style: 'light',
  },
};

/**
 * Mobile view of side navigation with active subsection
 */
export const WithActiveSubsectionMobile: Story = {
  render: (args) => MobileTemplate(args),
  args: {
    items: navigationItems,
    activeId: 'section-3-3',
    style: 'light',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Side navigation with an active subsection as viewed on mobile devices. Shows how nested items are displayed in the mobile view.',
      },
    },
  },
}; 