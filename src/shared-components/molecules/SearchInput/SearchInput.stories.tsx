import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from './SearchInput';

const meta = {
  title: 'Pages/04-Code-Examples/Components/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Search input component used in the Code Examples page with mobile-first design that adapts to different screen sizes. Provides a consistent search experience across devices.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    autoFocus: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
    onChange: (value) => console.log('Search value:', value),
    placeholder: 'Search repositories...',
  },
};

/**
 * Mobile view of the default search input
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
        story: 'Default search input as viewed on mobile devices. The input adapts to smaller screen sizes with appropriate touch targets.',
      },
    },
  },
};

/**
 * Tablet view of the default search input
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
        story: 'Default search input as viewed on tablet devices. Shows the responsive design between mobile and desktop sizes.',
      },
    },
  },
};

export const WithValue: Story = {
  args: {
    value: 'react',
    onChange: (value) => console.log('Search value:', value),
    placeholder: 'Search repositories...',
  },
};

/**
 * Mobile view of search input with a value
 */
export const WithValueMobile: Story = {
  args: {
    ...WithValue.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Search input with a value as viewed on mobile devices.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    value: '',
    onChange: (value) => console.log('Search value:', value),
    placeholder: 'Search repositories...',
    disabled: true,
  },
};

/**
 * Mobile view of disabled search input
 */
export const DisabledMobile: Story = {
  args: {
    ...Disabled.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Disabled search input as viewed on mobile devices.',
      },
    },
  },
};

export const AutoFocus: Story = {
  args: {
    value: '',
    onChange: (value) => console.log('Search value:', value),
    placeholder: 'Search repositories...',
    autoFocus: true,
  },
}; 