import styled from 'styled-components';
import { motion } from 'framer-motion';

export const DetailedContentContainer = styled(motion.div)`
  width: 100%;
  margin: 2rem 0 4rem;
`;

export const DetailedContentTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const DetailedContentText = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const DetailedContentList = styled.div`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`; 