import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from './Hero';

const meta = {
  title: 'Organisms/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A full-width hero section with background patterns. Implements mobile-first design principles with responsive typography and spacing.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    background: {
      control: 'select',
      options: ['gradient', 'light', 'dark', 'minimal'],
      description: 'Background style of the hero section',
    },
    pattern: {
      control: 'select',
      options: ['circuit-board', 'dots', 'none'],
      description: 'Background pattern overlay',
    },
    textColor: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Text color scheme',
    },
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Welcome to My Portfolio',
    subtitle: "Let me guess... you're looking for a senior engineer who can help scale your team?",
    background: 'gradient',
    pattern: 'circuit-board',
    textColor: 'light',
  },
};

/**
 * Default hero section as viewed on mobile devices
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
        story: 'Default hero section as viewed on mobile devices. Typography and padding adjust for smaller screens.',
      },
    },
  },
};

/**
 * Default hero section as viewed on tablet devices
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
        story: 'Default hero section as viewed on tablet devices. Shows the responsive design between mobile and desktop sizes.',
      },
    },
  },
};

export const LightBackground: Story = {
  args: {
    title: 'Building Better Solutions',
    subtitle: 'Transforming complex challenges into elegant solutions through innovative engineering',
    background: 'light',
    pattern: 'dots',
    textColor: 'dark',
  },
};

/**
 * Light background hero section as viewed on mobile devices
 */
export const LightBackgroundMobile: Story = {
  args: {
    ...LightBackground.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Light background hero section as viewed on mobile devices.',
      },
    },
  },
};

export const DarkMinimal: Story = {
  args: {
    title: 'Engineering Excellence',
    subtitle: 'Bringing over a decade of experience in scaling high-performance teams',
    background: 'dark',
    pattern: 'none',
    textColor: 'light',
  },
};

/**
 * Dark minimal hero section as viewed on mobile devices
 */
export const DarkMinimalMobile: Story = {
  args: {
    ...DarkMinimal.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Dark minimal hero section as viewed on mobile devices.',
      },
    },
  },
}; 