import {
  Character,
  CharacterWithFavorite,
  CharacterWithId,
  PaginatedCharacters,
  PaginatedCharactersWithId,
} from '@models/index';

export const extractIdFromUrl = (url: string): string => {
  const parts = url.split('/');
  return parts[parts.length - 2];
};

export const getPaginationRange = (currentPage: number, totalPages: number) => {
  const rangeSize = 5;
  const start = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1;
  const end = Math.min(start + rangeSize - 1, totalPages);

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export const urlImgTemplates = {
  character: (characterId: string) => `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`,
  film: (episodeId: number) => `https://starwars-visualguide.com/assets/img/films/${episodeId}.jpg`,
  planet: (planetId: string) => `https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg`,
};

export function isNotNullable<T>(value: T, errorMessage?: string): NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(errorMessage || 'Not expected value');
  }
  return value;
}

export function extractPlanetPath(url: string) {
  const baseUrl = 'https://swapi.dev/api/';
  return url.slice(baseUrl.length);
}

export function setFavoriteFlag(
  characters: CharacterWithId[],
  favorites: CharacterWithFavorite[]
): CharacterWithFavorite[] {
  const favoriteIds = new Set(favorites.map(fav => fav.id));

  return characters.map(character => ({
    ...character,
    isFavorite: favoriteIds.has(character.id),
  }));
}

function formatCSVValue(value: string[] | string): string {
  let formattedValue: string;

  if (Array.isArray(value)) {
    formattedValue = value.join(', ');
  } else {
    formattedValue = value;
  }

  if (/[",]/.test(formattedValue)) {
    formattedValue = `"${formattedValue}"`;
  }

  return formattedValue;
}

export function generateCSVContent(characters: CharacterWithFavorite[]): string {
  const headers = [
    'Name',
    'Height',
    'Mass',
    'Hair Color',
    'Skin Color',
    'Eye Color',
    'Birth Year',
    'Gender',
    'Homeworld',
    'Films',
    'Species',
    'Vehicles',
    'Starships',
    'Created',
    'Edited',
    'URL',
  ];

  const rows = characters.map(character => [
    character.name || '',
    character.height || '',
    character.mass || '',
    formatCSVValue(character.hair_color),
    formatCSVValue(character.skin_color),
    formatCSVValue(character.eye_color),
    character.birth_year || '',
    character.gender || '',
    character.homeworld || '',
    formatCSVValue(character.films),
    formatCSVValue(character.species),
    formatCSVValue(character.vehicles),
    formatCSVValue(character.starships),
    character.created || '',
    character.edited || '',
    character.url || '',
  ]);

  const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  return csvContent;
}

export const SWAPI_BASE_URL = 'https://swapi.dev/api/';

export const addIdToCharacter = (character: Character): CharacterWithId => {
  const id = extractIdFromUrl(character.url);

  return {
    ...character,
    id,
  };
};

export const addIdToCharacters = (response: PaginatedCharacters): PaginatedCharactersWithId => ({
  ...response,
  results: response.results.map(addIdToCharacter),
});

type CheckAppFunctionParams = Record<string, unknown>;

type AppSearchParams = {
  searchDetails: string;
  currentPage: number;
  searchQuery: string;
};

export function checkTypesSearchParams({ page, query, details }: CheckAppFunctionParams): AppSearchParams {
  return {
    searchDetails: typeof details === 'string' ? details : '',
    currentPage: typeof page === 'string' ? +page : 1,
    searchQuery: typeof query === 'string' ? query : '',
  };
}
