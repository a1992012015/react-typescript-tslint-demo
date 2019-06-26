import { CompositionListInterface } from '@/interfaces/requestInterface';
import { Radio, Spin } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio';
import React, { Component } from 'react';

import ListCard from '../homeListCard/homeListCard';

import styles from './homeHotList.module.scss';

interface Props {
  compositionList: CompositionListInterface;
  radioChange: (key: string, e: RadioChangeEvent) => void;
}

/**
 * 最新最热的list列表
 */
export default class extends Component<Props> {

  getComposition = (key: 'orderBy' | 'type') => {
    const { compositionList } = this.props;
    const length = compositionList[key].length;
    if (length === 0) {
      return null;
    } else {
      const count = length + (5 - (length % 5));
      const orderBy = new Array(count).fill(count);
      return orderBy.map((item, index) => {
        const detail = compositionList[key][index];
        if (detail) {
          return <ListCard key={index} detail={detail}/>;
        } else {
          return <div key={index} style={{ width: '18%' }}/>;
        }
      });
    }
  };

  render() {
    const { compositionList } = this.props;
    const layout = {};
    return (
        <div className={styles['home-list']}>
          <Radio.Group
              onChange={this.props.radioChange.bind(this, 'order_by')}
              defaultValue={compositionList.orderByKey}
              value={compositionList.orderByKey}
              style={{ margin: '30px 0 17px' }}
              buttonStyle='solid'>
            <Radio.Button value='released_at'>最新作品</Radio.Button>
            <Radio.Button value='sold_count'>最热作品</Radio.Button>
          </Radio.Group>

          <Spin {...layout} size='large' spinning={compositionList.orderByLoading}>
            <div className={styles['home-list-hot']}>{this.getComposition('orderBy')}</div>
          </Spin>
        </div>
    );
  }
}
