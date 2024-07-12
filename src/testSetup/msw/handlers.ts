import { http, HttpResponse } from 'msw';
import { characterNotFound, characters, mockDetails } from './mocks';

export const handlers = [
  http.get('/people', () => HttpResponse.json(characters)),
  http.get('/people/1', ({ request }) => {
    const url = new URL(request.url);

    const detailsQuery = url.searchParams.get('details');

    if (detailsQuery === '1') {
      return HttpResponse.json(mockDetails);
    }
    return HttpResponse.json(characterNotFound);
  }),
];
