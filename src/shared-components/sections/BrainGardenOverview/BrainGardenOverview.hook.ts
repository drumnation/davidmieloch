import { BrainGardenOverviewProps } from './BrainGardenOverview.types';
import { defaultContent } from './BrainGardenOverview.constants';
import { 
  enhanceHeroProps, 
  processFeatures, 
  processNavigationItems, 
  processStats 
} from './BrainGardenOverview.logic';

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

  // Process features to ensure icons are React elements
  const processedCoreComponents = {
    ...coreComponentsProps,
    features: processFeatures(coreComponentsProps.features)
  };

  const processedForceMultipliers = {
    ...forceMultipliersProps,
    features: processFeatures(forceMultipliersProps.features)
  };

  // Process navigation items to ensure icons are React elements
  const processedNavigation = {
    ...navigationProps,
    sections: processNavigationItems(navigationProps.sections)
  };

  // Process stats to ensure icons are React elements
  const processedKeyBenefits = {
    ...keyBenefitsProps,
    stats: processStats(keyBenefitsProps.stats)
  };

  // Process CTA icon if it's a string
  const processedCTA = {
    ...ctaProps,
    icon: typeof ctaProps.icon === 'string' 
      ? ctaProps.icon 
      : ctaProps.icon
  };

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