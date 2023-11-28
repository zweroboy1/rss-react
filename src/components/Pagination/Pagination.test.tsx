import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { describe, expect, it } from 'vitest';
import { Pagination } from './';

import createMockRouter from '../../mock/createMockRouter';

describe('Pagination component', () => {
  const testQuery = 'test';
  const startPage = 2;
  const startLimit = 8;
  const newLimit = 20;
  userEvent.setup();

  it('should updates URL query parameters when click button or change limit', async () => {
    const mockRouter = createMockRouter({
      query: {
        query: testQuery,
        page: String(startPage),
        limit: String(startLimit),
      },
    });
    act(() => {
      render(
        <RouterContext.Provider value={mockRouter}>
          <Pagination />
        </RouterContext.Provider>
      );
    });

    const prevButton = screen.getByTestId('prev');
    await userEvent.click(prevButton);
    expect(mockRouter.push).toBeCalledWith({
      query: {
        query: testQuery,
        page: String(startPage - 1),
        limit: String(startLimit),
      },
    });

    const nextButton = screen.getByTestId('next');
    await userEvent.click(nextButton);
    expect(mockRouter.push).toBeCalledWith({
      query: {
        query: testQuery,
        page: String(startPage + 1),
        limit: String(startLimit),
      },
    });

    const selectElement = screen.getByTestId('select');
    fireEvent.change(selectElement, { target: { value: String(newLimit) } });
    expect(mockRouter.push).toBeCalledWith({
      query: {
        query: testQuery,
        page: String(1),
        limit: String(newLimit),
      },
    });
  });
});
