import type { Meta, StoryObj } from '@storybook/react';
import { ChallengeBreakdown } from '../../../../organisms/ChallengeBreakdown/ChallengeBreakdown';
import { defaultContent } from '../../RealWorldImpact.constants';

// Create a component to display the Challenge Breakdown
const ChallengeBreakdownSection = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <ChallengeBreakdown 
        title={defaultContent.challengeBreakdown.title}
        key_issues={defaultContent.challengeBreakdown.key_issues}
        style={defaultContent.challengeBreakdown.style}
        position={defaultContent.challengeBreakdown.position}
      />
    </div>
  );
};

const meta = {
  title: 'Sections/05-RealWorldImpact/02-ChallengeBreakdownSection',
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