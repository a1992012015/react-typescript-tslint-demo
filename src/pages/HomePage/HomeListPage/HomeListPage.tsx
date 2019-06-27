import { ReducersFull } from '@/interfaces/globalInterface';
import { HomeListApiInterface } from '@/interfaces/homeListInterface';
import { CompositionListInterface } from '@/interfaces/requestInterface';
import { homeListGetType } from '@/store/action/homeListAction';
import { RadioChangeEvent } from 'antd/es/radio';
import { History } from 'history';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import HomeBanner from '../component/homeBanner/homeBanner';
import HomeGroupList from '../component/homeGroupList/homeGroupList';
import HomeHotList from '../component/homeHotList/homeHotList';

import styles from './HomeListPage.module.scss';

interface Props {
  history: History;
  compositionList: CompositionListInterface;
  homeListGet: (params: HomeListApiInterface) => void;
}

/**
 * 首页列表组件
 */
class HomeListPage extends Component<Props> {

  componentDidMount(): void {
    this.props.homeListGet({ order_by: 'released_at', page_size: 5 });
    this.props.homeListGet({ page_size: 20 });
  }

  radioGroupOnChange = (key: string, e: RadioChangeEvent) => {
    let { value } = e.target;
    if (value === 'ALL') {
      value = null;
    }
    const params = key === 'order_by' ? 5 : 20;
    console.log(key, value);
    this.props.homeListGet({
      [key]: value,
      page_size: params,
    });
  };

  render() {
    return (
        <div className={styles['home']}>
          {/*banner*/}
          <HomeBanner/>

          {/*list*/}
          <HomeHotList {...this.props} radioChange={this.radioGroupOnChange}/>
          <HomeGroupList {...this.props} radioChange={this.radioGroupOnChange}/>
        </div>
    );
  }
}

const mapStateToProps = (state: ReducersFull) => {
  return {
    compositionList: state.homeList,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    homeListGet: (params: HomeListApiInterface) => dispatch(homeListGetType(params)),
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeListPage);
