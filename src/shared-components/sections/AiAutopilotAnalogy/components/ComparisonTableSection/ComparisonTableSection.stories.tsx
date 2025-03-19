import type { Meta, StoryObj } from '@storybook/react';
import { ComparisonTable } from '../../../../molecules/ComparisonTable';
import { Typography } from '../../../../atoms/Typography';

// Create a component to display the comparison table
const ComparisonTableSection = () => {
  const comparisonItems = [
    {
      left: "Takes a wholistic strategic view",
      right: "Handles repetitive tasks efficiently"
    },
    {
      left: "Adapts to changing conditions",
      right: "Works best in stable, predictable scenarios"
    },
    {
      left: "Creative problem solving",
      right: "Pattern recognition"
    },
    {
      left: "Ethical considerations & judgment",
      right: "Speed and consistency"
    },
    {
      left: "Emotional intelligence & empathy",
      right: "Large-scale data processing"
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
  title: 'Sections/02-AiAutopilotAnalogy/01-ComparisonTableSection',
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