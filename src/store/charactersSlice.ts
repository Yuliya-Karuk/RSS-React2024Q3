import { Character } from '@models/index';
import { createSlice } from '@reduxjs/toolkit';

const productPerPage: number = 10;

type CharactersState = {
  characters: Character[] | null;
  totalPages: number;
  error: string | null;
};

const initialState: CharactersState = {
  characters: [],
  totalPages: 0,
  error: null,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters(state, action) {
      state.totalPages = Math.ceil(action.payload.count / productPerPage);
      state.characters = action.payload.results;
    },
  },
});

export const { setCharacters } = charactersSlice.actions;
export const charactersReducer = charactersSlice.reducer;
