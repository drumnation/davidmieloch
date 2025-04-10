import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta = {
  title: 'Atoms/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Spinner component with mobile-first design that adapts to different screen sizes. Provides a consistent loading indicator across devices.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the spinner',
    },
    color: {
      control: 'color',
      description: 'Custom color for the spinner',
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'medium',
  },
};

/**
 * Mobile view of the default spinner
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
        story: 'Default spinner as viewed on mobile devices. The spinner maintains appropriate visibility on smaller screens.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

/**
 * Mobile view of different spinner sizes
 */
export const SizesMobile: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Small</p>
        <Spinner size="small" />
      </div>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Medium</p>
        <Spinner size="medium" />
      </div>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Large</p>
        <Spinner size="large" />
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Different spinner sizes as viewed on mobile devices, showing proper scaling for different contexts.',
      },
    },
  },
};

export const CustomColor: Story = {
  args: {
    size: 'medium',
    color: '#6366F1',
  },
};

/**
 * Mobile view of spinner with custom color
 */
export const CustomColorMobile: Story = {
  args: {
    ...CustomColor.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Spinner with custom color as viewed on mobile devices.',
      },
    },
  },
}; 