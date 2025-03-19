import React from 'react';
import { Preview } from '@storybook/react';
import { motion } from 'framer-motion';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../../../styles/theme';

// Wrapper with animation context for Bio section components
const BioSectionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <motion.div
        initial="hidden"
        animate="visible"
        style={{
          backgroundColor: '#ffffff',
          padding: '2rem',
          borderRadius: '8px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {children}
      </motion.div>
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [
    (Story) => (
      <BioSectionWrapper>
        <Story />
      </BioSectionWrapper>
    ),
  ],
};

export default preview; 