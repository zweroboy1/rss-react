import { NextRouter } from 'next/router';
import { vi } from 'vitest';

const createMockRouter = (router: Partial<NextRouter> = {}): NextRouter => {
  return {
    route: 'string',
    pathname: '/',
    query: {},
    asPath: 'string',
    basePath: '/',
    locale: 'string',
    locales: [],
    defaultLocale: 'string',
    domainLocales: [],
    isLocaleDomain: false,
    push: vi.fn(),
    forward: vi.fn(),
    isReady: false,
    isPreview: false,
    replace: vi.fn(),
    reload: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
    beforePopState: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
    isFallback: false,
    ...router,
  };
};
export default createMockRouter;
