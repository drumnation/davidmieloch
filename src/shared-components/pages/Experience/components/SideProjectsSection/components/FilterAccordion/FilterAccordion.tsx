import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import * as S from './FilterAccordion.styles';

interface FilterAccordionProps {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}

export const FilterAccordion: React.FC<FilterAccordionProps> = ({
    title,
    isOpen,
    onToggle,
    children,
}) => {
    return (
        <S.FilterAccordionContainer>
            <S.FilterAccordionHeader onClick={onToggle}>
                <S.FiltersSectionTitle>{title}</S.FiltersSectionTitle>
                <S.AccordionIcon $isOpen={isOpen}>
                    <FaChevronDown />
                </S.AccordionIcon>
            </S.FilterAccordionHeader>
            {isOpen && <S.FilterContent>{children}</S.FilterContent>}
        </S.FilterAccordionContainer>
    );
}; 