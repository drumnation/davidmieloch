export interface PersonaNavItem {
  title: string;
  icon: string;
  description: string;
  link: string;
}

export interface CharacteristicCardProps {
  icon: string;
  title: string;
  description: string;
}

export interface CTALinkProps {
  href: string;
  text: string;
  variant: 'primary' | 'secondary';
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