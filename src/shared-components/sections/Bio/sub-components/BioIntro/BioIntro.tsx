import React from 'react';
import { motion } from 'framer-motion';
import { BioContent, fadeInUp } from '../../Bio.styles';

// Define the props interface directly in this file since there seems to be an issue with importing it
interface BioIntroProps {
  className?: string;
}

export const BioIntro: React.FC<BioIntroProps> = ({ className }) => {
  return (
    <BioContent className={className} id="bio-intro">
      <motion.p variants={fadeInUp}>
        David Mieloch isn&apos;t your typical software architect. He&apos;s a full-stack developer and team lead with a secret weapon: a lifelong immersion in the world of music. From a childhood surrounded by professional musicians (his father, a Settlement Music School and Temple University-trained percussionist, even studied with the legendary Allan Abel) to his own award-winning compositions, David&apos;s journey has been one of intricate structures and creative expression – a journey that led him naturally to the world of software architecture.
      </motion.p>
      
      <motion.p variants={fadeInUp}>
        At West Chester University, David didn&apos;t just earn a degree in Music Theory and Composition (2003-2008); he honed his ability to deconstruct complex systems, recognize patterns, and create elegant solutions. He mastered classical percussion and jazz drumset, developing the discipline, precision, and improvisational skills that are equally valuable in a coding environment. His secondary instruments? Piano, guitar, tabla – and, significantly, computer. This early exploration of music technology foreshadowed his future career, blending artistic creativity with technical prowess.
      </motion.p>
      
      <motion.p variants={fadeInUp}>
        David&apos;s compositions weren&apos;t just academic exercises. He won multiple awards for his orchestral works, demonstrating a knack for crafting intricate, layered systems – a skill that translates directly to designing robust and scalable software architectures. He studied composition with Rick Hall, a connection fostered by Philadelphia tabla legend Lenny Seidman, further deepening his understanding of musical structure and form. He didn&apos;t just practice music; he created at a higher level.
      </motion.p>
      
      <motion.p variants={fadeInUp}>
        This creative drive extended beyond the concert hall. David founded, and handled, a music organization called &quot;The Absurdist Revolution&quot; at West Chester, designing and presenting large scale, theatrical productions.
      </motion.p>
      
      <motion.p variants={fadeInUp}>
        While his father pursued Electrical Engineering at Drexel, solidifying the family&apos;s connection to both artistic and technical excellence, David found his own technical calling in software development. He channeled his passion for structure and problem-solving into mastering technologies like React.js, React Native, Node.js, and a wide range of other tools (as evidenced by his extensive skillset, from GraphQL to cloud platforms). He&apos;s not just a coder; he&apos;s a builder, a leader, and a mentor, spearheading technology adoption strategies and fostering a culture of technical excellence.
      </motion.p>
      
      <motion.p variants={fadeInUp}>
        David&apos;s experience isn&apos;t limited to theory. He&apos;s led the development of complex web and mobile applications at Scala, Inc., leveraging his architectural expertise to create solutions for projects like a Photoshop-like design tool for digital signage (Scala Cloud Platform) and an AI-powered audiobook creator (StoryTime). He&apos;s contributed to open-source projects and even built tools to enhance developer workflows (AI Context Generator, Code Companion). His resume shows all the projects he has contributed too, including We Learn Music Together: Mobile Game + Saas Platform, which highlights his passions. He brings the same meticulous attention to detail, iterative refinement, and collaborative spirit to software architecture that he honed through years of musical practice and performance. He understands that a well-designed system, like a well-composed symphony, is a harmonious blend of independent parts working together to achieve a powerful and unified whole.
      </motion.p>
      
      <motion.p variants={fadeInUp}>
        David&apos;s background isn&apos;t just a collection of skills; it&apos;s a unique perspective. He sees the parallels between orchestrating a musical performance and architecting a complex software system. He understands the importance of both the big picture and the smallest detail, the creative spark and the rigorous execution. If you&apos;re looking for a software architect who can bring both artistry and technical mastery to your project, let&apos;s connect.
      </motion.p>
    </BioContent>
  );
};

export default BioIntro; 