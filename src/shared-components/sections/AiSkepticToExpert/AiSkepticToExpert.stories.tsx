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
        component: 'A section component that helps AI skeptics become experts, featuring a hero section, quotes from experts, and problem-solution cards.'
      }
    }
  },
} satisfies Meta<typeof AiSkepticToExpert>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the AiSkepticToExpert section with its embedded content.
 * This is exactly how it will appear in the actual application.
 */
export const Default: Story = {
  args: {
    heroProps: defaultContent.hero,
    quotesProps: defaultContent.quotes,
    problemSolutionCardsProps: defaultContent.problemSolutions,
  },
};