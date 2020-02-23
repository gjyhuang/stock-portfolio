import React from 'react';
import {Signup} from './AuthForm';

const AuthModal = ({showingModal, setShowingModal, handleClick, text}) => {
  if (!showingModal) return null;
  return (
    <div>
      <div className="overlay-darken" onClick={() => setShowingModal(!showingModal)}>
      </div>
      <div className="auth-modal flex-centered-all flex-dir-col">
        <div className="font-header">Sign up</div>
        <div className="divider-10" />
        <Signup />
      </div>
    </div>
  )
}

export default AuthModal;
