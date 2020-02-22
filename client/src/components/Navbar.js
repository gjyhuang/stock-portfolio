import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout, getPortfolioThunkCreator} from '../store';

const Navbar = ({handleClick, isLoggedIn, handlePortfolioClick, portfolioId}) => {
  return (
    <nav>
      {isLoggedIn ? (
        <div id="navbar" >
          {/* The navbar will show these links after you log in */}
          <div className="nav-left padding-20">
            <div className="nav-links">
              <Link to="/portfolio" onClick={() => handlePortfolioClick(portfolioId)}>Portfolio</Link>
            </div>
            <div className="divider"> | </div>
            <div className="nav-links" />
            <Link to={{
              pathname: "/transactions",
              state: {
                isTransactionsPage: true
              }}}>Transactions</Link>
          </div>
          <div className="nav-right padding-20">
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        </div>
      ) : <></>}
    </nav>
  )
};

const mapState = state => ({
  isLoggedIn: !!state.user.id,
  portfolioId: state.user.portfolioId
});

const mapDispatch = dispatch => ({
  handleClick() {
    dispatch(logout());
  },
  handlePortfolioClick(id) {
    dispatch(getPortfolioThunkCreator(id));
  }
});

export default connect(mapState, mapDispatch)(Navbar);

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
