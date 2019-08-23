import React, { Component } from 'react';
import { compose } from 'redux';

import OpenShopGuard from '../../../../components/higherOrderComponent/OpenShopGuard';

import styles from './PendingPage.module.scss';

class PendingPage extends Component {
  render() {
    return <div className={styles['open-shop-pending']}>您的实名认证正在审核中。。。</div>;
  }
}

export default compose(OpenShopGuard)(PendingPage);
