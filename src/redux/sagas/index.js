import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import shelfSaga from './shelfSaga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    shelfSaga(),
    // watchIncrementAsync()
  ]);
}
