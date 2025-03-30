import { ReactNode } from 'react';

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  color: string;
  skills: Skill[];
}

export interface SkillsSectionProps {
  skillCategories: SkillCategory[];
  title?: string;
  className?: string;
  children?: ReactNode;
  renderIcon?: (iconName: string, color: string) => ReactNode;
} 