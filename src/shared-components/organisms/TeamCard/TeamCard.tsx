import React from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { TeamCardProps } from './TeamCard.types';
import { H2, H3, Body } from '../../atoms/Typography/Typography';
import * as S from './TeamCard.styles';
import { AnimationDebugger, AnimationErrorBoundary } from '../../../utils/animations/debug-tools';

export const TeamCard: React.FC<TeamCardProps> = ({
  name,
  agent,
  icon,
  responsibilities,
  skills,
  className,
}) => {
  const componentName = "TeamCard";
  const controls = useAnimationControls();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        tension: 280,
        friction: 60
      }
    },
    hover: {
      y: -4,
      transition: {
        type: "spring",
        tension: 300,
        friction: 20 
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1, 
      transition: {
        delay: 0.2,
        type: "spring",
        tension: 200,
        friction: 12
      }
    }
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        tension: 280,
        friction: 60
      }
    }
  };

  const skillsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3
      }
    }
  };

  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        tension: 280,
        friction: 60
      }
    }
  };

  const renderContent = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={className}
    >
      <S.StyledTeamCard variant="accent" padding="lg">
        <S.Header $hasIcon={Boolean(icon)}>
          {icon && (
            <motion.div
              variants={iconVariants}
            >
              <S.IconWrapper>
                <span className="icon">{icon}</span>
              </S.IconWrapper>
            </motion.div>
          )}
          <div>
            <H2>{name}</H2>
            <Body color="secondary">{agent}</Body>
          </div>
        </S.Header>

        <S.Content>
          <div>
            <H3>Responsibilities</H3>
            <motion.ul variants={listVariants} initial="hidden" animate="visible">
              {responsibilities.map((responsibility, index) => (
                <motion.li key={index} variants={listItemVariants}>
                  <S.ListItemContent>
                    <Body>{responsibility}</Body>
                  </S.ListItemContent>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div>
            <H3>Skills</H3>
            <motion.div variants={skillsContainerVariants} initial="hidden" animate="visible">
              <S.SkillsContainer>
                {skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    variants={skillItemVariants}
                  >
                    <S.SkillItem>
                      {skill}
                    </S.SkillItem>
                  </motion.span>
                ))}
              </S.SkillsContainer>
            </motion.div>
          </div>
        </S.Content>
      </S.StyledTeamCard>
    </motion.div>
  );

  return (
    <AnimationErrorBoundary componentName={componentName}>
      <AnimationDebugger
        componentName={componentName}
        trackRenders={true}
        logLifecycle={true}
      >
        {renderContent()}
      </AnimationDebugger>
    </AnimationErrorBoundary>
  );
}; 