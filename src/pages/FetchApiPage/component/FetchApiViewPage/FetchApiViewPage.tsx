import React, { Component } from 'react';
import { SagaInterface } from '../../../../interfaces/globalInterface';

import styles from './FetchApiViewPage.module.scss';

interface Props {
  readonly saga: SagaInterface;
}

/**
 * 测试组件
 */
class FetchApiViewPage extends Component<Props> {
  render() {
    const { saga } = this.props;
    return (
        <div className={styles['saga-text']}>
          Clicked: {saga.count} times
        </div>
    );
  }
}

export default FetchApiViewPage;
