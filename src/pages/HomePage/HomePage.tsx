import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { match as Match, Route } from 'react-router-dom';

import LoadingComponent from '../../components/higherOrderComponent/loadingComponent';
import SwitchDefault from '../../components/higherOrderComponent/switchDefault';

const HomeListPage = Loadable({
  loader: () => import('./HomeListPage/HomeListPage'),
  loading: LoadingComponent,
});

interface Props {
  match: Match;
}

/**
 * Home页面
 */
export default class HomePage extends Component<Props> {
  render() {
    const { match } = this.props;
    return (
        <SwitchDefault>
          <Route exact={true} path={match.path} component={HomeListPage}/>
          {/*<Route exact={true} path={`${match.path}/search`} component={HomeSearch} />*/}
          {/*<Route exact={true} path={`${match.path}/detail/:id`} component={HomeDetail} />*/}
        </SwitchDefault>
    );
  }
}
