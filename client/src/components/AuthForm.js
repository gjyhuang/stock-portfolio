import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {auth} from '../store';

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props;

  return (
    <div id="login-form">
      <form onSubmit={handleSubmit} name={name}>
        <div className="form-bar flex-display flex-space-btw">
          <label htmlFor="email">
            Email
          </label>
          <input id="email" name="email" type="text" />
        </div>
        <div className="form-bar flex-display flex-space-btw flex-align-center">
          <label htmlFor="password">
            Password
          </label>
          <input id="password" name="password" type="password" />
        </div>
        {/* create first name and last name fields here, depending on whether "name" on props is login or signup*/}
        {name === 'signup' ? (
          // <div id="signup-form">
            <div className="form-bar flex-display flex-space-btw flex-align-center">
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>
                <input id="confirmPassword" name="confirmPassword" type="password" />
            </div>
          // </div>
        ) : (
          <div />
        )}

        <div className="padding-10">
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

const mapLogin = state => ({
  name: 'login',
  displayName: 'Login',
  error: state.user.error
});

const mapSignup = state => ({
  name: 'signup',
  displayName: 'Sign Up',
  error: state.user.error
});

const mapDispatch = dispatch => ({
  handleSubmit(evt) {
    evt.preventDefault();
    const formName = evt.target.name;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    if (formName === 'login') {
      dispatch(auth(email, password, 'login'));
    } else if (formName === 'signup') {
      // else if this form is a signup, register a new user
      dispatch(auth(email, password, 'signup'));
    }
  }
});

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
