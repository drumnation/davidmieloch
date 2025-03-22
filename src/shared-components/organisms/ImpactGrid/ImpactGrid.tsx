import React from 'react';
import { useSpring, useTrail } from '@react-spring/web';
import { Typography } from '../../atoms/Typography/Typography';
import { ImpactGridProps, ImpactCategory } from './ImpactGrid.types';
import * as S from './ImpactGrid.styles';
import { 
  FaCheckCircle, 
  FaArrowUp, 
  FaChartLine, 
  FaRocket,
  FaThumbsUp
} from 'react-icons/fa';
import styled from 'styled-components';
import { springToCss } from '../../../utils/animations/typed-components';

const CategoryTitle = styled.div`
  margin-bottom: 0.25rem;
`;

// Function to get a random icon for each metric
const getMetricIcon = (index: number) => {
  const icons = [
    <FaCheckCircle key="check" style={{ color: '#4CAF50' }} />,
    <FaArrowUp key="arrow" style={{ color: '#2196F3' }} />,
    <FaChartLine key="chart" style={{ color: '#9C27B0' }} />,
    <FaRocket key="rocket" style={{ color: '#FF9800' }} />,
    <FaThumbsUp key="thumbs" style={{ color: '#3F51B5' }} />
  ];
  return icons[index % icons.length];
};

export const ImpactGrid: React.FC<ImpactGridProps> = ({
  impacts,
  style = 'gradient-cards',
  position = 'full-width',
  className,
}) => {
  // Container animation
  const containerSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 800 }
  });

  // Card animations with trail effect
  const cardsTrail = useTrail(impacts.length, {
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: { mass: 1, tension: 280, friction: 60 },
    delay: 200
  });

  return (
    <S.Container className={className} $position={position}>
      <div
        style={springToCss(containerSpring as any)}
      >
        <S.GridContainer>
          {impacts.map((impact: ImpactCategory, index: number) => (
            <S.Card 
              key={index} 
              $style={style}
              style={springToCss(cardsTrail[index] as any)}
            >
              <S.CardHeader>
                <CategoryTitle>
                  <Typography variant="h3">
                    {impact.category}
                  </Typography>
                </CategoryTitle>
              </S.CardHeader>
              <S.CardBody>
                <S.MetricsList>
                  {impact.metrics.map((metric: string, metricIndex: number) => (
                    <S.MetricItem key={metricIndex}>
                      <span style={{ marginRight: '8px', display: 'inline-flex', alignItems: 'center' }}>
                        {getMetricIcon(metricIndex)}
                      </span>
                      {metric}
                    </S.MetricItem>
                  ))}
                </S.MetricsList>
              </S.CardBody>
            </S.Card>
          ))}
        </S.GridContainer>
      </div>
    </S.Container>
  );
}; 