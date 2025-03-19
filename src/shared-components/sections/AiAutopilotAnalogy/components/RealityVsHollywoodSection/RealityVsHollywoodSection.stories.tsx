import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '../../../../atoms/Typography';

// Create a component to display Reality vs. Hollywood comparison
const RealityVsHollywoodSection = () => {
  const realityItems = [
    { title: "Context-Dependent", description: "Today's AI tools are contextual assistants - the quality of output directly depends on the quality of input and context provided." },
    { title: "Pattern Recognition", description: "AI excels at recognizing patterns in data and generating content similar to what it's been trained on." },
    { title: "Non-Sentient", description: "Modern AI has no consciousness, desires, or understanding - it's a sophisticated pattern-matching system." },
    { title: "Requires Guidance", description: "AI tools need strategic direction and quality checks from humans to be effectively utilized." }
  ];
  
  const hollywoodItems = [
    { title: "Magical Solution", description: "In movies, AI is often portrayed as a magical solution that can solve any problem with minimal human input." },
    { title: "Human-Like Understanding", description: "Fiction portrays AI with human-like comprehension of nuance, emotions, and abstract concepts." },
    { title: "Sentient or Conscious", description: "Hollywood AI typically has its own goals, desires, and often develops self-awareness." },
    { title: "Autonomous Decision-Making", description: "Fictional AI makes complex decisions independently, without human oversight or intervention." }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h3" weight="bold" className="mb-4">
        AI Reality vs. Hollywood Fiction
      </Typography>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Reality Column */}
        <div>
          <Typography variant="h4" weight="bold" color="primary" className="mb-3">
            Reality: AI Today
          </Typography>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {realityItems.map((item, index) => (
              <div 
                key={index}
                style={{
                  padding: '16px',
                  background: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  borderLeft: '4px solid #4285F4'
                }}
              >
                <Typography variant="h5" weight="bold" className="mb-2">
                  {item.title}
                </Typography>
                <Typography variant="body">
                  {item.description}
                </Typography>
              </div>
            ))}
          </div>
        </div>
        
        {/* Hollywood Column */}
        <div>
          <Typography variant="h4" weight="bold" color="primary" className="mb-3">
            Hollywood: AI Fiction
          </Typography>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {hollywoodItems.map((item, index) => (
              <div 
                key={index}
                style={{
                  padding: '16px',
                  background: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  borderLeft: '4px solid #DB4437'
                }}
              >
                <Typography variant="h5" weight="bold" className="mb-2">
                  {item.title}
                </Typography>
                <Typography variant="body">
                  {item.description}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Sections/02-AiAutopilotAnalogy/02-RealityVsHollywoodSection',
  component: RealityVsHollywoodSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof RealityVsHollywoodSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
}; 