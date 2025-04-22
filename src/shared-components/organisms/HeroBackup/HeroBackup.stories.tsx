import { HeroBackup } from './HeroBackup';
import { AnimationType, HeroProps } from './HeroBackup.types';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof HeroBackup> = {
  title: 'Organisms/HeroBackup',
  component: HeroBackup,
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
    textColor: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Text color scheme',
    },
  },
} satisfies Meta<typeof HeroBackup>;

export default meta;
type Story = StoryObj<typeof HeroBackup>;

export const Default: Story = {
  args: {
    title: 'Welcome to My Portfolio',
    subtitle: "Let me guess... you're looking for a senior engineer who can help scale your team?",
    background: 'gradient',
    textColor: 'light',
  },
};

export const LightBackground: Story = {
  args: {
    title: 'Building Better Solutions',
    subtitle: 'Transforming complex challenges into elegant solutions through innovative engineering',
    background: 'light',
    textColor: 'dark',
  },
};

export const DarkMinimal: Story = {
  args: {
    title: 'Engineering Excellence',
    subtitle: 'Bringing over a decade of experience in scaling high-performance teams',
    background: 'dark',
    textColor: 'light',
  },
}; 