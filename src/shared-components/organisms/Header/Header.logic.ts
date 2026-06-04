import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandMedium,
  IconArticle,
  IconBuildingFactory,
  IconCode,
  IconMessageCircle,
  IconUser
} from '@tabler/icons-react';
import { NavLink, SocialLink } from './Header.types';

export const navLinks: NavLink[] = [
  // { label: 'Home', href: '/' },
  { label: 'Factory', href: '/blog/the-factory', icon: IconBuildingFactory },
  { label: 'Writing', href: '/blog', icon: IconArticle },
  { label: 'Biography', href: '/bio', icon: IconUser },
  { label: 'Code', href: '/code-examples', icon: IconCode },
  { label: 'Let\'s Connect', href: '/contact', icon: IconMessageCircle },
];

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', icon: IconBrandGithub, url: 'https://github.com/davidmieloch' },
  { name: 'LinkedIn', icon: IconBrandLinkedin, url: 'https://linkedin.com/in/davidmieloch' },
  { name: 'Medium', icon: IconBrandMedium, url: 'https://medium.com/@davidmieloch' }
];

export const getIsActive = (pathname: string, href: string): boolean => {
  if (!pathname) return false;
  if (href === '/' && pathname === '/') return true;
  if (href !== '/' && pathname.startsWith(href)) {
    if (pathname === href) return true;
    if (pathname.startsWith(`${href}/`)) return true;
    return false;
  }
  return false;
};
