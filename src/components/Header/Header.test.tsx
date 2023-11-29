import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import createMockRouter from '../../mock/createMockRouter';

const mockRouter = createMockRouter({
  pathname: '/random',
  query: {},
});

describe('Header component', () => {
  it('renders header correctly', () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Header />
      </RouterContext.Provider>
    );

    const mainTitle = screen.getByText('Choose your beer');
    expect(mainTitle).toBeInTheDocument();
  });
});
