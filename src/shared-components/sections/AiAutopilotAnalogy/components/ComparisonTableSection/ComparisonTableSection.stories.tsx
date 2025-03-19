import type { Meta, StoryObj } from '@storybook/react';
import { ComparisonTable } from '../../../../molecules/ComparisonTable';
import { Typography } from '../../../../atoms/Typography';

// Create a component to display the comparison table
const ComparisonTableSection = () => {
  const comparisonItems = [
    {
      category: "Strategic Thinking",
      leftContent: "Takes a wholistic strategic view",
      rightContent: "Handles repetitive tasks efficiently"
    },
    {
      category: "Adaptability",
      leftContent: "Adapts to changing conditions",
      rightContent: "Works best in stable, predictable scenarios"
    },
    {
      category: "Problem Solving",
      leftContent: "Creative problem solving",
      rightContent: "Pattern recognition"
    },
    {
      category: "Decision Making",
      leftContent: "Ethical considerations & judgment",
      rightContent: "Speed and consistency"
    },
    {
      category: "Interpersonal Skills",
      leftContent: "Emotional intelligence & empathy",
      rightContent: "Large-scale data processing"
    }
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h3" className="mb-4">
        Human Pilot vs. AI Autopilot
      </Typography>
      <ComparisonTable 
        leftTitle="Human Developer Strengths"
        rightTitle="AI Assistant Strengths"
        items={comparisonItems}
        variant="accent"
      />
    </div>
  );
};

const meta = {
  title: 'Pages/01-WhitePaper/02-AiAutopilotAnalogy/01-ComparisonTableSection',
  component: ComparisonTableSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ComparisonTableSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
}; 