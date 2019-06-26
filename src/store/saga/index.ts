import { all } from 'redux-saga/effects';

import authSage from './authSage';
import homeListSage from './homeListSage';
import requestAction from './requestSage';

/**
 * 合并所有的saga监听
 */
export default function* rootSaga() {
  yield all([
    ...requestAction,
    ...authSage,
    ...homeListSage,
  ]);
}
