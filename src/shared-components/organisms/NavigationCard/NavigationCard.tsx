import React from 'react';
import { Typography } from '../../atoms/Typography/Typography';
import { Icon } from '../../atoms/Icon';
import { NavigationCardProps } from './NavigationCard.types';
import * as S from './NavigationCard.styles';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const NavigationCard: React.FC<NavigationCardProps> = ({
  content,
  style = 'gradient-card',
  className,
}) => {
  if (!content) {
    return null;
  }

  const { text = '', action = '', link = '#', icon = '' } = content;

  return (
    <S.Container className={className}>
      <S.Card 
        $style={style}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <S.CardContent>
          <Typography variant="h3" className="mb-3">
            {text}
          </Typography>
          
          <S.ActionLink href={link}>
            {action}
            {icon && (
              <S.IconWrapper>
                <Icon name={icon} size={20} />
              </S.IconWrapper>
            )}
          </S.ActionLink>
        </S.CardContent>
      </S.Card>
    </S.Container>
  );
}; 