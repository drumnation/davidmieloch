export const breakpoints = {
  xs: '320px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

export const media = {
  up: (size: keyof typeof breakpoints) => `@media (min-width: ${breakpoints[size]})`,
  down: (size: keyof typeof breakpoints) => `@media (max-width: ${breakpoints[size]})`,
}; 