import type { Meta, StoryObj } from '@storybook/react';
import { ChallengeBreakdown } from '../../../../organisms/ChallengeBreakdown/ChallengeBreakdown';
import { defaultContent } from '../../RealWorldImpact.constants';

// Create a component to display the Challenge Breakdown
const ChallengeBreakdownSection = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <ChallengeBreakdown 
        title={defaultContent.challengeBreakdown.title}
        description="Key challenges in enterprise development knowledge management"
        challenges={defaultContent.challengeBreakdown.challenges.map((issue: {
          title: string;
          description: string;
          impact: string;
          solution: string;
          icon: string;
          style: string;
        }) => ({
          title: issue.title,
          description: issue.description,
          impact: issue.impact
        }))}
        style={defaultContent.challengeBreakdown.style}
        position={defaultContent.challengeBreakdown.position}
      />
    </div>
  );
};

const meta = {
  title: 'Pages/01-WhitePaper/05-RealWorldImpact/02-ChallengeBreakdownSection',
  component: ChallengeBreakdownSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ChallengeBreakdownSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
}; 