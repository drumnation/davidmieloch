import type { Meta, StoryObj } from '@storybook/react';
import Bio from './Bio';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme/styled-theme';

// Add console log to debug
console.log('Bio.stories.tsx loaded');
console.log('Theme:', theme);

const meta: Meta<typeof Bio> = {
  title: 'Sections/Bio',
  component: Bio,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Bio>;

export const Default: Story = {
  args: {
    id: 'bio',
  },
}; 