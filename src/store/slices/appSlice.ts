import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
    isLoading: boolean;
    theme: 'light' | 'dark'; // Example theme type
}

const initialState: AppState = {
    isLoading: false,
    theme: 'light',
};

// Create a simple app slice with initial state
const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload;
        },
    },
});

// Export actions
export const { setLoading, setTheme } = appSlice.actions;

// Export the reducer
export default appSlice.reducer; 