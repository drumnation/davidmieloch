import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'repo-action', 'repo-link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    size: 'md',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    variant: 'primary',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    variant: 'primary',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
};

export const RepoAction: Story = {
  args: {
    children: 'Star',
    variant: 'repo-action',
    icon: <FiStar size={16} />,
    iconPosition: 'left',
  },
};

export const RepoLink: Story = {
  args: {
    children: 'View on GitHub',
    variant: 'repo-link',
    icon: <FiGithub size={16} />,
    iconPosition: 'left',
    href: 'https://github.com',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'External Link',
    variant: 'primary',
    icon: <FiExternalLink size={16} />,
    iconPosition: 'right',
  },
}; 