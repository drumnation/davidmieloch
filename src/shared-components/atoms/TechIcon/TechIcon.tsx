import React from 'react';
import { TechIconProps } from './TechIcon.types';
import * as S from './TechIcon.styles';
import { IconType } from 'react-icons'; // Import IconType

// Import various icon collections
import * as Di from 'react-icons/di';  // Devicons
import * as Si from 'react-icons/si';  // Simple Icons
import * as Fa from 'react-icons/fa';  // Font Awesome
import * as Tb from 'react-icons/tb';  // Tabler Icons
import * as Bs from 'react-icons/bs';  // Bootstrap Icons

// Custom Speechify Icon Component
const SpeechifyIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#FF6B00' }) => {
  return (
    <div style={{ 
      width: `${size}px`, 
      height: `${size}px`, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'transparent' // Using transparent background to show the icon clearly
    }}>
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Speechify_Icon.png/480px-Speechify_Icon.png" 
        alt="Speechify" 
        width={size} 
        height={size} 
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
};

// Map of technology names to their respective icons
// The keys are lowercase for case-insensitive matching
const TECH_ICON_MAP: Record<string, {
  icon: IconType | React.FC<{ size?: number; color?: string }>;
  color?: string;
}> = {
  // Programming Languages
  'javascript': { icon: Di.DiJavascript, color: '#F7DF1E' },
  'typescript': { icon: Si.SiTypescript, color: '#3178C6' },
  'python': { icon: Di.DiPython, color: '#3776AB' },
  'java': { icon: Di.DiJava, color: '#007396' },
  'c#': { icon: Si.SiSharp, color: '#239120' },
  'c++': { icon: Si.SiCplusplus, color: '#00599C' },
  'c': { icon: Si.SiC, color: '#A8B9CC' },
  'go': { icon: Di.DiGo, color: '#00ADD8' },
  'rust': { icon: Si.SiRust, color: '#000000' },
  'ruby': { icon: Di.DiRuby, color: '#CC342D' },
  'php': { icon: Di.DiPhp, color: '#777BB4' },
  'swift': { icon: Di.DiSwift, color: '#FA7343' },
  'kotlin': { icon: Si.SiKotlin, color: '#7F52FF' },
  
  // Frontend
  'react': { icon: Di.DiReact, color: '#61DAFB' },
  'react.js': { icon: Di.DiReact, color: '#61DAFB' },
  'react native': { icon: Di.DiReact, color: '#61DAFB' },
  'vue': { icon: Di.DiVim, color: '#4FC08D' },
  'vue.js': { icon: Di.DiVim, color: '#4FC08D' },
  'angular': { icon: Di.DiAngularSimple, color: '#DD0031' },
  'angular.js': { icon: Di.DiAngularSimple, color: '#DD0031' },
  'svelte': { icon: Si.SiSvelte, color: '#FF3E00' },
  'html': { icon: Di.DiHtml5, color: '#E34F26' },
  'html5': { icon: Di.DiHtml5, color: '#E34F26' },
  'css': { icon: Di.DiCss3, color: '#1572B6' },
  'css3': { icon: Di.DiCss3, color: '#1572B6' },
  'sass': { icon: Di.DiSass, color: '#CC6699' },
  'less': { icon: Di.DiLess, color: '#1D365D' },
  'bootstrap': { icon: Di.DiBootstrap, color: '#7952B3' },
  'tailwind': { icon: Si.SiTailwindcss, color: '#06B6D4' },
  'tailwindcss': { icon: Si.SiTailwindcss, color: '#06B6D4' },
  'material-ui': { icon: Si.SiMui, color: '#007FFF' },
  'material ui': { icon: Si.SiMui, color: '#007FFF' },
  'styled-components': { icon: Si.SiStyledcomponents, color: '#DB7093' },
  'styled components': { icon: Si.SiStyledcomponents, color: '#DB7093' },
  'ant design': { icon: Si.SiAntdesign, color: '#0170FE' },
  'mantine': { icon: Fa.FaRocket, color: '#339AF0' }, // No official icon, using rocket as it's similar to their logo
  'css modules': { icon: Di.DiCss3, color: '#1572B6' }, // Using CSS3 icon as fallback
  'ui libraries': { icon: Si.SiMui, color: '#007FFF' }, // Using MUI icon for general UI Libraries
  
  // Backend & APIs
  'node': { icon: Di.DiNodejs, color: '#339933' },
  'node.js': { icon: Di.DiNodejs, color: '#339933' },
  'express': { icon: Si.SiExpress, color: '#000000' },
  'express.js': { icon: Si.SiExpress, color: '#000000' },
  'django': { icon: Di.DiDjango, color: '#092E20' },
  'flask': { icon: Si.SiFlask, color: '#000000' },
  'fastapi': { icon: Si.SiFastapi, color: '#009688' },
  'graphql': { icon: Si.SiGraphql, color: '#E10098' },
  'rest': { icon: Tb.TbApi, color: '#5A29E4' },
  'restful': { icon: Tb.TbApi, color: '#5A29E4' },
  'restful apis': { icon: Tb.TbApi, color: '#5A29E4' },
  'apollo': { icon: Si.SiApollographql, color: '#311C87' },
  'spotify api': { icon: Si.SiSpotify, color: '#1DB954' },
  'reddit api': { icon: Si.SiReddit, color: '#FF4500' },
  
  // Databases
  'mysql': { icon: Di.DiMysql, color: '#4479A1' },
  'postgresql': { icon: Di.DiPostgresql, color: '#4169E1' },
  'postgres': { icon: Di.DiPostgresql, color: '#4169E1' },
  'mongodb': { icon: Di.DiMongodb, color: '#47A248' },
  'mongodb atlas': { icon: Di.DiMongodb, color: '#47A248' },
  'redis': { icon: Di.DiRedis, color: '#DC382D' },
  'sqlite': { icon: Si.SiSqlite, color: '#003B57' },
  'firebase': { icon: Di.DiFirebase, color: '#FFCA28' },
  'supabase': { icon: Si.SiSupabase, color: '#3ECF8E' },
  'vector databases': { icon: Fa.FaDatabase, color: '#00AFAA' }, // Generic database icon for vector DBs
  
  // DevOps & Tools
  'docker': { icon: Di.DiDocker, color: '#2496ED' },
  'kubernetes': { icon: Si.SiKubernetes, color: '#326CE5' },
  'terraform': { icon: Si.SiTerraform, color: '#7B42BC' },
  'jenkins': { icon: Di.DiJenkins, color: '#D33833' },
  'ansible': { icon: Si.SiAnsible, color: '#EE0000' },
  'circleci': { icon: Si.SiCircleci, color: '#343434' },
  'travis': { icon: Si.SiTravisci, color: '#3EAAAF' },
  'git': { icon: Di.DiGit, color: '#F05032' },
  'github': { icon: Di.DiGithub, color: '#181717' },
  'github actions': { icon: Si.SiGithubactions, color: '#2088FF' },
  'gitlab': { icon: Si.SiGitlab, color: '#FCA121' },
  'bitbucket': { icon: Si.SiBitbucket, color: '#0052CC' },
  'aws': { icon: Di.DiAws, color: '#FF9900' },
  'aws cdk': { icon: Di.DiAws, color: '#FF9900' }, // Using AWS icon for AWS CDK
  'azure': { icon: Fa.FaCloud, color: '#0089D6' }, // Using cloud icon as fallback for Azure
  'gcp': { icon: Si.SiGooglecloud, color: '#4285F4' },
  'google cloud': { icon: Si.SiGooglecloud, color: '#4285F4' },
  'netlify': { icon: Si.SiNetlify, color: '#00C7B7' },
  'vercel': { icon: Si.SiVercel, color: '#000000' },
  'heroku': { icon: Di.DiHeroku, color: '#430098' },
  'digital ocean': { icon: Di.DiDigitalOcean, color: '#0080FF' },
  'cli': { icon: Fa.FaTerminal, color: '#4D4D4D' }, // Generic terminal icon for CLI
  
  // Build Tools & Package Managers
  'webpack': { icon: Si.SiWebpack, color: '#8DD6F9' },
  'babel': { icon: Si.SiBabel, color: '#F9DC3E' },
  'rollup': { icon: Si.SiRollupdotjs, color: '#EC4A3F' },
  'parcel': { icon: Fa.FaBox, color: '#21374B' }, // Using box icon as fallback for Parcel
  'vite': { icon: Si.SiVite, color: '#646CFF' },
  'snowpack': { icon: Si.SiSnowpack, color: '#2E5E82' },
  'yarn': { icon: Si.SiYarn, color: '#2C8EBB' },
  'npm': { icon: Di.DiNpm, color: '#CB3837' },
  'pnpm': { icon: Si.SiPnpm, color: '#F69220' },
  'pnpm + yarn workspaces': { icon: Si.SiPnpm, color: '#F69220' },
  'gradle': { icon: Si.SiGradle, color: '#02303A' },
  'maven': { icon: Si.SiApachemaven, color: '#C71A36' },
  
  // Testing
  'jest': { icon: Si.SiJest, color: '#C21325' },
  'mocha': { icon: Si.SiMocha, color: '#8D6748' },
  'chai': { icon: Si.SiChai, color: '#A30701' },
  'jasmine': { icon: Si.SiJasmine, color: '#8A4182' },
  'cypress': { icon: Si.SiCypress, color: '#17202C' },
  'selenium': { icon: Si.SiSelenium, color: '#43B02A' },
  'playwright': { icon: Fa.FaTheaterMasks, color: '#2EAD33' }, // Using theater masks icon
  'puppeteer': { icon: Fa.FaChrome, color: '#40B5A4' }, // Using Chrome icon as fallback
  'junit': { icon: Si.SiJunit5, color: '#25A162' },
  'storybook': { icon: Si.SiStorybook, color: '#FF4785' },
  'detox': { icon: Si.SiTestcafe || Fa.FaMobileAlt, color: '#8D69F1' }, // Using TestCafe or mobile icon as fallback
  
  // Update colors to match the UI elements in the image
  'te': { icon: Bs.BsCodeSquare, color: '#3498DB' }, // Custom color for "Te" icon (for Jest and Playwright)
  'au': { icon: Bs.BsCodeSquare, color: '#3498DB' }, // Custom color for "Au" icon (for Puppeteer)
  's': { icon: Bs.BsCodeSquare, color: '#3498DB' },  // Custom color for "S" icon (for Storybook)
  'mo': { icon: Bs.BsCodeSquare, color: '#3498DB' }, // Custom color for "Mo" icon (for Detox)
  
  // Frameworks & Libraries
  'electron': { icon: Si.SiElectron, color: '#47848F' },
  'next.js': { icon: Si.SiNextdotjs, color: '#000000' },
  'nuxt.js': { icon: Si.SiNuxtdotjs, color: '#00DC82' },
  'gatsby': { icon: Si.SiGatsby, color: '#663399' },
  'strapi': { icon: Si.SiStrapi, color: '#4945FF' },
  'redux': { icon: Si.SiRedux, color: '#764ABC' },
  'redux toolkit': { icon: Si.SiRedux, color: '#764ABC' },
  'mobx': { icon: Si.SiMobx, color: '#FF9955' },
  'react-query': { icon: Si.SiReactquery, color: '#FF4154' },
  'zustand': { icon: Fa.FaCode, color: '#764ABC' }, // Using code icon as fallback for Zustand
  'recoil': { icon: Fa.FaAtom, color: '#3578E5' }, // Using atom icon as fallback for Recoil
  'socket.io': { icon: Si.SiSocketdotio, color: '#010101' },
  'rxjs': { icon: Si.SiReactivex, color: '#B7178C' },
  'd3.js': { icon: Si.SiD3Dotjs, color: '#F9A03C' },
  'three.js': { icon: Si.SiThreedotjs, color: '#000000' },
  'webgl': { icon: Si.SiWebgl, color: '#990000' },
  'jquery': { icon: Di.DiJqueryLogo, color: '#0769AD' },
  'lodash': { icon: Si.SiLodash, color: '#3492FF' },
  'underscore': { icon: Fa.FaCode, color: '#0371B5' }, // Using code icon as fallback
  'axios': { icon: Tb.TbApi, color: '#5A29E4' }, // Using API icon as fallback for Axios
  'fetch api': { icon: Tb.TbApi, color: '#5A29E4' }, // Using API icon as fallback for Fetch API
  'apollo client': { icon: Si.SiApollographql, color: '#311C87' },
  'react context': { icon: Di.DiReact, color: '#61DAFB' },
  'react hooks': { icon: Di.DiReact, color: '#61DAFB' },
  
  // Mobile Development
  'expo': { icon: Si.SiExpo, color: '#000020' },
  'ios': { icon: Fa.FaApple, color: '#000000' },
  'android': { icon: Fa.FaAndroid, color: '#3DDC84' },
  
  // CMS & Content Platforms
  'wordpress': { icon: Di.DiWordpress, color: '#21759B' },
  'drupal': { icon: Si.SiDrupal, color: '#0678BE' },
  'joomla': { icon: Si.SiJoomla, color: '#5091CD' },
  'contentful': { icon: Si.SiContentful, color: '#2478CC' },
  'ghost': { icon: Si.SiGhost, color: '#15171A' },
  'sanity': { icon: Si.SiSanity, color: '#F03E2F' },
  
  // Design & UI Tools
  'figma': { icon: Si.SiFigma, color: '#F24E1E' },
  'sketch': { icon: Si.SiSketch, color: '#F7B500' },
  'photoshop': { icon: Si.SiAdobephotoshop, color: '#31A8FF' },
  'illustrator': { icon: Si.SiAdobeillustrator, color: '#FF9A00' },
  'xd': { icon: Si.SiAdobexd, color: '#FF61F6' },
  'invision': { icon: Si.SiInvision, color: '#FF3366' },
  'zeplin': { icon: Fa.FaPencilAlt, color: '#FDBD39' },
  
  // IDE & Editors
  'vscode': { icon: Fa.FaCode, color: '#007ACC' },
  'vs code': { icon: Fa.FaCode, color: '#007ACC' },
  'visual studio': { icon: Fa.FaCode, color: '#5C2D91' },
  'intellij': { icon: Fa.FaCode, color: '#000000' },
  'eclipse': { icon: Fa.FaCode, color: '#2C2255' },
  'sublime text': { icon: Fa.FaCode, color: '#FF9800' },
  'vim': { icon: Fa.FaTerminal, color: '#019733' },
  'emacs': { icon: Fa.FaTerminal, color: '#7F5AB6' },
  'vscode extension': { icon: Fa.FaCode, color: '#007ACC' },
  'vs code extensions': { icon: Fa.FaCode, color: '#007ACC' },
  'chrome extensions': { icon: Fa.FaChrome, color: '#4285F4' },
  
  // Code Quality & Formatting
  'eslint': { icon: Fa.FaCheck, color: '#4B32C3' },
  'prettier': { icon: Fa.FaCode, color: '#F7B93E' },
  'husky': { icon: Fa.FaGitAlt, color: '#E94E31' },
  
  // Monorepo Management
  'nx': { icon: Fa.FaCube, color: '#143055' },
  'turbo repo': { icon: Si.SiVercel, color: '#000000' }, // Using Vercel icon as Turbo is from Vercel
  
  // AI & ML
  'openai api': { icon: Si.SiOpenai, color: '#412991' }, 
  'openai': { icon: Si.SiOpenai, color: '#412991' }, 
  'claude api': { icon: Fa.FaRobot, color: '#5E5CFA' }, // Using robot icon as Anthropic doesn't have an official icon
  'claude': { icon: Fa.FaRobot, color: '#5E5CFA' }, // Using robot icon
  'ai integration': { icon: Fa.FaRobot, color: '#1A90FF' },
  'replit agent': { icon: Fa.FaTerminal, color: '#56676E' }, // Using terminal icon as fallback for Replit Agent
  'speechify': { icon: SpeechifyIcon, color: '#FF6B00' }, // Using custom Speechify icon
  
  // Architecture
  'atomic design': { icon: Fa.FaAtom, color: '#663399' },
  'clean code': { icon: Fa.FaCode, color: '#2D3748' },
  
  // Automation & Integration
  'zapier': { icon: Si.SiZapier, color: '#FF4A00' },
  'make': { icon: Fa.FaCog, color: '#00B4FF' }, // Using cog icon as fallback
  'n8n': { icon: Fa.FaRandom, color: '#6933FF' }, // Using random icon as fallback
  'ifttt': { icon: Si.SiIfttt, color: '#000000' }, // Adding IFTTT
  'buffer': { icon: Fa.FaBuffer, color: '#231F20' }, // Using Buffer icon
  
  // Social Media Platforms
  'facebook': { icon: Fa.FaFacebookF, color: '#1877F2' },
  'instagram': { icon: Fa.FaInstagram, color: '#E4405F' },
  'twitter': { icon: Fa.FaTwitter, color: '#1DA1F2' },
  'youtube': { icon: Fa.FaYoutube, color: '#FF0000' },
  'pinterest': { icon: Fa.FaPinterest, color: '#BD081C' },
};

