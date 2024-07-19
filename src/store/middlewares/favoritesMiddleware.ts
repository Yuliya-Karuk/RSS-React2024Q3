import { Middleware } from '@reduxjs/toolkit';

export const favoritesNotifyMiddleware: Middleware = () => next => action => {
  const result = next(action);

  return result;
};
