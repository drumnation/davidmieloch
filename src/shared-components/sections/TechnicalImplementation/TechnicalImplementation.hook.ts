import { TechnicalImplementationProps } from './TechnicalImplementation.types';
import { defaultContent } from './TechnicalImplementation.constants';

export const useTechnicalImplementation = (props: TechnicalImplementationProps) => {
  const {
    className,
    title = defaultContent.title,
    subtitle = defaultContent.subtitle,
    systemOverviewDiagram = defaultContent.systemOverviewDiagram,
    agentSystemDiagram = defaultContent.agentSystemDiagram,
    integrationSystemDiagram = defaultContent.integrationSystemDiagram,
    knowledgeFlowDiagram = defaultContent.knowledgeFlowDiagram,
    performanceScalabilityDiagram = defaultContent.performanceScalabilityDiagram,
    knowledgeSystem = defaultContent.knowledgeSystem,
    agentSystem = defaultContent.agentSystem,
    integrationSystem = defaultContent.integrationSystem,
    securityControl = defaultContent.securityControl,
    performanceScalability = defaultContent.performanceScalability,
    result = defaultContent.result
  } = props;

  return {
    className,
    title,
    subtitle,
    systemOverviewDiagram,
    agentSystemDiagram,
    integrationSystemDiagram,
    knowledgeFlowDiagram,
    performanceScalabilityDiagram,
    knowledgeSystem,
    agentSystem,
    integrationSystem,
    securityControl,
    performanceScalability,
    result
  };
}; 