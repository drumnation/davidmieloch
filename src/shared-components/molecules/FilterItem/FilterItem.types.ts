export interface FilterItemProps {
  label: string;
  value: string;
  count?: number;
  isSelected?: boolean;
  onClick?: (value: string) => void;
  variant?: 'language' | 'topic' | 'type';
} 