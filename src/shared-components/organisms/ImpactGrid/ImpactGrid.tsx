import React from 'react';
import { motion } from 'framer-motion';
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
import { AnimationDebugger, AnimationErrorBoundary } from '../../../utils/animations/debug-tools';
import { FadeIn, Trail } from '../../../utils/animations/framer-patterns';
import { MotionSafe } from '../../../utils/animations/ssr-safe';

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
  const componentName = "ImpactGrid";

  const renderContent = () => (
    <S.Container className={className} $position={position}>
      <FadeIn componentName={componentName} duration={0.8}>
        <S.GridContainer>
          <Trail 
            componentName={componentName} 
            staggerDelay={0.1}
            initialDelay={0.2}
          >
            {impacts.map((impact: ImpactCategory, index: number) => (
              <motion.div 
                key={index}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 }
                }}
                transition={{ mass: 1, tension: 280, friction: 60 }}
              >
                <S.Card 
                  $style={style}
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
              </motion.div>
            ))}
          </Trail>
        </S.GridContainer>
      </FadeIn>
    </S.Container>
  );

  return (
    <AnimationErrorBoundary componentName={componentName}>
      <AnimationDebugger componentName={componentName} trackRenders={true} logLifecycle={true}>
        {renderContent()}
      </AnimationDebugger>
    </AnimationErrorBoundary>
  );
}; 