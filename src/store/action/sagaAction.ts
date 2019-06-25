import { DECREMENT, INCREMENT } from '../action-type/sagaType';

interface Increment {
  type: INCREMENT;
}

interface Decrement {
  type: DECREMENT;
}

export type sagaAction = Increment | Decrement;

/**
 * Demo 增加
 */
export function increment(): Increment {
  return {
    type: INCREMENT,
  };
}

/**
 * Demo 减少
 */
export function decrement(): Decrement {
  return {
    type: DECREMENT,
  };
}
