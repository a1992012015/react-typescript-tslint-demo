import { getComposotionHomeList } from '@/api/compositionApi';
import { HOME_LIST_GET_ALL, HOME_LIST_GET_LIST_SUCCESS, HOME_LIST_GET_TYPE } from '@/store/action-type/homeListType';
import { put, takeEvery } from 'redux-saga/effects';
import { homeListSave } from '../action/homeListAction';

/**
 * 监听获取首页全部列表的action
 */
function* watchGetAllHomeList() {
  yield takeEvery(HOME_LIST_GET_ALL, getAllHomeListWorker);
}

/**
 * 监听获取数据成功的action
 */
function* watchGetAllHomeListSuccess() {
  yield takeEvery(HOME_LIST_GET_LIST_SUCCESS, getAllHomeListSuccessWorker);
}

/**
 * 监听获取单个的列表
 */
function* watchGetTypeHomeList() {
  yield takeEvery(HOME_LIST_GET_TYPE, getTypeHomeListWorker);
}

/**
 * 获取单个列表的操作
 */
function* getTypeHomeListWorker(action: any) {
  const params = action.params.key === 'order_by' ? 5 : 20;
  yield put(getComposotionHomeList({ [action.params.key]: action.params.value, page_size: params }));
}

/**
 * 获取全部列表的执行方法
 */
function* getAllHomeListWorker() {
  yield put(getComposotionHomeList({ order_by: 'released_at', page_size: 5 }));
  yield put(getComposotionHomeList({ page_size: 20 }));
}

interface ResponseInterface {
  type: HOME_LIST_GET_LIST_SUCCESS;
  response: {
    items: [];
    total: number
  };
  data: any;
}

/**
 * 监听获取数据成功的执行方法
 * @param action 获取得到的参数
 */
function* getAllHomeListSuccessWorker({ response, data }: ResponseInterface) {
  const key = data.order_by ? 'orderBy' : 'type';
  let activeKey = 'ALL';
  if (key === 'orderBy') {
    activeKey = data['order_by'];
  } else {
    activeKey = data['type'] || activeKey;
  }

  yield put(homeListSave({
    [key]: response.items,
    [`${key}Key`]: activeKey,
    [`${key}Loading`]: false,
    [`${key}Total`]: response.total,
  }));
}

export default [
  watchGetAllHomeList(),
  watchGetAllHomeListSuccess(),
  watchGetTypeHomeList(),
];
