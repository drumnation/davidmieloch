import type { Meta, StoryObj } from '@storybook/react';
import { AiAutopilotAnalogy } from './AiAutopilotAnalogy';

const meta = {
  title: 'Sections/02-AiAutopilotAnalogy',
  component: AiAutopilotAnalogy,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A section component that explains the AI Autopilot Analogy, including comparison tables, reality vs. fiction, and strategic focus areas.'
      }
    }
  },
} satisfies Meta<typeof AiAutopilotAnalogy>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the AiAutopilotAnalogy section with its embedded content.
 * This is exactly how it will appear in the actual application.
 */
export const Default: Story = {
  args: {}
};