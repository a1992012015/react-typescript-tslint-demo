import { AuthInterface, ReducersFull } from '@/interfaces/globalInterface';
import { History, Location } from 'history';
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { match as Match, Route } from 'react-router-dom';
import { compose, Dispatch } from 'redux';

import logo from '../../assets/images/logo.svg';
import LoadingComponent from '../../components/higherOrderComponent/loadingComponent';

import LoginGuard from '../../components/higherOrderComponent/LoginGuard';
import SwitchDefault from '../../components/higherOrderComponent/switchDefault';

import styles from './AuthPage.module.scss';

const signInPage = Loadable({
  loader: () => import('./SignInPage/SignInPage'),
  loading: LoadingComponent,
});
//
// const signUp = Loadable({
//   loader: () => import('./SignUp/SignUp'),
//   loading: LoadingComponent
// });
//
// const ForgotPassword = Loadable({
//   loader: () => import('./ForgotPassword/ForgotPassword'),
//   loading: LoadingComponent
// });

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
    console.log(this.props);
    const { match } = this.props;
    return (
        <div className={styles['auth']}>
          <img className={styles['logo']} src={logo} alt='logo'/>
          <h2 className={styles['title']}>数字版权综合服务平台</h2>
          <SwitchDefault>
            <Route exact={true} path={`${match.path}/signIn`} component={signInPage}/>
            {/*<Route exact={true} path={`${match.path}/signUp`} component={SignUp} />*/}
            {/*<Route exact={true} path={`${match.path}/forgotPassword`} component={ForgotPassword} />*/}
          </SwitchDefault>
        </div>
    );
  }
}

const mapStateToProps = (state: ReducersFull) => {
  return {};
};

const mapDispatchToProps = {};

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

console.log(compose(LoginGuard));
export default compose(LoginGuard)(AuthPage);
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps,
// )(HomeListPage);
