import { HeroProps } from '@shared-components/organisms/Hero';
import { IconType } from 'react-icons';

export interface PersonaNavItem {
  title: string;
  icon: React.ReactNode;
  description: string;
  link: string;
}

export interface CharacteristicCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface CTALinkProps {
  /**
   * The URL the link should navigate to
   */
  href: string;

  /**
   * The text to display in the link
   * @deprecated Use label instead
   */
  text?: string;

  /**
   * The text to display in the link
   */
  label?: string;

  /**
   * The visual style of the link
   */
  variant: 'primary' | 'secondary' | 'text';

  /**
   * Icon type to display with the link
   */
  iconType?: string;

  /**
   * Optional custom React node to use as the icon.
   * If provided, this overrides iconType.
   */
  iconNode?: React.ReactNode;

  /**
   * Optional background color for the icon wrapper.
   */
  iconBackground?: string;

  /**
   * Size of the button
   */
  size?: 'sm' | 'md' | 'lg';
}

export interface MetaData {
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
}

export interface HomePageProps {
  heroProps?: HeroProps;
  personaNavData?: PersonaNavItem[];
  metaData?: MetaData;
  launchArticles?: HomeArticleTeaser[];
  onReady?: () => void;
}

export interface HomeArticleTeaser {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  series?: string;
  coverImage?: string;
}
