import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppContextProvider } from '../../context/AppContextProvider';
import { MemoryRouter } from 'react-router-dom';
import { LOCALSTORAGE_NAME } from '../../constants';
import { SearchInput } from './';

describe('SearchInput component', () => {
  userEvent.setup();
  const storage: Record<string, string> = {};

  Object.defineProperty(window, 'localStorage', {
    value: {
      setItem: vi.fn((key: string, value: string) => {
        storage[key] = value;
      }),
      getItem: vi.fn((key: string) => storage[key]),
    },
  });
  storage[LOCALSTORAGE_NAME] = 'beerName';

  it('should retrieve the value from the local storage upon mounting', () => {
    act(() => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <AppContextProvider>
            <SearchInput placeholder="test" />
          </AppContextProvider>
        </MemoryRouter>
      );
    });
    const searchInput = screen.getByRole<HTMLInputElement>('searchbox');
    expect(searchInput.value).toBe(storage[LOCALSTORAGE_NAME]);
  });

  it('should show the value from the query string upon mounting', () => {
    const testRequest = 'ale';
    act(() => {
      render(
        <MemoryRouter initialEntries={['/?query=' + testRequest]}>
          <AppContextProvider>
            <SearchInput placeholder="test" />
          </AppContextProvider>
        </MemoryRouter>
      );
    });
    const searchInput = screen.getByRole<HTMLInputElement>('searchbox');
    expect(searchInput.value).toBe(testRequest);
  });
});
