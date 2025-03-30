import type { Meta, StoryObj } from '@storybook/react';
import { ProjectLogo } from './ProjectLogo';

const meta: Meta<typeof ProjectLogo> = {
  title: 'Atoms/ProjectLogo',
  component: ProjectLogo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: { control: 'text' },
    logoPath: { control: 'text' },
    size: { control: { type: 'range', min: 24, max: 120, step: 4 } },
    bgColor: { control: 'color' },
    textColor: { control: 'color' },
    showLabel: { control: 'boolean' },
    labelPosition: { 
      control: { type: 'select' }, 
      options: ['bottom', 'top', 'left', 'right'] 
    },
    initialsCount: {
      control: { type: 'radio' },
      options: [1, 2]
    }
  },
};

export default meta;
type Story = StoryObj<typeof ProjectLogo>;

// Default example with image
export const WithImage: Story = {
  args: {
    name: 'React Project',
    logoPath: 'https://reactjs.org/logo-og.png',
    size: 64,
    showLabel: true,
  },
};

// Example with fallback (no image)
export const WithFallback: Story = {
  args: {
    name: 'Test Project',
    size: 64,
    showLabel: true,
  },
};

// Single letter fallback
export const SingleLetterFallback: Story = {
  args: {
    name: 'Game Sage',
    size: 64,
    showLabel: true,
    initialsCount: 1,
  },
};

// Two-letter fallback
export const TwoLetterFallback: Story = {
  args: {
    name: 'Game Sage',
    size: 64,
    showLabel: true,
    initialsCount: 2,
  },
};

// Custom colors
export const CustomColors: Story = {
  args: {
    name: 'Custom Project',
    size: 64,
    bgColor: '#6200ee',
    textColor: '#ffffff',
    showLabel: true,
  },
};

// Label position examples
export const LabelOnRight: Story = {
  args: {
    name: 'Right Label',
    size: 64,
    showLabel: true,
    labelPosition: 'right',
  },
};

export const LabelOnLeft: Story = {
  args: {
    name: 'Left Label',
    size: 64,
    showLabel: true,
    labelPosition: 'left',
  },
};

export const LabelOnTop: Story = {
  args: {
    name: 'Top Label',
    size: 64,
    showLabel: true,
    labelPosition: 'top',
  },
};

// Different sizes
export const SmallSize: Story = {
  args: {
    name: 'Small',
    size: 32,
    showLabel: true,
  },
};

export const MediumSize: Story = {
  args: {
    name: 'Medium',
    size: 64,
    showLabel: true,
  },
};

export const LargeSize: Story = {
  args: {
    name: 'Large',
    size: 96,
    showLabel: true,
  },
}; 