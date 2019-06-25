import { SagaInterface } from '../../interfaces/globalInterface';
import { DECREMENT, INCREMENT } from '../action-type/sagaType';
import { sagaAction } from '../action/sagaAction';

const sagaInit: SagaInterface = {
  count: 0,
};

/**
 * 一个测试用的demo
 * @param state 保存在reducer的数据
 * @param action 发送过来的action
 */
export default function sagaReducer(state: SagaInterface = sagaInit, action: sagaAction): SagaInterface {
  switch (action.type) {
    case INCREMENT:
      return {count: state.count + 1};
    case DECREMENT:
      return {count: state.count - 1};
    default:
      return state;
  }
}
