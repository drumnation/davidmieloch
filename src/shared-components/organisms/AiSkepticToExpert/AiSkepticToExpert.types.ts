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
   * Optional since default values are provided in the component
   */
  heroProps?: HeroProps;

  /**
   * Props for the QuoteGrid component
   * Optional since default values are provided in the component
   */
  quotesProps?: QuoteGridProps;

  /**
   * Props for the ProblemSolutionCards
   * Optional since default values are provided in the component
   */
  problemSolutionCardsProps?: {
    cards: Array<ProblemSolutionCardProps>;
  };
} 