import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppRouter } from './';

describe('AppRouter component', () => {
  it('should display 404 page when navigating to an invalid route', async () => {
    render(
      <MemoryRouter initialEntries={['/404-url']}>
        <AppRouter />
      </MemoryRouter>
    );
    const notFoundElement = screen.getByText('404 Not Found');
    expect(notFoundElement).toBeInTheDocument();
  });
  it('shouldn`t display 404 page when navigating to the / route', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );
    const mainPageElement = screen.getByText('Choose your beer');
    expect(mainPageElement).toBeInTheDocument();
  });
});
