import styled from 'styled-components';

export const ProfileContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 24px;
`;

export const ProfileDetails = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ProfileImageWrapper = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid white;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15);
  margin-right: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 576px) {
    width: 160px;
    height: 160px;
    margin: 0 auto 16px auto;
  }
`;

export const ProfileName = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #191919;
`;

export const ProfileHeadline = styled.h2`
  font-size: 1.1rem;
  font-weight: 400;
  color: #0073b1;
  margin-bottom: 16px;
`;

export const ProfileActionsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  
  @media (max-width: 576px) {
    flex-wrap: wrap;
  }
`;

export const ProfileSummary = styled.p`
  color: rgba(0, 0, 0, 0.8);
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 0;
`;

export const ProfileButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 16px;
  border-radius: 24px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &.primary {
    background-color: #0a66c2;
    color: white;
    
    &:hover {
      background-color: #004182;
    }
  }
  
  &.secondary {
    background-color: white;
    color: rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(0, 0, 0, 0.6);
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
      color: rgba(0, 0, 0, 0.9);
    }
  }
`;

export const ResumeButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const ResumeButton = styled.a`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #3366cc;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  
  svg {
    margin-right: 10px;
  }
  
  &:hover {
    background-color: #2952a3;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 576px) {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
`; 