import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '../../../../atoms/Typography';
import { FeatureGrid } from '../../../../organisms/FeatureGrid/FeatureGrid';

// Create a component to display Strategic Focus Areas
const StrategicFocusSection = () => {
  const features = [
    {
      title: "Knowledge Foundation",
      description: "Create structured documentation that provides essential context for AI to operate effectively.",
      icon: "brain",
    },
    {
      title: "Workflow Integration",
      description: "Embed AI tools into existing development workflows rather than bolting them on.",
      icon: "git-branch",
    },
    {
      title: "Technical Boundaries",
      description: "Define clear areas where AI can and cannot contribute, focusing on complementary strengths.",
      icon: "layout",
    },
    {
      title: "Team Dynamics",
      description: "Shape team structures to optimize human-AI collaboration and knowledge sharing.",
      icon: "users",
    },
    {
      title: "Governance & Control",
      description: "Establish clear review and oversight processes for AI-generated content.",
      icon: "shield",
    },
    {
      title: "Metrics & Accountability",
      description: "Create balanced metrics that measure both velocity and quality improvements.",
      icon: "bar-chart-2",
    }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h3" weight="bold" className="mb-4">
        Strategic Focus Areas for AI Integration
      </Typography>
      
      <FeatureGrid 
        features={features}
        columns={3}
        style="gradient-cards"
        animation="stagger-fade"
      />
    </div>
  );
};

const meta = {
  title: 'Pages/01-WhitePaper/02-AiAutopilotAnalogy/03-StrategicFocusSection',
  component: StrategicFocusSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof StrategicFocusSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

/**
 * Desktop view of the Strategic Focus section.
 * Shows the full-width grid with optimal spacing for desktop screens.
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
        story: 'StrategicFocusSection as viewed on desktop devices. Shows the feature grid with three columns and optimal spacing for larger screens.'
      },
    },
  },
};

/**
 * Mobile view of the Strategic Focus section.
 * On mobile, the FeatureGrid adjusts to a single column layout.
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
        story: 'StrategicFocusSection as viewed on mobile devices. The feature grid adapts to a single column layout for optimal viewing on smaller screens.'
      },
    },
  },
};

/**
 * Tablet view of the Strategic Focus section.
 * On tablet, the FeatureGrid typically shows two columns.
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
        story: 'StrategicFocusSection as viewed on tablet devices. The feature grid adapts to a two-column layout for optimal viewing on medium-sized screens.'
      },
    },
  },
}; 