import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { act, render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from './';
import createMockRouter from '../../mock/createMockRouter';
import { userEvent } from '@testing-library/user-event';

const searchQuery = 'ale';
const mockRouter = createMockRouter({
  query: { query: searchQuery, page: '1', limit: '8', details: '1' },
});

describe('SearchInput component', () => {
  userEvent.setup();
  it('should show the value from the query string upon mounting', () => {
    act(() => {
      render(
        <RouterContext.Provider value={mockRouter}>
          <SearchInput />
        </RouterContext.Provider>
      );
    });
    const searchInput = screen.getByRole<HTMLInputElement>('searchbox');
    expect(searchInput.value).toBe(searchQuery);
  });

  it('should change route when user inputs new search query and clicks Enter', () => {
    act(() => {
      render(
        <RouterContext.Provider value={mockRouter}>
          <SearchInput />
        </RouterContext.Provider>
      );
    });

    const searchInput = screen.getByPlaceholderText('input beer name');
    const searchButton = screen.getByText('Search');

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'New beer' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

    expect(mockRouter.push).toHaveBeenCalledWith({
      query: { query: 'New beer', page: '1', limit: '8' },
    });
  });
});
