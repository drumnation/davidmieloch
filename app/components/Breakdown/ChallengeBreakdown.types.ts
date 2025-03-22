export interface Challenge {
  id: string;
  name: string;
  description: string;
  value: number;
  trend: number;
}

export interface ChallengeBreakdownProps {
  title: string;
  description: string;
  challenges: Challenge[];
} 