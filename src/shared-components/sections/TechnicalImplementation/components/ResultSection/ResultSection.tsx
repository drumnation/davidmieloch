import { FC } from 'react';
import styled from 'styled-components';
import { Typography } from '../../../../../shared-components/atoms/Typography';
import { ContentBlock, SectionTitle } from '../../TechnicalImplementation.styles';
import { ResultSectionProps } from './ResultSection.types';

const ConclusionText = styled(Typography)`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ItalicText = styled(Typography)`
  font-style: italic;
`;

export const ResultSection: FC<ResultSectionProps> = ({
  className,
  result
}) => {
  return (
    <ContentBlock className={className}>
      <SectionTitle>{result.title}</SectionTitle>
      <Typography variant="body">
        {result.description}
      </Typography>
      <ul>
        {result.benefits.map((benefit, index) => (
          <li key={index}>
            <Typography variant="body">{benefit}</Typography>
          </li>
        ))}
      </ul>
      <ConclusionText variant="body">
        {result.conclusion}
      </ConclusionText>
      <ItalicText variant="body">
        {result.transformationNote}
      </ItalicText>
    </ContentBlock>
  );
};

export default ResultSection; 