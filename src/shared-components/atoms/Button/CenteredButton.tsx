'use client';

import React from 'react';
import { Button } from './Button';
import { ButtonProps } from './Button.types';
import styled from 'styled-components';

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export interface CenteredButtonProps extends ButtonProps {}

export const CenteredButton: React.FC<CenteredButtonProps> = (props) => {
  return (
    <CenterWrapper>
      <Button {...props} />
    </CenterWrapper>
  );
}; 