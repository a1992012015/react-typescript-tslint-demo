import { put, takeEvery } from 'redux-saga/effects';
import { getAuthInfoApi } from '../../api/authApi';
import { AUTH_GET_TOKEN_SUCCESS, AUTH_GET_USER_SUCCESS } from '../action-type/authType';
import { authSaveToken, authSaveUser } from '../action/authAction';

/**
 * 监听Token获取成功的action
 */
function* watchTokenSuccess() {
  yield takeEvery(AUTH_GET_TOKEN_SUCCESS, getTokenSuccessWorker);
}

/**
 * 监听Token获取成功的action
 */
function* watchUserSuccess() {
  yield takeEvery(AUTH_GET_USER_SUCCESS, getUserSuccessWorker);
}

/**
 * Token获取成功需要执行的方法
 * @param action 参数配置
 */
function* getTokenSuccessWorker(action: { type: AUTH_GET_TOKEN_SUCCESS, response: object }) {
  console.log('getTokenSuccess', action.response);
  yield put(authSaveToken(action.response));
  yield put(getAuthInfoApi());
}

/**
 * User info获取成功需要执行的方法
 * @param action 参数配置
 */
function* getUserSuccessWorker(action: { type: AUTH_GET_USER_SUCCESS, response: object }) {
  console.log('getUserSuccess', action.response);
  yield put(authSaveUser(action.response));
}

export default [
  watchTokenSuccess(),
  watchUserSuccess(),
];
