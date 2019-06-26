import banner from '@/assets/images/banner.svg';
import { BigNumber } from 'bignumber.js';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './homeBanner.module.scss';

interface State {
  fontSize: number;
}

/**
 * home页面的banner
 */
export default class HomeBanner extends Component<object, State> {
  private refBanner: HTMLDivElement | null = null;

  constructor(props: object) {
    super(props);
    this.state = {
      fontSize: 0,
    };
  }

  componentDidMount() {
    this.bannerResize();
    window.addEventListener('resize', this.bannerResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.bannerResize);
  }

  bannerResize = () => {
    if (this.refBanner) {
      const { clientWidth } = this.refBanner;
      this.setState({
        fontSize: new BigNumber(clientWidth).dividedBy(75).toNumber(),
      });
    }
  };

  render() {
    const { fontSize } = this.state;
    return (
        <div className={styles['home-banner']}>
          <div className={styles['home-banner-container']} ref={(refBanner) => this.refBanner = refBanner}>
            <img src={banner} className={styles['home-banner-img']} alt='banner'/>

            <NavLink to='/copyright/registration' className={styles['home-banner-button']}>
              作品登记
            </NavLink>

            <p className={styles['home-banner-title']} style={{ fontSize: `${fontSize * 2.8}px` }}>
              数字版权综合服务平台
            </p>

            <p className={`${styles['home-banner-count']} ${styles['count1']}`} style={{ fontSize: `${fontSize}px` }}>
              销量426
            </p>

            <p className={`${styles['home-banner-count']} ${styles['count2']}`} style={{ fontSize: `${fontSize}px` }}>
              68854
            </p>

            <p className={`${styles['home-banner-count']} ${styles['count3']}`} style={{ fontSize: `${fontSize}px` }}>
              5792654
            </p>

            <p className={`${styles['home-banner-count']} ${styles['count4']}`} style={{ fontSize: `${fontSize}px` }}>
              79285
            </p>
          </div>
        </div>
    );
  }
}
