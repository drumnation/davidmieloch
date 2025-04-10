import type { Meta, StoryObj } from '@storybook/react';
import TechnicalImplementation from './TechnicalImplementation';
import { defaultContent } from './TechnicalImplementation.constants';

const meta = {
  title: 'Pages/01-WhitePaper/04-TechnicalImplementation',
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

/**
 * Desktop view of the TechnicalImplementation section.
 * Shows the full-width layout optimized for desktop screens.
 */
export const Desktop: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'TechnicalImplementation section as viewed on desktop devices. Shows the full technical diagrams and detailed descriptions in an optimal layout for larger screens.'
      },
    },
  },
};

/**
 * Mobile view of the TechnicalImplementation section.
 * Shows the responsive layout optimized for mobile screens.
 */
export const Mobile: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'TechnicalImplementation section as viewed on mobile devices. All technical diagrams and descriptions adapt to a single-column layout with appropriate scaling for optimal viewing on smaller screens.'
      },
    },
  },
};

/**
 * Tablet view of the TechnicalImplementation section.
 * Shows the responsive layout optimized for tablet screens.
 */
export const Tablet: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'TechnicalImplementation section as viewed on tablet devices. Technical diagrams and descriptions adapt to an intermediate layout between mobile and desktop with optimized dimensions for medium-sized screens.'
      },
    },
  },
}; 