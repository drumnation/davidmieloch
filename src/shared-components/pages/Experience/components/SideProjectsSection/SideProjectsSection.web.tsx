import React from 'react';
import { useSideProjects } from './SideProjectsSection.hook';
import { PROJECT_CATEGORIES, SECTION_TITLE, SIDE_PROJECTS } from './SideProjectsSection.constants';
import { SideProjectsSectionProps } from './SideProjectsSection.types';
import * as S from './SideProjectsSection.styles';
import { FilterAccordion } from './components/FilterAccordion';
import { ProjectCard } from './components/ProjectCard';
import { ImageModal } from './components/ImageModal';
import { TechIcon } from '@shared-components/atoms/TechIcon';

// Renamed component
export const SideProjectsSectionWeb: React.FC<SideProjectsSectionProps> = ({
    projects = SIDE_PROJECTS,
    title = SECTION_TITLE,
    className,
    id,
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
        <S.SideProjectsContainer className={className} id={id}>
            <S.SectionHeader>
                <S.SectionTitle>{title}</S.SectionTitle>
            </S.SectionHeader>

            {/* Category Filter Accordion */}
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

            {/* Technology Filter Accordion */}
            <FilterAccordion
                title="Filter by Technology"
                isOpen={techFilterOpen}
                onToggle={toggleTechFilter}
            >
                <S.TechFiltersContainer>
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
                            {/* Pass showLabel={true} explicitly for web */}
                            <TechIcon name={tech} size={16} showTooltip={false} showLabel={true} />
                            {/* Removed redundant span */}
                        </S.TechFilterButton>
                    ))}
                </S.TechFiltersContainer>
            </FilterAccordion>

            {/* Projects Grid */}
            <S.ProjectsGrid>
                {filteredProjects.map((project, index) => (
                    <ProjectCard
                        key={`${project.title}-${index}`}
                        project={project}
                        onImageClick={openModal}
                        // Pass showTechLabels={true} for web
                        showTechLabels={true}
                    />
                ))}
            </S.ProjectsGrid>

            {/* Image Modal */}
            <ImageModal modalImage={modalImage} onClose={closeModal} />

        </S.SideProjectsContainer>
    );
};

// Default export might not be needed depending on the main wrapper
// export default SideProjectsSectionWeb; 