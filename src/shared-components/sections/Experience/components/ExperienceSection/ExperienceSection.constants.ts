import { ExperienceItem } from './ExperienceSection.types';
import { CustomIcon } from '../../../RealWorldImpact/RealWorldImpact.logic';

export const SECTION_TITLE = 'Professional Experience';

export const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    company: 'Scala',
    title: 'Senior Software Engineer, Frontend Lead',
    location: 'Malvern, PA',
    startDate: 'Mar 2020',
    endDate: 'Present',
    showBorder: true,
    description: 'With **31 years of experience** in the digital signage industry, Scala is known globally as the leader in stable, secure network deployment at scale',
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
    logoPath: '/company-logos/scala.jpeg',
    media: [
      {
        type: "image",
        url: "media/scala-designer-cloud.jpeg",
        title: "Scala Designer Cloud - Menu Sign Board Design",
        width: "100%",
        foldable: true,
        showLogo: true,
        titleLogoPath: "media/scala-bang-logo.png",
        description: `Scala Designer Cloud offers Photoshop-like functionality in a browser, specifically tailored for digital signage creation. Key features visible in the interface include:

## Content Creation Tools
* **Template Library**: Pre-designed templates for quick customization (burger menu examples visible)
* **Asset Library**: Stock images and graphics organized by category
* **Vector Library**: Basic shapes and widgets for layout design
* **Layer Management**: Control individual elements with precision

## Design Interface
* **Canvas Editor**: WYSIWYG editing of digital signage content
* **Color Selection**: Advanced color picker with RGB/hex values
* **Typography Controls**: Text formatting tools
* **Drop Shadow Effects**: Add dimension to design elements
* **Alignment Tools**: Precise positioning options

## Digital Signage Features
* **Menu Board Templates**: Restaurant-specific layouts optimized for digital displays
* **Price List Formatting**: Structured data presentation for retail environments
* **Promotional Callouts**: Highlight special offers with visual emphasis
* **Multi-panel Layouts**: Create complex screen divisions for information organization

## Cloud Functionality
* **Browser-based Workflow**: No software installation required
* **User Account Management**: Personalized access and settings
* **Cross-device Compatibility**: Design anywhere with internet access
* **Direct Publishing**: Push designs to Scala's proprietary digital signage hardware

Perfect for creating professional digital menu boards, promotional displays, and information screens for Scala's digital signage ecosystem.`
      },
      {
        type: "image",
        url: "media/screenshots/portals/portals2.png",
        title: "Airport Portal",
        width: "49%",
        showLogo: true,
        titleLogoPath: "media/scala-bang-logo.png"
      },
      {
        type: "image",
        url: "media/screenshots/portals/portals3.png",
        title: "Airport Portal",
        width: "49%",
        showLogo: true,
        titleLogoPath: "media/scala-bang-logo.png"
      },
      {
        type: "link",
        url: "https://medium.com/@davidmieloch/developing-with-a-team-of-ais-b1b2019ea44c",
        title: "Developing with a Team of AIs",
        description: "How I organized multiple AI agents to work together on code projects",
        thumbnailUrl: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*4-rgPFbSEHzdKo3dv5n4Tg.png",
        width: "100%",
      },
      {
        type: "link",
        url: "https://medium.com/@davidmieloch/reuse-your-code-authoring-your-own-universal-library-with-webpack-89d43e6ea9df",
        title: "Reuse Your Code: Authoring Your Own Universal Library with Webpack",
        description: "How to create reusable code libraries that work across different environments",
        thumbnailUrl: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*gXL9S7-UfsIde4hvJ-Ngnw.png",
        width: "100%",
      }
    ]
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
    logoPath: '/company-logos/draynow_inc_logo.jpeg',
    media: [
      {
        type: "image",
        url: "/media/otg/draynow/Screenshot_20190625-090152_DrayNow.jpg",
        title: "Marketplace",
        width: "30%",
        showLogo: true,
        logoHasBorderRadius: true,
      },
      {
        type: "image",
        url: "/media/otg/draynow/Screenshot_20190714-184353_DrayNow.jpg",
        title: "Rail Billing Information",
        width: "30%",
        showLogo: true,
        logoHasBorderRadius: true,
      },
      {
        type: "image",
        url: "/media/otg/draynow/Screenshot_20190715-112829_DrayNow.jpg",
        title: "Marketplace Listing",
        width: "30%",
        showLogo: true,
        logoHasBorderRadius: true,
      },
      {
        type: "link",
        url: "https://medium.com/@davidmieloch/why-you-should-encapsulate-your-javascript-conditionals-in-a-function-4a492853c397",
        title: "Why You Should Encapsulate Your JavaScript Conditionals in a Function",
        description: "Improve code readability and maintainability with functional conditionals",
        thumbnailUrl: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*icB7ZbVrl7mQoevW9fQa8Q.png",
        width: "100%"
      },
      {
        type: "link",
        url: "https://medium.com/@davidmieloch/alphabetize-your-code-3f5df98b83ef",
        title: "Alphabetize Your Code",
        description: "A simple practice that can improve code organization and developer efficiency",
        thumbnailUrl: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*vDBbk1FTPZqIk_6Itxaypg.png",
        width: "100%"
      }
    ]
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
    logoPath: '/company-logos/otg_management_logo.jpeg',
    media: [
      {
        type: "group",
        layout: "stack",
        width: "31.33%",
        items: [
          {
            type: "image",
            url: "/media/otg/screenshots/order-ahead-2.png",
            title: "Gate-Ready Airport Pizza App",
            showLogo: true,
          },
          {
            type: "image",
            url: "/media/otg/screenshots/otg-categories-short.png",
            title: "Gate-Ready Airport Pizza App",
            showLogo: true,
          },
        ]
      },
      {
        type: "group",
        layout: "stack",
        width: "65.67%",
        items: [
          {
            type: "image",
            url: "/media/otg/screenshots/web-cart1.png",
            title: "Airport Restaurant Digital Ordering System",
            description: "Designed the interface for OTG's in-terminal dining payment system, featuring boarding pass integration for personalized offers, multiple payment options including airline miles, and upsell opportunities. This mobile ordering solution allows travelers to seamlessly place and pay for meals across OTG's airport restaurant locations.",
            foldable: true,
            showLogo: true
          }
        ]
      },
      {
        type: "pdf",
        url: "/media/otg/OTG Case Studies.pdf",
        title: "OTG Mobile Ordering Case Studies",
        thumbnailUrl: "/media/otg/thumbnails/case-studies-1.png",
        showLogo: true
      },
      {
        type: "pdf",
        url: "/media/otg/OTG Brain Storm - Print.pdf",
        title: "OTG Project Brainstorming Session",
        thumbnailUrl: "/media/otg/thumbnails/brain-storm-1.png",
        width: "48.5%",
        showLogo: true
      },
      {
        type: "pdf",
        url: "/media/otg/Transition To React - Share.pdf",
        title: "Transition To React Architecture",
        thumbnailUrl: "/media/otg/thumbnails/transition-react-1.png",
        width: "100%",
        showLogo: true
      }
    ]
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
    logoPath: '/company-logos/gramercytech_logo.jpeg',
    media: [
      {
        type: "embed",
        url: "https://www.youtube.com/embed/FhIIgTV08RQ?si=00_ddQYAvuMKU8C3",
        title: "Master A Million - Television Commercial",
        width: "half",
        height: 315,
        showLogo: true
      },
      {
        type: "embed",
        url: "https://www.youtube.com/embed/lJHzOcIT5os?si=gsy8mc0FbHp4Ug8J",
        title: "Master A Million - End to End Form Test Demo",
        width: "half",
        height: 315,
        showLogo: true
      },
      {
        type: "pdf",
        url: "/media/Master A Million - REACT NATIVE.pdf",
        title: "MaM - React Native Documentation",
        thumbnailUrl: "/media/masteramillion-ball.png",
        description: "Documentation for the Master A Million app, including the React Native codebase and design files",
        height: 315,  
        showLogo: true,
        width: "50%"
      },
      {
        type: "embed",
        url: "https://www.youtube.com/embed/FB2o6krFmZw?si=slIxX7VyeajlqTKz",
        title: "Hacking a dumb laser to be smart",
        width: "50%",
        showLogo: true,
        height: 315,
      },
      {
        type: "link",
        url: "https://medium.com/react-native-now/my-journey-from-reactjs-to-react-native-d19986a47dec",
        title: "My Journey from ReactJS to React-Native",
        description: "Mega-post with everything I learned + lots of code examples",
        thumbnailUrl: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*7lwP90uD_PsbkbLek7ffyQ.jpeg",
        width: "100%"
      },
      {
        type: "link",
        url: "https://medium.com/@davidmieloch/npm-to-help-streamline-cross-platform-styling-in-react-native-f2855b8c4648",
        title: "NPM to Help Streamline Cross-Platform Styling in React Native",
        description: "Using react-native-cross-platform-dimensions to simplify responsive design",
        thumbnailUrl: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*BysNBoEbKSYW274ebStYUQ.jpeg",
        width: "100%"
      },
      {
        type: "link",
        url: "https://medium.com/@davidmieloch/making-a-dumb-laser-smart-by-hacking-it-to-a-raspberry-pi-c88cb6aee02a",
        title: "Making a Dumb Laser Smart by Hacking it to a Raspberry Pi",
        description: "How we connected the Master A Million ball to a micro-controller",
        thumbnailUrl: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*frqAogzwrKd1cpWiDlFtgw.png",
        width: "100%"
      }
    ]
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
    showBorder: true,
    description: 'Saturn Business Systems provides integrated IT solutions, including data center and cloud solutions, big data analytics, and cybersecurity.',
    bulletPoints: [
      'Designed a new company website and implemented a HubSpot blog for content marketing.',
      'Enhanced the company digital footprint and lead generation capabilities.',
      'Sourced and developed data governance experts into thought-leaders and sales consultants.',
      'Strengthened the company reputation and drove industry influence.',
      'Produced a comprehensive suite of sales materials, including white papers, case studies, videos, blogs, and data sheets.',
      'Empowered the sales team with compelling content to drive conversions and client engagement.'
    ],
    logoPath: '/company-logos/saturn_business_systems_logo.jpeg',
    media: [
      {
        type: 'embed',
        url: 'https://www.youtube.com/embed/ybZDUK6AzLs?si=wymYbkw5JqyAISTo',
        title: 'SAS Performance Transformation Case Study',
        thumbnailUrl: '/company-logos/saturn_business_systems_logo.jpeg',
        width: '48%',
        showLogo: true,
        logoHasBorder: true,
        description: "Client testimonial showcasing Saturn's migration of a failing SAS environment to Power 8/AIS architecture, achieving 386% faster processing and 689% faster data operations. Jobs that previously took hours now complete in 20 minutes. Includes CTA for datasheet download and discovery call."
      },
      {
        type: 'embed',
        url: 'https://www.youtube.com/embed/uAhkmIqFwno?si=yggZSqrYL9ddN8F0',
        title: 'SQL Migration Outreach Video',
        thumbnailUrl: '/company-logos/saturn_business_systems_logo.jpeg',
        width: '48%',
        showLogo: true,
        logoHasBorder: true,
        description: "Brief cold outreach video from Jonathan Karp of Saturn Business Systems targeting organizations with outdated SQL Server installations. Presents alternatives to expensive upgrades, highlighting Saturn's data warehouse solutions, cost comparison tools, and ROI analysis to help prospects make informed decisions about their aging SQL infrastructure."
      },
      {
        type: 'pdf',
        url: '/media/saturn/sas-optimization-legalresearchfirm-3-12-2015.pdf',
        title: 'Legal Research Firm SAS Optimization',
        thumbnailUrl: '/media/saturn/thumbnails/sas-optimization-legalresearchfirm-3-12-2015-thumbnail.png',
        width: '48%',
        showLogo: true,
        logoHasBorder: true,
        description: "Designed and created this two-page case study showcasing Saturn's transformation of a legal research firm's failing SAS environment. Crafted compelling visuals and persuasive copy highlighting dramatic performance improvements (386% faster processing, 689% faster data operations), which equipped sales team members with powerful collateral for targeted client outreach."
      },
      {
        type: 'pdf',
        url: '/media/saturn/saturn-information-value-management.pdf',
        title: 'Information Value Management Campaign',
        thumbnailUrl: '/media/saturn/thumbnails/saturn-information-value-management-thumbnail.png',
        width: '48%',
        showLogo: true,
        logoHasBorder: true,
        description: 'Designed and wrote this two-page thought leadership brochure addressing data management challenges for Saturn Business Systems. Created compelling visuals and persuasive messaging about translating business goals into actionable data strategies, which I used for personal outreach to industry experts to participate in my thought leadership marketing initiative.'
      },
      {
        type: 'pdf',
        url: '/media/saturn/Saturn-Business-Systems-SME-Network.pdf',
        title: 'Subject Matter Expert Network Campaign',
        thumbnailUrl: '/media/saturn/thumbnails/Saturn-Business-Systems-SME-Network-thumbnail.png',
        width: '100%',
        foldable: true,
        showLogo: true,
        logoHasBorder: true,
        description: `Designed and wrote this two-page recruitment brochure for Saturn's Subject Matter Expert Network, featuring compelling visuals and persuasive copy that emphasized "who you know is valuable." Created as a key component of my thought leadership marketing initiative to recruit industry experts through a multi-phase engagement model offering five distinct revenue streams.`
      }
    ]
  },
  {
    company: 'Graphnet',
    title: 'Marketing Manager and Frontend Developer',
    location: 'New York, NY',
    startDate: 'Jan 2012',
    endDate: 'Feb 2013',
    showBorder: true,
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
    logoPath: '/company-logos/graphnet.jpeg',
    media: [
      {
        type: "image",
        url: "/media/photo/graphnet.jpg",
        title: "Graphnet Website Rebranding",
        showLogo: true,
        logoHasBorder: true,
        description: "I led the rebranding of Graphnet's website, including the development of a new logo and color palette. I also created a new website design that is more user-friendly and visually appealing.",
        width: "100%"
      }
    ]
  },
  {
    company: 'Kwikpoint',
    title: 'Frontend Web Developer',
    location: 'Alexandria, VA',
    startDate: 'Jan 2011',
    endDate: 'Mar 2016',
    showBorder: true,
    description: 'Kwikpoint specializes in the creation of visual language communication tools that help bridge language barriers, widely used in military, healthcare, and emergency response.',
    bulletPoints: [
      'Led a team in the creation of a comprehensive website and online store.',
      'Ensured seamless functionality and user experience, while providing ongoing support.',
      'Designed and optimized landing pages for email marketing campaigns.',
      'Increased conversion rates and customer engagement through strategic design.',
      'Managed the addition of new products and maintained the e-commerce platform.',
      'Improved sales efficiency and user experience through continuous enhancements.'
    ],
    logoPath: '/company-logos/kwikpoint.jpeg',
    media: [
      {
        type: "image",
        url: "/media/photo/kwikpoint2.jpg",
        title: "Kwikpoint Visual Language Communication Guide - Online Store",
        showLogo: true,
        logoHasBorder: true,
        description: "I designed the online store for Kwikpoint's Visual Language Communication Guide, which is a tool that helps bridge language barriers. The store features a variety of products, including books, DVDs, and other materials.",
        width: "100%"
      }
    ]
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
    logoPath: '/company-logos/harmony.png',
    media: [
      {
        type: "embed",
        url: "https://www.youtube.com/embed/Omd_q511Aa4?si=-pjnprAxALM4Vaiz",
        title: "Vladimir Kush - Metaphorical Voyage Trailer",
        width: "full",
        height: 400,
        description: "A trailer for the Vladimir Kush film Metaphorical Voyage, featuring Sound Design by yours truly",
        showLogo: true,
      },
    ]
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
  },
]; 