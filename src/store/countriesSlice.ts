import { createSlice } from '@reduxjs/toolkit';
import { countries } from '../utils/countries';

type FavoritesState = {
  countries: string[];
};

const initialState: FavoritesState = {
  countries: countries,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export const countriesReducer = countriesSlice.reducer;
