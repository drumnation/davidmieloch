import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'gradient', 'accent'],
      description: 'The visual style variant of the card',
    },
    hoverable: {
      control: 'boolean',
      description: 'Whether the card should have hover effects',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Card Content',
    variant: 'default',
    hoverable: false,
  },
};

export const Gradient: Story = {
  args: {
    children: 'Gradient Card Content',
    variant: 'gradient',
    hoverable: false,
  },
};

export const Accent: Story = {
  args: {
    children: 'Accent Card Content',
    variant: 'accent',
    hoverable: false,
  },
};

export const Hoverable: Story = {
  args: {
    children: 'Hoverable Card Content',
    variant: 'default',
    hoverable: true,
  },
};

export const GradientHoverable: Story = {
  args: {
    children: 'Gradient Hoverable Card Content',
    variant: 'gradient',
    hoverable: true,
  },
}; 