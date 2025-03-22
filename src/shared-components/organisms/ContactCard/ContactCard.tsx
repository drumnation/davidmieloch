import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Typography } from '../../atoms/Typography/Typography';
import { Card } from '../../atoms/Card/Card';
import { FaLinkedin, FaGithub, FaMedium, FaEnvelope, FaUser, FaComments, FaArrowRight } from 'react-icons/fa';
import { TransitionDiv } from '../../../utils/animations/migration-helpers';

export interface ContactCardProps {
  contactInfo: {
    linkedin: string;
    github: string;
    medium: string;
  };
  style?: string;
  position?: string;
  className?: string;
}

const ContactCardWrapper = styled.div`
  &.fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  
  &.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledCard = styled(Card)`
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  
  &.accent {
    background-color: ${({ theme }) => theme.colors.background.light};
    border-left: 4px solid ${({ theme }) => theme.colors.primary.main};
  }
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const HeaderIcon = styled.div`
  font-size: 2rem;
  margin-right: 1rem;
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
  color: white;
`;

const ContactLink = styled.a`
  color: white;
  text-decoration: none;
  transition: opacity 0.2s ease;
  display: flex;
  align-items: center;
  
  &:hover {
    color: white;
    text-decoration: underline;
    opacity: 0.9;
  }
  
  .arrow-icon {
    margin-left: 8px;
    opacity: 0;
    transition: all 0.2s ease;
  }
  
  &:hover .arrow-icon {
    opacity: 1;
    transform: translateX(3px);
  }
`;

export const ContactCard: React.FC<ContactCardProps> = ({
  contactInfo,
  style = 'default',
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin: "-100px" }
    );
    
    const currentElement = document.querySelector('.contact-card-container');
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return (
    <ContactCardWrapper 
      className={`contact-card-container fade-in ${isVisible ? 'visible' : ''} ${className || ''}`}
    >
      <StyledCard>
        <HeaderSection>
          <HeaderIcon>
            <FaComments />
          </HeaderIcon>
          <Typography variant="h3" color="light">Get in Touch</Typography>
        </HeaderSection>
        <Typography variant="body" color="light">
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <FaUser style={{ marginRight: '10px', fontSize: '1.2rem' }} />
            I&apos;d love to discuss how my experience with Brain Garden and AI-driven development can benefit your organization.
          </span>
        </Typography>
        <ContactList>
          <ContactItem>
            <IconWrapper>
              <FaMedium />
            </IconWrapper>
            <ContactLink href={contactInfo.medium} target="_blank" rel="noopener noreferrer">
              Blog
              <span className="arrow-icon"><FaArrowRight size={12} /></span>
            </ContactLink>
          </ContactItem>
          <ContactItem>
            <IconWrapper>
              <FaLinkedin />
            </IconWrapper>
            <ContactLink href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn Profile
              <span className="arrow-icon"><FaArrowRight size={12} /></span>
            </ContactLink>
          </ContactItem>
          <ContactItem>
            <IconWrapper>
              <FaGithub />
            </IconWrapper>
            <ContactLink href={contactInfo.github} target="_blank" rel="noopener noreferrer">
              GitHub Profile
              <span className="arrow-icon"><FaArrowRight size={12} /></span>
            </ContactLink>
          </ContactItem>
        </ContactList>
      </StyledCard>
    </ContactCardWrapper>
  );
};