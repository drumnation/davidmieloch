import React from 'react';
import { motion } from 'framer-motion';
import { TeamCardProps } from './TeamCard.types';
import { H2, H3, Body } from '../../atoms/Typography/Typography';
import * as S from './TeamCard.styles';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

export const TeamCard: React.FC<TeamCardProps> = ({
  name,
  agent,
  icon,
  responsibilities,
  skills,
  className,
}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4 }}
    >
      <S.StyledTeamCard variant="accent" padding="lg" className={className}>
        <S.Header $hasIcon={Boolean(icon)}>
          {icon && (
            <S.IconWrapper
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
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
            <S.List variants={listVariants} initial="hidden" animate="visible">
              {responsibilities.map((responsibility, index) => (
                <S.ListItem key={index} variants={itemVariants}>
                  <Body>{responsibility}</Body>
                </S.ListItem>
              ))}
            </S.List>
          </div>

          <div>
            <H3>Skills</H3>
            <S.SkillsContainer>
              {skills.map((skill, index) => (
                <S.Skill
                  key={index}
                  variants={skillVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.05 }}
                >
                  {skill}
                </S.Skill>
              ))}
            </S.SkillsContainer>
          </div>
        </S.Content>
      </S.StyledTeamCard>
    </motion.div>
  );
}; 