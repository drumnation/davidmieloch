import React from 'react';
import { motion } from 'framer-motion';
import { NavigationCardProps } from './NavigationCard.types';
import { H3, Body } from '../../atoms/Typography/Typography';
import * as S from './NavigationCard.styles';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const iconVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      delay: 0.2,
    },
  },
};

const arrowVariants = {
  rest: { x: 0 },
  hover: { x: 8, transition: { duration: 0.2 } },
};

export const NavigationCard: React.FC<NavigationCardProps> = ({
  title,
  description,
  action,
  link,
  icon,
  style = 'accent-card',
  animation = 'fade-up',
  className,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (link) {
      window.location.href = link;
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
      onClick={handleClick}
    >
      <S.StyledNavigationCard
        variant={style === 'gradient-card' ? 'gradient' : 'accent'}
        padding="lg"
      >
        {icon && (
          <S.IconContainer variants={iconVariants} $style={style}>
            <span className="icon">{icon}</span>
          </S.IconContainer>
        )}
        <S.Content>
          <H3 color={style === 'gradient-card' ? 'light' : 'primary'}>{title}</H3>
          <S.Description color={style === 'gradient-card' ? 'light' : 'secondary'}>
            {description}
          </S.Description>
        </S.Content>
        <S.ActionContainer>
          <Body color={style === 'gradient-card' ? 'light' : 'primary'} weight="medium">
            {action}
          </Body>
          <motion.div initial="rest" whileHover="hover" animate="rest">
            <S.Arrow variants={arrowVariants}>→</S.Arrow>
          </motion.div>
        </S.ActionContainer>
      </S.StyledNavigationCard>
    </motion.div>
  );
}; 