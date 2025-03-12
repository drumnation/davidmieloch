export interface Metric {
  number: string;
  label: string;
  prefix?: string;
  suffix?: string;
  animation?: 'count-up' | 'fade-in';
}

export interface ProblemOverviewProps {
  title: string;
  description: string;
  metrics: Metric[];
  style?: 'gradient-card' | 'accent-card';
  position?: 'left' | 'right' | 'full-width';
  animation?: 'fade-up' | 'slide-in' | 'none';
  background?: 'light' | 'dark' | 'gradient';
  className?: string;
} 