/**
 * Custom component for testing technologies shown in the image
 * This provides better styling to match the image exactly
 */
const TestingIcon: React.FC<{ shortName: string; size?: number; color?: string }> = ({
  shortName,
  size = 24,
  color = '#3498DB', // Default blue color from the image
}) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color,
      color: 'white',
      borderRadius: '4px',
      width: `${size}px`,
      height: `${size}px`,
      fontSize: `${size * 0.45}px`,
      fontWeight: 600,
      textTransform: 'uppercase',
    }}>
      {shortName}
    </div>
  );
};

/**
 * A component that displays the icon for a given technology
 */
export const TechIcon: React.FC<TechIconProps> = ({
  name,
  size = 24,
  color,
  showLabel = false,
  labelPosition = 'bottom',
  className,
  onClick,
  showTooltip = true,
}) => {
  // Normalize the tech name for case-insensitive matching
  const normalizedName = name.toLowerCase().trim();
  
  // Look up the tech in our map
  const techData = TECH_ICON_MAP[normalizedName];
  
  if (techData) {
    const { icon: IconComponent, color: defaultColor } = techData;
    const iconColor = color || defaultColor;
    
    return (
      <S.TechIconContainer 
        className={className} 
        onClick={onClick ? () => onClick() : undefined}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
        title={showTooltip ? name : undefined}
        $labelPosition={labelPosition}
      >
        <S.IconWrapper>
          <IconComponent size={size} color={iconColor} />
        </S.IconWrapper>
        
        {showLabel && <S.TechLabel $labelPosition={labelPosition}>{name}</S.TechLabel>}
      </S.TechIconContainer>
    );
  }
  
  // Fallback for technologies without a defined icon
  return (
    <S.TechIconContainer 
      className={className} 
      onClick={onClick ? () => onClick() : undefined}
      title={showTooltip ? name : undefined}
      $labelPosition={labelPosition}
    >
      <S.FallbackContainer $bgColor={color} $size={size}>
        {name.substring(0, 2)}
      </S.FallbackContainer>
      
      {showLabel && <S.TechLabel $labelPosition={labelPosition}>{name}</S.TechLabel>}
    </S.TechIconContainer>
  );
};

export default TechIcon; 