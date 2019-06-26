import { delay, put, takeEvery } from 'redux-saga/effects';
import { increment } from '../action/sagaAction';

/**
 * Our watcher Saga: 在每个 INCREMENT_ASYNC saga spawn 一个新的 incrementAsync 任务
 */
function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

/**
 * Our worker Saga: 将执行异步的 increment 任务
 */
function* incrementAsync() {
  yield delay(1000);
  yield put(increment());
}

/**
 * demo
 */
function* helloSaga() {
  console.log('Hello Sagas!');
  yield delay(1000);
}

export default [
  helloSaga(),
  watchIncrementAsync(),
];
