"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  ConclusionContainer,
  ConclusionTitle,
  ConclusionText,
  TitleWrapper,
  SectionIcon,
  IconWrapper
} from './Conclusion.styles';
import { ConclusionProps } from './Conclusion.types';

export const Conclusion: React.FC<ConclusionProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const conclusionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin: "-100px", threshold: 0.1 }
    );
    
    if (conclusionRef.current) {
      observer.observe(conclusionRef.current);
    }
    
    return () => {
      if (conclusionRef.current) {
        observer.unobserve(conclusionRef.current);
      }
    };
  }, []);

  return (
    <ConclusionContainer
      ref={conclusionRef}
      className={`${className} ${isVisible ? 'visible' : ''}`}
    >
      <section>
        <TitleWrapper>
          <SectionIcon>
            <IconWrapper>
              <Image 
                src="/icons/ai-synergy.svg" 
                alt="AI Synergy Icon" 
                width={32} 
                height={32} 
                priority={true}
              />
            </IconWrapper>
          </SectionIcon>
          <ConclusionTitle>The Synergy of AI and Modern Development Practices</ConclusionTitle>
        </TitleWrapper>
        <ConclusionText>
          The benefits of these architectural choices extend beyond human developers. The rise of generative AI tools, 
          like GPT-4, has highlighted a powerful synergy between well-structured code and AI assistance. A codebase 
          built with TypeScript, organized into well-defined modules within a monorepo, and supported by comprehensive 
          tests, is significantly easier for AI to understand, generate, and refactor. The lack of these principles in 
          the legacy project I described severely limited the effectiveness of AI, demonstrating that outdated practices 
          create a bottleneck for future innovation. A modern stack <em>amplifies</em> the power of AI.
        </ConclusionText>
      </section>
      
      <section>
        <TitleWrapper>
          <SectionIcon>
            <IconWrapper>
              <Image 
                src="/icons/future.svg" 
                alt="Future Icon" 
                width={32} 
                height={32} 
                priority={true}
              />
            </IconWrapper>
          </SectionIcon>
          <ConclusionTitle>Conclusion: Building for the Future</ConclusionTitle>
        </TitleWrapper>
        <ConclusionText>
          The evolution of software development is a continuous process. However, the combination of a thoughtful 
          component architecture (blending Atomic and hierarchical design), a monorepo approach powered by tools like 
          Nx, Turborepo, and pnpm, a commitment to TypeScript&apos;s strong typing, a comprehensive testing strategy, and a 
          robust CI/CD pipeline provides a solid foundation for building scalable, maintainable, and high-quality 
          applications in the React, Node.js, and TypeScript ecosystem. These elements are not isolated improvements; 
          they are interconnected force multipliers that benefit both human developers and the increasingly important 
          role of AI in the software development lifecycle. This approach is essential for enterprise teams striving 
          for speed, quality, and stability.
        </ConclusionText>
      </section>
    </ConclusionContainer>
  );
}; 