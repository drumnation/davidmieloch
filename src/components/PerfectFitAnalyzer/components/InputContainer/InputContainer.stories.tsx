import type { Meta, StoryObj } from '@storybook/react';
import InputContainer from './InputContainer';

/**
 * The InputContainer component provides a tabbed interface to input job descriptions
 * either via file upload or text input.
 */
const meta = {
  title: 'PerfectFitAnalyzer/InputContainer',
  component: InputContainer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A tabbed container component that allows users to either upload a job description file or paste text directly. Used in the Perfect Fit Analyzer feature.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onJobDescriptionSubmit: { action: 'job description submitted' },
    loading: {
      control: 'boolean',
      description: 'Shows loading state',
    },
  },
} satisfies Meta<typeof InputContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state of the InputContainer component
 */
export const Default: Story = {
  args: {
    loading: false,
    onJobDescriptionSubmit: (text, source) => {
      console.log(`Job description submitted from ${source}:`, text.substring(0, 100) + '...');
    },
  },
};

/**
 * Loading state - shows when job description is being processed
 */
export const Loading: Story = {
  args: {
    loading: true,
    onJobDescriptionSubmit: (text, source) => {
      console.log(`Job description submitted from ${source}:`, text.substring(0, 100) + '...');
    },
  },
}; 