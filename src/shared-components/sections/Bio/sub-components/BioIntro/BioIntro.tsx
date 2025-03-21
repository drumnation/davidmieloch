import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { BioContent } from '../../Bio.styles';
import { HeadingWrapper } from './BioIntro.styles';
import {
  IconCode,
  IconBuildingBridge,
  IconMusicCode,
  IconSchool,
  IconPuzzle,
  IconRocket,
  IconBrain,
  IconChartArcs,
  IconAward,
  IconBulb
} from '@tabler/icons-react';
import styled from 'styled-components';

// Define the props interface directly in this file since there seems to be an issue with importing it
interface BioIntroProps {
  className?: string;
}

// Create properly typed animated components
const AnimatedDiv = animated.div;
const AnimatedBioContent = animated(BioContent);

export const BioIntro: React.FC<BioIntroProps> = ({ className }) => {
  // Create fade-in animation with React Spring
  const [fadeInStyles, fadeInApi] = useSpring(() => ({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 280, friction: 60 },
    delay: 200
  }));

  // Create animation for icons section
  const [iconsStyles, iconsApi] = useSpring(() => ({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    config: { tension: 280, friction: 60 },
    delay: 500
  }));

  return (
    <BioContent className={className}>
      <AnimatedDiv 
        style={{
          opacity: fadeInStyles.opacity,
          transform: fadeInStyles.y.to(y => `translateY(${y}px)`)
        }}
      >
        <HeadingWrapper>
          <h2>Introduction</h2>
          <h3>A passionate technical leader with a history of building impactful solutions</h3>
        </HeadingWrapper>
        <p>
          With over a decade of experience in software development and technical leadership, I've
          had the privilege of working across a diverse range of projects and domains, from
          high-performance financial systems to cutting-edge machine learning applications.
        </p>
      </AnimatedDiv>

      <AnimatedDiv 
        style={{
          opacity: iconsStyles.opacity,
          transform: iconsStyles.y.to(y => `translateY(${y}px)`)
        }}
      >
        <div className="icon-grid">
          <div className="icon-item">
            <IconCode size={36} stroke={1.5} />
            <span>Software Architecture</span>
          </div>
          <div className="icon-item">
            <IconBuildingBridge size={36} stroke={1.5} />
            <span>System Design</span>
          </div>
          <div className="icon-item">
            <IconMusicCode size={36} stroke={1.5} />
            <span>Algorithm Development</span>
          </div>
          <div className="icon-item">
            <IconSchool size={36} stroke={1.5} />
            <span>Technical Mentorship</span>
          </div>
          <div className="icon-item">
            <IconPuzzle size={36} stroke={1.5} />
            <span>Problem Solving</span>
          </div>
          <div className="icon-item">
            <IconRocket size={36} stroke={1.5} />
            <span>Performance Optimization</span>
          </div>
          <div className="icon-item">
            <IconBrain size={36} stroke={1.5} />
            <span>Machine Learning</span>
          </div>
          <div className="icon-item">
            <IconChartArcs size={36} stroke={1.5} />
            <span>Data Visualization</span>
          </div>
          <div className="icon-item">
            <IconAward size={36} stroke={1.5} />
            <span>Technical Leadership</span>
          </div>
          <div className="icon-item">
            <IconBulb size={36} stroke={1.5} />
            <span>Innovation</span>
          </div>
        </div>

        <p>
          My approach combines technical excellence with practical business understanding, always
          focusing on delivering solutions that create real-world impact. I believe in continuous
          learning and adapting to new technologies while maintaining a focus on fundamental
          principles of good software design.
        </p>

        <p>
          Beyond my technical skills, I place a high value on collaboration, clear communication,
          and mentorship. I've found that the most successful projects are those where technical
          expertise is paired with strong interpersonal skills and a genuine commitment to
          team growth.
        </p>
      </AnimatedDiv>
    </BioContent>
  );
};

export default BioIntro; 