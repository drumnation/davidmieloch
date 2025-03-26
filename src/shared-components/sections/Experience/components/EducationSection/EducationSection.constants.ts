import { EducationItem } from './EducationSection.types';

export const SECTION_TITLE = 'Education';

export const FORMAL_EDUCATION: EducationItem[] = [
  {
    school: 'West Chester University of Pennsylvania',
    degree: 'B.A.',
    fieldOfStudy: 'Music',
    startDate: '2003',
    endDate: '2008',
    description: 'Instrumental Concentration with focus on Classical Percussion and Jazz Drumset performance. Secondary instruments included Computer, Tabla, Guitar and Piano. Active member of Phi Mu Alpha Sinfonia and Percussion Ensemble.',
    logoPath: '/school-logos/westchester.jpeg',
    media: [
      {
        type: 'embed',
        url: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1289735&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
        title: 'Orchestral | Chamber Ensemble | Acoustic | Classical',
        width: '50%',
        height: 300
      },
      {
        type: 'embed',
        url: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1289959&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
        title: 'Music for Games',
        width: '50%',
        height: 300
      }
    ]
  }
];

export const TECHNICAL_EDUCATION: EducationItem[] = [
  {
    school: 'Flatiron School',
    degree: 'Certificate',
    fieldOfStudy: '15 Week – Full Stack Web Immersive',
    startDate: '2017',
    endDate: '2017',
    description: 'Intensive web development bootcamp focusing on modern full-stack development. Frontend: JavaScript fundamentals (ES6+), Component Pattern, React.js, Redux + Thunk, jQuery. Backend: Ruby fundamentals, MVC pattern, Rails, SQL, ORMs, Active Record, Ruby on Rails.',
    logoPath: '/school-logos/the_flatiron_school_logo.jpeg',
    media: [
      {
        type: 'embed',
        url: 'https://fast.wistia.net/embed/iframe/lpchu9kv9n',
        title: 'Flatiron School Experience',
        width: 'full',
        height: 400
      }
    ]
  },
  {
    school: 'App Academy',
    degree: 'Certificate',
    fieldOfStudy: '3 Month – Online Fundamentals Intensive',
    startDate: '2016',
    endDate: '2016',
    description: 'Focused program on JavaScript ES6+ fundamentals and modern development practices.',
    logoPath: '/school-logos/app-academy.jpeg'
  },
  {
    school: 'General Assembly',
    degree: 'Certificate',
    fieldOfStudy: 'NYC Campus Programs',
    startDate: '2016',
    endDate: '2016',
    description: 'Completed specialized courses in Growth Hacking for Startups and earned Google AdWords Certification.',
    logoPath: '/school-logos/generalassembly_logo.jpeg'
  }
];

export const CONTINUOUS_LEARNING: EducationItem[] = [
  {
    school: 'Codecademy',
    degree: 'Online Courses',
    fieldOfStudy: 'Web Development',
    startDate: '2017',
    endDate: '2017',
    description: 'Completed courses in Ruby, Javascript, and ReactJS development.',
    logoPath: '/school-logos/codeacademy_logo.png'
  },
  {
    school: 'Udemy',
    degree: 'Online Courses',
    fieldOfStudy: 'Multiple Disciplines',
    startDate: '2014',
    endDate: '2017',
    description: 'Completed courses in Programming, Digital Marketing, PPC, SEO, Content Marketing, and Ad Publishing.',
    logoPath: '/school-logos/udemy_logo.jpeg'
  },
  {
    school: 'IBM Corporate Training',
    degree: 'Professional Development',
    fieldOfStudy: 'Data Analytics',
    startDate: '2014',
    endDate: '2015',
    description: 'Attended IBM Partner Content Marketing Workshops and IBM Insight Conference. Trained to create data models for clients using Watson Analytics for Social Media. Learned to use supervised and unsupervised methods to derive insights from data.',
    logoPath: '/school-logos/ibm_logo.jpeg'
  }
]; 