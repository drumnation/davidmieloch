import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Icon component with mobile-first design that adapts to different screen sizes. Provides consistent icon display across devices.',
      },
    },
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

/**
 * Mobile view of Tabler icon
 */
export const TablerIconMobile: Story = {
  args: {
    ...TablerIcon.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Tabler icon as viewed on mobile devices. Icons maintain crisp display on smaller screens.',
      },
    },
  },
};

export const LucideIcon: Story = {
  args: {
    name: 'check-circle',
    source: 'lucide',
    size: 24,
  },
};

/**
 * Mobile view of Lucide icon
 */
export const LucideIconMobile: Story = {
  args: {
    ...LucideIcon.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Lucide icon as viewed on mobile devices. Maintains consistent appearance across devices.',
      },
    },
  },
};

export const PhosphorIcon: Story = {
  args: {
    name: 'brain',
    source: 'phosphor',
    size: 24,
  },
};

/**
 * Mobile view of Phosphor icon
 */
export const PhosphorIconMobile: Story = {
  args: {
    ...PhosphorIcon.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Phosphor icon as viewed on mobile devices. Shown at an optimal size for mobile interfaces.',
      },
    },
  },
};

/**
 * Mobile view of icon variants
 */
export const IconVariantsMobile: Story = {
  args: {
    name: 'arrow-right',
    source: 'tabler',
    size: 24,
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Icon {...args} name="arrow-right" source="tabler" />
      <Icon {...args} name="check-circle" source="lucide" />
      <Icon {...args} name="brain" source="phosphor" />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Different icon library sources as viewed on mobile devices.',
      },
    },
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

/**
 * Mobile view of colored icon
 */
export const ColoredIconMobile: Story = {
  args: {
    ...ColoredIcon.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Colored icon as viewed on mobile devices.',
      },
    },
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

/**
 * Mobile view of large icon
 */
export const LargeIconMobile: Story = {
  args: {
    ...LargeIcon.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Large icon as viewed on mobile devices. Shows how larger icon sizes adapt to mobile screens while remaining clear and recognizable.',
      },
    },
  },
};

/**
 * Mobile view of icon sizes
 */
export const IconSizesMobile: Story = {
  args: {
    name: 'brain-circuit',
    source: 'phosphor',
    color: '#4F46E5',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Icon {...args} size={16} />
      <Icon {...args} size={24} />
      <Icon {...args} size={32} />
      <Icon {...args} size={48} />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Different icon sizes as viewed on mobile devices, showing how icons scale for touch-friendly interactions.',
      },
    },
  },
}; 