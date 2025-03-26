import { ExperienceItem } from './ExperienceSection.types';

export const SECTION_TITLE = 'Professional Experience';

export const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    company: 'Scala',
    title: 'Senior Software Engineer, Frontend Lead',
    location: 'Malvern, PA',
    startDate: 'Mar 2020',
    endDate: 'Present',
    description: 'With 31 years of experience in the digital signage industry, Scala is known globally as the leader in stable, secure network deployment at scale',
    bulletPoints: [
      'Lead a team of 5 developers in adopting modern React patterns, TypeScript, and Atomic Design principles.',
      'Conduct regular code reviews and one-on-ones to boost efficiency, code quality, and team performance.',
      'Spearhead the re-architecture of Scala flagship "Designer" graphic design product and the Scala Cloud Platform.',
      'Align cross-functional teams with strategic business goals.',
      'Author detailed JIRA tickets with comprehensive user stories, technical specifications, and acceptance criteria.',
      'Manage the development of key features, including a template builder tool and device monitoring module.',
      'Build Node.js microservices and 24-hour scheduled project player.',
      'Mentor developers and ensure high code quality.',
      'Guide the organization in scaling the codebase to support sustainable growth and long-term maintainability.'
    ],
    logoPath: '/company-logos/scala.jpeg'
  },
  {
    company: 'DrayNow, Inc.',
    title: 'Senior Software Engineer',
    location: 'Conshohocken, PA',
    startDate: 'Apr 2019',
    endDate: 'Mar 2020',
    description: 'DrayNow is the first real-time marketplace for seamlessly connecting intermodal freight and carriers.',
    bulletPoints: [
      'Led critical rewrite of React Native app, delivering a stable, feature-complete solution using TypeScript and TDD.',
      'Stepped in after external team missed deadlines.',
      'Managed both internal and external development teams, introducing structured workflows and improving communication.',
      'Converted five major areas of web platform to atomic design patterns, leading to a 30% reduction in bugs.',
      'Achieved 25% increase in developer productivity through architectural improvements.',
      'Mentored five junior engineers, reducing onboarding time by 40%.',
      'Contributed to 30% faster completion of major project milestones.',
      'Enhanced team collaboration through structured development workflows.',
      'Improved communication between remote teams.'
    ],
    logoPath: '/company-logos/draynow_inc_logo.jpeg'
  },
  {
    company: 'OTG Management',
    title: 'Senior Frontend Engineer',
    location: 'New York, NY',
    startDate: 'Jun 2018',
    endDate: 'Jul 2019',
    description: 'OTG operates the largest fleet of centrally managed, public facing iPads (10K+ iPads), located in airports around the US',
    bulletPoints: [
      'Developed full-stack "Order Ahead" web app, enabling passengers to order food from airport restaurants for gate-side pickup.',
      'Integrated dynamic menu data across national locations, driving a 20% increase in order throughput and customer transactions.',
      'Reimplemented critical cart screen in JavaScript for the OTG iOS app Concierge, enabling over-the-air updates to thousands of iPads nationwide.',
      'Facilitated 30% faster feature rollouts, enhanced customizability, and eliminated the need for time-consuming manual updates across terminals.',
      'Developed template-driven ad system for OTG iOS app, boosting campaign update speed by 50% and user engagement by 15%.',
      'Coordinated with various teams to implement best practices in code development and project management.',
      'Fostered improved collaboration and efficiency across the organization.'
    ],
    logoPath: '/company-logos/otg_management_logo.jpeg'
  },
  {
    company: 'Gramercy Tech',
    title: 'Full Stack Developer',
    location: 'New York, NY',
    startDate: 'Jul 2017',
    endDate: 'Jun 2018',
    description: 'Gramercy Tech specializes in innovative event technology solutions, including event management apps and immersive AR/VR experiences.',
    bulletPoints: [
      'Solely developed award-winning React Native app (iOS/Android) and web app for Master A Million Platform.',
      'The app and toy won "Best of NYC Toy Fair" (Parents Magazine) and "Activity Toy of the Year" (Swedish Toy Awards).',
      'Developed interactive applications and backend systems for high-profile events (TD/Ameritrade, Novartis Pharma, Jack Daniels).',
      'Enhanced attendee experiences through intuitive and engaging event technology.',
      'Created and published react-native-cross-platform-dimensions npm package (25 Stars / 5 Forks) to enhance development efficiency.'
    ],
    logoPath: '/company-logos/gramercytech_logo.jpeg'
  },
];

