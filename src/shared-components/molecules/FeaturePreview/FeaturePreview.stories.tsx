import type { Meta, StoryObj } from '@storybook/react';
import { FeaturePreview } from './FeaturePreview';

const meta = {
  title: 'Molecules/FeaturePreview',
  component: FeaturePreview,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Feature preview component with mobile-first design that adapts to different screen sizes. Displays a collection of feature cards in a grid layout.',
      },
    },
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

/**
 * Mobile view of gradient cards feature preview
 */
export const GradientCardsMobile: Story = {
  args: {
    ...GradientCards.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Gradient cards feature preview as viewed on mobile devices. The grid layout automatically stacks vertically on mobile for better readability.',
      },
    },
  },
};

/**
 * Tablet view of gradient cards feature preview
 */
export const GradientCardsTablet: Story = {
  args: {
    ...GradientCards.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Gradient cards feature preview as viewed on tablet devices. The layout adjusts to optimize for medium-sized screens.',
      },
    },
  },
};

export const AccentCards: Story = {
  args: {
    features: sampleFeatures,
    style: 'accent-cards',
    animation: 'stagger-fade',
  },
};

/**
 * Mobile view of accent cards feature preview
 */
export const AccentCardsMobile: Story = {
  args: {
    ...AccentCards.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Accent cards feature preview as viewed on mobile devices.',
      },
    },
  },
};

export const SlideInAnimation: Story = {
  args: {
    features: sampleFeatures,
    style: 'gradient-cards',
    animation: 'slide-in',
  },
};

/**
 * Mobile view of slide-in animation feature preview
 */
export const SlideInAnimationMobile: Story = {
  args: {
    ...SlideInAnimation.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Feature preview with slide-in animation as viewed on mobile devices.',
      },
    },
  },
};

export const NoAnimation: Story = {
  args: {
    features: sampleFeatures,
    style: 'gradient-cards',
    animation: 'none',
  },
}; 