import { useState, useMemo, useCallback } from 'react';
import { SIDE_PROJECTS } from './SideProjectsSection.constants';
import { SideProject } from './SideProjectsSection.types';
import { MediaItem } from '../../Experience.types';

export const useSideProjects = (initialProjects: SideProject[] = SIDE_PROJECTS) => {
    const [selectedCategory, setSelectedCategory] = useState<string | 'All'>('All');
    const [selectedTech, setSelectedTech] = useState<string | 'All'>('All');
    const [modalImage, setModalImage] = useState<MediaItem | null>(null);
    const [categoryFilterOpen, setCategoryFilterOpen] = useState<boolean>(true);
    const [techFilterOpen, setTechFilterOpen] = useState<boolean>(false);

    const uniqueTechnologies = useMemo(() => {
        const techSet = new Set<string>();
        techSet.add('All');
        initialProjects.forEach(project => {
            if (project.technologies && project.technologies.length > 0) {
                project.technologies.forEach(tech => techSet.add(tech));
            }
        });
        return Array.from(techSet).sort();
    }, [initialProjects]);

    const filteredProjects = useMemo(() => {
        const filtered = initialProjects.filter(project => {
            const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
            const matchesTech = selectedTech === 'All' || (project.technologies && project.technologies.includes(selectedTech));
            return matchesCategory && matchesTech;
        });

        return filtered.sort((a, b) => {
            const hasEndDateA = !!a.endDate;
            const hasEndDateB = !!b.endDate;
            if (hasEndDateA && !hasEndDateB) return -1;
            if (!hasEndDateA && hasEndDateB) return 1;
            if (hasEndDateA && hasEndDateB) {
                if (a.endDate === 'Present' && b.endDate !== 'Present') return -1;
                if (a.endDate !== 'Present' && b.endDate === 'Present') return 1;
                if (a.endDate !== 'Present' && b.endDate !== 'Present') {
                    const yearA = parseInt(a.endDate || '0');
                    const yearB = parseInt(b.endDate || '0');
                    if (isNaN(yearA) || isNaN(yearB)) {
                        return (a.endDate || '').localeCompare(b.endDate || '');
                    }
                    if (yearA !== yearB) return yearB - yearA;
                }
                return a.title.localeCompare(b.title);
            }
            return a.title.localeCompare(b.title);
        });
    }, [initialProjects, selectedCategory, selectedTech]);

    const handleCategoryChange = useCallback((category: string | 'All') => {
        setSelectedCategory(category);
    }, []);

    const handleTechChange = useCallback((tech: string | 'All') => {
        setSelectedTech(tech);
    }, []);

    const toggleCategoryFilter = useCallback(() => {
        setCategoryFilterOpen(prev => !prev);
    }, []);

    const toggleTechFilter = useCallback(() => {
        setTechFilterOpen(prev => !prev);
    }, []);

    const openModal = useCallback((image: MediaItem) => {
        setModalImage(image);
    }, []);

    const closeModal = useCallback(() => {
        setModalImage(null);
    }, []);

    return {
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
    };
}; 