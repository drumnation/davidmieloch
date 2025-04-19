import { EducationItem as EducationItemType } from './EducationSection.types';

// Helper function to check if path is an image file
export const isImageFile = (path: string | undefined): boolean => {
    if (!path) return false;
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    return imageExtensions.some(ext => path.toLowerCase().endsWith(ext));
};

// Helper function to sort education items by date (most recent first)
export const sortEducationByDate = (items: EducationItemType[]): EducationItemType[] => {
    return [...items].sort((a, b) => {
        // First check if there's a custom sort order
        if (a.sortOrder !== undefined && b.sortOrder !== undefined) {
            return a.sortOrder - b.sortOrder;
        }

        // Otherwise sort by date (latest first)
        // Convert string years to numbers
        const endYearA = parseInt(a.endDate?.split(' ')[0] || '0', 10) || 0;
        const endYearB = parseInt(b.endDate?.split(' ')[0] || '0', 10) || 0;

        if (endYearA !== endYearB) {
            return endYearB - endYearA; // Most recent first
        }

        // If end years are the same, sort by start date
        const startYearA = parseInt(a.startDate?.split(' ')[0] || '0', 10) || 0;
        const startYearB = parseInt(b.startDate?.split(' ')[0] || '0', 10) || 0;
        return startYearB - startYearA;
    });
}; 