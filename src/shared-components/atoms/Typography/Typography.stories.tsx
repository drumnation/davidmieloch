import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Typography, H1, H2, H3, Body, Caption } from './Typography';
import { TypographyProps } from './Typography.types';
import styled from 'styled-components';

const StoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  padding: 2rem;
`;

const meta: Meta<typeof Typography> = {
  title: 'Atoms/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A foundational typography component that implements our design system\'s type scale. Mobile-first with responsive font sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'body', 'caption'],
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium', 'semibold', 'bold'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'light', 'gradient'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

// Base Typography Story
export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    variant: 'body',
    weight: 'regular',
    color: 'primary',
  },
};

// All Variants Story
export const AllVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <H1>Heading 1 - 48px Bold</H1>
    <H2>Heading 2 - 36px Semibold</H2>
    <H3>Heading 3 - 30px Medium</H3>
    <Body>Body Text - 18px Regular</Body>
    <Caption>Caption Text - 14px Regular</Caption>
  </div>
);

// Colors Story
export const Colors = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <H2 color="primary">Primary Text Color</H2>
    <H2 color="secondary">Secondary Text Color</H2>
    <div style={{ background: '#1A202C', padding: '1rem' }}>
      <H2 color="light">Light Text Color</H2>
    </div>
    <H2 color="gradient">Gradient Text Color</H2>
  </div>
);

// Weights Story
export const Weights = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Body weight="regular">Regular Weight - 400</Body>
    <Body weight="medium">Medium Weight - 500</Body>
    <Body weight="semibold">Semibold Weight - 600</Body>
    <Body weight="bold">Bold Weight - 700</Body>
  </div>
);

// Individual variant stories
export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1',
    weight: 'bold',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2',
    weight: 'bold',
  },
};

export const Body1: Story = {
  args: {
    variant: 'body1',
    children: 'Body 1 text with regular weight',
  },
};

export const Body2Secondary: Story = {
  args: {
    variant: 'body2',
    children: 'Body 2 text with secondary color',
    color: 'secondary',
  },
};

export const CaptionText: Story = {
  args: {
    variant: 'caption',
    children: 'Caption text',
    color: 'secondary',
  },
};

export const OverlineText: Story = {
  args: {
    variant: 'overline',
    children: 'OVERLINE TEXT',
    weight: 'medium',
  },
};

export const AccentText: Story = {
  args: {
    variant: 'body1',
    children: 'Accent colored text',
    color: 'accent',
  },
};

// Example usage story showing all variants
export const TypeScale: Story = {
  args: {
    children: 'Typography Scale',
  },
  render: () => (
    <StoryContainer>
      <Typography variant="h1" weight="bold">Heading 1</Typography>
      <Typography variant="h2" weight="bold">Heading 2</Typography>
      <Typography variant="h3" weight="bold">Heading 3</Typography>
      <Typography variant="h4" weight="bold">Heading 4</Typography>
      <Typography variant="body1">Body 1 - Primary text for main content</Typography>
      <Typography variant="body2">Body 2 - Secondary text for less emphasis</Typography>
      <Typography variant="caption" color="secondary">Caption - Small text for auxiliary information</Typography>
      <Typography variant="overline" weight="medium">OVERLINE - ALL CAPS LABEL TEXT</Typography>
    </StoryContainer>
  ),
};

// Responsive behavior story
export const ResponsiveText: Story = {
  args: {
    children: 'Responsive Typography',
  },
  render: () => (
    <StoryContainer>
      <Typography variant="h1" weight="bold">
        Responsive H1 - Resize window to see changes
      </Typography>
      <Typography variant="body1" color="secondary">
        This text and the heading above will adjust their size based on the viewport width.
        Try resizing your browser window to see the responsive behavior in action.
      </Typography>
    </StoryContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Typography components are mobile-first and adjust their size at different breakpoints. Resize the window to see the responsive behavior.',
      },
    },
  },
}; 