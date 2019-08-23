import { Button, Icon } from 'antd';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './verifiedSuccess.module.scss';

/**
 * 实名资料提交成功
 */
export default class VerifiedSuccess extends Component {
  render() {
    return (
        <div className={styles['submit-information']}>
          <div className={styles['submit-information-success']}>
            <Icon type='check'/>
          </div>
          <h1>资料提交成功</h1>
          <NavLink className={styles['operation']} to='/'>
            <Button htmlType='button' type='primary'>
              返回首页
            </Button>
          </NavLink>
        </div>
    );
  }
}
