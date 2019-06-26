import { environments } from '@/environments';
import { RequestConfigInterface } from '@/interfaces/requestInterface';
import { store } from '@/store';
import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { REQUEST_API_FETCH } from '../action-type/requestType';
import { fetchApiError, requestApiError, requestApiStarted, requestApiSuccess } from '../action/requestAction';

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
    yield call(callApiSuccessWorker, config.successType, response, config);
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
 * @param config 请求的参数配置
 */
function* callApiSuccessWorker(actionType: string, response: any, config: RequestConfigInterface) {
  console.log(config.options);
  const data = config.options.data || config.options.params;
  yield put(requestApiSuccess(actionType, response, data));
  // if (key) {
  //   yield put(requestApiSave(response, key));
  // }
}

export default [
  watchFetchApi(),
];
