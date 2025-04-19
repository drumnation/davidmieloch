import React from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { MantineTheme, useMantineTheme } from '@mantine/core';
import { SideProjectsSectionWeb } from './SideProjectsSection.web';
import { SideProjectsSectionMobile } from './SideProjectsSection.mobile';
import { SideProjectsSectionProps } from './SideProjectsSection.types';

/**
 * Main SideProjectsSection component.
 * Conditionally renders Web or Mobile version based on screen size.
 */
export const SideProjectsSection: React.FC<SideProjectsSectionProps> = (props) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  // Conditionally render the appropriate component, passing all props
  if (isMobile) {
    return <SideProjectsSectionMobile {...props} />;
  }

  return <SideProjectsSectionWeb {...props} />;
};

export default SideProjectsSection; 