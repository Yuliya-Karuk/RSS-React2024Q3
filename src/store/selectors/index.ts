import { type RootState } from '../store';

export const selectCharacters = (state: RootState) => state.characters.characters;
export const selectTotalPages = (state: RootState) => state.characters.totalPages;
export const selectFilms = (state: RootState) => state.characters.films;
export const selectFavorites = (state: RootState) => state.favorites.favorites;
