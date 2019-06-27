import { getCompositionHomeList } from '@/api/compositionApi';
import { HomeListApiInterface } from '@/interfaces/homeListInterface';
import { HOME_LIST_GET_TYPE } from '@/store/action-type/homeListType';
import { call, put, takeEvery } from 'redux-saga/effects';
import { homeListSave } from '../action/homeListAction';

/**
 * 监听获取首页全部列表的action
 */
function* watchGetAllHomeList() {
  yield takeEvery(HOME_LIST_GET_TYPE, getAllHomeListWorker);
}

/**
 * 获取全部列表的执行方法
 */
function* getAllHomeListWorker(action: { type: HOME_LIST_GET_TYPE; params: HomeListApiInterface }) {
  const response = yield call(getCompositionHomeList, action.params);
  yield call(getAllHomeListSaveWorker, { response, data: action.params });
}

interface ResponseInterface {
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
function* getAllHomeListSaveWorker({ response, data }: ResponseInterface) {
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
];
