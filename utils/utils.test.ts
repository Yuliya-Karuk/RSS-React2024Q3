import { describe, expect, it } from 'vitest';
import {
  checkTypesSearchParams,
  extractIdFromUrl,
  extractPlanetPath,
  getPaginationRange,
  isNotNullable,
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

// describe('setFavoriteFlag', () => {
//   it('should set the isFavorite flag for characters', () => {
//     const characters: CharacterWithId[] = [{ id: '1', name: 'Luke' }];
//     const favorites: CharacterWithFavorite[] = [{ id: '1', name: 'Luke', isFavorite: true }];

//     const result = setFavoriteFlag(characters, favorites);
//     expect(result[0].isFavorite).toBe(true);
//   });

//   it('should set isFavorite to false if the character is not in favorites', () => {
//     const characters: CharacterWithId[] = [{ id: '2', name: 'Leia' }];
//     const favorites: CharacterWithFavorite[] = [{ id: '1', name: 'Luke', isFavorite: true }];

//     const result = setFavoriteFlag(characters, favorites);
//     expect(result[0].isFavorite).toBe(false);
//   });
// });

// describe('generateCSVContent', () => {
//   it('should generate correct CSV content', () => {
//     const characters: CharacterWithFavorite[] = [mockedReadyCharacter];

//     const csvContent = generateCSVContent(characters);

//     expect(csvContent).toContain('Name,Height,Mass,Hair Color');
//     expect(csvContent).toContain('Luke Skywalker,172,77,blond');
//   });
// });

// describe('addIdToCharacter', () => {
//   it('should add an ID to a character', () => {
//     const character: Character = { url: 'https://swapi.dev/api/people/1/', name: 'Luke' };
//     const result = addIdToCharacter(character);
//     expect(result.id).toBe('1');
//   });
// });

// describe('addIdToCharacters', () => {
//   it('should add IDs to all characters in the response', () => {
//     const response: PaginatedCharacters = {
//       count: 1,
//       next: null,
//       previous: null,
//       results: [{ url: 'https://swapi.dev/api/people/1/', name: 'Luke' }],
//     };

//     const result = addIdToCharacters(response);
//     expect(result.results[0].id).toBe('1');
//   });
// });

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
