export interface PrivateWork {
  title: string;
  company: string;
  description: string;
  technologies: string[];
  achievements: string[];
  period: string;
}

export interface PrivateWorkSectionProps {
  works: PrivateWork[];
  title?: string;
  subtitle?: string;
} 