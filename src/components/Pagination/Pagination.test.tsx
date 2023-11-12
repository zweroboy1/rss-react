import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppContextProvider } from '../../context/AppContextProvider';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Pagination } from './';

describe('Pagination component', () => {
  const testQuery = 'test';

  const mockRouter = () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: (
            <AppContextProvider>
              <Pagination />
            </AppContextProvider>
          ),
        },
      ],
      {
        initialEntries: ['/?query=' + testQuery],
      }
    );
    render(<RouterProvider router={router} />);
    return { router };
  };

  it('should updates URL query parameters when click button or change limit', async () => {
    const { router } = mockRouter();

    const nextButton = screen.getByTestId('next');
    await userEvent.click(nextButton);

    expect(router.state.location.search).toContain('page=2');

    await userEvent.click(nextButton);

    expect(router.state.location.search).toContain('page=3');

    const prevButton = screen.getByTestId('prev');
    await userEvent.click(prevButton);

    const currentPage = screen.getByTestId('current');
    expect(currentPage.textContent).toBe('2');

    const selectElement = screen.getByTestId('select');
    fireEvent.change(selectElement, { target: { value: '20' } });

    expect(router.state.location.search).toBe(
      `?query=${testQuery}&page=1&limit=20`
    );
  });
});
