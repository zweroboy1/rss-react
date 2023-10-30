import React, { Component } from 'react';
import Main from './pages/Main';
import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary';

class App extends Component {
  render() {
    return (
      <>
        <ErrorBoundary fallback={<>Something went wrong!</>}>
          <Main />
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './pages/Main';
import { ErrorBoundary } from './components/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <Main />
    </ErrorBoundary>
  </React.StrictMode>
);
*/
