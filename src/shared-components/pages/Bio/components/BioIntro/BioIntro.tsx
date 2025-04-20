import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { BioContent as StyledBioContent } from '../../Bio.styles';
import { HeadingWrapper, BioTextContent } from './BioIntro.styles';
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

// Define the props interface
interface BioIntroProps {
  className?: string;
}

// The fadeIn variants for framer-motion
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// The delayed fadeIn variants for the second section
const delayedFadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.3
    }
  }
};

// Map of icon components for dynamic rendering
const IconMap = {
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
};

// Local definition of Intro Sections
interface LocalBioIntroSection {
  id: string;
  heading?: string;
  content: ReactNode;
  variants?: typeof fadeInVariants; // Optional variants for animation
}

const localBioIntroSections: LocalBioIntroSection[] = [
  {
    id: "bio-intro-opening",
    variants: fadeInVariants,
    content: (
      <p>
        David Mieloch isn&apos;t your typical software architect. He&apos;s a full-stack developer and team lead with a secret weapon: a lifelong immersion in the world of music. From a childhood surrounded by professional musicians to his own award-winning compositions, David&apos;s journey has been one of intricate structures and creative expression – a journey that led him naturally to the world of software architecture.
      </p>
    )
  },
  {
    id: "bio-early-life",
    heading: "Early Life and Musical Foundations",
    variants: delayedFadeInVariants, // Stagger animation
    content: (
      <p>
        At West Chester University, David earned a degree in Music Theory and Composition (2003-2008), honing his ability to deconstruct complex systems, recognize patterns, and create elegant solutions. He mastered classical percussion and jazz drumset, developing discipline, precision, and improvisational skills – all equally valuable in a coding environment. His secondary instruments included piano, guitar, tabla, and, significantly, computer. This early exploration of music technology foreshadowed his future, blending artistic creativity with technical prowess.
      </p>
    )
  },
  {
    id: "bio-composition",
    heading: "Composition and Creative Ventures",
    variants: delayedFadeInVariants,
    content: (
      <>
        <p>
          David&apos;s musical talents extended far beyond academic exercises. He won multiple awards for his orchestral works, demonstrating a knack for crafting intricate, layered systems – a skill directly transferable to designing robust and scalable software architectures. He studied composition with Rick Hall, a connection fostered by Philadelphia tabla legend Lenny Seidman, deepening his understanding of musical structure and form. His creative output was remarkably diverse: he wrote original music for musical theatre, created several works for choreographed modern dance productions, and earned professional readings and recordings of several chamber music and string orchestra pieces. He also founded and managed &quot;The Absurdist Revolution,&quot; a music organization at West Chester University, designing and presenting large-scale, theatrical productions.
        </p>
        <p>
          David recognizes a profound similarity between programming music and programming code. Both involve a precise sequence of instructions that must be followed correctly to achieve the desired outcome. He approaches both with an iterative process: writing, testing, refining, and repeating until the result is perfected. Just as a musical score for live musicians can become incredibly complex, requiring clear and accurate articulation of musical intentions for each instrument in a way that performers can readily understand, software code must be written not only to be executed by a computer but also to be read, understood, and modified by human developers. This dual requirement – functionality for the machine and clarity for humans – is central to David&apos;s approach to both music and software architecture. This clean code must be able to be read by other developers, just as a complex score must be able to be played by an orchestra.
        </p>
      </>
    )
  },
  {
    id: "bio-bridge-to-tech",
    heading: "A Bridge to Technology: Sales and Marketing",
    variants: delayedFadeInVariants,
    content: (
      <p>
        While his father pursued Electrical Engineering at Drexel, solidifying the family&apos;s connection to both artistic and technical excellence, David found his own technical calling, initially exploring tech sales and marketing. This experience provided invaluable insights into client needs, communication, and the broader business landscape – skills crucial for a software architect who must understand and address business requirements.
      </p>
    )
  },
  {
    id: "bio-return-to-eng",
    heading: "Return to Engineering and Software Expertise",
    variants: delayedFadeInVariants,
    content: (
      <p>
        David then made a decisive return to his technical roots, completing intensive programs at Flatiron School and channeling his passion for structure and problem-solving into mastering technologies like React.js, React Native, Node.js, and a wide range of other tools (as evidenced by his extensive skillset, from GraphQL to cloud platforms). He&apos;s not just a coder; he&apos;s a builder, a leader, and a mentor, spearheading technology adoption strategies and fostering a culture of technical excellence.
      </p>
    )
  },
  {
    id: "bio-achievements",
    heading: "Professional Achievements and Architectural Approach",
    variants: delayedFadeInVariants,
    content: (
      <p>
        David&apos;s experience isn&apos;t limited to theory. He&apos;s led the development of complex web and mobile applications at Scala, Inc. He architected a Photoshop-like design tool for digital signage using the Scala Cloud Platform. He contributed to open-source projects and even built tools to enhance developer workflows (AI Context Generator, Code Companion). He also was the tech lead for the award-winning React Native app, Master A Million™, a companion app for a toy sold in GameStop stores worldwide. He brings the same meticulous attention to detail, iterative refinement, and collaborative spirit to software architecture that he honed through years of musical practice and performance. He understands that a well-designed system, like a well-composed symphony, is a harmonious blend of independent parts working together to achieve a powerful and unified whole.
      </p>
    )
  },
  {
    id: "bio-perspective",
    heading: "A Unique Perspective",
    variants: delayedFadeInVariants,
    content: (
      <p>
        David&apos;s background isn&apos;t just a collection of skills; it&apos;s a unique perspective. He sees the parallels between orchestrating a musical performance and architecting a complex software system. He understands the importance of both the big picture and the smallest detail, the creative spark and the rigorous execution. If you&apos;re looking for a software architect who can bring both artistry and technical mastery to your project, let&apos;s connect.
      </p>
    )
  }
];

export const BioIntro: React.FC<BioIntroProps> = ({ className }) => {
  return (
    <StyledBioContent className={className}>
      {localBioIntroSections.map((section) => (
        <motion.div
          key={section.id}
          id={section.id}
          style={{ scrollMarginTop: '100px' }}
          initial="hidden"
          animate="visible"
          variants={section.variants || fadeInVariants}
        >
          {section.heading && (
            <HeadingWrapper>
              <h3>{section.heading}</h3>
            </HeadingWrapper>
          )}
          <BioTextContent>
            {section.content}
          </BioTextContent>
        </motion.div>
      ))}
    </StyledBioContent>
  );
};

export default BioIntro; 