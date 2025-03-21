import type { Meta, StoryObj } from '@storybook/react';
import { FilterItem } from './FilterItem';

const meta = {
  title: 'Molecules/FilterItem',
  component: FilterItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['language', 'topic', 'type'],
    },
    isSelected: {
      control: 'boolean',
    },
    count: {
      control: 'number',
    },
  },
} satisfies Meta<typeof FilterItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Language: Story = {
  args: {
    label: 'TypeScript',
    value: 'typescript',
    count: 12,
    variant: 'language',
  },
};

export const LanguageSelected: Story = {
  args: {
    ...Language.args,
    isSelected: true,
  },
};

export const Topic: Story = {
  args: {
    label: 'Frontend',
    value: 'frontend',
    count: 8,
    variant: 'topic',
  },
};

export const TopicSelected: Story = {
  args: {
    ...Topic.args,
    isSelected: true,
  },
};

export const Type: Story = {
  args: {
    label: 'Library',
    value: 'library',
    count: 5,
    variant: 'type',
  },
};

export const TypeSelected: Story = {
  args: {
    ...Type.args,
    isSelected: true,
  },
};

export const NoCount: Story = {
  args: {
    label: 'All',
    value: 'all',
    variant: 'type',
  },
}; 