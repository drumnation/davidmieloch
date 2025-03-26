import React from 'react';
import * as Fa from 'react-icons/fa';
import * as Md from 'react-icons/md';
import * as Gi from 'react-icons/gi';
import * as Bs from 'react-icons/bs';
import * as Fi from 'react-icons/fi';

// Map icon names to components
const ICON_MAP: Record<string, React.ElementType> = {
  // Font Awesome icons
  'gear': Fa.FaCog, // Using FaCog instead of FaGear
  'cog': Fa.FaCog,
  'user': Fa.FaUser,
  'users': Fa.FaUsers,
  'code': Fa.FaCode,
  'database': Fa.FaDatabase,
  'server': Fa.FaServer,
  'cloud': Fa.FaCloud,
  'file': Fa.FaFile,
  'folder': Fa.FaFolder,
  'lock': Fa.FaLock,
  'key': Fa.FaKey,
  'check': Fa.FaCheck,
  'times': Fa.FaTimes,
  'exclamation': Fa.FaExclamation,
  'question': Fa.FaQuestion,
  'info': Fa.FaInfo,
  'bug': Fa.FaBug,
  
  // Material icons
  'settings': Md.MdSettings,
  'person': Md.MdPerson,
  'people': Md.MdPeople,
  'dashboard': Md.MdDashboard,
  'security': Md.MdSecurity,
  'analytics': Md.MdAnalytics,
  'build': Md.MdBuild,
  
  // Game icons (for more unique/interesting icons)
  'brain': Gi.GiBrain,
  'leaf': Gi.GiMapleLeaf, // Using GiMapleLeaf which is available
  'sprout': Gi.GiSprout,
  'seed': Gi.GiSeedling,
  'flower': Gi.GiFlowerPot,
  'tree': Gi.GiPalmTree, // Verified this exists
  'garden': Gi.GiPlantRoots, // Verified this exists
  
  // Bootstrap icons (simple, clean)
  'arrow-right': Bs.BsArrowRight,
  'arrow-left': Bs.BsArrowLeft,
  'arrow-up': Bs.BsArrowUp,
  'arrow-down': Bs.BsArrowDown,
  
  // Feather icons (minimal, elegant)
  'feather-settings': Fi.FiSettings,
  'feather-user': Fi.FiUser,
  'feather-code': Fi.FiCode,
};

// Map emoji shortcodes to actual emoji
const EMOJI_MAP: Record<string, string> = {
  ':coffee:': '☕',
  ':gear:': '⚙️',
  ':warning:': '⚠️',
  ':error:': '❌',
  ':success:': '✅',
  ':info:': 'ℹ️',
  ':star:': '⭐',
  ':fire:': '🔥',
  ':bulb:': '💡',
  ':rocket:': '🚀',
  ':computer:': '💻',
  ':bug:': '🐛',
  ':seedling:': '🌱',
  ':evergreen_tree:': '🌲',
  ':deciduous_tree:': '🌳',
  ':herb:': '🌿',
  ':four_leaf_clover:': '🍀',
  ':leaves:': '🍃',
  ':fallen_leaf:': '🍂',
  ':maple_leaf:': '🍁',
};

// List of common emoji characters for simple detection
const COMMON_EMOJI = [
  '☕', '⚙️', '⚠️', '❌', '✅', 'ℹ️', '⭐', '🔥', '💡', '🚀', 
  '💻', '🐛', '🌱', '🌲', '🌳', '🌿', '🍀', '🍃', '🍂', '🍁'
];

/**
 * Creates a span element for emoji display
 */
const createEmojiSpan = (emoji: string, fontSize: string): React.ReactElement => {
  return React.createElement('span', { style: { fontSize } }, emoji);
};

/**
 * Extracts icon from a node label text
 * Formats supported:
 * - "Text with emoji shortcode :rocket:"
 * - "Text with [icon-name]"
 * 
 * @param text Node label text
 * @returns Object with clean text and icon component if found
 */
export const extractIconFromText = (
  text: string
): { cleanText: string; icon: React.ReactNode | null; position?: 'left' | 'right' | 'top' } => {
  // Default return if no icon
  const defaultReturn = { cleanText: text, icon: null };
  
  if (!text) return defaultReturn;
  
  // Check for emoji shortcode
  const shortcodeRegex = /^:([a-z_]+):\s+(.+)$|^(.+)\s+:([a-z_]+):$/;
  const shortcodeMatch = text.match(shortcodeRegex);
  
  if (shortcodeMatch) {
    // Shortcode at the start
    if (shortcodeMatch[1] && shortcodeMatch[2]) {
      const emoji = EMOJI_MAP[`:${shortcodeMatch[1]}:`];
      if (emoji) {
        return {
          cleanText: shortcodeMatch[2].trim(),
          icon: createEmojiSpan(emoji, '18px'),
          position: 'left'
        };
      }
    }
    
    // Shortcode at the end
    if (shortcodeMatch[3] && shortcodeMatch[4]) {
      const emoji = EMOJI_MAP[`:${shortcodeMatch[4]}:`];
      if (emoji) {
        return {
          cleanText: shortcodeMatch[3].trim(),
          icon: createEmojiSpan(emoji, '18px'),
          position: 'right'
        };
      }
    }
  }
  
  // Check for [icon-name] syntax
  const iconRegex = /^\[([a-z\-]+)\]\s+(.+)$|^(.+)\s+\[([a-z\-]+)\]$/;
  const iconMatch = text.match(iconRegex);
  
  if (iconMatch) {
    // Icon at the start
    if (iconMatch[1] && iconMatch[2]) {
      const IconComponent = ICON_MAP[iconMatch[1]];
      if (IconComponent) {
        return {
          cleanText: iconMatch[2].trim(),
          icon: React.createElement(IconComponent, { size: 18 }),
          position: 'left'
        };
      }
    }
    
    // Icon at the end
    if (iconMatch[3] && iconMatch[4]) {
      const IconComponent = ICON_MAP[iconMatch[4]];
      if (IconComponent) {
        return {
          cleanText: iconMatch[3].trim(),
          icon: React.createElement(IconComponent, { size: 18 }),
          position: 'right'
        };
      }
    }
  }
  
  return defaultReturn;
};

/**
 * Gets an icon component from a name or shortcode
 */
export const getIconComponent = (
  iconName: string,
  size: number = 18,
  color?: string
): React.ReactNode | null => {
  // Check if iconName is one of the common emoji
  if (COMMON_EMOJI.includes(iconName)) {
    return React.createElement('span', { style: { fontSize: `${size}px`, color } }, iconName);
  }
  
  // Handle emoji shortcode
  if (iconName.startsWith(':') && iconName.endsWith(':')) {
    const emoji = EMOJI_MAP[iconName];
    if (emoji) {
      return React.createElement('span', { style: { fontSize: `${size}px`, color } }, emoji);
    }
  }
  
  // Handle icon name
  const IconComponent = ICON_MAP[iconName.toLowerCase()];
  if (IconComponent) {
    return React.createElement(IconComponent, { size, color });
  }
  
  return null;
}; 