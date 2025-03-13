import { AiAutopilotAnalogyProps } from './AiAutopilotAnalogy.types';
import { defaultContent, enhanceHeroProps } from './AiAutopilotAnalogy.logic';

export const useAiAutopilotAnalogy = (props: AiAutopilotAnalogyProps) => {
  const {
    className,
    heroProps = defaultContent.hero,
    comparisonTableProps = defaultContent.comparisonTable,
    realityVsHollywoodProps = defaultContent.realityVsHollywood,
    strategicFocusAreasProps = defaultContent.strategicFocusAreas,
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
    mermaidDiagramProps
  };
};