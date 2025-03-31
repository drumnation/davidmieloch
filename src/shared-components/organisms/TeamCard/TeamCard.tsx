import React from 'react';
import { useSpring, useTrail } from '@react-spring/web';
import { TeamCardProps } from './TeamCard.types';
import { H2, H3, Body } from '../../atoms/Typography/Typography';
import * as S from './TeamCard.styles';
import { AnimatedDiv } from '../../../utils/animations/typed-components';
import { frameFadeInToSpring, frameFadeUpToSpring } from '../../../utils/animations/typed-components';

export const TeamCard: React.FC<TeamCardProps> = ({
  name,
  agent,
  icon,
  responsibilities,
  skills,
  className,
}) => {
  // Container animation
  const containerSpring = useSpring({
    ...frameFadeUpToSpring(0),
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 60 }
  });

  // Hover animation
  const [hoverProps, setHover] = useSpring(() => ({
    transform: 'translateY(0px)',
    config: { tension: 300, friction: 20 }
  }));

  // Icon animation
  const iconSpring = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
    delay: 200,
    config: { tension: 200, friction: 12 }
  });

  // Responsibilities list animation
  const responsibilitiesTrail = useTrail(responsibilities.length, {
    from: { opacity: 0, x: -20 },
    to: { opacity: 1, x: 0 },
    config: { tension: 280, friction: 60 },
    delay: 200
  });

  // Skills animation
  const skillsTrail = useTrail(skills.length, {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
    config: { tension: 280, friction: 60 },
    delay: 300
  });

  return (
    <AnimatedDiv
      style={{
        ...containerSpring,
        ...hoverProps
      }}
      onMouseEnter={() => setHover({ transform: 'translateY(-4px)' })}
      onMouseLeave={() => setHover({ transform: 'translateY(0px)' })}
    >
      <S.StyledTeamCard variant="accent" padding="lg" className={className}>
        <S.Header $hasIcon={Boolean(icon)}>
          {icon && (
            <S.IconWrapper
              style={{ 
                transform: iconSpring.scale.to(s => `scale(${s})`) 
              }}
            >
              <span className="icon">{icon}</span>
            </S.IconWrapper>
          )}
          <div>
            <H2>{name}</H2>
            <Body color="secondary">{agent}</Body>
          </div>
        </S.Header>

        <S.Content>
          <div>
            <H3>Responsibilities</H3>
            <S.List>
              {responsibilitiesTrail.map((styles, index) => (
                <S.ListItem key={index} style={styles as any}>
                  <Body>{responsibilities[index]}</Body>
                </S.ListItem>
              ))}
            </S.List>
          </div>

          <div>
            <H3>Skills</H3>
            <S.SkillsContainer>
              {skillsTrail.map((styles, index) => (
                <S.Skill
                  key={index}
                  style={styles as any}
                >
                  {skills[index]}
                </S.Skill>
              ))}
            </S.SkillsContainer>
          </div>
        </S.Content>
      </S.StyledTeamCard>
    </AnimatedDiv>
  );
}; 