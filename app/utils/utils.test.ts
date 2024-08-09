import defaultImg from '@assets/images/default-planet.jpg';
import { CharacterWithFavorite } from '@models/index';
import { mockedCharacter, mockedCharacters, mockedFavorites } from '@testSetup/msw/mocks';
import { describe, expect, it } from 'vitest';
import {
  addIdToCharacter,
  addIdToCharacters,
  checkTypesSearchParams,
  extractIdFromUrl,
  extractPlanetPath,
  generateCSVContent,
  getPaginationRange,
  getPlanetImgSrc,
  isNotNullable,
  setFavoriteFlag,
  urlImgTemplates,
} from './utils';

describe('extractIdFromUrl', () => {
  it('should extract the ID from a URL', () => {
    const url = 'https://example.com/api/characters/123/';
    const id = extractIdFromUrl(url);
    expect(id).toBe('123');
  });

  it('should handle URLs with trailing slashes', () => {
    const url = 'https://example.com/api/characters/456/';
    const id = extractIdFromUrl(url);
    expect(id).toBe('456');
  });
});

describe('getPaginationRange', () => {
  it('should return the correct range of pages', () => {
    expect(getPaginationRange(1, 10)).toEqual([1, 2, 3, 4, 5]);
    expect(getPaginationRange(3, 10)).toEqual([1, 2, 3, 4, 5]);
    expect(getPaginationRange(7, 10)).toEqual([6, 7, 8, 9, 10]);
    expect(getPaginationRange(10, 10)).toEqual([6, 7, 8, 9, 10]);
  });
});

describe('urlImgTemplates', () => {
  it('should generate correct URLs for images', () => {
    expect(urlImgTemplates.character('1')).toBe('https://starwars-visualguide.com/assets/img/characters/1.jpg');
    expect(urlImgTemplates.film(4)).toBe('https://starwars-visualguide.com/assets/img/films/4.jpg');
    expect(urlImgTemplates.planet('5')).toBe('https://starwars-visualguide.com/assets/img/planets/5.jpg');
  });
});

describe('isNotNullable', () => {
  it('should return the value if it is not null or undefined', () => {
    expect(isNotNullable('value')).toBe('value');
    expect(isNotNullable(123)).toBe(123);
  });

  it('should throw an error if the value is null or undefined', () => {
    expect(() => isNotNullable(null)).toThrow('Not expected value');
    expect(() => isNotNullable(undefined)).toThrow('Not expected value');
  });

  it('should use the provided error message', () => {
    expect(() => isNotNullable(null, 'Custom error')).toThrow('Custom error');
  });
});

describe('extractPlanetPath', () => {
  it('should extract the correct planet path from a URL', () => {
    const url = 'https://swapi.dev/api/planets/1/';
    expect(extractPlanetPath(url)).toBe('planets/1/');
  });
});

describe('setFavoriteFlag', () => {
  it('should set the isFavorite flag for characters', () => {
    const result = setFavoriteFlag(mockedCharacters.results, mockedFavorites);
    expect(result[0].isFavorite).toBe(true);
  });

  it('should set isFavorite to false if the character is not in favorites', () => {
    const favorites: CharacterWithFavorite[] = [];

    const result = setFavoriteFlag(mockedCharacters.results, favorites);
    expect(result[0].isFavorite).toBe(false);
  });
});

describe('generateCSVContent', () => {
  it('should generate correct CSV content', () => {
    const characters: CharacterWithFavorite[] = mockedFavorites;

    const csvContent = generateCSVContent(characters);

    expect(csvContent).toContain('Name,Height,Mass,Hair Color');
    expect(csvContent).toContain('Luke Skywalker Mocked,172,77,blond');
  });
});

describe('addIdToCharacter', () => {
  it('should add an ID to a character', () => {
    const result = addIdToCharacter(mockedCharacter);
    expect(result.id).toBe('1');
  });
});

describe('addIdToCharacters', () => {
  it('should add IDs to all characters in the response', () => {
    const result = addIdToCharacters(mockedCharacters);
    expect(result.results[0].id).toBe('1');
  });
});

describe('checkTypesSearchParams', () => {
  it('should return the correct search parameters', () => {
    const params = { page: '2', query: 'test', details: 'details' };
    const result = checkTypesSearchParams(params);
    expect(result).toEqual({
      searchDetails: 'details',
      currentPage: 2,
      searchQuery: 'test',
    });
  });

  it('should handle default values for missing params', () => {
    const params = {};
    const result = checkTypesSearchParams(params);
    expect(result).toEqual({
      searchDetails: '',
      currentPage: 1,
      searchQuery: '',
    });
  });
});

describe('getPlanetImgSrc', () => {
  it('should return the correct planet image URL if the planet ID is not in PlanetWithoutImg', () => {
    const validPlanetUrl = 'https://swapi.dev/api/planets/5/';
    const expectedUrl = urlImgTemplates.planet('5');
    const result = getPlanetImgSrc(validPlanetUrl);
    expect(result).toBe(expectedUrl);
  });

  it('should return the default image if the planet ID is in PlanetWithoutImg', () => {
    const invalidPlanetUrl = 'https://swapi.dev/api/planets/1/';
    const result = getPlanetImgSrc(invalidPlanetUrl);
    expect(result).toBe(defaultImg);
  });
});
