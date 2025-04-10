import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { H2, Body } from '../Typography/Typography';

const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Card component with mobile-first design that adapts to different screen sizes.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['gradient', 'accent'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    fullWidth: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// Base Card Story
export const Default: Story = {
  args: {
    children: (
      <div>
        <H2>Card Title</H2>
        <Body>This is a card with some content inside.</Body>
      </div>
    ),
    variant: 'gradient',
    padding: 'md',
    fullWidth: false,
  },
};

/**
 * Mobile view of the default card
 */
export const DefaultMobile: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Default card as viewed on mobile devices.',
      },
    },
  },
};

/**
 * Tablet view of the default card
 */
export const DefaultTablet: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Default card as viewed on tablet devices.',
      },
    },
  },
};

// Variants Story
export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Card variant="gradient">
      <H2 color="light">Gradient Card</H2>
      <Body color="light">This card has a gradient background.</Body>
    </Card>
    <Card variant="accent">
      <H2>Accent Card</H2>
      <Body>This card has an accent style.</Body>
    </Card>
  </div>
);

/**
 * Mobile view of the card variants
 */
export const VariantsMobile: Story = {
  render: Variants,
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Card variants as viewed on mobile devices.',
      },
    },
  },
};

// Padding Story
export const Paddings = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Card variant="gradient" padding="none">
      <Body color="light">No Padding</Body>
    </Card>
    <Card variant="gradient" padding="sm">
      <Body color="light">Small Padding</Body>
    </Card>
    <Card variant="gradient" padding="md">
      <Body color="light">Medium Padding</Body>
    </Card>
    <Card variant="gradient" padding="lg">
      <Body color="light">Large Padding</Body>
    </Card>
    <Card variant="gradient" padding="xl">
      <Body color="light">Extra Large Padding</Body>
    </Card>
  </div>
);

/**
 * Mobile view of padding variants
 */
export const PaddingsMobile: Story = {
  render: Paddings,
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Different padding options as viewed on mobile devices.',
      },
    },
  },
};

// Width Story
export const Widths = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Card variant="gradient">
      <Body color="light">Auto Width Card</Body>
    </Card>
    <Card variant="gradient" fullWidth>
      <Body color="light">Full Width Card</Body>
    </Card>
  </div>
);

/**
 * Mobile view of width variants
 */
export const WidthsMobile: Story = {
  render: Widths,
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Width variants as viewed on mobile devices, showing how the card responds to different width settings.',
      },
    },
  },
}; 