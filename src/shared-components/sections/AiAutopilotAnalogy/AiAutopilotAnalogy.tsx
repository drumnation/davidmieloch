"use client";

import React from 'react';
import { Hero } from '../../organisms/Hero';
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
  LeadershipBlueprintSection
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
        <Hero {...enhancedHeroProps} />
        
        <div className="autopilot-content-section">
          {/* Introduction Section */}
          <div style={sectionContainerStyle}>
            <IntroductionSection />
          </div>
          
          {/* Comparison Table Section */}
          <ComparisonTableSection
                leftTitle={comparisonTableProps.leftTitle}
                rightTitle={comparisonTableProps.rightTitle}
                items={comparisonTableProps.items}
              />
          
          {/* Reality vs Hollywood Section */}
          <div style={sectionContainerStyle}>
            <RealityVsHollywoodSection
              realityItems={updatedRealityVsHollywoodProps.realityItems}
              hollywoodItems={updatedRealityVsHollywoodProps.hollywoodItems}
            />
          </div>
          
          {/* Strategic Focus Areas Section */}
          <StrategicFocusSection 
            features={strategicFocusAreasProps.features}
          />

          {/* Mermaid Diagram Section */}
          <div style={sectionContainerStyle}>
            <MermaidDiagramSection
              title={mermaidDiagramProps.title}
              description={mermaidDiagramProps.description}
              definition={mermaidDiagramProps.definition}
              theme={diagramTheme}
            />
          </div>

          {/* Critical Warning Transition */}
          <WarningTransitionSection
            title={leadershipBlueprintProps.warningTransition.title}
            description={leadershipBlueprintProps.warningTransition.description}
          />
          
          {/* Leadership Blueprint Section */}
          <div style={sectionContainerStyle}>
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