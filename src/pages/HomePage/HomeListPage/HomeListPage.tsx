import { ReducersFull } from '@/interfaces/globalInterface';
import { HomeListApiInterface } from '@/interfaces/homeListInterface';
import { CompositionListInterface } from '@/interfaces/requestInterface';
import { homeListGetAll, homeListGetType } from '@/store/action/homeListAction';
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
  homeListGetAllList: () => void;
  homeListGetList: (params: HomeListApiInterface) => void;
}

/**
 * 首页列表组件
 */
class HomeListPage extends Component<Props> {

  componentDidMount(): void {
    this.props.homeListGetAllList();
  }

  radioGroupOnChange = (key: string, e: RadioChangeEvent) => {
    let { value } = e.target;
    if (value === 'ALL') {
      value = null;
    }
    this.props.homeListGetList({ key, value });
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
    homeListGetAllList: () => dispatch(homeListGetAll()),
    homeListGetList: (params: HomeListApiInterface) => dispatch(homeListGetType(params)),
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeListPage);
