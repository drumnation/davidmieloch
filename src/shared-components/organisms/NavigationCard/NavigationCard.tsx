import React from 'react';
import { useSpring, config } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import { Typography } from '../../atoms/Typography/Typography';
import { Icon } from '../../atoms/Icon';
import { NavigationCardProps } from './NavigationCard.types';
import * as S from './NavigationCard.styles';

export const NavigationCard: React.FC<NavigationCardProps> = ({
  content,
  title,
  description,
  action,
  link,
  icon,
  style = 'gradient-card',
  animation = 'fade-up',
  className,
}) => {
  // Support both content object and direct props
  const cardText = content?.text || title || '';
  const cardDescription = description || '';
  const cardAction = content?.action || action || '';
  const cardLink = content?.link || link || '#';
  const cardIcon = content?.icon || icon || '';
  
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
          {cardIcon && (
            <S.IconWrapper>
              <Icon name={cardIcon} size={24} />
            </S.IconWrapper>
          )}
          
          <Typography variant="h3" className="mb-3" color="light">
            {cardText}
          </Typography>
          
          {cardDescription && (
            <Typography variant="body" color="secondary" className="mb-4">
              {cardDescription}
            </Typography>
          )}
          
          {cardAction && cardLink && (
            <S.ActionLink href={cardLink}>
              {cardAction}
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