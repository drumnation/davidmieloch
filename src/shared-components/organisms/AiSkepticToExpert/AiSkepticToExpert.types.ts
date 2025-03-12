import { HeroProps } from '../Hero';
import { QuoteGridProps } from '../QuoteGrid';
import { ProblemSolutionCardProps } from '../ProblemSolutionCard';

export interface AiSkepticToExpertProps {
  /**
   * Optional className for styling
   */
  className?: string;

  /**
   * Props for the Hero component
   */
  heroProps: HeroProps;

  /**
   * Props for the QuoteGrid component
   */
  quotesProps: QuoteGridProps;

  /**
   * Props for the ProblemSolutionCards
   */
  problemSolutionCardsProps: {
    cards: Array<ProblemSolutionCardProps>;
  };
} 