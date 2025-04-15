import React from 'react';
import { ComparisonTable } from '@shared-components/molecules/ComparisonTable';
import { Typography } from '@shared-components/atoms/Typography';
import { Box } from '@mantine/core';

// Mock data for the story
const comparisonTableItems = [
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

export default {
  title: 'WhitePaper/AiAutopilotAnalogy/ComparisonTableSection',
  component: ComparisonTable,
  parameters: {
    layout: 'padded',
  },
};

export const Default = () => (
  <Box style={{ maxWidth: 900, margin: '0 auto' }}>
    <Box style={{ textAlign: 'center' }}>
      <Typography variant="h2" mb="2rem">Human Pilot vs. AI Autopilot</Typography>
    </Box>
    <ComparisonTable
      leftTitle="Human Pilot"
      rightTitle="AI Autopilot"
      items={comparisonTableItems}
      variant="accent"
    />
  </Box>
); 