import { HomeListInterface } from '@/interfaces/homeListInterface';
import { Action } from 'redux';
import { HOME_LIST_DELETE, HOME_LIST_SAVE } from '../action-type/homeListType';
import { HomeListAction } from '../action/homeListAction';

const compositionList: HomeListInterface = {
  orderBy: [],
  orderByKey: 'created_at',
  orderByLoading: true,
  orderTotal: 0,
  type: [],
  typeKey: 'ALL',
  typeLoading: true,
  typeTotal: 0,
};

export default function(state: HomeListInterface = compositionList, incomingAction: Action): HomeListInterface {
  const action = incomingAction as HomeListAction;
  switch (action.type) {
    case HOME_LIST_SAVE:
      return { ...state, ...action.payload };
    case HOME_LIST_DELETE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
