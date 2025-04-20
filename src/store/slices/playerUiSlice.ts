import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index'; // Import RootState

// Define the state interface
interface PlayerUiState {
    isMinimized: boolean;
    // Add other player UI related states here if needed
    // e.g., isPlaylistVisible: boolean;
}

// Define the initial state
const initialState: PlayerUiState = {
    isMinimized: false,
    // isPlaylistVisible: false,
};

// Create the slice
const playerUiSlice = createSlice({
    name: 'playerUi',
    initialState,
    reducers: {
        // Action to set the minimized state
        setPlayerMinimized: (state, action: PayloadAction<boolean>) => {
            state.isMinimized = action.payload;
        },
        // Action to toggle the minimized state (useful for buttons)
        togglePlayerMinimized: (state) => {
            state.isMinimized = !state.isMinimized;
        },
        // Add other reducers for player UI actions here
        // e.g., togglePlaylistVisibility(state) { ... }
    },
});

// Export the actions
export const {
    setPlayerMinimized,
    togglePlayerMinimized,
    // Export other actions
} = playerUiSlice.actions;

// Export the selector
export const selectIsPlayerMinimized = (state: RootState): boolean => state.playerUi.isMinimized;
// Export other selectors as needed
// export const selectIsPlaylistVisible = (state: RootState) => state.playerUi.isPlaylistVisible;

// Export the reducer
export default playerUiSlice.reducer; 