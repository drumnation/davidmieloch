import { ReactNode } from 'react';
import { MantineSize } from '@mantine/core';

export interface PageTemplateProps {
  children: ReactNode;
  withContainer?: boolean;
  containerSize?: MantineSize | (string & {});
  withAnimation?: boolean;
  animationKey?: string;
  title?: string;
  description?: string;
} 