"use client";

import { configureStore, createSlice } from '@reduxjs/toolkit'

// Create a simple app slice with initial state
const appSlice = createSlice({
  name: 'app',
  initialState: {
    isLoading: false,
    theme: 'light',
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

// Export actions
export const { setLoading, setTheme } = appSlice.actions;

// Configure the store with the app reducer
export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 