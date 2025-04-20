export const slugify = (text: string): string => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        // Replace spaces with -
        .replace(/\s+/g, '-')
        // Replace & with 'and'
        .replace(/&/g, '-and-')
        // Remove all non-word chars
        .replace(/[^\w-]+/g, '')
        // Replace multiple - with single -
        .replace(/--+/g, '-')
        // Trim - from start of text
        .replace(/^-+/, '')
        // Trim - from end of text
        .replace(/-+$/, '');
};

// New helper function
import { SubNavItem } from './PageSubNav.types';

export const getParentId = (itemId: string | null, items: SubNavItem[]): string | null => {
    if (!itemId) return null;

    let currentParentId: string | null = null;
    for (const item of items) {
        if (item.level === 0) {
            currentParentId = item.id;
        }
        if (item.id === itemId) {
            // If the item itself is level 0, it's its own parent for expansion purposes
            // Otherwise, return the last found level 0 ID
            return item.level === 0 ? item.id : currentParentId;
        }
    }
    return null; // Item ID not found in the list
}; 