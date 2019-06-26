import { RequestConfigInterface, RequestFullInterface } from '@/interfaces/requestInterface';
import { REQUEST_API_DELETE, REQUEST_API_ERROR, REQUEST_API_FETCH, REQUEST_API_SAVE } from '../action-type/requestType';

interface SaveResponseInterface {
  type: REQUEST_API_SAVE;
  key: string;
  value: RequestFullInterface;
}

interface DeleteResponseInterface {
  type: REQUEST_API_DELETE;
  key: string;
}

export type requestAction = SaveResponseInterface | DeleteResponseInterface;

/**
 * 开始发送ajax
 * @param config 发送ajax需要的配置项
 */
export function requestApiFetch(config: RequestConfigInterface) {
  return {
    type: REQUEST_API_FETCH,
    config,
  };
}

/**
 * Api调用完成之后将数据存储到requestReduce里面
 */
export function requestApiSave(value: RequestFullInterface, key: string): SaveResponseInterface {
  return {
    type: REQUEST_API_SAVE,
    key,
    value,
  };
}

/**
 * 清空指定的数据
 * @param key 需要清空的数据
 */
export function requestApiDelete(key: string): DeleteResponseInterface {
  return {
    type: REQUEST_API_DELETE,
    key,
  };
}

/**
 * Api开始请求时发送的action
 * @param requestType 开始请求api的action type
 */
export function requestApiStarted(requestType: string) {
  return {
    type: requestType,
  };
}

/**
 * Api请求成功之后发送的action
 * @param successType api请求成功的action type
 * @param response 请求成功的response
 * @param data 请求的参数
 */
export function requestApiSuccess(successType: string, response: object, data: any) {
  return {
    type: successType,
    response,
    data,
  };
}

/**
 * Api请求失败之后发送的action
 * @param errorType Api请求失败的action type
 * @param e 错误信息
 */
export function requestApiError(errorType: string, e: object) {
  return {
    type: errorType,
    error: e,
  };
}

/**
 * Api 网络出错或者无法连接服务器的其他情况
 */
export function fetchApiError() {
  console.log('连接服务器失败');
  return {
    type: REQUEST_API_ERROR,
  };
}
