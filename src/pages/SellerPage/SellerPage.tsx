import { AuthInterface } from '@/interfaces/globalInterface';
import { Location } from 'history';
import React, { Component } from 'react';
import { match as Math } from 'react-router';
import { compose } from 'redux';
import AuthGuard from '../../components/higherOrderComponent/AuthGuard';
import Authentication from './Authentication/Authentication';
import Management from './Management/Management';
import OpenShop from './OpenShop/OpenShop';

interface Props {
  auth: AuthInterface;
  location: Location;
  match: Math;
}

/**
 * 买家模块
 */
class SellerPage extends Component<Props> {
  componentDidUpdate(prevProps: Props, prevState: Props) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      // this.props.upDateUser();
    }
  }

  render() {
    const { auth } = this.props;
    console.log(auth.userInfo.roles);
    if (auth.userInfo.roles.length === 0) {
      return <Authentication/>;
    } else if (auth.userInfo.roles.includes('ROLE_SELLER')) {
      return <Management {...this.props} />;
    } else {
      return <OpenShop {...this.props} />;
    }
  }
}

export default compose(AuthGuard)(SellerPage);
