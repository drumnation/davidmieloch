import React from 'react';
import { Typography } from '../../../../atoms/Typography';
import { Button } from '../../../../atoms/Button';
import { MarketingHeaderProps } from './MarketingHeader.types';
import {
  HeaderContainer,
  HeaderContent,
  HeaderTitle,
  HeaderSubtitle,
  ButtonContainer
} from './MarketingHeader.styles';

export const MarketingHeader: React.FC<MarketingHeaderProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  className
}) => {
  return (
    <HeaderContainer className={className}>
      <HeaderContent>
        <div>
          <HeaderTitle>
            <Typography variant="h1" color="primary">
              {title}
            </Typography>
          </HeaderTitle>
          
          {subtitle && (
            <HeaderSubtitle>
              <Typography variant="body">
                {subtitle}
              </Typography>
            </HeaderSubtitle>
          )}
          
          {ctaText && ctaLink && (
            <ButtonContainer>
              <Button 
                variant="primary" 
                size="lg"
                href={ctaLink}
              >
                {ctaText}
              </Button>
            </ButtonContainer>
          )}
        </div>
      </HeaderContent>
    </HeaderContainer>
  );
}; 