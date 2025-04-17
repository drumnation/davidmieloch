import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import TechnicalImplementation from './TechnicalImplementation';
import { defaultContent } from './TechnicalImplementation.constants';

const meta = {
  title: 'Pages/01-WhitePaper/04-TechnicalImplementation',
  component: TechnicalImplementation,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        component: 'A section component that provides a deep dive into the technical implementation of AI Brain Garden, including the Knowledge System, Agent System, Integration System, Security and Control features, and Performance and Scalability.'
      }
    }
  },
} satisfies Meta<typeof TechnicalImplementation>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
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
};

/**
 * Desktop view of the TechnicalImplementation section.
 */
export const Desktop: Story = {
  args: defaultArgs,
  name: 'Desktop (Default)',
};

/**
 * Mobile view of the TechnicalImplementation section.
 */
export const Mobile: Story = {
  args: defaultArgs,
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
    docs: { disable: true },
  },
  name: 'Mobile (iPhone X)',
};

/**
 * Tablet view of the TechnicalImplementation section.
 */
export const Tablet: Story = {
  args: defaultArgs,
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
    docs: { disable: true },
  },
  name: 'Tablet (iPad)',
}; 