import React from 'react';
import StockList from './StockList';
// import AuthForm from './AuthForm';
import {Login, Signup} from './AuthForm'

function Landing() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome!
        </p>
        <Login />
        <Signup />
      </header>
      {/* <StockList /> */}
    </div>
  );
}

export default Landing;
