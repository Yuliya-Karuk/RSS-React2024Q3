import { CharacterWithFavorite } from '@models/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FavoritesState = {
  favorites: CharacterWithFavorite[];
};

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<CharacterWithFavorite>) {
      const index = state.favorites.findIndex(item => item.id === action.payload.id);

      if (index !== -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(action.payload);
      }
    },
    clearFavorites(state) {
      state.favorites = [];
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
