import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from './ErrorBoundary';
import createMockRouter from '../../mock/createMockRouter';

const mockRouter = createMockRouter({ pathname: '/somepath' });
vi.spyOn(console, 'error').mockImplementation(() => {});

describe('ErrorBoundary component', () => {
  it('should display an error message and reload button when an error occurs', async () => {
    const ErrorThrowingComponent = () => {
      throw new Error('Test error');
    };

    render(
      <RouterContext.Provider value={mockRouter}>
        <ErrorBoundary>
          <ErrorThrowingComponent />
        </ErrorBoundary>
      </RouterContext.Provider>
    );

    expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
    const reloadButton = screen.getByRole('button', { name: 'Reload page' });
    await userEvent.click(reloadButton);
    expect(reloadButton).toBeInTheDocument();
  });
});
