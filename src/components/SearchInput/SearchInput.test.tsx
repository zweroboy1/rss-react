import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { act, render, screen } from '@testing-library/react';
import { SearchInput } from './';
import createMockRouter from '../../mock/createMockRouter';

const searchQuery = 'ale';
const mockRouter = createMockRouter({
  query: { query: searchQuery, page: '1', limit: '8', details: '1' },
});

describe('SearchInput component', () => {
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
});
