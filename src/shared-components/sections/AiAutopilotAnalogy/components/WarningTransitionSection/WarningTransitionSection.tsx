import React from 'react';
import { Typography } from '../../../../../shared-components/atoms/Typography';
import { motion } from 'framer-motion';
import { fadeIn } from '../../AiAutopilotAnalogy.styles';

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
    <motion.div 
      className={className} 
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      style={{
        width: '100%',
        padding: '2rem',
        marginTop: '0',
        backgroundColor: '#ffebee',
        borderLeft: '4px solid #f44336',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
    >
      <div style={{ 
        width: '100%',
        maxWidth: '1000px', 
        margin: '0 auto'
      }}>
        <div style={{ marginBottom: '0.75rem' }}>
          <Typography variant="h3" weight="bold">
            {title}
          </Typography>
        </div>
        <Typography variant="body" weight="regular">
          {description}
        </Typography>
      </div>
    </motion.div>
  );
}; 