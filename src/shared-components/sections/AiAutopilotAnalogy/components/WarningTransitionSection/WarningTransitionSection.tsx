import React from 'react';
import { Typography } from '../../../../../shared-components/atoms/Typography';

interface WarningTransitionSectionProps {
  title: string;
  description: string;
  className?: string;
}

export const WarningTransitionSection: React.FC<WarningTransitionSectionProps> = ({
  title,
  description,
  className
}) => {
  return (
    <div 
      className={className} 
      style={{
        width: '100%',
        padding: '2rem',
        marginTop: '3rem',
        backgroundColor: '#ffebee',
        borderLeft: '4px solid #f44336'
      }}
    >
      <div style={{ 
        width: '100%',
        maxWidth: '1000px', 
        margin: '0 auto'
      }}>
        <Typography variant="h3" weight="bold" className="mb-3">
          {title}
        </Typography>
        <Typography variant="body" weight="regular">
          {description}
        </Typography>
      </div>
    </div>
  );
}; 