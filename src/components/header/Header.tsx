import { AuthInterface, ReducersFull, ShoppingCartInterface } from '@/interfaces/globalInterface';
import { authDeleteInfo, authGetUserInfo } from '@/store/action/authAction';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Dispatch } from 'redux';

import logo from '../.././assets/images/logo2.png';
import Navigation from './component/navigation/navigation';
import UserState from './component/userStatus/userStatus';

import styles from './header.module.scss';

interface Props {
  signOut: () => void;
  mergedShoppingCartAction: (phone: string) => void;
  getUserInfo: () => void;
  auth: AuthInterface;
  shoppingCart: ShoppingCartInterface;
}

/**
 * header组件
 */
class Header extends Component<Props> {
  componentDidUpdate(prevProps: Props, prevState: Props) {
    const { auth } = this.props;
    if (auth.userInfo.phone !== prevProps.auth.userInfo.phone) {
      // mergedShoppingCartAction(auth.userInfo.phone);
    }
  }

  componentDidMount() {
    const { auth } = this.props;
    if (auth.token.access_token) {
      this.props.getUserInfo();
    }
  }

  signOut = ({ key }: { key: string }) => {
    if (key === '/unlock') {
      this.props.signOut();
    }
  };

  render() {
    const { auth, shoppingCart } = this.props;
    return (
        <div className={styles['header']}>
          {/*container*/}
          <div className={styles['header-container']}>
            {/*logo*/}
            <NavLink to='/'>
              <img className={styles['header-logo']} src={logo} alt='logo'/>
            </NavLink>

            {/*导航*/}
            <Navigation/>

            {/*用户*/}
            <UserState auth={auth} shoppingCart={shoppingCart} signOut={this.signOut}/>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state: ReducersFull) => {
  return {
    shoppingCart: state.shoppingCart,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    signOut: () => dispatch(authDeleteInfo()),
    getUserInfo: () => dispatch(authGetUserInfo()),
    mergedShoppingCartAction: (phone: string) => {
      dispatch({
        type: 'MERGED_SHOPPING_CART',
        payload: {
          phone,
        },
      });
    },
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);
