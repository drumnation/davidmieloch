import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { NavigationCard } from './NavigationCard';
import styled from 'styled-components';

const StoryContainer = styled.div`
  max-width: 400px;
  margin: 2rem;
`;

const meta: Meta<typeof NavigationCard> = {
  title: 'Organisms/NavigationCard',
  component: NavigationCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A navigation card component that combines a title, description, and call-to-action with optional icon. Features hover animations and style variants.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <StoryContainer>
        <Story />
      </StoryContainer>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NavigationCard>;

export const Default: Story = {
  args: {
    title: 'Get Started',
    description: 'Learn how to integrate our AI tools into your workflow and boost productivity.',
    action: 'Learn More',
    link: '#',
    icon: '🚀',
    style: 'accent-card',
  },
};

export const GradientStyle: Story = {
  args: {
    title: 'Explore Features',
    description: 'Discover the full potential of our AI-powered development tools.',
    action: 'View Features',
    link: '#',
    icon: '✨',
    style: 'gradient-card',
  },
};

export const WithoutIcon: Story = {
  args: {
    title: 'Documentation',
    description: 'Access comprehensive guides and API documentation.',
    action: 'Read Docs',
    link: '#',
    style: 'accent-card',
  },
};

export const NavigationGrid = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', maxWidth: '800px' }}>
    <NavigationCard
      title="Team Architect"
      description="Design and implement scalable system architectures."
      action="Meet the Team"
      link="#"
      icon="🏛️"
      style="gradient-card"
    />
    <NavigationCard
      title="Team Frontend"
      description="Create beautiful and responsive user interfaces."
      action="View Projects"
      link="#"
      icon="🎨"
      style="accent-card"
    />
    <NavigationCard
      title="Team AI/ML"
      description="Develop intelligent solutions using machine learning."
      action="Learn More"
      link="#"
      icon="🤖"
      style="gradient-card"
    />
    <NavigationCard
      title="Team Backend"
      description="Build robust and scalable server infrastructure."
      action="See Stack"
      link="#"
      icon="⚙️"
      style="accent-card"
    />
  </div>
); 