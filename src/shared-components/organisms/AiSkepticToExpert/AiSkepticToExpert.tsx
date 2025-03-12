import React from 'react';
import { Hero } from '../Hero';
import { QuoteGrid } from '../QuoteGrid';
import { ProblemSolutionCard } from '../ProblemSolutionCard';
import { AiSkepticToExpertProps } from './AiSkepticToExpert.types';
import { Typography } from '../../atoms/Typography';

export const AiSkepticToExpert: React.FC<AiSkepticToExpertProps> = ({
  className,
  heroProps,
  quotesProps,
  problemSolutionCardsProps,
}) => {
  // Create a new heroProps object with marginBottom added and ensure image background
  const enhancedHeroProps = {
    ...heroProps,
    className: `${heroProps.className || ''} mb-0`, // No margin needed with the new design
    background: heroProps.background || 'image',
    backgroundImage: heroProps.backgroundImage || '/main-heading-background.png',
    backgroundOverlay: false, // No overlay as requested
    textColor: 'light' as const, // Explicitly typed as 'light'
  };

  // Create enhanced QuoteGrid props with consistent spacing
  const enhancedQuotesProps = {
    ...quotesProps,
    className: `${quotesProps.className || ''} mb-0`, // No margin needed with the new container
  };

  // Maximum content width for consistency
  const maxContentWidth = '1200px';

  return (
    <div className={className} style={{ width: '100%', margin: '0 auto' }}>
      {/* Hero Section */}
      <Hero {...enhancedHeroProps} />
      
      {/* Content Section with White Background */}
      <div style={{ 
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
        marginTop: '-24px',
        position: 'relative',
        zIndex: 2,
        paddingTop: '3rem',
        paddingBottom: '2rem',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Main Content Container - Consistent Width */}
        <div style={{ maxWidth: maxContentWidth, margin: '0 auto', padding: '0 1.5rem' }}>
          {/* Introduction */}
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <Typography variant="h2" className="mb-4">
              The Reality of AI Tools in Development Teams
            </Typography>
            
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <Typography variant="body" className="mb-6" weight="regular">
                Let me guess: your team just got access to AI coding tools, and the reactions range from skeptical eye-rolls to outright hostility. 
                I&apos;ve been there—both as the skeptic and later as the solution architect.
              </Typography>
              
              <a 
                href="https://www.reddit.com/r/ExperiencedDevs/comments/1j7aqsx/ai_coding_mandates_at_work/?share_id=Dhejf8gsX_-YUsuIH1nNE&utm_medium=ios_app&utm_name=ioscss&utm_source=share&utm_term=1" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  display: 'block',
                  marginBottom: '1.5rem', 
                  padding: '1.25rem', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '8px', 
                  borderLeft: '4px solid #6772e5',
                  textDecoration: 'none',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}
                className="hover:shadow-md hover:transform hover:scale-[1.01]"
              >
                <Typography variant="caption" weight="bold" className="mb-1">
                  🔥 Trending on r/ExperiencedDevs
                </Typography>
                <Typography variant="body" weight="bold" className="mb-1">
                  &ldquo;AI coding mandates at work?&rdquo;
                </Typography>
                <Typography variant="caption" color="secondary" className="text-gray-600">
                  💬 286 comments &nbsp;&nbsp; ⬆️ 283 upvotes
                </Typography>
              </a>
              
              <Typography variant="body" className="mb-0" weight="regular">
                A recent thread on r/ExperiencedDevs caught my eye, where hundreds of senior developers shared their frustrations 
                about mandatory AI tool adoption. The problems are systemic and deeply concerning:
              </Typography>
            </div>
          </div>
        </div>
        
        {/* Quotes Section with Light Background - Full Width Container with Consistent Inner Width */}
        <div style={{ 
          width: '100%', 
          backgroundColor: '#f8f9fa',
          padding: '3rem 0',
          marginBottom: '3rem'
        }}>
          <div style={{ maxWidth: maxContentWidth, margin: '0 auto', padding: '0 1.5rem' }}>
            <QuoteGrid {...enhancedQuotesProps} />
          </div>
        </div>
        
        {/* Main Content Container - Consistent Width */}
        <div style={{ maxWidth: maxContentWidth, margin: '0 auto', padding: '0 1.5rem' }}>
          {/* Analysis Section */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <Typography variant="body" className="mb-6" weight="regular">
                These quotes highlight a disturbing trend: companies implementing AI tools without proper systems, leading to metrics that 
                incentivize accepting AI suggestions regardless of quality, management viewing AI as primarily a cost-cutting measure, 
                and the ironic situation where AI is both causing problems and being proposed as the solution.
              </Typography>
              
              <Typography variant="body" className="mb-6" weight="regular">
                But there&apos;s another side to this story. When implemented thoughtfully, AI tools can be genuinely transformative. The key difference? 
                A systematic approach to implementation.
              </Typography>
            </div>
          </div>
        </div>
        
        {/* Solutions Section with Accent Background - Full Width Container with Consistent Inner Width */}
        <div style={{ 
          width: '100%', 
          backgroundColor: '#f0f7ff',
          padding: '3rem 0',
          marginBottom: '3rem'
        }}>
          <div style={{ maxWidth: maxContentWidth, margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="text-center" style={{ marginBottom: '2rem' }}>
              <Typography variant="h2" className="mb-6">
                Common Problems &amp; Our Solutions
              </Typography>
            </div>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem'
            }}>
              {problemSolutionCardsProps.cards.map((card, index) => (
                <ProblemSolutionCard key={index} {...card} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Content Container - Consistent Width */}
        <div style={{ maxWidth: maxContentWidth, margin: '0 auto', padding: '0 1.5rem' }}>
          {/* Conclusion Section */}
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Typography variant="body" className="mb-6" weight="regular">
              Through my journey from skeptic to innovator, I&apos;ve developed a comprehensive system that addresses these challenges head-on. 
              The Brain Garden system, combined with carefully crafted development practices and custom tools like Prompt Forge, 
              creates an environment where both human expertise and AI capabilities can flourish.
            </Typography>
            
            <Typography variant="body" className="mb-0" weight="regular">
              But before we dive into these solutions, let&apos;s understand why the current approach to AI integration often fails, 
              and how a shift in perspective can transform everything.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}; 