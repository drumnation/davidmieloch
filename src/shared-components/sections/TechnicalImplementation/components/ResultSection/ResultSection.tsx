import { FC } from 'react';
import styled from 'styled-components';
import { Typography } from '../../../../../shared-components/atoms/Typography';
import { ContentBlock, SectionTitle, SubsectionTitle } from '../../TechnicalImplementation.styles';
import { ResultSectionProps } from './ResultSection.types';

const Section = styled.div`
  margin-bottom: 2rem;
`;

const ConclusionText = styled(Typography)`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

const CommandCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.elevation1};
`;

const CommandName = styled(Typography)`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.primary.main};
  font-family: monospace;
`;

const TransformationCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TransformationRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  gap: 1rem;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TransformationHeader = styled(TransformationRow)`
  font-weight: bold;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`;

const TransformationArea = styled(Typography)`
  font-weight: 600;
`;

const TransformationFrom = styled(Typography)`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const TransformationTo = styled(Typography)`
  color: ${({ theme }) => theme.colors.primary.main};
  font-weight: 500;
`;

const ItalicText = styled(Typography)`
  font-style: italic;
  margin-bottom: 1.5rem;
`;

const TransformationNote = styled(Typography)`
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
      <Typography variant="body">
        {result.introduction}
      </Typography>

      {/* CLI Toolset */}
      {result.cliToolset && (
        <Section>
          <SubsectionTitle>{result.cliToolset.title}</SubsectionTitle>
          <Typography variant="body">{result.cliToolset.description}</Typography>
          
          {result.cliToolset.commands?.map((command, index) => (
            <CommandCard key={index}>
              <CommandName variant="body">{command.name}</CommandName>
              <Typography variant="body">{command.description}</Typography>
            </CommandCard>
          ))}
        </Section>
      )}

      {/* Transformation Benefits */}
      {result.transformationBenefits && (
        <Section>
          <SubsectionTitle>{result.transformationBenefits.title}</SubsectionTitle>
          <Typography variant="body">{result.transformationBenefits.description}</Typography>
          
          <TransformationCard>
            <TransformationHeader>
              <Typography variant="body">Area</Typography>
              <Typography variant="body">From</Typography>
              <Typography variant="body">To</Typography>
            </TransformationHeader>
            
            {result.transformationBenefits.benefits?.map((benefit, index) => (
              <TransformationRow key={index}>
                <TransformationArea variant="body">{benefit.area}</TransformationArea>
                <TransformationFrom variant="body">{benefit.from}</TransformationFrom>
                <TransformationTo variant="body">{benefit.to}</TransformationTo>
              </TransformationRow>
            ))}
          </TransformationCard>
        </Section>
      )}

      {/* Practical Outcomes */}
      {result.practicalOutcomes && (
        <Section>
          <SubsectionTitle>Practical Outcomes</SubsectionTitle>
          <ul>
            {result.practicalOutcomes.map((outcome, index) => (
              <li key={index}>
                <Typography variant="body">{outcome}</Typography>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Garden Growth */}
      {result.gardenGrowth && (
        <ItalicText variant="body">
          {result.gardenGrowth}
        </ItalicText>
      )}

      {/* For backward compatibility */}
      {result.benefits && (
        <ul>
          {result.benefits.map((benefit, index) => (
            <li key={index}>
              <Typography variant="body">{benefit}</Typography>
            </li>
          ))}
        </ul>
      )}

      {result.conclusion && (
        <ConclusionText variant="body">
          {result.conclusion}
        </ConclusionText>
      )}

      {result.transformationNote && (
        <TransformationNote variant="body">
          {result.transformationNote}
        </TransformationNote>
      )}
    </ContentBlock>
  );
};

export default ResultSection; 