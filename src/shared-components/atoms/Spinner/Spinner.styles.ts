import styled, { keyframes, DefaultTheme } from 'styled-components';
import { SpinnerSize } from './Spinner.types';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const getSizeStyles = (size: SpinnerSize) => {
  switch (size) {
    case 'small':
      return {
        width: '16px',
        height: '16px',
        borderWidth: '2px',
      };
    case 'large':
      return {
        width: '40px',
        height: '40px',
        borderWidth: '4px',
      };
    case 'medium':
    default:
      return {
        width: '24px',
        height: '24px',
        borderWidth: '3px',
      };
  }
};

interface ThemeProps {
  theme: DefaultTheme;
}

interface ColorThemeProps extends ThemeProps {
  $color?: string;
}

export const SpinnerContainer = styled.div<{
  $size: SpinnerSize;
  $color?: string;
}>`
  ${({ $size }) => {
    const { width, height, borderWidth } = getSizeStyles($size);
    return `
      width: ${width};
      height: ${height};
      border: ${borderWidth} solid ${({ theme }: ThemeProps) => theme.colors.background.light};
      border-top: ${borderWidth} solid ${({ $color, theme }: ColorThemeProps) => $color || theme.colors.primary.main};
    `;
  }}
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  display: inline-block;
`; 