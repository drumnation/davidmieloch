import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandMedium,
  IconBuildingArch,
  IconCode,
  IconUser,
  IconSchool,
  IconBriefcase
} from '@tabler/icons-react';
import { NavLink, SocialLink } from './Header.types';

export const navLinks: NavLink[] = [
  // { label: 'Home', href: '/' },
  { label: 'Enterprise AI DevTeam Transformation', href: '/enterprise-ai-development-framework', icon: IconBuildingArch },
  { label: 'React Best Practices', href: '/fullstack-react-best-practices-integration', icon: IconCode },
  { label: 'Bio', href: '/bio', icon: IconUser },
  { label: 'Code Examples', href: '/code-examples', icon: IconCode },
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