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
  hover: {
    y: -8,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    }
  }
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
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    }
  }
};

const contentVariants = {
  hover: {
    y: -5,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    }
  }
};

const arrowVariants = {
  rest: { x: 0 },
  hover: { 
    x: 8, 
    transition: { 
      duration: 0.2,
      ease: 'easeOut',
    } 
  },
};

export const NavigationCard: React.FC<NavigationCardProps> = ({
  title,
  description,
  action,
  link,
  icon,
  style = 'accent-card',
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
      whileHover="hover"
      className={className}
      onClick={handleClick}
      style={{ height: '100%', width: '100%', display: 'flex' }}
    >
      <S.StyledNavigationCard
        variant={style === 'gradient-card' ? 'gradient' : 'accent'}
        padding="lg"
      >
        {icon && (
          <S.IconContainer 
            variants={iconVariants} 
            $style={style}
          >
            <span className="icon">{icon}</span>
          </S.IconContainer>
        )}
        <motion.div 
          variants={contentVariants} 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem', 
            flex: 1 
          }}
        >
          <H3 color={style === 'gradient-card' ? 'light' : 'primary'}>{title}</H3>
          <S.Description color={style === 'gradient-card' ? 'light' : 'secondary'}>
            {description}
          </S.Description>
        </motion.div>
        <S.ActionContainer>
          <Body color={style === 'gradient-card' ? 'light' : 'primary'} weight="medium">
            {action}
          </Body>
          <motion.div variants={arrowVariants}>
            <S.Arrow>→</S.Arrow>
          </motion.div>
        </S.ActionContainer>
      </S.StyledNavigationCard>
    </motion.div>
  );
}; 