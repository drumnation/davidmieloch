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
        I did not come to software in a straight line. I came through music, small business work, sales calls, marketing experiments, and a long stretch of trying to understand how complicated systems hold together. Software eventually became the place where all of that made sense: structure, taste, iteration, communication, and the pressure to make something real.
      </p>
    )
  },
  {
    id: "bio-early-life",
    heading: "Early Life and Musical Foundations",
    variants: delayedFadeInVariants, // Stagger animation
    content: (
      <p>
        I studied Music Theory and Composition at West Chester University from 2003 to 2008. That meant a lot of writing, listening, rewriting, and learning how to hold a large structure in my head without losing the details. I studied classical percussion and jazz drumset, and I spent time with piano, guitar, tabla, and computer music. The computer was not the side note for long. It became another instrument.
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
          I wrote orchestral music, chamber music, music for theater, and music for choreographed modern dance. Some of it won awards. Some of it was read by professional musicians. All of it taught me the same lesson: a complicated idea only works if other people can understand how to perform it.
        </p>
        <p>
          I studied composition with Rick Hall, through a connection with Philadelphia tabla legend Lenny Seidman. I also started and ran The Absurdist Revolution at West Chester, which was part music organization, part production lab, and part excuse to make strange ambitious things with other people.
        </p>
        <p>
          The connection between music and code is not mystical to me. A score is a set of instructions. Code is also a set of instructions. Both can technically be correct and still feel wrong. Both have to work for the machine and for the human beings trying to read, perform, maintain, or change them.
        </p>
        <p>
          That is still how I think about software. The system has to run, but it also has to explain itself well enough that another person can enter it without getting lost.
        </p>
      </>
    )
  },
  {
    id: "bio-bridge-to-tech",
    heading: "A Bridge to Technology: Sales and Marketing",
    variants: delayedFadeInVariants,
    content: (
      <>
        <p>
          Before I was a full-time engineer, I spent years around sales, marketing, websites, and client work. That part of my background used to feel disconnected from engineering. It does not anymore.
        </p>
        <p>
          It taught me how people talk about problems when they are not thinking in code. It taught me how vague business needs become actual requirements. It also taught me how often the hard part is not building the thing, but figuring out what the thing is supposed to do for someone.
        </p>
      </>
    )
  },
  {
    id: "bio-return-to-eng",
    heading: "Return to Engineering and Software Expertise",
    variants: delayedFadeInVariants,
    content: (
      <>
        <p>
          Eventually I moved fully into engineering. I went through Flatiron School, then spent the next several years building with React, React Native, Node.js, GraphQL, cloud platforms, and the usual mess of tools that real products accumulate.
        </p>
        <p>
          I like building software, but I am usually most interested in the system around the software: how the work is broken down, how teams make decisions, how quality is protected, and how tools change what a small group of people can actually do.
        </p>
      </>
    )
  },
  {
    id: "bio-achievements",
    heading: "Professional Achievements and Architectural Approach",
    variants: delayedFadeInVariants,
    content: (
      <>
        <p>
          At Scala, I led work on complex web and mobile applications, including a Photoshop-like design tool for digital signage on the Scala Cloud Platform. I was also tech lead on Master A Million, an award-winning React Native companion app for a toy sold through GameStop.
        </p>
        <p>
          More recently, I have been building tools for AI-assisted development and agent workflows, including AI Context Generator and Code Companion. That work turned into a larger obsession: how to move from one person prompting an AI assistant into something more like a software factory, where agents, tests, review, memory, observability, and human judgment all have a place.
        </p>
      </>
    )
  },
  {
    id: "bio-perspective",
    heading: "A Unique Perspective",
    variants: delayedFadeInVariants,
    content: (
      <>
        <p>
          I do not think of my background as a neat stack of credentials. It is messier than that, but useful. Music taught me structure. Sales and marketing taught me how people describe value. Engineering taught me how unforgiving reality is when the system actually has to run.
        </p>
        <p>
          The thread through all of it is that I care about systems that can be understood, improved, and operated by real people. That is the work I keep coming back to.
        </p>
      </>
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
