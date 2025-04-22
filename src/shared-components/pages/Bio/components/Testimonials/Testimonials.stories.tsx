import { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import Testimonials from './Testimonials';

const meta: Meta<typeof Testimonials> = {
  title: 'pages/03-Bio/Sections/Testimonials',
  component: Testimonials,
  decorators: [
    (Story) => (
      <div style={{ margin: '2rem', maxWidth: '1200px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Testimonials>;

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