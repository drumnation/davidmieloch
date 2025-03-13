import { ReactElement } from 'react';

export interface SystemOverviewSectionProps {
  className?: string;
  introProps: {
    text: string;
    icon?: string | ReactElement;
  };
}