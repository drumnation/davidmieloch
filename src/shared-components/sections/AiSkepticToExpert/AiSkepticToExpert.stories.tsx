import type { Meta, StoryObj } from '@storybook/react';
import { AiSkepticToExpert } from './AiSkepticToExpert';
import { defaultContent } from './AiSkepticToExpert.constants';

const meta = {
  title: 'Pages/01-WhitePaper/01-AiSkepticToExpert',
  component: AiSkepticToExpert,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A section component that helps AI skeptics become experts, featuring a hero section, quotes from experts, and problem-solution cards. Responsive design ensures optimal viewing across all device sizes.'
      }
    }
  },
} satisfies Meta<typeof AiSkepticToExpert>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the AiSkepticToExpert section with its embedded content.
 * This will use Storybook's default viewport setting.
 */
export const Default: Story = {
  args: {
    heroProps: defaultContent.hero,
    quotesProps: defaultContent.quotes,
    problemSolutionCardsProps: defaultContent.problemSolutions,
  },
};

/**
 * Desktop view of the AiSkepticToExpert section.
 * This shows how the component appears on standard desktop screens.
 */
export const Desktop: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'The AiSkepticToExpert section as viewed on desktop devices. Shows the full-width layout with optimal reading experience for larger screens.'
      },
    },
  },
};

/**
 * Mobile view of the AiSkepticToExpert section.
 * This showcases how the component adapts to mobile screen sizes,
 * with responsive layout changes to optimize readability and user experience.
 */
export const Mobile: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'The AiSkepticToExpert section as viewed on mobile devices. Notice how the layout adapts to the smaller screen size, with components stacking vertically and proper touch-friendly spacing. The component uses responsive design to ensure all content remains accessible and legible on smaller screens.'
      },
    },
  },
};

/**
 * Tablet view of the AiSkepticToExpert section.
 * Demonstrates the intermediate responsive behavior between mobile and desktop.
 */
export const Tablet: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'The AiSkepticToExpert section as viewed on tablet devices. This view represents the intermediate responsive state that bridges mobile and desktop experiences.'
      },
    },
  },
};