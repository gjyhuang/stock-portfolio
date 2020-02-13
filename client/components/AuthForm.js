import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {auth, signUp} from '../store';

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props;

  return (
    <div id="login-form">
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input id="email" name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input id="password" name="password" type="password" />
        </div>
        {/* create first name and last name fields here, depending on whether "name" on props is login or signup*/}
        {name === 'signup' ? (
          <div id="signup-form">
            <div>
              <label htmlFor="confirmPassword">
                <small>Confirm Password</small>
                <input id="confirmPassword" name="confirmPassword" type="text" />
              </label>
            </div>
          </div>
        ) : (
          <div />
        )}

        <div>
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
    console.log('formName>>', formName, "email>>>", email, "password>>>", password)
    if (formName === 'login') {
      dispatch(auth(email, password));
    } else if (formName === 'signup') {
      // else if this form is a signup, register a new user
      const user = {email, password};
      dispatch(signUp(user));
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
