import type { Meta, StoryObj } from '@storybook/react';
import SystemOverview from './SystemOverview';

const meta: Meta<typeof SystemOverview> = {
  title: 'Sections/04-TechnicalImplementation/01-SystemOverview',
  component: SystemOverview,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SystemOverview>;

export const Default: Story = {
  args: {
    diagram: `graph TD
      BG[Brain Garden System] --> KS[Knowledge System]
      BG --> AS[Agent System]
      BG --> IS[Integration System]
      
      KS --> KR[Knowledge Repository]
      KS --> KI[Knowledge Indexer]
      KS --> KQ[Knowledge Query Engine]
      
      AS --> AM[Agent Manager]
      AS --> AC[Agent Coordinator]
      AS --> AT[Agent Templates]
      
      IS --> GI[Git Integration]
      IS --> CI[CI/CD Integration]
      IS --> IDE[IDE Integration]`,
  },
};