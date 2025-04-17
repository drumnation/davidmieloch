import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { BioIntro } from './BioIntro';

const meta = {
  title: 'Pages/03-Bio/Sections/Introduction',
  component: BioIntro,
  parameters: {
    layout: 'padded',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BioIntro>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  args: {},
  name: 'Desktop (Default)',
};

export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
    docs: { disable: true },
  },
  name: 'Mobile (iPhone X)',
};

export const Tablet: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
    docs: { disable: true },
  },
  name: 'Tablet (iPad)',
}; 