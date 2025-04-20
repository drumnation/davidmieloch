import styled, { css } from 'styled-components';

export const HeaderContainer = styled.div<{ $isMobileLayout?: boolean }>`
  display: flex;
  /* Align items vertically center */
  align-items: center; 
  justify-content: space-between;
  gap: 16px; // Gap between logo column and content column
  padding: 12px 16px; // Consistent padding
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem; // Spacing below header

  ${({ $isMobileLayout }) =>
    $isMobileLayout &&
    css`
      flex-direction: column;
      align-items: flex-start; // Changed from center to flex-start
      text-align: left; // Ensure text is left-aligned
      gap: 8px;
      padding: 16px 8px 12px; // Adjust padding for mobile
    `}
`;

export const LeftColumn = styled.div<{ $isMobileLayout?: boolean }>`
  flex-shrink: 0; // Prevent logo from shrinking
  ${({ $isMobileLayout }) =>
    $isMobileLayout &&
    css`
      margin-bottom: 8px; // Space below logo on mobile
      align-self: flex-start; // Ensure logo aligns left
    `}
`;

export const ContentColumn = styled.div<{ $isMobileLayout?: boolean }>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 0; // Prevent content overflow issues

  ${({ $isMobileLayout }) =>
    $isMobileLayout &&
    css`
      align-items: flex-start; // Changed from center to flex-start
      width: 100%;
    `}
`;

export const TitleRow = styled.div`
    display: flex;
    justify-content: space-between; // Pushes accessory to the right
    align-items: flex-start; // Align title and accessory top
    width: 100%;
    gap: 16px; // Gap between title and accessory
`;

export const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 4px 0; // Space below title
  color: rgba(0, 0, 0, 0.9);
  line-height: 1.3;
  flex-grow: 1; // Allow title to take available space
`;

export const AccessoryContainer = styled.div`
  flex-shrink: 0; // Prevent accessory from shrinking
  /* Add specific alignment if needed, e.g., align-self: flex-start; */
`;

export const MetadataContainer = styled.div<{ $isMobileLayout?: boolean }>`
  display: flex;
  flex-direction: column; // Stack metadata lines
  gap: 4px; // Space between metadata lines
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.7);
  line-height: 1.4;

  ${({ $isMobileLayout }) =>
    $isMobileLayout &&
    css`
      align-items: flex-start; // Changed from center to flex-start
    `}
`;

export const MetadataLine = styled.div`
  /* Style individual metadata lines if needed */
  /* For example, adding icons */
  display: flex;
  align-items: center;
  gap: 0.3rem;

  a {
      color: inherit; // Inherit color for links within metadata
      text-decoration: none;
      &:hover {
        text-decoration: underline;
        color: #0073b1;
      }
  }
`; 