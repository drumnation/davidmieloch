import type { Meta, StoryObj } from '@storybook/react';
import { CodeExamples } from './CodeExamples';
import { mockRepositories } from './mockData';

const meta = {
  title: 'Pages/04-Code-Examples',
  component: CodeExamples,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CodeExamples>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    repositories: mockRepositories,
  },
}; 