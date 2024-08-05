import { configureStore } from '@reduxjs/toolkit';
import { swapiApi } from './api/swapiApi';
import { favoritesReducer } from './favoritesSlice';
import { errorsNotifyMiddleware } from './middlewares/errorNotifyMiddleware';

export const makeStore = () =>
  configureStore({
    reducer: {
      [swapiApi.reducerPath]: swapiApi.reducer,
      favorites: favoritesReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(swapiApi.middleware, errorsNotifyMiddleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
