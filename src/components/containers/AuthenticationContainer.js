import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {protectedTest} from '../../actions';

export default function(ComposedComponent) {
  class Authentication extends Component {
    
    render() {
      
      /*
        lazy auth: just check the state in the store. We don't need to hit the server
        until we are actually trying to access a service. Why hit the server
        if the store knows they aren't logged in?
      */
      if (!this.props.authenticated) {
        console.log("store says you're not logged in! Redirecting...");
        return <Redirect to='/login'/>;
      } else {
        return <ComposedComponent {...this.props} />;
      }
    }
  }

  function mapStateToProps(state) {
    return {authenticated: state.auth.authenticated};
  }

  return connect(mapStateToProps, {protectedTest})(Authentication);
}
