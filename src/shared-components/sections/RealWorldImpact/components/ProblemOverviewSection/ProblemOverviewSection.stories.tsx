import type { Meta, StoryObj } from '@storybook/react';
import { ProblemOverview } from '../../../../organisms/ProblemOverview/ProblemOverview';
import { defaultContent } from '../../RealWorldImpact.constants';
import { enhanceProblemOverviewProps } from '../../RealWorldImpact.logic';

// Create a component to display the Problem Overview
const ProblemOverviewSection = () => {
  // Use the enhancer function to ensure proper types and structure
  const enhancedProps = enhanceProblemOverviewProps(defaultContent.problemOverview);
  
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <ProblemOverview 
        title={enhancedProps.title}
        description={enhancedProps.description}
        metrics={enhancedProps.metrics}
        style={enhancedProps.style}
        position={enhancedProps.position}
        animation="fade-up"
        background="light"
      />
    </div>
  );
};

const meta = {
  title: 'Pages/01-WhitePaper/05-RealWorldImpact/01-ProblemOverviewSection',
  component: ProblemOverviewSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ProblemOverviewSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
}; 