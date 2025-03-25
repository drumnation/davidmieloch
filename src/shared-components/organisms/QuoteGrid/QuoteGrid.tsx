import React from 'react';
import { useSpring, useTrail, animated } from '@react-spring/web';
import { Quote, QuoteGridProps } from './QuoteGrid.types';
import { Grid, QuoteCard, QuoteText, QuoteAuthor, QuoteNote, IconWrapper } from './QuoteGrid.styles';

// Create animated components
const AnimatedDiv = animated.div;
const AnimatedQuoteCard = animated(QuoteCard);

export const QuoteGrid: React.FC<QuoteGridProps> = ({
  quotes,
  layout = '3-column',
  animation = 'stagger-fade',
  style = 'card',
  background = 'light',
  className,
}) => {
  // Container animation
  const containerSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 800 }
  });

  // Quote cards animation trail
  const cardsTrail = useTrail(quotes.length, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { mass: 1, tension: 280, friction: 60 },
    delay: 200
  });

  const isBlueTheme = background === 'blue';

  return (
    <div className={className}>
      <AnimatedDiv style={animation !== 'none' ? containerSpring : undefined}>
        <Grid $layout={layout} $background="light">
          {quotes.map((quote, index) => (
            <AnimatedDiv 
              key={index} 
              style={animation !== 'none' ? cardsTrail[index] : undefined}
            >
              <AnimatedQuoteCard 
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
              </AnimatedQuoteCard>
            </AnimatedDiv>
          ))}
        </Grid>
      </AnimatedDiv>
    </div>
  );
};

export default QuoteGrid; 