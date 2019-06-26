import { Button } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { getAuthTokenApi } from '../../api/authApi';
import { AuthLoginInterface } from '../../interfaces/authInterface';
import { AuthInterface, ReducersFull, SagaInterface } from '../../interfaces/globalInterface';
import { decrement, increment } from '../../store/action/sagaAction';
import FetchApiViewPage from './component/FetchApiViewPage/FetchApiViewPage';

import styles from './FetchApiPage.module.scss';

interface Props {
  readonly saga: SagaInterface;
  readonly auth: AuthInterface;
  readonly onIncrement: () => void;
  readonly onDecrement: () => void;
  readonly creatRequest: (action: AuthLoginInterface) => void;
}

interface State {
  loading: boolean;
}

/**
 * 测试Fetch Api的demo component
 */
class FetchApiPage extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount(): void {
    this.props.creatRequest({
      password: '123456',
      username: '15982086412',
    });
  }

  render() {
    const { saga, auth } = this.props;
    console.log(auth);
    const config = {};
    return (
        <div className={styles['saga']}>
          <div className={styles['saga-action']}>
            <Button {...config} onClick={this.props.onIncrement}>
              Increment
            </Button>
            <Button {...config} onClick={this.props.onDecrement}>
              Decrement
            </Button>
          </div>
          <FetchApiViewPage saga={saga}/>
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onIncrement: () => dispatch(increment()),
    onDecrement: () => dispatch(decrement()),
    creatRequest: (action: AuthLoginInterface) => dispatch(getAuthTokenApi(action)),
  };
};

const mapStateToProps = (state: ReducersFull) => {
  return {
    saga: state.saga,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FetchApiPage);
