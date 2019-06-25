import {all} from 'redux-saga/effects';

import authSage from './authSage';
import requestAction from './requestSage';
import sagaAction from './sagaSaga';

/**
 * 合并所有的saga监听
 */
export default function* rootSaga() {
  yield all([
    ...sagaAction,
    ...requestAction,
    ...authSage,
  ]);
}
