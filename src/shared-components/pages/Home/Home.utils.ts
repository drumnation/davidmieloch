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
 * @param technologies - Array of technologies or React elements
 * @param separator - Separator character(s)
 * @returns Formatted string or null if React elements are provided
 */
export const formatTechList = (technologies: React.ReactNode[], separator: string = '|'): string | null => {
  // If we're passing React elements, return null (we'll handle rendering differently)
  if (technologies.some(tech => typeof tech !== 'string')) {
    return null;
  }

  // Only handle string arrays with this function
  return (technologies as string[]).map(tech => `${tech}`).join(`&nbsp;&nbsp;${separator}&nbsp;&nbsp;`);
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

/**
 * Formats a kebab-case project name into Title Case with spaces.
 * Example: 'cursor-directory-structure' -> 'Cursor Directory Structure'
 * @param name - The kebab-case project name string.
 * @returns The formatted project name string.
 */
export const formatProjectName = (name: string): string => {
  if (!name) return '';
  const titleCased = name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Specific handling for acronyms
  return titleCased.replace(/\bTs\b/g, 'TS');
}; 