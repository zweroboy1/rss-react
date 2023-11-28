import { act, render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { AppContextProvider } from '../../context/AppContextProvider';
import { MemoryRouter } from 'react-router-dom';
import { LOCALSTORAGE_NAME } from '../../constants';
import { Header } from './';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Header component', () => {
  userEvent.setup();
  const testBeerName = 'test beer name';
  let storage: Record<string, string> = {};

  beforeEach(() => {
    storage = {};
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: vi.fn((key: string, value: string) => {
          storage[key] = value;
        }),
        getItem: vi.fn((key: string) => storage[key]),
      },
    });
  });

  it('should save the entered value to the local storage after clicking the Search button', async () => {
    act(() => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Provider store={store}>
            <AppContextProvider>
              <Header />
            </AppContextProvider>
          </Provider>
        </MemoryRouter>
      );
    });

    const searchInput = screen.getByRole<HTMLInputElement>('searchbox');
    await userEvent.type(searchInput, testBeerName);
    await userEvent.click(screen.getByText('Search'));
    expect(storage[LOCALSTORAGE_NAME]).toBe(testBeerName);
  });

  it('should save the entered value to the local storage after pressing Enter', async () => {
    const mockQuery = 'mock';
    act(() => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Provider store={store}>
            <AppContextProvider>
              <Header />
            </AppContextProvider>
          </Provider>
        </MemoryRouter>
      );
    });

    const searchInput = screen.getByRole<HTMLInputElement>('searchbox');
    await userEvent.type(searchInput, mockQuery);
    fireEvent.keyDown(searchInput, { key: 'Enter' });
    expect(storage[LOCALSTORAGE_NAME]).toBe(mockQuery);
  });
});
