import type { Meta, StoryObj } from '@storybook/react';
import TechnicalImplementation from './TechnicalImplementation';
import { defaultContent } from './TechnicalImplementation.constants';

const meta = {
  title: 'Sections/04-TechnicalImplementation',
  component: TechnicalImplementation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A section component that provides a deep dive into the technical implementation of AI Brain Garden, including the Knowledge System, Agent System, Integration System, Security and Control features, and Performance and Scalability.'
      }
    }
  },
} satisfies Meta<typeof TechnicalImplementation>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the TechnicalImplementation section with its embedded content.
 * This is exactly how it will appear in the actual application.
 */
export const Default: Story = {
  args: {
    title: defaultContent.title,
    subtitle: defaultContent.subtitle,
    systemOverviewDiagram: defaultContent.systemOverviewDiagram,
    agentSystemDiagram: defaultContent.agentSystemDiagram,
    integrationSystemDiagram: defaultContent.integrationSystemDiagram,
    knowledgeFlowDiagram: defaultContent.knowledgeFlowDiagram,
    performanceScalabilityDiagram: defaultContent.performanceScalabilityDiagram,
    knowledgeSystem: defaultContent.knowledgeSystem,
    agentSystem: defaultContent.agentSystem,
    integrationSystem: defaultContent.integrationSystem,
    securityControl: defaultContent.securityControl,
    performanceScalability: defaultContent.performanceScalability,
    result: defaultContent.result
  },
}; 