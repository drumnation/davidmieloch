import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { AnimationVariants } from '../../../utils/animations/migration-helpers';

// Global styles for the Experience component
export const GlobalStyles = createGlobalStyle`
  .experience-content-section {
    width: 100%;
    background-color: #fff;
    padding-top: 2rem;
    padding-bottom: 5rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    
    @media (max-width: 576px) {
      padding-top: 1.5rem;
      padding-bottom: 3.75rem;
    }
  }
  
  .experience-content-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    
    @media (max-width: 576px) {
      padding: 0 1rem;
    }
  }

  .media-carousel {
    margin: 1.5rem 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

// Animation variants
export const fadeInUp: AnimationVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const fadeIn: AnimationVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export const staggerContainer: AnimationVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Main container
export const ExperienceContainer = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
  overflow: hidden;
  background-color: #f3f2ef;
  min-height: 100vh;
  padding-top: 80px; // Account for header
`;

// Profile header styles
export const ProfileHeader = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 24px;
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

export const ProfileImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid white;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15);
  margin-right: 24px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 576px) {
    width: 160px;
    height: 160px;
    margin: 0 auto 16px auto;
  }
`;

export const ProfileActions = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  
  @media (max-width: 576px) {
    flex-wrap: wrap;
  }
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

export const ProfileSummary = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  margin-bottom: 16px;
`;

export const ProfileDetails = styled.div`
  display: flex;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Section containers
export const SectionContainer = styled.section`
  margin-bottom: 24px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  padding: 24px;
  
  h2 {
    font-size: 1.25rem;
    margin-bottom: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9);
  }
`;

// Experience items
export const ExperienceItem = styled.div`
  display: flex;
  margin-bottom: 24px;
  position: relative;
  align-items: flex-start;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

export const CompanyLogo = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 16px;
  flex-shrink: 0;
  padding: 2px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  @media (max-width: 576px) {
    margin-bottom: 12px;
  }
`;

export const ExperienceContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 2px;
`;

export const ExperienceTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: rgba(0, 0, 0, 0.9);
`;

export const ExperienceMetadataRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 8px;
`;

export const ExperienceCompany = styled.h4`
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
  color: rgba(0, 0, 0, 0.9);
`;

export const ExperienceDates = styled.p`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
  &:before {
    content: "•";
    margin-right: 4px;
  }
`;

export const ExperienceLocation = styled.p`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
  &:before {
    content: "•";
    margin-right: 4px;
  }
`;

export const ExperienceDescription = styled.div`
  font-size: 0.9rem;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  
  ul {
    margin-top: 8px;
    padding-left: 20px;
    
    li {
      margin-bottom: 4px;
    }
  }
`;

// Skills display
export const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SkillsCategoryColumn = styled.div`
  flex: 1;
  min-width: 250px;
`;

export const SkillsCategoryTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 12px;
  padding-bottom: 4px;
  border-bottom: 2px solid;
`;

export const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
  
  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const SkillTag = styled.div`
  background-color: #f3f2ef;
  color: rgba(0, 0, 0, 0.9);
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  
  &:hover {
    background-color: #e6e5e4;
  }
`;

// Education items
export const EducationItem = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: flex-start;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

export const SchoolLogo = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 16px;
  flex-shrink: 0;
  padding: 2px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  @media (max-width: 576px) {
    margin-bottom: 12px;
  }
`;

export const EducationContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 2px;
`;

export const EducationSchool = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: rgba(0, 0, 0, 0.9);
`;

export const EducationDegree = styled.h4`
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 4px;
  color: rgba(0, 0, 0, 0.9);
`;

export const EducationDates = styled.p`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 8px;
`;

export const EducationDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  margin-bottom: 16px;
`;

export const MediaContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 16px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  
  iframe, img {
    display: block;
    width: 100%;
  }
`;