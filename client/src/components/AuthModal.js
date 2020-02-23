import React from 'react';
import {Signup} from './AuthForm';

const AuthModal = ({showingModal, setShowingModal, handleClick, text}) => {
  const [newPwdError, setNewPwdError] = React.useState("");

  const handleModalExit = () => {
    setShowingModal(!showingModal);
    setNewPwdError("");
  }

  if (!showingModal) return null;
  return (
    <div>
      <div className="overlay-darken" onClick={handleModalExit}>
      </div>
      <div className="auth-modal flex-centered-all flex-dir-col">
        <div className="font-header">Sign up</div>
        <div className="divider-10" />
        <Signup newPwdError={newPwdError} setNewPwdError={setNewPwdError} isSignup="none"/>
        <div style={{height: 10, visibility: newPwdError ? "" : "none"}}>{newPwdError}</div>
      </div>
    </div>
  )
}

export default AuthModal;
