import { RequestInterface } from '@/interfaces/globalInterface';
import { Action } from 'redux';
import { REQUEST_API_DELETE, REQUEST_API_SAVE } from '../action-type/requestType';
import { requestAction } from '../action/requestAction';

const requestInit: RequestInterface = {
  compositionList: {
    orderBy: [],
    orderByKey: 'created_at',
    orderByLoading: true,
    orderTotal: 0,
    type: [],
    typeKey: 'ALL',
    typeLoading: true,
    typeTotal: 0,
  },
};

/**
 * 获取api数据的reducer
 * @param state 保存在reducer的数据
 * @param incomingAction 发送过来的action
 */
export default function requestReducer(state: RequestInterface = requestInit, incomingAction: Action): RequestInterface {
  const action = incomingAction as requestAction;
  switch (action.type) {
    case REQUEST_API_SAVE:
      return { ...state, [action.key]: action.value };
    case REQUEST_API_DELETE:
      delete state[action.key];
      return { ...state };
    default:
      return state;
  }
}
