import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { ReactNativeFeature } from './ReactNativeFeature';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../../../styles/theme/styled-theme';

const meta = {
  title: 'Pages/02-BestPractices/03-ReactNativeFeature',
  component: ReactNativeFeature,
  parameters: {
    layout: 'padded',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
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
export const DefaultDesktop: Story = {
  args: {
    isVisible: true,
  },
  name: 'Default - Desktop',
};

export const DefaultMobile: Story = {
  args: {
    isVisible: true,
  },
  parameters: {
    viewport: { defaultViewport: 'iphonex' },
    docs: { disable: true },
  },
  name: 'Default - Mobile',
};

export const DefaultTablet: Story = {
  args: {
    isVisible: true,
  },
  parameters: {
    viewport: { defaultViewport: 'ipad' },
    docs: { disable: true },
  },
  name: 'Default - Tablet',
};

/**
 * This story shows the ReactNativeFeature component with custom content.
 */
export const CustomContentDesktop: Story = {
  args: {
    isVisible: true,
    title: "Custom React Native Section",
    description: "A custom description for the React Native & Expo feature section.",
    items: [
      { text: "Custom feature item 1" },
      { text: "Custom feature item 2" },
      { text: "Custom feature item 3" },
      { text: "Custom feature item 4" },
    ],
  },
  name: 'Custom Content - Desktop',
};

export const CustomContentMobile: Story = {
  args: {
    isVisible: true,
    title: "Custom React Native Section",
    description: "A custom description for the React Native & Expo feature section.",
    items: [
      { text: "Custom feature item 1" },
      { text: "Custom feature item 2" },
      { text: "Custom feature item 3" },
      { text: "Custom feature item 4" },
    ],
  },
  parameters: {
    viewport: { defaultViewport: 'iphonex' },
    docs: { disable: true },
  },
  name: 'Custom Content - Mobile',
};

export const CustomContentTablet: Story = {
  args: {
    isVisible: true,
    title: "Custom React Native Section",
    description: "A custom description for the React Native & Expo feature section.",
    items: [
      { text: "Custom feature item 1" },
      { text: "Custom feature item 2" },
      { text: "Custom feature item 3" },
      { text: "Custom feature item 4" },
    ],
  },
  parameters: {
    viewport: { defaultViewport: 'ipad' },
    docs: { disable: true },
  },
  name: 'Custom Content - Tablet',
}; 