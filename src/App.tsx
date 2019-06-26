import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { Route } from 'react-router-dom';
import { Layout, BackTop } from 'antd';

import SwitchDefault from './components/higherOrderComponent/switchDefault';
import LoadingComponent from './components/higherOrderComponent/loadingComponent';
import Header from './components/header/Header';
import Footer from './components/footer/footer';
import Tips from './components/tips/tips';

import styles from './App.module.scss';

const HomePage = Loadable({
  loader: () => import('./pages/HomePage/HomePage'),
  loading: LoadingComponent,
});

/**
 * 项目根路由
 */
class App extends Component {
  render() {
    return (
        <Layout className={styles['App']} style={{ minHeight: '100VH' }}>
          <Header />
          <Layout.Content className={styles['App-view']}>
            <SwitchDefault>
              <Route path='/home' component={HomePage} />
              {/*<Route path='/auth' component={Auth} />*/}
              {/*<Route path='/buyer' component={Buyer} />*/}
              {/*<Route path='/user' component={User} />*/}
              {/*<Route path='/copyright' component={Copyright} />*/}
              {/*<Route path='/shopping-cart' component={ShoppingCardUnLogin} />*/}
            </SwitchDefault>
          </Layout.Content>
          <Footer />
          <Tips />
          <BackTop />
        </Layout>
    );
  }
}

export default App;
