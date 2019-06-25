import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getAuthTokenApi } from '../../api/authApi';
import { AuthGetTokenInterface } from '../../interfaces/authInterface';

import { ReducersFull, SagaInterface } from '../../interfaces/globalInterface';
import { decrement, increment } from '../../store/action/sagaAction';

import styles from './FetchApiPage.module.scss';

interface Props {
  readonly saga: SagaInterface;
  readonly onIncrement: () => void;
  readonly onDecrement: () => void;
  readonly creatRequest: (action: AuthGetTokenInterface) => void;
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
    const { saga } = this.props;
    const config = {};
    return (
        <div className={styles['saga']}>
          <div className={styles['saga-action']}>
            <Button {...config} variant='contained' color='primary' onClick={this.props.onIncrement}>
              Increment
            </Button>
            <Button {...config} variant='contained' color='primary' onClick={this.props.onDecrement}>
              Decrement
            </Button>
          </div>
          <div className={styles['saga-text']}>
            Clicked: {saga.count} times
          </div>
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onIncrement: () => dispatch(increment()),
    onDecrement: () => dispatch(decrement()),
    creatRequest: (action: AuthGetTokenInterface) => dispatch(getAuthTokenApi(action)),
  };
};

const mapStateToProps = (state: ReducersFull) => {
  console.log('mapStateToProps', state);
  return {
    saga: state.saga,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FetchApiPage);
