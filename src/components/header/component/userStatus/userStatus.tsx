import { headerUserMenu } from '@/config/menuConfig';
import { AuthInterface, ShoppingCartInterface } from '@/interfaces/globalInterface';
import { Avatar, Badge, Dropdown, Icon, Menu } from 'antd';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { avatarColor } from '@/utils/commonUtils';

import styles from './userStatus.module.scss';

interface Props {
  signOut: (info: { key: string }) => void;
  auth: AuthInterface;
  shoppingCart: ShoppingCartInterface;
}

export default class extends Component<Props> {
  menu = () => (
      <Menu onClick={this.props.signOut}>
        {headerUserMenu.map((item, index) => {
          if (index === headerUserMenu.length - 1) {
            return (
                <Menu.Item key={item.path}>
                  <Icon type={item.icon}/>
                  {item.name}
                </Menu.Item>
            );
          } else if (item.name === '成为卖家') {
            const { auth } = this.props;
            if (!auth.userInfo.roles.includes('ROLE_SELLER')) {
              return (
                  <Menu.Item key={item.path}>
                    <NavLink to={item.path}>
                      <Icon style={{ marginRight: 8 }} type={item.icon}/>
                      {item.name}
                    </NavLink>
                  </Menu.Item>
              );
            }
            return null;
          } else {
            return (
                <Menu.Item key={item.path}>
                  <NavLink to={item.path}>
                    <Icon style={{ marginRight: 8 }} type={item.icon}/>
                    {item.name}
                  </NavLink>
                </Menu.Item>
            );
          }
        })}
      </Menu>
  );

  render() {
    const { auth, shoppingCart } = this.props;

    return (
        <div className={styles['user-status']}>
          <NavLink to='/copyright/registration' className={styles['user-status-button']}>
            <Icon className={styles.header_icon} type='form'/>
            作品登记
          </NavLink>

          {auth.isSignIn && !auth.isLoading ? (
              <Badge count={shoppingCart.cart[auth.userInfo.phone] ? shoppingCart.cart[auth.userInfo.phone].length : ''}>
                <NavLink to='/buyer/shopping-cart' className={styles['user-status-button']}>
                  <Icon className={styles.header_icon} type='shopping-cart'/>
                  购物车
                </NavLink>
              </Badge>
          ) : (
              <Badge count={shoppingCart.cart['notLogin'] ? shoppingCart.cart['notLogin'].length : ''}>
                <NavLink to='/shopping-cart' className={styles['user-status-button']}>
                  <Icon className={styles.header_icon} type='shopping-cart'/>
                  购物车
                </NavLink>
              </Badge>
          )}

          {/*通知*/}
          <NavLink to='/shopping-cart' className={styles['user-status-button']}>
            <Badge dot={true}>
              <Icon type='bell' className={styles.header_bell}/>
            </Badge>
          </NavLink>

          {auth.isSignIn && !auth.isLoading ? (
              <Dropdown overlay={this.menu()} className={styles['user-status-info']}>
                <div style={{ cursor: 'pointer' }}>
                  <Avatar
                      style={{
                        backgroundColor: avatarColor(auth.userInfo.username),
                        verticalAlign: 'middle',
                      }}
                      size='default'>
                    {auth.userInfo.username.charAt(0).toLocaleUpperCase()}
                  </Avatar>
                  <span className={styles['user-status-dropdown']}>{auth.userInfo.username}</span>
                  <Icon type='caret-down' style={{ color: '#FFFFFF' }}/>
                </div>
              </Dropdown>
          ) : !auth.isSignIn ? (
                  <NavLink to='/auth/signIn' className={styles['user-status-button']}>
                    <Icon className={styles.header_icon} type='login'/>
                    登录
                  </NavLink>
              ) : /*等待UserInfo期间*/
              null}
        </div>
    );
  }
}
