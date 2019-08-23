import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { match as Math, Redirect, Route } from 'react-router-dom';

import LoadingComponent from '../../../components/higherOrderComponent/loadingComponent';
import SwitchDefault from '../../../components/higherOrderComponent/switchDefault';

const OpenShopStepPage = Loadable({
  loader: () => import('./VerifiedStepPage/VerifiedStepPage'),
  loading: LoadingComponent,
});

const PendingPage = Loadable({
  loader: () => import('./PendingPage/PendingPage'),
  loading: LoadingComponent,
});

interface Props {
  match: Math;
}

/**
 * 开启买家功能模块
 */
class OpenShop extends Component<Props> {
  render() {
    const { match } = this.props;
    return (
        <SwitchDefault>
          <Route exact={true} path={match.path} component={OpenShopStepPage}/>
          <Route exact={true} path={`${match.path}/pending`} component={PendingPage} />
          <Redirect exact={true} to='/seller'/>
        </SwitchDefault>
    );
  }
}

export default OpenShop;
