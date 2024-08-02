import { Film } from '@models/index';
import { createSlice } from '@reduxjs/toolkit';
import { swapiApi } from './api/swapiApi';

type CharactersState = {
  films: Film[];
};

const initialState: CharactersState = {
  films: [],
};

const filmsSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(swapiApi.endpoints.getFilms.matchFulfilled, (state, action) => {
      state.films = action.payload.results;
    });
  },
});

export const filmsReducer = filmsSlice.reducer;
