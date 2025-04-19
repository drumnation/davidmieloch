// Styles specific to GroupDisplay, if any
import styled from 'styled-components';

// Note: The main MediaGroup styled component is defined in ExperienceSection.styles
// This file is for any *additional* styles needed only by GroupDisplay 

// --- Styles moved from ExperienceSection.logic.tsx ---

export const GroupTitleWrapper = styled.div`
  width: 100%;
  padding: 10px 15px;
  font-size: 1rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.75);
  background-color: #edf2f7;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
`;

// --- End Moved Styles ---

// --- Add missing reused style ---
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