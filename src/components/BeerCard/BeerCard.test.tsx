import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  MemoryRouter,
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { BeerCard } from './';
import { BeerBottle } from '../BeerBottle';

const mockBeer = {
  id: 1,
  title: 'Test Beer',
  tag: 'Test Tag',
  date: '2023-11-06',
  description: 'Test Description',
  image: 'test-image.jpg',
};

const mockRouter = () => {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <BeerCard beer={mockBeer} />,
      },
      {
        path: '/item/' + mockBeer.id,
        element: <BeerBottle />,
      },
    ],
    {
      initialEntries: ['/'],
    }
  );
  render(<RouterProvider router={router} />);
  return { router };
};

describe('BeerCard component', () => {
  it('should render the relevant card data', () => {
    act(() => {
      render(
        <MemoryRouter>
          <BeerCard beer={mockBeer} />
        </MemoryRouter>
      );
    });

    const titleElement = screen.getByText(mockBeer.title);
    const tagElement = screen.getByText(mockBeer.tag);
    const imageElement = screen.getByAltText(mockBeer.title);

    expect(titleElement).toBeInTheDocument();
    expect(tagElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockBeer.image);
  });

  it('should open a detailed card component on click', async () => {
    const { router } = mockRouter();
    const cardContainer = screen.getByRole('card');

    expect(router.state.location.pathname).toEqual('/');
    userEvent.click(cardContainer);
    await waitFor(() => {
      expect(router.state.location.pathname).toEqual('/item/' + mockBeer.id);
    });
  });
});
