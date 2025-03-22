import type { Meta, StoryObj } from '@storybook/react';
import { ProcessFlow } from '../../../../organisms/ProcessFlow/ProcessFlow';
import { defaultContent } from '../../RealWorldImpact.constants';
import { enhanceProcessFlowProps } from '../../RealWorldImpact.logic';

// Create a component to display the Process Flow
const ProcessFlowSection = () => {
  // Use the enhancer function to ensure proper types and structure
  const enhancedProps = enhanceProcessFlowProps(defaultContent.processFlow);
  
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <ProcessFlow 
        title={enhancedProps.title}
        subtitle={enhancedProps.subtitle}
        steps={enhancedProps.steps}
        style={enhancedProps.style}
        position={enhancedProps.position}
      />
    </div>
  );
};

const meta = {
  title: 'Pages/01-WhitePaper/05-RealWorldImpact/03-ProcessFlowSection',
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