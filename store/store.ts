// import { configureStore } from '@reduxjs/toolkit';
// import { swapiApi } from './api/swapiApi';
// import { charactersReducer } from './charactersSlice';
// import { favoritesReducer } from './favoritesSlice';
// import { errorsNotifyMiddleware } from './middlewares/errorNotifyMiddleware';

// export const store = configureStore({
//   reducer: {
//     [swapiApi.reducerPath]: swapiApi.reducer,
//     characters: charactersReducer,
//     favorites: favoritesReducer,
//   },
//   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(swapiApi.middleware, errorsNotifyMiddleware),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { swapiApi } from './api/swapiApi';
import { charactersReducer } from './charactersSlice';
import { favoritesReducer } from './favoritesSlice';
import { errorsNotifyMiddleware } from './middlewares/errorNotifyMiddleware';

const makeStore = () =>
  configureStore({
    reducer: {
      [swapiApi.reducerPath]: swapiApi.reducer,
      characters: charactersReducer,
      favorites: favoritesReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(swapiApi.middleware, errorsNotifyMiddleware),
  });

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

export const wrapper = createWrapper(makeStore);
