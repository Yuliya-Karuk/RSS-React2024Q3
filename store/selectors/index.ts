import { type RootState } from '../store';

export const selectFilms = (state: RootState) => state.films.films;
export const selectFavorites = (state: RootState) => state.favorites.favorites;
