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
