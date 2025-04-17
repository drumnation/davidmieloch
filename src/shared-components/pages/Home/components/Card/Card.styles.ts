'use client';

import styled, { css } from 'styled-components';
import { theme } from './Card.logic';

export const CardContainer = styled.div<{ variant?: string }>`
  display: flex;
  flex-direction: column;
  flex: 1 1 280px;
  min-width: 280px;
  background: ${theme.background.card};
  color: ${theme.text.primary};
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  padding: 28px;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  overflow: hidden;
  height: 100%;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
    background: ${theme.background.cardHover};
  }
  
  ${props => props.variant === 'persona' && css`
    text-align: center;
    background: linear-gradient(145deg, #212346, #171933);
    border: 1px solid rgba(255, 255, 255, 0.05);
  `}
  
  ${props => props.variant === 'framework' && css`
    background: linear-gradient(to right, #1e1e2f, #232342);
    border-left: 4px solid ${theme.accent.primary};
    
    &:hover {
      background: linear-gradient(to right, #2f2f48, #363656);
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }
  `}
  
  ${props => props.variant === 'project' && css`
    background: linear-gradient(145deg, #232752, #1a1d3d);
    border-left: 4px solid ${theme.accent.secondary};
  `}
`;

export const CardIcon = styled.div`
  font-size: 2.25rem;
  margin-bottom: 1.5rem;
  background: rgba(255, 255, 255, 0.08);
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  
  /* Specific styling for TechIcon components */
  & > * {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Ensure emoji text is centered properly */
  font-family: "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
`;

export const CardTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: ${theme.text.primary};
  letter-spacing: -0.01em;
  min-height: 3.5rem;
  display: flex;
  align-items: center;
  class: "card-title";
`;

export const CardDescription = styled.div`
  font-size: 1rem;
  color: ${theme.text.secondary};
  margin-bottom: 1.5rem;
  flex-grow: 1;
  line-height: 1.6;
  min-height: 3rem;
  class: "card-description";
`;

export const CardContent = styled.div`
  flex-grow: 1;
  margin-bottom: 1.25rem;
`;

export const CardAction = styled.div`
  margin-top: auto;
`; 