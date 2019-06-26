import { homeList } from '@/config/menuConfig';
import { CompositionListInterface } from '@/interfaces/requestInterface';
import { openNotificationWithIcon } from '@/utils/commonUtils';
import { Input, Radio, Spin } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio';
import { History } from 'history';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import ListCard from '../homeListCard/homeListCard';

import styles from './homeGroupList.module.scss';

interface Props {
  history: History;
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

  openSearch = (value: string) => {
    const { history, compositionList } = this.props;
    if (value) {
      history.push({
        pathname: '/home/search',
        state: { value, type: compositionList.typeKey },
      });
    } else {
      openNotificationWithIcon('error', '请输入一个检索关键字');
    }
  };

  render() {
    const { compositionList } = this.props;
    const layout = {};
    return (
        <div className={styles['home-list']}>
          <div className={styles['home-list-group']}>
            <Radio.Group onChange={this.props.radioChange.bind(this, 'type')}
                         defaultValue={compositionList.typeKey}
                         value={compositionList.typeKey}
                         buttonStyle='solid'>
              {homeList.map((item: any) => {
                return (
                    <Radio.Button key={item.key} value={item.key}>
                      {item.name}
                    </Radio.Button>
                );
              })}
            </Radio.Group>
            <Input.Search className={styles['home-list-search']} placeholder='请输入作品名称搜索作品' onSearch={this.openSearch} enterButton={true}/>
          </div>

          <Spin {...layout} size='large' spinning={compositionList.orderByLoading}>
            <div className={styles['home-list-hot']}>{this.getComposition('type')}</div>

            {compositionList.typeTotal > 20 && (
                <div className={styles['home-list-link']}>
                  <NavLink
                      to={{ pathname: '/home/search', state: { type: compositionList.typeKey } }}>
                    查看更多
                  </NavLink>
                </div>
            )}
          </Spin>
        </div>
    );
  }
}
