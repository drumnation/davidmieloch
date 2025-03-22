import styled from 'styled-components';
import { animated } from '@react-spring/web';
import { Card } from '../../atoms/Card/Card';
import { StyledTeamCardProps } from './TeamCard.types';
import { AnimatedDiv } from '../../../utils/animations/typed-components';

export const StyledTeamCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Header = styled.div<StyledTeamCardProps>`
  display: grid;
  grid-template-columns: ${({ $hasIcon }) => ($hasIcon ? 'auto 1fr' : '1fr')};
  gap: 1rem;
  align-items: center;
`;

export const IconWrapper = styled(AnimatedDiv)`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: var(--bg-light);
  color: var(--primary-blue);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const List = styled(AnimatedDiv).attrs({ as: 'ul' })`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ListItem = styled(AnimatedDiv).attrs({ as: 'li' })`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '•';
    color: var(--primary-blue);
  }
`;

export const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Skill = styled(AnimatedDiv).attrs({ as: 'span' })`
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  background: var(--bg-light);
  color: var(--primary-blue);
  font-size: 0.875rem;
  font-weight: 500;
`; 