import {
  act,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppContextProvider } from '../../context/AppContextProvider';
import { Beers } from './';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { mockBeers } from '../../mock/mockData';

describe('Card List component', () => {
  it('should renders the specified number of cards', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Provider store={store}>
            <AppContextProvider>
              <Beers />
            </AppContextProvider>
          </Provider>
        </MemoryRouter>
      );
    });

    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
    const cards = screen.getAllByRole('listitem');
    expect(cards.length).toBe(mockBeers.length);
  });

  it('should display appropriate message if no cards are present', async () => {
    await act(async () => {
      render(
        <MemoryRouter
          initialEntries={['/?query=a&page=3&limit=12']}
          initialIndex={0}
        >
          <Provider store={store}>
            <AppContextProvider>
              <Beers />
            </AppContextProvider>
          </Provider>
        </MemoryRouter>
      );
    });
    const noElement = screen.getByText(mockBeers[2].name);
    expect(noElement).toBeInTheDocument();
  });
});
