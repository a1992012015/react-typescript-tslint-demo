import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { environments } from '../../environments';
import { RequestConfigInterface } from '../../interfaces/requestInterface';
import { REQUEST_API_FETCH } from '../action-type/requestType';
import { fetchApiError, requestApiError, requestApiSave, requestApiStarted, requestApiSuccess } from '../action/requestAction';
import { store } from '../index';

/**
 * 监听发送ajax请求的action
 */
function* watchFetchApi() {
  yield takeEvery(REQUEST_API_FETCH, fetchApiWorker);
}

/**
 * 处理api请求
 * @param action 用于请求的参数
 */
function* fetchApiWorker(action: { type: string; config: RequestConfigInterface }) {
  console.log('====================================');
  const { config } = action;
  try {
    yield put(requestApiStarted(config.requestType));
    const response = yield call(callApiWorker, config);
    yield call(callApiSuccessWorker, config.successType, response, config.storeKey);
  } catch ({ response }) {
    if (response) {
      yield put(requestApiError(config.errorType, JSON.parse(response.request.response)));
    } else {
      yield put(fetchApiError());
    }
  }
}

/**
 * 执行Call Api的操作
 * @param payload ajax配置项
 */
function callApiWorker(payload: RequestConfigInterface) {
  const { auth } = store.getState();
  const axiosConfig = {
    ...payload.options,
    baseURL: payload.baseURL ? environments[payload.baseURL] : environments.authApi,
    headers: {
      Authorization: `${auth.token.token_type} ${auth.token.access_token}`,
      ...payload.options.headers,
    },
  };
  return axios(axiosConfig).then((response) => {
    return response.data;
  });
}

/**
 * Api调用成功
 * @param actionType api成功的action
 * @param response api返回的数据
 * @param key 需要存储到requestReducer的数据key
 */
function* callApiSuccessWorker(actionType: string, response: object, key: string) {
  yield put(requestApiSuccess(actionType, response));
  if (key) {
    yield put(requestApiSave(response, key));
  }
}

export default [
  watchFetchApi(),
];
