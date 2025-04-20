import React from 'react';
import { FaChevronDown } from 'react-icons/fa'; // Import icon
// Import local styles
import {
    AccordionContainer,
    AccordionHeader,
    AccordionTitle,
    AccordionSubtitle,
    IconContainer,
    AccordionContent as StyledAccordionContent,
    HeaderContent as StyledHeaderContent, // Keeping this for now
} from './Accordion.styles';
import { AccordionProps } from './Accordion.types';
import { useAccordion } from './Accordion.hook';

export const Accordion: React.FC<AccordionProps> = ({
    title,
    subtitle,
    children,
    className,
    initiallyOpen = false,
    id,
    style,
}) => {
    const { isOpen, toggleAccordion } = useAccordion(initiallyOpen);

    return (
        <AccordionContainer id={id} className={className} style={style}>
            <AccordionHeader $isOpen={isOpen} onClick={toggleAccordion}>
                <StyledHeaderContent>
                    <AccordionTitle>{title}</AccordionTitle>
                    {subtitle && <AccordionSubtitle>{subtitle}</AccordionSubtitle>}
                </StyledHeaderContent>
                <IconContainer $isOpen={isOpen}>
                    {/* Use imported icon */}
                    <FaChevronDown size={12} color="rgba(0, 0, 0, 0.6)" />
                </IconContainer>
            </AccordionHeader>
            <StyledAccordionContent $isOpen={isOpen}>{children}</StyledAccordionContent>
        </AccordionContainer>
    );
}; 