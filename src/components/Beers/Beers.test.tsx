import {
  act,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppContextProvider } from '../../context/AppContextProvider';
import { Beers } from './';
import { PunkApi } from '../../services/PunkApi';

const mockBeers = [
  {
    id: 1,
    title: 'Test Beer',
    tag: 'Test Tag',
    date: '2023-11-06',
    description: 'Test Description',
    image: 'test-image.jpg',
  },
  {
    id: 2,
    title: 'Test Beer',
    tag: 'Test Tag',
    date: '2023-11-06',
    description: 'Test Description',
    image: 'test-image.jpg',
  },
  {
    id: 3,
    title: 'Test Beer',
    tag: 'Test Tag',
    date: '2023-11-06',
    description: 'Test Description',
    image: 'test-image.jpg',
  },
];

describe('Card List component', () => {
  it('should renders the specified number of cards', async () => {
    vi.spyOn(PunkApi.prototype, 'getBeers').mockResolvedValue(mockBeers);
    act(() => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <AppContextProvider>
            <Beers />
          </AppContextProvider>
        </MemoryRouter>
      );
    });

    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
    const cards = screen.queryAllByText(mockBeers[0].title);
    expect(cards.length).toBe(mockBeers.length);
  });

  it('should appropriate message is displayed if no cards are present', async () => {
    vi.spyOn(PunkApi.prototype, 'getBeers').mockResolvedValue([]);
    act(() => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <AppContextProvider>
            <Beers />
          </AppContextProvider>
        </MemoryRouter>
      );
    });

    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
    const noElement = screen.getByText('No beers found for ""');
    expect(noElement).toBeInTheDocument();
  });
});
