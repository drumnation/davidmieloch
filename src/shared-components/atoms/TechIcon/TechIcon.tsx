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

// Custom Web Audio API Icon
const WebAudioIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#3498DB' }) => {
  return (
    <div style={{ 
      width: `${size}px`, 
      height: `${size}px`, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'transparent'
    }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#3498DB"/>
        <path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="15" r="2" fill="white"/>
        <path d="M9 18L15 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
  );
};

// Custom SSML Icon
const SSMLIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#8E44AD' }) => {
  return (
    <div style={{ 
      width: `${size}px`, 
      height: `${size}px`, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'transparent'
    }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#8E44AD"/>
        <path d="M7 8H17L15 12H9L7 8Z" fill="white"/>
        <path d="M9 12L6 16H18L15 12" fill="white"/>
        <path d="M4 6L6 8L7 6H4Z" fill="white"/>
        <path d="M20 6L18 8L17 6H20Z" fill="white"/>
        <rect x="11" y="16" width="2" height="3" fill="white"/>
      </svg>
    </div>
  );
};

// Custom Udio Icon
const UdioIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#FF6347' }) => {
  return (
    <div style={{ 
      width: `${size}px`, 
      height: `${size}px`, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'transparent'
    }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#FF6347"/>
        <path d="M7 8C7 6.89543 7.89543 6 9 6C10.1046 6 11 6.89543 11 8V16C11 17.1046 10.1046 18 9 18C7.89543 18 7 17.1046 7 16V8Z" fill="white"/>
        <path d="M13 8C13 6.89543 13.8954 6 15 6C16.1046 6 17 6.89543 17 8V16C17 17.1046 16.1046 18 15 18C13.8954 18 13 17.1046 13 16V8Z" fill="white"/>
        <path d="M5 10H7V14H5V10Z" fill="white"/>
        <path d="M17 10H19V14H17V10Z" fill="white"/>
      </svg>
    </div>
  );
};

// Custom Refine Icon
const RefineIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#1890FF' }) => {
  return (
    <div style={{ 
      width: `${size}px`, 
      height: `${size}px`, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'transparent'
    }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#1890FF"/>
        <path d="M7 7H17V9H7V7Z" fill="white"/>
        <path d="M7 11H14V13H7V11Z" fill="white"/>
        <path d="M7 15H17V17H7V15Z" fill="white"/>
        <path d="M16 11L19 12L16 13V11Z" fill="white"/>
      </svg>
    </div>
  );
};

// Custom Deepseek Icon
const DeepseekIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#2563EB' }) => {
  return (
    <div style={{ 
      width: `${size}px`, 
      height: `${size}px`, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'transparent'
    }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#F4F4F5"/>
        <text x="5" y="16" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="#000">DE</text>
        <circle cx="5" cy="5" r="3" fill="#2563EB"/>
      </svg>
    </div>
  );
};

// Custom Anthropic Icon
const AnthropicIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#5E5CFA' }) => {
  return (
    <div style={{ 
      width: `${size}px`, 
      height: `${size}px`, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'transparent'
    }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#F4F4F5"/>
        <text x="5" y="16" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="#000">AN</text>
        <circle cx="5" cy="5" r="3" fill="#5E5CFA"/>
      </svg>
    </div>
  );
};

// Custom Google AI Icon
const GoogleAIIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#1A73E8' }) => {
  return (
    <div style={{ 
      width: `${size}px`, 
      height: `${size}px`, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'transparent'
    }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#F4F4F5"/>
        <text x="5" y="16" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="#000">GE</text>
        <circle cx="5" cy="5" r="3" fill="#1A73E8"/>
      </svg>
    </div>
  );
};

// Custom Google Gemini Icon
const GoogleGeminiIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#1A73E8' }) => {
  return (
    <div style={{ 
      width: `${size}px`, 
      height: `${size}px`, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'transparent'
    }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#F4F4F5"/>
        <text x="5" y="16" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="#000">GG</text>
        <circle cx="5" cy="5" r="3" fill="#1A73E8"/>
      </svg>
    </div>
  );
};

