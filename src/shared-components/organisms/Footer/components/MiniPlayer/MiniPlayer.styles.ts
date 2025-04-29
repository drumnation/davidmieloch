import styled from 'styled-components';
import { rem } from '@mantine/core';

export const MiniPlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

export const MiniPlayerTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: ${rem(8)};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: ${rem(8)};
  }
`;

export const MiniPlayerArtworkMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${rem(8)};
  min-width: 0;
`;

export const MiniPlayerMetadata = styled.div`
  overflow: hidden;
  min-width: 0;
`;

export const MiniPlayerChevron = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${rem(8)};
`;

export const MiniPlayerProgressBar = styled.div`
  width: 100%;
  margin-top: ${rem(4)};
  display: flex;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 0;
    margin-left: ${rem(16)};
    width: auto;
    flex: 1 1 0%;
    max-width: none;
  }
`; 