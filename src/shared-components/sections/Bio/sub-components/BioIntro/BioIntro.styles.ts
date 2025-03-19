import styled from 'styled-components';
import { motion } from 'framer-motion';

export const HeadingWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1rem;
  
  h3 {
    margin: 0;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: ${({ theme }) => theme.colors.primary.main};
  }
`; 