import React, { forwardRef } from 'react';
import Image from 'next/image';
import { Button, Group, Paper, PaperProps, Box } from '@mantine/core';
import styled from 'styled-components';

// Define the props interface, extending PaperProps and adding className
interface ProfileContainerProps extends PaperProps {
  className?: string;
}

// 1. Create a simple component that forwards the ref to Mantine Paper
const ForwardedPaper = forwardRef<HTMLDivElement, ProfileContainerProps>(({ className, ...rest }, ref) => (
  <Paper className={className} {...rest} ref={ref} />
));
ForwardedPaper.displayName = 'ForwardedPaper'; // Optional: for better debugging

// 2. Style the forwarded component
export const ProfileContainer = styled(Paper) <PaperProps & { className?: string; children?: React.ReactNode }>`
  padding: var(--mantine-spacing-xl);
  border-radius: var(--mantine-radius-md);
  box-shadow: var(--mantine-shadow-sm);
  background-color: var(--mantine-color-gray-0);
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const ProfileImageWrapper = styled.div`
  width: 120px;
  height: 120px;
  min-width: 120px;
  margin-bottom: var(--mantine-spacing-md);
  margin-right: 0;
  align-self: center;

  img {
    border-radius: 50%;
    object-fit: cover;
    width: 100%;
    height: 100%;
    border: 4px solid var(--mantine-color-blue-filled);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-right: var(--mantine-spacing-xl);
    margin-bottom: 0;
    align-self: flex-start;
    width: 150px;
    height: 150px;
    min-width: 150px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 180px;
    height: 180px;
    min-width: 180px;
  }
`;

export const ProfileName = styled.h1`
  font-size: var(--mantine-font-size-xl);
  font-weight: 700;
  margin-bottom: var(--mantine-spacing-xxs);
  color: var(--mantine-color-blue-filled);
  text-transform: uppercase;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: calc(var(--mantine-font-size-xl) * 1.4);
    font-weight: 800;
  }
`;

export const ProfileHeadline = styled.p`
  font-size: var(--mantine-font-size-lg);
  color: var(--mantine-color-text);
  margin-bottom: var(--mantine-spacing-md);
  font-style: italic;
`;

export const LinksContainer = styled(Group)`
  margin-top: auto;
  padding-top: var(--mantine-spacing-md);
`;

export const LinkButton = styled(Button)`
  && {
    padding-left: var(--mantine-spacing-xs);
    padding-right: var(--mantine-spacing-xs);

    .mantine-Button-label {
      display: flex;
      align-items: center;
    }

    svg {
      margin-right: var(--mantine-spacing-xs);
    }
  }
`;

export const ResumeButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  margin: var(--mantine-spacing-md);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    position: static;
    margin: var(--mantine-spacing-md) 0 0 0;
    width: 100%;
  }
`; 