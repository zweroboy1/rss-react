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
