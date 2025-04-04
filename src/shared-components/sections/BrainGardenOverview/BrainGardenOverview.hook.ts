import { BrainGardenOverviewProps } from './BrainGardenOverview.types';
import { defaultContent } from './BrainGardenOverview.constants';
import { 
  enhanceHeroProps, 
  processFeatures, 
  processNavigationItems, 
  processStats 
} from './BrainGardenOverview.logic';

/**
 * Custom hook to handle BrainGardenOverview props with defaults and processing
 */
export const useBrainGardenOverview = (props: BrainGardenOverviewProps) => {
  const {
    className,
    heroProps = defaultContent.hero,
    introProps = defaultContent.intro,
    coreComponentsProps = defaultContent.coreComponents,
    forceMultipliersProps = defaultContent.forceMultipliers,
    systemArchitectureProps = defaultContent.systemArchitecture,
    navigationProps = defaultContent.navigation,
    keyBenefitsProps = defaultContent.keyBenefits,
    ctaProps = defaultContent.cta,
    transitionProps = defaultContent.transition,
  } = props;

  // Enhance hero props with defaults and consistent styling
  const enhancedHeroProps = enhanceHeroProps(heroProps);

  // Process features, navigation items, and stats to ensure icons are React elements
  const processedCoreComponents = {
    ...coreComponentsProps,
    features: processFeatures(coreComponentsProps.features)
  };

  const processedForceMultipliers = {
    ...forceMultipliersProps,
    features: processFeatures(forceMultipliersProps.features)
  };

  const processedNavigation = {
    ...navigationProps,
    sections: processNavigationItems(navigationProps.sections)
  };

  const processedKeyBenefits = {
    ...keyBenefitsProps,
    stats: processStats(keyBenefitsProps.stats)
  };

  // No need to process CTA icon if it's already string or ReactElement
  const processedCTA = { ...ctaProps };

  return {
    className,
    enhancedHeroProps,
    introProps,
    processedCoreComponents,
    processedForceMultipliers,
    systemArchitectureProps,
    processedNavigation,
    processedKeyBenefits,
    processedCTA,
    transitionProps
  };
};