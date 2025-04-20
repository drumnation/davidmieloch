"use client";

import React from 'react';
import { Hero } from '@shared-components/organisms/Hero/Hero';
import { AiAutopilotAnalogyProps } from './AiAutopilotAnalogy.types';
import { useAiAutopilotAnalogy } from './AiAutopilotAnalogy.hook';
import { GlobalStyles, containerStyle, sectionContainerStyle } from './AiAutopilotAnalogy.styles';
import { defaultContent } from './data';

// Import section components
import {
  IntroductionSection,
  ComparisonTableSection,
  RealityVsHollywoodSection,
  StrategicFocusSection,
  MermaidDiagramSection,
  WarningTransitionSection,
  LeadershipBlueprintSection,
  DunningKrugerSection
} from './components';

export const AiAutopilotAnalogy: React.FC<AiAutopilotAnalogyProps> = ({
  heroProps = defaultContent.hero,
  realityVsHollywoodProps = defaultContent.realityVsHollywood,
  className
}) => {
  const {
    enhancedHeroProps,
    comparisonTableProps,
    realityVsHollywoodProps: updatedRealityVsHollywoodProps,
    strategicFocusAreasProps,
    mermaidDiagramProps,
    leadershipBlueprintProps
  } = useAiAutopilotAnalogy({
    heroProps,
    realityVsHollywoodProps
  });

  // Ensure theme is of the correct type
  const diagramTheme = (mermaidDiagramProps.theme === 'default' ||
    mermaidDiagramProps.theme === 'dark' ||
    mermaidDiagramProps.theme === 'forest' ||
    mermaidDiagramProps.theme === 'neutral')
    ? mermaidDiagramProps.theme
    : 'default';

  return (
    <div className={className}>
      <GlobalStyles />
      <div style={containerStyle}>
        <div id="autopilot-hero" style={{ scrollMarginTop: '100px' }}>
          <Hero {...enhancedHeroProps} />
        </div>

        <div className="autopilot-content-section">
          <div id="autopilot-intro" style={{ ...sectionContainerStyle, scrollMarginTop: '100px' }}>
            <IntroductionSection />
          </div>

          <div id="autopilot-comparison" style={{ scrollMarginTop: '100px' }}>
            <ComparisonTableSection
              leftTitle={comparisonTableProps.leftTitle}
              rightTitle={comparisonTableProps.rightTitle}
              items={comparisonTableProps.items}
            />
          </div>

          <div id="autopilot-reality" style={{ ...sectionContainerStyle, scrollMarginTop: '100px' }}>
            <RealityVsHollywoodSection
              realityItems={updatedRealityVsHollywoodProps.realityItems}
              hollywoodItems={updatedRealityVsHollywoodProps.hollywoodItems}
            />
          </div>

          <div id="autopilot-strategy" style={{ scrollMarginTop: '100px' }}>
            <StrategicFocusSection
              features={strategicFocusAreasProps.features}
            />
          </div>

          <div id="autopilot-dunning-kruger" style={{ ...sectionContainerStyle, scrollMarginTop: '100px' }}>
            <DunningKrugerSection />
          </div>

          <div id="autopilot-diagram" style={{ scrollMarginTop: '100px' }}>
            <MermaidDiagramSection
              title={mermaidDiagramProps.title}
              description={mermaidDiagramProps.description}
              definition={mermaidDiagramProps.definition}
              theme={diagramTheme}
            />
          </div>

          <div id="autopilot-warning" style={{ scrollMarginTop: '100px' }}>
            <WarningTransitionSection
              title={leadershipBlueprintProps.warningTransition.title}
              description={leadershipBlueprintProps.warningTransition.description}
            />
          </div>

          <div id="autopilot-blueprint" style={{ ...sectionContainerStyle, scrollMarginTop: '100px' }}>
            <LeadershipBlueprintSection
              title={leadershipBlueprintProps.title}
              narrative={leadershipBlueprintProps.narrative}
              blueprint={leadershipBlueprintProps.blueprint}
              bottomLine={leadershipBlueprintProps.bottomLine}
            />
          </div>
        </div>
      </div>
    </div>
  );
};