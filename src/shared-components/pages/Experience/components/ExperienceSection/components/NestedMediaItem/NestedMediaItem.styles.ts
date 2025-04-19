// This file can be used for specific styles related to NestedMediaItem if needed.
// For now, it might be empty or import/re-export from the parent styles.
import styled from 'styled-components';

// Example: If NestedMediaItem needed unique styles
// export const UniqueNestedStyle = styled.div`
//   color: red;
// `; 

// --- Styles moved from ExperienceSection.logic.tsx ---

export const NestedMediaItemWrapper = styled.div<{ $isLast: boolean }>`
  border-radius: 0;
  overflow: hidden;
  box-shadow: none;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  border-bottom: ${({ $isLast }) => $isLast ? 'none' : '1px solid rgba(0, 0, 0, 0.08)'};
`;

// NestedMediaImageStyle is an object, move to utils or use inline

export const NestedMediaTitleWrapper = styled.div<{ $isLast: boolean }>`
  padding: 10px 12px;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: #f9f9f9;
  border-top: 1px solid #eee;
  border-bottom: ${({ $isLast }) => $isLast ? 'none' : '1px solid rgba(0, 0, 0, 0.08)'};
  display: flex;
  align-items: center;
`;

export const NestedMediaDescriptionWrapper = styled.div`
  padding: 6px 12px;
  font-size: 0.85rem;
  color: rgba(0,0,0,0.6);
`;

// Reused from ImageDisplay or define locally if needed
export const TitleLogoImage = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  margin-right: 8px;
  overflow: visible;
  display: flex; 
  align-items: center;
  justify-content: center;
`;

// --- End Moved Styles --- 