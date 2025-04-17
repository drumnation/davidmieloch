import { characteristicGridPositions, personaNavPositions, ctaPositions } from './Home.nodes';
import { CTALinkProps } from './Home.types';

// FSBP section content data
export const fsbpContent = {
  title: 'The Full-Stack Business Person',
  subtitle: 'Why the future belongs to multi-skilled professionals who leverage AI to perform roles previously done by specialists',
  introText: 'We\'re already witnessing the dawn of hyper-efficient organizations – AI-native companies achieving unprecedented results with remarkably small teams. The Full-Stack Business Person is someone who combines deep technical expertise with broad business acumen, leveraging AI to perform roles that previously required several specialists.',
  paradigmSection: {
    title: 'The New Paradigm of Work',
    items: [
      {
        title: 'AI Leverage & Market Proof',
        icon: 'trend',
        content: 'Crucially, <strong>AI\'s power is unlocked not just by technical skill, but by asking the right questions</strong>. An FSBP possesses the broad conceptual vocabulary spanning technology, product, marketing, and sales, allowing them to direct AI agents effectively across diverse tasks far beyond what a narrow specialist could achieve. This isn\'t just theory. We see companies like <strong>Midjourney (AI art)</strong> reaching <strong>$200M+ revenue with ~40 people</strong>, and <strong>Cursor (AI IDE)</strong> hitting <strong>~$100M ARR with only ~20</strong>. That\'s roughly <strong>$5 million in revenue per employee</strong> – orders of magnitude higher than the ~$125k median for SaaS startups. They achieve this through mass automation and leveraging AI infrastructure – capabilities best directed by those with holistic understanding.'
      },
      {
        title: 'The Need for Lean Team Navigators',
        icon: 'users',
        content: 'This revolution is forming in real-time as AI tools enhance human capabilities at an unprecedented pace. It\'s not about replacing entire teams, but about rethinking the entire structure of organizations that use conventional, AI-free, human-only knowledge worker armies. But these high-velocity teams don\'t run on AI alone. They require individuals who can bridge the gap – Full-Stack Business People who can wear multiple hats, <strong>operate effectively across domains</strong>, <strong>direct AI strategically</strong>, <strong>design scalable systems</strong>, and <strong>make the critical decisions</strong> needed to harness this new power. They are the architects and navigators of these lean organizations where <strong>communication overhead plummets</strong> and <strong>iteration speed accelerates</strong>.'
      },
      {
        title: 'Holistic Strategy & Value Creation',
        icon: 'layers',
        content: 'The FSBP brings together <strong>technical knowledge, business acumen, and the ability to direct AI tools</strong>. This creates unprecedented leverage in building and growing ventures. By understanding all aspects from code to customer, they avoid siloed thinking and <strong>translate between deep technical concepts and business strategy</strong> intuitively. This holistic view enables them to <strong>identify opportunities others miss</strong> and <strong>execute with unusual speed</strong> – seeing precisely where AI can be most effectively deployed. As AI tools become more powerful, this <strong>capacity for multi-domain thinking</strong> and the ability to steer AI to solve complex challenges becomes exponentially more valuable.'
      }
    ]
  },
  characteristics: {
    title: 'Key Characteristics of Full-Stack Business People',
    items: [
      {
        title: 'Technical Depth',
        icon: '💻',
        description: 'Deep knowledge of programming, systems architecture, and technical processes, unlike standard business roles.'
      },
      {
        title: 'Business Breadth',
        icon: '📊',
        description: 'Comprehensive understanding of business functions including marketing, finance, and growth strategy.'
      },
      {
        title: 'AI Orchestration',
        icon: '🤖',
        description: 'Expertise in prompt engineering and AI tool coordination, turning AI systems into amplifiers of expertise.'
      },
      {
        title: 'Systems Thinking',
        icon: '🔄',
        description: 'Recognition of entire systems with interconnected components and second-order effects.'
      },
      {
        title: 'First-Principles Reasoning',
        icon: '🔬',
        description: 'Reduction of complex situations to foundational elements, enabling creative solutions.'
      },
      {
        title: 'Communication Fluency',
        icon: '🗣️',
        description: 'Articulate explanation of technology to business stakeholders and business concepts to engineers.'
      }
    ]
  },
  ctaSection: {
    frameworks: {
      title: 'Ready to See Real-World Frameworks?',
      description: 'Explore practical frameworks for applying these concepts in your organization.',
      links: [
        {
          text: 'Enterprise AI Development Framework',
          href: '/enterprise-ai-development-framework',
          variant: 'secondary' as const
        },
        {
          text: 'React & Node.js Integration Practices',
          href: '/fullstack-react-best-practices-integration',
          variant: 'secondary' as const
        }
      ]
    },
    background: {
      title: 'Learn About My Background',
      description: 'See how I\'ve developed and applied the FSBP philosophy in my career.',
      links: [
        {
          text: 'Read My Bio',
          href: '/bio',
          variant: 'primary' as const
        },
        {
          text: 'View Projects',
          href: '/projects',
          variant: 'secondary' as const
        }
      ]
    },
    connect: {
      title: 'Connect With Me',
      description: 'Discuss opportunities for collaboration or consulting.',
      links: [
        {
          text: 'Contact Me',
          href: '/contact',
          variant: 'primary' as const
        },
        {
          text: 'LinkedIn Profile',
          href: 'https://www.linkedin.com/in/dmieloch/',
          variant: 'secondary' as const
        }
      ]
    }
  }
};

// Layout helpers
export const getCharacteristicPosition = (index: number, screenSize: 'desktop' | 'tablet' | 'mobile') => {
  return characteristicGridPositions[screenSize][index] || { row: 1, column: 1 };
};

export const getPersonaNavPosition = (index: number, screenSize: 'desktop' | 'mobile') => {
  return personaNavPositions[screenSize][index] || { order: 1 };
};

export const getCTAPosition = (section: 'frameworks' | 'background' | 'connect') => {
  return ctaPositions[section] || { order: 1 };
}; 