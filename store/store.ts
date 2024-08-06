import { configureStore } from '@reduxjs/toolkit';
import { favoritesReducer } from './favoritesSlice';
import { errorsNotifyMiddleware } from './middlewares/errorNotifyMiddleware';

export const makeStore = () =>
  configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(errorsNotifyMiddleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
