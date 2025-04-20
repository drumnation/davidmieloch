"use client";

import { configureStore } from '@reduxjs/toolkit'
import appReducer from './slices/appSlice';
import playerUiReducer from './slices/playerUiSlice';
import uiReducer from './slices/uiSlice';

// Configure the store with the app reducer AND the new player UI reducer
export const store = configureStore({
  reducer: {
    app: appReducer,
    playerUi: playerUiReducer,
    ui: uiReducer,
  },
});

// Define the RootState type based on the store's state
export type RootState = ReturnType<typeof store.getState>

// Define the AppDispatch type based on the store's dispatch function
export type AppDispatch = typeof store.dispatch 