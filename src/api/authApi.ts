import { AuthGetTokenInterface } from '../interfaces/authInterface';
import {
  AUTH_GET_TOKEN,
  AUTH_GET_TOKEN_ERROR,
  AUTH_GET_TOKEN_SUCCESS,
  AUTH_GET_USER,
  AUTH_GET_USER_ERROR,
  AUTH_GET_USER_SUCCESS,
} from '../store/action-type/authType';
import { requestApiFetch } from '../store/action/requestAction';

/**
 * 获取用户token
 * @param body api参数
 */
export function getAuthTokenApi(body: AuthGetTokenInterface) {
  return requestApiFetch({
    requestType: AUTH_GET_TOKEN,
    successType: AUTH_GET_TOKEN_SUCCESS,
    errorType: AUTH_GET_TOKEN_ERROR,
    baseURL: 'authApi',
    storeKey: '',
    options: {
      url: '/oauth/token',
      method: 'post',
      params: {
        grant_type: 'password',
        ...body,
      },
      headers: {
        'Authorization': 'Basic Y2xpZW50OnNlY3JldA==',
        'Content-type': 'application/x-www-form-urlencoded',
      },
    },
  });
}

/**
 * 获取用户信息
 */
export function getAuthInfoApi() {
  return requestApiFetch({
    requestType: AUTH_GET_USER,
    successType: AUTH_GET_USER_SUCCESS,
    errorType: AUTH_GET_USER_ERROR,
    baseURL: 'mallApi',
    storeKey: '',
    options: {
      url: '/users',
    },
  });
}
