import type { Meta, StoryObj } from '@storybook/react';
import { CenteredButton } from './CenteredButton';
import { IconArrowRight } from '@tabler/icons-react';

const meta: Meta<typeof CenteredButton> = {
  title: 'Atoms/CenteredButton',
  component: CenteredButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `The CenteredButton component provides a centered button that spans the full width of its container.
        It wraps the base Button component with centered alignment.
        
        ## Mobile-First Design
        - On mobile devices, the component maintains its centered position
        - All variants and sizes of the base Button component are supported
        - Animations and hover effects are preserved from the base Button`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'repo-action', 'repo-link'],
      description: 'Button variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Centered Primary Button',
  },
};

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
        story: 'On mobile devices, the primary button maintains its centered position.'
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    children: 'Centered Secondary Button',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Centered With Icon',
    icon: <IconArrowRight size={16} />,
    iconPosition: 'right',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
    children: 'Centered Ghost Button',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Large Centered Button',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Small Centered Button',
  },
}; 