/* eslint-disable consistent-return */
import {
  Character,
  CharacterWithId,
  PaginatedCharacters,
  PaginatedCharactersWithId,
  PaginatedFilms,
  Planet,
} from '@models/index';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { extractIdFromUrl } from '@utils/utils';
import { HYDRATE } from 'next-redux-wrapper';

const SWAPI_BASE_URL = 'https://swapi.dev/api/';

const addIdToCharacter = (character: Character): CharacterWithId => {
  const id = extractIdFromUrl(character.url);

  return {
    ...character,
    id,
  };
};

const addIdToCharacters = (response: PaginatedCharacters): PaginatedCharactersWithId => ({
  ...response,
  results: response.results.map(addIdToCharacter),
});

export const swapiApi = createApi({
  reducerPath: 'swapiApi',
  baseQuery: fetchBaseQuery({ baseUrl: SWAPI_BASE_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: builder => ({
    searchPeople: builder.query<PaginatedCharactersWithId, { searchValue: string; page?: number }>({
      query: ({ searchValue, page }) => `people/?search=${searchValue}&page=${page}`,
      transformResponse: addIdToCharacters,
    }),
    getCharacterById: builder.query<CharacterWithId, string>({
      query: id => `people/${id}`,
      transformResponse: addIdToCharacter,
    }),
    getPlanet: builder.query<Planet, string>({
      query: url => `${url}`,
    }),
    getFilms: builder.query<PaginatedFilms, void>({
      query: () => 'films',
    }),
  }),
});

export const {
  useSearchPeopleQuery,
  useLazyGetCharacterByIdQuery,
  useGetCharacterByIdQuery,
  useGetPlanetQuery,
  useGetFilmsQuery,
  util: { getRunningQueriesThunk },
} = swapiApi;
