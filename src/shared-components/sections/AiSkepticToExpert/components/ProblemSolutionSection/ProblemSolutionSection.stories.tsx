import type { Meta, StoryObj } from '@storybook/react';
import { defaultContent } from '../../AiSkepticToExpert.constants';
import ProblemSolutionCard from '../../../../organisms/ProblemSolutionCard';

// Create a simple component to display the ProblemSolutionCards
const ProblemSolutionSection = () => {
  return (
    <div style={{ 
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      background: '#f0f9ff',
      borderRadius: '8px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '20px'
    }}>
      {defaultContent.problemSolutions.cards.map((card, index) => {
        const formattedImpact = typeof card.impact === 'string' 
          ? { value: card.impact } 
          : card.impact;
        
        return (
          <div 
            key={index}
            style={{
              height: '100%',
              display: 'flex'
            }}
          >
            <ProblemSolutionCard 
              slug={card.slug || 'Feature'}
              problem={card.problem}
              solution={card.solution}
              impact={formattedImpact}
              icon={card.icon}
              variant={'blue'}
            />
          </div>
        );
      })}
    </div>
  );
};

const meta = {
  title: 'Pages/01-WhitePaper/01-AiSkepticToExpert/03-ProblemSolutionSection',
  component: ProblemSolutionSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ProblemSolutionSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
}; 