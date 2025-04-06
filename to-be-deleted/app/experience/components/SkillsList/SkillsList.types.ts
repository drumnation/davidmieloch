export interface Skill {
  name: string;
  icon?: string;
  color?: string;
}

export interface SkillsListProps {
  skills: Array<string | Skill>;
  showIcons?: boolean;
} 