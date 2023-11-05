import React from 'react';
import Main from './pages/Main';
import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <>
      <ErrorBoundary fallback={<>Something went wrong!</>}>
        <Main />
      </ErrorBoundary>
    </>
  );
};

export default App;
