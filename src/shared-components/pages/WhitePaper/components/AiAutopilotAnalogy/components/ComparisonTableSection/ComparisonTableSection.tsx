import React from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';
import { ComparisonTableSectionMobile } from './ComparisonTableSection.mobile';
import { ComparisonTableSectionDesktop } from './ComparisonTableSection.desktop';

// Define props here to be shared by both mobile and desktop versions
interface ComparisonTableSectionProps {
  leftTitle: string;
  rightTitle: string;
  items: Array<{
    category: string;
    leftContent: string;
    rightContent: string;
  }>;
  className?: string;
}

// This is the main wrapper component
export const ComparisonTableSection: React.FC<ComparisonTableSectionProps> = (props) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  // Render mobile or desktop section based on screen size
  return isMobile ? <ComparisonTableSectionMobile {...props} /> : <ComparisonTableSectionDesktop {...props} />;
}; 