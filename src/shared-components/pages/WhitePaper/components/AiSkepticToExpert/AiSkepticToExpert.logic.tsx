import React, { ReactElement } from 'react';
import { HeroProps } from '@shared-components/organisms/Hero';
import { QuoteGridProps, Quote } from '@shared-components/organisms/QuoteGrid/QuoteGrid.types';
import { AiSkepticToExpertProps } from './AiSkepticToExpert.types';
import { useImagePreloader } from '@hooks/useImagePreloader';
import { defaultContent } from './AiSkepticToExpert.constants';
import { Icon } from '@shared-components/atoms/Icon';

/**
 * Enhances the hero props for Hero with consistent styling and defaults
 */
export const enhanceHeroProps = (heroProps: AiSkepticToExpertProps['heroProps'] = defaultContent.hero): HeroProps => {
  // Format the title with specific line breaks, non-breaking spaces, and styled emphasis
  // All uppercase to ensure consistent styling
  // The \u00A0 is a non-breaking space to keep "AI SKEPTIC" together on mobile
  // Using HTML for the title to add color emphasis to "AI NATIVE"
  const formattedTitle = "FROM AI\u00A0SKEPTIC<br>TO <span style='color:#4dabf7;text-transform:uppercase'>AI\u00A0NATIVE</span>";

  return {
    // Spread the original props first
    ...heroProps,
    // Override with formatted title
    title: formattedTitle.toUpperCase(),
    // Add optional scroll CTA
    scrollCta: {
      text: "Read My Story",
      targetId: "skeptic-reality"
    },
    // Ensure required fields for Hero are set
    background: 'image',
    backgroundImage: heroProps.backgroundImage || '/main-heading-background.png',
    backgroundOverlay: true,
    textColor: 'light',
    overlayOpacity: 0.5,
  };
};

/**
 * Enhances the quotes props with consistent styling and defaults
 */
export const enhanceQuotesProps = (quotesProps: AiSkepticToExpertProps['quotesProps'] = defaultContent.quotes): QuoteGridProps => {
  // Safety check for undefined or malformed props
  if (!quotesProps || !quotesProps.quotes) {
    console.warn('enhanceQuotesProps: Invalid quotesProps provided, using defaults');
    quotesProps = defaultContent.quotes;
  }

  try {
    return {
      ...quotesProps,
      className: `${quotesProps.className || ''} mb-0`, // No margin needed with the new container
      quotes: quotesProps.quotes.map(quote => {
        try {
          return {
            ...quote,
            icon: typeof quote.icon === 'string'
              ? <Icon name={quote.icon as string} size={24} /> as ReactElement
              : quote.icon as ReactElement | undefined
          };
        } catch (err) {
          console.error('Error processing quote:', err);
          // Return the quote without processing the icon
          return quote;
        }
      }) as Quote[],
      layout: quotesProps.layout === 'grid' ? '3-column' : quotesProps.layout || '3-column',
      animation: 'stagger-fade',
      background: 'gradient' // Use theme gradient instead of blue
    };
  } catch (err) {
    console.error('Error in enhanceQuotesProps:', err);
    // Return a safe fallback
    return {
      ...defaultContent.quotes,
      className: 'mb-0',
      quotes: defaultContent.quotes.quotes.map(quote => ({
        ...quote,
        icon: typeof quote.icon === 'string'
          ? <Icon name={quote.icon as string} size={24} /> as ReactElement
          : quote.icon as ReactElement | undefined
      })) as Quote[],
      layout: '3-column',
      animation: 'stagger-fade',
      background: 'gradient'
    };
  }
};

/**
 * Creates the Reddit SVG icon
 */
export const RedditIcon = (): React.ReactElement => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="#FF4500">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
  </svg>
);

export const useAiSkepticToExpertLogic = ({ content = defaultContent, onImageLoad }: AiSkepticToExpertProps) => {
  const { hero: heroProps, quotes: quotesProps } = content;

  // Use the renamed function here as well
  const enhancedHeroProps = React.useMemo(() => enhanceHeroProps(heroProps), [heroProps]);
  const enhancedQuotesProps = React.useMemo(() => enhanceQuotesProps(quotesProps), [quotesProps]);

  // Image preloading logic - should still work if backgroundImage exists
  const imageUrls = [
    enhancedHeroProps.backgroundImage,
  ].filter(Boolean) as string[];

  useImagePreloader(imageUrls, onImageLoad);

  return {
    enhancedHeroProps,
    enhancedQuotesProps,
  };
}; 