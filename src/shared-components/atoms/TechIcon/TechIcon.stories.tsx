import type { Meta, StoryObj } from '@storybook/react';
import { TechIcon } from './TechIcon';

const meta = {
  title: 'Atoms/TechIcon',
  component: TechIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Technology icon component with mobile-first design that adapts to different screen sizes. Displays branded technology icons with optional labels.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Docker', 'GraphQL', 'MongoDB', 'AWS'],
      description: 'The name of the technology',
    },
    size: {
      control: 'number',
      description: 'Size of the icon in pixels',
    },
    color: {
      control: 'color',
      description: 'Custom color for the icon (for some icons with predefined colors, this may be ignored)',
    },
    showLabel: {
      control: 'boolean',
      description: 'Whether to show the name as a label',
    },
    labelPosition: {
      control: 'select',
      options: ['bottom', 'right', 'left', 'top'],
      description: 'Position of the label relative to the icon',
    },
    showTooltip: {
      control: 'boolean',
      description: 'Whether to show a tooltip with the technology name on hover',
    },
  },
} satisfies Meta<typeof TechIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'React',
    size: 24,
    showLabel: false,
  },
};

/**
 * Mobile view of the default tech icon
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
        story: 'Default tech icon as viewed on mobile devices. The icon maintains crisp rendering at smaller screen sizes.',
      },
    },
  },
};

export const WithLabel: Story = {
  args: {
    name: 'TypeScript',
    size: 32,
    showLabel: true,
    labelPosition: 'bottom',
  },
};

/**
 * Mobile view of tech icon with label
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
        story: 'Tech icon with label as viewed on mobile devices. The label position and size are optimized for mobile viewing.',
      },
    },
  },
};

export const LabelPositions: Story = {
  args: {
    name: 'React',
    size: 32,
    showLabel: true,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <p style={{ marginBottom: '1rem' }}>Bottom Label</p>
        <TechIcon name="React" size={32} showLabel labelPosition="bottom" />
      </div>
      <div>
        <p style={{ marginBottom: '1rem' }}>Right Label</p>
        <TechIcon name="React" size={32} showLabel labelPosition="right" />
      </div>
      <div>
        <p style={{ marginBottom: '1rem' }}>Left Label</p>
        <TechIcon name="React" size={32} showLabel labelPosition="left" />
      </div>
      <div>
        <p style={{ marginBottom: '1rem' }}>Top Label</p>
        <TechIcon name="React" size={32} showLabel labelPosition="top" />
      </div>
    </div>
  ),
};

/**
 * Mobile view of different label positions
 */
export const LabelPositionsMobile: Story = {
  args: {
    name: 'React',
    size: 32,
    showLabel: true,
  },
  render: LabelPositions.render,
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Different label positions as viewed on mobile devices. Each position is optimized for mobile layouts.',
      },
    },
  },
};

export const CommonTechnologies: Story = {
  args: {
    name: 'React',
    size: 32,
    showLabel: true,
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '500px' }}>
      <TechIcon name="React" size={32} showLabel />
      <TechIcon name="TypeScript" size={32} showLabel />
      <TechIcon name="JavaScript" size={32} showLabel />
      <TechIcon name="Node.js" size={32} showLabel />
      <TechIcon name="Python" size={32} showLabel />
      <TechIcon name="Docker" size={32} showLabel />
      <TechIcon name="GraphQL" size={32} showLabel />
      <TechIcon name="MongoDB" size={32} showLabel />
      <TechIcon name="AWS" size={32} showLabel />
    </div>
  ),
};

/**
 * Mobile view of common technology icons
 */
export const CommonTechnologiesMobile: Story = {
  args: {
    name: 'React',
    size: 32,
    showLabel: true,
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', maxWidth: '100%' }}>
      <TechIcon name="React" size={32} showLabel />
      <TechIcon name="TypeScript" size={32} showLabel />
      <TechIcon name="JavaScript" size={32} showLabel />
      <TechIcon name="Node.js" size={32} showLabel />
      <TechIcon name="Python" size={32} showLabel />
      <TechIcon name="Docker" size={32} showLabel />
      <TechIcon name="GraphQL" size={32} showLabel />
      <TechIcon name="MongoDB" size={32} showLabel />
      <TechIcon name="AWS" size={32} showLabel />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Common technology icons as viewed on mobile devices. The grid layout adjusts to display fewer columns for better readability on smaller screens.',
      },
    },
  },
};

export const CustomSize: Story = {
  args: {
    name: 'JavaScript',
    size: 48,
    showLabel: true,
  },
};

/**
 * Mobile view of tech icon with custom size
 */
export const CustomSizeMobile: Story = {
  args: {
    ...CustomSize.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Tech icon with custom size as viewed on mobile devices.',
      },
    },
  },
}; 