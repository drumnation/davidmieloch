import { FC } from 'react';
import { Typography } from '../../../../../shared-components/atoms/Typography';
import { ContentBlock, SectionTitle, SubsectionTitle } from '../../TechnicalImplementation.styles';
import { SecurityControlSectionProps } from './SecurityControlSection.types';

export const SecurityControlSection: FC<SecurityControlSectionProps> = ({
  className,
  securityControl
}) => {
  return (
    <ContentBlock className={className}>
      <SectionTitle>{securityControl.title}</SectionTitle>
      <Typography variant="body">
        {securityControl.description}
      </Typography>

      <SubsectionTitle>Access Control</SubsectionTitle>
      <ul>
        {securityControl.accessControl.map((item, index) => (
          <li key={index}>
            <Typography variant="body">{item}</Typography>
          </li>
        ))}
      </ul>

      <SubsectionTitle>Knowledge Protection</SubsectionTitle>
      <ul>
        {securityControl.knowledgeProtection.map((item, index) => (
          <li key={index}>
            <Typography variant="body">{item}</Typography>
          </li>
        ))}
      </ul>

      <SubsectionTitle>Integration Security</SubsectionTitle>
      <ul>
        {securityControl.integrationSecurity.map((item, index) => (
          <li key={index}>
            <Typography variant="body">{item}</Typography>
          </li>
        ))}
      </ul>
    </ContentBlock>
  );
};

export default SecurityControlSection;
