import type { Meta, StoryObj } from '@storybook/react';
import { ReactNativeFeature } from './ReactNativeFeature';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../../../styles/theme/styled-theme';

const meta = {
  title: 'Pages/02-BestPractices/03-ReactNativeFeature',
  component: ReactNativeFeature,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A feature section highlighting React Native & Expo development capabilities.'
      }
    }
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ReactNativeFeature>;

export default meta;
type Story = StoryObj<typeof ReactNativeFeature>;

/**
 * The default story shows the ReactNativeFeature component with default content.
 */
export const Default: Story = {
  args: {
    isVisible: true,
  },
};

/**
 * This story shows the ReactNativeFeature component with custom content.
 */
export const CustomContent: Story = {
  args: {
    isVisible: true,
    title: "Custom React Native Section",
    description: "A custom description for the React Native & Expo feature section.",
    items: [
      { text: "Custom feature item 1" },
      { text: "Custom feature item 2" },
      { text: "Custom feature item 3" },
      { text: "Custom feature item 4" },
    ]
  },
}; 