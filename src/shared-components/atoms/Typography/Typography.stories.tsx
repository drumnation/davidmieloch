import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Typography, H1, H2, H3, Body, Caption } from './Typography';
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

/**
 * Mobile view of the default typography
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
        story: 'Default typography as viewed on mobile devices. Font sizes adjust for optimal readability on smaller screens.',
      },
    },
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

/**
 * Mobile view of all typography variants
 */
export const AllVariantsMobile: Story = {
  render: AllVariants,
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'All typography variants as viewed on mobile devices. Font sizes scale down proportionally for smaller screens.',
      },
    },
  },
};

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

/**
 * Mobile view of typography colors
 */
export const ColorsMobile: Story = {
  render: Colors,
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Typography color variations as viewed on mobile devices.',
      },
    },
  },
};

// Weights Story
export const Weights = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Body weight="regular">Regular Weight - 400</Body>
    <Body weight="medium">Medium Weight - 500</Body>
    <Body weight="semibold">Semibold Weight - 600</Body>
    <Body weight="bold">Bold Weight - 700</Body>
  </div>
);

/**
 * Mobile view of typography weights
 */
export const WeightsMobile: Story = {
  render: Weights,
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Typography weight variations as viewed on mobile devices.',
      },
    },
  },
};

// Individual variant stories
export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1',
    weight: 'bold',
  },
};

/**
 * Mobile view of Heading1
 */
export const Heading1Mobile: Story = {
  args: {
    ...Heading1.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'H1 heading as viewed on mobile devices. Font size scales down for optimal display on smaller screens.',
      },
    },
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2',
    weight: 'bold',
  },
};

/**
 * Mobile view of Heading2
 */
export const Heading2Mobile: Story = {
  args: {
    ...Heading2.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'H2 heading as viewed on mobile devices. Font size scales down for optimal display on smaller screens.',
      },
    },
  },
};

export const Body1: Story = {
  args: {
    variant: 'body',
    children: 'Body 1 text with regular weight',
  },
};

/**
 * Mobile view of Body1
 */
export const Body1Mobile: Story = {
  args: {
    ...Body1.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Body text as viewed on mobile devices. Maintains readable font size for mobile content.',
      },
    },
  },
};

export const Body2Secondary: Story = {
  args: {
    variant: 'body',
    children: 'Body 2 text with secondary color',
    color: 'secondary',
  },
};

/**
 * Mobile view of Body2Secondary
 */
export const Body2SecondaryMobile: Story = {
  args: {
    ...Body2Secondary.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Secondary body text as viewed on mobile devices. Secondary color maintains proper contrast on smaller screens.',
      },
    },
  },
};

export const CaptionText: Story = {
  args: {
    variant: 'caption',
    children: 'Caption text',
    color: 'secondary',
  },
};

/**
 * Mobile view of CaptionText
 */
export const CaptionTextMobile: Story = {
  args: {
    ...CaptionText.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Caption text as viewed on mobile devices. Remains legible at smaller sizes on mobile screens.',
      },
    },
  },
};

export const OverlineText: Story = {
  args: {
    variant: 'caption',
    children: 'OVERLINE TEXT',
    weight: 'medium',
  },
};

/**
 * Mobile view of OverlineText
 */
export const OverlineTextMobile: Story = {
  args: {
    ...OverlineText.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Overline text as viewed on mobile devices. All-caps formatting maintains clarity at mobile sizes.',
      },
    },
  },
};

export const AccentText: Story = {
  args: {
    variant: 'body',
    children: 'Accent colored text',
    color: 'gradient',
  },
};

/**
 * Mobile view of AccentText
 */
export const AccentTextMobile: Story = {
  args: {
    ...AccentText.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Accent text with gradient color as viewed on mobile devices. Gradient effect scales appropriately for smaller screens.',
      },
    },
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
      <Typography variant="h3" weight="bold">Heading 3</Typography>
      <Typography variant="body">Body - Primary text for main content</Typography>
      <Typography variant="body">Body - Secondary text for less emphasis</Typography>
      <Typography variant="caption" color="secondary">Caption - Small text for auxiliary information</Typography>
      <Typography variant="caption" weight="medium">CAPTION - ALL CAPS LABEL TEXT</Typography>
    </StoryContainer>
  ),
};

/**
 * Mobile view of the typography scale
 */
export const TypeScaleMobile: Story = {
  render: TypeScale.render,
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Complete typography scale as viewed on mobile devices. Shows how all text elements scale proportionally on smaller screens.',
      },
    },
  },
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
      <Typography variant="body" color="secondary">
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