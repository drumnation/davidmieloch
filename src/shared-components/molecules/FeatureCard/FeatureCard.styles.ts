import styled, { css } from 'styled-components';
import { animated } from '@react-spring/web';

interface CardContainerProps {
  $style?: 'gradient-card' | 'accent-card';
}

export const CardContainer = styled(animated.div)<CardContainerProps>`
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.background.paper};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  ${({ $style, theme }) => 
    $style === 'gradient-card' && css`
      background: linear-gradient(
        135deg,
        ${theme.colors.primary.main} 0%,
        ${theme.colors.secondary.main} 100%
      );
      color: ${theme.colors.text.light};
      
      h3 {
        color: ${theme.colors.text.light};
      }
    `}
  
  ${({ $style, theme }) => 
    $style === 'accent-card' && css`
      border-left: 4px solid ${theme.colors.primary.main};
    `}
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  }
`;

export const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const IconContainer = styled.div`
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.primary.main};
`;

export const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const BulletItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }

  svg {
    margin-right: 8px;
    color: ${({ theme }) => theme.colors.primary.main};
    flex-shrink: 0;
  }
`;

export const BulletText = styled.span`
  font-size: 16px;
  line-height: 1.5;
`;

export const BulletIconContainer = styled.span`
  margin-right: 10px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary.main};
`;
