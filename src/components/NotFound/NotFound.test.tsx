import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import createMockRouter from '../../mock/createMockRouter';
import Custom404 from '@/pages/404';

const mockRouter = createMockRouter({
  pathname: '/random',
  query: {},
});

describe('Not Found component', () => {
  it('should show 404 page when user enters the wrong route', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Custom404 />
      </RouterContext.Provider>
    );
    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });

  it('should redirect to the Main page on click by link', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Custom404 />
      </RouterContext.Provider>
    );
    const linkToMain = screen.getByText('Back to the Main page');
    await userEvent.click(linkToMain);

    expect(mockRouter.push).toBeCalledWith({
      pathname: '/',
      query: {},
    });
  });
});
