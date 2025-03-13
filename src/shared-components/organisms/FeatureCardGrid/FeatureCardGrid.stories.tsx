import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FeatureCardGrid } from './FeatureCardGrid';
import { Icon } from '../../atoms/Icon';

const meta = {
  title: 'Organisms/FeatureCardGrid',
  component: FeatureCardGrid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'select',
      options: [2, 4],
    },
    style: {
      control: 'select',
      options: ['gradient-card', 'accent-card'],
    },
    animation: {
      control: 'select',
      options: ['stagger-fade', 'slide-up', 'none'],
    },
  },
} satisfies Meta<typeof FeatureCardGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    features: [
      {
        title: 'Project Analysis',
        bulletPoints: [
          { text: 'Break down project requirements into distinct domains' },
          { text: 'Identify core technical challenges' },
          { text: 'Map out integration points and dependencies' },
          { text: 'Define quality and performance requirements' },
        ],
        icon: <Icon name="clipboard-check" size={24} />,
      },
      {
        title: 'Skill Mapping',
        bulletPoints: [
          { text: 'Determine required expertise for each domain' },
          { text: 'Identify overlapping skill requirements' },
          { text: 'Define specialized knowledge needs' },
          { text: 'Map out collaboration points' },
        ],
        icon: <Icon name="users" size={24} />,
      },
      {
        title: 'Agent Design',
        bulletPoints: [
          { text: 'Create agent personas based on skill requirements' },
          { text: 'Define agent specialties and focus areas' },
          { text: 'Generate skill-jacks (specialized knowledge bases)' },
          { text: 'Establish collaboration protocols' },
        ],
        icon: <Icon name="user-check" size={24} />,
      },
      {
        title: 'Team Optimization',
        bulletPoints: [
          { text: 'Ensure no gaps in coverage' },
          { text: 'Eliminate redundant responsibilities' },
          { text: 'Balance workload distribution' },
          { text: 'Define clear handoff points' },
        ],
        icon: <Icon name="settings" size={24} />,
      },
    ],
    columns: 2,
    style: 'accent-card',
    animation: 'stagger-fade',
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

export const SlideUpAnimation: Story = {
  args: {
    ...Default.args,
    animation: 'slide-up',
  },
}; 