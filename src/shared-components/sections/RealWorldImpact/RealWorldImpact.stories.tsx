import type { Meta, StoryObj } from '@storybook/react';
import { RealWorldImpact } from './RealWorldImpact';
import { defaultContent } from './RealWorldImpact.constants';

const meta = {
  title: 'Pages/01-WhitePaper/05-RealWorldImpact',
  component: RealWorldImpact,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A section component that showcases the real-world impact of the Brain Garden system, including problem overviews, challenge breakdowns, process flows, and impact analysis.'
      }
    }
  },
} satisfies Meta<typeof RealWorldImpact>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the RealWorldImpact section with its embedded content.
 * This is exactly how it will appear in the actual application.
 */
export const Default: Story = {
  args: {
    className: 'real-world-impact',
    heroProps: defaultContent.hero,
    problemOverviewProps: defaultContent.problemOverview,
    challengeBreakdownProps: defaultContent.challengeBreakdown,
    processFlowProps: defaultContent.processFlow,
    statsComparisonProps: defaultContent.statsComparison,
    debtAnalysisProps: defaultContent.debtAnalysis,
    cycleDiagramProps: defaultContent.cycleDiagram,
    problemSolutionProps: defaultContent.problemSolution,
    impactGridProps: defaultContent.impactGrid,
    navigationCardProps: defaultContent.navigationCard,
    enterpriseJourneyProps: defaultContent.enterpriseJourney,
    solutionsImpactProps: defaultContent.solutionsImpact,
    
    // Additional insights
    commonPitfallsProps: defaultContent.commonPitfalls,
    brainGardenSolutionsProps: {
      ...defaultContent.brainGardenSolutions,
      subtitle: "Systematic solutions for AI adoption challenges"
    },
    // The conclusionProps is being handled in the component's logic
    // through defaultContent.conclusion, removing from direct props
    // to avoid type issues
  },
}; 

/**
 * Desktop view of the RealWorldImpact section.
 * Shows the full-width layout optimized for desktop screens.
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
        story: 'RealWorldImpact section as viewed on desktop devices. Shows detailed impact analysis data, charts, and case studies in an optimal layout for larger screens.'
      },
    },
  },
};

/**
 * Mobile view of the RealWorldImpact section.
 * Shows the responsive layout optimized for mobile screens.
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
        story: 'RealWorldImpact section as viewed on mobile devices. All data visualizations, flow diagrams, and statistics adapt to a single-column layout with optimized spacing and font sizing for smaller screens.'
      },
    },
  },
};

/**
 * Tablet view of the RealWorldImpact section.
 * Shows the responsive layout optimized for tablet screens.
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
        story: 'RealWorldImpact section as viewed on tablet devices. Charts, diagrams, and data visualizations adapt to an intermediate layout optimized for medium-sized screens.'
      },
    },
  },
}; 