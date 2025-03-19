import type { Meta, StoryObj } from '@storybook/react';
import { AiSkepticToExpert } from '../../sections/AiSkepticToExpert';
import { AiAutopilotAnalogy } from '../../sections/AiAutopilotAnalogy';
import { BrainGardenOverview } from '../../sections/BrainGardenOverview';
import TechnicalImplementation from '../../sections/TechnicalImplementation';
import { RealWorldImpact } from '../../sections/RealWorldImpact';
import { defaultContent as skepticContent } from '../../sections/AiSkepticToExpert/AiSkepticToExpert.constants';
import { defaultContent as brainGardenContent } from '../../sections/BrainGardenOverview/BrainGardenOverview.constants';
import { defaultContent as impactContent } from '../../sections/RealWorldImpact/RealWorldImpact.constants';
import { defaultContent as technicalContent } from '../../sections/TechnicalImplementation/TechnicalImplementation.constants';

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