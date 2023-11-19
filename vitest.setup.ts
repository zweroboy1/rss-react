import '@testing-library/jest-dom/vitest';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
import { server } from './src/mock/server';


beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
}
);

afterAll(() => {
  vi.clearAllMocks();
  server.close();
});
