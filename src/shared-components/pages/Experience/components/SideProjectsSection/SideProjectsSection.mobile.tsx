import React, { useState } from 'react';
import { useSideProjects } from './SideProjectsSection.hook';
import { PROJECT_CATEGORIES, SECTION_TITLE, SIDE_PROJECTS } from './SideProjectsSection.constants';
import { SideProjectsSectionProps } from './SideProjectsSection.types';
import * as S from './SideProjectsSection.styles';
import { ProjectCard } from './components/ProjectCard';
import { ImageModal } from './components/ImageModal';
import { TechIcon } from '@shared-components/atoms/TechIcon';
import styled from 'styled-components';
import { Drawer, ScrollArea, Button, Group } from '@mantine/core';
import { IconFilter, IconCategory, IconCode } from '@tabler/icons-react';

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
        uniqueTechnologies,
        filteredProjects,
        handleCategoryChange,
        handleTechChange,
        openModal,
        closeModal,
    } = useSideProjects(projects);

    // State for drawers
    const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);
    const [techDrawerOpen, setTechDrawerOpen] = useState(false);

    const openCategoryDrawer = () => setCategoryDrawerOpen(true);
    const closeCategoryDrawer = () => setCategoryDrawerOpen(false);
    const openTechDrawer = () => setTechDrawerOpen(true);
    const closeTechDrawer = () => setTechDrawerOpen(false);

    // Handlers that also close the drawer
    const handleCategorySelect = (category: string | 'All') => {
        handleCategoryChange(category);
        closeCategoryDrawer();
    };
    const handleTechSelect = (tech: string | 'All') => {
        handleTechChange(tech);
        closeTechDrawer();
    };

    return (
        <MobileContainer className={className} id={id}>
            <S.SectionHeader>
                <S.SectionTitle>{title}</S.SectionTitle>
            </S.SectionHeader>

            <S.FilterAndGridWrapper>
                {/* --- Sticky Filter Bar --- */}
                <S.StickyFilterBar>
                    <S.FilterBarButton onClick={openCategoryDrawer}>
                        <IconCategory size={16} />
                        Category: {selectedCategory}
                    </S.FilterBarButton>
                    <S.FilterBarButton onClick={openTechDrawer}>
                        <IconCode size={16} />
                        Tech: {selectedTech}
                    </S.FilterBarButton>
                </S.StickyFilterBar>

                {/* --- Projects Grid --- */}
                {/* Add padding-top to account for sticky bar height */}
                <S.ProjectsGrid style={{ paddingTop: '10px' }}>
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={`${project.title}-${index}`}
                            id={generateId(project)}
                            project={project}
                            onImageClick={openModal}
                            showTechLabels={false} // Keep mobile setting for TechIcon inside card
                        />
                    ))}
                </S.ProjectsGrid>
            </S.FilterAndGridWrapper>

            {/* --- Category Drawer --- */}
            <Drawer
                opened={categoryDrawerOpen}
                onClose={closeCategoryDrawer}
                title="Filter by Category"
                position="bottom"
                size="auto"
                padding="md"
            >
                <S.FiltersContainer>
                    <S.FilterButton
                        $active={selectedCategory === 'All'}
                        onClick={() => handleCategorySelect('All')}
                    >
                        All
                    </S.FilterButton>
                    {PROJECT_CATEGORIES.map(category => (
                        <S.FilterButton
                            key={category}
                            $active={selectedCategory === category}
                            onClick={() => handleCategorySelect(category)}
                        >
                            {category}
                        </S.FilterButton>
                    ))}
                </S.FiltersContainer>
            </Drawer>

            {/* --- Technology Drawer --- */}
            <Drawer
                opened={techDrawerOpen}
                onClose={closeTechDrawer}
                title="Filter by Technology"
                position="bottom"
                size="80%" // Make it taller to fit more tech
                padding="md"
            >
                {/* Use ScrollArea for potentially long list */}
                <ScrollArea style={{ height: 'calc(80vh - 100px)' }}>
                    <S.TechFiltersContainer>
                        <S.TechFilterButton
                            $active={selectedTech === 'All'}
                            onClick={() => handleTechSelect('All')}
                        >
                            All
                        </S.TechFilterButton>
                        {uniqueTechnologies.filter(tech => tech !== 'All').map(tech => (
                            <S.TechFilterButton
                                key={tech}
                                $active={selectedTech === tech}
                                onClick={() => handleTechSelect(tech)}
                            >
                                <TechIcon name={tech} size={16} showTooltip={false} showLabel={true} />
                            </S.TechFilterButton>
                        ))}
                    </S.TechFiltersContainer>
                </ScrollArea>
            </Drawer>

            {/* Image Modal */}
            <ImageModal modalImage={modalImage} onClose={closeModal} />

        </MobileContainer>
    );
}; 