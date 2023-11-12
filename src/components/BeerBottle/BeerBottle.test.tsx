import {
  act,
  waitFor,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { BeerBottle } from './';
import { PunkApi } from '../../services/PunkApi';

const mockBeer = {
  id: 1,
  title: 'Test Beer',
  tag: 'Test Tag',
  date: '2023-11-06',
  description: 'Test Description',
  image: 'test-image.jpg',
};

vi.spyOn(PunkApi.prototype, 'getBeer').mockResolvedValue(mockBeer);

describe('CardDetails component', () => {
  it('should trigger an additional API call to fetch detailed information when open detailed card', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/item/' + mockBeer.id]}>
          <BeerBottle />
        </MemoryRouter>
      );
    });

    expect(PunkApi.prototype.getBeer).toHaveBeenCalled();
  });

  it('should display a loader while fetching data', async () => {
    act(() => {
      render(
        <MemoryRouter initialEntries={['/item/' + mockBeer.id]}>
          <BeerBottle />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      const loader = screen.getByTestId('loader');
      expect(loader).toBeInTheDocument();
    });
  });

  it('should remove the loader after the API request', async () => {
    act(() => {
      render(
        <MemoryRouter initialEntries={['/item/' + mockBeer.id]}>
          <BeerBottle />
        </MemoryRouter>
      );
    });

    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));

    const loader = screen.queryByTestId('loader');
    expect(loader).toBeNull();
  });

  it('should correctly display the detailed card data', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/item/' + mockBeer.id]}>
          <BeerBottle />
        </MemoryRouter>
      );
    });

    const beerTitle = screen.getByText(mockBeer.title);
    expect(beerTitle).toBeInTheDocument();
  });

  it('should hide the component after clicking the close button', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/item/' + mockBeer.id]}>
          <BeerBottle />
        </MemoryRouter>
      );
    });

    const closeButton = screen.getByText('close');
    await act(async () => {
      await userEvent.click(closeButton);
    });

    expect(window.location.pathname).toEqual('/aaa');
  });

  it('should display an error if no response is received from the server', async () => {
    vi.spyOn(PunkApi.prototype, 'getBeer').mockRejectedValue(
      new Error('Mock API error')
    );

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/item/' + mockBeer.id]}>
          <BeerBottle />
        </MemoryRouter>
      );
    });

    const error = await screen.findByText(
      'Error: An error occurred while fetching data'
    );
    expect(error).toBeInTheDocument();
  });
});
