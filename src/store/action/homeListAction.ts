import { HOME_LIST_DELETE, HOME_LIST_GET_ALL, HOME_LIST_GET_TYPE, HOME_LIST_SAVE } from '../action-type/homeListType';

interface HomeListSave {
  type: HOME_LIST_SAVE;
  payload: object;
}

interface HomeListDelete {
  type: HOME_LIST_DELETE;
  payload: object;
}

export type HomeListAction = HomeListSave | HomeListDelete;

/**
 * 获取首页两个列表
 */
export function homeListGetAll() {
  return {
    type: HOME_LIST_GET_ALL,
  };
}

/**
 * 获取首页两个列表
 */
export function homeListGetType(params: object) {
  return {
    type: HOME_LIST_GET_TYPE,
    params,
  };
}

/**
 * 存储获取得到的list
 */
export function homeListSave(data: object): HomeListSave {
  return {
    type: HOME_LIST_SAVE,
    payload: data,
  };
}
