import type { Meta, StoryObj } from '@storybook/react';
import HomePage from '../../app/page';

/**
 * The HomePage component is the main landing page for the site.
 * It showcases David Mieloch's expertise as a Full-Stack Business Person
 * and provides persona-targeted navigation to different sections of the site.
 */
const meta = {
  title: '00-Home/HomePage',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Main home page with hero section, persona navigation, and Full-Stack Business Person concept sections.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view of the HomePage.
 */
export const Default: Story = {
  args: {},
}; 