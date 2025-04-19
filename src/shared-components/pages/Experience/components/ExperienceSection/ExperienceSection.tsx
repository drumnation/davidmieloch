import React from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { MantineTheme, useMantineTheme } from '@mantine/core';

import { ExperienceSectionProps } from './ExperienceSection.types';
import { ExperienceSectionMobile } from './ExperienceSection.mobile';
import { ExperienceSectionWeb } from './ExperienceSection.web';

export const ExperienceSection: React.FC<ExperienceSectionProps> = (props) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return isMobile ? <ExperienceSectionMobile {...props} /> : <ExperienceSectionWeb {...props} />;
};