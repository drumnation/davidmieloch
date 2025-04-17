'use client';

import styled from '@emotion/styled';
import { Container, Box } from '@mantine/core';

export const HomeContainer = styled(Container)`
  min-height: calc(100vh - 60px); /* Subtract header height */
  width: 100%;
  padding: 0;
  position: relative;
`;

export const FullWidthBackgroundWrapper = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  margin-left: calc(-50vw + 50%);
  z-index: -1;
  background-color: var(--background-dark); /* Use CSS variable instead of hard-coded color */
`; 