import React from 'react';
import { styled } from 'styled-components';
import { FeatureCardProps } from './FeatureCard.types';

const CardContainer = styled.div<{ $style: string }>`
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  
  ${({ $style }) => $style === 'gradient-card' && `
    background: linear-gradient(135deg, #6e8efb 0%, #a777e3 100%);
    color: white;
  `}
  
  ${({ $style }) => $style === 'accent-card' && `
    background: white;
    border-left: 4px solid #6e8efb;
  `}
`;

const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 12px;
  }
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const BulletItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:before {
    content: "•";
    margin-right: 8px;
  }
`;

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  bulletPoints,
  icon,
  style = 'accent-card',
  animation = 'none',
  className,
}) => {
  return (
    <CardContainer $style={style} className={className}>
      <CardTitle>
        {icon}
        {title}
      </CardTitle>
      
      <BulletList>
        {bulletPoints.map((point, index) => (
          <BulletItem key={index}>
            {point.text}
          </BulletItem>
        ))}
      </BulletList>
    </CardContainer>
  );
};

export default FeatureCard; 