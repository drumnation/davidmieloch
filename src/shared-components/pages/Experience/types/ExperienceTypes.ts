export interface Experience {
  profile: ProfileSummary;
  employmentHistory: Job[];
  skills: SkillCategory[];
  educationHistory: Education[];
  projects: Project[];
  recommendations: Testimonial[];
  awards: Award[];
}

export interface ProfileSummary {
  name: string;
  title: string;
  location: string;
  summary: string;
  profileImage: string;
  contact?: {
    email?: string;
    phone?: string;
    website?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export interface Job {
  id: string;
  company: string;
  title: string;
  startDate: string; // ISO format date string
  endDate: string | null; // ISO format date string or null for current positions
  description: string;
  achievements: string[];
  logo?: string;
  companyUrl?: string;
  location?: string;
  technologies?: string[];
  isCurrentRole?: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

export interface Skill {
  id: string;
  name: string;
  rating: number; // 1-5
  endorsements: number;
  yearsOfExperience?: number;
  isCertified?: boolean;
  certificationUrl?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string; // ISO format date string
  endDate: string; // ISO format date string
  courses: string[];
  achievements: string[];
  logo?: string;
  gpa?: string;
  location?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string; // ISO format date string
  endDate: string | null; // ISO format date string or null for ongoing projects
  technologies: string[];
  link?: string;
  image?: string;
  company?: string;
  role?: string;
  outcomes?: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  relationship: string;
  content: string;
  date: string; // ISO format date string
  authorImage?: string;
  authorTitle?: string;
  authorCompany?: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string; // ISO format date string
  description: string;
  image?: string;
  url?: string;
}

// Props interfaces for components
export interface ExperiencePageProps {
  data?: Experience;
  className?: string;
}

export interface EmploymentHistoryProps {
  jobs: Job[];
  className?: string;
}

export interface JobEntryProps {
  job: Job;
  className?: string;
}

export interface SkillsEndorsementsProps {
  skillCategories: SkillCategory[];
  className?: string;
}

export interface EducationHistoryProps {
  education: Education[];
  className?: string;
}

export interface ProjectsProps {
  projects: Project[];
  className?: string;
}

export interface RecommendationsProps {
  recommendations: Testimonial[];
  className?: string;
}

export interface AwardsProps {
  awards: Award[];
  className?: string;
} 