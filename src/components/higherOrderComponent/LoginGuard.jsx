import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

const LoginGuard = InnerComponent => {
  class LoginGuardComponent extends Component {
    render() {
      const { auth } = this.props;
      if (!auth.isSignIn) {
        return <InnerComponent {...this.props} />;
      } else {
        return <Redirect to='/' />;
      }
    }
  }
  const mapDispatchToProps = {};

  const mapStateToProps = ({ auth }) => ({ auth });

  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
  );

  return compose(withConnect)(LoginGuardComponent);
};

export default LoginGuard;
