import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Icon name in kebab-case (e.g., "arrow-right", "check-circle")',
    },
    source: {
      control: 'select',
      options: ['tabler', 'lucide', 'phosphor'],
      description: 'Icon library source',
    },
    size: {
      control: 'number',
      description: 'Icon size in pixels',
    },
    color: {
      control: 'color',
      description: 'Icon color',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TablerIcon: Story = {
  args: {
    name: 'arrow-right',
    source: 'tabler',
    size: 24,
  },
};

export const LucideIcon: Story = {
  args: {
    name: 'check-circle',
    source: 'lucide',
    size: 24,
  },
};

export const PhosphorIcon: Story = {
  args: {
    name: 'brain',
    source: 'phosphor',
    size: 24,
  },
};

export const ColoredIcon: Story = {
  args: {
    name: 'star',
    source: 'tabler',
    size: 24,
    color: '#6366F1',
  },
};

export const LargeIcon: Story = {
  args: {
    name: 'brain-circuit',
    source: 'phosphor',
    size: 48,
    color: '#4F46E5',
  },
}; 