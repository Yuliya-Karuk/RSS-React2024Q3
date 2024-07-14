import { delay, http, HttpResponse } from 'msw';
import { characters, mockDetails, mockedPlanet } from './mocks';

export const handlers = [
  http.get('*/people', () => HttpResponse.json(characters)),
  http.get('https://swapi.dev/api/people/1/', () => {
    delay();
    return HttpResponse.json(mockDetails);
  }),
  http.get('https://swapi.dev/api/planets/1/', () => HttpResponse.json(mockedPlanet)),
];
