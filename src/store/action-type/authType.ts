// 无token登陆
export const AUTH_SIGN_IN = 'AUTH_SIGN_IN';

// 有token登陆
export const AUTH_SIGN_IN_TOKEN = 'AUTH_SIGN_IN_TOKEN';

// 登陆出错
export const AUTH_SIGN_IN_ERROR = 'AUTH_SIGN_IN_ERROR';

// 退出登录
export const AUTH_SIGN_OUT = 'AUTH_SIGN_OUT';

// 发送验证码
export const AUTH_SEND_CODE_SIGN_UP = 'AUTH_SEND_CODE_SIGN_UP';
export const AUTH_SEND_CODE_FORGOT = 'AUTH_SEND_CODE_FORGOT';

export const AUTH_SIGN_UP = 'AUTH_SIGN_UP';

// 找回密码
export const AUTH_FORGOT = 'AUTH_FORGOT';

// 发送验证码
export const AUTH_SAVE_CODE_STATUS = 'AUTH_SAVE_CODE_STATUS';

export type AUTH_SAVE_CODE_STATUS = typeof AUTH_SAVE_CODE_STATUS;

// reducer
export const AUTH_SAVE_INFO = 'AUTH_SAVE_INFO';

export type AUTH_SAVE_INFO = typeof AUTH_SAVE_INFO;

export const AUTH_DELETE_INFO = 'AUTH_DELETE_INFO';

export type AUTH_DELETE_INFO = typeof AUTH_DELETE_INFO;

export const AUTH_SAVE_TOKEN = 'AUTH_SAVE_TOKEN';

export type AUTH_SAVE_TOKEN = typeof AUTH_SAVE_TOKEN;

export const AUTH_SAVE_LOADING = 'AUTH_SAVE_LOADING';

export type AUTH_SAVE_LOADING = typeof AUTH_SAVE_LOADING;
