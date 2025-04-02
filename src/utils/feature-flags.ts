/**
 * Feature flags for toggling animation libraries and enabling/disabling components
 */

export const ANIMATION_LIBRARY = {
  REACT_SPRING: 'react-spring',
  FRAMER_MOTION: 'framer-motion',
  NONE: 'none'
} as const;

export type AnimationLibrary = typeof ANIMATION_LIBRARY[keyof typeof ANIMATION_LIBRARY];

/**
 * Animation configuration for feature flag system
 */
export const ANIMATION_CONFIG = {
  // Use Framer Motion as the default animation library
  library: ANIMATION_LIBRARY.FRAMER_MOTION as AnimationLibrary,
  // Enable the migrated components
  enabledComponents: [
    'ImpactGrid',
    'ProblemSolution',
    'DebtAnalysis',
    'ComparisonGrid',
    'FeaturePreview',
    'ChallengeBreakdown',
    'QuoteGrid',
    'ProcessFlow',
    'TeamCard',
    'AiSkepticToExpert',
    'NavigationCard',
    'ReactFlowDiagram'
  ] as string[],
  // Enable per-component debugging
  debugMode: process.env.NODE_ENV !== 'production'
};

/**
 * Determines which animation library to use for a specific component
 * @param componentName The name of the component requesting animation
 * @returns The animation library to use
 */
export function getAnimationLibrary(componentName: string): AnimationLibrary {
  // If component is not enabled, return NONE
  if (!ANIMATION_CONFIG.enabledComponents.includes(componentName)) {
    return ANIMATION_LIBRARY.NONE;
  }
  
  // Otherwise return the configured library
  return ANIMATION_CONFIG.library;
}

/**
 * Checks if animations should be enabled for a component
 * @param componentName The name of the component
 * @returns Boolean indicating if animations are enabled
 */
export function isAnimationEnabled(componentName: string): boolean {
  return getAnimationLibrary(componentName) !== ANIMATION_LIBRARY.NONE;
} 