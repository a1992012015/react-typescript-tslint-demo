import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { headerNavigation } from '@/config/menuConfig';

import styles from './navigation.module.scss';

export default class extends Component {
  render() {
    return (
      <div className={styles['navigation']}>
        {headerNavigation.map(({ key, path, name }) => {
          return (
            <NavLink className={styles['link']} activeClassName={styles['active-link']} key={key} to={path}>
              {name}
            </NavLink>
          );
        })}
      </div>
    );
  }
}
