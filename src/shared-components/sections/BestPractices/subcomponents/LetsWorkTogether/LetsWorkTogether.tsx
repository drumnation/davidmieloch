"use client";

import React from 'react';
import Image from 'next/image';
import {
  LetsWorkTogetherContainer,
  TitleWrapper,
  SectionIcon,
  ContentTitle,
  ContentText,
  ContentList,
  SectionWrapper,
  SectionLabel,
  IconWrapper,
  StyledContentTitle,
  EnhancedContentText,
  HighlightedCard,
  CardTitle,
  ButtonContainer,
  PrimaryButton,
  SpecialtyCard,
  SpecialtyTitle,
  SpecialtyText,
  ReactSpecialtyCard,
  ReactSpecialtyTitle,
  IntroList
} from './LetsWorkTogether.styles';

export interface LetsWorkTogetherProps {
  className?: string;
}

export const LetsWorkTogether: React.FC<LetsWorkTogetherProps> = ({ className }) => {
  return (
    <LetsWorkTogetherContainer className={className}>
      <SectionWrapper>
        <SectionLabel id="lets-work-together" />
        <SectionIcon>
          <IconWrapper>
            <Image 
              src="/icons/collaboration.svg" 
              alt="Collaboration Icon" 
              width={32} 
              height={32} 
              priority={true}
            />
          </IconWrapper>
        </SectionIcon>
        <TitleWrapper>
          <StyledContentTitle>Let's Work Together</StyledContentTitle>
        </TitleWrapper>
        
        <EnhancedContentText>
          I help organizations establish modern development practices and transform their teams as a <span className="role">Lead</span>, <span className="role">Principal</span>, or <span className="role">Staff</span> level engineer with deep expertise in <span className="expertise">React/React Native</span> and <span className="expertise">Enterprise AI</span> solutions.
        </EnhancedContentText>
        
        <IntroList>
          <div className="skill-tag">Scalable Architecture</div>
          <div className="skill-tag">Advanced Workflows</div>
          <div className="skill-tag react">React Ecosystem</div>
          <div className="skill-tag ai">AI Integration</div>
          <div className="skill-tag">Technical Leadership</div>
          <div className="skill-tag">Team Transformation</div>
        </IntroList>
        
        <HighlightedCard>
          <CardTitle>How I Can Collaborate With You</CardTitle>
          
          <ContentList>
            <ul>
              <li>
                <strong>Consulting Services</strong>
                Bring my expertise to your organization for targeted projects focused on React/React Native best practices, development workflows, or AI integration initiatives.
              </li>
              <li>
                <strong>Team Augmentation</strong>
                Join your development team as a senior technical resource to provide leadership and expertise during critical projects or transitions.
              </li>
              <li>
                <strong>Full-Time Opportunities</strong>
                Consider me for Lead, Principal, or Staff Engineer roles where I can provide technical leadership and drive transformation initiatives.
              </li>
              <li>
                <strong>Technical Leadership</strong>
                Guide your engineering teams through implementing scalable architecture, effective development workflows, and modern technical practices.
              </li>
            </ul>
          </ContentList>
          
          <SpecialtyCard>
            <SpecialtyTitle>Enterprise AI Development Team Transformation</SpecialtyTitle>
            <SpecialtyText>
              I specialize in guiding engineering teams through successful AI integration and transformation. From establishing 
              AI development workflows and architecture to implementing best practices for sustainable AI-driven solutions, 
              I can help your organization navigate this complex technical landscape regardless of the engagement model.
            </SpecialtyText>
          </SpecialtyCard>
          
          <ReactSpecialtyCard>
            <ReactSpecialtyTitle>React & React Native Expertise</ReactSpecialtyTitle>
            <SpecialtyText>
              With extensive experience in React and React Native ecosystems, I bring deep knowledge of component architecture, 
              state management, performance optimization, and cross-platform development. I can help establish enterprise-grade 
              patterns for complex applications, monorepos, and design systems that scale.
            </SpecialtyText>
          </ReactSpecialtyCard>
          
          <ButtonContainer>
            <PrimaryButton href="/contact">
              Get In Touch
            </PrimaryButton>
          </ButtonContainer>
        </HighlightedCard>
      </SectionWrapper>
    </LetsWorkTogetherContainer>
  );
};

export default LetsWorkTogether; 