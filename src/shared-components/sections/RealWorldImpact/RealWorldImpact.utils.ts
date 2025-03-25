// Icon mapping utility
export const getIconName = (title: string, iconMap: Record<string, string>, defaultIcon = 'star'): string => {
  return iconMap[title] || defaultIcon;
};

// Column count calculation
export const getColumnCount = (featureCount: number): 2 | 3 | 4 => {
  if (featureCount <= 2) return 2;
  if (featureCount >= 4) return 4;
  return 3;
}; 