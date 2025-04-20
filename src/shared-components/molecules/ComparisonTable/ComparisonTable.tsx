import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';
import { ComparisonTableProps } from './ComparisonTable.types';
import * as S from './ComparisonTable.styles';
import { ComparisonTableMobile } from './ComparisonTable.mobile';
import { ComparisonTableDesktop } from './ComparisonTable.desktop';

// Replace framer-motion with CSS transitions
export const ComparisonTable: React.FC<ComparisonTableProps> = (props) => {
  const theme = useMantineTheme();
  // Use the 'sm' breakpoint defined in the Mantine theme to switch between mobile and desktop
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-100px",
    threshold: 0.1
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  // Conditionally render the mobile or desktop version based on screen size
  return isMobile ? <ComparisonTableMobile {...props} /> : <ComparisonTableDesktop {...props} />;
};
