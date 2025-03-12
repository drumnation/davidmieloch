import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../Hero';
import { QuoteGrid } from '../QuoteGrid';
import { ProblemSolutionCard } from '../ProblemSolutionCard';
import { AiSkepticToExpertProps } from './AiSkepticToExpert.types';
import { Typography } from '../../atoms/Typography';

// Define consistent spacing variables that can be reused across components
const SPACING = {
  section: '4rem',
  paragraph: '1.5rem',
  paragraphBreak: '2rem', // Added specific spacing for paragraph breaks
  element: '1rem',
  container: '1.5rem'
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

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

  return (
    <div className={className} style={{ width: '100%', margin: '0 auto' }}>
      {/* Hero Section */}
      <Hero {...enhancedHeroProps} />
      
      {/* Content Section with White Background */}
      <motion.div 
        style={{ 
          width: '100%',
          backgroundColor: '#fff',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          marginTop: '-24px',
          position: 'relative',
          zIndex: 2,
          paddingTop: SPACING.section,
          paddingBottom: SPACING.section,
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)'
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        {/* Introduction Section */}
        <motion.div 
          style={{ 
            width: '100%',
            maxWidth: '1000px', 
            margin: `0 auto ${SPACING.section}`,
            padding: `0 ${SPACING.container}`
          }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className="text-left" 
            style={{ marginBottom: SPACING.paragraph }}
            variants={fadeInUp}
          >
            <Typography variant="h2" className="mb-4">
              The Reality of AI Tools in Development Teams
            </Typography>
          </motion.div>
          
          <motion.div 
            style={{ marginBottom: SPACING.paragraphBreak }}
            variants={fadeInUp}
          >
            <Typography variant="body" weight="regular">
              Let me guess: your team just got access to AI coding tools, and the reactions range from skeptical eye-rolls to outright hostility. 
              I&apos;ve been there—both as the skeptic and later as the solution architect.
            </Typography>
          </motion.div>
          
          <motion.a 
            href="https://www.reddit.com/r/ExperiencedDevs/comments/1j7aqsx/ai_coding_mandates_at_work/?share_id=Dhejf8gsX_-YUsuIH1nNE&utm_medium=ios_app&utm_name=ioscss&utm_source=share&utm_term=1" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'block',
              marginTop: SPACING.paragraph,
              marginBottom: SPACING.paragraphBreak, 
              padding: '0',
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}
            className="hover:shadow-md hover:transform hover:scale-[1.01]"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'stretch',
              borderLeft: '4px solid #6772e5',
              borderRadius: '8px',
            }}>
              {/* Reddit Icon Column */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: SPACING.container,
                backgroundColor: 'rgba(255, 69, 0, 0.05)',
                borderTopLeftRadius: '8px',
                borderBottomLeftRadius: '8px',
                minWidth: '80px',
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="#FF4500">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                </svg>
              </div>
              
              {/* Content Column */}
              <div style={{ padding: SPACING.container, flexGrow: 1 }}>
                <div style={{ color: '#000000' }}>
                  <Typography variant="caption" weight="bold" className={`mb-${SPACING.element}`}>
                    🔥 Trending on r/ExperiencedDevs
                  </Typography>
                </div>
                <div style={{ color: '#0066CC' }}>
                  <Typography variant="body" weight="bold" className={`mb-${SPACING.element}`}>
                    &ldquo;AI coding mandates at work?&rdquo;
                  </Typography>
                </div>
                <Typography variant="caption" color="secondary" className="text-gray-600">
                  💬 286 comments &nbsp;&nbsp; ⬆️ 283 upvotes
                </Typography>
              </div>
            </div>
          </motion.a>
          
          <motion.div variants={fadeInUp}>
            <Typography variant="body" className="mb-0" weight="regular">
              A recent thread on r/ExperiencedDevs caught my eye, where hundreds of senior developers shared their frustrations 
              about mandatory AI tool adoption. The problems are systemic and deeply concerning:
            </Typography>
          </motion.div>
        </motion.div>
        
        {/* Quotes Section with Light Background */}
        <motion.div 
          style={{ 
            width: '100%', 
            backgroundColor: '#f8f9fa',
            padding: `${SPACING.section} 0`,
            marginBottom: SPACING.section
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <motion.div 
            style={{ 
              width: '100%',
              maxWidth: '1000px', 
              margin: '0 auto',
              padding: `0 ${SPACING.container}`
            }}
            variants={fadeInUp}
          >
            <QuoteGrid {...enhancedQuotesProps} />
          </motion.div>
        </motion.div>
        
        {/* Analysis Section */}
        <motion.div 
          style={{ 
            width: '100%',
            maxWidth: '1000px', 
            margin: `0 auto ${SPACING.section}`,
            padding: `0 ${SPACING.container}`
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div 
            style={{ marginBottom: SPACING.paragraphBreak }}
            variants={fadeInUp}
          >
            <Typography variant="body" weight="regular">
              These quotes highlight a disturbing trend: companies implementing AI tools without proper systems, leading to metrics that 
              incentivize accepting AI suggestions regardless of quality, management viewing AI as primarily a cost-cutting measure, 
              and the ironic situation where AI is both causing problems and being proposed as the solution.
            </Typography>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Typography variant="body" className="mb-0" weight="regular">
              But there&apos;s another side to this story. When implemented thoughtfully, AI tools can be genuinely transformative. The key difference? 
              A systematic approach to implementation.
            </Typography>
          </motion.div>
        </motion.div>
        
        {/* Solutions Section with Accent Background */}
        <motion.div 
          style={{ 
            width: '100%', 
            backgroundColor: '#f0f7ff',
            padding: `${SPACING.section} 0`,
            marginBottom: SPACING.section
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <motion.div 
            style={{ 
              width: '100%',
              maxWidth: '1000px', 
              margin: '0 auto',
              padding: `0 ${SPACING.container}`
            }}
            variants={staggerContainer}
          >
            <motion.div 
              className="text-left" 
              style={{ marginBottom: SPACING.paragraph }}
              variants={fadeInUp}
            >
              <Typography variant="h2" className="mb-4">
                Common Problems &amp; My Solutions
              </Typography>
            </motion.div>
            
            <motion.div 
              style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: SPACING.paragraph
              }}
              variants={staggerContainer}
            >
              {problemSolutionCardsProps.cards.map((card, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  custom={index}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProblemSolutionCard {...card} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Conclusion Section */}
        <motion.div 
          style={{ 
            width: '100%',
            maxWidth: '1000px', 
            margin: '0 auto',
            padding: `0 ${SPACING.container}`
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div 
            style={{ marginBottom: SPACING.paragraphBreak }}
            variants={fadeInUp}
          >
            <Typography variant="body" weight="regular">
              Through my journey from skeptic to innovator, I&apos;ve developed a comprehensive system that addresses these challenges head-on. 
              My approach, combined with carefully crafted development practices and custom tools I&apos;ve built, 
              creates an environment where both human expertise and AI capabilities can flourish.
            </Typography>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Typography variant="body" className="mb-0" weight="regular">
              But before we dive into these solutions, let&apos;s understand why the current approach to AI integration often fails, 
              and how my perspective as a principal engineer can transform everything.
            </Typography>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}; 