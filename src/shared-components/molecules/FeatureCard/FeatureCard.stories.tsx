import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FeatureCard } from './FeatureCard';
import { Icon } from '../../atoms/Icon';

const meta = {
  title: 'Molecules/FeatureCard',
  component: FeatureCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Feature card component with mobile-first design that adapts to different screen sizes. Used for highlighting key features or services.',
      },
    },
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

/**
 * Mobile view of the default feature card
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
        story: 'Default feature card as viewed on mobile devices. The card adapts its layout and spacing for optimal mobile viewing.',
      },
    },
  },
};

/**
 * Tablet view of the default feature card
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
        story: 'Default feature card as viewed on tablet devices. Shows the responsive design between mobile and desktop sizes.',
      },
    },
  },
};

export const GradientCard: Story = {
  args: {
    ...Default.args,
    style: 'gradient-card',
  },
};

/**
 * Mobile view of the gradient feature card
 */
export const GradientCardMobile: Story = {
  args: {
    ...GradientCard.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Gradient style feature card as viewed on mobile devices.',
      },
    },
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

/**
 * Mobile view of a feature card without an icon
 */
export const NoIconMobile: Story = {
  args: {
    ...NoIcon.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Feature card without an icon as viewed on mobile devices.',
      },
    },
  },
}; 