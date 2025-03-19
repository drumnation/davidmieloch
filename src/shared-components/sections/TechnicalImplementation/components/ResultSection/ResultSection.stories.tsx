import type { Meta, StoryObj } from '@storybook/react';
import { ResultSection } from './ResultSection';
import { defaultContent } from '../../TechnicalImplementation.constants';

const meta = {
  title: 'Pages/01-WhitePaper/04-TechnicalImplementation/07-ResultSection',
  component: ResultSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ResultSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    result: defaultContent.result
  },
}; 