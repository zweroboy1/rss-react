import {
  act,
  waitFor,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { BeerBottle } from './';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { server } from '../../mock/server';
import { mockBeers } from '../../mock/mockData';

const mockBeer = mockBeers[0];

describe('CardDetails component', () => {
  it('should trigger an additional API call to fetch detailed information when open detailed card', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/item/' + mockBeer.id]}>
          <Provider store={store}>
            <BeerBottle />
          </Provider>
        </MemoryRouter>
      );
    });
    const usedHandlers = server.listHandlers().filter((item) => item.isUsed);
    expect(usedHandlers.length).toBeGreaterThan(0);
  });

  it('should display a loader while fetching data', async () => {
    render(
      <MemoryRouter initialEntries={['/item/' + mockBeer.id]}>
        <Provider store={store}>
          <BeerBottle />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      const loader = screen.getByTestId('loader');
      expect(loader).toBeInTheDocument();
    });
  });

  it('should remove the loader after the API request', async () => {
    render(
      <MemoryRouter initialEntries={['/item/' + mockBeer.id]}>
        <Provider store={store}>
          <BeerBottle />
        </Provider>
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));

    const loader = screen.queryByTestId('loader');
    expect(loader).toBeNull();
  });

  it('should correctly display the detailed card data', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/item/' + mockBeer.id]}>
          <Provider store={store}>
            <BeerBottle />
          </Provider>
        </MemoryRouter>
      );
    });

    const beerTitle = screen.getByText(mockBeer.name);
    expect(beerTitle).toBeInTheDocument();
  });

  it('should hide the component after clicking the close button', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/item/' + mockBeer.id]}>
          <Provider store={store}>
            <BeerBottle />
          </Provider>
        </MemoryRouter>
      );
    });

    const closeButton = screen.getByText('close');
    await act(async () => {
      await userEvent.click(closeButton);
    });

    expect(window.location.pathname).toEqual('/');
  });
});
