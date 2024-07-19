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
