import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import Testimonials from './Testimonials';
import { theme } from '../../../../../styles/theme/styled-theme';

const meta: Meta<typeof Testimonials> = {
  title: 'Sections/Bio/Testimonials',
  component: Testimonials,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div style={{ margin: '2rem', maxWidth: '1200px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Testimonials>;

export const Default: Story = {
  args: {},
}; 