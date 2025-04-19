import {
  FaCode, FaDatabase, FaCloud, FaUsers, FaTools, FaChartLine,
  FaLightbulb, FaBook, FaCogs, FaServer, FaMobileAlt, FaUserShield,
  FaPencilAlt, FaFileAlt, FaTasks, FaRocket,
  FaSearch, FaHandshake, FaGlobe, FaRegCheckCircle, FaBug
} from 'react-icons/fa';

// Helper function to check if path is an image file
export const isImageFile = (path: string | undefined): boolean => {
  if (!path) return false;
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  return imageExtensions.some(ext => path.toLowerCase().endsWith(ext));
};

// Helper function to determine which icon to use based on bullet point content REMOVED
/*
export const getBulletIcon = (text: string): React.ReactNode => { ... };
*/

export const sortExperiencesByDate = (a: { startDate: string }, b: { startDate: string }): number => {
  const monthToNum: Record<string, number> = {
    'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
    'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
  };

  const aDateParts = a.startDate.split(' ');
  const bDateParts = b.startDate.split(' ');

  const aYear = parseInt(aDateParts[1] || '0');
  const bYear = parseInt(bDateParts[1] || '0');

  // Sort by year (descending)
  if (aYear !== bYear) {
    return bYear - aYear;
  }

  // If years are the same, sort by month (descending)
  const aMonth = monthToNum[aDateParts[0]] || 0;
  const bMonth = monthToNum[bDateParts[0]] || 0;

  return bMonth - aMonth;
};

// Moved from ExperienceSection.styles.ts
export const MainImageStyle = {
  borderRadius: '6px',
  objectFit: 'contain' as const,
};

export const IframeStyle = {
  width: '100%',
  height: '100%',
  border: 'none',
  borderRadius: '6px',
};

// Style object moved from ExperienceSection.logic.tsx
export const PdfThumbnailImageStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover'
} as React.CSSProperties;

// Style object moved from ExperienceSection.logic.tsx
export const LinkThumbnailImageStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover'
} as React.CSSProperties;

// Style object moved from ExperienceSection.logic.tsx
export const NestedMediaImageStyle = {
  cursor: 'pointer',
  display: 'block',
  borderRadius: 0
} as React.CSSProperties; 