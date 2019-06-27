import { AuthLoginInterface } from '@/interfaces/authInterface';
import { callApiWorker } from '@/utils/httpUtils';

/**
 * 获取用户token
 * @param body api参数
 */
export function getAuthTokenApi(body: AuthLoginInterface) {
  return callApiWorker({
    baseURL: 'authApi',
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
  return callApiWorker({
    baseURL: 'mallApi',
    options: {
      url: '/users',
    },
  });
}

/**
 * 发送注册的验证码
 */
export function sendAuthCodeApi(body: object) {
  return callApiWorker({
    baseURL: 'mallApi',
    options: {
      url: '/sms/send',
      params: body,
    },
  });
}

/**
 * 注册新用户api
 */
export function registeredAuthApi(body: object) {
  return callApiWorker({
    baseURL: 'mallApi',
    options: {
      method: 'post',
      url: '/users',
      data: body,
    },
  });
}

/**
 * 找回密码Api
 */
export function forgotPasswordApi(body: object) {
  return callApiWorker({
    baseURL: 'mallApi',
    options: {
      method: 'put',
      url: '/users/reset_password',
      data: body,
    },
  });
}
