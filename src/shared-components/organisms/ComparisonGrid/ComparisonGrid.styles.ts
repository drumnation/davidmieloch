import styled from 'styled-components';

export const Container = styled.div<{ position?: string }>`
  width: 100%;
  max-width: ${props => props.position === 'full-width' ? '100%' : '800px'};
  margin: 2rem 0;
  
  ${props => props.position === 'left' && `
    align-self: flex-start;
  `}
  
  ${props => props.position === 'right' && `
    align-self: flex-end;
  `}
  
  ${props => props.position === 'center' && `
    align-self: center;
  `}
  
  @media (max-width: 992px) {
    max-width: 100%;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div<{ styleType?: string }>`
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.accent.blue};
  color: white;
  
  ${props => props.styleType === 'accent-cards' && `
    border-top: 4px solid rgba(255, 255, 255, 0.3);
  `}
  
  ${props => props.styleType === 'gradient-cards' && `
    background: ${props.theme.colors.accent.blue};
  `}
  
  ${props => props.styleType === 'default' && `
    background-color: ${props.theme.colors.accent.blue};
  `}
  
  h1, h2, h3, h4, h5, h6 {
    color: white;
  }
`;

export const AspectTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
`;

export const ComparisonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.5rem;
`;

export const ComparisonItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  
  &:last-child {
    border-bottom: none;
  }
`;

export const Label = styled.span`
  font-weight: 500;
  font-size: 0.875rem;
  text-transform: uppercase;
  opacity: 0.8;
  color: white;
`;

export const Value = styled.span`
  font-size: 1rem;
  color: white;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  margin-right: 0.5rem;
`; 