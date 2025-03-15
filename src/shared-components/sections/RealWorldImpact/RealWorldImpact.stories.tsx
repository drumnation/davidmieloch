import type { Meta, StoryObj } from '@storybook/react';
import { RealWorldImpact } from './RealWorldImpact';
import { defaultContent } from './RealWorldImpact.constants';

const meta = {
  title: 'Sections/05-RealWorldImpact',
  component: RealWorldImpact,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A section showcasing the real-world impact of Brain Garden on enterprise development teams.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RealWorldImpact>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the RealWorldImpact section with its embedded content.
 * This is exactly how it will appear in the actual application.
 */
export const Default: Story = {
  args: {
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
  },
}; 