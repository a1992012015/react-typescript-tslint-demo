import { CHANGE_SHOPPING } from '../action-type/shoppingCartType';

// import { queryComposition } from '../../services/compositionsService';

interface ChangeShoppingInterface {
  type: CHANGE_SHOPPING;
  payload: object;
}

export type ShoppingCartAction = ChangeShoppingInterface;
