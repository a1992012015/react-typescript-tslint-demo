import { AUTH_DELETE_INFO, AUTH_LOGIN, AUTH_SAVE_INFO, AUTH_SAVE_LOADING, AUTH_SAVE_TOKEN } from '../action-type/authType';

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

export type authAction = SaveLoadingInterface | SaveInfoInterface | SaveTokenInterface | DeleteInfoInterface;

/**
 * 登陆
 */
export function authLogin(info: object) {
  return {
    type: AUTH_LOGIN,
    info,
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
