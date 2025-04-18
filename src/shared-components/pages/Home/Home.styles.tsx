'use client';

import styled from '@emotion/styled';
import { Container, Box } from '@mantine/core';

export const HomeContainer = styled(Container)`
  min-height: calc(100vh - 60px); /* Subtract header height */
  width: 100%;
  padding: 0;
  position: relative;

  // Add side shadows using pseudo-elements on wider screens
  @media (min-width: 75em) { // Using Mantine's default lg breakpoint (1200px)
    &::before, 
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      width: 50px; // Width of the shadow effect
      pointer-events: none; // Ensure they don't interfere with interaction
    }

    &::before {
      left: 0;
      transform: translateX(-100%);
      background: linear-gradient(to left, rgba(0, 0, 0, 0.08), transparent);
    }

    &::after {
      right: 0;
      transform: translateX(100%);
      background: linear-gradient(to right, rgba(0, 0, 0, 0.08), transparent);
    }
  }
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