import { ShoppingCartInterface } from '@/interfaces/globalInterface';
import { ShoppingCartAction } from '@/store/action/shoppingCartAction';
import { Action } from 'redux';
import { CHANGE_SHOPPING } from '../action-type/shoppingCartType';

const shoppingCartInit: ShoppingCartInterface = {
  cart: {
    notLogin: [],
  },
  isLoading: false,
};

export default function(state: ShoppingCartInterface = shoppingCartInit, incomingAction: Action): ShoppingCartInterface {
  const action = incomingAction as ShoppingCartAction;
  switch (action.type) {
    case CHANGE_SHOPPING:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
