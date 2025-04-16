/**
 * Utility functions for Home page
 */

/**
 * Calculates whether to show the sticky footer CTA based on scroll position
 * @param scrollY - Current scroll position in pixels
 * @param threshold - Threshold in pixels to start showing the CTA
 * @returns boolean indicating whether to show the CTA
 */
export const shouldShowStickyCTA = (scrollY: number, threshold: number = 600): boolean => {
  return scrollY > threshold;
};

/**
 * Formats a list of technologies with separator
 * @param technologies - Array of technologies
 * @param separator - Separator character(s)
 * @returns Formatted string
 */
export const formatTechList = (technologies: string[], separator: string = '|'): string => {
  return technologies.map(tech => `${tech}`).join(`&nbsp;&nbsp;${separator}&nbsp;&nbsp;`);
};

/**
 * Enhances a meta description by adding focus keywords
 * @param description - Base description
 * @param keywords - Array of keywords to emphasize
 * @returns Enhanced description
 */
export const enhanceMetaDescription = (description: string, keywords: string[]): string => {
  let enhanced = description;
  // Simple implementation just to ensure keywords are in the description
  keywords.forEach(keyword => {
    if (!description.includes(keyword)) {
      enhanced = `${enhanced} ${keyword}.`;
    }
  });
  return enhanced;
}; 