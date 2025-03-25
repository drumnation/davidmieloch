import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from './Hero';

const meta = {
  title: 'Organisms/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A full-width hero section with background patterns.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    background: {
      control: 'select',
      options: ['gradient', 'light', 'dark', 'minimal'],
      description: 'Background style of the hero section',
    },
    pattern: {
      control: 'select',
      options: ['circuit-board', 'dots', 'none'],
      description: 'Background pattern overlay',
    },
    textColor: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Text color scheme',
    },
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Welcome to My Portfolio',
    subtitle: "Let me guess... you're looking for a senior engineer who can help scale your team?",
    background: 'gradient',
    pattern: 'circuit-board',
    textColor: 'light',
  },
};

export const LightBackground: Story = {
  args: {
    title: 'Building Better Solutions',
    subtitle: 'Transforming complex challenges into elegant solutions through innovative engineering',
    background: 'light',
    pattern: 'dots',
    textColor: 'dark',
  },
};

export const DarkMinimal: Story = {
  args: {
    title: 'Engineering Excellence',
    subtitle: 'Bringing over a decade of experience in scaling high-performance teams',
    background: 'dark',
    pattern: 'none',
    textColor: 'light',
  },
}; 