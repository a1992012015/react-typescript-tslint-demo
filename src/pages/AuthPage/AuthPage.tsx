import { AuthInterface } from '@/interfaces/globalInterface';
import { History, Location } from 'history';
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { match as Match, Route } from 'react-router-dom';
import { compose } from 'redux';

import logo from '../../assets/images/logo.svg';
import LoadingComponent from '../../components/higherOrderComponent/loadingComponent';

import LoginGuard from '../../components/higherOrderComponent/LoginGuard';
import SwitchDefault from '../../components/higherOrderComponent/switchDefault';

import styles from './AuthPage.module.scss';

const signInPage = Loadable({
  loader: () => import('./SignInPage/SignInPage'),
  loading: LoadingComponent,
});

const SignUpPage = Loadable({
  loader: () => import('./SignUpPage/SignUpPage'),
  loading: LoadingComponent,
});

const ForgotPasswordPage = Loadable({
  loader: () => import('./ForgotPasswordPage/ForgotPasswordPage'),
  loading: LoadingComponent,
});

interface Props {
  readonly match: Match;
  readonly auth: AuthInterface;
  readonly history: History;
  readonly location: Location;
}

/**
 * Auth管理模块
 */
class AuthPage extends Component<Props, object> {
  render() {
    const { match } = this.props;
    return (
        <div className={styles['auth']}>
          <img className={styles['logo']} src={logo} alt='logo'/>
          <h2 className={styles['title']}>数字版权综合服务平台</h2>
          <SwitchDefault>
            <Route exact={true} path={`${match.path}/sign-in`} component={signInPage}/>
            <Route exact={true} path={`${match.path}/sign-up`} component={SignUpPage}/>
            <Route exact={true} path={`${match.path}/forgot-password`} component={ForgotPasswordPage}/>
          </SwitchDefault>
        </div>
    );
  }
}

export default compose(LoginGuard)(AuthPage);
