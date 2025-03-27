import React from 'react';
import { SkillsSection } from './components/SkillsSection';
import { TechIcon } from '../../atoms/TechIcon';
import { 
  SKILL_CATEGORIES, 
  ADDITIONAL_SKILL_CATEGORIES, 
  TOOLING_SKILL_CATEGORIES 
} from './components/SkillsSection/SkillsSection.constants';

/**
 * Example usage of the SkillsSection component with TechIcon integration
 */
const ExampleUsage: React.FC = () => {
  // Example of custom icon rendering function that uses TechIcon component
  const renderCustomTechIcon = (iconName: string, color: string) => {
    // This maps the TablerIcon names to technology names that TechIcon understands
    const iconToTechMap: Record<string, string> = {
      'IconBrandReact': 'React.js',
      'IconBrandTypescript': 'TypeScript',
      'IconBrandNodejs': 'Node.js',
      'IconBrandNextjs': 'Next.js',
      'IconBrandGraphql': 'GraphQL',
      'IconBrandFirebase': 'Firebase',
      'IconBrandDocker': 'Docker',
      'IconBrandGithub': 'GitHub',
      'IconBrandRedux': 'Redux'
    };
    
    // Get the matching tech name or use a generic fallback
    const techName = iconToTechMap[iconName] || 'Code';
    
    return (
      <TechIcon
        name={techName}
        size={18}
        color={color}
        showLabel={false}
      />
    );
  };
  
  return (
    <div>
      <h1>Skills Section Example</h1>
      
      {/* Basic usage with default TechIcon implementation */}
      <SkillsSection 
        title="Technical Skills" 
        skillCategories={SKILL_CATEGORIES}
      />
      
      {/* With custom icon rendering */}
      <SkillsSection 
        title="Additional Skills" 
        skillCategories={ADDITIONAL_SKILL_CATEGORIES}
        renderIcon={renderCustomTechIcon}
      />
      
      {/* For categories that might not map well to tech icons */}
      <SkillsSection 
        title="Tools & Infrastructure" 
        skillCategories={TOOLING_SKILL_CATEGORIES}
      >
        <p>These are the tools and infrastructure technologies I work with regularly.</p>
      </SkillsSection>
    </div>
  );
};

export default ExampleUsage; 