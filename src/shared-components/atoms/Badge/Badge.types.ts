export interface BadgeProps {
  count: number;
  label?: string;
  variant?: 'stars' | 'forks' | 'issues' | 'prs' | 'default';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
} 