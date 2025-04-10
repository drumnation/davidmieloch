import type { Meta, StoryObj } from '@storybook/react';
import { ComparisonTable } from './ComparisonTable';
import { ComparisonItem } from './ComparisonTable.types';

const comparisonItems: ComparisonItem[] = [
  {
    category: 'Performance',
    leftContent: 'Good for small-scale applications',
    rightContent: <span>Excellent for <strong>enterprise-level</strong> applications</span>,
  },
  {
    category: 'Cost',
    leftContent: 'Low initial investment',
    rightContent: 'Higher initial investment with better ROI',
  },
  {
    category: 'Scalability',
    leftContent: 'Limited scaling capabilities',
    rightContent: 'Highly scalable architecture',
  },
  {
    category: 'Support',
    leftContent: 'Community support',
    rightContent: '24/7 dedicated support team',
  },
];

const meta: Meta<typeof ComparisonTable> = {
  title: 'Molecules/ComparisonTable',
  component: ComparisonTable,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `The ComparisonTable component provides a clear way to compare two options side by side.
        It supports three visual variants and is responsive across all device sizes.
        
        ## Mobile-First Design
        - On mobile devices, the table maintains readability by keeping the most important information visible
        - Table is horizontally scrollable on smaller screens to ensure all content remains accessible
        - Row animations are optimized for mobile performance`,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    leftTitle: 'Standard Solution',
    rightTitle: 'Enterprise Solution',
    items: comparisonItems,
    variant: 'default',
  },
};

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
        story: 'On mobile devices, the table maintains its structure but becomes horizontally scrollable to accommodate the smaller screen width.'
      },
    },
  },
};

export const AccentStyle: Story = {
  args: {
    leftTitle: 'Basic Package',
    rightTitle: 'Premium Package',
    items: comparisonItems,
    variant: 'accent',
  },
};

export const AccentStyleMobile: Story = {
  args: {
    ...AccentStyle.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'The accent style maintains its visual appeal on mobile devices while adapting to the smaller viewport.'
      },
    },
  },
};

export const GradientStyle: Story = {
  args: {
    leftTitle: 'Current Platform',
    rightTitle: 'Our Solution',
    items: comparisonItems,
    variant: 'gradient',
  },
};

export const GradientStyleMobile: Story = {
  args: {
    ...GradientStyle.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'The gradient style header creates a visually striking design that translates well to mobile devices.'
      },
    },
  },
};
