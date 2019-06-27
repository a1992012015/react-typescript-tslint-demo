import {
  AUTH_DELETE_INFO,
  AUTH_FORGOT,
  AUTH_SAVE_CODE_STATUS,
  AUTH_SAVE_INFO,
  AUTH_SAVE_LOADING,
  AUTH_SAVE_TOKEN,
  AUTH_SEND_CODE_FORGOT,
  AUTH_SEND_CODE_SIGN_UP,
  AUTH_SIGN_IN,
  AUTH_SIGN_IN_ERROR,
  AUTH_SIGN_IN_TOKEN,
  AUTH_SIGN_UP,
} from '../action-type/authType';

interface SaveLoadingInterface {
  type: AUTH_SAVE_LOADING;
}

interface SaveInfoInterface {
  type: AUTH_SAVE_INFO;
  payload: {
    userInfo: object;
  };
}

interface SaveTokenInterface {
  type: AUTH_SAVE_TOKEN;
  payload: {
    token: object;
  };
}

interface DeleteInfoInterface {
  type: AUTH_DELETE_INFO;
}

interface ChangeSendStatusInterface {
  type: AUTH_SAVE_CODE_STATUS;
}

export type authAction = SaveLoadingInterface | SaveInfoInterface | SaveTokenInterface | DeleteInfoInterface | ChangeSendStatusInterface;

/**
 * 登陆
 */
export function authSignIn(info: object) {
  return {
    type: AUTH_SIGN_IN,
    info,
  };
}

/**
 * 登陆流程出错
 * @param info 错误信息
 */
export function authError(info: any) {
  return {
    type: AUTH_SIGN_IN_ERROR,
    info,
  };
}

/**
 * 发送注册验证码
 */
export function authSendCodeSignUp(params: string) {
  return {
    type: AUTH_SEND_CODE_SIGN_UP,
    params: {
      phone: params,
      check_phone: true,
    },
  };
}

/**
 * 发送注册验证码
 */
export function authSendCodeForgot(params: string) {
  return {
    type: AUTH_SEND_CODE_FORGOT,
    params: {
      phone: params,
      check_phone: false,
    },
  };
}

/**
 * 注册
 */
export function authSignUn(params: object) {
  return {
    type: AUTH_SIGN_UP,
    params,
  };
}

/**
 * 查询到用户的token信息直接拿取用户信息
 */
export function authGetUserInfo() {
  return {
    type: AUTH_SIGN_IN_TOKEN,
  };
}

/**
 * 保存api获取到的token
 * @param token 用户token信息
 */
export function authSaveToken(token: object): SaveTokenInterface {
  return {
    type: AUTH_SAVE_TOKEN,
    payload: {
      token,
    },
  };
}

/**
 * 保存api获取到的User Info
 * @param info 用户token信息
 */
export function authSaveUser(info: object): SaveInfoInterface {
  return {
    type: AUTH_SAVE_INFO,
    payload: {
      userInfo: info,
    },
  };
}

/**
 * 退出登录
 */
export function authForgot(body: object) {
  return {
    type: AUTH_FORGOT,
    body,
  };
}

/**
 * 删除信息的 || 退出登录
 */
export function authDeleteInfo() {
  return {
    type: AUTH_DELETE_INFO,
  };
}
