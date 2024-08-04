/// <reference types="vitest/globals" />
import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from './msw/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

vi.mock('@public/icons/heart.svg', () => ({
  default: 'svg-mock',
}));
