import { ShoppingInterface } from '@/interfaces/shoppingCardInterface';
import { Icon } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import React, { Component, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import styles from './homeListCard.module.scss';

moment.locale('zn-cn'); // '中文'

interface Props {
  detail: ShoppingInterface;
}

interface State {
  shopping: 'filled' | 'outlined' | 'twoTone';
  enshrine: 'filled' | 'outlined' | 'twoTone';
}

export default class extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      shopping: 'outlined',
      enshrine: 'outlined',
    };
  }

  getType = (type: string) => {
    let title;
    switch (type) {
      case 'AUDIO':
        title = '音频';
        break;
      case 'VIDEO':
        title = '视频';
        break;
      case 'WORD':
        title = '文档';
        break;
      case 'PICTURE':
        title = '图片';
        break;
      default:
        title = '音频';
    }
    return title;
  };

  getMomentText = (time: string) => {
    return moment(time).utc().fromNow(true);
  };

  getCountText = (text_count: string) => {
    const viewCount = parseInt(text_count, 10);
    if (viewCount > 1000 && viewCount < 10000) {
      const count = viewCount.toString().slice(0, 1);
      return `${count}000+`;
    } else if (viewCount > 10000) {
      const count = viewCount.toString().slice(0, 1);
      return `${count}w+`;
    } else {
      return viewCount;
    }
  };

  addShopping = () => {
    // e.preventDefault();
    console.log('addShopping');
  };

  addEnshrine = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const { enshrine } = this.state;
    this.setState({
      enshrine: enshrine === 'outlined' ? 'filled' : 'outlined',
    });
  };

  render() {
    const { detail } = this.props;
    const { shopping } = this.state;
    const style = {
      backgroundImage: `url(${detail.cover_preview_url})`,
    };
    return (
        // <Card className={styles['list-card']} bodyStyle={{ padding: 0 }}>
        <Link className={styles['list-card']} to={`/home/detail/${detail.id}`} target='_blank'>
          <div className={styles['list-card-img']} style={style}/>
          <p className={styles['list-card-name']}>{detail.name}</p>
          <p className={styles['list-card-type']}>{`${this.getType(detail.type)}-${detail.copyright_owner}`}</p>
          <div className={styles['list-card-option']}>
            {/*<div className={styles['list-card-item']} onClick={this.addEnshrine}>*/}
            {/*  <Icon style={{ marginRight: 8 }} type='star' theme={enshrine}/>*/}
            {/*  收藏*/}
            {/*</div>*/}
            <div className={styles['list-card-item']} onClick={this.addShopping}>
              <Icon style={{ marginRight: 8 }} type='shopping-cart' theme={shopping}/>
              加入购物车
            </div>
          </div>

          <div className={styles['list-card-option']}>
            <div className={styles['list-card-item']} title={`发行日期${this.getMomentText(detail.release_at)}前`}>
              <Icon style={{ marginRight: 8 }} type='clock-circle'/>
              {this.getMomentText(detail.release_at)}
            </div>
            <div className={styles['list-card-item']} title={`被查看${this.getCountText(detail.view_count)}次`}>
              <Icon style={{ marginRight: 8 }} type='eye'/>
              {this.getCountText(detail.view_count)}
            </div>
            <div className={styles['list-card-item']} title={`被购买${this.getCountText(detail.sold_count)}次`}>
              <Icon style={{ marginRight: 8 }} type='book'/>
              {this.getCountText(detail.sold_count)}
            </div>
          </div>
        </Link>
    );
  }
}
