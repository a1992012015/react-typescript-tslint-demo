import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import LoadingComponent from './loadingComponent';

const Error = Loadable({
  loader: () => import('../../pages/Error/Error'),
  loading: LoadingComponent
});

export default class extends Component {
  render() {
    return (
      <Switch>
        {this.props.children}
        <Redirect exact={true} from='/' to='/home' />
        <Route path='*' component={Error} />
      </Switch>
    );
  }
}
