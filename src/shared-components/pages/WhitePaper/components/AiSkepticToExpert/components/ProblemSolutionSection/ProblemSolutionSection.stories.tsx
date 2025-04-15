import type { Meta, StoryObj } from '@storybook/react';
import { ProblemSolutionSection } from './ProblemSolutionSection';
import { defaultContent } from '../../AiSkepticToExpert.constants';

const meta = {
  title: 'Pages/01-WhitePaper/01-AiSkepticToExpert/03-ProblemSolutionSection',
  component: ProblemSolutionSection,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'Common Problems & My Solutions',
    cards: defaultContent.problemSolutions.cards
  }
} satisfies Meta<typeof ProblemSolutionSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoCards: Story = {
  args: {
    cards: defaultContent.problemSolutions.cards.slice(0, 2)
  }
}; 