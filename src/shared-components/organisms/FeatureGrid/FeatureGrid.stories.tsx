import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { FeatureGrid } from './FeatureGrid';

const meta: Meta<typeof FeatureGrid> = {
  title: 'Organisms/FeatureGrid',
  component: FeatureGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof FeatureGrid>;

const defaultFeatures = [
  {
    title: 'Specialized Focus',
    description: 'Each team excels in their domain with deep expertise and dedicated resources.',
    icon: '🎯',
  },
  {
    title: 'Parallel Progress',
    description: 'Multiple features advance simultaneously through coordinated team efforts.',
    icon: '⚡',
  },
  {
    title: 'Quality Control',
    description: 'Multi-level review and validation ensures high-quality output.',
    icon: '✅',
  },
  {
    title: 'Knowledge Growth',
    description: 'Continuous learning and improvement through shared experiences.',
    icon: '🧠',
  },
];

// Base FeatureGrid Story
export const Default: Story = {
  args: {
    features: defaultFeatures,
    columns: 2,
    style: 'gradient-cards',
    animation: 'stagger-fade',
  },
};

// Grid Columns Story
export const GridColumns = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
    <FeatureGrid
      features={defaultFeatures}
      columns={2}
      style="gradient-cards"
      animation="stagger-fade"
    />
    <FeatureGrid
      features={[...defaultFeatures, ...defaultFeatures.slice(0, 2)]}
      columns={3}
      style="gradient-cards"
      animation="stagger-fade"
    />
    <FeatureGrid
      features={[...defaultFeatures, ...defaultFeatures]}
      columns={4}
      style="gradient-cards"
      animation="stagger-fade"
    />
  </div>
);

// Style Variants Story
export const StyleVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
    <FeatureGrid
      features={defaultFeatures}
      columns={2}
      style="gradient-cards"
      animation="stagger-fade"
    />
    <FeatureGrid
      features={defaultFeatures}
      columns={2}
      style="accent-cards"
      animation="stagger-fade"
    />
  </div>
);

// Animation Variants Story
export const AnimationVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
    <FeatureGrid
      features={defaultFeatures}
      columns={2}
      style="gradient-cards"
      animation="stagger-fade"
    />
    <FeatureGrid
      features={defaultFeatures}
      columns={2}
      style="gradient-cards"
      animation="slide-up"
    />
  </div>
); 