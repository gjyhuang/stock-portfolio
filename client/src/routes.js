import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {me} from './store';
import {Login, Signup} from './components/AuthForm';
import Landing from './components/Landing';
import ConnectedPortfolio from './components/Portfolio';
import PageLoader from './components/screens/PageLoader';

const Routes = ({loadInitialData, isLoggedIn}) => {

  useEffect(() => loadInitialData(), []);

  return (
    <Switch>
      {/* Routes placed here are available to all visitors */}
      <Route exact path="/"
        render={() => <Landing />}
      />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      {isLoggedIn && (
        <Switch>
          {/* Routes placed here are only available after logging in */}
          <Route path="/portfolio" component={ConnectedPortfolio} />
          <Route path="/transactions" component={ConnectedPortfolio} />
        </Switch>
      )}
      {/* Displays our Login component as a fallback */}
      <Route exact path="/" component={PageLoader} />
    </Switch>
  );
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // logged in -> having a valid user.id in state
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = dispatch => ({
  loadInitialData() {
    // if there's a state dispatch me with user
    dispatch(me());
  }
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
