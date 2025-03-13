import React from 'react';
import { AiAutopilotAnalogyProps } from './AiAutopilotAnalogy.types';
import { motion } from 'framer-motion';
import { Typography } from '../../atoms/Typography';
import { Icon } from '../../atoms/Icon';
import {
  realityItemStyle,
  hollywoodItemStyle,
  iconContainerRealityStyle,
  iconContainerHollywoodStyle,
  itemContentStyle
} from './AiAutopilotAnalogy.styles';

// Default content for the component
export const defaultContent = {
  hero: {
    title: "The AI Autopilot Analogy",
    subtitle: "Understanding the true role of AI in software development teams",
    background: "image" as const,
    backgroundImage: "/cockpit3.jpg",
    textColor: "light" as const,
    pattern: "none" as const,
    animation: "fade-up" as const,
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

// Helper function to enhance hero props
export const enhanceHeroProps = (heroProps: AiAutopilotAnalogyProps['heroProps'] = defaultContent.hero) => {
  return {
    ...heroProps,
    className: `${heroProps.className || ''} mb-0`,
    background: (heroProps.background === 'image' || heroProps.background === 'gradient' || 
                heroProps.background === 'light' || heroProps.background === 'dark') ? 
                heroProps.background : 'gradient',
    textColor: 'light' as const
  };
};

// Reality item component
export const RealityItem: React.FC<{
  item: { title: string; description: string; icon: React.ReactNode };
  index: number;
}> = ({ item, index }) => (
  <motion.div 
    key={index}
    style={realityItemStyle}
    whileHover={{ y: -4 }}
    transition={{ duration: 0.2 }}
  >
    <div style={iconContainerRealityStyle}>
      {item.icon}
    </div>
    <div style={itemContentStyle}>
      <Typography variant="body" weight="bold" className="mb-2">{item.title}</Typography>
      <Typography variant="body">{item.description}</Typography>
    </div>
  </motion.div>
);

// Hollywood item component
export const HollywoodItem: React.FC<{
  item: { title: string; description: string; icon: React.ReactNode };
  index: number;
}> = ({ item, index }) => (
  <motion.div 
    key={index}
    style={hollywoodItemStyle}
    whileHover={{ y: -4 }}
    transition={{ duration: 0.2 }}
  >
    <div style={iconContainerHollywoodStyle}>
      {item.icon}
    </div>
    <div style={itemContentStyle}>
      <Typography variant="body" weight="bold" className="mb-2">{item.title}</Typography>
      <Typography variant="body">{item.description}</Typography>
    </div>
  </motion.div>
);

// Section title component
export const SectionTitle: React.FC<{
  title: string;
  className?: string;
}> = ({ title, className = "mb-4" }) => (
  <Typography variant="h2" className={className}>
    {title}
  </Typography>
);

import { TypographyColor } from '../../atoms/Typography/Typography.types';

// Section subtitle component
export const SectionSubtitle: React.FC<{
  title: string;
  className?: string;
  color?: TypographyColor;
}> = ({ title, className = "mb-4", color }) => (
  <Typography variant="h3" className={className} color={color}>
    {title}
  </Typography>
);

// Section paragraph component
export const SectionParagraph: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "mb-0" }) => (
  <Typography variant="body" className={className} weight="regular">
    {children}
  </Typography>
);