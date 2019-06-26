import { AuthInterface, ReducersFull } from '@/interfaces/globalInterface';
import { History, Location } from 'history';
import React, { Component, ComponentType } from 'react';
import { connect } from 'react-redux';
import { match, Redirect } from 'react-router-dom';
import { compose } from 'redux';

const LoginGuard = (InnerComponent: ComponentType) => {
  console.log(InnerComponent);

  interface Props {
    readonly auth: AuthInterface;
    readonly match: match;
    readonly history: History;
    readonly location: Location;
  }

  /**
   * 高阶组建
   */
  class LoginGuardComponent extends Component<Props> {
    render() {
      console.log(this.props);
      const { auth } = this.props;
      if (!auth.isSignIn) {
        return <InnerComponent {...this.props} />;
      } else {
        return <Redirect to='/'/>;
      }
    }
  }

  const mapStateToProps = (state: ReducersFull, stateProps: any) => {
    console.log(stateProps);
    return {
      auth: state.auth,
      ...stateProps,
    };
  };

  const mapDispatchToProps = {};

  const withConnect = connect(
      mapStateToProps,
      mapDispatchToProps,
  );

  return compose(withConnect)(LoginGuardComponent);
};

export default LoginGuard;
