import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FeatureCard } from './FeatureCard';
import { Icon } from '../../atoms/Icon';

const meta = {
  title: 'Molecules/FeatureCard',
  component: FeatureCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: 'select',
      options: ['gradient-card', 'accent-card'],
    },
    animation: {
      control: 'select',
      options: ['fade-in', 'slide-up', 'none'],
    },
  },
} satisfies Meta<typeof FeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Project Analysis',
    bulletPoints: [
      { text: 'Break down project requirements into distinct domains' },
      { text: 'Identify core technical challenges' },
      { text: 'Map out integration points and dependencies' },
      { text: 'Define quality and performance requirements' },
    ],
    icon: <Icon name="clipboard-check" size={24} />,
    style: 'accent-card',
    animation: 'fade-in',
  },
};

export const GradientCard: Story = {
  args: {
    ...Default.args,
    style: 'gradient-card',
  },
};

export const SlideUpAnimation: Story = {
  args: {
    ...Default.args,
    animation: 'slide-up',
  },
};

export const NoIcon: Story = {
  args: {
    ...Default.args,
    icon: undefined,
  },
}; 