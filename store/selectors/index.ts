import { type RootState } from '../store';

export const selectFavorites = (state: RootState) => state.favorites.favorites;
