import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

const OpenShopGuard = InnerComponent => {
  class OpenShopGuardComponent extends Component {
    render() {
      const { auth, match } = this.props;
      const { real_name_validate: validate } = auth.userInfo;
      if (match.path === '/copyright' && validate && validate.status !== undefined && validate.status === 0) {
        return <Redirect exact={true} to={`${match.path}/pending`} />;
      }
      if (match.path === '/copyright/pending' && validate && validate.status !== undefined && validate.status !== 0) {
        return <Redirect exact={true} to='/copyright' />;
      }

      return <InnerComponent {...this.props} />;
    }
  }
  const mapDispatchToProps = {};

  const mapStateToProps = ({ auth }) => ({ auth });

  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
  );

  return compose(withConnect)(OpenShopGuardComponent);
};

export default OpenShopGuard;
