import type { Meta, StoryObj } from '@storybook/react';
import { LoadingScreen } from './LoadingScreen';

const meta = {
  title: 'Atoms/LoadingScreen',
  component: LoadingScreen,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Loading screen component with mobile-first design that adapts to different screen sizes. Displays a loading indicator with optional text.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Text to display below the spinner',
    },
    spinnerSize: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the spinner',
    },
    spinnerColor: {
      control: 'color',
      description: 'Custom color for the spinner',
    },
    minHeight: {
      control: 'text',
      description: 'Minimum height of the loading container',
    },
  },
} satisfies Meta<typeof LoadingScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Loading...',
    spinnerSize: 'large',
  },
};

/**
 * Mobile view of the default loading screen
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
        story: 'Default loading screen as viewed on mobile devices. The loading indicator and text are centered and properly sized for smaller screens.',
      },
    },
  },
};

/**
 * Tablet view of the default loading screen
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
        story: 'Default loading screen as viewed on tablet devices.',
      },
    },
  },
};

export const WithoutText: Story = {
  args: {
    spinnerSize: 'large',
  },
};

/**
 * Mobile view of loading screen without text
 */
export const WithoutTextMobile: Story = {
  args: {
    ...WithoutText.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Loading screen without text as viewed on mobile devices.',
      },
    },
  },
};

export const MediumSpinner: Story = {
  args: {
    text: 'Loading content...',
    spinnerSize: 'medium',
  },
};

export const SmallSpinner: Story = {
  args: {
    text: 'Please wait...',
    spinnerSize: 'small',
  },
};

/**
 * Mobile view of different spinner sizes
 */
export const SpinnerSizesMobile: Story = {
  args: {
    text: 'Loading...',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ minHeight: '30vh' }}>
        <LoadingScreen text="Small Spinner" spinnerSize="small" minHeight="30vh" />
      </div>
      <div style={{ minHeight: '30vh' }}>
        <LoadingScreen text="Medium Spinner" spinnerSize="medium" minHeight="30vh" />
      </div>
      <div style={{ minHeight: '30vh' }}>
        <LoadingScreen text="Large Spinner" spinnerSize="large" minHeight="30vh" />
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Different spinner sizes as viewed on mobile devices. Each size is optimized for readability on smaller screens.',
      },
    },
  },
};

export const CustomColor: Story = {
  args: {
    text: 'Loading with custom color...',
    spinnerSize: 'large',
    spinnerColor: '#6366F1',
  },
};

/**
 * Mobile view of loading screen with custom color
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
        story: 'Loading screen with custom spinner color as viewed on mobile devices.',
      },
    },
  },
}; 