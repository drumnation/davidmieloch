import React from 'react';
import { CallToActionSectionProps, Action } from '../../RealWorldImpact.types';
import { InsightCard, BottomLineBox } from '../../RealWorldImpact.styles';

export const CallToActionSection: React.FC<CallToActionSectionProps> = ({ actions, closing }) => {
  if (!Array.isArray(actions) || actions.length === 0) {
    console.warn('No actions provided to CallToActionSection');
    return null;
  }

  // Calculate grid template columns based on number of actions
  // This ensures proper layout with no empty spaces
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: actions.length === 2 ? '1fr 1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  };

  return (
    <>
      <div style={gridStyle}>
        {actions.map((action: Action, index) => (
          <InsightCard key={`${action.label}-${index}`}>
            <h3>{action.label}</h3>
            <p>{action.description}</p>
          </InsightCard>
        ))}
      </div>
      <BottomLineBox>
        <h3>Ready to Transform Your Development Process?</h3>
        <p>{closing}</p>
      </BottomLineBox>
    </>
  );
}; 