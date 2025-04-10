import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';
import styled from 'styled-components';

const DemoContent = styled.div`
  background-color: #e5e7eb;
  padding: 20px;
  border-radius: 8px;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const meta: Meta<typeof Container> = {
  title: 'Atoms/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Container component with mobile-first design that adapts to different screen sizes. Provides consistent width constraints and padding across the application.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'text',
      description: 'Maximum width of the container',
    },
    padding: {
      control: 'text',
      description: 'Padding of the container (CSS shorthand)',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '20px 0' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <DemoContent>Container with default settings (max-width: 1200px, padding: 0 20px)</DemoContent>,
  },
};

/**
 * Mobile view of the default container
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
        story: 'Default container as viewed on mobile devices. The container maintains appropriate padding on smaller screens.',
      },
    },
  },
};

/**
 * Tablet view of the default container
 */
export const DefaultTablet: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Default container as viewed on tablet devices. Shows the responsive behavior between mobile and desktop sizes.',
      },
    },
  },
};

export const Narrow: Story = {
  args: {
    maxWidth: '800px',
    children: <DemoContent>Narrow container (max-width: 800px)</DemoContent>,
  },
};

/**
 * Mobile view of the narrow container
 */
export const NarrowMobile: Story = {
  args: {
    ...Narrow.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Narrow container as viewed on mobile devices.',
      },
    },
  },
};

export const Wide: Story = {
  args: {
    maxWidth: '1600px',
    children: <DemoContent>Wide container (max-width: 1600px)</DemoContent>,
  },
};

/**
 * Mobile view of the wide container
 */
export const WideMobile: Story = {
  args: {
    ...Wide.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Wide container as viewed on mobile devices. Even with a large max-width, the container is constrained by the screen width on mobile.',
      },
    },
  },
};

export const CustomPadding: Story = {
  args: {
    padding: '0 40px',
    children: <DemoContent>Container with custom padding (0 40px)</DemoContent>,
  },
};

/**
 * Mobile view of container with custom padding
 */
export const CustomPaddingMobile: Story = {
  args: {
    ...CustomPadding.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Container with custom padding as viewed on mobile devices. Shows how custom padding affects the layout on smaller screens.',
      },
    },
  },
};

export const ResponsivePadding: Story = {
  args: {
    padding: '0 clamp(16px, 5vw, 40px)',
    children: <DemoContent>Container with responsive padding using clamp()</DemoContent>,
  },
};

/**
 * Mobile view of container with responsive padding
 */
export const ResponsivePaddingMobile: Story = {
  args: {
    ...ResponsivePadding.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Container with responsive padding that scales based on viewport width. The padding automatically adjusts to be smaller on mobile devices.',
      },
    },
  },
}; 