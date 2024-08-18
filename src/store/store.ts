import { configureStore } from '@reduxjs/toolkit';
import { countriesReducer } from './slices/countriesSlice';
import { formsReducer } from './slices/formsSlice';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    forms: formsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
