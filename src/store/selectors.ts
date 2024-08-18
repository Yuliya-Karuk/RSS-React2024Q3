import { type RootState } from './store';

export const selectCountries = (state: RootState) => state.countries.countries;
export const selectForms = (state: RootState) => state.forms.forms;
