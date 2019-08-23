import { AuthInterface } from '@/interfaces/globalInterface';
import { AUTH_DELETE_INFO, AUTH_SAVE_CODE_STATUS, AUTH_SAVE_INFO, AUTH_SAVE_TOKEN } from '../action-type/authType';
import { authAction } from '../action/authAction';

const authInit: AuthInterface = {
  isSignIn: false,
  isLoading: false,
  userInfo: {
    id: 0,
    idcard_back: '',
    idcard_front: '',
    phone: '',
    roles: [],
    status: '',
    username: '',
    real_name_validate: {
      status: 0,
    },
  },
  token: {
    access_token: '',
    token_type: '',
    refresh_token: '',
    expires_in: '',
    scope: '',
    jti: '',
  },
};

/**
 * Auth的reducer
 * @param state 保存在reducer的数据
 * @param action 发送过来的action
 */
export default function authReducer(state: AuthInterface = authInit, action: authAction): AuthInterface {
  switch (action.type) {
    case AUTH_SAVE_CODE_STATUS:
      return { ...state, isLoading: true };
    case AUTH_SAVE_INFO:
      Object.assign(state, action.payload);
      return { ...state, isLoading: false, isSignIn: true };
    case AUTH_SAVE_TOKEN:
      Object.assign(state, action.payload);
      return { ...state };
    case AUTH_DELETE_INFO:
      return { ...authInit };
    default:
      return state;
  }
}
