import type { Meta, StoryObj } from '@storybook/react';
import { ComparisonTable } from './ComparisonTable';

const meta = {
  title: 'Molecules/ComparisonTable',
  component: ComparisonTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comparison table component that displays two columns of content with category labels.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ComparisonTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    leftTitle: "Option A",
    rightTitle: "Option B",
    items: [
      {
        category: "Feature 1",
        leftContent: "Basic implementation",
        rightContent: "Advanced implementation with additional capabilities"
      },
      {
        category: "Feature 2",
        leftContent: "Not included",
        rightContent: "Fully supported"
      },
      {
        category: "Cost",
        leftContent: "$10/month",
        rightContent: "$25/month"
      }
    ],
    variant: 'default'
  },
};

export const AccentStyle: Story = {
  args: {
    leftTitle: "Traditional Approach",
    rightTitle: "Modern Approach",
    items: [
      {
        category: "Development Speed",
        leftContent: "Slower, more manual processes",
        rightContent: "Faster with automation and tooling"
      },
      {
        category: "Maintenance",
        leftContent: "Higher effort to maintain",
        rightContent: "Lower maintenance overhead"
      },
      {
        category: "Scalability",
        leftContent: "Limited by manual processes",
        rightContent: "Highly scalable with proper architecture"
      }
    ],
    variant: 'accent'
  },
};

export const GradientStyle: Story = {
  args: {
    leftTitle: "Junior Developer",
    rightTitle: "Senior Developer",
    items: [
      {
        category: "Problem Solving",
        leftContent: "Follows established patterns",
        rightContent: "Creates solutions for novel problems"
      },
      {
        category: "Code Quality",
        leftContent: "Focuses on making code work",
        rightContent: "Balances functionality with maintainability"
      },
      {
        category: "System Design",
        leftContent: "Implements predefined designs",
        rightContent: "Architects scalable, robust systems"
      },
      {
        category: "Mentorship",
        leftContent: "Receives guidance",
        rightContent: "Provides guidance to others"
      }
    ],
    variant: 'gradient'
  },
};
