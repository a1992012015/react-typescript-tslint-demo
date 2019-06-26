import React, { Component } from 'react';

import styles from './Error.module.scss';

export default class extends Component {
  render() {
    return <div className={styles['error']}>This is 404!!!</div>;
  }
}
