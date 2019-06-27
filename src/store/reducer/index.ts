import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers, Reducer, ReducersMapObject } from 'redux';

/**
 * Create a reducer creator for potential additional reducer key/value pairs
 * @param history react-router
 * @param reducers Reducers map
 * @return Reducer creator
 */
export default function createReducerCreator<S>(history: History, reducers: Partial<ReducersMapObject<S>>) {
  return function createReducer(extraReducers: Partial<ReducersMapObject<S>> = {}) {
    // tslint:disable-next-line:prefer-object-spread
    return combineReducers<S>(
        Object.assign(
            {
              router: connectRouter(history),
            },
            reducers as ReducersMapObject<S>,
            extraReducers as ReducersMapObject<S>,
        ),
    ) as Reducer<S>; // tslint:disable-line:no-useless-intersection
  };
}
