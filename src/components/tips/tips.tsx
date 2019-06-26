import { Button } from 'antd';
import React, { Component } from 'react';

import page1 from '../../assets/images/page1.jpg';
import page2 from '../../assets/images/page2.jpg';
import page3 from '../../assets/images/page3.jpg';

import styles from './tips.module.scss';

const tipsImg = [page1, page2, page3];

interface State {
  tipsValue: number;
  tips: string;
}

export default class extends Component<object, State> {
  constructor(props: object) {
    super(props);
    const tips = sessionStorage.getItem('tips');
    this.state = {
      tips: tips !== null ? tips : '',
      tipsValue: 0,
    };
  }

  stopBodyScroll = (isFixed: boolean) => {
    const bodyEl = document.body;
    if (isFixed) {
      bodyEl.style.position = 'fixed';
    } else {
      bodyEl.style.position = '';
    }
  };

  close = () => {
    sessionStorage.setItem('tips', 'Close');
    this.stopBodyScroll(false);
    this.setState({
      tips: 'Close',
    });
  };

  next = () => {
    this.setState({
      tipsValue: this.state.tipsValue + 1,
    });
  };

  render() {
    const { tips, tipsValue } = this.state;
    if (tips === 'Close') {
      return null;
    } else {
      this.stopBodyScroll(true);
      const style = {
        width: `${800 * tipsImg.length}px`,
        marginLeft: `${-800 * tipsValue}px`,
      };
      return (
          <div className={styles['tips']}>
            <div className={styles['tips-container']}>
              <div style={style} className={styles['tips-content']}>
                {tipsImg.map((img, index) => {
                  return <img key={`img${index}`} src={img} alt='tips'/>;
                })}
              </div>

              <div className={styles['tips-option']}>
                <Button htmlType='button' type={tipsValue !== tipsImg.length - 1 ? undefined : 'primary'} onClick={this.close}>
                  {tipsValue !== tipsImg.length - 1 ? '跳过' : '进入平台'}
                </Button>

                {tipsValue !== tipsImg.length - 1 ? (
                    <Button htmlType='button' type='primary' onClick={this.next}>
                      下一页
                    </Button>
                ) : null}
              </div>
            </div>
          </div>
      );
    }
  }
}
