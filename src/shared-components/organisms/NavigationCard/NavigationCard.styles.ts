import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface CardProps {
  $style: 'gradient-card' | 'accent-card' | 'default';
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
`;

export const Card = styled.div<CardProps>`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  
  ${({ $style, theme }) => $style === 'gradient-card' && css`
    background: linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main});
    color: ${theme.colors.background.light};
  `}
  
  ${({ $style, theme }) => $style === 'accent-card' && css`
    background: ${theme.colors.accent.blue};
    color: ${theme.colors.background.light};
  `}
  
  ${({ $style, theme }) => $style === 'default' && css`
    background: ${theme.colors.background.paper};
    color: ${theme.colors.text.primary};
    border: 1px solid ${theme.colors.border.light};
  `}
`;

export const AnimatedCard = motion(Card);

export const CardContent = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
`;

export const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  margin-bottom: 1rem;
  
  &:last-child {
    width: auto;
    height: auto;
    background: transparent;
    margin-bottom: 0;
    border-radius: 0;
  }
`;

export const ActionLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  color: white;
  text-decoration: none;
  margin-top: auto;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.9;
    text-decoration: underline;
  }
`; 