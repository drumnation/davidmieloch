import React from 'react';
import { Icon } from '../../../../atoms/Icon/Icon';
import { StateSectionProps, StateSection } from '../../RealWorldImpact.types';
import { FeatureGrid } from '../../../../organisms/FeatureGrid/FeatureGrid';
import { getColumnCount } from '../../RealWorldImpact.utils';

export const CurrentStateSection: React.FC<StateSectionProps> = ({ sections }) => {
  if (!Array.isArray(sections) || sections.length === 0) {
    console.warn('No sections provided to CurrentStateSection');
    return null;
  }

  // Dynamically set the number of columns based on the number of items
  // Use 2 columns if there are only 2 sections to avoid empty spaces
  const columnCount = sections.length === 2 ? 2 : 3;

  return (
    <>
      {sections.map((section: StateSection, index) => (
        <div key={`${section.title}-${index}`}>
          <h3>{section.title}</h3>
          <FeatureGrid
            features={section.points.map(point => {
              // Handle both string points and object points with keyword/description
              if (typeof point === 'string') {
                return {
                  title: '',
                  description: point,
                  icon: section.icon ? <Icon name={section.icon} size={24} /> : undefined
                };
              } else {
                return {
                  title: point.keyword,
                  description: point.description,
                  icon: section.icon ? <Icon name={section.icon} size={24} /> : undefined
                };
              }
            })}
            columns={columnCount as 2 | 3 | 4}
            style="accent-cards"
            animation="none"
          />
        </div>
      ))}
    </>
  );
}; 