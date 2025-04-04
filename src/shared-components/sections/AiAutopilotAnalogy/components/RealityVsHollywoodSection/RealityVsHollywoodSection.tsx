import React from 'react';
import { Typography } from '../../../../atoms/Typography';
import { Icon } from '../../../../atoms/Icon';
import { 
  titleContainerStyle, 
  RealityVsHollywoodContainer,
  realityItemStyle,
  hollywoodItemStyle,
  iconContainerRealityStyle,
  iconContainerHollywoodStyle,
  itemContentStyle,
  fadeInUp
} from '../../AiAutopilotAnalogy.styles';
import { motion } from 'framer-motion';

interface ItemProps {
  title: string;
  description: string;
  iconName: string;
}

interface RealityVsHollywoodSectionProps {
  realityItems: ItemProps[];
  hollywoodItems: ItemProps[];
  className?: string;
}

// Reality Item Component
const RealityItem: React.FC<{
  item: ItemProps;
  index: number;
}> = ({ item, index }) => (
  <motion.div 
    style={realityItemStyle}
    className="reality-item"
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    <div style={iconContainerRealityStyle}>
      <Icon name={item.iconName} size={24} />
    </div>
    <div style={itemContentStyle}>
      <div style={{ marginBottom: '0.5rem' }}>
        <Typography variant="h3">
          {item.title}
        </Typography>
      </div>
      <Typography variant="body">
        {item.description}
      </Typography>
    </div>
  </motion.div>
);

// Hollywood Item Component
const HollywoodItem: React.FC<{
  item: ItemProps;
  index: number;
}> = ({ item, index }) => (
  <motion.div 
    style={hollywoodItemStyle}
    className="hollywood-item"
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    <div style={iconContainerHollywoodStyle}>
      <Icon name={item.iconName} size={24} />
    </div>
    <div style={itemContentStyle}>
      <div style={{ marginBottom: '0.5rem' }}>
        <Typography variant="h3">
          {item.title}
        </Typography>
      </div>
      <Typography variant="body">
        {item.description}
      </Typography>
    </div>
  </motion.div>
);

export const RealityVsHollywoodSection: React.FC<RealityVsHollywoodSectionProps> = ({
  realityItems,
  hollywoodItems,
  className
}) => {
  return (
    <div className={className}>
      <div style={titleContainerStyle}>
        <div style={{ marginBottom: '1rem' }}>
          <Typography variant="h2">Reality vs Hollywood AI</Typography>
        </div>
      </div>
      <RealityVsHollywoodContainer>
        {realityItems.map((item, index) => (
          <RealityItem key={`reality-${index}`} item={item} index={index} />
        ))}
        {hollywoodItems.map((item, index) => (
          <HollywoodItem key={`hollywood-${index}`} item={item} index={index} />
        ))}
      </RealityVsHollywoodContainer>
    </div>
  );
}; 