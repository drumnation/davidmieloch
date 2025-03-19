import type { Meta, StoryObj } from '@storybook/react';
import { ProblemOverview } from '../../../../organisms/ProblemOverview/ProblemOverview';
import { defaultContent } from '../../RealWorldImpact.constants';

// Create a component to display the Problem Overview
const ProblemOverviewSection = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <ProblemOverview 
        title={defaultContent.problemOverview.title}
        description={defaultContent.problemOverview.description}
        metrics={defaultContent.problemOverview.metrics}
        style={defaultContent.problemOverview.style} 
        position={defaultContent.problemOverview.position}
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