// Custom OpenAI Vision API Icon
const OpenAIVisionIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#10A37F' }) => {
  return (
    <div style={{ 
      width: `${size}px`, 
      height: `${size}px`, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'transparent'
    }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#10A37F"/>
        <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="2" fill="white"/>
        <path d="M12 5V7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 17V19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5 12H7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M17 12H19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  );
};

// Custom Plaid API Icon
const PlaidIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#2EAB7C' }) => {
  return (
    <div style={{ 
      width: `${size}px`, 
      height: `${size}px`, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'transparent'
    }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#2EAB7C"/>
        <rect x="6" y="6" width="5" height="5" rx="1" fill="white"/>
        <rect x="13" y="6" width="5" height="5" rx="1" fill="white"/>
        <rect x="6" y="13" width="5" height="5" rx="1" fill="white"/>
        <rect x="13" y="13" width="5" height="5" rx="1" fill="white" fillOpacity="0.5"/>
      </svg>
    </div>
  );
};

// Custom Chart.js Icon
const ChartJsIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#FF6384' }) => {
  return (
    <div style={{ 
      width: `${size}px`, 
      height: `${size}px`, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'transparent'
    }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#FF6384"/>
        <rect x="4" y="14" width="4" height="6" rx="1" fill="white"/>
        <rect x="10" y="10" width="4" height="10" rx="1" fill="white"/>
        <rect x="16" y="4" width="4" height="16" rx="1" fill="white"/>
        <path d="M4 9L8 6L13 8L20 4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  );
};

// Custom Date-fns Icon
const DateFnsIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#3D9DF5' }) => {
  return (
    <div style={{ 
      width: `${size}px`, 
      height: `${size}px`, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'transparent'
    }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#3D9DF5"/>
        <rect x="5" y="5" width="14" height="14" rx="2" stroke="white" strokeWidth="2"/>
        <path d="M5 9H19" stroke="white" strokeWidth="2"/>
        <path d="M9 5V3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M15 5V3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7.5 12L10 14.5L16.5 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};

// Custom Render.com Icon Component
const RenderIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#46E3B7' }) => {
  return (
    <div style={{ 
      width: `${size}px`, 
      height: `${size}px`, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'transparent'
    }}>
      <img 
        src="/media/icons/render-icon.svg" 
        alt="Render.com" 
        width={size} 
        height={size} 
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
};

// Custom WaveSurfer.js Icon
const WaveSurferIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#3598DB' }) => {
  return (
    <div style={{ 
      width: `${size}px`, 
      height: `${size}px`, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'transparent'
    }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#FFFFFF"/>
        <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" stroke="#E0E0E0" strokeOpacity="0.5"/>
        <circle cx="6" cy="12" r="2" fill="#3598DB"/>
        <path d="M4 13.5C4 13.5 5 16 6 16C7 16 8 13.5 9 13.5C10 13.5 11 16 12 16C13 16 14 10 15 10C16 10 17 13.5 18 13.5C19 13.5 20 12 20 12" stroke="#3598DB" strokeWidth="1.5" strokeLinecap="round"/>
        <text x="12" y="21" textAnchor="middle" fontSize="4" fill="#3598DB" fontWeight="bold">WS</text>
      </svg>
    </div>
  );
};

// Custom Monaco Editor Icon
const MonacoEditorIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#0078D7' }) => {
  return (
    <div style={{ 
      width: `${size}px`, 
      height: `${size}px`, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'transparent'
    }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#FFFFFF"/>
        <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" stroke="#E0E0E0" strokeOpacity="0.5"/>
        <path d="M12 4L20 12L12 20L4 12L12 4Z" fill="#FFFFFF" stroke="#0078D7" strokeWidth="1.5"/>
        <path d="M9 10L11 12L9 14" stroke="#0078D7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 10L13 12L15 14" stroke="#0078D7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="12" y="21" textAnchor="middle" fontSize="4" fill="#0078D7" fontWeight="bold">ME</text>
      </svg>
    </div>
  );
};

// Custom Suno Icon
const SunoIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#2374E1' }) => {
  return (
    <div style={{ 
      width: `${size}px`, 
      height: `${size}px`, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'transparent'
    }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#2374E1"/>
        <text x="12" y="17" textAnchor="middle" fontSize="12" fontFamily="sans-serif" fill="white" fontWeight="bold">su</text>
      </svg>
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
  'monaco editor': { icon: MonacoEditorIcon, color: '#0078D7' },
  
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
  'claude api': { icon: AnthropicIcon, color: '#5E5CFA' }, 
  'claude': { icon: AnthropicIcon, color: '#5E5CFA' }, 
  'anthropic': { icon: AnthropicIcon, color: '#5E5CFA' }, 
  'ai integration': { icon: Fa.FaRobot, color: '#1A90FF' },
  'replit agent': { icon: Fa.FaTerminal, color: '#56676E' }, 
  'speechify': { icon: SpeechifyIcon, color: '#FF6B00' }, 
  'deepseek': { icon: DeepseekIcon, color: '#2563EB' }, 
  'google ai': { icon: GoogleAIIcon, color: '#1A73E8' }, 
  'google gemini': { icon: GoogleAIIcon, color: '#1A73E8' }, 
  'gemini': { icon: GoogleAIIcon, color: '#1A73E8' }, 
  'openai vision api': { icon: OpenAIVisionIcon, color: '#10A37F' },
  'suno': { icon: SunoIcon, color: '#2374E1' },
  
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
  
  // Platforms & Services
  'render.com': { icon: RenderIcon, color: '#46E3B7' },
  'render': { icon: RenderIcon, color: '#46E3B7' },
  
  // Custom Technologies
  'web audio api': { icon: WebAudioIcon, color: '#3498DB' },
  'ssml': { icon: SSMLIcon, color: '#8E44AD' },
  'udio': { icon: UdioIcon, color: '#F39C12' },
  'refine': { icon: RefineIcon, color: '#1890FF' },
  'plaid api': { icon: PlaidIcon, color: '#2EAB7C' },
  'chart.js': { icon: ChartJsIcon, color: '#FF6384' },
  'date-fns': { icon: DateFnsIcon, color: '#3D9DF5' },
  'wavesurfer.js': { icon: WaveSurferIcon, color: '#3598DB' },
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