import styled from 'styled-components';

export const Grid = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.$columns}, 1fr);
  gap: 24px;
  width: 100%;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div<{ $style: 'gradient-card' | 'accent-card' }>`
  padding: 24px;
  border-radius: 12px;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  
  ${({ $style, theme }) =>
    $style === 'gradient-card'
      ? `
      background: linear-gradient(135deg, ${theme.colors.background.light} 0%, ${theme.colors.background.paper} 100%);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      `
      : `
      background: ${theme.colors.background.light};
      border-left: 4px solid ${theme.colors.primary.main};
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      `}
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary.light};
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: 16px;
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 16px 0;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const BulletList = styled.ul`
  padding-left: 20px;
  margin: 16px 0;
`;

export const BulletItem = styled.li`
  font-size: 14px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.text.secondary};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const CtaLink = styled.a`
  display: inline-flex;
  align-items: center;
  margin-top: auto;
  padding-top: 16px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary.dark};
  }
  
  svg {
    margin-left: 4px;
  }
`; 