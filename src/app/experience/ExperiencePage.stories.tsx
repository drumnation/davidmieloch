import type { Meta, StoryObj } from '@storybook/react';
import { ExperiencePage } from './ExperiencePage';

const meta: Meta<typeof ExperiencePage> = {
  title: 'Pages/ExperiencePage',
  component: ExperiencePage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ExperiencePage>;

export const Default: Story = {}; 