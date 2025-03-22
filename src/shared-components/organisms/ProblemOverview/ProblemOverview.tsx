import React from 'react';
import { useSpring, useTrail, config } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import { Typography } from '../../atoms/Typography';
import { ProblemOverviewProps } from './ProblemOverview.types';
import * as S from './ProblemOverview.styles';

export const ProblemOverview: React.FC<ProblemOverviewProps> = ({
  title,
  description,
  metrics,
  style = 'gradient-card',
  position = 'full-width',
  animation = 'fade-up',
  background = 'light',
  className
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const getSpringConfig = () => {
    switch (animation) {
      case 'fade-up':
        return {
          from: { opacity: 0, y: 20 },
          to: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
          config: config.gentle
        };
      case 'slide-in':
        return {
          from: { opacity: 0, x: -20 },
          to: inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 },
          config: config.gentle
        };
      case 'none':
        return {
          from: { opacity: 1 },
          to: { opacity: 1 },
        };
      default:
        return {
          from: { opacity: 0, y: 20 },
          to: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
          config: config.gentle
        };
    }
  };

  const containerSpring = useSpring(getSpringConfig());
  
  const headerSpring = useSpring({
    ...getSpringConfig(),
    delay: 100
  });

  const descriptionSpring = useSpring({
    ...getSpringConfig(),
    delay: 200
  });

  const metricsTrail = useTrail(metrics.length, {
    ...getSpringConfig(),
    delay: 300,
  });

  return (
    <S.AnimatedContainer
      className={className}
      $position={position}
      $background={background}
      $style={style}
      style={{
        opacity: containerSpring.opacity,
        transform: animation === 'fade-up' 
          ? containerSpring.y.to(y => `translateY(${y}px)`)
          : animation === 'slide-in'
            ? containerSpring.x.to(x => `translateX(${x}px)`)
            : 'none'
      }}
      ref={ref}
    >
      <S.AnimatedHeader
        style={{
          opacity: headerSpring.opacity,
          transform: animation === 'fade-up' 
            ? headerSpring.y.to(y => `translateY(${y}px)`)
            : animation === 'slide-in'
              ? headerSpring.x.to(x => `translateX(${x}px)`)
              : 'none'
        }}
      >
        <Typography
          variant="h2"
          color={background === 'light' ? 'primary' : 'inherit'}
        >
          {title}
        </Typography>
      </S.AnimatedHeader>

      <S.AnimatedDescription
        style={{
          opacity: descriptionSpring.opacity,
          transform: animation === 'fade-up' 
            ? descriptionSpring.y.to(y => `translateY(${y}px)`)
            : animation === 'slide-in'
              ? descriptionSpring.x.to(x => `translateX(${x}px)`)
              : 'none'
        }}
      >
        <Typography
          variant="body"
          color={background === 'light' ? 'primary' : 'inherit'}
        >
          {description}
        </Typography>
      </S.AnimatedDescription>

      <S.MetricsGrid>
        {metricsTrail.map((style, index) => (
          <S.AnimatedMetricCard
            key={index}
            style={{
              opacity: style.opacity,
              transform: animation === 'fade-up' 
                ? style.y.to(y => `translateY(${y}px)`)
                : animation === 'slide-in'
                  ? style.x.to(x => `translateX(${x}px)`)
                  : 'none'
            }}
          >
            <S.MetricNumber>
              {metrics[index].prefix && <span>{metrics[index].prefix}</span>}
              {metrics[index].number}
              {metrics[index].suffix && <span>{metrics[index].suffix}</span>}
            </S.MetricNumber>
            <S.MetricLabel>
              <Typography
                variant="body"
                color={background === 'light' ? 'secondary' : 'inherit'}
              >
                {metrics[index].label}
              </Typography>
            </S.MetricLabel>
          </S.AnimatedMetricCard>
        ))}
      </S.MetricsGrid>
    </S.AnimatedContainer>
  );
}; 