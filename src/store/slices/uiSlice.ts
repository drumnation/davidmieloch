import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index'; // Adjust if your RootState type is located elsewhere

// Define the interface for the UI state
export interface UiState {
    isMobileMenuOpen: boolean;
    isPlayerMinimized: boolean; // Added player minimized state
    // ... other UI states
}

// Define the initial state using that type
const initialState: UiState = {
    isMobileMenuOpen: false,
    isPlayerMinimized: false, // Default state
    // ... other initial UI states
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleMobileMenu: (state) => {
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        },
        setPlayerMinimized: (state, action: PayloadAction<boolean>) => {
            state.isPlayerMinimized = action.payload;
        },
        // ... other reducers corresponding to your actions
    },
});

// Export actions
export const { toggleMobileMenu, setPlayerMinimized } = uiSlice.actions;

// Export selectors if needed (optional, but good practice)
export const selectIsMobileMenuOpen = (state: RootState): boolean => state.ui.isMobileMenuOpen;
export const selectIsPlayerMinimized = (state: RootState): boolean => state.ui.isPlayerMinimized;

// Export the reducer
export default uiSlice.reducer; 