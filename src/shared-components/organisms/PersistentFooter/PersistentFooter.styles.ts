import styled from '@emotion/styled';

export const PersistentFooterContainer = styled.div`
  display: contents;

  /* Hide when printing */
  @media print {
    display: none;
  }
`; 