import React from 'react';
import {Login, Signup} from './AuthForm';
import AuthModal from './AuthModal';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Landing = () => {
  const [showingModal, setShowingModal] = React.useState(false);
  console.log(showingModal)
  return (
    <div className="landing flex-centered-all">
    <header className="page-header flex-centered-all flex-dir-col">
      <div className="font-header">Welcome!</div>
      <div className="divider-20px" />
      <div className="landing-login flex-centered-all flex-dir-row flex-wrap flex-space-btw">
      </div>
      <div className="signup-wrap flex-display flex-dir-col flex-align-center">
        <Login />
        <div className="signup-link flex-display flex-justify-center flex-wrap text-small text-align-center">
          <div>Don't have an account?&nbsp;</div>
          <div className="signup-link-text" onClick={() => setShowingModal(!showingModal)}>Sign up.</div>
        </div>
      </div>
    </header>
    <TransitionGroup
        childFactory={child => React.cloneElement(child, { AuthModal })} // <- change here
      >
      <CSSTransition
        classNames="modalfade"
        in={showingModal}
        timeout={400}
        unmountOnExit
        appear
      >
        <AuthModal
          variant="primary"
          showingModal={showingModal}
          setShowingModal={setShowingModal}/>
      </CSSTransition>
    </TransitionGroup>
  </div>
  );
}

export default Landing;
