import type { Meta, StoryObj } from '@storybook/react';
import FramerMotionTest from './FramerMotionTest';

const meta: Meta<typeof FramerMotionTest> = {
  title: 'Utils/Animations/FramerMotionTest',
  component: FramerMotionTest,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Test component for Framer Motion animation infrastructure',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FramerMotionTest>;

export const Default: Story = {
  args: {},
};

export const WithCustomControls: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates Framer Motion animations with custom timing and settings.',
      },
    },
  },
  render: () => {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Framer Motion Migration Test</h1>
        <p>This story demonstrates the new Framer Motion infrastructure for animations.</p>
        <p>The animations below should work correctly and not cause any Maximum Call Stack Size Exceeded errors.</p>
        <hr style={{ margin: '2rem 0' }} />
        <FramerMotionTest />
      </div>
    );
  },
}; 