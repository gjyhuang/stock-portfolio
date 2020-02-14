import React from 'react';
import StockList from './StockList';
// import AuthForm from './AuthForm';
import {Login, Signup} from './AuthForm'

function Landing() {
  return (
    <div className="landing flex-centered-all">
      <header className="page-header flex-centered-all flex-dir-col">
        <div className="font-header">Welcome!</div>
        <div className="divider-20px" />
        <div className="landing-login flex-centered-all flex-dir-row flex-wrap flex-space-btw">
          <div className="font-subheader">Sign Up</div>
          <div className="font-subheader">Log in</div>
        </div>
        <Login />
        <Signup />
      </header>
      {/* <StockList /> */}
    </div>
  );
}

export default Landing;
