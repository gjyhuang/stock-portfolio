import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';

const Navbar = ({handleClick, isLoggedIn}) => (
  <nav>
    {isLoggedIn ? (
      <div id="navbar">
        {/* The navbar will show these links after you log in */}
        <div id="nav-left">
          <div className="nav-links">
            <Link to="/portfolio">Portfolio</Link>
          </div>
          <div className="divider"> | </div>
          <div className="nav-links" />
          <Link to="/transactions">Transactions</Link>
        </div>
        <div id="nav-right">
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      </div>
    ) : <></>}
  </nav>
);

const mapState = state => ({
  isLoggedIn: !!state.user.id,
});

const mapDispatch = dispatch => ({
  handleClick() {
    dispatch(logout());
  }
});

export default connect(mapState, mapDispatch)(Navbar);

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
