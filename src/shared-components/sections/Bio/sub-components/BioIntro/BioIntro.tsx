import React from 'react';
import { motion } from 'framer-motion';
import { BioContent, fadeInUp } from '../../Bio.styles';
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

// Define the props interface directly in this file since there seems to be an issue with importing it
interface BioIntroProps {
  className?: string;
}

export const BioIntro: React.FC<BioIntroProps> = ({ className }) => {
  return (
    <BioContent className={className} id="bio-intro">
      <HeadingWrapper variants={fadeInUp}>
        <IconCode />
        <motion.h3>The Composer Who Codes</motion.h3>
      </HeadingWrapper>
      <motion.p variants={fadeInUp}>
        David Mieloch brings a rare combination of disciplines to software architecture: the precision of a percussionist, the creativity of a composer, the strategic thinking of a marketer, and the customer-focused mindset of a sales professional. His journey began in the 90s, where a unique blend of musical heritage and technological curiosity set the foundation for his multifaceted career.
      </motion.p>
      
      <HeadingWrapper variants={fadeInUp}>
        <IconBuildingBridge />
        <motion.h3>Early Foundations</motion.h3>
      </HeadingWrapper>
      <motion.p variants={fadeInUp}>
        Born into a family where technology and music intertwined naturally, David's father—an electrical engineer specializing in piezoelectric film technology used in early Gibson guitars—showed him how engineering and music could harmoniously coexist. While his parents ran a successful wedding band for 16 years (his father on drums, mother as lead vocalist), young David was already exploring the intersection of technology and creativity, building computers from scratch and mastering DOS troubleshooting by age 13.
      </motion.p>

      <HeadingWrapper variants={fadeInUp}>
        <IconMusicCode />
        <motion.h3>Digital Beginnings</motion.h3>
      </HeadingWrapper>
      <motion.p variants={fadeInUp}>
        His early technical journey began with HTML coding at age 13, building websites for an insurance company with knowledge gleaned from company-provided books. Simultaneously, he explored early computer-based music composition through Mode Edit, a tracker software where he learned to compose using octave notation on a 16-note grid—an early glimpse into how technology could enhance musical creation. This hands-on experience with both hardware and software—from configuring jumpers and installing memory to crafting digital compositions—laid the groundwork for his future in software architecture.
      </motion.p>

      <HeadingWrapper variants={fadeInUp}>
        <IconSchool />
        <motion.h3>Musical Journey</motion.h3>
      </HeadingWrapper>
      <motion.p variants={fadeInUp}>
        David's musical path was equally diverse and formative. From playing drums in a hardcore metal band to performing in his high school jazz ensemble, singing in choir, and marching with the drumline, he developed a deep understanding of different musical structures and collaborative dynamics. These varied musical experiences, combined with his early exposure to computer-generated music, gave him a unique perspective on how different systems could work together harmoniously—a principle that would later become central to his approach to software architecture.
      </motion.p>

      <HeadingWrapper variants={fadeInUp}>
        <IconPuzzle />
        <motion.h3>Academic Evolution</motion.h3>
      </HeadingWrapper>
      <motion.p variants={fadeInUp}>
        At West Chester University (2003-2008), David earned his degree in Music Theory and Composition, where analyzing complex musical scores taught him to deconstruct intricate systems and identify patterns—skills that directly translate to software architecture. His composition studies went far beyond just writing music; they demanded mastery of a sophisticated communication system that parallels modern software development. Just as developers must write code that both computers and humans can understand, David learned to create orchestral scores that could effectively communicate with up to 80 different instrumental parts simultaneously, each requiring instrument-specific notation and considerations.
      </motion.p>

      <HeadingWrapper variants={fadeInUp}>
        <IconRocket />
        <motion.h3>Professional Synthesis</motion.h3>
      </HeadingWrapper>
      <motion.p variants={fadeInUp}>
        This experience in orchestral composition developed his expertise in managing complex, interconnected systems. Like a well-architected codebase, each orchestral score required careful consideration of individual components (instruments) while maintaining overall system coherence. He learned to write "code" that respected each instrument's capabilities and conventions—similar to how software architects must consider platform-specific constraints and best practices. The success of his compositions relied not just on creative vision, but on his ability to communicate effectively through musical notation, ensuring each performer could interpret and execute their part within the larger system—a skill that directly parallels writing maintainable, well-documented code for development teams.
      </motion.p>

      <HeadingWrapper variants={fadeInUp}>
        <IconAward />
        <motion.h3>Drive and Achievement</motion.h3>
      </HeadingWrapper>
      <motion.p variants={fadeInUp}>
        David's exceptional work ethic and ability to deliver under pressure became evident during his college years. Faced with multiple opportunities—a brass quintet competition, a prestigious Orchestra 2001 competition at Swarthmore, and a crucial Counterpoint class assignment—he demonstrated remarkable focus and efficiency. In a single intensive weekend, he composed a sophisticated sonata for string orchestra that he then skillfully adapted for brass quintet. The results were extraordinary: his work earned him an A in his course, won the brass quintet competition securing a professional ensemble performance, and claimed victory in the Orchestra 2001 competition, leading to a performance and recording by a 50-100 piece string orchestra. This ability to work efficiently under pressure while maintaining exceptional quality now defines his approach to complex software architecture challenges.
      </motion.p>

      <HeadingWrapper variants={fadeInUp}>
        <IconBrain />
        <motion.h3>Technical Renaissance</motion.h3>
      </HeadingWrapper>
      <motion.p variants={fadeInUp}>
        Following his marketing success, David deepened his technical expertise through intensive study at the Flatiron School, mastering React, Redux, and Ruby on Rails. At Gramercy Tech, he single-handedly developed an award-winning React Native platform that earned "Best of NYC Toy Fair" from Parents' Magazine and "Activity Toy of the Year" at the Swedish Toy Awards. His innovative work extended to creating interactive applications for high-profile clients like TD/Ameritrade and Novartis Pharma, while also contributing to the open-source community with his react-native-cross-platform-dimensions package.
      </motion.p>

      <HeadingWrapper variants={fadeInUp}>
        <IconChartArcs />
        <motion.h3>Architectural Leadership</motion.h3>
      </HeadingWrapper>
      <motion.p variants={fadeInUp}>
        For the past five years at Scala, David has exemplified technical leadership while spearheading the re-architecture of their flagship Designer product and Scala Cloud Platform. Leading a team of five developers, he's driven the adoption of modern React patterns, TypeScript, and Atomic Design principles through regular code reviews and one-on-ones. His comprehensive approach to documentation, including detailed JIRA tickets with user stories and technical specifications, has established clear communication channels across the organization.
      </motion.p>

      <HeadingWrapper variants={fadeInUp}>
        <IconBulb />
        <motion.h3>Impact & Innovation</motion.h3>
      </HeadingWrapper>
      <motion.p variants={fadeInUp}>
        Under his guidance, the team has successfully delivered critical features including a template builder tool, device monitoring module, Node.js microservices, and a 24-hour scheduled projects player. His focus on mentorship and code quality has been instrumental in scaling the codebase for sustainable growth, while his expertise in React, TypeScript, and test-driven development has elevated the team's technical capabilities. This combination of technical excellence and leadership has been crucial in maintaining Scala's position as a global leader in stable, secure network deployment at scale.
      </motion.p>

      <HeadingWrapper variants={fadeInUp}>
        <IconBulb />
        <motion.h3>The Value Proposition</motion.h3>
      </HeadingWrapper>
      <motion.p variants={fadeInUp}>
        For organizations seeking more than just technical expertise, David offers a transformative approach to software architecture. He brings the ear of a musician—attentive to the smallest details while never losing sight of the overall composition. He applies the discipline of a percussionist—maintaining precise timing and coordination across components. He leverages the customer focus of a sales professional—ensuring solutions address genuine user needs. And he utilizes the strategic thinking of a marketer—aligning technical decisions with business objectives. When deadlines tighten and requirements shift, the improvisational skills from his jazz background enable rapid adaptation without sacrificing quality.
      </motion.p>
    </BioContent>
  );
};

export default BioIntro; 