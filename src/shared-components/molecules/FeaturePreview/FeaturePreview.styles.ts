import styled from 'styled-components';

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  width: 100%;
`;

export const FeatureContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const IconWrapper = styled.div`
  margin-bottom: 16px;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
`;

export const Description = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => {
    // Safely access theme colors with fallback
    const textColor = theme?.colors?.text;
    return typeof textColor === 'object' && 'secondary' in textColor
      ? textColor.secondary
      : '#4A5568';
  }};
`; 