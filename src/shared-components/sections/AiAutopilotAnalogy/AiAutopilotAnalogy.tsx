import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../../organisms/Hero';
import { FeatureGrid } from '../../organisms/FeatureGrid/FeatureGrid';
import { ComparisonTable } from '../../molecules/ComparisonTable';
import { AiAutopilotAnalogyProps } from './AiAutopilotAnalogy.types';
import { Typography } from '../../atoms/Typography';
import { Icon } from '../../atoms/Icon';
import { MermaidDiagram } from '../../molecules/MermaidDiagram';

// Define consistent spacing variables that can be reused across components
const SPACING = {
  section: '4rem',
  paragraph: '1.5rem',
  paragraphBreak: '2rem',
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

// Default content for the component
const defaultContent = {
  hero: {
    title: "The AI Autopilot Analogy",
    subtitle: "Understanding the true role of AI in software development teams",
    background: "image" as const,
    backgroundImage: "/cockpit3.jpg",
    textColor: "light" as const,
    className: '',
  },
  comparisonTable: {
    leftTitle: "Human Pilot",
    rightTitle: "AI Autopilot",
    items: [
      {
        category: "Primary Role",
        leftContent: "Strategic decision-making, complex problem-solving, and creative thinking",
        rightContent: "Handling routine tasks, providing suggestions, and automating repetitive work"
      },
      {
        category: "Responsibility",
        leftContent: "Ultimate accountability for all decisions and outcomes",
        rightContent: "Executing specific functions under human supervision and validation"
      },
      {
        category: "Strengths",
        leftContent: "Contextual understanding, ethical judgment, and novel problem-solving",
        rightContent: "Speed, consistency, pattern recognition, and tireless execution"
      },
      {
        category: "Limitations",
        leftContent: "Fatigue, cognitive biases, and limited processing capacity",
        rightContent: "Lack of true understanding, hallucinations, and inability to handle edge cases"
      },
      {
        category: "Ideal Usage",
        leftContent: "High-level architecture, critical decisions, and creative innovation",
        rightContent: "Code generation, documentation, testing, and routine maintenance"
      }
    ]
  },
  realityVsHollywood: {
    realityItems: [
      {
        title: "Augmentation Tool",
        description: "AI enhances human capabilities rather than replacing them",
        icon: <Icon name="tool" size={24} />
      },
      {
        title: "Requires Expertise",
        description: "Effective AI use demands deep domain knowledge and critical thinking",
        icon: <Icon name="brain" size={24} />
      },
      {
        title: "Needs Validation",
        description: "AI outputs must be verified by humans before implementation",
        icon: <Icon name="check" size={24} />
      },
      {
        title: "Specialized Focus",
        description: "Excels at specific, well-defined tasks with clear parameters",
        icon: <Icon name="target" size={24} />
      }
    ],
    hollywoodItems: [
      {
        title: "Autonomous Creator",
        description: "AI independently builds complete systems without human input",
        icon: <Icon name="robot" size={24} />
      },
      {
        title: "Universal Expert",
        description: "AI possesses comprehensive knowledge across all domains",
        icon: <Icon name="world" size={24} />
      },
      {
        title: "Perfect Accuracy",
        description: "AI never makes mistakes or produces incorrect information",
        icon: <Icon name="star" size={24} />
      },
      {
        title: "General Intelligence",
        description: "AI understands context, nuance, and complex human intentions",
        icon: <Icon name="brain" size={24} />
      }
    ]
  },
  strategicFocusAreas: {
    features: [
      {
        title: "Prompt Engineering",
        description: "Developing systematic approaches to craft effective AI prompts that produce reliable, maintainable code",
        icon: <Icon name="message-circle" size={24} />
      },
      {
        title: "Validation Frameworks",
        description: "Creating robust testing systems that automatically verify AI-generated code against business requirements",
        icon: <Icon name="shield-check" size={24} />
      },
      {
        title: "Knowledge Integration",
        description: "Building systems that combine company-specific knowledge with AI capabilities for contextually aware assistance",
        icon: <Icon name="database" size={24} />
      },
      {
        title: "Workflow Optimization",
        description: "Redesigning development processes to leverage AI strengths while maintaining human oversight",
        icon: <Icon name="git-branch" size={24} />
      },
      {
        title: "Metrics Redefinition",
        description: "Establishing quality-focused metrics that measure meaningful outcomes rather than AI usage",
        icon: <Icon name="chart-bar" size={24} />
      },
      {
        title: "Team Adaptation",
        description: "Training teams to effectively collaborate with AI tools while maintaining coding standards",
        icon: <Icon name="users" size={24} />
      }
    ]
  },
  mermaidDiagram: {
    title: "AI Integration Process Flow",
    description: "The following diagram illustrates the ideal process flow for integrating AI into development workflows:",
    definition: `
      graph TD
        A[Assess Current Workflow] --> B[Identify AI Opportunities]
        B --> C[Define Human/AI Roles]
        C --> D[Implement AI Tools]
        D --> E[Train Team]
        E --> F[Measure Results]
        F --> G{Successful?}
        G -->|Yes| H[Scale Integration]
        G -->|No| I[Refine Approach]
        I --> C
        H --> J[Continuous Improvement]
        J --> F
    `,
    theme: "default"
  }
};

export const AiAutopilotAnalogy: React.FC<AiAutopilotAnalogyProps> = ({
  className,
  heroProps = defaultContent.hero,
  comparisonTableProps = defaultContent.comparisonTable,
  realityVsHollywoodProps = defaultContent.realityVsHollywood,
  strategicFocusAreasProps = defaultContent.strategicFocusAreas,
  mermaidDiagramProps = defaultContent.mermaidDiagram,
}) => {
  // Create a new heroProps object with marginBottom added
  const enhancedHeroProps = {
    ...heroProps,
    className: `${heroProps.className || ''} mb-0`,
    background: (heroProps.background === 'image' || heroProps.background === 'gradient' || 
                heroProps.background === 'light' || heroProps.background === 'dark') ? 
                heroProps.background : 'gradient',
    textColor: 'light' as const,
  };

  return (
    <div className={className} style={{ width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
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
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch'
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
              Reframing AI: The Autopilot Analogy
            </Typography>
          </motion.div>
          
          <motion.div 
            style={{ marginBottom: SPACING.paragraphBreak }}
            variants={fadeInUp}
          >
            <Typography variant="body" weight="regular">
              To understand the proper role of AI in software development, consider the relationship between a pilot and an autopilot system in aviation. 
              This analogy helps clarify expectations, responsibilities, and the optimal division of labor between human developers and AI tools.
            </Typography>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Typography variant="body" className="mb-0" weight="regular">
              Just as autopilot systems handle routine flight operations but require pilot oversight for critical decisions and emergencies, 
              AI coding tools excel at generating boilerplate code and routine tasks while requiring human expertise for architecture, 
              complex problem-solving, and quality assurance.
            </Typography>
          </motion.div>
        </motion.div>
        
        {/* Comparison Table Section */}
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
            <Typography variant="h3" className="mb-4">
              Human Pilot vs. AI Autopilot
            </Typography>
            <ComparisonTable 
              leftTitle={comparisonTableProps.leftTitle}
              rightTitle={comparisonTableProps.rightTitle}
              items={comparisonTableProps.items}
              variant="accent"
            />
          </motion.div>
        </motion.div>
        
        {/* Reality vs Hollywood Section */}
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
            className="text-left" 
            style={{ marginBottom: SPACING.paragraph }}
            variants={fadeInUp}
          >
            <Typography variant="h2" className="mb-4">
              AI Reality vs. Hollywood Fiction
            </Typography>
          </motion.div>
          
          <motion.div 
            style={{ marginBottom: SPACING.paragraphBreak }}
            variants={fadeInUp}
          >
            <Typography variant="body" weight="regular">
              Many misconceptions about AI stem from science fiction portrayals that bear little resemblance to today&apos;s reality. 
              Understanding these differences is crucial for setting realistic expectations and implementing effective AI strategies.
            </Typography>
          </motion.div>
          
          <motion.div 
            style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2rem',
              width: '100%',
              margin: '2rem 0'
            }}
            variants={staggerContainer}
          >
            {/* Reality Column */}
            <motion.div variants={fadeInUp}>
              <Typography variant="h3" className="mb-4" color="primary">
                Reality: AI Today
              </Typography>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {realityVsHollywoodProps.realityItems.map((item, index) => (
                  <motion.div 
                    key={index}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      padding: '1rem',
                      backgroundColor: '#f0f7ff',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                    }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: 'var(--primary-blue)'
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <Typography variant="body" weight="bold">{item.title}</Typography>
                      <Typography variant="body">{item.description}</Typography>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Hollywood Column */}
            <motion.div variants={fadeInUp}>
              <Typography variant="h3" className="mb-4" color="primary">
                Hollywood: AI Fiction
              </Typography>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {realityVsHollywoodProps.hollywoodItems.map((item, index) => (
                  <motion.div 
                    key={index}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      padding: '1rem',
                      backgroundColor: '#fff0f0',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                    }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: 'var(--accent-red)'
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <Typography variant="body" weight="bold">{item.title}</Typography>
                      <Typography variant="body">{item.description}</Typography>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Strategic Focus Areas Section */}
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
            className="text-left" 
            style={{ marginBottom: SPACING.paragraph }}
            variants={fadeInUp}
          >
            <Typography variant="h2" className="mb-4">
              Strategic Focus Areas for AI Integration
            </Typography>
          </motion.div>
          
          <motion.div 
            style={{ marginBottom: SPACING.paragraphBreak }}
            variants={fadeInUp}
          >
            <Typography variant="body" weight="regular">
              Based on my experience implementing AI systems across multiple development teams, 
              I&apos;ve identified six key focus areas that determine the success of AI integration:
            </Typography>
          </motion.div>
          
          <FeatureGrid 
            features={strategicFocusAreasProps.features}
            columns={3}
            style="gradient-cards"
            animation="stagger-fade"
          />
          
          <motion.div 
            style={{ marginTop: SPACING.paragraphBreak }}
            variants={fadeInUp}
          >
            <Typography variant="body" className="mb-0" weight="regular">
              By focusing on these strategic areas, organizations can create a balanced approach that leverages AI&apos;s strengths 
              while maintaining the critical human elements of software development.
            </Typography>
          </motion.div>
        </motion.div>
        
        {/* Process Flow Diagram Section */}
        <motion.div 
          style={{ 
            width: '100%',
            maxWidth: '1000px', 
            margin: `${SPACING.section} auto 0`,
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
            <Typography variant="h2" weight="bold" className="mb-4">
              {mermaidDiagramProps.title}
            </Typography>
            <Typography variant="body" weight="regular">
              {mermaidDiagramProps.description}
            </Typography>
          </motion.div>
          
          <motion.div
            variants={fadeInUp}
            style={{ 
              marginBottom: SPACING.paragraphBreak,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <MermaidDiagram
              definition={mermaidDiagramProps.definition || ''}
              theme={mermaidDiagramProps.theme as 'default' | 'dark' | 'forest' | 'neutral' | undefined}
              height="auto"
              width="100%"
            />
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Typography variant="body" weight="regular">
              This process emphasizes the iterative nature of successful AI integration, with continuous feedback loops
              and clear decision points for refining the approach based on real-world results.
            </Typography>
          </motion.div>
        </motion.div>
        
        {/* Conclusion Section */}
        <motion.div 
          style={{ 
            width: '100%',
            maxWidth: '1000px', 
            margin: `${SPACING.section} auto 0`,
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
              The autopilot analogy provides a powerful framework for understanding AI&apos;s role in development. 
              Just as pilots remain essential despite advanced autopilot systems, developers remain the creative and strategic core of software development.
            </Typography>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Typography variant="body" className="mb-0" weight="regular">
              In the next section, we&apos;ll explore how these principles are implemented in my comprehensive AI integration system: The Brain Garden.
            </Typography>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};