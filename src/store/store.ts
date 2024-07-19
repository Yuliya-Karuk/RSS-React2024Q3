import { configureStore } from '@reduxjs/toolkit';
import { swapiApi } from './api/swapiApi';
import { charactersReducer } from './charactersSlice';

export const store = configureStore({
  reducer: {
    [swapiApi.reducerPath]: swapiApi.reducer,
    characters: charactersReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(swapiApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
