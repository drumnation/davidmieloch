import React from 'react';
import { animated } from '@react-spring/web';
import { Icon } from '../../../../atoms/Icon/Icon';
import { FrameworkSectionProps, FrameworkComponent } from '../../RealWorldImpact.types';
import { FeatureGrid } from '../../../../organisms/FeatureGrid/FeatureGrid';
import { useFrameworkSectionAnimation } from './FrameworkSection.hook';
import { getColumnCount } from '../../RealWorldImpact.utils';

export const FrameworkSection: React.FC<FrameworkSectionProps> = ({ components }) => {
  const { ref, animation } = useFrameworkSectionAnimation();

  if (!Array.isArray(components) || components.length === 0) {
    console.warn('No components provided to FrameworkSection');
    return null;
  }

  return (
    <animated.div ref={ref} style={animation}>
      {components.map((component: FrameworkComponent, index) => {
        const columnCount = getColumnCount(component.features.length);
        
        return (
          <div key={`${component.title}-${index}`}>
            <h3>{component.title}</h3>
            <FeatureGrid
              features={component.features.map(feature => {
                // Handle both string features and object features with keyword/description
                if (typeof feature === 'string') {
                  return {
                    title: '',
                    description: feature,
                    icon: component.icon ? <Icon name={component.icon} size={24} /> : undefined
                  };
                } else {
                  return {
                    title: feature.keyword,
                    description: feature.description,
                    icon: component.icon ? <Icon name={component.icon} size={24} /> : undefined
                  };
                }
              })}
              columns={columnCount}
              style="accent-cards"
              animation="none"
            />
          </div>
        );
      })}
    </animated.div>
  );
}; 