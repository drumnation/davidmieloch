import type { Meta, StoryObj } from '@storybook/react';
import { FeaturePreview } from './FeaturePreview';

const meta = {
  title: 'Molecules/FeaturePreview',
  component: FeaturePreview,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: 'select',
      options: ['gradient-cards', 'accent-cards'],
      description: 'The visual style of the feature cards',
    },
    animation: {
      control: 'select',
      options: ['stagger-fade', 'slide-in', 'none'],
      description: 'The animation style for the features',
    },
  },
} satisfies Meta<typeof FeaturePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleFeatures = [
  {
    title: 'Brain Garden System',
    description: 'A comprehensive approach to AI integration',
    icon: 'brain-circuit',
  },
  {
    title: 'Prompt Forge',
    description: 'Custom tools for enhanced AI interaction',
    icon: 'tools',
  },
  {
    title: 'Development Practices',
    description: 'Carefully crafted workflows for success',
    icon: 'workflow',
  },
];

export const GradientCards: Story = {
  args: {
    features: sampleFeatures,
    style: 'gradient-cards',
    animation: 'stagger-fade',
  },
};

export const AccentCards: Story = {
  args: {
    features: sampleFeatures,
    style: 'accent-cards',
    animation: 'stagger-fade',
  },
};

export const SlideInAnimation: Story = {
  args: {
    features: sampleFeatures,
    style: 'gradient-cards',
    animation: 'slide-in',
  },
};

export const NoAnimation: Story = {
  args: {
    features: sampleFeatures,
    style: 'gradient-cards',
    animation: 'none',
  },
}; 