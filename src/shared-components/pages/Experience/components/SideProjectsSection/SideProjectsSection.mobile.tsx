import React from 'react';
import { useSideProjects } from './SideProjectsSection.hook';
import { PROJECT_CATEGORIES, SECTION_TITLE, SIDE_PROJECTS } from './SideProjectsSection.constants';
import { SideProjectsSectionProps } from './SideProjectsSection.types';
import * as S from './SideProjectsSection.styles';
import { FilterAccordion } from './components/FilterAccordion';
import { ProjectCard } from './components/ProjectCard';
import { ImageModal } from './components/ImageModal';
import { TechIcon } from '@shared-components/atoms/TechIcon';
import styled from 'styled-components'; // Added for MobileContainer

// Basic container similar to ExperienceSection.mobile
const MobileContainer = styled.div`
  margin-bottom: 24px;

  h2 {
    font-size: 1.25rem;
    margin-bottom: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9);
    padding: 0 15px; // Add padding consistent with container
  }
`;

// Renamed component
export const SideProjectsSectionMobile: React.FC<SideProjectsSectionProps> = ({
    projects = SIDE_PROJECTS,
    title = SECTION_TITLE,
    className,
    id,
    generateId,
}) => {
    const {
        selectedCategory,
        selectedTech,
        modalImage,
        categoryFilterOpen,
        techFilterOpen,
        uniqueTechnologies,
        filteredProjects,
        handleCategoryChange,
        handleTechChange,
        toggleCategoryFilter,
        toggleTechFilter,
        openModal,
        closeModal,
    } = useSideProjects(projects);

    return (
        // Use the simpler MobileContainer instead of S.SideProjectsContainer
        <MobileContainer className={className} id={id}>
            <S.SectionHeader>
                <S.SectionTitle>{title}</S.SectionTitle>
            </S.SectionHeader>

            {/* Filters might need adjustments for mobile view, but keep structure for now */}
            <FilterAccordion
                title="Filter by Category"
                isOpen={categoryFilterOpen}
                onToggle={toggleCategoryFilter}
            >
                <S.FiltersContainer>
                    <S.FilterButton
                        $active={selectedCategory === 'All'}
                        onClick={() => handleCategoryChange('All')}
                    >
                        All
                    </S.FilterButton>
                    {PROJECT_CATEGORIES.map(category => (
                        <S.FilterButton
                            key={category}
                            $active={selectedCategory === category}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </S.FilterButton>
                    ))}
                </S.FiltersContainer>
            </FilterAccordion>

            <FilterAccordion
                title="Filter by Technology"
                isOpen={techFilterOpen}
                onToggle={toggleTechFilter}
            >
                {/* Consider a scrollable container for mobile tech filters */}
                <S.TechFiltersContainer style={{ flexWrap: 'nowrap', overflowX: 'auto' }}>
                    <S.TechFilterButton
                        $active={selectedTech === 'All'}
                        onClick={() => handleTechChange('All')}
                    >
                        All
                    </S.TechFilterButton>
                    {uniqueTechnologies.filter(tech => tech !== 'All').map(tech => (
                        <S.TechFilterButton
                            key={tech}
                            $active={selectedTech === tech}
                            onClick={() => handleTechChange(tech)}
                        >
                            {/* Pass showLabel={false} explicitly for mobile */}
                            <TechIcon name={tech} size={16} showTooltip={false} showLabel={false} />
                        </S.TechFilterButton>
                    ))}
                </S.TechFiltersContainer>
            </FilterAccordion>

            {/* Projects Grid */}
            <S.ProjectsGrid>
                {filteredProjects.map((project, index) => (
                    <ProjectCard
                        key={`${project.title}-${index}`}
                        id={generateId(project)}
                        project={project}
                        onImageClick={openModal}
                        showTechLabels={false}
                    />
                ))}
            </S.ProjectsGrid>

            {/* Image Modal */}
            <ImageModal modalImage={modalImage} onClose={closeModal} />

        </MobileContainer>
    );
}; 