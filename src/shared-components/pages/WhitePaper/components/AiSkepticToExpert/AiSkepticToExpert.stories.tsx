import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { AiSkepticToExpert } from './AiSkepticToExpert';
import { defaultContent } from './AiSkepticToExpert.constants';

const meta = {
  title: 'Pages/01-WhitePaper/01-AiSkepticToExpert',
  component: AiSkepticToExpert,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        component: 'A section component that helps AI skeptics become experts, featuring a hero section, quotes from experts, and problem-solution cards.'
      }
    }
  },
} satisfies Meta<typeof AiSkepticToExpert>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  heroProps: defaultContent.hero,
  quotesProps: defaultContent.quotes,
  problemSolutionCardsProps: defaultContent.problemSolutions,
};

/**
 * Desktop view of the AiSkepticToExpert section.
 */
export const Desktop: Story = {
  args: defaultArgs,
  name: 'Desktop (Default)',
};

/**
 * Mobile view of the AiSkepticToExpert section.
 */
export const Mobile: Story = {
  args: defaultArgs,
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
    docs: { disable: true },
  },
  name: 'Mobile (iPhone X)',
};

/**
 * Tablet view of the AiSkepticToExpert section.
 */
export const Tablet: Story = {
  args: defaultArgs,
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
    docs: { disable: true },
  },
  name: 'Tablet (iPad)',
};