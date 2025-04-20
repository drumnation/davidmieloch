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
import { SubNavController } from '@shared-components/navigation/PageSubNav';
import { SubNavItem } from '@shared-components/navigation/PageSubNav/PageSubNav.types';
import {
  IconTransform,
  IconPlaneTilt,
  IconPlant2,
  IconChartInfographic,
  IconTargetArrow,
  IconQuote,
  IconChecklist,
  IconNews,
  IconTextCaption,
  IconInfoCircle,
  IconDeviceDesktopAnalytics,
  IconMessageCircleQuestion,
  IconListCheck,
  IconArrowBigDownLines,
  IconTable,
  IconMasksTheater,
  IconFocusCentered,
  IconChartArcs,
  IconVectorTriangle,
  IconAlertTriangle,
  IconFileCode2,
  IconSettingsCog,
  IconAtom2,
  IconUsersGroup,
  IconMultiplier1x,
  IconFlower,
  IconTopologyStar3,
  IconTrendingUp,
  IconSwitchHorizontal,
  IconFileCertificate,
  IconBulb,
  IconSchema,
  IconPlayerPlay,
  IconHandClick
} from '@tabler/icons-react';
import React from 'react';

// Define accurate two-tier navigation items based on component structure (mirroring main component)
const whitePaperNavItems: SubNavItem[] = [
  // AI Skeptic to Expert (Level 0)
  { id: 'skeptic-to-expert', title: 'AI Skeptic to Expert', level: 0, icon: <IconTransform size={18} /> },
  { id: 'skeptic-reality', title: 'Reality of AI Tools', level: 1, icon: <IconDeviceDesktopAnalytics size={16} /> },
  { id: 'skeptic-quotes', title: 'Developer Quotes', level: 1, icon: <IconQuote size={16} /> },
  { id: 'skeptic-trend', title: 'The Disturbing Trend', level: 1, icon: <IconMessageCircleQuestion size={16} /> },
  { id: 'skeptic-solutions', title: 'Problems & Solutions', level: 1, icon: <IconListCheck size={16} /> },
  { id: 'skeptic-conclusion', title: 'From Skeptic to Innovator', level: 1, icon: <IconArrowBigDownLines size={16} /> },

  // AI Autopilot Analogy (Level 0)
  { id: 'autopilot-analogy', title: 'AI Autopilot Analogy', level: 0, icon: <IconPlaneTilt size={18} /> },
  { id: 'autopilot-hero', title: 'Hero', level: 1, icon: <IconTargetArrow size={16} /> },
  { id: 'autopilot-intro', title: 'Introduction', level: 1, icon: <IconInfoCircle size={16} /> },
  { id: 'autopilot-comparison', title: 'Comparison Table', level: 1, icon: <IconTable size={16} /> },
  { id: 'autopilot-reality', title: 'Reality vs Hollywood', level: 1, icon: <IconMasksTheater size={16} /> },
  { id: 'autopilot-strategy', title: 'Strategic Focus', level: 1, icon: <IconFocusCentered size={16} /> },
  { id: 'autopilot-dunning-kruger', title: 'Dunning-Kruger Effect', level: 1, icon: <IconChartArcs size={16} /> },
  { id: 'autopilot-warning', title: 'Critical Warning', level: 1, icon: <IconAlertTriangle size={16} /> },
  { id: 'autopilot-blueprint', title: 'Leadership Blueprint', level: 1, icon: <IconFileCode2 size={16} /> },

  // Brain Garden Overview (Level 0)
  { id: 'brain-garden-overview', title: 'Brain Garden Overview', level: 0, icon: <IconPlant2 size={18} /> },
  { id: 'garden-system-overview', title: 'System Overview', level: 1, icon: <IconSettingsCog size={16} /> },
  { id: 'garden-core-components', title: 'Core Components', level: 1, icon: <IconAtom2 size={16} /> },
  { id: 'garden-team-customization', title: 'Team Customization', level: 1, icon: <IconUsersGroup size={16} /> },
  { id: 'garden-force-multipliers', title: 'Force Multipliers', level: 1, icon: <IconMultiplier1x size={16} /> },
  { id: 'garden-metaphor', title: 'The Garden Metaphor', level: 1, icon: <IconFlower size={16} /> },
  { id: 'garden-evolution', title: 'The Next Evolution', level: 1, icon: <IconTrendingUp size={16} /> },
  { id: 'garden-transition', title: 'Transition', level: 1, icon: <IconSwitchHorizontal size={16} /> },

  // Real World Impact (Level 0)
  { id: 'real-world-impact', title: 'Real World Impact', level: 0, icon: <IconChartInfographic size={18} /> },
  { id: 'impact-hero', title: 'Hero', level: 1, icon: <IconTargetArrow size={16} /> },
  { id: 'impact-conclusion-intro', title: 'Conclusion Intro', level: 1, icon: <IconFileCertificate size={16} /> },
  { id: 'impact-insights', title: 'Journey Insights', level: 1, icon: <IconBulb size={16} /> },
  { id: 'impact-framework', title: 'The Framework', level: 1, icon: <IconSchema size={16} /> },
  { id: 'impact-current-state', title: 'Current State', level: 1, icon: <IconPlayerPlay size={16} /> },
  { id: 'impact-cta', title: 'Call To Action', level: 1, icon: <IconHandClick size={16} /> },
];

// Create a WhitePaper page component that shows all sections
const WhitePaper = () => {
  return (
    <div>
      <SubNavController items={whitePaperNavItems} />
      <div id="skeptic-to-expert">
        <AiSkepticToExpert
          heroProps={skepticContent.hero}
          quotesProps={skepticContent.quotes}
          problemSolutionCardsProps={skepticContent.problemSolutions}
        />
      </div>

      <div id="autopilot-analogy">
        <AiAutopilotAnalogy />
      </div>

      <div id="brain-garden-overview">
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
      </div>

      <div id="real-world-impact">
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
    </div>
  );
};

const meta: Meta<typeof WhitePaper> = {
  title: 'Pages/01-WhitePaper',
  component: WhitePaper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
  },
};

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