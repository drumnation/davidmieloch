import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button component with mobile-first design. Adapts to different screen sizes and device contexts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'repo-action', 'repo-link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    size: 'md',
  },
};

/**
 * Mobile view of the primary button
 */
export const PrimaryMobile: Story = {
  args: {
    ...Primary.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Primary button as viewed on mobile devices. Ensures touch-friendly sizing and spacing.',
      },
    },
  },
};

/**
 * Tablet view of the primary button
 */
export const PrimaryTablet: Story = {
  args: {
    ...Primary.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Primary button as viewed on tablet devices.',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    size: 'md',
  },
};

/**
 * Mobile view of the secondary button
 */
export const SecondaryMobile: Story = {
  args: {
    ...Secondary.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Secondary button as viewed on mobile devices. Maintains consistent styling with adjusted dimensions for touch targets.',
      },
    },
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
    size: 'md',
  },
};

/**
 * Mobile view of the ghost button
 */
export const GhostMobile: Story = {
  args: {
    ...Ghost.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Ghost button as viewed on mobile devices. Vertical hover animation is maintained on touch devices.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    variant: 'primary',
    size: 'sm',
  },
};

/**
 * Mobile view of the small button
 */
export const SmallMobile: Story = {
  args: {
    ...Small.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Small button variant as viewed on mobile devices. Maintains minimum touch target size for usability.',
      },
    },
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    variant: 'primary',
    size: 'lg',
  },
};

/**
 * Mobile view of the large button
 */
export const LargeMobile: Story = {
  args: {
    ...Large.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Large button as viewed on mobile devices. Provides a prominent call-to-action optimized for mobile screens.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
};

/**
 * Mobile view of the disabled button
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
        story: 'Disabled button state as viewed on mobile devices. Visual indicators maintain accessibility standards on smaller screens.',
      },
    },
  },
};

export const RepoAction: Story = {
  args: {
    children: 'Star',
    variant: 'repo-action',
    icon: <FiStar size={16} />,
    iconPosition: 'left',
  },
};

/**
 * Mobile view of the repository action button
 */
export const RepoActionMobile: Story = {
  args: {
    ...RepoAction.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Repository action button as viewed on mobile devices. Icon and text spacing optimized for touch interfaces.',
      },
    },
  },
};

export const RepoLink: Story = {
  args: {
    children: 'View on GitHub',
    variant: 'repo-link',
    icon: <FiGithub size={16} />,
    iconPosition: 'left',
    href: 'https://github.com',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
};

/**
 * Mobile view of the repository link button
 */
export const RepoLinkMobile: Story = {
  args: {
    ...RepoLink.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Repository link button as viewed on mobile devices. External link icon maintains consistent positioning on touch devices.',
      },
    },
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'External Link',
    variant: 'primary',
    icon: <FiExternalLink size={16} />,
    iconPosition: 'right',
  },
}; 