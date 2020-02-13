import React from 'react';
import StockList from './components/StockList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <StockList />
    </div>
  );
}

export default App;
