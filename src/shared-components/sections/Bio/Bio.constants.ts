import React, { ReactNode } from 'react';
import { MediaItem } from './Bio.types';

export const BIO_TITLE = "David Mieloch: Orchestrating Code, Composing Solutions";

export const BIO_CONTENT: ReactNode = React.createElement(
  React.Fragment,
  null,
  React.createElement(
    'p',
    null,
    "David Mieloch isn't your typical software architect. He's a full-stack developer and team lead with a secret weapon: a lifelong immersion in the world of music. From a childhood surrounded by professional musicians (his father, a Settlement Music School and Temple University-trained percussionist, even studied with the legendary Allan Abel) to his own award-winning compositions, David's journey has been one of intricate structures and creative expression – a journey that led him naturally to the world of software architecture."
  ),
  React.createElement(
    'p',
    null,
    "At West Chester University, David didn't just earn a degree in Music Theory and Composition (2003-2008); he honed his ability to deconstruct complex systems, recognize patterns, and create elegant solutions. He mastered classical percussion and jazz drumset, developing the discipline, precision, and improvisational skills that are equally valuable in a coding environment. His secondary instruments? Piano, guitar, tabla – and, significantly, computer. This early exploration of music technology foreshadowed his future career, blending artistic creativity with technical prowess."
  ),
  React.createElement(
    'p',
    null,
    "David's compositions weren't just academic exercises. He won multiple awards for his orchestral works, demonstrating a knack for crafting intricate, layered systems – a skill that translates directly to designing robust and scalable software architectures. He studied composition with Rick Hall, a connection fostered by Philadelphia tabla legend Lenny Seidman, further deepening his understanding of musical structure and form. He didn't just practice music; he created at a higher level."
  ),
  React.createElement(
    'p',
    null,
    "This creative drive extended beyond the concert hall. David founded, and handled, a music organization called \"The Absurdist Revolution\" at West Chester, designing and presenting large scale, theatrical productions."
  ),
  React.createElement(
    'p',
    null,
    "While his father pursued Electrical Engineering at Drexel, solidifying the family's connection to both artistic and technical excellence, David found his own technical calling in software development. He channeled his passion for structure and problem-solving into mastering technologies like React.js, React Native, Node.js, and a wide range of other tools (as evidenced by his extensive skillset, from GraphQL to cloud platforms). He's not just a coder; he's a builder, a leader, and a mentor, spearheading technology adoption strategies and fostering a culture of technical excellence."
  ),
  React.createElement(
    'p',
    null,
    "David's experience isn't limited to theory. He's led the development of complex web and mobile applications at Scala, Inc., leveraging his architectural expertise to create solutions for projects like a Photoshop-like design tool for digital signage (Scala Cloud Platform) and an AI-powered audiobook creator (StoryTime). He's contributed to open-source projects and even built tools to enhance developer workflows (AI Context Generator, Code Companion). His resume shows all the projects he has contributed too, including We Learn Music Together: Mobile Game + Saas Platform, which highlights his passions. He brings the same meticulous attention to detail, iterative refinement, and collaborative spirit to software architecture that he honed through years of musical practice and performance. He understands that a well-designed system, like a well-composed symphony, is a harmonious blend of independent parts working together to achieve a powerful and unified whole."
  ),
  React.createElement(
    'p',
    null,
    "David's background isn't just a collection of skills; it's a unique perspective. He sees the parallels between orchestrating a musical performance and architecting a complex software system. He understands the importance of both the big picture and the smallest detail, the creative spark and the rigorous execution. If you're looking for a software architect who can bring both artistry and technical mastery to your project, let's connect."
  )
);

export const TIMELINE_ITEMS = [
  {
    year: '2003-2008',
    title: 'West Chester University',
    description: 'Earned a degree in Music Theory and Composition, developing skills in pattern recognition and complex system design through musical composition.'
  },
  {
    year: '2008-2012',
    title: 'Early Career & Transition to Tech',
    description: 'Began applying compositional thinking to software development, learning programming fundamentals and building early projects.'
  },
  {
    year: '2012-Present',
    title: 'Software Architecture & Leadership',
    description: 'Led development of complex web and mobile applications, specializing in React ecosystem and architectural design patterns.'
  }
];

export const SKILLS = [
  'React.js',
  'React Native',
  'Node.js',
  'TypeScript',
  'GraphQL',
  'AWS',
  'Azure',
  'System Architecture',
  'Team Leadership',
  'UI/UX Design',
  'Agile Methodologies',
  'CI/CD',
  'Performance Optimization',
  'Scalable Systems',
  'AI Integration'
];

export const MEDIA_ITEMS: MediaItem[] = [
  {
    type: 'youtube',
    url: 'https://www.youtube.com/embed/PSdwU6fIr_A',
    title: 'Live Performance with Oneironaught',
    description: 'Progressive metal instrumental performance featuring David on drums with Brooklyn-based band Oneironaught.'
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/embed/KQsg_Iz3Ap8',
    title: 'Volcanas (Allegro)',
    description: 'Award-winning orchestral composition showcasing David\'s classical music training and orchestration skills.'
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/embed/Az7-sY2zhxU',
    title: 'Merry Melony Episode 1',
    description: 'Original score composition for animation, demonstrating David\'s work in video game and film music.'
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/embed/phfBe8sSBBM',
    title: 'The Animator and the Seat',
    description: 'Original score for animated short film, highlighting David\'s compositional versatility and storytelling through music.'
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/embed/KSgeRQJn_Tw',
    title: 'Scarlet Harvest (Contemporary Dance Performance)',
    description: 'Original composition for contemporary dance, demonstrating David\'s collaborative work across artistic disciplines.'
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/embed/nQZPHdVNiaQ',
    title: 'Absurdist Revolution - Mark 1',
    description: 'Theatrical music production at West Chester University, showcasing David\'s creative direction and organization skills.'
  }
]; 