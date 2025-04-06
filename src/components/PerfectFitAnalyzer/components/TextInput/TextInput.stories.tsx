import type { Meta, StoryObj } from '@storybook/react';
import JobDescriptionTextInput from './TextInput';

/**
 * The JobDescriptionTextInput component allows users to type or paste job descriptions
 * for analysis. It includes character count validation and clipboard functionality.
 */
const meta = {
  title: 'PerfectFitAnalyzer/JobDescriptionTextInput',
  component: JobDescriptionTextInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A text input component for job descriptions with character count validation, clipboard access, and clear functionality. Used in the Perfect Fit Analyzer feature.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onTextSubmit: { action: 'text submitted' },
    minLength: {
      control: 'number',
      description: 'Minimum character length for valid input',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character length for valid input',
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading state',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the textarea',
    },
  },
} satisfies Meta<typeof JobDescriptionTextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to generate sample text of specific length
const generateSampleText = (length: number) => {
  const sampleText = `This is a sample job description for a senior developer position. 
  We are looking for an experienced engineer who can contribute to our team. 
  Required skills include TypeScript, React, and Node.js. 
  The ideal candidate will have 5+ years of experience in web development.`;
  
  // Repeat the text until we reach the desired length
  return sampleText.repeat(Math.ceil(length / sampleText.length)).substring(0, length);
};

/**
 * Default state of the JobDescriptionTextInput component
 */
export const Default: Story = {
  args: {
    minLength: 100,
    maxLength: 10000,
    loading: false,
    placeholder: 'Paste your job description here...',
    onTextSubmit: (text) => {
      console.log('Text submitted:', text.substring(0, 100) + '...');
    },
  },
};

/**
 * Loading state - shows when text is being processed
 */
export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};

/**
 * Prefilled with valid text
 */
export const WithValidText: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvasElement, args }) => {
    // Find the textarea in the story and set its value
    const textarea = canvasElement.querySelector('textarea');
    if (textarea) {
      const validText = generateSampleText(200); // 200 characters is > minLength
      textarea.value = validText;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
    }
  },
};

/**
 * With short text (below minimum length)
 */
export const WithShortText: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvasElement, args }) => {
    // Find the textarea in the story and set its value
    const textarea = canvasElement.querySelector('textarea');
    if (textarea) {
      const shortText = generateSampleText(50); // 50 characters is < minLength (100)
      textarea.value = shortText;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
    }
  },
};

/**
 * With shorter minimum length requirement
 */
export const ShorterMinLength: Story = {
  args: {
    ...Default.args,
    minLength: 20,
  },
}; 