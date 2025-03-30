import React, { useState } from 'react';
import { 
  AccordionContainer, 
  AccordionHeader,
  AccordionContent,
  HeaderContent,
  Title,
  Subtitle,
  IconContainer
} from './Accordion.styles';
import { AccordionProps } from './Accordion.types';

export const Accordion: React.FC<AccordionProps> = ({
  title,
  subtitle,
  children,
  className,
  initiallyOpen = false
}) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const toggleAccordion = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <AccordionContainer className={className}>
      <AccordionHeader isOpen={isOpen} onClick={toggleAccordion}>
        <HeaderContent>
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </HeaderContent>
        <IconContainer isOpen={isOpen}>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.41 0.589844L6 5.16984L10.59 0.589844L12 1.99984L6 7.99984L0 1.99984L1.41 0.589844Z" fill="currentColor" />
          </svg>
        </IconContainer>
      </AccordionHeader>
      <AccordionContent isOpen={isOpen}>
        {children}
      </AccordionContent>
    </AccordionContainer>
  );
}; 