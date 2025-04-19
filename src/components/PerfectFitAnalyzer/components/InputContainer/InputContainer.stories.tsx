import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InputContainer } from './InputContainer';
import type { InputContainerProps } from './InputContainer';

/**
 * The InputContainer component provides a tabbed interface to input job descriptions
 * either via file upload or text input.
 */
const meta = {
  title: 'Components/PerfectFitAnalyzer/InputContainer',
  component: InputContainer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Provides a tabbed interface for inputting job descriptions either via text paste or file upload.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onJobDescriptionSubmit: { action: 'submitted' },
    loading: { control: 'boolean' },
    className: { control: 'text' },
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
    onJobDescriptionSubmit: (text: string, source: 'file' | 'text') => {
      console.log('Job Description Submitted:', { text, source });
    },
  },
};

/**
 * Loading state - shows when job description is being processed
 */
export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
}; 