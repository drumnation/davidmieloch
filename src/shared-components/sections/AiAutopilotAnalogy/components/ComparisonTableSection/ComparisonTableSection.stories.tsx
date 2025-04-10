import type { Meta, StoryObj } from '@storybook/react';
import { ComparisonTable } from '../../../../molecules/ComparisonTable';
import { Typography } from '../../../../atoms/Typography';

// Create a component to display the comparison table
const ComparisonTableSection = () => {
  const comparisonItems = [
    {
      category: "Strategic Thinking",
      leftContent: "Takes a wholistic strategic view",
      rightContent: "Handles repetitive tasks efficiently"
    },
    {
      category: "Adaptability",
      leftContent: "Adapts to changing conditions",
      rightContent: "Works best in stable, predictable scenarios"
    },
    {
      category: "Problem Solving",
      leftContent: "Creative problem solving",
      rightContent: "Pattern recognition"
    },
    {
      category: "Decision Making",
      leftContent: "Ethical considerations & judgment",
      rightContent: "Speed and consistency"
    },
    {
      category: "Interpersonal Skills",
      leftContent: "Emotional intelligence & empathy",
      rightContent: "Large-scale data processing"
    }
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h3" className="mb-4">
        Human Pilot vs. AI Autopilot
      </Typography>
      <ComparisonTable 
        leftTitle="Human Developer Strengths"
        rightTitle="AI Assistant Strengths"
        items={comparisonItems}
        variant="accent"
      />
    </div>
  );
};

const meta = {
  title: 'Pages/01-WhitePaper/02-AiAutopilotAnalogy/01-ComparisonTableSection',
  component: ComparisonTableSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A section that visually compares human developer strengths with AI assistant strengths, using a responsive table format that adapts to all device sizes.'
      }
    }
  },
} satisfies Meta<typeof ComparisonTableSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the ComparisonTableSection without specifying a viewport.
 */
export const Default: Story = {
  args: {},
};

/**
 * Desktop view of the ComparisonTableSection
 */
export const Desktop: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'ComparisonTableSection as viewed on desktop devices. Shows the full-width experience with optimal spacing for larger screens.'
      },
    },
  },
};

/**
 * Mobile view of the ComparisonTableSection
 */
export const Mobile: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'ComparisonTableSection as viewed on mobile devices. The underlying ComparisonTable component adapts with horizontal scrolling to ensure all content is accessible on smaller screens. Typography scales appropriately for better readability.'
      },
    },
  },
};

/**
 * Tablet view of the ComparisonTableSection
 */
export const Tablet: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'ComparisonTableSection as viewed on tablet devices. Shows intermediate responsive layout between mobile and desktop views, with optimized spacing and font sizing.'
      },
    },
  },
}; 