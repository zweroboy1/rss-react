import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { server } from '@/mock/server';

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
}
);

afterAll(() => {
  vi.clearAllMocks();
  server.close();
});
