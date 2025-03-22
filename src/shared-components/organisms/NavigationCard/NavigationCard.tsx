import React from 'react';
import { useSpring, config } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import { Typography } from '../../atoms/Typography/Typography';
import { Icon } from '../../atoms/Icon';
import { NavigationCardProps } from './NavigationCard.types';
import * as S from './NavigationCard.styles';

export const NavigationCard: React.FC<NavigationCardProps> = ({
  content,
  style = 'gradient-card',
  animation = 'fade-up',
  className,
}) => {
  if (!content) {
    return null;
  }

  const { text = '', action = '', link = '#', icon = '' } = content;
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-100px 0px',
  });
  
  const springProps = useSpring({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 20,
    config: config.gentle,
    delay: 100,
  });

  return (
    <S.Container className={className} ref={ref}>
      <S.AnimatedCard 
        $style={style}
        style={{
          opacity: springProps.opacity,
          transform: springProps.y.to(y => `translateY(${y}px)`)
        }}
      >
        <S.CardContent>
          <S.IconWrapper>
            {icon && <Icon name={icon} size={24} />}
          </S.IconWrapper>
          
          <Typography variant="h3" className="mb-3" color="light">
            {text}
          </Typography>
          
          {action && link && (
            <S.ActionLink href={link}>
              {action}
              <S.IconWrapper style={{ marginLeft: '0.5rem' }}>
                <Icon name="arrow-right" size={18} />
              </S.IconWrapper>
            </S.ActionLink>
          )}
        </S.CardContent>
      </S.AnimatedCard>
    </S.Container>
  );
}; 