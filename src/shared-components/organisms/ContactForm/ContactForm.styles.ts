import styled from 'styled-components';
import { Card, Stack, Container, Input, Group, Button, Notification, Title } from '@mantine/core';

export const StyledContainer = styled(Container).attrs({ as: Container })`
  margin-bottom: 100px;
`;

export const StyledCard = styled(Card).attrs({ as: Card })`
  padding: var(--mantine-spacing-lg);
  border-radius: var(--mantine-radius-md);
`;

export const DashedStack = styled(Stack).attrs({ as: Stack })`
  margin-top: var(--mantine-spacing-lg);
  padding: var(--mantine-spacing-lg);
  border: 1px dashed var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-md);
  background: var(--mantine-color-gray-0);
`;

export const StyledInput = styled(Input)`
  & input {
    background-color: #fff;
    color: #000;
    border-color: #ccc;
  }
`;

export const StyledTextarea = styled(Input)`
  & textarea {
    background-color: #fff;
    color: #000;
    border-color: #ccc;
  }
`; 