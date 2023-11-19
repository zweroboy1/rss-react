import { HttpResponse, http } from 'msw';
import { BEER_ENDPOINT } from '../constants';
import { mockBeers } from './mockData';

export const handlers = [
  http.get(`${BEER_ENDPOINT}/`, () => {
    return HttpResponse.json(mockBeers);
  }),
];
