export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  'aria-label'?: string;
}

export interface SearchIconProps {
  size?: number;
  color?: string;
} 