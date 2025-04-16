'use client';

import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Hero } from '../../organisms/Hero/Hero';
import { PersonaNavItem } from './Home.types';
import { useHomeData } from './Home.hook';
import { FSBPSection } from './components/ContentSection/ContentSection';
import { PersonaCard } from './components/PersonaCard/PersonaCard';

// Re-create the styled components inline to fix import issues
const HomePageContainer = styled.div`
  width: 100%;
`;

const PersonaNav = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 3rem auto;
  max-width: 800px;
`;

export const Home = () => {
  const { 
    heroProps, 
    personaNavData, 
    metaData 
  } = useHomeData();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metaData.description} />
        <meta name="keywords" content={metaData.keywords} />
        <meta property="og:title" content={metaData.ogTitle} />
        <meta property="og:description" content={metaData.ogDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={metaData.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaData.twitterTitle} />
        <meta name="twitter:description" content={metaData.twitterDescription} />
      </Head>
    
      <HomePageContainer>
        {/* Hero Section */}
        <div className="hero-section fade-in-element">
          <Hero {...heroProps} />
        </div>
        
        {/* Persona-Targeted Navigation */}
        <PersonaNav className="persona-nav">
          {personaNavData.map((persona: PersonaNavItem, index: number) => (
            <PersonaCard 
              key={index}
              icon={persona.icon}
              title={persona.title} 
              description={persona.description}
              link={persona.link}
            />
          ))}
        </PersonaNav>
        
        {/* Full-Stack Business Person Section */}
        <FSBPSection />
      </HomePageContainer>
    </>
  );
};

export default Home; 