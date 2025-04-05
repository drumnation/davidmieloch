import styled from 'styled-components';

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: 100%;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: 20px;
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
`; 