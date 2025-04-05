import { AiAutopilotAnalogyProps } from './AiAutopilotAnalogy.types';
import { enhanceHeroProps } from './AiAutopilotAnalogy.logic';
import { defaultContent } from './data';

export const useAiAutopilotAnalogy = (props: AiAutopilotAnalogyProps) => {
  const {
    className,
    heroProps = defaultContent.hero,
    comparisonTableProps = defaultContent.comparisonTable,
    realityVsHollywoodProps = defaultContent.realityVsHollywood,
    strategicFocusAreasProps = defaultContent.strategicFocusAreas,
    leadershipBlueprintProps = defaultContent.leadershipBlueprint,
    mermaidDiagramProps = defaultContent.mermaidDiagram,
  } = props;

  // Create a new heroProps object with marginBottom added
  const enhancedHeroProps = enhanceHeroProps(heroProps);

  return {
    className,
    enhancedHeroProps,
    comparisonTableProps,
    realityVsHollywoodProps,
    strategicFocusAreasProps,
    leadershipBlueprintProps,
    mermaidDiagramProps
  };
};