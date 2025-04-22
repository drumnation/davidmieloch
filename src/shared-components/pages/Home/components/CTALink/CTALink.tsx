'use client';

import React from 'react';
import Link from 'next/link';
import { StyledCTALink, IconWrapper } from './CTALink.styles';
import { CTALinkProps } from '../../Home.types';
import { FaGithub, FaLinkedin, FaTwitter, FaBlog, FaDownload, FaEnvelope, FaBriefcase, FaClock, FaLaptopCode, FaFileAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { IoDocument } from 'react-icons/io5';
import Image from 'next/image';

/**
 * Call to Action Link Component
 * Used for action buttons throughout the home page
 */
const iconMap: Record<string, React.ReactNode> = {
  github: <FaGithub />,
  linkedin: <FaLinkedin />,
  twitter: <FaTwitter />,
  blog: <FaBlog />,
  download: <FaDownload />,
  mail: <FaEnvelope />,
  portfolio: <FaBriefcase />,
  experience: <FaClock />,
  projects: <FaLaptopCode />,
  'file-text': <FaFileAlt />,
  document: <IoDocument />
};

const CTALink: React.FC<CTALinkProps> = ({
  href,
  text,
  label,
  variant = 'primary',
  iconType,
  iconNode,
  iconBackground,
  size = 'md',
  ...rest
}) => {
  const isExternal = href.startsWith('http');
  const iconContent = iconNode
    ? iconNode
    : iconType
      ? iconMap[iconType]
      : (isExternal ? <FaExternalLinkAlt size={14} /> : null);

  const LinkContent = (
    <StyledCTALink $variant={variant} $size={size} {...rest}>
      {iconContent && <IconWrapper iconBackground={iconBackground}>{iconContent}</IconWrapper>}
      {text || label}
    </StyledCTALink>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
        {LinkContent}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={label}>
      {LinkContent}
    </Link>
  );
};

export default CTALink; 