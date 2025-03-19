import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ConclusionContainer = styled(motion.div)`
  width: 100%;
  margin-top: 3rem;
`;

export const ConclusionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ConclusionText = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`; 