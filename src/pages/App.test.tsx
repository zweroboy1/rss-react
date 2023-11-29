import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Router } from 'next/router';
import createMockRouter from '../mock/createMockRouter';
import App from '@/pages/_app';

const mockRouter = createMockRouter({
  pathname: '/',
  query: {},
});
const randomText = 'random text';

describe('App Component', () => {
  it('should render child component', () => {
    const MyComponent: React.FC = () => <p>{randomText}</p>;
    render(
      <App
        Component={MyComponent}
        pageProps={{}}
        router={mockRouter as Router}
      />
    );

    expect(screen.getByText(randomText)).toBeInTheDocument();
  });

  it('should render child component with pageProps', () => {
    const pageProps = { data: 'test' };
    const MyComponent = vi.fn(() => <p>{randomText}</p>);

    render(
      <App
        Component={MyComponent}
        pageProps={pageProps}
        router={mockRouter as Router}
      />
    );

    expect(MyComponent).toHaveBeenCalledWith(pageProps, {});
  });
});
