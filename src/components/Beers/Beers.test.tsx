import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { act, render, screen } from '@testing-library/react';
import { Beers } from './';
import { mockBeers } from '../../mock/mockData';
import { describe, expect, it } from 'vitest';
import createMockRouter from '../../mock/createMockRouter';
import { mapper } from '@/utils/mapper';
import { BeerApi } from '@/types';

const searchQuery = '434234234';
const mockRouter = createMockRouter({
  query: { query: searchQuery, page: '1', limit: '8', details: '1' },
});
const mockedBeers = mockBeers.map((el) => mapper(el as BeerApi));

describe('Card List component', () => {
  it('should renders the specified number of cards', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Beers data={mockedBeers} />
      </RouterContext.Provider>
    );

    const cards = screen.getAllByRole('listitem');
    expect(cards.length).toBe(mockBeers.length);
  });

  it('should display appropriate message if no cards are present', async () => {
    await act(async () => {
      render(
        <RouterContext.Provider value={mockRouter}>
          <Beers data={[]} />
        </RouterContext.Provider>
      );
    });
    const notFoundText = screen.getByText(
      `No beers found for "${searchQuery}"`
    );
    expect(notFoundText).toBeInTheDocument();
  });
});
