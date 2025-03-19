import type { Meta, StoryObj } from '@storybook/react';
import { ProcessFlow } from '../../../../organisms/ProcessFlow/ProcessFlow';
import { defaultContent } from '../../RealWorldImpact.constants';

// Create a component to display the Process Flow
const ProcessFlowSection = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <ProcessFlow 
        steps={defaultContent.processFlow.steps}
        style={defaultContent.processFlow.style}
        position={defaultContent.processFlow.position}
      />
    </div>
  );
};

const meta = {
  title: 'Sections/05-RealWorldImpact/03-ProcessFlowSection',
  component: ProcessFlowSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ProcessFlowSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
}; 