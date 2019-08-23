import { Spin } from 'antd';
import React, { Component } from 'react';

import styles from './Authentication.module.scss';

/**
 * 检查权限控制
 */
export default class Authentication extends Component {
  render() {
    return (
        <div className={styles['authentication']}>
          <Spin size='large'/>
          <p className={styles['authentication-info']}>权限验证中,请稍后。。。</p>
        </div>
    );
  }
}
