import styled from 'styled-components';
import { Box, Text, Flex } from '@mantine/core';

export const CapabilityCardContainer = styled(Box)`
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

export const IconWrapper = styled(Flex)`
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.primary.main};
  font-size: 2rem;
  align-items: center;
  justify-content: center;
`;

export const CardTitle = styled(Text)`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text.primary};
`;

export const CardDescription = styled(Text)`
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${props => props.theme.colors.text.secondary};
`; 