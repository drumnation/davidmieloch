import { InputBaseProps } from '@mantine/core';

export interface FormFieldProps extends InputBaseProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
}
