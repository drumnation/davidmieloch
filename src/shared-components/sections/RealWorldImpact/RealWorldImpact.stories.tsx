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
    // Core content
    heroProps: defaultContent.hero,
    problemOverviewProps: defaultContent.problemOverview,
    challengeBreakdownProps: defaultContent.challengeBreakdown,
    processFlowProps: defaultContent.processFlow,
    statsComparisonProps: defaultContent.statsComparison,
    debtAnalysisProps: defaultContent.debtAnalysis,
    cycleDiagramProps: defaultContent.cycleDiagram,
    
    // Solutions and impact content
    problemSolutionProps: defaultContent.problemSolution,
    impactGridProps: defaultContent.impactGrid,
    navigationCardProps: defaultContent.navigationCard,
    enterpriseJourneyProps: defaultContent.enterpriseJourney,
    solutionsImpactProps: defaultContent.solutionsImpact,
    
    // Additional insights
    commonPitfallsProps: defaultContent.commonPitfalls,
    brainGardenSolutionsProps: defaultContent.brainGardenSolutions,
    conclusionProps: defaultContent.conclusion,
  },
}; 