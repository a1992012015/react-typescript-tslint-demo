import { BackTop, Layout } from 'antd';
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { Route } from 'react-router-dom';

import styles from './App.module.scss';
import Footer from './components/footer/footer';
import Header from './components/header/Header';
import LoadingComponent from './components/higherOrderComponent/loadingComponent';

import SwitchDefault from './components/higherOrderComponent/switchDefault';
import Tips from './components/tips/tips';

const HomePage = Loadable({
  loader: () => import('./pages/HomePage/HomePage'),
  loading: LoadingComponent,
});

const AuthPage = Loadable({
  loader: () => import('./pages/AuthPage/AuthPage'),
  loading: LoadingComponent,
});

/**
 * 项目根路由
 */
class App extends Component {
  render() {
    return (
        <Layout className={styles['App']} style={{ minHeight: '100VH' }}>
          <Header/>
          <Layout.Content className={styles['App-view']}>
            <SwitchDefault>
              <Route path='/home' component={HomePage}/>
              <Route path='/auth' component={AuthPage} />
              {/*<Route path='/buyer' component={Buyer} />*/}
              {/*<Route path='/user' component={User} />*/}
              {/*<Route path='/copyright' component={Copyright} />*/}
              {/*<Route path='/shopping-cart' component={ShoppingCardUnLogin} />*/}
            </SwitchDefault>
          </Layout.Content>
          <Footer/>
          <Tips/>
          <BackTop/>
        </Layout>
    );
  }
}

export default App;
