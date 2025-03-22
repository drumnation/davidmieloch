import React from 'react';
import { useSpring, useTrail } from '@react-spring/web';
import { Quote, QuoteGridProps } from './QuoteGrid.types';
import { Grid, QuoteCard, QuoteText, QuoteAuthor, QuoteNote, IconWrapper } from './QuoteGrid.styles';

export const QuoteGrid: React.FC<QuoteGridProps> = ({
  quotes,
  layout = '3-column',
  animation = 'stagger-fade',
  style = 'card',
  background = 'light',
  className,
}) => {
  // Create animation properties but don't directly apply them to the components
  // This avoids TypeScript errors with SpringValue types
  const containerProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 800 }
  });

  // Animation trail data for the quotes
  const trailProps = useTrail(quotes.length, {
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: { mass: 1, tension: 280, friction: 60 },
    delay: 200
  });

  const isBlueTheme = background === 'blue';

  // Helper function to convert spring values to regular CSS
  const springToCss = (springObj: any) => {
    if (!animation || animation === 'none') return {};
    
    const result: Record<string, string | number> = {};
    
    // Handle opacity
    if (springObj.opacity !== undefined) {
      result.opacity = springObj.opacity.get();
    }
    
    // Handle transform values
    if (springObj.y !== undefined) {
      result.transform = `translateY(${springObj.y.get()}px)`;
    }
    
    return result;
  };

  return (
    <div className={className}>
      <div style={animation !== 'none' ? springToCss(containerProps) : undefined}>
        <Grid $layout={layout} $background="light">
          {quotes.map((quote, index) => (
            <div 
              key={index} 
              style={animation !== 'none' ? springToCss(trailProps[index]) : undefined}
            >
              <QuoteCard 
                $style={style} 
                $background={isBlueTheme ? 'blue' : background}
              >
                {quote.icon && (
                  <IconWrapper $background={isBlueTheme ? 'blue' : background}>
                    {quote.icon}
                  </IconWrapper>
                )}
                <QuoteText>&ldquo;{quote.text}&rdquo;</QuoteText>
                <QuoteAuthor>
                  — {quote.author}
                  {quote.role && `, ${quote.role}`}
                </QuoteAuthor>
                {quote.note && <QuoteNote>{quote.note}</QuoteNote>}
              </QuoteCard>
            </div>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default QuoteGrid; 