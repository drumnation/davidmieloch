import type { Meta, StoryObj } from '@storybook/react';
import { AiSkepticToExpert } from './AiSkepticToExpert';
import { defaultContent } from './AiSkepticToExpert.constants';

const meta = {
  title: 'Sections/01-AiSkepticToExpert',
  component: AiSkepticToExpert,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A section showcasing the journey from AI skeptic to AI expert with real-world examples and solutions.',
      },
    },
  },
  tags: ['autodocs'],
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