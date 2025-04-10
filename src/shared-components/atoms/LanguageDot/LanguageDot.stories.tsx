import type { Meta, StoryObj } from '@storybook/react';
import { LanguageDot } from './LanguageDot';

const meta = {
  title: 'Atoms/LanguageDot',
  component: LanguageDot,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Language dot component with mobile-first design that adapts to different screen sizes. Displays programming language indicators with corresponding colors.',
      },
    },
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

/**
 * Mobile view of the default language dot
 */
export const DefaultMobile: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Default language dot as viewed on mobile devices. The dot and text scale appropriately for smaller screens.',
      },
    },
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

/**
 * Mobile view of language dot sizes
 */
export const SizesMobile: Story = {
  args: {
    language: 'TypeScript',
    showName: true,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <LanguageDot {...args} size="sm" />
      <LanguageDot {...args} size="md" />
      <LanguageDot {...args} size="lg" />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Different language dot sizes as viewed on mobile devices, showing the appropriate scaling for touch targets.',
      },
    },
  },
};

export const DotOnly: Story = {
  args: {
    language: 'Go',
    size: 'md',
    showName: false,
  },
};

/**
 * Mobile view of dot only (without name)
 */
export const DotOnlyMobile: Story = {
  args: {
    ...DotOnly.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Language dot without name as viewed on mobile devices.',
      },
    },
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

/**
 * Mobile view of all language dots
 */
export const AllLanguagesMobile: Story = {
  args: {
    ...AllLanguages.args,
  },
  render: AllLanguages.render,
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'All language dots displayed in a vertical list as viewed on mobile devices.',
      },
    },
  },
}; 