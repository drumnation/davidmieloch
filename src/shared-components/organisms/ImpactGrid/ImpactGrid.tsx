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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

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
  return (
    <S.Container className={className} $position={position}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <S.GridContainer>
          {impacts.map((impact: ImpactCategory, index: number) => (
            <S.Card 
              key={index} 
              $style={style}
              variants={itemVariants}
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
      </motion.div>
    </S.Container>
  );
}; 