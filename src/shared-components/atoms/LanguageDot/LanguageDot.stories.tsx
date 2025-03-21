import type { Meta, StoryObj } from '@storybook/react';
import { LanguageDot } from './LanguageDot';

const meta = {
  title: 'Atoms/LanguageDot',
  component: LanguageDot,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    language: {
      control: 'select',
      options: ['TypeScript', 'JavaScript', 'Python', 'Java', 'Go', 'Ruby', 'PHP', 'CSS', 'HTML', 'Swift', 'Kotlin', 'Rust', 'C#', 'C++'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showName: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof LanguageDot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    language: 'TypeScript',
    size: 'md',
    showName: true,
  },
};

export const Small: Story = {
  args: {
    language: 'JavaScript',
    size: 'sm',
    showName: true,
  },
};

export const Medium: Story = {
  args: {
    language: 'Python',
    size: 'md',
    showName: true,
  },
};

export const Large: Story = {
  args: {
    language: 'Java',
    size: 'lg',
    showName: true,
  },
};

export const DotOnly: Story = {
  args: {
    language: 'Go',
    size: 'md',
    showName: false,
  },
};

export const AllLanguages: Story = {
  args: {
    language: 'TypeScript',
    size: 'md',
    showName: true,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <LanguageDot language="TypeScript" />
      <LanguageDot language="JavaScript" />
      <LanguageDot language="Python" />
      <LanguageDot language="Java" />
      <LanguageDot language="Go" />
      <LanguageDot language="Ruby" />
      <LanguageDot language="PHP" />
      <LanguageDot language="CSS" />
      <LanguageDot language="HTML" />
      <LanguageDot language="Swift" />
      <LanguageDot language="Kotlin" />
      <LanguageDot language="Rust" />
      <LanguageDot language="C#" />
      <LanguageDot language="C++" />
    </div>
  ),
}; 