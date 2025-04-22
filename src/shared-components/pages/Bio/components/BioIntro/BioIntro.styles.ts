import styled from 'styled-components';
import { MantineTheme } from '@mantine/core';

export const HeadingWrapper = styled.div`
  margin-bottom: 1rem;
  
  h2 {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.colors[theme.primaryColor][6]};
    margin-bottom: 0.5rem;
  }
  
  h3 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.gray[6]};
    font-weight: 500;
    line-height: 1.3;
  }
`;

export const BioTextContent = styled.div`
  color: ${({ theme }) => theme.colors.gray[7]};
  font-size: 1.125rem;
  line-height: 1.8;
  
  h3 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors[theme.primaryColor][6]};
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  
  p {
    margin-bottom: 1.5rem;
    opacity: 1;
  }
`;
