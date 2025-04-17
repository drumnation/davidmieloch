import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { RealWorldImpact } from './RealWorldImpact';
import { defaultContent } from './RealWorldImpact.constants';

const meta = {
  title: 'Pages/01-WhitePaper/05-RealWorldImpact',
  component: RealWorldImpact,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        component: 'A section component that showcases the real-world impact of the Brain Garden system, including problem overviews, challenge breakdowns, process flows, and impact analysis.'
      }
    }
  },
} satisfies Meta<typeof RealWorldImpact>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
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
  commonPitfallsProps: defaultContent.commonPitfalls,
  brainGardenSolutionsProps: {
    ...defaultContent.brainGardenSolutions,
    subtitle: "Systematic solutions for AI adoption challenges"
  },
};

/**
 * Desktop view of the RealWorldImpact section.
 */
export const Desktop: Story = {
  args: defaultArgs,
  name: 'Desktop (Default)',
};

/**
 * Mobile view of the RealWorldImpact section.
 */
export const Mobile: Story = {
  args: defaultArgs,
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
    docs: { disable: true },
  },
  name: 'Mobile (iPhone X)',
};

/**
 * Tablet view of the RealWorldImpact section.
 */
export const Tablet: Story = {
  args: defaultArgs,
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
    docs: { disable: true },
  },
  name: 'Tablet (iPad)',
}; 