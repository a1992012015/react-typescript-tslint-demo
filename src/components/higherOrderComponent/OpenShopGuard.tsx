import { AuthInterface, ReducersFull } from '@/interfaces/globalInterface';
import React, { Component, ComponentType } from 'react';
import { connect } from 'react-redux';
import { match as Math, Redirect } from 'react-router-dom';
import { compose } from 'redux';

interface Props {
  auth: AuthInterface;
  match: Math;
}

const OpenShopGuard = (InnerComponent: ComponentType<Props>) => {
  /**
   * 权限检查
   */
  class OpenShopGuardComponent extends Component<Props> {
    render() {
      const { auth, match } = this.props;
      const { real_name_validate: validate } = auth.userInfo;
      if (match.path === '/copyright' && validate && validate.status !== undefined && validate.status === 0) {
        return <Redirect exact={true} to={`${match.path}/pending`}/>;
      }
      if (match.path === '/copyright/pending' && validate && validate.status !== undefined && validate.status !== 0) {
        return <Redirect exact={true} to='/copyright'/>;
      }

      return <InnerComponent {...this.props} />;
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

  return compose(withConnect)(OpenShopGuardComponent);
};

export default OpenShopGuard;
