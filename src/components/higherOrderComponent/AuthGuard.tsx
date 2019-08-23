import { AuthInterface, ReducersFull } from '@/interfaces/globalInterface';
import { Location } from 'history';
import React, { Component, ComponentType } from 'react';
import { connect } from 'react-redux';
import { match as Math, Redirect } from 'react-router-dom';
import { compose } from 'redux';

interface Props {
  auth: AuthInterface;
  location: Location;
  match: Math;
}

const AuthGuard = (InnerComponent: ComponentType<Props>) => {
  /**
   * 权限检查
   */
  class LoginGuardComponent extends Component<Props> {

    render() {
      const { auth } = this.props;
      if (auth.isSignIn) {
        return <InnerComponent {...this.props} />;
      } else {
        return <Redirect to='/auth/signIn'/>;
      }
    }
  }

  const mapDispatchToProps = {};

  const mapStateToProps = ({ auth }: ReducersFull) => {
    return {
      auth,
    };
  };

  const withConnect = connect(
      mapStateToProps,
      mapDispatchToProps,
  );

  return compose(withConnect)(LoginGuardComponent);
};

export default AuthGuard;
