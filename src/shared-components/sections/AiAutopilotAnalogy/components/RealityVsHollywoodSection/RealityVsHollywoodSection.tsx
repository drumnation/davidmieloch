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
  itemContentStyle
} from '../../AiAutopilotAnalogy.styles';

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
  <div 
    style={realityItemStyle}
    className="reality-item"
    data-aos="fade-right"
    data-aos-delay={index * 100}
  >
    <div style={iconContainerRealityStyle}>
      <Icon name={item.iconName} size={24} />
    </div>
    <div style={itemContentStyle}>
      <Typography variant="h3" className="mb-2">
        {item.title}
      </Typography>
      <Typography variant="body">
        {item.description}
      </Typography>
    </div>
  </div>
);

// Hollywood Item Component
const HollywoodItem: React.FC<{
  item: ItemProps;
  index: number;
}> = ({ item, index }) => (
  <div 
    style={hollywoodItemStyle}
    className="hollywood-item"
    data-aos="fade-left"
    data-aos-delay={index * 100}
  >
    <div style={iconContainerHollywoodStyle}>
      <Icon name={item.iconName} size={24} />
    </div>
    <div style={itemContentStyle}>
      <Typography variant="h3" className="mb-2">
        {item.title}
      </Typography>
      <Typography variant="body">
        {item.description}
      </Typography>
    </div>
  </div>
);

export const RealityVsHollywoodSection: React.FC<RealityVsHollywoodSectionProps> = ({
  realityItems,
  hollywoodItems,
  className
}) => {
  return (
    <div className={className}>
      <div style={titleContainerStyle}>
        <Typography variant="h2" className="mb-4">Reality vs Hollywood AI</Typography>
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