import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta = {
  title: 'Atoms/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Tag',
    variant: 'default',
    size: 'md',
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary Tag',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Tag',
    variant: 'secondary',
    size: 'md',
  },
};

export const Success: Story = {
  args: {
    label: 'Success Tag',
    variant: 'success',
    size: 'md',
  },
};

export const Warning: Story = {
  args: {
    label: 'Warning Tag',
    variant: 'warning',
    size: 'md',
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger Tag',
    variant: 'danger',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    label: 'Small Tag',
    variant: 'primary',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium Tag',
    variant: 'primary',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Tag',
    variant: 'primary',
    size: 'lg',
  },
};

export const Clickable: Story = {
  args: {
    label: 'Clickable Tag',
    variant: 'primary',
    size: 'md',
    onClick: () => alert('Tag clicked!'),
  },
}; 