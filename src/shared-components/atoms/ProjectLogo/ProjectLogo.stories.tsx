import type { Meta, StoryObj } from '@storybook/react';
import { ProjectLogo } from './ProjectLogo';

const meta: Meta<typeof ProjectLogo> = {
  title: 'Atoms/ProjectLogo',
  component: ProjectLogo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ProjectLogo component with mobile-first design that adapts to different screen sizes. Provides consistent project branding with optional image or text fallback.',
      },
    },
  },
  argTypes: {
    name: { control: 'text' },
    logoPath: { control: 'text' },
    size: { control: { type: 'range', min: 24, max: 120, step: 4 } },
    bgColor: { control: 'color' },
    textColor: { control: 'color' },
    showLabel: { control: 'boolean' },
    labelPosition: { 
      control: { type: 'select' }, 
      options: ['bottom', 'top', 'left', 'right'] 
    },
    initialsCount: {
      control: { type: 'radio' },
      options: [1, 2]
    }
  },
};

export default meta;
type Story = StoryObj<typeof ProjectLogo>;

// Default example with image
export const WithImage: Story = {
  args: {
    name: 'React Project',
    logoPath: 'https://reactjs.org/logo-og.png',
    size: 64,
    showLabel: true,
  },
};

/**
 * Mobile view of logo with image
 */
export const WithImageMobile: Story = {
  args: {
    ...WithImage.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Project logo with image as viewed on mobile devices. The logo maintains appropriate sizing on smaller screens.',
      },
    },
  },
};

// Example with fallback (no image)
export const WithFallback: Story = {
  args: {
    name: 'Test Project',
    size: 64,
    showLabel: true,
  },
};

/**
 * Mobile view of logo with fallback
 */
export const WithFallbackMobile: Story = {
  args: {
    ...WithFallback.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Project logo with text fallback as viewed on mobile devices.',
      },
    },
  },
};

// Single letter fallback
export const SingleLetterFallback: Story = {
  args: {
    name: 'Game Sage',
    size: 64,
    showLabel: true,
    initialsCount: 1,
  },
};

// Two-letter fallback
export const TwoLetterFallback: Story = {
  args: {
    name: 'Game Sage',
    size: 64,
    showLabel: true,
    initialsCount: 2,
  },
};

// Custom colors
export const CustomColors: Story = {
  args: {
    name: 'Custom Project',
    size: 64,
    bgColor: '#6200ee',
    textColor: '#ffffff',
    showLabel: true,
  },
};

// Label position examples
export const LabelOnRight: Story = {
  args: {
    name: 'Right Label',
    size: 64,
    showLabel: true,
    labelPosition: 'right',
  },
};

export const LabelOnLeft: Story = {
  args: {
    name: 'Left Label',
    size: 64,
    showLabel: true,
    labelPosition: 'left',
  },
};

export const LabelOnTop: Story = {
  args: {
    name: 'Top Label',
    size: 64,
    showLabel: true,
    labelPosition: 'top',
  },
};

/**
 * Mobile view of different label positions
 */
export const LabelPositionsMobile: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <ProjectLogo name="Bottom Label" size={48} showLabel labelPosition="bottom" />
      <ProjectLogo name="Right Label" size={48} showLabel labelPosition="right" />
      <ProjectLogo name="Left Label" size={48} showLabel labelPosition="left" />
      <ProjectLogo name="Top Label" size={48} showLabel labelPosition="top" />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Different label positions as viewed on mobile devices. Shows how each position adapts to smaller screens.',
      },
    },
  },
};

// Different sizes
export const SmallSize: Story = {
  args: {
    name: 'Small',
    size: 32,
    showLabel: true,
  },
};

export const MediumSize: Story = {
  args: {
    name: 'Medium',
    size: 64,
    showLabel: true,
  },
};

export const LargeSize: Story = {
  args: {
    name: 'Large',
    size: 96,
    showLabel: true,
  },
};

/**
 * Mobile view of different logo sizes
 */
export const SizesMobile: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Small (32px)</p>
        <ProjectLogo name="Small" size={32} showLabel />
      </div>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Medium (64px)</p>
        <ProjectLogo name="Medium" size={64} showLabel />
      </div>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Large (96px)</p>
        <ProjectLogo name="Large" size={96} showLabel />
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Different logo sizes as viewed on mobile devices. Shows how each size appears on smaller screens.',
      },
    },
  },
}; 