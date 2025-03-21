import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from './SearchInput';

const meta = {
  title: 'Molecules/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    autoFocus: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
    onChange: (value) => console.log('Search value:', value),
    placeholder: 'Search repositories...',
  },
};

export const WithValue: Story = {
  args: {
    value: 'react',
    onChange: (value) => console.log('Search value:', value),
    placeholder: 'Search repositories...',
  },
};

export const Disabled: Story = {
  args: {
    value: '',
    onChange: (value) => console.log('Search value:', value),
    placeholder: 'Search repositories...',
    disabled: true,
  },
};

export const AutoFocus: Story = {
  args: {
    value: '',
    onChange: (value) => console.log('Search value:', value),
    placeholder: 'Search repositories...',
    autoFocus: true,
  },
}; 