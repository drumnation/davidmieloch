/**
 * Resume Data Utility
 * 
 * Retrieves and formats resume data from the project's data files.
 */

import profileData from '../../../data/profile.json';
import skillsData from '../../../data/skills.json';
import skillsWithCategoriesData from '../../../data/skillsWithCategories.json';
import positionsData from '../../../data/positions.json';
import educationData from '../../../data/education.json';

/**
 * Structured resume data for the Perfect Fit Analyzer
 */
export interface ResumeData {
  profile: {
    name: string;
    title: string;
    summary: string;
    contact?: {
      email?: string;
      phone?: string;
      location?: string;
    };
  };
  skills: {
    categories: { [key: string]: string[] };
    topSkills: string[];
    allSkills: string[];
  };
  experience: {
    company: string;
    title: string;
    period: string;
    description: string;
    highlights?: string[];
  }[];
  education: {
    school: string;
    degree: string;
    fieldOfStudy: string;
    period: string;
    description?: string;
  }[];
}

/**
 * Fetches and formats resume data from data files
 * @returns Formatted resume data
 */
export async function getResumeData(): Promise<ResumeData> {
  // Process skills data
  const topSkills = skillsData.slice(0, 15);
  const allSkills = skillsData;
  
  // Create skills categories
  const skillCategories: { [key: string]: string[] } = {};
  skillsWithCategoriesData.forEach(category => {
    // Extract just the names from skill objects
    const skillNames = category.skills.map(skill => skill.name);
    skillCategories[category.category] = skillNames;
  });
  
  // Process positions/experience data
  const experience = positionsData.map(position => ({
    company: position.company,
    title: position.title,
    period: `${position.startDate} - ${position.endDate || 'Present'}`,
    description: position.description,
    highlights: position.bulletPoints && position.bulletPoints.length > 0 
      ? position.bulletPoints 
      : undefined
  }));
  
  // Process education data
  const education = educationData.map(edu => ({
    school: edu.school,
    degree: edu.degree,
    fieldOfStudy: edu.fieldOfStudy,
    period: `${edu.startDate} - ${edu.endDate || 'Present'}`,
    description: edu.description
  }));
  
  // Build and return the complete resume data
  return {
    profile: {
      name: profileData.fullName,
      title: profileData.headline,
      summary: profileData.summary,
      contact: {
        location: profileData.location
      }
    },
    skills: {
      categories: skillCategories,
      topSkills,
      allSkills
    },
    experience,
    education
  };
} 