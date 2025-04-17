import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { AiSkepticToExpert } from './components/AiSkepticToExpert/AiSkepticToExpert';
import { AiAutopilotAnalogy } from './components/AiAutopilotAnalogy/AiAutopilotAnalogy';
import { BrainGardenOverview } from './components/BrainGardenOverview/BrainGardenOverview';
import TechnicalImplementation from './components/TechnicalImplementation/TechnicalImplementation';
import { RealWorldImpact } from './components/RealWorldImpact/RealWorldImpact';
import { defaultContent as skepticContent } from './components/AiSkepticToExpert/AiSkepticToExpert.constants';
import { defaultContent as brainGardenContent } from './components/BrainGardenOverview/BrainGardenOverview.constants';
import { defaultContent as impactContent } from './components/RealWorldImpact/RealWorldImpact.constants';
import { defaultContent as technicalContent } from './components/TechnicalImplementation/TechnicalImplementation.constants';

// Create a WhitePaper page component that shows all sections
const WhitePaper = () => {
  return (
    <div>
      <AiSkepticToExpert 
        heroProps={skepticContent.hero}
        quotesProps={skepticContent.quotes}
        problemSolutionCardsProps={skepticContent.problemSolutions}
      />
      
      <AiAutopilotAnalogy />
      
      <BrainGardenOverview 
        heroProps={brainGardenContent.hero}
        introProps={brainGardenContent.intro}
        coreComponentsProps={brainGardenContent.coreComponents}
        forceMultipliersProps={brainGardenContent.forceMultipliers}
        systemArchitectureProps={brainGardenContent.systemArchitecture}
        navigationProps={brainGardenContent.navigation}
        keyBenefitsProps={brainGardenContent.keyBenefits}
        ctaProps={brainGardenContent.cta}
      />
      
      <TechnicalImplementation 
        title={technicalContent.title}
        subtitle={technicalContent.subtitle}
        systemOverviewDiagram={technicalContent.systemOverviewDiagram}
        agentSystemDiagram={technicalContent.agentSystemDiagram}
        integrationSystemDiagram={technicalContent.integrationSystemDiagram}
        knowledgeFlowDiagram={technicalContent.knowledgeFlowDiagram}
        performanceScalabilityDiagram={technicalContent.performanceScalabilityDiagram}
        knowledgeSystem={technicalContent.knowledgeSystem}
        agentSystem={technicalContent.agentSystem}
        integrationSystem={technicalContent.integrationSystem}
        securityControl={technicalContent.securityControl}
        performanceScalability={technicalContent.performanceScalability}
        result={technicalContent.result}
      />
      
      <RealWorldImpact 
        heroProps={impactContent.hero}
        problemOverviewProps={impactContent.problemOverview}
        challengeBreakdownProps={impactContent.challengeBreakdown}
        processFlowProps={impactContent.processFlow}
        statsComparisonProps={impactContent.statsComparison}
        debtAnalysisProps={impactContent.debtAnalysis}
        cycleDiagramProps={impactContent.cycleDiagram}
        problemSolutionProps={impactContent.problemSolution}
        impactGridProps={impactContent.impactGrid}
        navigationCardProps={impactContent.navigationCard}
      />
    </div>
  );
};

const meta = {
  title: 'Pages/01-WhitePaper',
  component: WhitePaper,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
  },
} satisfies Meta<typeof WhitePaper>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the complete WhitePaper with all sections.
 * This is exactly how it will appear in the actual application.
 */
export const Default: Story = {
  args: {},
};

/**
 * Desktop view of the WhitePaper.
 */
export const Desktop: Story = {
  args: {},
  name: 'Desktop (Default)',
};

/**
 * Mobile view of the WhitePaper.
 */
export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
    docs: { disable: true },
  },
  name: 'Mobile (iPhone X)',
};

/**
 * Tablet view of the WhitePaper.
 */
export const Tablet: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
    docs: { disable: true },
  },
  name: 'Tablet (iPad)',
};