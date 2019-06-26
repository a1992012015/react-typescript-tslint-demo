import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

const AuthGuard = InnerComponent => {
  class LoginGuardComponent extends Component {
    componentDidMount() {
      this.props.upDateUser();
    }

    render() {
      const { auth } = this.props;
      if (auth.isSignIn) {
        return <InnerComponent {...this.props} />;
      } else {
        return <Redirect to='/auth/signIn' />;
      }
    }
  }
  const mapDispatchToProps = {
    upDateUser: () => ({ type: 'UP_DATE_USER' })
  };

  const mapStateToProps = ({ auth }) => ({ auth });

  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
  );

  console.log(compose(withConnect))
  console.log(connect(
    mapStateToProps,
    mapDispatchToProps
  ))
  return compose(withConnect)(LoginGuardComponent);
};

export default AuthGuard;
