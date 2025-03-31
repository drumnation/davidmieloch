import React from 'react';
import { FeatureCardGridProps } from './FeatureCardGrid.types';
import {
  Grid,
  FeatureCard,
  IconWrapper,
  Title,
  Description,
  BulletList,
  BulletItem,
  CtaLink,
} from './FeatureCardGrid.styles';

export const FeatureCardGrid: React.FC<FeatureCardGridProps> = ({
  features,
  columns = 2,
  style = 'accent-card',
  animation = 'none',
  className,
}) => {
  return (
    <Grid $columns={columns} className={className}>
      {features.map((feature, index) => (
        <FeatureCard key={index} $style={style}>
          {feature.icon && <IconWrapper>{feature.icon}</IconWrapper>}
          <Title>{feature.title}</Title>
          {feature.description && <Description>{feature.description}</Description>}
          
          {feature.bulletPoints && feature.bulletPoints.length > 0 && (
            <BulletList>
              {feature.bulletPoints.map((bullet, bulletIndex) => (
                <BulletItem key={bulletIndex}>
                  {bullet.icon && bullet.icon}
                  {bullet.text}
                </BulletItem>
              ))}
            </BulletList>
          )}
          
          {feature.cta && (
            <CtaLink href={feature.cta.url} target="_blank" rel="noopener noreferrer">
              {feature.cta.text}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </CtaLink>
          )}
        </FeatureCard>
      ))}
    </Grid>
  );
}; 