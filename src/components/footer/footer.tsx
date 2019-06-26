import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/images/tianfutv_logo.svg';
import styles from './footer.module.scss';

export default class extends Component {
  onClick(text: string) {
    console.log(text);
  }

  render() {
    return (
      <div className={styles['footer']}>
        <div className={styles['footer-container']}>
          <NavLink to='/'>
            <img className={styles['footer-logo']} src={logo} alt='logo' />
          </NavLink>

          <div className={styles['footer-link']}>
            <div className={styles['footer-item']}>
              <span className={styles['footer-menu']} onClick={this.onClick.bind(this, '关于我们')}>
                关于我们
              </span>
              <span className={styles['footer-menu']} onClick={this.onClick.bind(this, '客户服务')}>
                客户服务
              </span>
              <span className={styles['footer-menu']} onClick={this.onClick.bind(this, '服务条款')}>
                服务条款
              </span>
              <span className={styles['footer-menu']} onClick={this.onClick.bind(this, '版权声明')}>
                版权声明
              </span>
              <span className={styles['footer-menu']} onClick={this.onClick.bind(this, '帮助中心')}>
                帮助中心
              </span>
            </div>

            <div className={styles['footer-item']}>
              <span className={styles['footer-menu']} onClick={this.onClick.bind(this, '网络文化经营许可证 蜀网文[2019]2981-232号')}>
                网络文化经营许可证 蜀网文[2019]2981-232号
              </span>
              <span className={styles['footer-menu']} onClick={this.onClick.bind(this, '蜀ICP备15034158号')}>
                蜀ICP备15034158号
              </span>
              <span className={styles['footer-menu']} onClick={this.onClick.bind(this, 'Copyright @2019 tianfutv.com')}>
                Copyright @2019 tianfutv.com
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