export const OLDER_EXPERIENCE: ExperienceItem[] = [
  {
    company: 'UniqueSound (Techstars NYC 15)',
    title: 'Head of Growth',
    location: 'New York, NY',
    startDate: 'Sep 2015',
    endDate: 'Feb 2016',
    description: 'UniqueSound was an innovative platform connecting content creators with curated music composers, enabling composers and sound designers to showcase their work and get hired by global brands.',
    bulletPoints: [
      'Developed persona-driven landing pages that significantly boosted creator marketplace platform growth.',
      'Tailored content to attract and engage targeted audiences.',
      'Built and led a team of bloggers to produce high-quality, original content.',
      'Drove a substantial increase in site traffic and user engagement from target personas.',
      'Managed and optimized search and social advertising budget.',
      'Effectively promoted original content through digital ads, resulting in higher ROI and increased brand visibility.'
    ],
    logoPath: '/company-logos/uniquesound.png'
  },
  {
    company: 'Saturn Business Systems',
    title: 'Digital Marketing Manager',
    location: 'New York, NY',
    startDate: 'Feb 2013',
    endDate: 'Sep 2015',
    description: 'Saturn Business Systems provides integrated IT solutions, including data center and cloud solutions, big data analytics, and cybersecurity.',
    bulletPoints: [
      'Designed a new company website and implemented a HubSpot blog for content marketing.',
      'Enhanced the company digital footprint and lead generation capabilities.',
      'Sourced and developed data governance experts into thought-leaders and sales consultants.',
      'Strengthened the company reputation and drove industry influence.',
      'Produced a comprehensive suite of sales materials, including white papers, case studies, videos, blogs, and data sheets.',
      'Empowered the sales team with compelling content to drive conversions and client engagement.'
    ],
    logoPath: '/company-logos/saturn_business_systems_logo.jpeg'
  },
  {
    company: 'Graphnet',
    title: 'Marketing Manager and Frontend Developer',
    location: 'New York, NY',
    startDate: 'Jan 2012',
    endDate: 'Feb 2013',
    description: 'Graphnet provides telecommunications services and solutions.',
    bulletPoints: [
      'Designed and implemented a comprehensive marketing strategy, enhancing the sales process.',
      'Created compelling collateral that drove brand visibility and engagement.',
      'Generated $50,000 in monthly recurring revenue within the first few months of campaign launches.',
      'Built and optimized high-conversion landing pages.',
      'Managed a steady pipeline of inbound leads and efficiently distributed them to the sales team.',
      'Designed professional white papers, case studies, and data sheets using Adobe Photoshop.',
      'Provided the sales team with persuasive tools to secure client deals.'
    ],
    logoPath: '/company-logos/graphnet.jpeg'
  },
  {
    company: 'Kwikpoint',
    title: 'Frontend Web Developer',
    location: 'Alexandria, VA',
    startDate: 'Jan 2011',
    endDate: 'Mar 2016',
    description: 'Kwikpoint specializes in the creation of visual language communication tools that help bridge language barriers, widely used in military, healthcare, and emergency response.',
    bulletPoints: [
      'Led a team in the creation of a comprehensive website and online store.',
      'Ensured seamless functionality and user experience, while providing ongoing support.',
      'Designed and optimized landing pages for email marketing campaigns.',
      'Increased conversion rates and customer engagement through strategic design.',
      'Managed the addition of new products and maintained the e-commerce platform.',
      'Improved sales efficiency and user experience through continuous enhancements.'
    ],
    logoPath: '/company-logos/kwikpoint.jpeg'
  },
  {
    company: 'Q-nomy, Inc.',
    title: 'Business Development Manager',
    location: 'New York, NY',
    startDate: 'Jan 2011',
    endDate: 'Dec 2011',
    description: 'Q-nomy provides customer journey and queue management solutions for organizations.',
    bulletPoints: [
      'Drove Product Adoption: Effectively scheduled and conducted product demos for company software, digital signage, and proprietary kiosks, showcasing the value and capabilities to potential clients.',
      'Led High-Stakes Sales Presentations: Delivered compelling technical sales presentations to groups of decision makers via WebEx, influencing purchasing decisions and driving sales growth.',
      'Strategically Targeted Executives: Utilized Jigsaw to identify and target C-level executives, crafting and A/B testing personalized MailChimp email templates to maximize engagement and conversion rates.'
    ],
    logoPath: '/company-logos/qnomy.jpeg'
  },
  {
    company: 'Edit.com',
    title: 'B2B Website Sales Consultant',
    location: 'Brookyln, NY',
    startDate: 'Feb 2010',
    endDate: 'Dec 2010',
    description: 'Edit.com provided website development and digital marketing services for small businesses.',
    bulletPoints: [
      'Optimized Client Campaigns: Developed high-conversion landing pages for client marketing campaigns, enhancing online engagement and lead generation.',
      'Exceeded Sales Targets: Consistently met and exceeded sales quotas by self-generating leads, scheduling, and leading persuasive sales presentations.',
      'Consultative Sales Excellence: Demonstrated a consultative sales approach, creating tailored web strategies that addressed client needs and drove business growth.'
    ],
    logoPath: '/company-logos/editcom.jpeg'
  },
  {
    company: 'The Harmony Channel',
    title: 'Frontend Developer',
    location: 'Greater Philadelphia Area',
    startDate: 'Aug 2006',
    endDate: 'Sep 2007',
    description: 'The Harmony Channel was an on-demand visual music television network.',
    bulletPoints: [
      'Created Dynamic Marketing Website: Developed a visually engaging marketing website for an on-demand visual music television network, enhancing online presence and user experience.',
      'Streamlined Digital Content Management: Managed and optimized digital content, edited video, and formatted video files for seamless streaming, improving content delivery and viewer satisfaction.'
    ],
    logoPath: '/company-logos/harmony.png'
  },
  {
    company: 'West Chester Off-Campus Housing',
    title: 'Lead Network Admin and Computer Repair Specialist',
    location: 'Greater Philadelphia Area',
    startDate: 'Jun 2004',
    endDate: 'Jul 2006',
    description: 'West Chester Off-Campus Housing provided student housing near West Chester University.',
    bulletPoints: [
      'Developed and Maintained Marketing Website: Designed and continuously updated the company\'s marketing website, enhancing online visibility and user engagement.',
      'Managed Large-Scale Network Infrastructure: Efficiently supported a complex network of over 400 nodes, providing reliable internet connectivity to a 7-apartment building housing students.',
      'Executed Extensive Hardware Repairs: Diagnosed and repaired hundreds of laptops and desktop computers, ensuring minimal downtime and maintaining high levels of user satisfaction.'
    ],
    logoPath: '/company-logos/wcuoch.jpeg'
  }
]; 