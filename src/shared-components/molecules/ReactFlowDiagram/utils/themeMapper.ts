import { ThemeConfig } from '../ReactFlowDiagram.types';

/**
 * Theme configurations for different themes
 */
export const themeConfigs: Record<string, ThemeConfig> = {
  default: {
    primaryColor: '#4A9EFF',
    backgroundColor: 'rgba(74, 158, 255, 0.05)',
    textColor: '#1F2937',
    nodeBackgroundColor: '#FFFFFF',
    nodeBorderColor: '#E5E7EB',
    edgeColor: '#888888',
    labelColor: '#1F2937',
  },
  dark: {
    primaryColor: '#3B82F6',
    backgroundColor: '#1F2937',
    textColor: '#F9FAFB',
    nodeBackgroundColor: '#374151',
    nodeBorderColor: '#4B5563',
    edgeColor: '#9CA3AF',
    labelColor: '#F9FAFB',
  },
  forest: {
    primaryColor: '#10B981',
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
    textColor: '#1F2937',
    nodeBackgroundColor: '#ECFDF5',
    nodeBorderColor: '#A7F3D0',
    edgeColor: '#059669',
    labelColor: '#1F2937',
  },
  neutral: {
    primaryColor: '#6B7280',
    backgroundColor: 'rgba(107, 114, 128, 0.05)',
    textColor: '#1F2937',
    nodeBackgroundColor: '#F9FAFB',
    nodeBorderColor: '#E5E7EB',
    edgeColor: '#9CA3AF',
    labelColor: '#1F2937',
  },
};

/**
 * Gets a theme configuration by name
 * @param theme Theme name
 * @returns Theme configuration
 */
export const getThemeConfig = (theme: string): ThemeConfig => {
  return themeConfigs[theme] || themeConfigs.default;
};

/**
 * Gets React Flow style overrides for a specific theme
 */
export const getReactFlowStyles = (theme: string) => {
  const themeConfig = getThemeConfig(theme);

  return {
    backgroundColor: themeConfig.backgroundColor,
    nodeDefaultStyle: {
      background: themeConfig.nodeBackgroundColor,
      color: themeConfig.textColor,
      border: `1px solid ${themeConfig.nodeBorderColor}`,
    },
    edgeDefaultStyle: {
      stroke: themeConfig.edgeColor,
    },
  };
};

/**
 * Converts a class definition from Mermaid to React Flow node style
 * @param className Class name from Mermaid classDef
 * @param classStyle Style from Mermaid classDef
 * @returns React style object
 */
export const convertClassDefToStyle = (
  className: string,
  classStyle: string
): React.CSSProperties => {
  const style: React.CSSProperties = {};
  
  // Parse style properties
  const styleProps = classStyle.split(',');
  
  for (const prop of styleProps) {
    const [key, value] = prop.trim().split(':').map(p => p.trim());
    
    switch (key) {
      case 'fill':
        style.backgroundColor = value;
        break;
      case 'stroke':
        style.borderColor = value;
        break;
      case 'stroke-width':
        style.borderWidth = value;
        break;
      case 'color':
        style.color = value;
        break;
      case 'stroke-dasharray':
        style.borderStyle = 'dashed';
        break;
      case 'font-size':
        style.fontSize = value;
        break;
      case 'font-weight':
        style.fontWeight = value as any;
        break;
      // Add more style conversions as needed
    }
  }
  
  return style;
}; 