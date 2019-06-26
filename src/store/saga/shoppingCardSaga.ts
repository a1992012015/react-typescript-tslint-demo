import { AuthInterface, ShoppingCartInterface } from '@/interfaces/globalInterface';
import { put, select, take } from 'redux-saga/effects';

/**
 * 获取store
 * @param shoppingCart 购物车信息
 * @param auth 用户信息
 */
function getAuthShoppingCart({ shoppingCart, auth }: { shoppingCart: ShoppingCartInterface; auth: AuthInterface }) {
  return {
    authCart: shoppingCart.cart[auth.userInfo.phone],
    cart: shoppingCart.cart,
    phone: auth.userInfo.phone,
  };
}

/**
 * 清空购物车
 */
function* clearShoppingCart() {
  while (true) {
    const {
      payload: { cartType },
    } = yield take('CLEAR_SHOPPING_CART');
    const { cart } = yield select(getAuthShoppingCart);
    yield put({
      type: 'CHANGE_SHOPPING',
      payload: {
        cart: {
          ...cart,
          [cartType]: [],
        },
      },
    });
  }
}

export default [
  clearShoppingCart(),
];
