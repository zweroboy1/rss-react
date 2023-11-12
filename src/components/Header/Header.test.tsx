import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppContextProvider } from '../../context/AppContextProvider';
import { MemoryRouter } from 'react-router-dom';
import { LOCALSTORAGE_NAME } from '../../constants';
import { Header } from './';

describe('Header component', () => {
  userEvent.setup();
  const testBeerName = 'test beer name';
  const storage: Record<string, string> = {};
  Object.defineProperty(window, 'localStorage', {
    value: {
      setItem: vi.fn((key: string, value: string) => {
        storage[key] = value;
      }),
      getItem: vi.fn((key: string) => storage[key]),
    },
  });

  it('should save the entered value to the local storage after clicking the Search button', async () => {
    act(() => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <AppContextProvider>
            <Header />
          </AppContextProvider>
        </MemoryRouter>
      );
    });

    const searchInput = screen.getByRole<HTMLInputElement>('searchbox');
    await act(async () => {
      await userEvent.type(searchInput, testBeerName);
      await userEvent.click(screen.getByText('Search'));
    });
    expect(storage[LOCALSTORAGE_NAME]).toBe(testBeerName);
  });
});
