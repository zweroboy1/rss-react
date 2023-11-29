import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { BeerCard } from './';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import createMockRouter from '../../mock/createMockRouter';
import { mockBeer1 } from '../../mock/mockData';

const mockRouter = createMockRouter({
  query: {},
});

describe('BeerCard component', () => {
  it('should render the relevant card data', () => {
    act(() => {
      render(
        <RouterContext.Provider value={mockRouter}>
          <BeerCard beer={mockBeer1} />
        </RouterContext.Provider>
      );
    });

    const titleElement = screen.getByText(mockBeer1.title);
    const tagElement = screen.getByText(mockBeer1.tag);
    const imageElement = screen.getByAltText(mockBeer1.title);

    expect(titleElement).toBeInTheDocument();
    expect(tagElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
  });

  it('should open a detailed card component on click', async () => {
    act(() => {
      render(
        <RouterContext.Provider value={mockRouter}>
          <BeerCard beer={mockBeer1} />
        </RouterContext.Provider>
      );
    });
    const cardContainer = screen.getByRole('card');

    userEvent.click(cardContainer);
    await waitFor(() => {
      expect(mockRouter.push).toBeCalledWith({
        pathname: '/',
        query: { details: mockBeer1.id },
      });
    });
  });
});
