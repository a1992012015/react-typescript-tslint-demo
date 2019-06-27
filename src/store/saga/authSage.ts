import { forgotPasswordApi, getAuthInfoApi, getAuthTokenApi, registeredAuthApi, sendAuthCodeApi } from '@/api/authApi';
import { AuthLoginInterface, AuthSendCodeInterface, AuthSignUpInterface } from '@/interfaces/authInterface';
import { openNotificationWithIcon } from '@/utils/commonUtils';
import { push } from 'connected-react-router';
import { call, cancel, fork, put, take } from 'redux-saga/effects';
import {
  AUTH_FORGOT,
  AUTH_SEND_CODE_FORGOT,
  AUTH_SEND_CODE_SIGN_UP,
  AUTH_SIGN_IN,
  AUTH_SIGN_IN_ERROR,
  AUTH_SIGN_IN_TOKEN,
  AUTH_SIGN_OUT,
  AUTH_SIGN_UP,
} from '../action-type/authType';
import { authDeleteInfo, authError, authSaveToken, authSaveUser } from '../action/authAction';

/**
 * 监听login工作流程的action
 */
function* watchSignInFlow() {
  while (true) {
    const { type, info } = yield take([AUTH_SIGN_IN, AUTH_SIGN_IN_TOKEN]);
    let task;
    if (type === AUTH_SIGN_IN) {
      task = yield fork(getAuthTokenWorker, info);
    } else {
      task = yield fork(getAuthInfoWorker);
    }
    const { type: actionType } = yield take([AUTH_SIGN_OUT, AUTH_SIGN_IN_ERROR]);
    if (actionType === AUTH_SIGN_OUT) {
      yield cancel(task);
    }
    yield put(authDeleteInfo());
  }
}

/**
 * 获取token
 * @param info 参数
 */
function* getAuthTokenWorker(info: AuthLoginInterface) {
  try {
    const token = yield call(getAuthTokenApi, info);
    yield put(authSaveToken(token));
    yield call(getAuthInfoWorker);
  } catch (e) {
    console.log(e);
    openNotificationWithIcon('error', '登陆失败', '密码或账号错误！');
    yield put(authError(e));
  }
}

/**
 * 获取token
 */
function* getAuthInfoWorker() {
  try {
    const info = yield call(getAuthInfoApi);
    yield put(authSaveUser(info));
  } catch (e) {
    console.log(e);
    openNotificationWithIcon('error', '登陆失败', '用户信息获取失败');
    yield put(authError(e));
  }
}

/**
 * 注册action监听
 */
function* watchSignUpFlow() {
  let isSendCode = false;
  while (true) {
    const action = yield take([AUTH_SEND_CODE_SIGN_UP, AUTH_SIGN_UP]);
    if (isSendCode && action.type === AUTH_SIGN_UP) {
      yield call(registeredAuthWorker, {
        code: action.params.code,
        password: action.params.password,
        phone: action.params.phone,
        username: action.params.username,
      });
      isSendCode = false;
    } else {
      isSendCode = yield call(sendCodeWorker, action.params);
    }
  }
}

/**
 * 找回密码action监听
 */
function* watchForgotFlow() {
  let isSendCode = false;
  while (true) {
    const action = yield take([AUTH_SEND_CODE_FORGOT, AUTH_FORGOT]);
    if (isSendCode && action.type === AUTH_FORGOT) {
      console.log(action);
      yield call(forgotPasswordWorker, action.body);
      isSendCode = false;
    } else {
      isSendCode = yield call(sendCodeWorker, action.params);
    }
  }
}

/**
 * 找回密码worker
 */
function* forgotPasswordWorker(body: object) {
  try {
    yield call(forgotPasswordApi, body);
    openNotificationWithIcon('success', '找回密码成功', '账号注册成功请登录！');
    yield put(push('/auth/sign-in'));
  } catch (e) {
    console.log(e);
  }
}

/**
 * 注册工作
 */
function* registeredAuthWorker(params: AuthSignUpInterface) {
  try {
    yield call(registeredAuthApi, params);
    openNotificationWithIcon('success', '注册成功！', '账号注册成功请登录！');
    yield put(push('/auth/sign-in'));
  } catch (e) {
    console.log(e);
    openNotificationWithIcon('error', '注册失败', '请检查注册信息');
  }
}

/**
 * 发送验证码
 */
function* sendCodeWorker(params: AuthSendCodeInterface) {
  try {
    if (!params.phone) {
      openNotificationWithIcon('error', '手机号不能为空', '您必须输入一个正确得手机号！');
      return false;
    } else {
      console.log('params', params);
      yield call(sendAuthCodeApi, params);
      openNotificationWithIcon('success', '验证码发送成功');
      return true;
    }
  } catch (e) {
    console.log(e);
    openNotificationWithIcon('error', '验证码发送失败', '请检查手机号重新发送');
  }
}

export default [
  watchSignInFlow(),
  watchSignUpFlow(),
  watchForgotFlow(),
];
