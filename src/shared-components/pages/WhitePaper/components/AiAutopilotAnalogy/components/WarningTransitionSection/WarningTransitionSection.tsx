import React from 'react';
import { Group } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import { Typography } from '@shared-components/atoms/Typography';
import { motion } from 'framer-motion';
import { fadeIn } from '../../AiAutopilotAnalogy.styles';

interface WarningTransitionSectionProps {
  title: string;
  description: string[];
  className?: string;
}

export const WarningTransitionSection: React.FC<WarningTransitionSectionProps> = ({
  title,
  description,
  className
}) => {
  // Split the title
  const titleParts = title.split(':', 1); // Split only on the first colon
  const warningText = titleParts.length > 0 ? `${titleParts[0]}:` : title; // Add colon back
  const restOfTitle = titleParts.length > 1 ? title.substring(titleParts[0].length + 1).trim() : null;

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
          <Group gap="xs" align="center">
            <IconAlertTriangle size={24} color="#f44336" />
            <Typography variant="h3" weight="bold">
              {warningText}
            </Typography>
          </Group>
          {/* Render the rest of the title if it exists */}
          {restOfTitle && (
            <Typography variant="h3" weight="bold" mt="xs">
              {restOfTitle}
            </Typography>
          )}
        </div>
        {description.map((paragraph, index) => (
          <Typography
            key={index}
            variant="body"
            weight="regular"
            mb={index < description.length - 1 ? '1rem' : undefined}
          >
            {paragraph}
          </Typography>
        ))}
      </div>
    </motion.div>
  );
}; 