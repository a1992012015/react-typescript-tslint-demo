import { CHANGE_SHOPPING } from '../action-type/shoppingCartType';

interface ChangeShoppingInterface {
  type: CHANGE_SHOPPING;
  payload: object;
}

export type ShoppingCartAction = ChangeShoppingInterface;
