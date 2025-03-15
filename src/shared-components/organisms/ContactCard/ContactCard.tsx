import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Typography } from '../../atoms/Typography/Typography';
import { Card } from '../../atoms/Card/Card';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

export interface ContactCardProps {
  contactInfo: {
    email: string;
    linkedin: string;
    github: string;
  };
  style?: string;
  position?: string;
  className?: string;
}

const StyledCard = styled(Card)`
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.background.light};
  
  &.gradient {
    background: ${({ theme }) => theme.colors.gradient};
    color: ${({ theme }) => theme.colors.text.light};
  }
  
  &.accent {
    background-color: ${({ theme }) => theme.colors.background.light};
    border-left: 4px solid ${({ theme }) => theme.colors.primary.main};
  }
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 0 0;
`;

const ContactItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const IconWrapper = styled.div`
  margin-right: 1rem;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.primary.main};
  
  .gradient & {
    color: ${({ theme }) => theme.colors.text.light};
  }
`;

const ContactLink = styled.a`
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary.dark};
    text-decoration: underline;
  }
  
  .gradient & {
    color: ${({ theme }) => theme.colors.text.light};
    
    &:hover {
      color: ${({ theme }) => theme.colors.text.light};
      opacity: 0.8;
    }
  }
`;

export const ContactCard: React.FC<ContactCardProps> = ({
  contactInfo,
  style = 'default',
  className,
}) => {
  const getCardClassName = () => {
    if (style === 'gradient-card' || style === 'contact-card') return 'gradient';
    if (style === 'accent-card') return 'accent';
    return '';
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <StyledCard className={getCardClassName()}>
        <Typography variant="h3" className="mb-3">Get in Touch</Typography>
        <Typography variant="body">
          I&apos;d love to discuss how my experience with Brain Garden and AI-driven development can benefit your organization.
        </Typography>
        <ContactList>
          <ContactItem>
            <IconWrapper>
              <FaEnvelope />
            </IconWrapper>
            <ContactLink href={`mailto:${contactInfo.email}`}>
              {contactInfo.email}
            </ContactLink>
          </ContactItem>
          <ContactItem>
            <IconWrapper>
              <FaLinkedin />
            </IconWrapper>
            <ContactLink href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn Profile
            </ContactLink>
          </ContactItem>
          <ContactItem>
            <IconWrapper>
              <FaGithub />
            </IconWrapper>
            <ContactLink href={contactInfo.github} target="_blank" rel="noopener noreferrer">
              GitHub Profile
            </ContactLink>
          </ContactItem>
        </ContactList>
      </StyledCard>
    </motion.div>
  );
}; 