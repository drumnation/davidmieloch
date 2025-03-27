import React from 'react';
import * as TablerIcons from '@tabler/icons-react';
import { 
  SectionContainer,
  SkillsContainer, 
  SkillsCategoryColumn, 
  SkillsCategoryTitle, 
  SkillsGrid, 
  SkillTag 
} from './SkillsSection.styles';
import { SkillsSectionProps } from './SkillsSection.types';
import { TechIcon } from '../../../../atoms/TechIcon';

// Map of Tabler icon names to corresponding technology names that TechIcon supports
const ICON_TO_TECH_MAP: Record<string, string> = {
  'IconBrandTypescript': 'TypeScript',
  'IconBrandJavascript': 'JavaScript',
  'IconBrandHtml5': 'HTML',
  'IconBrandCss3': 'CSS',
  'IconBrandReact': 'React.js',
  'IconBrandNextjs': 'Next.js',
  'IconBrandAngular': 'Angular.js',
  'IconComponents': 'UI Libraries',
  'IconLayoutDashboard': 'Ant Design',
  'IconDeviceMobile': 'Mobile',
  'IconBrandAndroid': 'Android',
  'IconBrandApple': 'iOS',
  'IconBrandNodejs': 'Node.js',
  'IconServer': 'Express',
  'IconBrandFirebase': 'Firebase',
  'IconBrandRedux': 'Redux',
  'IconBrandGraphql': 'GraphQL',
  'IconApi': 'REST',
  'IconAtom': 'Atomic Design',
  'IconCode': 'Clean Code',
  'IconDatabase': 'Database',
  'IconBrandPostgres': 'PostgreSQL',
  'IconBrandRedis': 'Redis',
  'IconBrandWebpack': 'Webpack',
  'IconBrandVite': 'Vite',
  'IconPackage': 'Package Manager',
  'IconRulerMeasure': 'ESLint',
  'IconCodeAsterix': 'Prettier',
  'IconDog': 'Husky',
  'IconTestPipe': 'Testing',
  'IconRobot': 'Automation',
  'IconBook': 'Storybook',
  'IconBrandGithub': 'GitHub',
  'IconBrandDocker': 'Docker',
  'IconBrandAws': 'AWS',
  'IconBrandVercel': 'Vercel',
  'IconBrandChrome': 'Chrome Extensions',
  'IconBrandVscode': 'VS Code Extensions',
  'IconBrain': 'AI',
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({ 
  skillCategories,
  title = 'Skills',
  className,
  children,
  renderIcon
}) => {
  return (
    <SectionContainer className={className}>
      <h2>{title}</h2>
      
      {children}
      
      <SkillsContainer>
        {skillCategories.map((category, categoryIndex) => (
          <SkillsCategoryColumn key={`category-${categoryIndex}`}>
            <SkillsCategoryTitle style={{ color: category.color }}>
              {category.category}
            </SkillsCategoryTitle>
            <SkillsGrid>
              {category.skills.map((skill, skillIndex) => {
                // Get the icon component from Tabler Icons
                const iconName = skill.icon || '';
                const IconComponent = iconName in TablerIcons 
                  ? TablerIcons[iconName as keyof typeof TablerIcons] as React.FC<{ size: number; style: React.CSSProperties }>
                  : null;
                
                // Map the Tabler icon name to a tech name for TechIcon
                const techName = ICON_TO_TECH_MAP[iconName] || skill.name;
                
                return (
                  <SkillTag key={`skill-${categoryIndex}-${skillIndex}`}>
                    {renderIcon ? (
                      renderIcon(iconName, category.color)
                    ) : (
                      <>
                        <TechIcon
                          name={techName}
                          size={18}
                          color={category.color}
                          showLabel={false}
                          showTooltip={true}
                          className="skill-icon"
                        />
                        <span className="skill-name">{skill.name}</span>
                      </>
                    )}
                  </SkillTag>
                );
              })}
            </SkillsGrid>
          </SkillsCategoryColumn>
        ))}
      </SkillsContainer>
    </SectionContainer>
  );
}; 