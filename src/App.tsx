import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './components/AppRouter';
import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary fallback={<>Something went wrong!</>}>
        <AppRouter />
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
