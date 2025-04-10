import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta = {
  title: 'Atoms/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tag component with mobile-first design that adapts to different screen sizes. Used for displaying keywords, categories, or labels.',
      },
    },
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

/**
 * Mobile view of the default tag
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
        story: 'Default tag as viewed on mobile devices. Touch-friendly sizing ensures good usability on smaller screens.',
      },
    },
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

/**
 * Mobile view of tag variants
 */
export const VariantsMobile: Story = {
  args: {
    label: 'Mobile Variants',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      <Tag label="Default" variant="default" size="md" />
      <Tag label="Primary" variant="primary" size="md" />
      <Tag label="Secondary" variant="secondary" size="md" />
      <Tag label="Success" variant="success" size="md" />
      <Tag label="Warning" variant="warning" size="md" />
      <Tag label="Danger" variant="danger" size="md" />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'All tag variants as viewed on mobile devices, showing how they wrap and adjust for smaller screens.',
      },
    },
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

/**
 * Mobile view of tag sizes
 */
export const SizesMobile: Story = {
  args: {
    label: 'Mobile Sizes',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      <Tag label="Small" variant="primary" size="sm" />
      <Tag label="Medium" variant="primary" size="md" />
      <Tag label="Large" variant="primary" size="lg" />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Different tag sizes as viewed on mobile devices, demonstrating touch-friendly sizing options.',
      },
    },
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

/**
 * Mobile view of a clickable tag
 */
export const ClickableMobile: Story = {
  args: {
    ...Clickable.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Clickable tag as viewed on mobile devices. Touch target is sized appropriately for mobile interaction.',
      },
    },
  },
}; 