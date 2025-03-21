export interface Technology {
  name: string;
  icon?: React.ReactNode;
}

export interface PrivateWorkCardProps {
  title: string;
  description: string;
  company: string;
  period: string;
  technologies: Technology[];
  achievements?: string[];
  role?: string;
  imageUrl?: string;
} 