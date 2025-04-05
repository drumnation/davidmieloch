import React from 'react';
import { LanguageDotProps } from './LanguageDot.types';
import { Container, Dot, LanguageName } from './LanguageDot.styles';
import { getLanguageColor } from './LanguageDot.logic';

export const LanguageDot: React.FC<LanguageDotProps> = ({
  language,
  size = 'md',
  showName = true,
  className,
}) => {
  const color = getLanguageColor(language);

  return (
    <Container className={className} data-show-name={showName}>
      <Dot color={color} size={size} />
      {showName && <LanguageName>{language}</LanguageName>}
    </Container>
  );
}; 