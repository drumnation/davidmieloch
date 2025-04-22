'use client';

import React from 'react';
import { Typography } from '../../../../atoms/Typography';
import { fsbpContent, getCharacteristicPosition } from '../../Home.logic';
import { CharacteristicCard } from '../CharacteristicCard';
import { SectionHeading } from '../SectionHeading';
import { useMediaQuery } from './ContentSection.hook';
import {
  CharacteristicsGrid,
  CharacteristicsSection,
  FSBPContent,
  FSBPEmphasis,
  FSBPHeader,
  FSBPHeaderSeparator,
  FSBPIntro,
  FSBPKeyTerm,
  FSBPSectionContainer,
  FSBPSubheadline,
  FSBPText,
  ParadigmIcon,
  ParadigmParagraph,
  ParadigmSection,
  ParadigmSubheading,
  PullQuote,
  PullQuoteContainer,
} from './ContentSection.styles';
import {
  FcCommandLine,
  FcBusiness,
  FcDataConfiguration,
  FcRefresh,
  FcVoicePresentation,
  FcIdea
} from 'react-icons/fc';

// Map of icons for the characteristics section
const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  'Technical Depth': FcCommandLine,
  'Business Breadth': FcBusiness,
  'AI Orchestration': FcDataConfiguration,
  'Systems Thinking': FcRefresh,
  'First-Principles Reasoning': FcIdea,
  'Communication Fluency': FcVoicePresentation,
};

export const FSBPSection: React.FC = () => {
  const { isMobile, isTablet } = useMediaQuery();
  const screenSize = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

  return (
    <FSBPSectionContainer id="fsbp" className="fsbp-section">
      <FSBPHeader className="fsbp-header">
        <Typography variant="h2" color="light" as="h1" className="fsbp-title">
          {fsbpContent.title}
        </Typography>
        <FSBPSubheadline className="fsbp-subheadline">
          <Typography variant="body" color="light">
            {fsbpContent.subtitle}
          </Typography>
        </FSBPSubheadline>
        <FSBPHeaderSeparator className="fsbp-header-separator" />
      </FSBPHeader>

      <FSBPContent className="fsbp-content">
        <FSBPIntro className="fsbp-intro">
          <FSBPText variant="body" mb="1.5rem" className="fsbp-text">
            We&apos;re already witnessing the dawn of <FSBPEmphasis>hyper-efficient organizations</FSBPEmphasis> – AI-native companies achieving <FSBPEmphasis>unprecedented results with remarkably small teams</FSBPEmphasis>.
            The <FSBPKeyTerm>Full-Stack Business Person</FSBPKeyTerm> is someone who combines deep technical expertise with broad business
            acumen, leveraging AI to perform roles that previously required several specialists.
          </FSBPText>
        </FSBPIntro>

        <SectionHeading>{fsbpContent.paradigmSection.title}</SectionHeading>

        <ParadigmSection className="paradigm-section">
          {fsbpContent.paradigmSection.items.map((item, index) => (
            <ParadigmParagraph key={index} className="paradigm-paragraph">
              <ParadigmSubheading className="paradigm-subheading">
                <ParadigmIcon className="paradigm-icon" aria-hidden="true">
                  {item.icon === 'trend' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4361ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v6M12 22v-6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M22 12h-6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24"></path>
                    </svg>
                  )}
                  {item.icon === 'users' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4361ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  )}
                  {item.icon === 'layers' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4361ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                      <polyline points="2 17 12 22 22 17"></polyline>
                      <polyline points="2 12 12 17 22 12"></polyline>
                    </svg>
                  )}
                </ParadigmIcon>
                {item.title}
              </ParadigmSubheading>

              <div
                className="fsbp-text-content"
                dangerouslySetInnerHTML={{ __html: item.content }}
                style={{
                  lineHeight: '1.7',
                  fontSize: '1.05rem',
                  marginBottom: '1.5rem'
                }}
              />
            </ParadigmParagraph>
          ))}

          {/* Pull quote */}
          <PullQuoteContainer className="pull-quote-container">
            <PullQuote className="pull-quote">
              AI&apos;s power is unlocked not just by technical skill, but by asking the right questions.
            </PullQuote>
          </PullQuoteContainer>
        </ParadigmSection>

        {/* Characteristics Section */}
        <CharacteristicsSection>
          <SectionHeading>{fsbpContent.characteristics.title}</SectionHeading>

          <CharacteristicsGrid className="characteristics-grid">
            {fsbpContent.characteristics.items.map((item, index) => {
              const position = getCharacteristicPosition(index, screenSize);
              // Safely get the icon component by title
              const IconComponent = item.title in iconMap ? iconMap[item.title] : undefined;

              return (
                <CharacteristicCard
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  IconComponent={IconComponent}
                  style={{
                    gridRow: position.row,
                    gridColumn: position.column
                  }}
                />
              );
            })}
          </CharacteristicsGrid>
        </CharacteristicsSection>

        {/* CTA Section */}
      </FSBPContent>
    </FSBPSectionContainer>
  );
};

export default FSBPSection; 