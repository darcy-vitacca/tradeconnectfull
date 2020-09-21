import React from "react";
import { Route, Redirect } from "react-router-dom";
import {connect } from 'react-redux';
import PropTypes from 'prop-types';

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = (state) =>({
  authenticated : state.user.authenticated
})

//proptypes are fire type checking to make sure you ahve the correct prop
AuthRoute.propTypes ={
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(AuthRoute);
