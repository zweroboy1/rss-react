import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { BeerBottle } from './';
import createMockRouter from '../../mock/createMockRouter';
import { mockBeer1 } from '../../mock/mockData';

const mockRouter = createMockRouter({
  query: { details: '1' },
});

describe('CardDetails component', () => {
  userEvent.setup();

  it('should correctly display the detailed card data', async () => {
    await act(async () => {
      render(
        <RouterContext.Provider value={mockRouter}>
          <BeerBottle beer={mockBeer1} />
        </RouterContext.Provider>
      );
    });
    const beerTitle = screen.getByText(mockBeer1.title);
    expect(beerTitle).toBeInTheDocument();
    const beerDescription = screen.getByText(mockBeer1.description);
    expect(beerDescription).toBeInTheDocument();
  });

  it('should hide the component after clicking the close button', async () => {
    await act(async () => {
      render(
        <RouterContext.Provider value={mockRouter}>
          <BeerBottle beer={mockBeer1} />
        </RouterContext.Provider>
      );
    });
    const closeButton = screen.getByText('close');
    await userEvent.click(closeButton);
    expect(mockRouter.push).toBeCalledWith({
      pathname: '/',
      query: {},
    });
  });
});
