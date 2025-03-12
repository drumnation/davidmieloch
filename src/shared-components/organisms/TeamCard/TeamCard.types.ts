export interface TeamCardProps {
  name: string;
  agent: string;
  icon: string;
  responsibilities: string[];
  skills: string[];
  className?: string;
}

export interface StyledTeamCardProps {
  $hasIcon: boolean;
} 