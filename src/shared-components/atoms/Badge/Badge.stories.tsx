import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Badge component with mobile-first design that adapts to different screen sizes. Used for displaying counts, metrics, or status indicators.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'stars', 'forks', 'issues', 'prs'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    count: {
      control: 'number',
    },
    label: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 42,
    variant: 'default',
    size: 'md',
  },
};

/**
 * Mobile view of the default badge
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
        story: 'Default badge as viewed on mobile devices. The badge maintains legibility at smaller screen sizes.',
      },
    },
  },
};

export const Stars: Story = {
  args: {
    count: 1250,
    variant: 'stars',
    size: 'md',
  },
};

export const Forks: Story = {
  args: {
    count: 124,
    variant: 'forks',
    size: 'md',
  },
};

export const Issues: Story = {
  args: {
    count: 35,
    variant: 'issues',
    size: 'md',
  },
};

export const PullRequests: Story = {
  args: {
    count: 12,
    variant: 'prs',
    size: 'md',
  },
};

/**
 * Mobile view of badge variants
 */
export const VariantsMobile: Story = {
  args: {
    count: 42,
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Badge {...args} variant="default" />
      <Badge {...args} variant="stars" />
      <Badge {...args} variant="forks" />
      <Badge {...args} variant="issues" />
      <Badge {...args} variant="prs" />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'All badge variants as viewed on mobile devices.',
      },
    },
  },
};

export const WithLabel: Story = {
  args: {
    count: 1250,
    label: 'stars',
    variant: 'stars',
    size: 'md',
  },
};

/**
 * Mobile view of badge with label
 */
export const WithLabelMobile: Story = {
  args: {
    ...WithLabel.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Badge with label as viewed on mobile devices.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    count: 1250,
    variant: 'stars',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    count: 1250,
    variant: 'stars',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    count: 1250,
    variant: 'stars',
    size: 'lg',
  },
};

/**
 * Mobile view of badge sizes
 */
export const SizesMobile: Story = {
  args: {
    count: 1250,
    variant: 'stars',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Badge {...args} size="sm" />
      <Badge {...args} size="md" />
      <Badge {...args} size="lg" />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Different badge sizes as viewed on mobile devices, showing touch-friendly sizing options.',
      },
    },
  },
}; 