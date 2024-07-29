import { CharacterWithId, Film } from '@/models/index';
import { createSlice } from '@reduxjs/toolkit';
import { swapiApi } from './api/swapiApi';

const productPerPage: number = 10;

type CharactersState = {
  characters: CharacterWithId[] | null;
  totalPages: number;
  error: string | null;
  films: Film[];
};

const initialState: CharactersState = {
  characters: [],
  totalPages: 0,
  error: null,
  films: [],
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters(state, action) {
      state.totalPages = Math.ceil(action.payload.count / productPerPage);
      state.characters = action.payload.results;
    },
    setFilms(state, action) {
      state.films = action.payload.results;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(swapiApi.endpoints.getFilms.matchFulfilled, (state, action) => {
      state.films = action.payload.results;
    });
  },
});

export const { setCharacters, setFilms } = charactersSlice.actions;
export const charactersReducer = charactersSlice.reducer;
