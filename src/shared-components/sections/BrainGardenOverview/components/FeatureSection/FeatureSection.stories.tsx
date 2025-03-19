import type { Meta, StoryObj } from '@storybook/react';
import { FeatureSection } from './FeatureSection';

const meta = {
  title: 'Sections/03-BrainGardenOverview/01-FeatureSection',
  component: FeatureSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FeatureSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Team Formation Process',
    description: 'Our AI team formation process follows a structured approach to ensure optimal team composition and collaboration.',
    features: [
      {
        title: 'Project Analysis',
        bulletPoints: [
          { text: 'Break down project requirements into distinct domains' },
          { text: 'Identify core technical challenges' },
          { text: 'Map out integration points and dependencies' },
          { text: 'Define quality and performance requirements' },
        ],
        icon: 'clipboard-check',
      },
      {
        title: 'Skill Mapping',
        bulletPoints: [
          { text: 'Determine required expertise for each domain' },
          { text: 'Identify overlapping skill requirements' },
          { text: 'Define specialized knowledge needs' },
          { text: 'Map out collaboration points' },
        ],
        icon: 'users',
      },
      {
        title: 'Agent Design',
        bulletPoints: [
          { text: 'Create agent personas based on skill requirements' },
          { text: 'Define agent specialties and focus areas' },
          { text: 'Generate skill-jacks (specialized knowledge bases)' },
          { text: 'Establish collaboration protocols' },
        ],
        icon: 'user-check',
      },
      {
        title: 'Team Optimization',
        bulletPoints: [
          { text: 'Ensure no gaps in coverage' },
          { text: 'Eliminate redundant responsibilities' },
          { text: 'Balance workload distribution' },
          { text: 'Define clear handoff points' },
        ],
        icon: 'settings',
      },
    ],
    style: 'accent-card',
    columns: 2,
  },
};

export const GradientCards: Story = {
  args: {
    ...Default.args,
    style: 'gradient-card',
  },
};

export const FourColumns: Story = {
  args: {
    ...Default.args,
    columns: 4,
  },
}; 